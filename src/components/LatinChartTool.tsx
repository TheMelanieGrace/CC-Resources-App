import React, { useRef, useState } from 'react';
import { Landmark, Printer } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';

/**
 * Latin Ending Charts (Foundations)
 * Fill-in practice charts for the Latin memory work, modeled on the
 * conjugation-chart method: Cycle 1 gets the five noun declensions,
 * Cycle 2 gets the six first-conjugation tenses. Endings are verbatim
 * from the Summary Proof Sheets; the chart layout and directions are
 * original to this app. Includes a filled answer key.
 */

const CASES = ['Nominative', 'Genitive', 'Dative', 'Accusative', 'Ablative'];

const DECLENSIONS: { name: string; sing: string[]; plur: string[] }[] = [
  { name: '1st Declension', sing: ['-a', '-ae', '-ae', '-am', '-ā'], plur: ['-ae', '-ārum', '-īs', '-ās', '-īs'] },
  { name: '2nd Declension', sing: ['-us', '-ī', '-ō', '-um', '-ō'], plur: ['-ī', '-ōrum', '-īs', '-ōs', '-īs'] },
  { name: '3rd Declension', sing: ['various', '-is', '-ī', '-em', '-e'], plur: ['-ēs', '-um', '-ibus', '-ēs', '-ibus'] },
  { name: '4th Declension', sing: ['-us', '-ūs', '-uī', '-um', '-ū'], plur: ['-ūs', '-uum', '-ibus', '-ūs', '-ibus'] },
  { name: '5th Declension', sing: ['-ēs', '-ēī', '-ēī', '-em', '-ē'], plur: ['-ēs', '-ērum', '-ēbus', '-ēs', '-ēbus'] },
];

const PERSONS = ['1st person', '2nd person', '3rd person'];

const TENSES: { name: string; weeks: string; sing: string[]; plur: string[] }[] = [
  { name: 'Present', weeks: 'Weeks 1-2', sing: ['-ō', '-s', '-t'], plur: ['-mus', '-tis', '-nt'] },
  { name: 'Imperfect', weeks: 'Weeks 3-4', sing: ['-bam', '-bās', '-bat'], plur: ['-bāmus', '-bātis', '-bant'] },
  { name: 'Future', weeks: 'Weeks 5-6', sing: ['-bō', '-bis', '-bit'], plur: ['-bimus', '-bitis', '-bunt'] },
  { name: 'Perfect', weeks: 'Weeks 7-8', sing: ['-ī', '-istī', '-it'], plur: ['-imus', '-istis', '-ērunt'] },
  { name: 'Pluperfect', weeks: 'Weeks 9-10', sing: ['-eram', '-erās', '-erat'], plur: ['-erāmus', '-erātis', '-erant'] },
  { name: 'Future Perfect', weeks: 'Weeks 11-12', sing: ['-erō', '-eris', '-erit'], plur: ['-erimus', '-eritis', '-erint'] },
];

const PAGE_W = 816;

const cell = 'border border-[#C2CFC6] px-2 py-1.5 text-[12px]';
const headCell = 'border border-[#C2CFC6] bg-[#E4EDE7] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#1C3B32]';

const Page: React.FC<{ title: string; sub: string; children: React.ReactNode; refCb: (el: HTMLDivElement | null) => void }> = ({ title, sub, children, refCb }) => (
  <div ref={refCb} className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
    style={{ width: PAGE_W, minHeight: 1056, padding: '36px 44px' }}>
    <div className="flex items-end justify-between border-b-2 border-[#1C3B32] pb-2 mb-3">
      <div>
        <div className="text-lg font-extrabold text-[#1C3B32]">{title}</div>
        <div className="text-[10px] text-[#7C8880]">{sub}</div>
      </div>
      <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
    </div>
    {children}
    <div className="text-center text-[9px] text-[#7C8880] mt-6 pt-2 border-t border-[#E4EDE7]">
      Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
    </div>
  </div>
);

export const LatinChartTool: React.FC = () => {
  const [cycle, setCycle] = useState<1 | 2>(1);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({
      pagesHtml,
      docTitle: cycle === 1 ? 'Latin Declension Charts' : 'Latin Conjugation Charts',
    });
  };

  const declTable = (d: (typeof DECLENSIONS)[number], filled: boolean) => (
    <div key={d.name} className="mb-4">
      <div className="text-[12px] font-extrabold text-[#2F5D50] mb-1">{d.name} Noun Endings</div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={headCell} style={{ width: 130 }}>Case</th>
            <th className={headCell}>Singular</th>
            <th className={headCell}>Plural</th>
          </tr>
        </thead>
        <tbody>
          {CASES.map((c, i) => (
            <tr key={c}>
              <td className={`${cell} font-bold text-[#44514A]`}>{c}</td>
              <td className={`${cell} text-center font-mono ${filled ? 'text-[#1C3B32] font-bold' : ''}`}>
                {filled ? d.sing[i] : ' '}
              </td>
              <td className={`${cell} text-center font-mono ${filled ? 'text-[#1C3B32] font-bold' : ''}`}>
                {filled ? d.plur[i] : ' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const tenseTable = (t: (typeof TENSES)[number], filled: boolean) => (
    <div key={t.name} className="mb-3">
      <div className="text-[12px] font-extrabold text-[#2F5D50] mb-1">
        {t.name} Tense <span className="font-normal text-[#7C8880] text-[10px]">({t.weeks} and {t.weeks.replace(/\d+/g, (n) => String(Number(n) + 12))})</span>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={headCell} style={{ width: 130 }}>Person</th>
            <th className={headCell}>Singular</th>
            <th className={headCell}>Plural</th>
          </tr>
        </thead>
        <tbody>
          {PERSONS.map((p, i) => (
            <tr key={p}>
              <td className={`${cell} font-bold text-[#44514A]`}>{p}</td>
              <td className={`${cell} text-center font-mono ${filled ? 'text-[#1C3B32] font-bold' : ''}`}>
                {filled ? t.sing[i] : ' '}
              </td>
              <td className={`${cell} text-center font-mono ${filled ? 'text-[#1C3B32] font-bold' : ''}`}>
                {filled ? t.plur[i] : ' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const caseBox = (
    <div className="mb-4 bg-[#EDF1EE] border border-[#D5DED8] rounded-md px-3 py-2 text-[11px] text-[#44514A]">
      <span className="font-bold text-[#1C3B32]">Remember the cases: </span>
      nominative - subject &middot; genitive - possessive &middot; dative - indirect object &middot;
      accusative - direct object &middot; ablative - object of the prep.
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2 text-[#2F5D50]">
          <Landmark className="w-6 h-6" />
          <h2 className="text-2xl font-extrabold text-[#2E2B26]">Latin Ending Charts</h2>
        </div>
        <button type="button" onClick={handlePrint}
          className="inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer">
          <Printer className="w-3.5 h-3.5" /> Print charts + key
        </button>
      </div>
      <p className="text-sm text-[#5C6B62] mb-4 max-w-2xl">
        Blank fill-in charts for the Latin endings, with an answer key. Say or sing the memory
        work, then write each ending from memory.
      </p>

      <div className="flex gap-2 mb-6 no-print">
        {([1, 2] as const).map((c) => (
          <button key={c} type="button" onClick={() => setCycle(c)}
            className={`text-xs font-bold px-4 py-2 rounded-lg border cursor-pointer ${
              cycle === c
                ? 'bg-[#2F5D50] text-white border-[#2F5D50]'
                : 'bg-white text-[#44514A] border-[#C2CFC6] hover:border-[#2F5D50]'
            }`}>
            {c === 1 ? 'Cycle 1 · Noun Declensions' : 'Cycle 2 · First Conjugation'}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {cycle === 1 ? (
          <>
            <Page title="Latin Noun Declensions" sub="Cycle 1 Latin · fill in every ending from memory"
              refCb={(el) => { pageRefs.current[0] = el; }}>
              {caseBox}
              {DECLENSIONS.map((d) => declTable(d, false))}
            </Page>
            <Page title="Latin Noun Declensions - Answer Key" sub="Cycle 1 Latin · verbatim from the guide"
              refCb={(el) => { pageRefs.current[1] = el; }}>
              {caseBox}
              {DECLENSIONS.map((d) => declTable(d, true))}
            </Page>
          </>
        ) : (
          <>
            <Page title="Latin First Conjugation Endings" sub="Cycle 2 Latin · fill in every ending from memory"
              refCb={(el) => { pageRefs.current[0] = el; }}>
              {TENSES.map((t) => tenseTable(t, false))}
            </Page>
            <Page title="Latin First Conjugation Endings - Answer Key" sub="Cycle 2 Latin · verbatim from the guide"
              refCb={(el) => { pageRefs.current[1] = el; }}>
              {TENSES.map((t) => tenseTable(t, true))}
            </Page>
          </>
        )}
      </div>
    </div>
  );
};
