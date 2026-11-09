import React, { useMemo, useRef, useState } from 'react';
import { Calculator, Printer, RefreshCw, Sparkles } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';

/**
 * Math Practice Builder
 * Traditional-algorithm practice sheets: addition, subtraction, multiplication
 * tables, long division (classic bracket), rounding, and skip counting.
 * Everything is generated deterministically from a seed. No AI anywhere.
 */

type AddSubLevel = 'facts' | 'two' | 'twoRegroup' | 'three';
type MultLevel = 'table' | 'twoByOne';
type DivLevel = 'facts' | 'twoByOne' | 'threeByOne';
type RoundLevel = 'ten2' | 'ten3' | 'hundred';

interface Problem {
  a: number;
  b: number;
  op: '+' | '-' | 'x' | 'div';
  answer: number;
  remainder?: number;
}

// Deterministic PRNG so "Shuffle" is reproducible and print matches screen.
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const ri = (rnd: () => number, lo: number, hi: number) =>
  lo + Math.floor(rnd() * (hi - lo + 1));

function genAddition(rnd: () => number, level: AddSubLevel, n: number): Problem[] {
  const out: Problem[] = [];
  while (out.length < n) {
    let a = 0, b = 0;
    if (level === 'facts') { a = ri(rnd, 2, 12); b = ri(rnd, 2, 12); }
    else if (level === 'two') {
      // no regrouping: digit sums stay below 10
      const a1 = ri(rnd, 1, 8), a0 = ri(rnd, 0, 8);
      const b1 = ri(rnd, 1, 9 - a1), b0 = ri(rnd, 0, 9 - a0);
      a = a1 * 10 + a0; b = b1 * 10 + b0;
    } else if (level === 'twoRegroup') {
      const a0 = ri(rnd, 2, 9), b0 = ri(rnd, 10 - a0, 9); // force ones carry
      a = ri(rnd, 1, 7) * 10 + a0; b = ri(rnd, 1, 8) * 10 + b0;
    } else { a = ri(rnd, 100, 899); b = ri(rnd, 100, 899); }
    out.push({ a, b, op: '+', answer: a + b });
  }
  return out;
}

function genSubtraction(rnd: () => number, level: AddSubLevel, n: number): Problem[] {
  const out: Problem[] = [];
  while (out.length < n) {
    let a = 0, b = 0;
    if (level === 'facts') { b = ri(rnd, 2, 9); a = b + ri(rnd, 1, 11); }
    else if (level === 'two') {
      const a1 = ri(rnd, 2, 9), a0 = ri(rnd, 1, 9);
      const b1 = ri(rnd, 1, a1 - 1), b0 = ri(rnd, 0, a0); // no borrowing
      a = a1 * 10 + a0; b = b1 * 10 + b0;
    } else if (level === 'twoRegroup') {
      const a1 = ri(rnd, 3, 9), a0 = ri(rnd, 0, 7);
      const b1 = ri(rnd, 1, a1 - 1), b0 = ri(rnd, a0 + 1, 9); // force borrow
      a = a1 * 10 + a0; b = b1 * 10 + b0;
    } else { a = ri(rnd, 300, 999); b = ri(rnd, 100, a - 100); }
    out.push({ a, b, op: '-', answer: a - b });
  }
  return out;
}

function genMultiplication(rnd: () => number, level: MultLevel, table: number, n: number): Problem[] {
  if (level === 'table') {
    const factors = Array.from({ length: 15 }, (_, i) => i + 1);
    // Fisher-Yates shuffle so the drill is never in counting order
    for (let i = factors.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [factors[i], factors[j]] = [factors[j], factors[i]];
    }
    return factors.slice(0, n).map((f) => ({ a: table, b: f, op: 'x' as const, answer: table * f }));
  }
  const out: Problem[] = [];
  while (out.length < n) {
    const a = ri(rnd, 12, 89), b = ri(rnd, 2, 9);
    out.push({ a, b, op: 'x', answer: a * b });
  }
  return out;
}

function genDivision(rnd: () => number, level: DivLevel, allowRemainder: boolean, n: number): Problem[] {
  const out: Problem[] = [];
  while (out.length < n) {
    const d = ri(rnd, 2, 9);
    let q = 0;
    if (level === 'facts') q = ri(rnd, 2, 12);
    else if (level === 'twoByOne') q = ri(rnd, 10, 19);
    else q = ri(rnd, 100, 160);
    const r = allowRemainder && level !== 'facts' ? ri(rnd, 0, d - 1) : 0;
    const dividend = d * q + r;
    out.push({ a: dividend, b: d, op: 'div', answer: q, remainder: r });
  }
  return out;
}

function genRounding(rnd: () => number, level: RoundLevel, n: number) {
  const out: { value: number; to: number; answer: number }[] = [];
  while (out.length < n) {
    let v = 0, to = 10;
    if (level === 'ten2') { v = ri(rnd, 11, 98); to = 10; }
    else if (level === 'ten3') { v = ri(rnd, 101, 989); to = 10; }
    else { v = ri(rnd, 110, 989); to = 100; }
    if (v % to === 0) continue; // skip already-round numbers
    out.push({ value: v, to, answer: Math.round(v / to) * to });
  }
  return out;
}

function genSkip(table: number) {
  const seq = Array.from({ length: 15 }, (_, i) => table * (i + 1));
  // blank every third value
  return seq.map((v, i) => ({ v, blank: i % 3 === 2 }));
}

const PAGE_W = 816; // 8.5in at 96dpi, matches worksheet pages

export const MathPracticeTool: React.FC = () => {
  const [types, setTypes] = useState({
    addition: true, subtraction: true, multiplication: false,
    longDivision: true, rounding: true, skip: false,
  });
  const [addLevel, setAddLevel] = useState<AddSubLevel>('twoRegroup');
  const [subLevel, setSubLevel] = useState<AddSubLevel>('twoRegroup');
  const [multLevel, setMultLevel] = useState<MultLevel>('table');
  const [divLevel, setDivLevel] = useState<DivLevel>('threeByOne');
  const [allowRemainder, setAllowRemainder] = useState(true);
  const [roundLevel, setRoundLevel] = useState<RoundLevel>('ten2');
  const [table, setTable] = useState(3);
  const [answerKey, setAnswerKey] = useState(true);
  const [seed, setSeed] = useState(7);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sheets = useMemo(() => {
    const rnd = mulberry32(seed * 1000 + 17);
    const built: { title: string; kind: string; problems?: Problem[]; rounding?: ReturnType<typeof genRounding>; skip?: ReturnType<typeof genSkip> }[] = [];
    if (types.addition) built.push({ title: 'Addition', kind: 'addsub', problems: genAddition(rnd, addLevel, 20) });
    if (types.subtraction) built.push({ title: 'Subtraction', kind: 'addsub', problems: genSubtraction(rnd, subLevel, 20) });
    if (types.multiplication) built.push({
      title: multLevel === 'table' ? `Multiplication: ${table}s Table` : 'Multiplication',
      kind: multLevel === 'table' ? 'drill' : 'addsub',
      problems: genMultiplication(rnd, multLevel, table, multLevel === 'table' ? 15 : 20),
    });
    if (types.longDivision) built.push({ title: 'Long Division', kind: 'longdiv', problems: genDivision(rnd, divLevel, allowRemainder, 6) });
    if (types.rounding) built.push({
      title: roundLevel === 'hundred' ? 'Rounding to the Nearest 100' : 'Rounding to the Nearest 10',
      kind: 'rounding', rounding: genRounding(rnd, roundLevel, 12),
    });
    if (types.skip) built.push({ title: `Skip Counting: ${table}s`, kind: 'skip', skip: genSkip(table) });
    return built;
  }, [types, addLevel, subLevel, multLevel, divLevel, allowRemainder, roundLevel, table, seed]);

  const anyType = Object.values(types).some(Boolean);

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: 'Math Practice' });
  };

  const vertical = (p: Problem, i: number) => (
    <div key={i} className="flex gap-2 items-start">
      <span className="text-[10px] text-[#7C8880] w-5 pt-1 text-right shrink-0">{i + 1})</span>
      <div className="font-mono text-[17px] leading-tight text-right min-w-[64px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <div className="pr-1">{p.a}</div>
        <div className="border-b-2 border-[#2E2B26] pr-1">
          {p.op === 'x' ? '×' : p.op === '-' ? '−' : '+'} {p.b}
        </div>
        <div className="h-9"></div>
      </div>
    </div>
  );

  const longDiv = (p: Problem, i: number) => (
    <div key={i} className="flex gap-2 items-start">
      <span className="text-[10px] text-[#7C8880] w-5 pt-6 text-right shrink-0">{i + 1})</span>
      <div className="font-mono text-[18px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <div className="pl-7 h-7 border-b-0 text-[#C2CFC6] tracking-[6px] select-none"> </div>
        <div className="flex">
          <span className="pr-1.5">{p.b}</span>
          <span className="border-t-2 border-l-2 border-[#2E2B26] pl-2 pr-4 pt-0.5">{p.a}</span>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-extrabold text-[#2E2B26] flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#2F5D50]" /> Math Practice Builder
        </h2>
        <button type="button" onClick={handlePrint} disabled={!anyType}
          className="px-4 py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer disabled:opacity-50">
          <Printer className="w-4 h-4" /> Print Practice Sheets
        </button>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-5 items-start">
        {/* Controls */}
        <div className="bg-white border border-[#D5DED8] rounded-xl p-4 space-y-3 no-print">
          <p className="text-[11px] text-[#5C6B62]">
            Traditional algorithms only: stack it, carry it, borrow it, bring it down. Check what to practice:
          </p>

          {([
            ['addition', 'Addition'], ['subtraction', 'Subtraction'],
            ['multiplication', 'Multiplication'], ['longDivision', 'Long Division'],
            ['rounding', 'Rounding'], ['skip', 'Skip Counting'],
          ] as const).map(([key, label]) => (
            <div key={key} className="border border-[#E4EDE7] rounded-lg p-2 space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-bold text-[#2E2B26] cursor-pointer">
                <input type="checkbox" checked={(types as any)[key]}
                  onChange={(e) => setTypes((t) => ({ ...t, [key]: e.target.checked }))}
                  className="rounded text-[#2F5D50]" />
                {label}
              </label>
              {key === 'addition' && types.addition && (
                <select value={addLevel} onChange={(e) => setAddLevel(e.target.value as AddSubLevel)} className="w-full text-[11px] border border-[#C2CFC6] rounded p-1">
                  <option value="facts">Facts (through 12 + 12)</option>
                  <option value="two">2-digit, no carrying</option>
                  <option value="twoRegroup">2-digit with carrying</option>
                  <option value="three">3-digit</option>
                </select>
              )}
              {key === 'subtraction' && types.subtraction && (
                <select value={subLevel} onChange={(e) => setSubLevel(e.target.value as AddSubLevel)} className="w-full text-[11px] border border-[#C2CFC6] rounded p-1">
                  <option value="facts">Facts (through 20)</option>
                  <option value="two">2-digit, no borrowing</option>
                  <option value="twoRegroup">2-digit with borrowing</option>
                  <option value="three">3-digit</option>
                </select>
              )}
              {key === 'multiplication' && types.multiplication && (
                <div className="space-y-1">
                  <select value={multLevel} onChange={(e) => setMultLevel(e.target.value as MultLevel)} className="w-full text-[11px] border border-[#C2CFC6] rounded p-1">
                    <option value="table">One table, mixed-up drill</option>
                    <option value="twoByOne">2-digit × 1-digit (stacked)</option>
                  </select>
                </div>
              )}
              {key === 'longDivision' && types.longDivision && (
                <div className="space-y-1">
                  <select value={divLevel} onChange={(e) => setDivLevel(e.target.value as DivLevel)} className="w-full text-[11px] border border-[#C2CFC6] rounded p-1">
                    <option value="facts">Division facts (from the tables)</option>
                    <option value="twoByOne">2-digit ÷ 1-digit</option>
                    <option value="threeByOne">3-digit ÷ 1-digit</option>
                  </select>
                  <label className="flex items-center gap-1.5 text-[11px] text-[#44514A] cursor-pointer">
                    <input type="checkbox" checked={allowRemainder} onChange={(e) => setAllowRemainder(e.target.checked)} className="rounded text-[#2F5D50]" />
                    Allow remainders
                  </label>
                </div>
              )}
              {key === 'rounding' && types.rounding && (
                <select value={roundLevel} onChange={(e) => setRoundLevel(e.target.value as RoundLevel)} className="w-full text-[11px] border border-[#C2CFC6] rounded p-1">
                  <option value="ten2">Nearest 10 (2-digit numbers)</option>
                  <option value="ten3">Nearest 10 (3-digit numbers)</option>
                  <option value="hundred">Nearest 100</option>
                </select>
              )}
              {(key === 'multiplication' || key === 'skip') && (types.multiplication || types.skip) && (key === 'skip' ? types.skip : multLevel === 'table') && (
                <label className="flex items-center gap-1.5 text-[11px] text-[#44514A]">
                  Table:
                  <select value={table} onChange={(e) => setTable(Number(e.target.value))} className="border border-[#C2CFC6] rounded p-0.5 text-[11px]">
                    {Array.from({ length: 14 }, (_, i) => i + 2).map((t) => <option key={t} value={t}>{t}s</option>)}
                  </select>
                </label>
              )}
            </div>
          ))}

          <label className="flex items-center gap-2 text-xs font-bold text-[#2E2B26] cursor-pointer pt-1">
            <input type="checkbox" checked={answerKey} onChange={(e) => setAnswerKey(e.target.checked)} className="rounded text-[#2F5D50]" />
            Add an Answer Key page
          </label>

          <button type="button" onClick={() => setSeed((s) => s + 1)}
            className="w-full py-1.5 border border-[#2F5D50] text-[#2F5D50] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#E4EDE7]">
            <RefreshCw className="w-3.5 h-3.5" /> Shuffle New Problems
          </button>
        </div>

        {/* Pages */}
        <div className="space-y-6">
          {!anyType && (
            <div className="bg-white border border-[#D5DED8] rounded-xl p-8 text-center text-sm text-[#5C6B62]">
              <Sparkles className="w-5 h-5 mx-auto mb-2 text-[#2F5D50]" />
              Check at least one practice type to build sheets.
            </div>
          )}
          {sheets.map((sheet, sIdx) => (
            <div key={`${sheet.title}-${sIdx}`} ref={(el) => { pageRefs.current[sIdx] = el; }}
              className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
              style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
              <div className="flex items-end justify-between border-b-2 border-[#2E2B26] pb-2 mb-4">
                <div>
                  <div className="text-lg font-extrabold text-[#2E2B26]">{sheet.title}</div>
                  <div className="text-[10px] text-[#7C8880]">Math Practice · traditional method · show your work</div>
                </div>
                <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
              </div>

              {sheet.kind === 'rounding' && (
                <div className="mb-4 border border-[#D5DED8] bg-[#E4EDE7] rounded-lg p-3 text-[12px] text-[#2E2B26]">
                  <span className="font-bold">The rounding rule:</span> find the place you are rounding to, then look at the digit right after it.
                  <span className="italic"> "4 or less, let it rest. 5 or more, raise the score."</span>
                  <div className="mt-1 text-[11px] text-[#44514A]">
                    Example: 47 to the nearest 10 → the ones digit is 7, so round up → <span className="font-bold">50</span>.
                    &nbsp;Example: 42 → the ones digit is 2, so it rests → <span className="font-bold">40</span>.
                  </div>
                </div>
              )}

              {sheet.kind === 'addsub' && (
                <div className="grid grid-cols-4 gap-x-6 gap-y-5">{sheet.problems!.map(vertical)}</div>
              )}
              {sheet.kind === 'drill' && (
                <div className="grid grid-cols-3 gap-x-10 gap-y-4 font-mono text-[17px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {sheet.problems!.map((p, i) => (
                    <div key={i} className="flex items-baseline gap-1.5">
                      <span className="text-[10px] text-[#7C8880] w-5 text-right">{i + 1})</span>
                      <span>{p.a} × {p.b} = ______</span>
                    </div>
                  ))}
                </div>
              )}
              {sheet.kind === 'longdiv' && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-6">{sheet.problems!.map(longDiv)}</div>
              )}
              {sheet.kind === 'rounding' && (
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[15px]">
                  {sheet.rounding!.map((r, i) => (
                    <div key={i} className="flex items-baseline gap-1.5">
                      <span className="text-[10px] text-[#7C8880] w-5 text-right">{i + 1})</span>
                      <span>Round <span className="font-bold">{r.value}</span> to the nearest {r.to}: ________</span>
                    </div>
                  ))}
                </div>
              )}
              {sheet.kind === 'skip' && (
                <div className="text-[20px] font-mono flex flex-wrap gap-x-3 gap-y-6 pt-4" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {sheet.skip!.map((s, i) => (
                    <span key={i}>{s.blank ? '______' : s.v}{i < 14 ? ',' : ''}</span>
                  ))}
                </div>
              )}

              <div className="text-center text-[10px] text-[#7C8880] mt-10 pt-3 border-t border-[#E4EDE7]">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          ))}

          {anyType && answerKey && (
            <div ref={(el) => { pageRefs.current[sheets.length] = el; }}
              className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
              style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
              <div className="border-b-2 border-[#2E2B26] pb-2 mb-4">
                <div className="text-lg font-extrabold text-[#2E2B26]">ANSWER KEY</div>
                <div className="text-[10px] text-[#7C8880]">For the grown-up with the red pen</div>
              </div>
              <div className="space-y-4 text-[13px]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {sheets.map((sheet, sIdx) => (
                  <div key={sIdx}>
                    <div className="font-bold text-[#2F5D50] mb-1">{sheet.title}</div>
                    <div className="grid grid-cols-5 gap-x-4 gap-y-0.5 font-mono">
                      {sheet.problems?.map((p, i) => (
                        <span key={i}>{i + 1}) {p.answer}{p.op === 'div' && p.remainder ? ` R${p.remainder}` : ''}</span>
                      ))}
                      {sheet.rounding?.map((r, i) => <span key={i}>{i + 1}) {r.answer}</span>)}
                      {sheet.skip && <span className="col-span-5">{sheet.skip.map((s) => s.v).join(', ')}</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-[10px] text-[#7C8880] mt-10 pt-3 border-t border-[#E4EDE7]">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
