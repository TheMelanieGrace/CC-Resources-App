import React, { useRef, useState } from 'react';
import { SpellCheck, Printer, PenTool } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';
import { SPELLING_LISTS, HOMOPHONE_SETS, SpellingList } from '../data/spellingData';

/**
 * Spelling & Homophones (Essentials)
 * Study sheet + dictation test sheet for graded spelling lists, and the
 * classic homophone trouble sets with meanings and a traceable sentence.
 * "Trace these words" hands the list to the Tracing tool for guide-line practice.
 */

const PAGE_W = 816;

interface SpellingToolProps {
  onAddToWorksheet?: (lines: string[], title?: string) => void;
}

export const SpellingTool: React.FC<SpellingToolProps> = ({ onAddToWorksheet }) => {
  const [mode, setMode] = useState<'lists' | 'homophones'>('lists');
  const [grade, setGrade] = useState<2 | 3 | 4 | 5>(3);
  const [listId, setListId] = useState<string>(SPELLING_LISTS[3][0].id);
  const [setStart, setSetStart] = useState(0); // homophones: first set index
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lists = SPELLING_LISTS[grade];
  const list: SpellingList = lists.find((l) => l.id === listId) || lists[0];
  const homSets = HOMOPHONE_SETS.slice(setStart, setStart + 5);

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: mode === 'lists' ? `Spelling – ${list.name}` : 'Homophones' });
  };

  const handleTrace = () => {
    if (!onAddToWorksheet) return;
    if (mode === 'lists') onAddToWorksheet(list.words, `Spelling: ${list.name} (Grade ${grade})`);
    else onAddToWorksheet(homSets.map((s) => s.sentence), 'Homophone Sentences');
  };

  const footer = (
    <div className="text-center text-[10px] text-[#7C8880] mt-10 pt-3 border-t border-[#E4EDE7]">
      Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
    </div>
  );

  const header = (title: string, sub: string) => (
    <div className="flex items-end justify-between border-b-2 border-[#2E2B26] pb-2 mb-4">
      <div>
        <div className="text-lg font-extrabold text-[#2E2B26]">{title}</div>
        <div className="text-[10px] text-[#7C8880]">{sub}</div>
      </div>
      <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between py-4 flex-wrap gap-2">
        <h2 className="text-xl font-extrabold text-[#2E2B26] flex items-center gap-2">
          <SpellCheck className="w-5 h-5 text-[#2F5D50]" /> Spelling &amp; Homophones
        </h2>
        <div className="flex gap-2">
          {onAddToWorksheet && (
            <button type="button" onClick={handleTrace}
              className="px-3.5 py-2 border border-[#2F5D50] text-[#2F5D50] hover:bg-[#E4EDE7] text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
              <PenTool className="w-4 h-4" /> Trace These Words
            </button>
          )}
          <button type="button" onClick={handlePrint}
            className="px-4 py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5 items-start">
        <div className="bg-white border border-[#D5DED8] rounded-xl p-4 space-y-3 no-print">
          <label className="block text-xs font-bold text-[#2E2B26]">
            Practice
            <select value={mode} onChange={(e) => setMode(e.target.value as 'lists' | 'homophones')}
              className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              <option value="lists">Spelling lists</option>
              <option value="homophones">Homophones</option>
            </select>
          </label>
          {mode === 'lists' ? (
            <>
              <label className="block text-xs font-bold text-[#2E2B26]">
                Grade
                <select value={grade}
                  onChange={(e) => { const g = Number(e.target.value) as 2 | 3 | 4 | 5; setGrade(g); setListId(SPELLING_LISTS[g][0].id); }}
                  className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
                  {[2, 3, 4, 5].map((g) => <option key={g} value={g}>Grade {g}</option>)}
                </select>
              </label>
              <label className="block text-xs font-bold text-[#2E2B26]">
                List
                <select value={listId} onChange={(e) => setListId(e.target.value)}
                  className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
                  {lists.map((l, i) => <option key={l.id} value={l.id}>List {i + 1}: {l.name}</option>)}
                </select>
              </label>
              <p className="text-[11px] text-[#5C6B62]">
                Prints a study sheet and a dictation test sheet. "Trace These Words" sends the list to the Tracing tool for guide-line practice.
              </p>
            </>
          ) : (
            <>
              <label className="block text-xs font-bold text-[#2E2B26]">
                Sets
                <select value={setStart} onChange={(e) => setSetStart(Number(e.target.value))}
                  className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
                  {[0, 5, 10, 15].map((s) => (
                    <option key={s} value={s}>
                      Sets {s + 1}–{Math.min(s + 5, HOMOPHONE_SETS.length)} ({HOMOPHONE_SETS.slice(s, s + 5).map((x) => x.words[0].word).join(', ')})
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-[11px] text-[#5C6B62]">
                Words that sound alike but mean different things, with meanings and one practice sentence each.
              </p>
            </>
          )}
        </div>

        <div className="space-y-6">
          {mode === 'lists' ? (
            <>
              {/* STUDY SHEET */}
              <div ref={(el) => { pageRefs.current[0] = el; }}
                className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
                style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
                {header(`Spelling Study Sheet · ${list.name}`, `Grade ${grade} · List ${lists.indexOf(list) + 1}`)}
                <div className="border border-[#D5DED8] bg-[#E4EDE7] rounded-lg p-2.5 mb-5 text-[12px] text-[#2E2B26]">
                  <span className="font-bold">The pattern:</span> {list.tip}
                </div>
                <ol className="grid grid-cols-2 gap-x-12 gap-y-4 text-[22px] font-semibold text-[#2E2B26] list-decimal pl-10"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                  {list.words.map((w, i) => <li key={i}>{w}</li>)}
                </ol>
                <div className="mt-8 text-[12px] text-[#44514A] border-t border-[#E4EDE7] pt-4">
                  <span className="font-bold">How to study:</span> read each word aloud, spell it with your finger in the air,
                  cover it, write it, then check. Three perfect writes in a row means you own it.
                </div>
                {footer}
              </div>

              {/* TEST SHEET */}
              <div ref={(el) => { pageRefs.current[1] = el; }}
                className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
                style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
                {header(`Spelling Test · ${list.name}`, `Grade ${grade} · a grown-up reads each word aloud; you write it`)}
                <ol className="space-y-7 pl-2 pt-2">
                  {list.words.map((_, i) => (
                    <li key={i} className="flex items-end gap-3">
                      <span className="text-sm font-bold text-[#44514A] w-6 text-right">{i + 1}.</span>
                      <span className="flex-1 border-b-2 border-[#2E2B26] h-8"></span>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 text-[11px] text-[#7C8880] border-t border-[#E4EDE7] pt-3">
                  Word list for the reader (fold this under before the test): {list.words.join(' · ')}
                </div>
                {footer}
              </div>
            </>
          ) : (
            <div ref={(el) => { pageRefs.current[0] = el; }}
              className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
              style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
              {header('Homophones · Words That Sound Alike', 'Essentials spelling: pick the right twin')}
              {homSets.map((set, i) => (
                <div key={i} className="mb-6">
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mb-1.5">
                    {set.words.map((w, j) => (
                      <div key={j} className="text-[14px]">
                        <span className="font-extrabold text-[#2F5D50]" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>{w.word}</span>
                        <span className="text-[#5C6B62]"> = {w.meaning}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[15px] text-[#2E2B26]" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                    {set.sentence}
                  </div>
                  <div className="border-b-2 border-[#2E2B26] h-9 mt-1"></div>
                </div>
              ))}
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
