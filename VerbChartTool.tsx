import React, { useRef, useState } from 'react';
import { BookType, Printer } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';
import { CYCLE_3_ENGLISH_WEEKS } from '../data/reviewPacketData';

/**
 * Verb Conjugation Charts (Essentials)
 * Fill-in conjugation practice for the Cycle 3 verb weeks (4-16), built from the
 * verified English data: principal parts header, blank conjugation tables with
 * helping verbs, circle-the-correct-word sentences for the tricky pairs, and an
 * answer key. The method follows classic Essentials practice; layout, wording,
 * and sentences are original to this app.
 */

interface VerbInfo {
  week: number;
  infinitive: string; // "to lay"
  present: string; // "lay, lays"
  past: string;
  presPart: string;
  pastPart: string;
  meaning?: string; // for tricky pairs
  circle?: { text: string; options: [string, string]; correct: 0 | 1 }[];
}

const MEANINGS: Record<string, string> = {
  'to rise': 'to go up on its own. It never takes an object.',
  'to raise': 'to lift something else. It needs an object.',
  'to lay': 'to put or place something down. It needs an object.',
  'to lie': 'to rest or recline yourself. It never takes an object.',
  'to set': 'to put something somewhere. It needs an object.',
  'to sit': 'to seat yourself. It never takes an object.',
};

const CIRCLES: Record<string, VerbInfo['circle']> = {
  'to lay': [
    { text: 'Please ___ the napkins on the table.', options: ['lay', 'lie'], correct: 0 },
    { text: 'Yesterday she ___ the baby in the crib.', options: ['laid', 'lay'], correct: 0 },
    { text: 'I am ___ the bricks in a straight row.', options: ['laying', 'lying'], correct: 0 },
    { text: 'He has ___ the map on the desk already.', options: ['laid', 'lain'], correct: 0 },
  ],
  'to lie': [
    { text: 'The dog likes to ___ by the fire.', options: ['lie', 'lay'], correct: 0 },
    { text: 'Yesterday I ___ down for a nap.', options: ['lay', 'laid'], correct: 0 },
    { text: 'The cat is ___ in the sunshine.', options: ['lying', 'laying'], correct: 0 },
    { text: 'The snow has ___ on the hill all week.', options: ['lain', 'laid'], correct: 0 },
  ],
  'to rise': [
    { text: 'The sun will ___ at six tomorrow.', options: ['rise', 'raise'], correct: 0 },
    { text: 'The bread ___ overnight in the pan.', options: ['rose', 'raised'], correct: 0 },
    { text: 'Smoke is ___ from the chimney.', options: ['rising', 'raising'], correct: 0 },
    { text: 'The river has ___ since the storm.', options: ['risen', 'raised'], correct: 0 },
  ],
  'to raise': [
    { text: '___ your hand before you speak.', options: ['Raise', 'Rise'], correct: 0 },
    { text: 'They ___ the flag this morning.', options: ['raised', 'rose'], correct: 0 },
    { text: 'We are ___ money for the library.', options: ['raising', 'rising'], correct: 0 },
    { text: 'She has ___ chickens for three years.', options: ['raised', 'risen'], correct: 0 },
  ],
  'to set': [
    { text: 'Please ___ the plates by the sink.', options: ['set', 'sit'], correct: 0 },
    { text: 'He ___ the timer an hour ago.', options: ['set', 'sat'], correct: 0 },
    { text: 'Mom is ___ the table for dinner.', options: ['setting', 'sitting'], correct: 0 },
    { text: 'I have ___ my books on that shelf.', options: ['set', 'sat'], correct: 0 },
  ],
  'to sit': [
    { text: 'You may ___ in the front row.', options: ['sit', 'set'], correct: 0 },
    { text: 'We ___ together at lunch yesterday.', options: ['sat', 'set'], correct: 0 },
    { text: 'The twins are ___ on the porch steps.', options: ['sitting', 'setting'], correct: 0 },
    { text: 'That vase has ___ there for years.', options: ['sat', 'set'], correct: 0 },
  ],
};

function parseVerbs(): VerbInfo[] {
  const out: VerbInfo[] = [];
  for (let w = 5; w <= 16; w++) {
    const rec = CYCLE_3_ENGLISH_WEEKS[w];
    if (!rec) continue;
    const inf = (rec.prompt || '').toLowerCase(); // "to be"
    const parts = (rec.answer || '').replace(/\.$/, '').split(',').map((s) => s.trim());
    if (parts.length < 5) continue;
    out.push({
      week: w,
      infinitive: inf,
      present: parts[1],
      past: parts[2],
      presPart: parts[3],
      pastPart: parts[4],
      meaning: MEANINGS[inf],
      circle: CIRCLES[inf],
    });
  }
  return out;
}

const VERBS = parseVerbs();
const PRONOUNS = ['I', 'you', 'he', 'she', 'it', 'we', 'you', 'they'];
const PAGE_W = 816;

function thirdPerson(present: string): { base: string; s: string } {
  // "lay, lays" -> base lay, s lays; "am, are, is" handled specially by "to be"
  const bits = present.split('/').join(',').split(',').map((s) => s.trim()).filter(Boolean);
  if (bits.length >= 2) return { base: bits[0], s: bits[bits.length - 1] };
  return { base: bits[0] || present, s: bits[0] || present };
}

export const VerbChartTool: React.FC = () => {
  const [week, setWeek] = useState(9);
  const [answerKey, setAnswerKey] = useState(true);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const verb = VERBS.find((v) => v.week === week) || VERBS[0];
  const isToBe = verb.infinitive === 'to be';
  const tp = thirdPerson(verb.present);
  const pastBits = verb.past.split('/').join(',').split(',').map((s) => s.trim());

  const presentFor = (pr: string) => {
    if (isToBe) return pr === 'I' ? 'am' : ['he', 'she', 'it'].includes(pr) ? 'is' : 'are';
    return ['he', 'she', 'it'].includes(pr) ? tp.s : tp.base;
  };
  const pastFor = (pr: string) => {
    if (isToBe) return ['I', 'he', 'she', 'it'].includes(pr) ? 'was' : 'were';
    return pastBits[0];
  };
  const helperPres = (pr: string) => (pr === 'I' ? 'am' : ['he', 'she', 'it'].includes(pr) ? 'is' : 'are');
  const helperPast = (pr: string) => (['he', 'she', 'it'].includes(pr) ? 'has' : 'have');

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: `Verb Chart ${verb.infinitive}` });
  };

  const footer = (
    <div className="text-center text-[10px] text-[#7C8880] mt-6 pt-3 border-t border-[#E4EDE7]">
      Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
    </div>
  );

  const blankCol = (label: string, withHelper?: 'pres' | 'past') => (
    <div>
      <div className="text-[11px] font-extrabold text-white bg-[#2F5D50] rounded-sm px-2 py-1 text-center mb-1.5">{label}</div>
      {PRONOUNS.map((pr, i) => (
        <div key={i} className="flex items-baseline gap-1 text-[12px] mb-1.5">
          <span className="w-8 text-right text-[#44514A]">{pr}</span>
          {withHelper && <span className="w-9 border-b border-[#9DB5A8] text-center text-[10px] text-[#C2CFC6]">&nbsp;</span>}
          <span className="flex-1 border-b border-[#2E2B26]">&nbsp;</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-extrabold text-[#2E2B26] flex items-center gap-2">
          <BookType className="w-5 h-5 text-[#2F5D50]" /> Verb Conjugation Charts
        </h2>
        <button type="button" onClick={handlePrint}
          className="px-4 py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5 items-start">
        <div className="bg-white border border-[#D5DED8] rounded-xl p-4 space-y-3 no-print">
          <label className="block text-xs font-bold text-[#2E2B26]">
            Verb (Cycle 3 English week)
            <select value={week} onChange={(e) => setWeek(Number(e.target.value))}
              className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              {VERBS.map((v) => <option key={v.week} value={v.week}>Week {v.week}: {v.infinitive}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs font-bold text-[#2E2B26] cursor-pointer">
            <input type="checkbox" checked={answerKey} onChange={(e) => setAnswerKey(e.target.checked)} className="rounded text-[#2F5D50]" />
            Add an Answer Key page
          </label>
          <p className="text-[11px] text-[#5C6B62]">
            Fill-in conjugation chart built from the week's verified principal parts.
            The tricky pairs (lay/lie, rise/raise, set/sit) also get circle-the-correct-word practice.
          </p>
        </div>

        <div className="space-y-6">
          <div ref={(el) => { pageRefs.current[0] = el; }}
            className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
            style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
            <div className="flex items-end justify-between border-b-2 border-[#2E2B26] pb-2 mb-3">
              <div>
                <div className="text-2xl font-extrabold text-[#2E2B26] uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                  {verb.infinitive}
                </div>
                <div className="text-[10px] text-[#7C8880]">Cycle 3 English · Week {verb.week} · conjugation practice</div>
              </div>
              <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-1 text-[12px] mb-3">
              <span><b>Infinitive:</b> {verb.infinitive}</span>
              <span><b>Present:</b> {verb.present}</span>
              <span><b>Past:</b> {verb.past}</span>
              <span><b>Present participle:</b> {verb.presPart}</span>
              <span><b>Past participle:</b> {verb.pastPart}</span>
            </div>
            {verb.meaning && (
              <div className="border border-[#D5DED8] bg-[#E4EDE7] rounded-lg p-2 mb-4 text-[12px]">
                <b>Meaning:</b> {verb.infinitive} means {verb.meaning}
              </div>
            )}

            <div className="text-[12px] font-bold text-[#2F5D50] mb-2">
              Conjugate "{verb.infinitive}" (write the helping verb on the small line where there is one):
            </div>
            <div className="grid grid-cols-4 gap-x-5">
              {blankCol('PRESENT')}
              {blankCol('PAST')}
              {blankCol('PRESENT PARTICIPLE', 'pres')}
              {blankCol('PAST PARTICIPLE', 'past')}
            </div>

            {verb.circle && (
              <div className="mt-5">
                <div className="text-[12px] font-bold text-[#2F5D50] mb-1.5">Circle the correct word:</div>
                <ol className="space-y-1.5 text-[13px] list-decimal pl-6">
                  {verb.circle.map((c, i) => (
                    <li key={i}>{c.text.replace('___', `( ${c.options[0]} / ${c.options[1]} )`)}</li>
                  ))}
                </ol>
              </div>
            )}
            {!verb.circle && (
              <div className="mt-5">
                <div className="text-[12px] font-bold text-[#2F5D50] mb-1.5">
                  Write two sentences: one using the past, one using the past participle with a helping verb.
                </div>
                {[0, 1, 2, 3].map((i) => <div key={i} className="border-b-2 border-[#2E2B26] h-9"></div>)}
              </div>
            )}
            {footer}
          </div>

          {answerKey && (
            <div ref={(el) => { pageRefs.current[1] = el; }}
              className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
              style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
              <div className="border-b-2 border-[#2E2B26] pb-2 mb-4">
                <div className="text-lg font-extrabold text-[#2E2B26]">ANSWER KEY · {verb.infinitive}</div>
              </div>
              <div className="grid grid-cols-4 gap-x-5 text-[12px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {(['PRESENT', 'PAST', 'PRESENT PARTICIPLE', 'PAST PARTICIPLE'] as const).map((col) => (
                  <div key={col}>
                    <div className="text-[11px] font-extrabold text-[#2F5D50] mb-1.5">{col}</div>
                    {PRONOUNS.map((pr, i) => (
                      <div key={i} className="mb-1">
                        {pr}{' '}
                        {col === 'PRESENT' && presentFor(pr)}
                        {col === 'PAST' && pastFor(pr)}
                        {col === 'PRESENT PARTICIPLE' && `${helperPres(pr)} ${verb.presPart}`}
                        {col === 'PAST PARTICIPLE' && `${helperPast(pr)} ${verb.pastPart}`}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {verb.circle && (
                <div className="mt-5 text-[13px]">
                  <div className="font-bold text-[#2F5D50] mb-1">Circle answers:</div>
                  {verb.circle.map((c, i) => <span key={i} className="mr-4">{i + 1}) {c.options[c.correct]}</span>)}
                </div>
              )}
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
