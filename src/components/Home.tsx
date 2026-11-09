import React, { useState } from 'react';
import {
  PenTool,
  GitFork,
  Map,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Compass,
  Layers,
  FileText,
  ChevronDown,
  ChevronUp,
  Landmark,
  Calendar,
  Scroll,
} from 'lucide-react';
import { STARTER_CATEGORIES, StarterCategory } from '../data/starterPacks';
import { PRESIDENTS_VERBATIM_LIST } from '../data/presidentsData';
import { getVerifiedWeek24HistoryLines } from '../data/billOfRightsData';

interface HomeProps {
  onSelectTool: (
    tool: 'tracing' | 'diagram' | 'geography',
    options?: {
      category?: StarterCategory;
      presidentsConfig?: { mode: 'order' | 'vps'; start: number; end: number };
      billOfRightsConfig?: { start: number; end: number };
    }
  ) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectTool }) => {
  const [activeCycleTab, setActiveCycleTab] = useState<'cycle1' | 'cycle2' | 'cycle3' | 'iew' | 'presidents'>('cycle1');
  const [isOverviewExpanded, setIsOverviewExpanded] = useState<boolean>(true);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
      {/* Hero Welcome */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4EDE7] border border-[#D5DED8] text-[#2F5D50] text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-[#2F5D50]" />
          <span>Classical Conversations Community Companion</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E2B26] tracking-tight mb-2">
          CC Classroom Tools
        </h2>
        <p className="text-base sm:text-lg font-bold text-[#2F5D50] max-w-2xl mx-auto mb-1.5">
          Custom Tools for Classical Homeschool Parents & Tutors
        </p>
        <p className="text-xs sm:text-sm text-[#7C8880] max-w-2xl mx-auto leading-relaxed">
          Give your students more, every community day. Made by a CC parent, for CC parents.
        </p>
      </div>

      {/* Top-Level Category Buttons (Curriculum Memory Work) */}
      <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-4 sm:p-5 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2F5D50]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#2E2B26]">
              Worksheet Starter Categories
            </h3>
          </div>
          <span className="text-xs text-[#5C6B62]">
            Quick launch verified handwriting & memory work
          </span>
        </div>

        {/* Category Buttons Row - Bible, Timeline, Presidents & VPs, Bill of Rights */}
        <div className="flex flex-wrap gap-1.5">
          {STARTER_CATEGORIES.map((cat) => {
            const isPresidents = cat === 'Presidents & VPs';
            const isTimeline = cat === 'Timeline';
            const isBillOfRights = cat === 'Bill of Rights';
            const isBible = cat === 'Bible';
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (isPresidents) {
                    onSelectTool('tracing', {
                      category: 'Presidents & VPs',
                      presidentsConfig: { mode: 'vps', start: 1, end: 10 },
                    });
                  } else if (isBillOfRights) {
                    onSelectTool('tracing', {
                      category: 'Bill of Rights',
                      billOfRightsConfig: { start: 1, end: 10 },
                    });
                  } else {
                    onSelectTool('tracing', { category: cat });
                  }
                }}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold flex items-center gap-1.5 ${
                  isBillOfRights
                    ? 'bg-[#2F5D50] text-white hover:bg-[#24493e] shadow-xs'
                    : isBible
                    ? 'bg-[#FFFFFF] text-[#1C3B32] border border-[#BFD0C5] hover:bg-[#1C3B32] hover:text-white shadow-xs'
                    : isPresidents
                    ? 'bg-[#E4EDE7] text-[#2F5D50] border border-[#2F5D50]/40 hover:bg-[#2F5D50] hover:text-white'
                    : isTimeline
                    ? 'bg-[#E4EDE7] text-[#2F5D50] border border-[#2F5D50]/40 hover:bg-[#2F5D50] hover:text-white'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
                title={
                  isBillOfRights
                    ? 'The Bill of Rights (Verified Cycle 3 Week 24 History)'
                    : isBible
                    ? 'Bible Memory Work (Cycles 1–3 Memory Masters)'
                    : isPresidents
                    ? 'Presidents & VPs (1–47 verbatim list)'
                    : `Open ${cat} worksheets`
                }
              >
                {isBillOfRights && <Scroll className="w-3.5 h-3.5" />}
                {isBible && <BookOpen className="w-3.5 h-3.5" />}
                {isPresidents && <Landmark className="w-3.5 h-3.5" />}
                {isTimeline && <Calendar className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top-Level Bill of Rights Feature Section */}
      <div className="bg-[#FFFFFF] border-2 border-[#2F5D50]/30 rounded-xl p-5 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2F5D50]/10 text-[#2F5D50] text-xs font-bold">
              <Scroll className="w-3.5 h-3.5" />
              <span>Bill of Rights Section</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2E2B26] tracking-tight">
              The Bill of Rights Worksheets
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed">
              Verified Cycle 3 Week 24 History memory work for all ten amendments. One amendment per item, numbered 1 through 10, with model text on standard guide lines plus one trace row, optional freehand blank practice lines, and full support for print and cursive.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#44514A] pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                Verified Cycle 3 Week 24 History (100% word-for-word)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                All 10 or subset picker (e.g. 1–5, 6–10)
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                Clean print page breaks & cursive support
              </span>
            </div>
          </div>

          {/* Quick Generate Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Bill of Rights',
                  billOfRightsConfig: { start: 1, end: 10 },
                })
              }
              className="px-4 py-2.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Amendments 1–10 (All Ten)</span>
              <span>→</span>
            </button>
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Bill of Rights',
                  billOfRightsConfig: { start: 1, end: 5 },
                })
              }
              className="px-4 py-2.5 bg-white hover:bg-[#E4EDE7] text-[#2E2B26] border border-[#D5DED8] text-xs sm:text-sm font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Amendments 1–5</span>
            </button>
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Bill of Rights',
                  billOfRightsConfig: { start: 6, end: 10 },
                })
              }
              className="px-4 py-2 bg-white hover:bg-[#E4EDE7] text-[#2E2B26] border border-[#D5DED8] text-xs sm:text-sm font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Amendments 6–10</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top-Level Presidents & VPs Feature Section */}
      <div className="bg-[#FFFFFF] border-2 border-[#2F5D50]/30 rounded-xl p-5 sm:p-6 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2F5D50]/10 text-[#2F5D50] text-xs font-bold">
              <Landmark className="w-3.5 h-3.5" />
              <span>Presidents & VPs Section</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#2E2B26] tracking-tight">
              Presidents & Vice Presidents Worksheets
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed">
              Verbatim memory work for all 47 U.S. Presidents and their Vice Presidents from 1. George Washington — John Adams to 47. Donald Trump — JD Vance. Supports full-width rows with VPs, columns by measured width in order, and range pickers for quick custom packets (e.g. Presidents 1–10).
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#44514A] pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                Verbatim 47 list (John Tyler shows "(none)")
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                Presidents in order or with VPs
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50]" />
                Clean US Letter page breaks
              </span>
            </div>
          </div>

          {/* Quick Generate Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Presidents & VPs',
                  presidentsConfig: { mode: 'vps', start: 1, end: 10 },
                })
              }
              className="px-4 py-2.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Presidents 1–10 with VPs</span>
              <span>→</span>
            </button>
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Presidents & VPs',
                  presidentsConfig: { mode: 'order', start: 1, end: 10 },
                })
              }
              className="px-4 py-2.5 bg-white hover:bg-[#E4EDE7] text-[#2E2B26] border border-[#D5DED8] text-xs sm:text-sm font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Presidents 1–10 in Order</span>
            </button>
            <button
              onClick={() =>
                onSelectTool('tracing', {
                  category: 'Presidents & VPs',
                  presidentsConfig: { mode: 'vps', start: 1, end: 47 },
                })
              }
              className="px-4 py-2 bg-white hover:bg-[#E4EDE7] text-[#2E2B26] border border-[#D5DED8] text-xs sm:text-sm font-semibold rounded-lg shadow-2xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>All 47 Presidents with VPs</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Main Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Tool 1 */}
        <div
          onClick={() => onSelectTool('tracing')}
          className="group cursor-pointer bg-[#FFFFFF] border-2 border-[#D5DED8] hover:border-[#2F5D50] rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:bg-[#2F5D50] group-hover:text-white transition-colors">
              <PenTool className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D50] mb-1 block">
              Tool 1
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#2E2B26] mb-2 group-hover:text-[#2F5D50] transition-colors">
              Tracing Worksheet Maker
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed mb-4">
              Kindergarten 3-line guide lines: solid blue top line, dashed blue midline, and solid red baseline.
              Automatic word wrapping onto stacked guide lines so long sentences never clip.
            </p>
            <ul className="text-xs text-[#44514A] space-y-1.5 mb-6">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Print (Playwrite Manuscript) & Cursive (Playwrite US Trad)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Pre-loaded with CC Cycles 1, 2, 3, Bill of Rights, & IEW</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Dotted & gray workbook tracing styles with guide lines</span>
              </li>
            </ul>
          </div>
          <button className="w-full py-2.5 px-4 rounded-lg bg-[#2F5D50] text-white font-semibold text-sm hover:bg-[#24493e] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <span>Open Tracing Maker</span>
            <span>→</span>
          </button>
        </div>

        {/* Tool 2 */}
        <div
          onClick={() => onSelectTool('diagram')}
          className="group cursor-pointer bg-[#FFFFFF] border-2 border-[#D5DED8] hover:border-[#2F5D50] rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:bg-[#2F5D50] group-hover:text-white transition-colors">
              <GitFork className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D50] mb-1 block">
              Tool 2
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#2E2B26] mb-2 group-hover:text-[#2F5D50] transition-colors">
              Sentence Diagram Maker
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed mb-4">
              Type any English sentence to generate classic Reed-Kellogg diagrams tailored to the Essentials
              7 sentence patterns. AI-powered grammatical analysis with child-friendly explanations.
            </p>
            <ul className="text-xs text-[#44514A] space-y-1.5 mb-6">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Classic baselines, dividers, slants & preposition pedestals</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Toggleable Sample & Blank diagram practice sheets</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>Complete Essentials library: S-Vi through S-Vt-DO-OCA</span>
              </li>
            </ul>
          </div>
          <button className="w-full py-2.5 px-4 rounded-lg bg-[#2F5D50] text-white font-semibold text-sm hover:bg-[#24493e] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <span>Open Diagram Maker</span>
            <span>→</span>
          </button>
        </div>

        {/* Tool 3 */}
        <div
          onClick={() => onSelectTool('geography')}
          className="group cursor-pointer bg-[#FFFFFF] border-2 border-[#D5DED8] hover:border-[#2F5D50] rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center mb-4 group-hover:bg-[#2F5D50] group-hover:text-white transition-colors">
              <Map className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D50] mb-1 block">
              Tool 3
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#2E2B26] mb-2 group-hover:text-[#2F5D50] transition-colors">
              US Geography Study Pages
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed mb-4">
              Explore regional cartography for classical grammar stage geography. Labeled study maps with state
              borders, capital dots, copywork lists, dotted tracing maps, and draw-from-memory boxes.
            </p>
            <ul className="text-xs text-[#44514A] space-y-1.5 mb-6">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>East Coast, Midwest, West Coast, and regional maps</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>State & capital copywork with kindergarten guide lines</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                <span>"Draw it from memory" classical cartography box</span>
              </li>
            </ul>
          </div>
          <button className="w-full py-2.5 px-4 rounded-lg bg-[#2F5D50] text-white font-semibold text-sm hover:bg-[#24493e] transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <span>Open Geography Pages</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Foundations Cycle Overviews & IEW Reference Hub */}
      <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#2E2B26]">
                Foundations Cycle Overviews & Essentials IEW Guide
              </h3>
              <p className="text-xs text-[#5C6B62]">
                Reference guide for Classical Conversations Cycle 1, Cycle 2, Cycle 3, and IEW Writing
              </p>
            </div>
          </div>
          <button className="text-[#2F5D50] p-1">
            {isOverviewExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isOverviewExpanded && (
          <div className="mt-5 pt-4 border-t border-[#D5DED8]">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActiveCycleTab('cycle1')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCycleTab === 'cycle1'
                    ? 'bg-[#2F5D50] text-white shadow-xs'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
              >
                Cycle 1: Ancient History & Biology
              </button>
              <button
                type="button"
                onClick={() => setActiveCycleTab('cycle2')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCycleTab === 'cycle2'
                    ? 'bg-[#2F5D50] text-white shadow-xs'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
              >
                Cycle 2: Medieval History & Astronomy
              </button>
              <button
                type="button"
                onClick={() => setActiveCycleTab('cycle3')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCycleTab === 'cycle3'
                    ? 'bg-[#2F5D50] text-white shadow-xs'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
              >
                Cycle 3: Early America & Anatomy
              </button>
              <button
                type="button"
                onClick={() => setActiveCycleTab('iew')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCycleTab === 'iew'
                    ? 'bg-[#2F5D50] text-white shadow-xs'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
              >
                Essentials & IEW Reference
              </button>
              <button
                type="button"
                onClick={() => setActiveCycleTab('presidents')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeCycleTab === 'presidents'
                    ? 'bg-[#2F5D50] text-white shadow-xs'
                    : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Presidents & VPs (All 47)</span>
              </button>
            </div>

            {/* Cycle 1 Content */}
            {activeCycleTab === 'cycle1' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#1C3B32] uppercase tracking-wider text-[11px]">Bible (Creation to Moses)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Creation Days 1–6, Covenants with Adam, Noah, Abraham, Moses, 12 Sons of Israel, 10 Plagues of Egypt, 10 Jewish Feasts, Tabernacle & 5 Sacrifices.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">History (Ancient)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Ten Commandments, Early Empires (Kush, Babylon, Assyria, Persia), Greek & Roman Gods, Seven Wonders, Fall of Rome, Feudalism, Crusades.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Science (Biology & Earth)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Classifications of Living Things, Five Kingdoms, Parts of a Plant Cell, Invertebrates, Kinds of Seeds, Ocean Zones, Earth's Layers, Rock Types.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Latin (Declensions)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    1st Declension Noun Endings (-a, -ae), 2nd Declension (-us, -i), 3rd Declension, 4th Declension (-us, -us), 5th Declension (-es, -ei).
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">English & Geography</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Helping Verbs, Linking Verbs, Prepositions (about... through). Fertile Crescent, Ancient Egypt, Greece, Roman Empire, Africa.
                  </p>
                </div>
              </div>
            )}

            {/* Cycle 2 Content */}
            {activeCycleTab === 'cycle2' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#1C3B32] uppercase tracking-wider text-[11px]">Bible (Judges to Jesus)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    8 Significant Judges, 3 Kings of United Israel, David, Covenant with David, Solomon's Temple, 18 Significant Prophets, Captivities, Names of God.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">History (Medieval - Modern)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Charlemagne (800 A.D.), William the Conqueror (1066), Magna Carta (1215), Renaissance, Reformation, French Revolution, WWI, WWII.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Science (Astronomy & Physics)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Producers/Consumers, Biomes, Solar System, Sun & Planets, Moon Phases, Newton's 3 Laws of Motion, Thermodynamics, Kinds of Electricity.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Latin (Conjugations)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    1st Conjugation Verb Endings: Present (-o, -s, -t), Imperfect (-bam, -bas), Future (-bo, -bis), Perfect (-i, -isti), Pluperfect, Future Perfect.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">English & Geography</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Pronoun Orders, Subject/Object/Possessive Pronouns, Adverbs, Conjunctions. Medieval Europe, Slavic Countries, Baltic States, Asia.
                  </p>
                </div>
              </div>
            )}

            {/* Cycle 3 Content */}
            {activeCycleTab === 'cycle3' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#1C3B32] uppercase tracking-wider text-[11px]">Bible (Gospels to Revelation)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Themes & Divisions, 66 Books of the Bible in Order (OT & NT), Jesus in Gospels, 12 Disciples, Judas, New Covenant, Acts, Paul, Revelation.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">History (Early America)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Columbus (1492), Pilgrims (1620), Boston Tea Party (1773), Declaration of Independence (1776), Constitution, Bill of Rights, Civil War.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Science (Anatomy & Chemistry)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    14 Systems of the Human Body, Axial & Appendicular Skeleton, Muscles, Respiratory & Circulatory, Digestive System, Periodic Table, Atoms.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Latin (John 1:1–7)</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    "In principio erat Verbum...", translation and memorization of the Prologue of the Gospel of John, Latin verb principal parts and rules.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">English & Geography</h5>
                  <p className="text-[#44514A] leading-relaxed">
                    Principal Parts of Verbs (Infinitive, Present, Past, Present Participle, Past Participle), Irregular Verbs. All 50 US States & Capitals.
                  </p>
                </div>
              </div>
            )}

            {/* IEW Essentials Content */}
            {activeCycleTab === 'iew' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">IEW [1]–[6] Sentence Openers</h5>
                  <ul className="text-[#44514A] space-y-1">
                    <li><strong className="text-[#2E2B26]">[1] Subject:</strong> The boy ran quickly.</li>
                    <li><strong className="text-[#2E2B26]">[2] Prepositional:</strong> In the forest, birds sang.</li>
                    <li><strong className="text-[#2E2B26]">[3] -ly Adverb:</strong> Swiftly, the eagle swooped.</li>
                    <li><strong className="text-[#2E2B26]">[4] -ing Participle:</strong> Laughing aloud, they arrived.</li>
                    <li><strong className="text-[#2E2B26]">[5] Clausal (www.asia.b):</strong> Because it rained, we stayed.</li>
                    <li><strong className="text-[#2E2B26]">[6] V.S.S. (≤5 words):</strong> Fear vanished.</li>
                  </ul>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">The Six Stylistic Dress-Ups</h5>
                  <ul className="text-[#44514A] space-y-1">
                    <li><strong className="text-[#2E2B26]">1. -ly Adverb:</strong> (cautiously, eagerly)</li>
                    <li><strong className="text-[#2E2B26]">2. Who / Which Clause:</strong> (who protected the kingdom)</li>
                    <li><strong className="text-[#2E2B26]">3. Strong Verb:</strong> (vanquished instead of beat)</li>
                    <li><strong className="text-[#2E2B26]">4. Quality Adjective:</strong> (astounding, majestic)</li>
                    <li><strong className="text-[#2E2B26]">5. www.asia.b Clause:</strong> (when, where, while, as, since, if, although, because)</li>
                    <li><strong className="text-[#2E2B26]">6. Dual Adjectives/Verbs:</strong> (brave and loyal)</li>
                  </ul>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-[#D5DED8] space-y-1.5">
                  <h5 className="font-bold text-[#2F5D50] uppercase tracking-wider text-[11px]">Essentials 7 Sentence Patterns</h5>
                  <ul className="text-[#44514A] space-y-1">
                    <li><strong className="text-[#2E2B26]">S-Vi:</strong> Jesus wept.</li>
                    <li><strong className="text-[#2E2B26]">S-Vt-DO:</strong> God made the world.</li>
                    <li><strong className="text-[#2E2B26]">S-Vl-PN:</strong> Jesus is Lord.</li>
                    <li><strong className="text-[#2E2B26]">S-Vl-PA:</strong> God is holy.</li>
                    <li><strong className="text-[#2E2B26]">S-Vt-IO-DO:</strong> Mother gave me bread.</li>
                    <li><strong className="text-[#2E2B26]">S-Vt-DO-OCN:</strong> They called him hero.</li>
                    <li><strong className="text-[#2E2B26]">S-Vt-DO-OCA:</strong> The king painted the door gold.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Presidents & VPs Verbatim Guide Content */}
            {activeCycleTab === 'presidents' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-[#D5DED8]">
                  <div>
                    <h5 className="font-bold text-[#2F5D50] text-sm">
                      47 U.S. Presidents & Vice Presidents Verbatim Reference
                    </h5>
                    <p className="text-xs text-[#5C6B62]">
                      From George Washington to Donald Trump. John Tyler shows "(none)".
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onSelectTool('tracing', {
                          category: 'Presidents & VPs',
                          presidentsConfig: { mode: 'vps', start: 1, end: 10 },
                        })
                      }
                      className="px-3 py-1.5 bg-[#2F5D50] text-white text-xs font-bold rounded-md hover:bg-[#24493e] transition-colors cursor-pointer"
                    >
                      Create 1–10 Packet
                    </button>
                    <button
                      onClick={() =>
                        onSelectTool('tracing', {
                          category: 'Presidents & VPs',
                          presidentsConfig: { mode: 'vps', start: 1, end: 47 },
                        })
                      }
                      className="px-3 py-1.5 bg-white border border-[#D5DED8] text-[#2E2B26] text-xs font-semibold rounded-md hover:bg-[#E4EDE7] transition-colors cursor-pointer"
                    >
                      Create All 47 Packet
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
                  {PRESIDENTS_VERBATIM_LIST.map((p) => (
                    <div
                      key={p.order}
                      className="bg-white p-2.5 rounded-md border border-[#D5DED8]/70 text-xs flex flex-col justify-between"
                    >
                      <div className="font-bold text-[#2E2B26] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#2F5D50]/10 text-[#2F5D50] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {p.order}
                        </span>
                        <span className="truncate">{p.president}</span>
                      </div>
                      <div className="text-[11px] text-[#5C6B62] mt-1 pl-6">
                        VP: <span className="font-medium text-[#2E2B26]">{p.vicePresidents}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Classical Teaching Tip */}
      <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#2F5D50]/10 text-[#2F5D50] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-[#2E2B26] text-base mb-1">
            Classical Teaching Tip for Tutors & Parents
          </h4>
          <p className="text-xs sm:text-sm text-[#5C6B62] leading-relaxed">
            In the classical grammar stage, repetition and imitation form the foundation of lifelong fluency.
            Start with solid handwriting models, move to dotted tracing on guidelines, and finish with independent copywork.
            In Essentials, combine analytical parsing with Reed-Kellogg diagramming and IEW dress-ups to master grammar and writing.
          </p>
        </div>
      </div>
    </div>
  );
};
