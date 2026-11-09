import React, { useState } from 'react';
import {
  ArrowLeft,
  GitFork,
  Printer,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  BookOpen,
  Eye,
} from 'lucide-react';
import { DIAGRAM_LIBRARY, PRACTICE_SENTENCES, LibrarySentence } from '../data/diagramLibrary';
import { DiagramAnalysis, DiagramClause, Modifier, Complement } from '../types';
import { AskAiHelper } from './AskAiHelper';
import { callGeminiWithRetry } from '../utils/geminiClient';
import { printWorksheetPages } from '../utils/printHelper';
import { enforceExpletiveAnalysis } from '../utils/expletiveHelper';
import { RefreshCw } from 'lucide-react';

interface DiagramToolProps {
  onBack: () => void;
  onAddToWorksheet?: (lines: string[], questionTitle?: string) => void;
}

// Chart A canonical 8 Parts of Speech mapping + Expletive (independent placeholder element)
export const CHART_A_POS: Record<string, { code: string; name: string }> = {
  n: { code: 'N', name: 'noun' },
  noun: { code: 'N', name: 'noun' },
  v: { code: 'V', name: 'verb' },
  verb: { code: 'V', name: 'verb' },
  p: { code: 'P', name: 'pronoun' },
  pronoun: { code: 'P', name: 'pronoun' },
  av: { code: 'AV', name: 'adverb' },
  adverb: { code: 'AV', name: 'adverb' },
  adv: { code: 'AV', name: 'adverb' },
  c: { code: 'C', name: 'conjunction' },
  conjunction: { code: 'C', name: 'conjunction' },
  conj: { code: 'C', name: 'conjunction' },
  i: { code: 'I', name: 'interjection' },
  interjection: { code: 'I', name: 'interjection' },
  int: { code: 'I', name: 'interjection' },
  pr: { code: 'Pr', name: 'preposition' },
  preposition: { code: 'Pr', name: 'preposition' },
  prep: { code: 'Pr', name: 'preposition' },
  aj: { code: 'AJ', name: 'adjective' },
  adjective: { code: 'AJ', name: 'adjective' },
  adj: { code: 'AJ', name: 'adjective' },
  article: { code: 'AJ', name: 'adjective' },
  possessive: { code: 'P / AJ', name: 'possessive' },
  expletive: { code: 'EXP', name: 'expletive' },
  exp: { code: 'EXP', name: 'expletive' },
};

export function normalizePos(pos: string): { code: string; name: string } {
  const clean = (pos || '').toLowerCase().trim();
  if (CHART_A_POS[clean]) return CHART_A_POS[clean];
  if (clean === 'exp' || clean === 'expletive') return CHART_A_POS.expletive;
  // Check if starts with one of our codes
  if (clean === 'n') return CHART_A_POS.n;
  if (clean === 'v') return CHART_A_POS.v;
  if (clean === 'p') return CHART_A_POS.p;
  if (clean === 'av') return CHART_A_POS.av;
  if (clean === 'c') return CHART_A_POS.c;
  if (clean === 'i') return CHART_A_POS.i;
  if (clean === 'pr') return CHART_A_POS.pr;
  if (clean === 'aj') return CHART_A_POS.aj;
  return { code: pos.toUpperCase(), name: pos };
}

export const DiagramTool: React.FC<DiagramToolProps> = ({ onBack, onAddToWorksheet }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'all-seven'>('single');
  const [inputSentence, setInputSentence] = useState('The courageous knights protected the castle.');
  const [currentAnalysis, setCurrentAnalysis] = useState<DiagramAnalysis>(DIAGRAM_LIBRARY[1].data);
  const [activeSentenceText, setActiveSentenceText] = useState('The courageous knights protected the castle.');
  const [isLoading, setIsLoading] = useState(false);
  const [diagramStatus, setDiagramStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sample' | 'blank'>('sample');
  const [showSampleOnBlank, setShowSampleOnBlank] = useState(false);
  const [showSlotLabels, setShowSlotLabels] = useState(true);

  const handleDiagram = async () => {
    if (!inputSentence.trim()) return;

    // Check if sentence matches one in library first
    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    const allKnown = [...DIAGRAM_LIBRARY, ...PRACTICE_SENTENCES];
    const matched = allKnown.find(
      (item) => normalize(item.sentence) === normalize(inputSentence)
    );
    if (matched) {
      setCurrentAnalysis(enforceExpletiveAnalysis(matched.data, inputSentence));
      setActiveSentenceText(inputSentence.trim());
      setErrorMsg(null);
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setDiagramStatus(null);

    try {
      const data = await callGeminiWithRetry<DiagramAnalysis>({
        url: '/api/gemini/diagram',
        body: { sentence: inputSentence.trim() },
        onStatusUpdate: (status) => setDiagramStatus(status),
      });

      if (!data || !Array.isArray(data.clauses) || data.clauses.length === 0) {
        throw new Error('Diagram analysis response missing valid clauses structure');
      }

      const verifiedData = enforceExpletiveAnalysis(data, inputSentence.trim());
      setCurrentAnalysis(verifiedData);
      setActiveSentenceText(inputSentence.trim());
    } catch (err: any) {
      console.error('[Diagram Analysis Error]:', err);
      const isBusy =
        err?.message?.includes('busy') ||
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('rate limit');
      setErrorMsg(
        isBusy
          ? "Google's AI is very busy right now. Please wait a minute and press the button again."
          : 'The AI gave an answer I could not read. Please try asking again.'
      );
    } finally {
      setIsLoading(false);
      setDiagramStatus(null);
    }
  };

  const handleSelectExample = (ex: LibrarySentence) => {
    setInputSentence(ex.sentence);
    setCurrentAnalysis(enforceExpletiveAnalysis(ex.data, ex.sentence));
    setActiveSentenceText(ex.sentence);
    setErrorMsg(null);
    setActiveTab('single');
  };

  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printBlockedNotice, setPrintBlockedNotice] = useState<string | null>(null);

  const handlePrint = async () => {
    setIsPrinting(true);
    setPrintBlockedNotice(null);

    try {
      const pageElements = document.querySelectorAll('.print-page');
      const pagesHtml: string[] = [];
      pageElements.forEach((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('.no-print').forEach((n) => n.remove());
        pagesHtml.push(clone.innerHTML);
      });

      if (pagesHtml.length === 0) {
        window.print();
        return;
      }

      await printWorksheetPages({
        pagesHtml,
        docTitle: activeTab === 'all-seven' ? 'Chart A - 7 Sentence Patterns' : 'Sentence Diagram Worksheet',
        onBlockedNotice: (msg) => setPrintBlockedNotice(msg),
      });
    } catch (err) {
      console.error('[Diagram Print Error]:', err);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Bar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#2F5D50] hover:text-[#24493e] font-semibold text-sm transition-colors py-1 px-2 rounded-md hover:bg-[#E4EDE7] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        {/* View Mode & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Main Tab Switch: Single Sentence vs All 7 Patterns */}
          <div className="flex items-center bg-[#E4EDE7]/70 p-1 rounded-lg border border-[#D5DED8]">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                activeTab === 'single'
                  ? 'bg-[#2F5D50] text-white shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              Single Diagram
            </button>
            <button
              onClick={() => setActiveTab('all-seven')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'all-seven'
                  ? 'bg-[#2F5D50] text-white shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 7 Patterns (Chart A)</span>
            </button>
          </div>

          {/* Toggle Sample vs Blank View */}
          <div className="flex items-center bg-[#E4EDE7]/70 p-1 rounded-lg border border-[#D5DED8]">
            <button
              onClick={() => setViewMode('sample')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                viewMode === 'sample'
                  ? 'bg-[#2F5D50] text-white shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              Sample (Key)
            </button>
            <button
              onClick={() => setViewMode('blank')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                viewMode === 'blank'
                  ? 'bg-[#2F5D50] text-white shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              Blank (Practice)
            </button>
          </div>

          {viewMode === 'blank' && (
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#2E2B26] hover:text-[#2F5D50] select-none bg-[#E4EDE7]/40 px-2.5 py-1 rounded-md border border-[#D5DED8]">
              <input
                type="checkbox"
                checked={showSampleOnBlank}
                onChange={(e) => setShowSampleOnBlank(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#2F5D50] rounded cursor-pointer"
              />
              <span>Show Sample on Blank</span>
            </label>
          )}

          {/* Toggle Chart Slot Labels (S, Vt, DO...) */}
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#2E2B26] hover:text-[#2F5D50] select-none bg-[#E4EDE7]/40 px-2.5 py-1 rounded-md border border-[#D5DED8]">
            <input
              type="checkbox"
              checked={showSlotLabels}
              onChange={(e) => setShowSlotLabels(e.target.checked)}
              className="w-3.5 h-3.5 accent-[#2F5D50] rounded cursor-pointer"
            />
            <span>Slot Labels (S, Vt, DO...)</span>
          </label>

          <button
            onClick={handlePrint}
            disabled={isPrinting}
            className="inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {isPrinting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Preparing print...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>{activeTab === 'all-seven' ? 'Print 7-Pattern Sheet' : 'Print Diagram'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Print Blocked Friendly Warning Banner */}
      {printBlockedNotice && (
        <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start justify-between shadow-xs no-print text-amber-900 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Printing Notice</span>
              <span>{printBlockedNotice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPrintBlockedNotice(null)}
            className="text-amber-700 hover:text-amber-950 p-1 cursor-pointer"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="space-y-6">
        {/* Quick Select 7-Pattern Bar */}
        <div className="no-print bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-base font-bold text-[#2E2B26] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2F5D50]" />
                <span>The 7 Sentence Patterns (Sentence Classification A)</span>
              </h2>
              <p className="text-xs text-[#5C6B62] mt-0.5">
                Exact baseline divider rules and abbreviations: S | Vi • S | Vt | DO • S | Vl \ PN • S | Vl \ PA • S | Vt | IO | DO • S | Vt | DO \ OCN • S | Vt | DO \ OCA
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
            {DIAGRAM_LIBRARY.slice(0, 7).map((item) => {
              const isSelected = activeTab === 'single' && activeSentenceText === item.sentence;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectExample(item)}
                  className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                      : 'bg-white text-[#2E2B26] border-[#D5DED8] hover:bg-[#E4EDE7]'
                  }`}
                >
                  <div className="text-[11px] font-bold font-mono tracking-tight">{item.pattern}</div>
                  <div
                    className={`text-[10px] truncate mt-0.5 ${
                      isSelected ? 'text-white/80' : 'text-[#5C6B62]'
                    }`}
                  >
                    {item.sentence}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Practice Sentences Suggestion Chips (Fixed curated list) */}
          <div className="pt-2 border-t border-[#E4EDE7] flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-[#2F5D50] flex items-center gap-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice Sentences:</span>
            </span>
            {PRACTICE_SENTENCES.map((item) => {
              const isSelected = activeTab === 'single' && activeSentenceText === item.sentence;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectExample(item)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                      : 'bg-white text-[#2E2B26] border-[#D5DED8] hover:bg-[#E4EDE7]'
                  }`}
                >
                  <span className="font-mono font-bold text-[10px] text-[#2F5D50] bg-[#E4EDE7] px-1 rounded">
                    {item.pattern}
                  </span>
                  <span>{item.sentence}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Card (for Single View) */}
        {activeTab === 'single' && (
          <div className="no-print bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-5 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
                Enter an English Sentence to Diagram
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputSentence}
                  onChange={(e) => setInputSentence(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDiagram()}
                  placeholder="e.g. The courageous knights protected the castle."
                  className="flex-1 px-3.5 py-2.5 text-sm sm:text-base bg-white border border-[#C2CFC6] rounded-lg text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
                />
                <button
                  type="button"
                  onClick={handleDiagram}
                  disabled={isLoading || !inputSentence.trim()}
                  className="px-5 py-2.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg shadow-xs transition-all disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{diagramStatus || 'Diagramming...'}</span>
                    </>
                  ) : (
                    <>
                      <GitFork className="w-4 h-4" />
                      <span>Diagram</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Ask AI Helper for Sentence Diagramming */}
            <AskAiHelper
              toolContext="diagram"
              onAddLines={(lines, qTitle) => {
                if (onAddToWorksheet) {
                  onAddToWorksheet(lines, qTitle);
                } else if (lines && lines.length > 0) {
                  setInputSentence(lines[0]);
                }
              }}
              addButtonLabel={onAddToWorksheet ? 'Add to Worksheet' : 'Diagram sentence'}
              placeholder='Ask grammar questions (e.g. "5 practice sentences for S-Vt-DO", "what is a gerund")...'
            />

            {errorMsg && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Notice</p>
                  <p>{errorMsg}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: SINGLE SENTENCE DIAGRAM SHEET */}
        {activeTab === 'single' && (
          <div className="bg-white border border-[#D5DED8] rounded-xl p-6 sm:p-10 shadow-md print-page">
            <div className="border-b-2 border-[#2E2B26] pb-4 mb-6 flex flex-col sm:flex-row justify-between items-baseline gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50]">
                  {viewMode === 'sample' ? 'Answer Key / Sample' : 'Student Practice Worksheet'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2E2B26] mt-0.5">
                  "{activeSentenceText}"
                </h3>
              </div>
              <div className="text-xs text-[#5C6B62] font-medium shrink-0">
                <span>Name: _____________________</span>
                <span className="ml-4">Date: _________</span>
              </div>
            </div>

            {currentAnalysis.split_note && (
              <div className="mb-6 p-3 bg-[#E4EDE7]/40 border border-[#D5DED8] rounded-lg text-xs text-[#44514A]">
                <span className="font-bold">Sentence Note: </span>
                <span>{currentAnalysis.split_note}</span>
              </div>
            )}

            {/* Clauses Diagrams */}
            <div className="space-y-12">
              {currentAnalysis.clauses.map((clause, idx) => (
                <ClauseDiagramCard
                  key={idx}
                  clause={clause}
                  clauseNumber={idx + 1}
                  totalClauses={currentAnalysis.clauses.length}
                  viewMode={viewMode}
                  showSampleOnBlank={showSampleOnBlank}
                  showSlotLabels={showSlotLabels}
                  onToggleSampleOnBlank={() => setShowSampleOnBlank(!showSampleOnBlank)}
                />
              ))}
            </div>

            {/* Tutor Verification Note */}
            <div className="mt-12 pt-4 border-t border-[#D5DED8] flex justify-between items-center text-[11px] text-[#5C6B62]">
              <span>CC Essentials Chart A: Sentence Classification</span>
              <span>8 Parts of Speech: N, V, P, AV, C, I, Pr, AJ • 7 Patterns</span>
            </div>

            {/* Printed Worksheet Footer */}
            <div className="pt-6 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-6">
              Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
            </div>
          </div>
        )}

        {/* TAB 2: ALL 7 PATTERNS COMPARISON VIEW (TEST & VERIFY AGAINST CHART A) */}
        {activeTab === 'all-seven' && (
          <div className="space-y-8">
            <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-6 shadow-xs flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-[#2E2B26]">
                  Sentence Classification A: All Seven Patterns Test Suite
                </h3>
                <p className="text-xs text-[#5C6B62] mt-1 max-w-2xl leading-relaxed">
                  Compare all seven sentence pattern diagrams and divider styles directly against the reference chart:
                  vertical through-baseline line for <span className="font-mono font-bold text-[#2E2B26]">S | V</span>,
                  vertical stop-at-baseline lines for <span className="font-mono font-bold text-[#2E2B26]">| DO</span> and <span className="font-mono font-bold text-[#2E2B26]">| IO</span>,
                  and backwards-slanted stop-at-baseline lines for <span className="font-mono font-bold text-[#2E2B26]">\ PN</span>, <span className="font-mono font-bold text-[#2E2B26]">\ PA</span>, <span className="font-mono font-bold text-[#2E2B26]">\ OCN</span>, and <span className="font-mono font-bold text-[#2E2B26]">\ OCA</span>.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#2F5D50] hover:bg-[#24493e] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>Print All 7 Diagrams</span>
              </button>
            </div>

            {/* Render each of the 7 patterns in sequence */}
            <div className="space-y-8">
              {DIAGRAM_LIBRARY.slice(0, 7).map((item, pIdx) => {
                const clause = item.data.clauses[0];
                return (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-[#D5DED8] rounded-xl p-6 sm:p-8 shadow-sm print-page"
                  >
                    <div className="border-b border-[#D5DED8] pb-3 mb-4 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-[#2F5D50] text-white font-mono font-bold text-xs">
                          Pattern {item.patternNumber}: {item.pattern}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#2E2B26]">
                          "{item.sentence}"
                        </h4>
                      </div>
                      <span className="text-xs text-[#5C6B62] font-mono">
                        {item.pattern}
                      </span>
                    </div>

                    <ClauseDiagramCard
                      clause={clause}
                      clauseNumber={1}
                      totalClauses={1}
                      viewMode={viewMode}
                      showSampleOnBlank={showSampleOnBlank}
                      showSlotLabels={showSlotLabels}
                      onToggleSampleOnBlank={() => setShowSampleOnBlank(!showSampleOnBlank)}
                    />

                    {/* Printed Worksheet Footer */}
                    <div className="pt-6 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-6">
                      Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Component for an individual clause diagram card with diagram SVG, why it fits, and Word-Jobs table
 */
const ClauseDiagramCard: React.FC<{
  clause: DiagramClause;
  clauseNumber: number;
  totalClauses: number;
  viewMode: 'sample' | 'blank';
  showSampleOnBlank: boolean;
  showSlotLabels: boolean;
  onToggleSampleOnBlank: () => void;
}> = ({
  clause,
  clauseNumber,
  totalClauses,
  viewMode,
  showSampleOnBlank,
  showSlotLabels,
  onToggleSampleOnBlank,
}) => {
  return (
    <div className="space-y-6">
      {totalClauses > 1 && (
        <h4 className="text-sm font-bold uppercase tracking-wider text-[#2F5D50] border-b border-[#D5DED8] pb-1">
          Clause {clauseNumber}: "{clause.clause}"
        </h4>
      )}

      {/* When in Blank mode and showSampleOnBlank is enabled, show the Sample Diagram as an answer key / reference */}
      {viewMode === 'blank' && showSampleOnBlank && (
        <div className="space-y-2 p-4 bg-[#FFFFFF] border-2 border-dashed border-[#D5DED8] rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Sample Diagram (Answer Key Reference):
            </span>
            <span className="text-[11px] text-[#5C6B62] italic">Compare your diagram against this sample</span>
          </div>
          <div className="w-full overflow-x-auto py-3 bg-white rounded-lg border border-[#E4EDE7] flex justify-center">
            <ReedKelloggSvg clause={clause} isBlank={false} showSlotLabels={showSlotLabels} />
          </div>
        </div>
      )}

      {/* SVG Reed-Kellogg Canvas */}
      <div className="space-y-2">
        {viewMode === 'blank' && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5C6B62]">
              {showSampleOnBlank ? 'Student Practice Diagram (Fill in the lines):' : 'Student Practice Diagram:'}
            </span>
            <button
              type="button"
              onClick={onToggleSampleOnBlank}
              className="no-print text-xs font-semibold text-[#2F5D50] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showSampleOnBlank ? 'Hide Sample Diagram' : 'Show Sample Diagram'}
            </button>
          </div>
        )}
        <div className="w-full overflow-x-auto py-4 bg-[#FFFFFF] rounded-xl border border-[#E4EDE7] flex justify-center">
          <ReedKelloggSvg
            clause={clause}
            isBlank={viewMode === 'blank'}
            showSlotLabels={showSlotLabels}
          />
        </div>
      </div>

      {/* Pattern, Why It Fits, and Word-Jobs Table */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        <div className="md:col-span-5 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#E4EDE7] border border-[#D5DED8] text-[#2F5D50] font-bold text-sm">
            <span>Pattern:</span>
            <span className="font-mono text-base font-extrabold text-[#1C3B32]">
              {clause.pattern}
            </span>
          </div>

          {clause.note && (
            <p className="text-xs text-[#5C6B62] leading-relaxed">
              <span className="font-semibold text-[#2E2B26]">Divider & Grammar rule: </span>
              {clause.note}
            </p>
          )}

          {clause.kids?.pattern_why && viewMode === 'sample' && (
            <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-lg p-3 text-xs text-[#2E2B26] leading-relaxed">
              <span className="font-bold block mb-1 text-[#2F5D50]">
                Why it fits {clause.pattern}:
              </span>
              {clause.kids.pattern_why}
            </div>
          )}
        </div>

        {/* Word-Jobs Table with Chart A Abbreviations */}
        <div className="md:col-span-7">
          <div className="border border-[#D5DED8] rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#E4EDE7] text-[#2E2B26] border-b border-[#D5DED8]">
                  <th className="py-1.5 px-3 font-bold">Word</th>
                  <th className="py-1.5 px-3 font-bold">
                    Part of Speech{' '}
                    <span className="font-normal text-[10px] text-[#5C6B62]">
                      (N, V, P, AV, C, I, Pr, AJ, EXP)
                    </span>
                  </th>
                  <th className="py-1.5 px-3 font-bold">
                    Job in Sentence{' '}
                    <span className="font-normal text-[10px] text-[#5C6B62]">
                      (S, Vi, Vt, Vl, DO, IO, PN, PA...)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4EDE7] bg-white">
                {clause.kids?.words?.map((item, wIdx) => {
                  const posInfo = normalizePos(item.pos);
                  const isExp = posInfo.code === 'EXP' || item.pos.toLowerCase() === 'expletive';
                  return (
                    <tr key={wIdx} className="hover:bg-[#FFFFFF]">
                      <td className="py-1.5 px-3 font-bold text-[#2E2B26]">{item.word}</td>
                      <td className="py-1.5 px-3">
                        {viewMode === 'sample' ? (
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 font-mono font-bold rounded text-[11px] ${
                                isExp
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-[#2F5D50]/10 text-[#2F5D50] border border-[#2F5D50]/20'
                              }`}
                            >
                              {posInfo.code}
                            </span>
                            <span className="text-[#5C6B62] text-[11px]">
                              {isExp ? 'expletive' : `(${posInfo.name})`}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#C2CFC6]">___________</span>
                        )}
                      </td>
                      <td className="py-1.5 px-3 text-[#2E2B26]">
                        {viewMode === 'sample' ? (
                          <span className="text-xs">{item.job}</span>
                        ) : (
                          <span className="text-[#C2CFC6]">___________</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Reed-Kellogg SVG Generator Component
 * Strictly implements Classical Conversations "Sentence Classification A":
 * 1. Vertical line crossing completely through baseline between Subject and Verb.
 * 2. Vertical line stopping at baseline before Direct Object or Indirect Object.
 * 3. Slanted line (\) leaning back toward the word it points to, stopping at baseline, before PN, PA, OCN, OCA.
 * 4. Indirect Object (IO) drawn on baseline for Pattern 5 (S | Vt | IO | DO).
 */
interface ModifierLayout {
  mod: Modifier;
  x: number;
  y: number;
  width: number;
  depth: number;
  isPrep: boolean;
  dx?: number;
  dy?: number;
  shelfX?: number;
  shelfY?: number;
  shelfLen?: number;
  subLayouts?: ModifierLayout[];
}

function computeModifierLayout(
  mod: Modifier,
  x: number,
  y: number,
  fontSize: number,
  getTextWidth: (text: string | null | undefined, fs: number) => number
): ModifierLayout {
  if (mod.prep && mod.prep.object) {
    const objWord = mod.prep.object.word || '';
    const subMods = mod.prep.object.modifiers || [];

    // Preposition slant geometry: length scales with word length so word fits without crossing shelf
    const prepLen = (mod.word || '').length * (fontSize * 0.55);
    const dy = Math.max(42, Math.round(prepLen * 0.85 + 16));
    const dx = Math.round(dy / Math.tan((58 * Math.PI) / 180)); // ~26-28px
    const shelfX = x + dx;
    const shelfY = y + dy;

    // Sub-modifiers layout under object's shelf
    const subLayouts: ModifierLayout[] = [];
    let curSubX = shelfX + 18;
    let maxSubRight = shelfX;
    let maxSubDepth = 0;

    for (const sub of subMods) {
      const subLayout = computeModifierLayout(sub, curSubX, shelfY, fontSize - 2, getTextWidth);
      subLayouts.push(subLayout);
      maxSubRight = Math.max(maxSubRight, subLayout.x + subLayout.width);
      maxSubDepth = Math.max(maxSubDepth, subLayout.depth);
      curSubX += Math.max(30, subLayout.width + 12);
    }

    const objW = getTextWidth(objWord, fontSize + 1);
    const neededForSubMods = subLayouts.length > 0 ? maxSubRight - shelfX + 16 : 0;
    const shelfLen = Math.max(72, objW + 24, neededForSubMods);

    const totalWidth = Math.max(dx + shelfLen, maxSubRight - x);
    const totalDepth = dy + maxSubDepth;

    return {
      mod,
      x,
      y,
      width: totalWidth,
      depth: totalDepth,
      isPrep: true,
      dx,
      dy,
      shelfX,
      shelfY,
      shelfLen,
      subLayouts,
    };
  }

  // Standard modifier (Adjective, Adverb, Article, Possessive)
  const slantLenX = 30;
  const slantLenY = 52;

  return {
    mod,
    x,
    y,
    width: slantLenX + 8,
    depth: slantLenY,
    isPrep: false,
    dx: slantLenX,
    dy: slantLenY,
  };
}

/**
 * Computes positions for all modifiers hanging directly under a baseline word.
 * Spacing rules:
 * - Simple modifiers start with ~32px step.
 * - When a prepositional phrase occurs, any subsequent modifier starts safely
 *   after the prepositional phrase's shelf so lines never cross.
 */
function layoutModifiersForWord(
  modifiers: Modifier[],
  wordStartX: number,
  baselineY: number,
  fontSize: number,
  getTextWidth: (text: string | null | undefined, fs: number) => number
): {
  layouts: ModifierLayout[];
  maxRight: number;
  maxDepth: number;
} {
  const layouts: ModifierLayout[] = [];
  let curX = wordStartX + 18;
  let maxRight = wordStartX;
  let maxDepth = 0;

  for (const mod of modifiers) {
    const layout = computeModifierLayout(mod, curX, baselineY, fontSize, getTextWidth);
    layouts.push(layout);

    const rightReach = layout.x + layout.width;
    maxRight = Math.max(maxRight, rightReach);
    maxDepth = Math.max(maxDepth, layout.depth);

    // If this modifier is a prepositional phrase, the next modifier must start AFTER its shelf!
    if (layout.isPrep) {
      curX = Math.max(curX + 32, rightReach + 16);
    } else {
      curX += 32;
    }
  }

  return { layouts, maxRight, maxDepth };
}

/**
 * Reed-Kellogg SVG Generator Component
 * Strictly implements Classical Conversations "Sentence Classification A":
 * 1. Vertical line crossing completely through baseline between Subject and Verb.
 * 2. Vertical line stopping at baseline before Direct Object or Indirect Object.
 * 3. Slanted line (\) leaning back toward the word it points to, stopping at baseline, before PN, PA, OCN, OCA.
 * 4. Indirect Object (IO) drawn on baseline for Pattern 5 (S | Vt | IO | DO).
 * 5. Prepositional phrases are isolated units that never cross or share shelves.
 */
const ReedKelloggSvg: React.FC<{
  clause: DiagramClause;
  isBlank: boolean;
  showSlotLabels?: boolean;
}> = ({ clause, isBlank, showSlotLabels = true }) => {
  // Baseline parameters
  const baselineY = 90;
  const startX = 40;
  const wordFontSize = 18;
  const modFontSize = 14;

  // Helpers
  const getTextWidth = (text: string | null | undefined, fs: number) => {
    if (!text) return 0;
    return text.length * (fs * 0.58) + 14;
  };

  // 1. Floating lines for Interjection, NDA, and Expletive
  const floatingItems = [clause.interjection, clause.nda].filter(Boolean) as string[];
  const expletiveWord = clause.expletive || null;

  // 2. Extract elements
  const subjectWord = clause.subject.word || '(you)';
  const verbWord = clause.verb.word || '';
  const ioWord = clause.io?.word || null;
  const ioModifiers = clause.io?.modifiers || [];
  const complements = clause.complements || [];

  // Determine Verb Role abbreviation from pattern
  const pat = (clause.pattern || '').toLowerCase();
  let verbRole = 'V';
  if (pat.includes('vi')) verbRole = 'Vi';
  else if (pat.includes('vl')) verbRole = 'Vl';
  else if (pat.includes('vt')) verbRole = 'Vt';

  // Calculate widths of words
  const subjectW = Math.max(85, getTextWidth(subjectWord, wordFontSize));
  const verbW = Math.max(85, getTextWidth(verbWord, wordFontSize));

  // 3. Subject and Subject hanging modifiers (expletive is NEVER a modifier under subject)
  const subjModifiers = (clause.subject.modifiers || []).filter(
    (m) => !expletiveWord || (m.word || '').toLowerCase() !== expletiveWord.toLowerCase()
  );
  const subjX = startX;
  const subjHanging = layoutModifiersForWord(subjModifiers, subjX, baselineY, modFontSize, getTextWidth);

  // Position Subject text on baseline: if modifiers span wider than the word, center the word over attachment points
  let subjTextX = subjX + 10;
  if (subjHanging.layouts.length > 0) {
    const firstAttX = subjHanging.layouts[0].x;
    const lastAttX = subjHanging.layouts[subjHanging.layouts.length - 1].x;
    if (lastAttX > subjX + subjectW) {
      subjTextX = Math.max(subjX + 10, Math.round((firstAttX + lastAttX - subjectW) / 2));
    }
  }

  // Subject|Verb Divider: strictly to the right of subject word and all its hanging modifiers
  const dividerSubjVerbX = Math.max(subjTextX + subjectW + 24, subjHanging.maxRight + 24);

  // 4. Verb and Verb hanging modifiers (expletive is NEVER a modifier on a slanted line under verb)
  const verbModifiers = (clause.verb.modifiers || []).filter(
    (m) => !expletiveWord || (m.word || '').toLowerCase() !== expletiveWord.toLowerCase()
  );
  const verbX = dividerSubjVerbX + 24;
  const verbHanging = layoutModifiersForWord(verbModifiers, verbX, baselineY, modFontSize, getTextWidth);

  let verbTextX = verbX + 10;
  if (verbHanging.layouts.length > 0) {
    const firstAttX = verbHanging.layouts[0].x;
    const lastAttX = verbHanging.layouts[verbHanging.layouts.length - 1].x;
    if (lastAttX > verbX + verbW) {
      verbTextX = Math.max(verbX + 10, Math.round((firstAttX + lastAttX - verbW) / 2));
    }
  }

  let currentX = Math.max(verbTextX + verbW + 24, verbHanging.maxRight + 24);

  // Geometry for expletive floating line directly above the subject
  const expletiveLineLen = expletiveWord ? Math.max(72, getTextWidth(expletiveWord, wordFontSize) + 20) : 0;
  const expletiveX1 = expletiveWord ? Math.max(startX, Math.round(subjTextX + (subjectW - expletiveLineLen) / 2)) : 0;
  const expletiveX2 = expletiveX1 + expletiveLineLen;
  const expletiveY = 38;

  // 5. Pattern 5: IO on baseline
  let ioDivX = 0;
  let ioTextX = 0;
  let ioW = 0;
  let ioHanging: { layouts: ModifierLayout[]; maxRight: number; maxDepth: number } | null = null;
  if (ioWord) {
    ioDivX = currentX;
    ioW = Math.max(80, getTextWidth(ioWord, wordFontSize));
    ioHanging = layoutModifiersForWord(ioModifiers, ioDivX + 24, baselineY, modFontSize, getTextWidth);
    ioTextX = ioDivX + 10;
    if (ioHanging.layouts.length > 0) {
      const firstAttX = ioHanging.layouts[0].x;
      const lastAttX = ioHanging.layouts[ioHanging.layouts.length - 1].x;
      if (lastAttX > ioDivX + ioW) {
        ioTextX = Math.max(ioDivX + 10, Math.round((firstAttX + lastAttX - ioW) / 2));
      }
    }
    currentX = Math.max(ioTextX + ioW + 24, ioHanging.maxRight + 24);
  }

  // 6. Complements on baseline (DO, PN, PA, OCN, OCA)
  const compPositions: Array<{
    type: string;
    word: string;
    divX: number;
    textX: number;
    width: number;
    hanging: { layouts: ModifierLayout[]; maxRight: number; maxDepth: number };
  }> = [];

  complements.forEach((c) => {
    const divX = currentX;
    const w = Math.max(80, getTextWidth(c.word, wordFontSize));
    const hanging = layoutModifiersForWord(c.modifiers || [], divX + 24, baselineY, modFontSize, getTextWidth);
    let textX = divX + 10;
    if (hanging.layouts.length > 0) {
      const firstAttX = hanging.layouts[0].x;
      const lastAttX = hanging.layouts[hanging.layouts.length - 1].x;
      if (lastAttX > divX + w) {
        textX = Math.max(divX + 10, Math.round((firstAttX + lastAttX - w) / 2));
      }
    }
    compPositions.push({
      type: c.type,
      word: c.word,
      divX,
      textX,
      width: w,
      hanging,
    });
    currentX = Math.max(textX + w + 24, hanging.maxRight + 24);
  });

  const baselineEndX = currentX + 14;
  const allDepths = [
    56,
    subjHanging.maxDepth,
    verbHanging.maxDepth,
    ioHanging ? ioHanging.maxDepth : 0,
    ...compPositions.map((c) => c.hanging.maxDepth),
  ];
  const maxDepth = Math.max(...allDepths);
  const totalSvgWidth = Math.max(760, baselineEndX + 40);
  const totalSvgHeight = Math.max(260, baselineY + maxDepth + 40);

  return (
    <svg
      viewBox={`0 0 ${totalSvgWidth} ${totalSvgHeight}`}
      className="w-full max-w-[820px] h-auto block"
      style={{ minHeight: '220px' }}
    >
      {/* Floating line for Expletive: on its own short horizontal line floating above the subject, attached to nothing */}
      {expletiveWord && (
        <g key="expletive-line">
          <line
            x1={expletiveX1}
            y1={expletiveY}
            x2={expletiveX2}
            y2={expletiveY}
            stroke="#2E2B26"
            strokeWidth="2"
          />
          {showSlotLabels && (
            <text
              x={expletiveX1}
              y={isBlank ? expletiveY - 6 : expletiveY - 20}
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#2F5D50"
              opacity="0.8"
            >
              {isBlank ? '(expletive)' : 'Exp'}
            </text>
          )}
          {!isBlank && (
            <text
              x={expletiveX1 + Math.round((expletiveLineLen - getTextWidth(expletiveWord, wordFontSize)) / 2) + 7}
              y={expletiveY - 6}
              fontSize={wordFontSize}
              fontFamily="Andika, sans-serif"
              fontWeight="bold"
              fill="#2E2B26"
            >
              {expletiveWord}
            </text>
          )}
        </g>
      )}

      {/* Floating lines for Interjection and NDA */}
      {floatingItems.map((floatText, fIdx) => {
        const floatBaseX = expletiveWord ? Math.max(startX + 140, expletiveX2 + 24) : startX;
        const floatX = floatBaseX + fIdx * 140;
        const floatY = 38;
        const lineLen = Math.max(80, getTextWidth(floatText, wordFontSize));
        return (
          <g key={`float-${fIdx}`}>
            <line
              x1={floatX}
              y1={floatY}
              x2={floatX + lineLen}
              y2={floatY}
              stroke="#2E2B26"
              strokeWidth="2"
            />
            {!isBlank && (
              <text
                x={floatX + 6}
                y={floatY - 6}
                fontSize={wordFontSize}
                fontFamily="Andika, sans-serif"
                fontWeight="700"
                fill="#2E2B26"
              >
                {floatText}
              </text>
            )}
          </g>
        );
      })}

      {/* Main Horizontal Baseline */}
      <line
        x1={startX}
        y1={baselineY}
        x2={baselineEndX}
        y2={baselineY}
        stroke="#2E2B26"
        strokeWidth="2.4"
      />

      {/* 1. RULE 1: Line between Subject & Verb is VERTICAL and CROSSES THROUGH the baseline */}
      <line
        x1={dividerSubjVerbX}
        y1={baselineY - 34}
        x2={dividerSubjVerbX}
        y2={baselineY + 34}
        stroke="#2E2B26"
        strokeWidth="2.4"
      />

      {/* Slot role label for Subject */}
      {showSlotLabels && (
        <text
          x={subjTextX}
          y={baselineY - 36}
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#2F5D50"
          opacity="0.8"
        >
          S
        </text>
      )}

      {/* Subject Text on Baseline */}
      {!isBlank && (
        <text
          x={subjTextX}
          y={baselineY - 8}
          fontSize={wordFontSize}
          fontFamily="Andika, sans-serif"
          fontWeight="bold"
          fill="#2E2B26"
        >
          {subjectWord}
        </text>
      )}

      {/* Modifiers for Subject */}
      {subjHanging.layouts.map((l) => renderModifierLayout(l, modFontSize, isBlank))}

      {/* Slot role label for Verb */}
      {showSlotLabels && (
        <text
          x={verbTextX}
          y={baselineY - 36}
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
          fill="#2F5D50"
          opacity="0.8"
        >
          {verbRole}
        </text>
      )}

      {/* Verb Text on Baseline */}
      {!isBlank && (
        <text
          x={verbTextX}
          y={baselineY - 8}
          fontSize={wordFontSize}
          fontFamily="Andika, sans-serif"
          fontWeight="bold"
          fill="#2E2B26"
        >
          {verbWord}
        </text>
      )}

      {/* Modifiers for Verb */}
      {verbHanging.layouts.map((l) => renderModifierLayout(l, modFontSize, isBlank))}

      {/* 2. RULE 2: Pattern 5: Line before Indirect Object is VERTICAL and STOPS AT the baseline */}
      {ioWord && (
        <g>
          {/* Vertical divider stopping at baseline */}
          <line
            x1={ioDivX}
            y1={baselineY - 34}
            x2={ioDivX}
            y2={baselineY}
            stroke="#2E2B26"
            strokeWidth="2.4"
          />

          {/* Slot role label for IO */}
          {showSlotLabels && (
            <text
              x={ioTextX + 6}
              y={baselineY - 36}
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              fill="#2F5D50"
              opacity="0.8"
            >
              IO
            </text>
          )}

          {/* IO word on baseline */}
          {!isBlank && (
            <text
              x={ioTextX + 6}
              y={baselineY - 8}
              fontSize={wordFontSize}
              fontFamily="Andika, sans-serif"
              fontWeight="bold"
              fill="#2E2B26"
            >
              {ioWord}
            </text>
          )}

          {/* IO modifiers */}
          {ioHanging?.layouts.map((l) => renderModifierLayout(l, modFontSize, isBlank))}
        </g>
      )}

      {/* 3. Complements (DO, PN, PA, OCN, OCA) */}
      {compPositions.map((cPos, cIdx) => {
        // Slanted backward divider rule:
        // "The line before PN, PA, OCN, and OCA is slanted, leaning back toward the word it points to, and stops at the baseline."
        const isSlanted =
          cPos.type === 'PN' ||
          cPos.type === 'PA' ||
          cPos.type === 'OCN' ||
          cPos.type === 'OCA';

        return (
          <g key={`comp-${cIdx}`}>
            {isSlanted ? (
              /* Slanted backwards divider (\) leaning back toward verb/subject/DO, stopping at baseline:
                 Top is at (divX + 14, baselineY - 34)
                 Bottom is at (divX - 6, baselineY) */
              <line
                x1={cPos.divX + 14}
                y1={baselineY - 34}
                x2={cPos.divX - 6}
                y2={baselineY}
                stroke="#2E2B26"
                strokeWidth="2.4"
              />
            ) : (
              /* Vertical divider stopping at baseline for Direct Object */
              <line
                x1={cPos.divX}
                y1={baselineY - 34}
                x2={cPos.divX}
                y2={baselineY}
                stroke="#2E2B26"
                strokeWidth="2.4"
              />
            )}

            {/* Slot role label for complement */}
            {showSlotLabels && (
              <text
                x={cPos.textX + 6}
                y={baselineY - 36}
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
                fill="#2F5D50"
                opacity="0.8"
              >
                {isSlanted ? `\\ ${cPos.type}` : cPos.type}
              </text>
            )}

            {/* Complement Word on Baseline */}
            {!isBlank && (
              <text
                x={cPos.textX + 6}
                y={baselineY - 8}
                fontSize={wordFontSize}
                fontFamily="Andika, sans-serif"
                fontWeight="bold"
                fill="#2E2B26"
              >
                {cPos.word}
              </text>
            )}

            {/* Modifiers for this Complement */}
            {cPos.hanging.layouts.map((l) => renderModifierLayout(l, modFontSize, isBlank))}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Helper to render modifier slants and prepositional phrase shelves.
 * Places text with baseline above the lines so lines never cross through words.
 */
function renderModifierLayout(
  layout: ModifierLayout,
  fontSize: number,
  isBlank: boolean
) {
  if (
    layout.isPrep &&
    layout.shelfX !== undefined &&
    layout.shelfY !== undefined &&
    layout.shelfLen !== undefined
  ) {
    const { mod, x, y, dx = 26, dy = 42, shelfX, shelfY, shelfLen, subLayouts = [] } = layout;
    const objWord = mod.prep?.object.word || '';
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const slantLen = Math.sqrt(dx * dx + dy * dy);
    const prepWord = mod.word || '';
    const prepTextWidth = prepWord.length * (fontSize * 0.55);

    return (
      <g key={`prep-${x}-${shelfY}-${prepWord}`}>
        {/* Slant for preposition */}
        <line x1={x} y1={y} x2={shelfX} y2={shelfY} stroke="#2E2B26" strokeWidth="1.8" />
        
        {/* Preposition word along slant: baseline 6px above line, rotated cleanly */}
        {!isBlank && (
          <text
            transform={`translate(${x}, ${y}) rotate(${angle})`}
            x={Math.max(6, (slantLen - prepTextWidth) / 2)}
            y={-6}
            fontSize={fontSize}
            fontFamily="Andika, sans-serif"
            fill="#2E2B26"
            dominantBaseline="alphabetic"
          >
            {prepWord}
          </text>
        )}

        {/* Horizontal shelf for object */}
        <line
          x1={shelfX}
          y1={shelfY}
          x2={shelfX + shelfLen}
          y2={shelfY}
          stroke="#2E2B26"
          strokeWidth="1.8"
        />

        {/* Object of preposition sitting 5px above horizontal shelf */}
        {!isBlank && (
          <text
            x={shelfX + 8}
            y={shelfY - 5}
            fontSize={fontSize + 1}
            fontFamily="Andika, sans-serif"
            fontWeight="bold"
            fill="#2E2B26"
            dominantBaseline="alphabetic"
          >
            {objWord}
          </text>
        )}

        {/* Modifiers of the object of preposition */}
        {subLayouts.map((subLayout) =>
          renderModifierLayout(subLayout, fontSize - 2, isBlank)
        )}
      </g>
    );
  }

  // Standard modifier (Adjective, Adverb, Article, Possessive)
  const { mod, x, y, dx = 30, dy = 52 } = layout;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const slantLen = Math.sqrt(dx * dx + dy * dy);
  const modWord = mod.word || '';
  const modTextWidth = modWord.length * (fontSize * 0.55);

  return (
    <g key={`mod-${x}-${y}-${modWord}`}>
      <line
        x1={x}
        y1={y}
        x2={x + dx}
        y2={y + dy}
        stroke="#2E2B26"
        strokeWidth="1.8"
      />
      {!isBlank && (
        <text
          transform={`translate(${x}, ${y}) rotate(${angle})`}
          x={Math.max(6, (slantLen - modTextWidth) / 2)}
          y={-6}
          fontSize={fontSize}
          fontFamily="Andika, sans-serif"
          fill="#2E2B26"
          dominantBaseline="alphabetic"
        >
          {modWord}
        </text>
      )}
    </g>
  );
}
