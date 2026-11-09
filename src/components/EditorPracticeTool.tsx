import React, { useMemo, useRef, useState } from 'react';
import { FileEdit, Printer, RefreshCw } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';
import { CYCLE_3_HISTORY_WEEKS } from '../data/reviewPacketData';

/**
 * Editor Practice — "Be the Editor!"
 * Original paragraphs (written for this app) are printed with planted mistakes:
 * lowercased sentence starts, lowercased proper nouns, and missing end marks.
 * Students find and fix them; the answer key lists every planted error.
 * Everything is deterministic from a seed. No AI anywhere.
 */

interface BankSentence {
  text: string; // the CORRECT sentence
  propers?: string[]; // proper nouns inside it that can be de-capitalized
}

const PARAGRAPH_BANK: BankSentence[][] = [
  [
    { text: 'My family visited the Grand Canyon last summer.', propers: ['Grand Canyon'] },
    { text: 'We hiked down a dusty trail with our water bottles.' },
    { text: 'My brother said it was the best day of his whole life!' },
  ],
  [
    { text: 'George Washington was our first president.', propers: ['George Washington'] },
    { text: 'He led the army before he led the country.' },
    { text: 'Did you know his picture is on the dollar bill?' },
  ],
  [
    { text: 'On Tuesday our class walked to the library.', propers: ['Tuesday'] },
    { text: 'I checked out three books about the solar system.' },
    { text: 'The librarian said I could keep them for two weeks.' },
  ],
  [
    { text: 'The Mississippi River flows all the way to the Gulf of Mexico.', propers: ['Mississippi River', 'Gulf of Mexico'] },
    { text: 'Barges carry corn and coal down the river.' },
    { text: 'Have you ever crossed a bridge that big?' },
  ],
  [
    { text: 'Aunt Clara makes the best apple pie in Texas.', propers: ['Aunt Clara', 'Texas'] },
    { text: 'She lets me roll out the dough myself.' },
    { text: 'The kitchen smells wonderful all afternoon.' },
  ],
  [
    { text: 'Our dog Biscuit buried a bone in the garden.', propers: ['Biscuit'] },
    { text: 'He forgot where he put it.' },
    { text: 'Now there are holes all over the yard!' },
  ],
  [
    { text: 'In December we drove to Colorado to see the snow.', propers: ['December', 'Colorado'] },
    { text: 'My sister built a snowman taller than our dad.' },
    { text: 'We drank hot cocoa until our toes warmed up.' },
  ],
  [
    { text: 'Abraham Lincoln grew up in a log cabin.', propers: ['Abraham Lincoln'] },
    { text: 'He loved to read books by the fire.' },
    { text: 'What was your favorite book this year?' },
  ],
  [
    { text: 'The heart pumps blood through the whole body.' },
    { text: 'It beats about one hundred thousand times a day.' },
    { text: 'That is one hard-working muscle!' },
  ],
  [
    { text: 'On Saturday the farmers market opens early.', propers: ['Saturday'] },
    { text: 'Mom buys honey from a man named Mr. Fields.', propers: ['Mr. Fields'] },
    { text: 'I always ask for a sample.' },
  ],
  [
    { text: 'The Pacific Ocean is the largest ocean on Earth.', propers: ['Pacific Ocean', 'Earth'] },
    { text: 'Whales travel through it every year.' },
    { text: 'Would you like to see one someday?' },
  ],
  [
    { text: 'Last night we read about ancient Rome.', propers: ['Rome'] },
    { text: 'The city had roads, aqueducts, and a giant arena.' },
    { text: 'Some of those roads still exist today!' },
  ],
];

interface PlantedError {
  sentenceIdx: number;
  kind: 'capital-start' | 'capital-proper' | 'end-mark' | 'spelling';
  detail: string;
}

// Plausible kid misspellings for words that appear in the paragraph bank.
const MISSPELL: Record<string, string> = {
  visited: 'visitid', summer: 'sumer', brother: 'bruther', library: 'libary',
  books: 'bookes', librarian: 'libarian', river: 'rivver', wonderful: 'wonderfull',
  afternoon: 'afternune', buried: 'berried', garden: 'gardin', forgot: 'fergot',
  snowman: 'snoman', favorite: 'favrite', hundred: 'hundrid', muscle: 'mussel',
  market: 'markit', honey: 'hunny', largest: 'largist', travel: 'travle',
  ancient: 'anshent', roads: 'rodes', pumps: 'pumpes', whole: 'hole',
};

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function plantErrors(
  paragraph: BankSentence[],
  errorTarget: number,
  rnd: () => number
): { broken: string[]; errors: PlantedError[] } {
  const broken = paragraph.map((s) => s.text);
  const errors: PlantedError[] = [];
  // candidate operations across the paragraph
  const ops: { sentenceIdx: number; kind: PlantedError['kind']; apply: () => string }[] = [];
  paragraph.forEach((s, i) => {
    ops.push({
      sentenceIdx: i, kind: 'capital-start',
      apply: () => { broken[i] = broken[i][0].toLowerCase() + broken[i].slice(1); return `Sentence ${i + 1}: begin with a capital letter.`; },
    });
    ops.push({
      sentenceIdx: i, kind: 'end-mark',
      apply: () => { broken[i] = broken[i].replace(/[.!?]$/, ''); return `Sentence ${i + 1}: add the missing end mark.`; },
    });
    (s.propers || []).forEach((pn) => {
      ops.push({
        sentenceIdx: i, kind: 'capital-proper',
        apply: () => { broken[i] = broken[i].replace(pn, pn.toLowerCase()); return `Sentence ${i + 1}: capitalize "${pn}".`; },
      });
    });
    // spelling candidates: any bank word with a planted misspelling
    s.text.split(/\s+/).forEach((raw) => {
      const w = raw.replace(/[^A-Za-z']/g, '').toLowerCase();
      if (MISSPELL[w]) {
        ops.push({
          sentenceIdx: i, kind: 'spelling',
          apply: () => {
            broken[i] = broken[i].replace(new RegExp(`\\b${w}\\b`, 'i'), MISSPELL[w]);
            return `Sentence ${i + 1}: fix the spelling of "${MISSPELL[w]}" → "${w}".`;
          },
        });
      }
    });
  });
  // shuffle ops, take errorTarget distinct ones (max one per kind per sentence)
  for (let i = ops.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [ops[i], ops[j]] = [ops[j], ops[i]];
  }
  const used = new Set<string>();
  for (const op of ops) {
    if (errors.length >= errorTarget) break;
    const k = `${op.sentenceIdx}-${op.kind}`;
    if (used.has(k)) continue;
    used.add(k);
    const detail = op.apply();
    errors.push({ sentenceIdx: op.sentenceIdx, kind: op.kind, detail });
  }
  errors.sort((a, b) => a.sentenceIdx - b.sentenceIdx);
  return { broken, errors };
}

const PAGE_W = 816;

// Mid-sentence capitalized words are proper nouns; group runs like "Boston Tea Party".
function detectPropers(sentence: string): string[] {
  const tokens = sentence.split(/\s+/);
  const propers: string[] = [];
  let run: string[] = [];
  tokens.forEach((raw, idx) => {
    const clean = raw.replace(/[^A-Za-z.]/g, '');
    const isCap = /^[A-Z]/.test(clean) && idx > 0;
    if (isCap) run.push(clean.replace(/\.$/, ''));
    else {
      if (run.length) propers.push(run.join(' '));
      run = [];
    }
  });
  if (run.length) propers.push(run.join(' '));
  // ignore single letters and stray initials
  return propers.filter((p) => p.length > 2);
}

export const EditorPracticeTool: React.FC = () => {
  const [mode, setMode] = useState<'original' | 'history'>('original');
  const [historyStart, setHistoryStart] = useState(1);
  const [count, setCount] = useState(3);
  const [errorsPer, setErrorsPer] = useState(4);
  const [answerKey, setAnswerKey] = useState(true);
  const [seed, setSeed] = useState(11);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const exercises = useMemo(() => {
    const rnd = mulberry32(seed * 7919 + 3);
    if (mode === 'history') {
      // one exercise per week, starting at historyStart
      const weeks = Array.from({ length: count }, (_, i) => historyStart + i).filter((w) => w >= 1 && w <= 24);
      return weeks.map((w) => {
        const hist = CYCLE_3_HISTORY_WEEKS[w];
        const sentence = hist?.lines?.[0] || '';
        const para: BankSentence[] = [{ text: sentence, propers: detectPropers(sentence) }];
        const { broken, errors } = plantErrors(para, errorsPer, rnd);
        return { correct: [sentence], broken, errors, label: `Week ${w} History Sentence · "${hist?.heading?.replace(/^.*?-\s*/, '') || ''}"` };
      });
    }
    // original paragraphs mode
    const idxs = PARAGRAPH_BANK.map((_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    return idxs.slice(0, count).map((pIdx) => {
      const para = PARAGRAPH_BANK[pIdx];
      const { broken, errors } = plantErrors(para, errorsPer, rnd);
      return { correct: para.map((s) => s.text), broken, errors, label: undefined as string | undefined };
    });
  }, [mode, historyStart, count, errorsPer, seed]);

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: 'Editor Practice' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-extrabold text-[#2E2B26] flex items-center gap-2">
          <FileEdit className="w-5 h-5 text-[#2F5D50]" /> Editor Practice
        </h2>
        <button type="button" onClick={handlePrint}
          className="px-4 py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5 items-start">
        <div className="bg-white border border-[#D5DED8] rounded-xl p-4 space-y-3 no-print">
          <p className="text-[11px] text-[#5C6B62]">
            Students play editor: every passage hides capitalization, end-mark, and spelling mistakes to find and fix.
          </p>
          <label className="block text-xs font-bold text-[#2E2B26]">
            Passage source
            <select value={mode} onChange={(e) => setMode(e.target.value as 'original' | 'history')} className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              <option value="original">Practice paragraphs</option>
              <option value="history">Cycle 3 History sentences</option>
            </select>
          </label>
          {mode === 'history' && (
            <label className="block text-xs font-bold text-[#2E2B26]">
              Starting week
              <select value={historyStart} onChange={(e) => setHistoryStart(Number(e.target.value))} className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
                {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => <option key={w} value={w}>Week {w}</option>)}
              </select>
            </label>
          )}
          <label className="block text-xs font-bold text-[#2E2B26]">
            {mode === 'history' ? 'How many weeks' : 'Paragraphs'}
            <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="block text-xs font-bold text-[#2E2B26]">
            Mistakes per paragraph
            <select value={errorsPer} onChange={(e) => setErrorsPer(Number(e.target.value))} className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              {[3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-[#2E2B26] cursor-pointer">
            <input type="checkbox" checked={answerKey} onChange={(e) => setAnswerKey(e.target.checked)} className="rounded text-[#2F5D50]" />
            Add an Answer Key page
          </label>
          <button type="button" onClick={() => setSeed((s) => s + 1)}
            className="w-full py-1.5 border border-[#2F5D50] text-[#2F5D50] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E4EDE7]">
            <RefreshCw className="w-3.5 h-3.5" /> Shuffle New Paragraphs
          </button>
        </div>

        <div className="space-y-6">
          <div ref={(el) => { pageRefs.current[0] = el; }}
            className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
            style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
            <div className="flex items-end justify-between border-b-2 border-[#2E2B26] pb-2 mb-3">
              <div>
                <div className="text-lg font-extrabold text-[#2E2B26]">Be the Editor!</div>
                <div className="text-[10px] text-[#7C8880]">Essentials editing practice</div>
              </div>
              <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
            </div>
            <div className="text-[11px] text-[#44514A] border border-[#D5DED8] bg-[#E4EDE7] rounded-lg p-2.5 mb-4">
              <span className="font-bold">Editor's marks:</span> draw three little lines under a letter that needs a capital (<span className="font-mono">≡</span>),
              add any missing end marks (<span className="font-mono">. ! ?</span>), and circle misspelled words, then write them correctly above.
            </div>
            <div className="text-[11px] text-[#2E2B26] border border-[#D5DED8] rounded-lg p-2.5 mb-5 grid grid-cols-2 gap-x-6 gap-y-1">
              <div className="col-span-2 font-bold text-[#2F5D50]">Editor's checklist · ask about every sentence:</div>
              {[
                'Does it start with a capital letter?',
                'Does it end with the right mark?',
                'Are people, places, and days capitalized?',
                'Is every word spelled correctly?',
                'Does it make complete sense?',
                'Does it have a subject and a predicate?',
              ].map((q, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 border-2 border-[#2E2B26] rounded-[2px] shrink-0"></span>{q}
                </div>
              ))}
            </div>
            {exercises.map((ex, i) => (
              <div key={i} className="mb-7">
                <div className="text-xs font-bold text-[#2F5D50] mb-1.5">
                  {ex.label || `Paragraph ${i + 1}`} · find and fix {ex.errors.length} mistakes
                </div>
                <p className="text-[16px] text-[#2E2B26]" style={{ lineHeight: 2.3, fontFamily: "'Josefin Sans', sans-serif" }}>
                  {ex.broken.join(' ')}
                </p>
              </div>
            ))}
            <div className="text-center text-[10px] text-[#7C8880] mt-8 pt-3 border-t border-[#E4EDE7]">
              Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
            </div>
          </div>

          {answerKey && (
            <div ref={(el) => { pageRefs.current[1] = el; }}
              className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
              style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
              <div className="border-b-2 border-[#2E2B26] pb-2 mb-4">
                <div className="text-lg font-extrabold text-[#2E2B26]">ANSWER KEY · Be the Editor!</div>
              </div>
              {exercises.map((ex, i) => (
                <div key={i} className="mb-6">
                  <div className="text-xs font-bold text-[#2F5D50] mb-1">Paragraph {i + 1}</div>
                  <ul className="text-[12px] text-[#2E2B26] list-disc pl-5 space-y-0.5">
                    {ex.errors.map((er, j) => <li key={j}>{er.detail}</li>)}
                  </ul>
                  <p className="text-[12px] text-[#44514A] italic mt-1.5">Corrected: {ex.correct.join(' ')}</p>
                </div>
              ))}
              <div className="text-center text-[10px] text-[#7C8880] mt-8 pt-3 border-t border-[#E4EDE7]">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
