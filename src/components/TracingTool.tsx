import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Printer,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Eye,
  X,
  Layers,
  CheckSquare,
  Square,
  Calculator,
  Languages,
  Calendar,
  Landmark,
  Scroll,
} from 'lucide-react';
import {
  STARTER_PACKS,
  StarterPack,
  STARTER_CATEGORIES,
  StarterCategory,
} from '../data/starterPacks';
import { MathMode } from '../data/mathPacks';
import { LATIN_MEMORY_WORK, getCycleLatinVocabularyUpToWeek, getVulgateVerseForLatinWeek, getVulgateVersesForLatinWeeks } from '../data/latinReviewData';
import {
  SubjectKey,
  SUBJECT_METAS,
  PacketSectionItem,
  getMathWeekData,
  CYCLE_3_GEOGRAPHY_WEEKS,
  CYCLE_3_SCIENCE_WEEKS,
  CYCLE_3_ENGLISH_WEEKS,
  CYCLE_3_HISTORY_WEEKS,
  CYCLE_3_TIMELINE_WEEKS,
  getSubjectGuideData,
} from '../data/reviewPacketData';
import { getBibleWeekData } from '../data/bibleData';
import {
  CYCLE_1_YEAR_AT_A_GLANCE,
  CYCLE_2_YEAR_AT_A_GLANCE,
  CYCLE_3_YEAR_AT_A_GLANCE,
  getYearAtAGlanceTopic,
} from '../data/yearAtAGlanceData';
import {
  getPresidentsInOrder,
  getPresidentsWithVPs,
  PRESIDENTS_VERBATIM_LIST,
} from '../data/presidentsData';
import { getBillOfRightsSelection } from '../data/billOfRightsData';
import { LetterStyle, LetterSize, WorksheetItem } from '../types';
import { GuideSizeConfig, getGuideSizeConfig } from '../utils/tracingWrap';
import { parseLabeledItem, splitPromptAndAnswer, normalizeWorksheetItems, formatWeeksLabel } from '../utils/labelHelper';
import { AskAiHelper } from './AskAiHelper';
import { callGeminiWithRetry } from '../utils/geminiClient';
import { WorksheetPagesView } from './WorksheetPagesView';
import { printWorksheetPages } from '../utils/printHelper';

interface TracingToolProps {
  onBack: () => void;
  initialImport?: { lines: string[]; title?: string } | null;
  onClearInitialImport?: () => void;
  initialCategory?: StarterCategory | null;
  initialPresidentsConfig?: {
    mode: 'order' | 'vps';
    start: number;
    end: number;
  } | null;
  initialBillOfRightsConfig?: {
    start: number;
    end: number;
  } | null;
  onClearInitialCategory?: () => void;
}

export const TracingTool: React.FC<TracingToolProps> = ({
  onBack,
  initialImport,
  onClearInitialImport,
  initialCategory,
  initialPresidentsConfig,
  initialBillOfRightsConfig,
  onClearInitialCategory,
}) => {
  const [activeBuilderMode, setActiveBuilderMode] = useState<'standard' | 'reviewPacket'>('standard');
  const [title, setTitle] = useState('Foundations Handwriting Practice');
  const [sentencesText, setSentencesText] = useState(
    'Amendment 1: Freedom of religion, speech, press, assembly, and petition.'
  );
  const [activePack, setActivePack] = useState<StarterPack | null>(null);
  const [worksheetItems, setWorksheetItems] = useState<WorksheetItem[]>([
    {
      text: 'Freedom of religion, speech, press, assembly, and petition.',
      label: 'Amendment 1',
      promptHeader: 'Amendment 1',
      type: 'memoryWork',
    },
  ]);
  const [style, setStyle] = useState<LetterStyle>('print');
  const [size, setSize] = useState<LetterSize>('medium');
  const [traceStyle, setTraceStyle] = useState<'dotted' | 'gray'>('dotted');
  const [reps, setReps] = useState<number>(2);
  const [showModel, setShowModel] = useState<boolean>(true);
  const [showBlank, setShowBlank] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<StarterCategory | null>(null);
  const [selectedPackId, setSelectedPackId] = useState<string>('');
  const [mathMode, setMathMode] = useState<MathMode>('trace');
  const [activeMathPack, setActiveMathPack] = useState<StarterPack | null>(null);
  const [activeLatinPack, setActiveLatinPack] = useState<StarterPack | null>(null);
  const [latinMeaningMode, setLatinMeaningMode] = useState<'inline' | 'note'>('inline');
  const [latinSentencePractice, setLatinSentencePractice] = useState<boolean>(false);

  // Presidents & VPs section state
  const [presidentsMode, setPresidentsMode] = useState<'vps' | 'order'>('vps');
  const [presidentsStart, setPresidentsStart] = useState<number>(1);
  const [presidentsEnd, setPresidentsEnd] = useState<number>(10);

  // Bill of Rights section state
  const [billOfRightsStart, setBillOfRightsStart] = useState<number>(1);
  const [billOfRightsEnd, setBillOfRightsEnd] = useState<number>(10);

  // AI draft state
  const [aiTopic, setAiTopic] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiStatusMsg, setAiStatusMsg] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiReminder, setAiReminder] = useState<string | null>(null);

  // Week Picker state (Cycles 1–3, Weeks 1–24, 8 Subjects)
  const [weekPickerCycle, setWeekPickerCycle] = useState<1 | 2 | 3>(3);
  const [weekPickerWeek, setWeekPickerWeek] = useState<number>(1);
  const [weekPickerSubjects, setWeekPickerSubjects] = useState<Record<SubjectKey, boolean>>({
    bible: true,
    latin: true,
    math: true,
    science: true,
    english: true,
    history: true,
    geography: true,
    timeline: true,
  });
  const [weekPickerNote, setWeekPickerNote] = useState<string | null>(null);
  const [weekPickerAppliedSummary, setWeekPickerAppliedSummary] = useState<string | null>(null);

  // Review Packet builder state (All Subjects)
  const [cycle, setCycle] = useState<1 | 2 | 3>(3);
  const [startWeek, setStartWeek] = useState<number>(1);
  const [endWeek, setEndWeek] = useState<number>(5);
  const [selectedWeeks, setSelectedWeeks] = useState<number[]>([1, 2, 3, 4, 5]);
  // Start with NO subjects selected: the parent picks their weeks, then checks
  // exactly the subjects they want in this packet (a sampler, one subject, or all).
  const [selectedSubjects, setSelectedSubjects] = useState<Record<SubjectKey, boolean>>({
    bible: false,
    latin: false,
    math: false,
    science: false,
    english: false,
    history: false,
    timeline: false,
    geography: false,
  });
  const [fillInTheBlankMath, setFillInTheBlankMath] = useState<boolean>(false);
  const [showScienceNotes, setShowScienceNotes] = useState<boolean>(true);
  const [useInSentenceLatin, setUseInSentenceLatin] = useState<boolean>(true);
  const [isBuildingPacket, setIsBuildingPacket] = useState<boolean>(false);
  const [packetSections, setPacketSections] = useState<PacketSectionItem[] | null>(null);

  // Extracted Data Inspection Modal state
  const [showExtractedModal, setShowExtractedModal] = useState<boolean>(false);
  const [modalSubjectTab, setModalSubjectTab] = useState<SubjectKey>('latin');
  const [modalCycleTab, setModalCycleTab] = useState<1 | 2 | 3>(3);

  // Printing engine state
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printBlockedNotice, setPrintBlockedNotice] = useState<string | null>(null);
  const pageRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Automatically load imported practice lines from other tools (e.g. Ask AI Helper in Geography)
  React.useEffect(() => {
    if (initialImport && initialImport.lines.length > 0) {
      setPacketSections(null);
      setActivePack(null);
      if (initialImport.title) {
        setTitle(initialImport.title);
      }
      const rawItems: WorksheetItem[] = initialImport.lines.map((l) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: 'AI practice lines - check against your guide',
      }));
      const normalized = normalizeWorksheetItems(rawItems);
      setSentencesText(normalized.map((it) => it.text).join('\n'));
      setWorksheetItems(normalized);
      onClearInitialImport?.();
    }
  }, [initialImport, onClearInitialImport]);

  // Apply Presidents & VPs selection (verbatim data list)
  const applyPresidentsSelection = (mode: 'vps' | 'order', start: number, end: number) => {
    const s = Math.max(1, Math.min(start, 47));
    const e = Math.max(s, Math.min(end, 47));
    setPresidentsMode(mode);
    setPresidentsStart(s);
    setPresidentsEnd(e);
    setPacketSections(null);
    setActivePack(null);
    setActiveMathPack(null);
    setActiveLatinPack(null);

    const lines = mode === 'vps' ? getPresidentsWithVPs(s, e) : getPresidentsInOrder(s, e);
    const items: WorksheetItem[] = lines.map((line) => ({
      text: line,
      type: 'memoryWork' as const,
    }));

    const rangeStr = s === 1 && e === 47 ? '(1–47)' : `${s}–${e}`;
    const newTitle =
      mode === 'vps'
        ? `Presidents ${rangeStr} with VPs`
        : `Presidents ${rangeStr} in Order`;

    setTitle(newTitle);
    setSentencesText(lines.join('\n'));
    setWorksheetItems(items);

    if (lines.length > 15 && size === 'large') {
      setSize('medium');
    }
  };

  // Apply Bill of Rights selection (pulls ONLY from verified Cycle 3 Week 24 History data)
  const applyBillOfRightsSelection = (start = 1, end = 10) => {
    const selection = getBillOfRightsSelection(start, end);
    setBillOfRightsStart(selection.start);
    setBillOfRightsEnd(selection.end);
    setPacketSections(null);
    setActivePack(null);
    setActiveMathPack(null);
    setActiveLatinPack(null);

    setTitle(selection.heading);
    setSentencesText(selection.lines.join('\n'));
    setWorksheetItems(selection.items);

    // Bill of Rights formatting rules:
    // model text on guide lines plus one trace row
    setShowModel(true);
    setReps(1);
    // no blank line unless freehand is checked
    setShowBlank(false);

    if (size === 'large') {
      setSize('medium');
    }
  };

  // Automatically apply initial category from Home page if provided
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      if (initialCategory === 'Presidents & VPs') {
        const mode = initialPresidentsConfig?.mode || 'vps';
        const start = initialPresidentsConfig?.start ?? 1;
        const end = initialPresidentsConfig?.end ?? 10;
        applyPresidentsSelection(mode, start, end);
      } else if (initialCategory === 'Bill of Rights') {
        const start = initialBillOfRightsConfig?.start ?? 1;
        const end = initialBillOfRightsConfig?.end ?? 10;
        applyBillOfRightsSelection(start, end);
      }
      onClearInitialCategory?.();
    }
  }, [
    initialCategory,
    initialPresidentsConfig,
    initialBillOfRightsConfig,
    onClearInitialCategory,
  ]);

  const handlePrint = async () => {
    setIsPrinting(true);
    setPrintBlockedNotice(null);

    try {
      const capturedPages = pageRefs.current
        .filter((el): el is HTMLDivElement => el !== null)
        .map((el) => {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('.no-print').forEach((n) => n.remove());
          return clone.innerHTML;
        });

      if (capturedPages.length === 0) {
        console.warn('[Print] No page elements found to print, falling back to window.print()');
        window.print();
        return;
      }

      await printWorksheetPages({
        pagesHtml: capturedPages,
        docTitle: title || 'Handwriting Practice',
        onBlockedNotice: (msg) => setPrintBlockedNotice(msg),
      });
    } catch (err) {
      console.error('[Print Worksheet Error]:', err);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleApplyPack = (pack: StarterPack) => {
    setPacketSections(null);
    setActivePack(pack);
    setTitle(pack.title);
    setWorksheetItems(
      pack.items && pack.items.length > 0
        ? pack.items
        : pack.lines.map((l) => ({ text: l, type: 'memoryWork' as const }))
    );
    if (pack.isMath && pack.mathItems) {
      setActiveMathPack(pack);
      setActiveLatinPack(null);
      const isBlank = mathMode === 'trace-and-answer';
      const mLines = pack.mathItems.map((m) => (isBlank ? m.blankAnswer : m.full));
      setSentencesText(mLines.join('\n'));
      setWorksheetItems(mLines.map((l) => ({ text: l, type: 'memoryWork' as const })));
      if (mathMode === 'diy') {
        setShowModel(true);
      }
    } else if (pack.isLatin) {
      setActiveLatinPack(pack);
      setActiveMathPack(null);
      if (latinMeaningMode === 'inline') {
        setSentencesText(pack.lines.join('\n'));
      } else {
        setSentencesText(
          pack.latinEntries
            ? pack.latinEntries.map((e) => e.latin).join('\n')
            : pack.lines.map((l) => l.split(' - ')[0].trim()).join('\n')
        );
      }
    } else {
      setActiveMathPack(null);
      setActiveLatinPack(null);
      setSentencesText(pack.lines.join('\n'));
    }
    if (pack.lines.length > 15) {
      setSize('small');
    }
  };

  const handleSelectLatinMeaningMode = (newMode: 'inline' | 'note') => {
    setLatinMeaningMode(newMode);
    if (activeLatinPack) {
      if (newMode === 'inline') {
        setSentencesText(activeLatinPack.lines.join('\n'));
        setWorksheetItems(
          activeLatinPack.items && activeLatinPack.items.length > 0
            ? activeLatinPack.items
            : activeLatinPack.lines.map((l) => ({ text: l, type: 'memoryWork' as const }))
        );
      } else {
        const words = activeLatinPack.latinEntries
          ? activeLatinPack.latinEntries.map((e) => e.latin)
          : activeLatinPack.lines.map((l) => l.split(' - ')[0].trim());
        setSentencesText(words.join('\n'));
        setWorksheetItems(words.map((w) => ({ text: w, type: 'memoryWork' as const })));
      }
    } else {
      if (newMode === 'note') {
        const converted = sentencesText.split('\n').map((line) => {
          if (line.includes(' - ')) return line.split(' - ')[0].trim();
          return line;
        });
        setSentencesText(converted.join('\n'));
        setWorksheetItems(converted.map((w) => ({ text: w, type: 'memoryWork' as const })));
      }
    }
  };

  const handleSelectMathMode = (newMode: MathMode) => {
    setMathMode(newMode);
    if (newMode === 'diy' && !showModel) {
      setShowModel(true);
    }
    if (activeMathPack && activeMathPack.mathItems) {
      if (newMode === 'trace' || newMode === 'diy') {
        const lines = activeMathPack.mathItems.map((m) => m.full);
        setSentencesText(lines.join('\n'));
        setWorksheetItems(lines.map((l) => ({ text: l, type: 'memoryWork' as const })));
      } else if (newMode === 'trace-and-answer') {
        const lines = activeMathPack.mathItems.map((m) => m.blankAnswer);
        setSentencesText(lines.join('\n'));
        setWorksheetItems(lines.map((l) => ({ text: l, type: 'memoryWork' as const })));
      }
    } else {
      // User free-typed sentences with math equations
      if (newMode === 'trace-and-answer') {
        const converted = sentencesText.split('\n').map((line) => {
          if (line.includes(' = ')) return line.replace(/ = .*$/, ' = ___');
          if (line.includes('=')) return line.replace(/=.*$/, '= ___');
          return line;
        });
        setSentencesText(converted.join('\n'));
        setWorksheetItems(converted.map((l) => ({ text: l, type: 'memoryWork' as const })));
      }
    }
  };

  const handleDraftWithAi = async () => {
    if (!aiTopic.trim()) return;
    setIsAiLoading(true);
    setAiError(null);
    setAiReminder(null);
    setAiStatusMsg(null);

    try {
      const data = await callGeminiWithRetry({
        url: '/api/gemini/draft',
        body: { topic: aiTopic.trim() },
        onStatusUpdate: (status) => setAiStatusMsg(status),
      });

      if (!data || (typeof data === 'object' && !data.lines && !data.title)) {
        throw new Error('Unexpected response format from draft AI');
      }

      setPacketSections(null);
      if (data.title) setTitle(data.title);
      if (Array.isArray(data.lines) && data.lines.length > 0) {
        setSentencesText(data.lines.join('\n'));
      }
      setAiReminder(data.reminder || 'Always verify against your Foundations or curriculum guide.');
    } catch (err: any) {
      console.error('[Draft with AI error details]:', err);
      const isBusy =
        err?.message?.includes('busy') ||
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('rate limit');
      setAiError(
        isBusy
          ? "Google's AI is very busy right now. Please wait a minute and press the button again."
          : 'The AI gave an answer I could not read. Please try asking again.'
      );
    } finally {
      setIsAiLoading(false);
      setAiStatusMsg(null);
    }
  };

  // Toggle individual subject in review packet
  const handleToggleSubject = (sub: SubjectKey) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [sub]: !prev[sub],
    }));
  };

  // Select all or clear all subjects
  const handleSelectAllSubjects = (selectAll: boolean) => {
    const updated: Record<SubjectKey, boolean> = {
      bible: selectAll,
      latin: selectAll,
      math: selectAll,
      science: selectAll,
      english: selectAll,
      history: selectAll,
      timeline: selectAll,
      geography: selectAll,
    };
    setSelectedSubjects(updated);
  };

  // Review packet range and specific week selection handlers
  const handleReviewPacketRangeChange = (s: number, e: number) => {
    setStartWeek(s);
    setEndWeek(e);
    const min = Math.min(s, e);
    const max = Math.max(s, e);
    const weeks: number[] = [];
    for (let w = min; w <= max; w++) {
      weeks.push(w);
    }
    setSelectedWeeks(weeks);
    setTitle(`Cycle ${cycle} Review Packet: ${formatWeeksLabel(weeks)}`);
  };

  const handleToggleReviewPacketWeek = (w: number) => {
    setSelectedWeeks((prev) => {
      let next: number[];
      if (prev.includes(w)) {
        next = prev.filter((item) => item !== w);
      } else {
        next = [...prev, w].sort((a, b) => a - b);
      }
      if (next.length > 0) {
        setStartWeek(Math.min(...next));
        setEndWeek(Math.max(...next));
      }
      setTitle(`Cycle ${cycle} Review Packet: ${formatWeeksLabel(next)}`);
      return next;
    });
  };

  const handleSelectAllReviewPacketWeeks = () => {
    const all = Array.from({ length: 24 }, (_, i) => i + 1);
    setSelectedWeeks(all);
    setStartWeek(1);
    setEndWeek(24);
    setTitle(`Cycle ${cycle} Review Packet: ${formatWeeksLabel(all)}`);
  };

  const handleClearReviewPacketWeeks = () => {
    setSelectedWeeks([]);
    setTitle(`Cycle ${cycle} Review Packet: No Weeks Selected`);
  };

  // Week Picker logic: Choose Cycle (1, 2, 3) and Week (1-24) plus subject checkboxes
  const handleApplyWeekPicker = (
    targetCycle: 1 | 2 | 3,
    targetWeek: number,
    subjs: Record<SubjectKey, boolean>
  ) => {
    // 1. Setting cycle and week sets the worksheet title like "Cycle 3, Week 15"
    setTitle(`Cycle ${targetCycle}, Week ${targetWeek}`);
    const glanceTopic = getYearAtAGlanceTopic(targetCycle, targetWeek, subjs);
    setAiTopic(glanceTopic);

    const lines: string[] = [];
    const loadedItems: WorksheetItem[] = [];
    const loadedNames: string[] = [];

    // Bible is fully available for all Cycles (1, 2, 3), Weeks 1–24
    if (subjs.bible) {
      const bibleData = getBibleWeekData(targetCycle, targetWeek);
      if (bibleData && bibleData.lines.length > 0) {
        lines.push(...bibleData.lines);
        loadedItems.push(
          ...bibleData.lines.map((l) => ({
            text: l,
            type: 'memoryWork' as const,
            prompt: bibleData.question,
            promptHeader: bibleData.question,
            label: bibleData.question,
          }))
        );
        loadedNames.push('Bible');
      }
    }

    if (targetCycle === 3) {
      // 2. For Cycle 3: load the checked subjects' actual content straight from data layer
      // Subjects: Latin, Math, Science, English, History, Geography, Timeline
      if (subjs.latin) {
        const latinWeeks = LATIN_MEMORY_WORK[3] || [];
        const found = latinWeeks.find((w) => w.week === targetWeek);
        if (found && found.entries && found.entries.length > 0) {
          const lLines = found.entries.map((e) => (e.meaning ? `${e.latin} - ${e.meaning}` : e.latin));
          lines.push(...lLines);
          loadedItems.push(...lLines.map((l) => ({ text: l, type: 'memoryWork' as const })));
          loadedNames.push('Latin');
        }
      }

      if (subjs.math) {
        const mathData = getMathWeekData(targetWeek, fillInTheBlankMath || mathMode === 'trace-and-answer');
        if (mathData && mathData.lines && mathData.lines.length > 0) {
          for (const l of mathData.lines) {
            const parsed = splitPromptAndAnswer(l);
            lines.push(parsed.answer);
            loadedItems.push({
              text: parsed.answer,
              type: 'memoryWork' as const,
              prompt: parsed.prompt,
              promptHeader: parsed.prompt,
              label: parsed.prompt,
            });
          }
          loadedNames.push('Math');
        }
      }

      if (subjs.science) {
        const sci = CYCLE_3_SCIENCE_WEEKS[targetWeek];
        if (sci && sci.lines && sci.lines.length > 0) {
          lines.push(...sci.lines);
          loadedItems.push(
            ...sci.lines.map((l) => ({
              text: l,
              type: 'memoryWork' as const,
              prompt: sci.question,
              promptHeader: sci.question,
              label: sci.question,
            }))
          );
          loadedNames.push('Science');
        }
      }

      if (subjs.english) {
        const eng = CYCLE_3_ENGLISH_WEEKS[targetWeek];
        if (eng && eng.lines && eng.lines.length > 0) {
          for (const l of eng.lines) {
            const parsed = splitPromptAndAnswer(l);
            const prompt = eng.prompt || parsed.prompt || eng.heading;
            lines.push(parsed.answer);
            loadedItems.push({
              text: parsed.answer,
              type: 'memoryWork' as const,
              prompt,
              promptHeader: prompt,
              label: prompt,
            });
          }
          loadedNames.push('English');
        }
      }

      if (subjs.history) {
        const hist = CYCLE_3_HISTORY_WEEKS[targetWeek];
        if (hist && hist.lines && hist.lines.length > 0) {
          for (const l of hist.lines) {
            const parsed = splitPromptAndAnswer(l);
            const prompt = parsed.prompt || hist.heading;
            lines.push(parsed.answer);
            loadedItems.push({
              text: parsed.answer,
              type: 'memoryWork' as const,
              prompt,
              promptHeader: prompt,
              label: prompt,
            });
          }
          loadedNames.push('History');
        }
      }

      if (subjs.geography) {
        const geo = CYCLE_3_GEOGRAPHY_WEEKS[targetWeek];
        if (geo && geo.states && geo.states.length > 0) {
          const gLines = geo.states.map((s) => `${s.state} - ${s.capital}`);
          lines.push(...gLines);
          loadedItems.push(...gLines.map((l) => ({ text: l, type: 'memoryWork' as const })));
          loadedNames.push('Geography');
        }
      }

      if (subjs.timeline) {
        const time = CYCLE_3_TIMELINE_WEEKS[targetWeek];
        if (time && time.cards && time.cards.length > 0) {
          lines.push(...time.cards);
          loadedItems.push(...time.cards.map((l) => ({ text: l, type: 'memoryWork' as const })));
          loadedNames.push('Timeline');
        }
      }

      setSentencesText(lines.join('\n'));
      setWorksheetItems(loadedItems);
      setActivePack(null);
      setPacketSections(null);
      setWeekPickerNote(null);
      setWeekPickerAppliedSummary(
        lines.length > 0
          ? `Loaded ${lines.length} lines for ${loadedNames.join(', ')}`
          : 'No subjects selected'
      );
    } else {
      // 3. For Cycles 1 and 2: Bible loads directly; other subjects fill Draft with AI topic
      if (lines.length > 0) {
        setSentencesText(lines.join('\n'));
        setWorksheetItems(loadedItems);
        setActivePack(null);
        setPacketSections(null);
        setWeekPickerAppliedSummary(`Loaded ${lines.length} lines for ${loadedNames.join(', ')}`);
        const otherChecked = Object.keys(subjs).some((k) => k !== 'bible' && subjs[k as SubjectKey]);
        if (otherChecked) {
          setWeekPickerNote(
            `Cycle ${targetCycle} Bible memory work loaded directly from Carol Eichert's Memory Masters model. Other subjects can be drafted below via Year at a Glance.`
          );
        } else {
          setWeekPickerNote(null);
        }
      } else {
        const topic = getYearAtAGlanceTopic(targetCycle, targetWeek, subjs);
        setAiTopic(topic);
        setSentencesText('');
        setWorksheetItems([]);
        setActivePack(null);
        setPacketSections(null);
        setWeekPickerAppliedSummary(null);
        setWeekPickerNote(
          `Cycle ${targetCycle} other subjects have no uploaded guide pages yet. Select Bible or click "Draft with AI" to generate handwriting lines.`
        );
      }
    }
  };

  const handleWeekPickerCycleChange = (newCycle: 1 | 2 | 3) => {
    setWeekPickerCycle(newCycle);
    handleApplyWeekPicker(newCycle, weekPickerWeek, weekPickerSubjects);
  };

  const handleWeekPickerWeekChange = (newWeek: number) => {
    setWeekPickerWeek(newWeek);
    handleApplyWeekPicker(weekPickerCycle, newWeek, weekPickerSubjects);
  };

  const handleWeekPickerSubjectToggle = (subj: SubjectKey) => {
    const updated = {
      ...weekPickerSubjects,
      [subj]: !weekPickerSubjects[subj],
    };
    setWeekPickerSubjects(updated);
    handleApplyWeekPicker(weekPickerCycle, weekPickerWeek, updated);
  };

  const handleToggleAllWeekPickerSubjects = (selectAll: boolean) => {
    const updated: Record<SubjectKey, boolean> = {
      bible: selectAll,
      latin: selectAll,
      math: selectAll,
      science: selectAll,
      english: selectAll,
      history: selectAll,
      geography: selectAll,
      timeline: selectAll,
    };
    setWeekPickerSubjects(updated);
    handleApplyWeekPicker(weekPickerCycle, weekPickerWeek, updated);
  };

  // Compile Review Packet across all selected subjects
  const handleCompileReviewPacket = async () => {
    if (selectedWeeks.length === 0) {
      return;
    }
    // Nothing checked yet: ask the parent to pick at least one subject.
    if (!Object.values(selectedSubjects).some(Boolean)) {
      return;
    }
    setIsBuildingPacket(true);

    const activeWeeks = [...selectedWeeks].sort((a, b) => a - b);
    const sections: PacketSectionItem[] = [];
    const plainLines: string[] = [];

    // Order of subjects to present in packet:
    // Continuous flow within each subject, subject page break between different subjects
    const subjectOrder: SubjectKey[] = ['bible', 'math', 'latin', 'science', 'english', 'history', 'timeline', 'geography'];

    for (const subj of subjectOrder) {
      if (!selectedSubjects[subj]) continue;

      for (const w of activeWeeks) {
        if (subj === 'math') {
          const mathData = getMathWeekData(w, fillInTheBlankMath);
          const mathItems: WorksheetItem[] = mathData.lines.map((l) => {
            const parsed = splitPromptAndAnswer(l);
            return {
              text: parsed.answer,
              type: 'memoryWork' as const,
              prompt: parsed.prompt,
              promptHeader: parsed.prompt,
              label: parsed.prompt,
            };
          });
          sections.push({
            id: `sec-${w}-math`,
            week: w,
            subject: 'math',
            heading: mathData.heading,
            isPlaceholder: false,
            lines: mathItems.map((it) => it.text),
            items: mathItems,
          });
          plainLines.push(`--- Week ${w} Math ---`);
          plainLines.push(...mathItems.map((it) => it.text));
        } else if (subj === 'geography') {
          if (cycle === 3) {
            const geo = CYCLE_3_GEOGRAPHY_WEEKS[w];
            if (geo) {
              const geoLines = geo.states.map((s) => `${s.state} - ${s.capital}`);
              sections.push({
                id: `sec-${w}-geography`,
                week: w,
                subject: 'geography',
                heading: `${geo.heading} (States & Capitals)`,
                isPlaceholder: false,
                lines: geoLines,
                items: geoLines.map((l) => ({ text: l, type: 'memoryWork' as const })),
              });
              plainLines.push(`--- Week ${w} Geography ---`);
              plainLines.push(...geoLines);
            }
          } else {
            // Cycle 1 & 2 world geography pages not uploaded yet
            sections.push({
              id: `sec-${w}-geography-ph`,
              week: w,
              subject: 'geography',
              heading: `Cycle ${cycle} World Geography`,
              isPlaceholder: true,
              placeholderText: `Week ${w}: upload this guide page`,
              lines: [],
              items: [{ text: `Week ${w}: upload this guide page`, type: 'note' as const }],
            });
            plainLines.push(`[Week ${w}: upload this guide page]`);
          }
        } else if (subj === 'latin') {
          const latinWeeks = LATIN_MEMORY_WORK[cycle] || [];
          const found = latinWeeks.find((item) => item.week === w);

          if (!found || !found.hasGuidePage || found.entries.length === 0) {
            sections.push({
              id: `sec-${w}-latin-ph`,
              week: w,
              subject: 'latin',
              heading: found?.heading || `Week ${w} Latin`,
              isPlaceholder: true,
              placeholderText: `Week ${w}: upload this guide page`,
              lines: [],
              items: [{ text: `Week ${w}: upload this guide page`, type: 'note' as const }],
            });
            plainLines.push(`[Week ${w}: upload this guide page]`);
          } else {
            const latinLines = found.entries.map((e) => (e.meaning ? `${e.latin} - ${e.meaning}` : e.latin));
            const secId = `sec-${w}-latin`;
            sections.push({
              id: secId,
              week: w,
              subject: 'latin',
              heading: found.heading,
              isPlaceholder: false,
              lines: latinLines,
              items: latinLines.map((l) => ({ text: l, type: 'memoryWork' as const })),
            });
            plainLines.push(`--- Week ${w} Latin ---`);
            plainLines.push(...latinLines);
          }
        } else {
          // Bible, Science, History, Timeline, English:
          // Read from completed data layer in reviewPacketData.ts
          const guideData = getSubjectGuideData(cycle, subj, w);
          if (guideData.hasGuidePage && guideData.lines.length > 0) {
            sections.push({
              id: `sec-${w}-${subj}`,
              week: w,
              subject: subj,
              prompt: guideData.prompt,
              heading:
                subj === 'history'
                  ? `WEEK ${w} - HISTORY - ${guideData.heading.replace(/^WEEK \d+ - HISTORY - /i, '').replace(/^Week \d+: /i, '').trim()}`
                  : guideData.heading,
              isPlaceholder: false,
              lines: guideData.lines,
              items: guideData.items,
            });
            plainLines.push(`--- Week ${w} ${SUBJECT_METAS[subj].label} ---`);
            plainLines.push(...guideData.lines);
          } else {
            const subMeta = SUBJECT_METAS[subj];
            sections.push({
              id: `sec-${w}-${subj}-ph`,
              week: w,
              subject: subj,
              heading: guideData.heading || `${subMeta.label} Memory Work`,
              isPlaceholder: true,
              placeholderText: `Week ${w}: upload this guide page`,
              lines: [],
              items: [{ text: `Week ${w}: upload this guide page`, type: 'note' as const }],
            });
            plainLines.push(`[Week ${w}: upload this guide page]`);
          }
        }
      }
    }

    // Authentic Vulgate (John 1:1–7) "Use it in a sentence" selection
    // Pure data layer logic: works offline, never calls Gemini, 100% authentic grammar
    if (selectedSubjects.latin && useInSentenceLatin) {
      const assignedVerses = getVulgateVersesForLatinWeeks(cycle, activeWeeks);
      for (const w of activeWeeks) {
        const verse = assignedVerses.get(w);
        if (verse) {
          const sec = sections.find((s) => s.subject === 'latin' && s.week === w);
          if (sec) {
            sec.latinSentence = {
              latin: verse.latin,
              english: verse.english,
              reference: verse.reference,
              formatted: verse.latin,
            };
          }
        }
      }
    }

    const weeksLabel = formatWeeksLabel(activeWeeks);
    setTitle(`Cycle ${cycle} Review Packet: ${weeksLabel}`);
    setSentencesText(plainLines.join('\n'));
    setWorksheetItems([]);
    setActivePack(null);
    setSelectedCategory(null);
    setPacketSections(sections);
    setIsBuildingPacket(false);
  };

  // Add actionable lines from Ask AI helper
  const handleAddLinesFromAskAi = (lines: string[], questionTitle?: string) => {
    if (!lines || lines.length === 0) return;
    setPacketSections(null);
    setActivePack(null);
    const rawItems: WorksheetItem[] = lines.map((l) => ({
      text: l,
      type: 'memoryWork' as const,
      promptHeader: questionTitle || 'AI practice lines - check against your guide',
    }));
    const normalized = normalizeWorksheetItems(rawItems);
    setSentencesText(normalized.map((it) => it.text).join('\n'));
    setTitle(questionTitle ? `Practice: ${questionTitle}` : 'Practice: AI Practice Lines');
    setWorksheetItems(normalized);
  };

  const minW = Math.min(startWeek, endWeek);
  const maxW = Math.max(startWeek, endWeek);

  // Current guide geometry configuration
  const cfg: GuideSizeConfig = getGuideSizeConfig(size, style);

  // Split input into non-empty sentences (for standard mode)
  const rawSentences = sentencesText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  // Strict Content-Type enforcement:
  // Every item carries a type (memoryWork or note).
  // Only memoryWork renders on guide lines; notes render as small plain gray text.
  const effectiveItems: WorksheetItem[] = useMemo(() => {
    if (worksheetItems && worksheetItems.length > 0) {
      return worksheetItems;
    }
    return rawSentences.map((l) => {
      const isNote = /^(note:|tip:|instructions?:|\[note\])/i.test(l);
      const parsed = parseLabeledItem(l);
      return {
        text: parsed.content,
        label: parsed.label,
        promptHeader: parsed.label,
        type: isNote ? ('note' as const) : ('memoryWork' as const),
      };
    });
  }, [worksheetItems, rawSentences]);

  // Check if current worksheet contains math facts
  const isMathWorksheet =
    Boolean(activeMathPack) ||
    selectedPackId.includes('math') ||
    /(?:\d+\s*[x+*=-]\s*\d+|teaspoons?|tablespoons?|fluid ounces?|inches|centimeters?|millimeters?|meters?|cubed|squared|\bLaw\b|\(a \+ b\))/i.test(
      sentencesText
    );

  // Check if current worksheet contains Latin entries
  const isLatinWorksheet =
    Boolean(activeLatinPack) ||
    selectedPackId.includes('latin') ||
    rawSentences.some(
      (s) =>
        s.includes(' - ') &&
        !s.includes(' = ') &&
        !s.includes(' x ') &&
        !s.includes(' + ')
    );

  // Check if current worksheet is "Presidents with VPs" (requires full-width rows)
  const isPresidentsWithVPs = Boolean(
    !packetSections &&
      ((selectedCategory === 'Presidents & VPs' && presidentsMode === 'vps') ||
        (title.toLowerCase().includes('presidents') && title.toLowerCase().includes('vp')) ||
        (selectedCategory === 'Presidents & VPs' &&
          effectiveItems.some((it) => it.text.includes(' — ') && /^\d+\.\s+[A-Za-z]/.test(it.text))))
  );

  // Check if current worksheet is "Bill of Rights" (full-width sentence rows)
  const isBillOfRights = Boolean(
    !packetSections &&
      (selectedCategory === 'Bill of Rights' ||
        title.toLowerCase().includes('bill of rights'))
  );

  const handleToggleFillInTheBlankMath = (checked: boolean) => {
    setFillInTheBlankMath(checked);
    if (packetSections && packetSections.length > 0) {
      setPacketSections((prevSections) => {
        if (!prevSections) return prevSections;
        return prevSections.map((sec) => {
          if (sec.subject !== 'math') return sec;
          const mathData = getMathWeekData(sec.week, checked);
          const mathItems: WorksheetItem[] = mathData.lines.map((l) => {
            const parsed = splitPromptAndAnswer(l);
            return {
              text: parsed.answer,
              type: 'memoryWork' as const,
              prompt: parsed.prompt,
              promptHeader: parsed.prompt,
              label: parsed.prompt,
            };
          });
          return {
            ...sec,
            lines: mathItems.map((it) => it.text),
            items: mathItems,
          };
        });
      });
    }
  };

  const findLatinInfo = (sentenceText: string) => {
    const parts = sentenceText.split(' - ');
    const latinWord = parts[0].trim();
    const meaning = parts.length > 1 ? parts.slice(1).join(' - ').trim() : '';

    if (activeLatinPack?.latinEntries) {
      const matched = activeLatinPack.latinEntries.find(
        (e) => e.latin.toLowerCase() === latinWord.toLowerCase()
      );
      if (matched) return matched;
    }
    for (const c of [1, 2, 3] as const) {
      for (const w of LATIN_MEMORY_WORK[c]) {
        const matched = w.entries.find(
          (e) => e.latin.toLowerCase() === latinWord.toLowerCase()
        );
        if (matched) return matched;
      }
    }
    return meaning ? { latin: latinWord, meaning } : null;
  };

  // Helper to determine cycle for packs when viewing cross-cycle categories (Latin, Science)
  const getPackCycle = (pack: StarterPack): string => {
    if (pack.category === 'Cycle 1' || pack.id.startsWith('cycle-1')) return 'Cycle 1';
    if (pack.category === 'Cycle 2' || pack.id.startsWith('cycle-2')) return 'Cycle 2';
    if (pack.category === 'Cycle 3' || pack.id.startsWith('cycle-3')) return 'Cycle 3';
    return '';
  };

  const getPackOptionLabel = (pack: StarterPack, category: StarterCategory | null): string => {
    if (category === 'Latin' || category === 'English' || category === 'Science' || category === 'Bible') {
      const cycle = getPackCycle(pack);
      if (cycle) {
        return `[${cycle}] ${pack.label}`;
      }
    }
    return pack.label;
  };

  // Filter starter packs based on active category
  const filteredPacks = selectedCategory
    ? STARTER_PACKS.filter((p) => {
        if (selectedCategory === 'Latin') {
          return (
            p.isLatin ||
            p.category === 'Latin' ||
            p.id.includes('latin') ||
            p.label.toLowerCase().startsWith('latin:')
          );
        }
        if (selectedCategory === 'English') {
          return (
            p.category === 'English' ||
            p.id.includes('english') ||
            p.label.toLowerCase().startsWith('english:')
          );
        }
        if (selectedCategory === 'Science') {
          return (
            p.category === 'Science' ||
            p.id.includes('science') ||
            p.label.toLowerCase().startsWith('science:')
          );
        }
        if (selectedCategory === 'Timeline') {
          return (
            p.category === 'Timeline' ||
            p.id.includes('timeline') ||
            p.label.toLowerCase().startsWith('timeline:')
          );
        }
        if (selectedCategory === 'Bible') {
          return (
            p.category === 'Bible' ||
            p.id.includes('bible') ||
            p.label.toLowerCase().includes('bible')
          );
        }
        if (selectedCategory === 'Presidents & VPs') {
          return (
            p.category === 'Presidents & VPs' ||
            p.id.includes('presidents') ||
            p.label.toLowerCase().includes('presidents')
          );
        }
        if (selectedCategory === 'Bill of Rights') {
          return (
            p.category === 'Bill of Rights' ||
            p.id.includes('bill-of-rights') ||
            p.label.toLowerCase().includes('bill of rights')
          );
        }
        return p.category === selectedCategory;
      })
    : [];

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
      {/* Top Back & Actions Bar */}
      <div className="no-print flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#2F5D50] hover:text-[#24493e] font-semibold text-sm transition-colors py-1 px-2 rounded-md hover:bg-[#E4EDE7]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>
        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          {isPrinting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Preparing print...</span>
            </>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls Column */}
        <div className="no-print lg:col-span-4 bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-5 shadow-xs space-y-5">
          <div>
            <h2 className="text-xl font-bold text-[#2E2B26]">Tracing Worksheet Maker</h2>
            <p className="text-xs text-[#5C6B62] mt-1 leading-relaxed">
              Standard 3-line kindergarten guide lines: solid blue top, dashed blue midline, solid red baseline.
            </p>
          </div>

          {/* Builder Mode Selector */}
          <div className="flex rounded-lg bg-[#E4EDE7]/70 p-1 border border-[#D5DED8]">
            <button
              type="button"
              onClick={() => setActiveBuilderMode('standard')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeBuilderMode === 'standard'
                  ? 'bg-white text-[#2F5D50] shadow-xs'
                  : 'text-[#44514A] hover:text-[#2E2B26]'
              }`}
            >
              Standard Tracing
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveBuilderMode('reviewPacket');
                if (title === 'Foundations Handwriting Practice' || title.includes('Review Packet')) {
                  setTitle(`Cycle ${cycle} Review Packet: ${formatWeeksLabel(selectedWeeks)}`);
                }
              }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1 ${
                activeBuilderMode === 'reviewPacket'
                  ? 'bg-[#2F5D50] text-white shadow-xs'
                  : 'text-[#44514A] hover:text-[#2E2B26]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Review Packet Builder</span>
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
              Worksheet Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cycle 3 Break Review: Weeks 1–5"
              className="w-full px-3 py-2 text-sm bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
            />
          </div>

          {/* ASK AI HELPER (Available in all tools & sections) */}
          <AskAiHelper
            toolContext={activeBuilderMode === 'reviewPacket' ? 'reviewPacket' : 'tracing'}
            onAddLines={handleAddLinesFromAskAi}
            addButtonLabel="Add to worksheet"
          />

          {/* EXPANDED REVIEW PACKET BUILDER SECTION (ALL SUBJECTS) */}
          {activeBuilderMode === 'reviewPacket' && (
            <div className="bg-[#E4EDE7]/50 border border-[#2F5D50]/40 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#2F5D50]" />
                  <span>Break Review Packet Controls</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowExtractedModal(true)}
                  className="text-[11px] text-[#2F5D50] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Eye className="w-3 h-3" />
                  <span>Check Extracted Data</span>
                </button>
              </div>

              {/* Cycle Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#2E2B26] mb-1">
                  1. Pick Cycle
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([1, 2, 3] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCycle(c);
                        setTitle(`Cycle ${c} Review Packet: ${formatWeeksLabel(selectedWeeks)}`);
                      }}
                      className={`py-1.5 text-xs font-bold rounded-md border transition-all cursor-pointer ${
                        cycle === c
                          ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                          : 'bg-white text-[#2E2B26] border-[#D5DED8] hover:bg-[#E4EDE7]'
                      }`}
                    >
                      Cycle {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Week Range & Custom Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#2E2B26]">
                    2. Week Selection (1–24)
                  </label>
                  <span className="text-[10px] text-[#2F5D50] font-semibold bg-[#2F5D50]/10 px-1.5 py-0.5 rounded">
                    {selectedWeeks.length} {selectedWeeks.length === 1 ? 'week' : 'weeks'} selected
                  </span>
                </div>

                {/* Range Picker (Start & End) */}
                <div className="bg-white/70 p-2.5 rounded-lg border border-[#D5DED8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#44514A]">Range Selection</span>
                    <span className="text-[10px] text-[#5C6B62] font-medium">{formatWeeksLabel(selectedWeeks)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] text-[#5C6B62] block mb-0.5">Start Week</span>
                      <select
                        value={startWeek}
                        onChange={(e) => handleReviewPacketRangeChange(Number(e.target.value), endWeek)}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md font-medium"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Week {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <span className="text-xs text-[#5C6B62] mt-4">to</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-[#5C6B62] block mb-0.5">End Week</span>
                      <select
                        value={endWeek}
                        onChange={(e) => handleReviewPacketRangeChange(startWeek, Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md font-medium"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Week {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Range Quick Presets */}
                  <div className="flex flex-wrap gap-1">
                    {[
                      { label: 'Weeks 1–6', s: 1, e: 6 },
                      { label: 'Weeks 7–12', s: 7, e: 12 },
                      { label: 'Weeks 13–18', s: 13, e: 18 },
                      { label: 'Weeks 19–24', s: 19, e: 24 },
                      { label: 'All (1–24)', s: 1, e: 24 },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleReviewPacketRangeChange(p.s, p.e)}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#D5DED8] rounded hover:bg-[#E4EDE7] text-[#44514A] cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Choose specific weeks: grid of 24 toggle buttons */}
                <div className="bg-white/70 p-2.5 rounded-lg border border-[#D5DED8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2E2B26]">
                      Choose specific weeks
                    </span>
                    <div className="space-x-2 text-[10px]">
                      <button
                        type="button"
                        onClick={handleSelectAllReviewPacketWeeks}
                        className="text-[#2F5D50] hover:underline font-semibold cursor-pointer"
                      >
                        Select All
                      </button>
                      <span className="text-[#C2CFC6]">•</span>
                      <button
                        type="button"
                        onClick={handleClearReviewPacketWeeks}
                        className="text-[#5C6B62] hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#5C6B62] leading-snug">
                    Tap individual weeks on and off to fine-tune any combination:
                  </p>

                  <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => {
                      const isSelected = selectedWeeks.includes(w);
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => handleToggleReviewPacketWeek(w)}
                          title={`Week ${w}`}
                          aria-label={`Week ${w}`}
                          aria-pressed={isSelected}
                          className={`py-1 text-xs font-semibold rounded border transition-all cursor-pointer text-center ${
                            isSelected
                              ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                              : 'bg-white text-[#44514A] border-[#D5DED8] hover:bg-[#E4EDE7]'
                          }`}
                        >
                          W{w}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Subject Checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#2E2B26]">
                    3. Subjects to Include
                  </label>
                  <div className="space-x-2 text-[10px]">
                    <button
                      type="button"
                      onClick={() => handleSelectAllSubjects(true)}
                      className="text-[#2F5D50] hover:underline font-semibold cursor-pointer"
                    >
                      All
                    </button>
                    <span className="text-[#C2CFC6]">•</span>
                    <button
                      type="button"
                      onClick={() => handleSelectAllSubjects(false)}
                      className="text-[#5C6B62] hover:underline cursor-pointer"
                    >
                      None
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 bg-white p-2.5 rounded-lg border border-[#D5DED8]">
                  {(['bible', 'latin', 'english', 'math', 'science', 'history', 'timeline', 'geography'] as SubjectKey[]).map(
                    (subKey) => {
                      const meta = SUBJECT_METAS[subKey];
                      const isChecked = !!selectedSubjects[subKey];
                      return (
                        <label
                          key={subKey}
                          className="flex items-center gap-1.5 text-xs text-[#2E2B26] cursor-pointer hover:text-[#2F5D50]"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleSubject(subKey)}
                            className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
                          />
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: meta.bgColor, color: meta.color }}
                          >
                            {meta.label}
                          </span>
                        </label>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Subject Options: Math and Latin */}
              <div className="space-y-2 pt-1 border-t border-[#D5DED8]">
                {/* Math fill-in-the-blank */}
                {selectedSubjects.math && (
                  <div className="p-2 bg-white rounded-lg border border-[#D5DED8] space-y-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2B26] font-semibold">
                      <input
                        type="checkbox"
                        checked={fillInTheBlankMath}
                        onChange={(e) => handleToggleFillInTheBlankMath(e.target.checked)}
                        className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
                      />
                      <span>Fill-in-the-blank Math (e.g. 3 x 4 = __)</span>
                    </label>
                    <p className="text-[10px] text-[#5C6B62] pl-5">
                      Replaces the product with a blank line for student recall and testing.
                    </p>
                  </div>
                )}

                {/* Helper notes option (Science "what it does" + English grammar helps) */}
                {(selectedSubjects.science || selectedSubjects.english) && (
                  <div className="p-2 bg-white rounded-lg border border-[#D5DED8] space-y-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2B26] font-semibold">
                      <input
                        type="checkbox"
                        checked={showScienceNotes}
                        onChange={(e) => setShowScienceNotes(e.target.checked)}
                        className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
                      />
                      <span>Helper notes (what the terms mean)</span>
                    </label>
                    <p className="text-[10px] text-[#5C6B62] pl-5">
                      Science: what each part does (Skull: Protects the brain). English: what the grammar labels mean, with examples (Past participle: the form used with have/has/had).
                    </p>
                  </div>
                )}

                {/* Latin sentence option */}
                {selectedSubjects.latin && (
                  <div className="p-2 bg-white rounded-lg border border-[#D5DED8] space-y-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2B26] font-semibold">
                      <input
                        type="checkbox"
                        checked={useInSentenceLatin}
                        onChange={(e) => setUseInSentenceLatin(e.target.checked)}
                        className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
                      />
                      <span>Latin: Use it in a sentence</span>
                    </label>
                    <p className="text-[10px] text-[#5C6B62] pl-5">
                      Adds an authentic Vulgate John 1 verse practice row with Douay-Rheims English translation note beneath.
                    </p>
                  </div>
                )}
              </div>

              {/* Build Button */}
              <button
                type="button"
                onClick={handleCompileReviewPacket}
                disabled={isBuildingPacket || selectedWeeks.length === 0 || !Object.values(selectedSubjects).some(Boolean)}
                className="w-full py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white font-bold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isBuildingPacket ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Compiling Packet...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {selectedWeeks.length === 0
                        ? 'Select at least one week'
                        : !Object.values(selectedSubjects).some(Boolean)
                          ? 'Check the subjects you want'
                          : `Compile Review Packet (${formatWeeksLabel(selectedWeeks)})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STANDARD MODE CONTROLS (STARTER PACKS & FREE-TYPING) */}
          {activeBuilderMode === 'standard' && (
            <>
              {/* WEEK PICKER (CYCLES 1–3, WEEKS 1–24, 7 SUBJECTS) */}
              <div className="bg-[#FFFFFF] border-2 border-[#2F5D50]/50 rounded-xl p-3.5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#2F5D50]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50]">
                      Week Picker
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => handleToggleAllWeekPickerSubjects(true)}
                      className="text-[#2F5D50] hover:underline font-semibold cursor-pointer"
                    >
                      Select All
                    </button>
                    <span className="text-[#C2CFC6]">|</span>
                    <button
                      type="button"
                      onClick={() => handleToggleAllWeekPickerSubjects(false)}
                      className="text-[#7C8880] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-[#5C6B62] leading-snug">
                  Choose Cycle and Week to load memory work onto worksheet guide lines.
                </p>

                {/* Dropdowns row: Cycle (1, 2, 3) and Week (1-24) */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#2E2B26] mb-1">
                      Cycle
                    </label>
                    <select
                      value={weekPickerCycle}
                      onChange={(e) => handleWeekPickerCycleChange(Number(e.target.value) as 1 | 2 | 3)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] font-medium focus:outline-none focus:ring-2 focus:ring-[#2F5D50] cursor-pointer"
                    >
                      <option value={1}>Cycle 1 (Ancient)</option>
                      <option value={2}>Cycle 2 (Medieval)</option>
                      <option value={3}>Cycle 3 (Early America)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#2E2B26] mb-1">
                      Week
                    </label>
                    <select
                      value={weekPickerWeek}
                      onChange={(e) => handleWeekPickerWeekChange(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] font-medium focus:outline-none focus:ring-2 focus:ring-[#2F5D50] cursor-pointer"
                    >
                      {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => {
                        const glance =
                          weekPickerCycle === 1
                            ? CYCLE_1_YEAR_AT_A_GLANCE[w]
                            : weekPickerCycle === 2
                            ? CYCLE_2_YEAR_AT_A_GLANCE[w]
                            : CYCLE_3_YEAR_AT_A_GLANCE[w];
                        const historyTopic = glance?.history ? ` (${glance.history})` : '';
                        return (
                          <option key={w} value={w}>
                            Week {w}{historyTopic}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Subject checkboxes (Latin, Math, Science, English, History, Geography, Timeline) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#2E2B26] mb-1.5">
                    Subjects:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { key: 'bible' as SubjectKey, label: 'Bible' },
                      { key: 'latin' as SubjectKey, label: 'Latin' },
                      { key: 'math' as SubjectKey, label: 'Math' },
                      { key: 'science' as SubjectKey, label: 'Science' },
                      { key: 'english' as SubjectKey, label: 'English' },
                      { key: 'history' as SubjectKey, label: 'History' },
                      { key: 'geography' as SubjectKey, label: 'Geography' },
                      { key: 'timeline' as SubjectKey, label: 'Timeline' },
                    ].map((subj) => {
                      const isChecked = weekPickerSubjects[subj.key];
                      return (
                        <label
                          key={subj.key}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs border transition-colors cursor-pointer select-none ${
                            isChecked
                              ? 'bg-white border-[#2F5D50] text-[#2F5D50] font-bold shadow-2xs'
                              : 'bg-white/60 border-[#D5DED8] text-[#5C6B62] hover:bg-white'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleWeekPickerSubjectToggle(subj.key)}
                            className="rounded text-[#2F5D50] focus:ring-[#2F5D50] w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="truncate">{subj.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Cycle 3 Loaded Info */}
                {weekPickerCycle === 3 && weekPickerAppliedSummary && (
                  <div className="p-2 bg-[#E2ECE9] border border-[#82A79D] rounded-md text-[11px] text-[#1C3B32] flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D50] shrink-0" />
                      <span>{weekPickerAppliedSummary}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyWeekPicker(weekPickerCycle, weekPickerWeek, weekPickerSubjects)}
                      className="text-[10px] uppercase font-bold text-[#2F5D50] hover:underline cursor-pointer shrink-0 ml-2"
                    >
                      Reload
                    </button>
                  </div>
                )}

                {/* Cycles 1 & 2 Note */}
                {weekPickerNote && (
                  <div className="p-2.5 bg-amber-50 border border-amber-300 rounded-md text-xs text-amber-900 space-y-1.5">
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">
                        {weekPickerNote}
                      </p>
                    </div>
                    <div className="pl-5 pt-0.5">
                      <button
                        type="button"
                        onClick={handleDraftWithAi}
                        disabled={isAiLoading || !aiTopic.trim()}
                        className="px-2.5 py-1 bg-[#2F5D50] hover:bg-[#24493e] text-white text-[11px] font-bold rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        {isAiLoading ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>{aiStatusMsg || 'Drafting...'}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3" />
                            <span>Draft Cycle {weekPickerCycle}, Week {weekPickerWeek} with AI</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* One-Tap Starter Packs: Two-Step Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E2B26]">
                    One-Tap Starter Packs
                  </label>
                  <span className="text-[11px] text-[#2F5D50] font-semibold">
                    CC Cycles & IEW
                  </span>
                </div>

                {/* Step 1: Exactly one row of category buttons */}
                <div className="flex flex-wrap gap-1">
                  {STARTER_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCategory(null);
                            setSelectedPackId('');
                          } else {
                            setSelectedCategory(cat);
                            setSelectedPackId('');
                            if (cat === 'Presidents & VPs') {
                              applyPresidentsSelection('vps', 1, 10);
                            } else if (cat === 'Bill of Rights') {
                              applyBillOfRightsSelection(1, 10);
                            }
                          }
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                          isSelected
                            ? 'bg-[#2F5D50] text-white font-bold shadow-xs'
                            : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Step 2: Dedicated Presidents & VPs Options Panel */}
                {selectedCategory === 'Presidents & VPs' && (
                  <div className="mt-3 p-3.5 bg-[#FFFFFF] border-2 border-[#2F5D50]/30 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Landmark className="w-4 h-4 text-[#2F5D50]" />
                        <span className="text-xs font-bold text-[#2E2B26] uppercase tracking-wide">
                          Presidents & VPs Section
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedPackId('');
                        }}
                        className="text-[10px] text-[#7C8880] hover:text-[#2E2B26] underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    {/* Worksheet Option: "Presidents in order" vs "Presidents with VPs" */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#2E2B26] mb-1">
                        Worksheet Option:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          type="button"
                          onClick={() => applyPresidentsSelection('vps', presidentsStart, presidentsEnd)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-0.5 ${
                            presidentsMode === 'vps'
                              ? 'bg-[#2F5D50] text-white shadow-xs'
                              : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                          }`}
                        >
                          <span>Presidents with VPs</span>
                          <span className="text-[10px] font-normal opacity-85">
                            Full-width rows
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => applyPresidentsSelection('order', presidentsStart, presidentsEnd)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-0.5 ${
                            presidentsMode === 'order'
                              ? 'bg-[#2F5D50] text-white shadow-xs'
                              : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                          }`}
                        >
                          <span>Presidents in order</span>
                          <span className="text-[10px] font-normal opacity-85">
                            Columns by width
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Range Picker (e.g. presidents 1-10, 11-20) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#2E2B26]">
                          Range Picker:
                        </label>
                        <span className="text-[10px] text-[#2F5D50] font-semibold">
                          Presidents {presidentsStart}–{presidentsEnd} ({presidentsEnd - presidentsStart + 1} items)
                        </span>
                      </div>

                      {/* Quick Presets */}
                      <div className="grid grid-cols-3 gap-1 mb-2">
                        {[
                          { label: '1–10', s: 1, e: 10 },
                          { label: '11–20', s: 11, e: 20 },
                          { label: '21–30', s: 21, e: 30 },
                          { label: '31–40', s: 31, e: 40 },
                          { label: '41–47', s: 41, e: 47 },
                          { label: 'All 1–47', s: 1, e: 47 },
                        ].map((range) => {
                          const isActive = presidentsStart === range.s && presidentsEnd === range.e;
                          return (
                            <button
                              key={range.label}
                              type="button"
                              onClick={() => applyPresidentsSelection(presidentsMode, range.s, range.e)}
                              className={`py-1 px-1.5 text-xs rounded font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#2F5D50] text-white shadow-2xs'
                                  : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                              }`}
                            >
                              {range.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Range Dropdowns */}
                      <div className="bg-white p-2 rounded-lg border border-[#D5DED8] flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#44514A]">From:</span>
                          <select
                            value={presidentsStart}
                            onChange={(e) => {
                              const newStart = Number(e.target.value);
                              const newEnd = Math.max(newStart, presidentsEnd);
                              applyPresidentsSelection(presidentsMode, newStart, newEnd);
                            }}
                            className="px-1.5 py-1 bg-[#FFFFFF] border border-[#D5DED8] rounded text-xs font-semibold cursor-pointer text-[#2E2B26]"
                          >
                            {PRESIDENTS_VERBATIM_LIST.map((p) => (
                              <option key={p.order} value={p.order}>
                                {p.order}. {p.president}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#44514A]">To:</span>
                          <select
                            value={presidentsEnd}
                            onChange={(e) => {
                              const newEnd = Number(e.target.value);
                              const newStart = Math.min(newEnd, presidentsStart);
                              applyPresidentsSelection(presidentsMode, newStart, newEnd);
                            }}
                            className="px-1.5 py-1 bg-[#FFFFFF] border border-[#D5DED8] rounded text-xs font-semibold cursor-pointer text-[#2E2B26]"
                          >
                            {PRESIDENTS_VERBATIM_LIST.map((p) => (
                              <option key={p.order} value={p.order}>
                                {p.order}. {p.president}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Verbatim List Note */}
                    <div className="text-[10px] text-[#5C6B62] bg-white/70 p-2 rounded border border-[#D5DED8]/60 space-y-0.5">
                      <p>
                        <strong className="text-[#2E2B26]">Verbatim list verified:</strong> John Tyler shows "(none)". Grover Cleveland is entries 22 & 24. Donald Trump is entries 45 & 47.
                      </p>
                      <p className="text-[#2F5D50] font-medium">
                        Formatted on US Letter guide lines with trace rows and print page breaks.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Dedicated Bill of Rights Options Panel */}
                {selectedCategory === 'Bill of Rights' && (
                  <div className="mt-3 p-3.5 bg-[#FFFFFF] border-2 border-[#2F5D50]/30 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Scroll className="w-4 h-4 text-[#2F5D50]" />
                        <span className="text-xs font-bold text-[#2E2B26] uppercase tracking-wide">
                          Bill of Rights Section
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedPackId('');
                        }}
                        className="text-[10px] text-[#7C8880] hover:text-[#2E2B26] underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>

                    {/* Range Picker (Amendments 1-10 or subset) */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-[#2E2B26]">
                          Amendment Picker:
                        </label>
                        <span className="text-[10px] text-[#2F5D50] font-semibold">
                          {billOfRightsStart === 1 && billOfRightsEnd === 10
                            ? 'All 10 Amendments'
                            : `Amendments ${billOfRightsStart}–${billOfRightsEnd} (${billOfRightsEnd - billOfRightsStart + 1} items)`}
                        </span>
                      </div>

                      {/* Quick Presets */}
                      <div className="grid grid-cols-3 gap-1 mb-2">
                        {[
                          { label: 'All 1–10', s: 1, e: 10 },
                          { label: '1–5', s: 1, e: 5 },
                          { label: '6–10', s: 6, e: 10 },
                        ].map((range) => {
                          const isActive =
                            billOfRightsStart === range.s && billOfRightsEnd === range.e;
                          return (
                            <button
                              key={range.label}
                              type="button"
                              onClick={() => applyBillOfRightsSelection(range.s, range.e)}
                              className={`py-1 px-1.5 text-xs rounded font-semibold transition-colors cursor-pointer ${
                                isActive
                                  ? 'bg-[#2F5D50] text-white shadow-2xs'
                                  : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                              }`}
                            >
                              {range.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Range Dropdowns */}
                      <div className="bg-white p-2 rounded-lg border border-[#D5DED8] flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#44514A]">From:</span>
                          <select
                            value={billOfRightsStart}
                            onChange={(e) => {
                              const newStart = Number(e.target.value);
                              const newEnd = Math.max(newStart, billOfRightsEnd);
                              applyBillOfRightsSelection(newStart, newEnd);
                            }}
                            className="px-1.5 py-1 bg-[#FFFFFF] border border-[#D5DED8] rounded text-xs font-semibold cursor-pointer text-[#2E2B26]"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num}>
                                Amendment {num}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#44514A]">To:</span>
                          <select
                            value={billOfRightsEnd}
                            onChange={(e) => {
                              const newEnd = Number(e.target.value);
                              const newStart = Math.min(newEnd, billOfRightsStart);
                              applyBillOfRightsSelection(newStart, newEnd);
                            }}
                            className="px-1.5 py-1 bg-[#FFFFFF] border border-[#D5DED8] rounded text-xs font-semibold cursor-pointer text-[#2E2B26]"
                          >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                              <option key={num} value={num}>
                                Amendment {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Verbatim Cycle 3 Week 24 History Data Note */}
                    <div className="text-[10px] text-[#5C6B62] bg-white/70 p-2 rounded border border-[#D5DED8]/60 space-y-0.5">
                      <p>
                        <strong className="text-[#2E2B26]">Data Rule:</strong> Pulls 100% word-for-word from verified Cycle 3 Week 24 History data. Zero added sentences.
                      </p>
                      <p className="text-[#2F5D50] font-medium">
                        One amendment per item (model text + 1 trace row). Print & cursive compatible.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Dropdown of other categories' packs */}
                {selectedCategory &&
                  selectedCategory !== 'Presidents & VPs' &&
                  selectedCategory !== 'Bill of Rights' &&
                  filteredPacks.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-[#D5DED8]/60 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#44514A]">
                        Choose a {selectedCategory} pack:
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(null);
                          setSelectedPackId('');
                        }}
                        className="text-[10px] text-[#7C8880] hover:text-[#2E2B26] underline cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                    <select
                      value={selectedPackId}
                      onChange={(e) => {
                        const pack = filteredPacks.find((p) => p.id === e.target.value);
                        if (pack) {
                          setSelectedPackId(pack.id);
                          handleApplyPack(pack);
                        }
                      }}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50] cursor-pointer"
                    >
                      <option value="" disabled>
                        — Select a {selectedCategory} pack to load —
                      </option>
                      {selectedCategory === 'Latin' || selectedCategory === 'Science' || selectedCategory === 'Bible' ? (
                        <>
                          {(['Cycle 1', 'Cycle 2', 'Cycle 3'] as const).map((cycleName) => {
                            const cyclePacks = filteredPacks.filter(
                              (p) => getPackCycle(p) === cycleName
                            );
                            if (cyclePacks.length === 0) return null;
                            return (
                              <optgroup key={cycleName} label={cycleName}>
                                {cyclePacks.map((pack) => (
                                  <option key={pack.id} value={pack.id}>
                                    {getPackOptionLabel(pack, selectedCategory)}
                                  </option>
                                ))}
                              </optgroup>
                            );
                          })}
                          {filteredPacks
                            .filter((p) => !getPackCycle(p))
                            .map((pack) => (
                              <option key={pack.id} value={pack.id}>
                                {pack.label}
                              </option>
                            ))}
                        </>
                      ) : (
                        filteredPacks.map((pack) => (
                          <option key={pack.id} value={pack.id}>
                            {pack.label}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                )}
              </div>

              {/* Draft with AI Box */}
              <div className="bg-[#E4EDE7]/60 border border-[#D5DED8] rounded-lg p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F5D50] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft with AI</span>
                </div>
                <p className="text-xs text-[#5C6B62]">
                  Type a memory work topic like <span className="italic font-medium">"the eight parts of speech"</span> or{' '}
                  <span className="italic font-medium">"Review packet for Latin in CC Cycle 3 weeks 1 to 5"</span>:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDraftWithAi()}
                    placeholder="e.g. the eight parts of speech"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
                  />
                  <button
                    type="button"
                    onClick={handleDraftWithAi}
                    disabled={isAiLoading || !aiTopic.trim()}
                    className="px-3 py-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-xs font-semibold rounded-md transition-colors disabled:opacity-50 flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>{aiStatusMsg || 'Drafting...'}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        <span>Draft</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI Error Notification */}
                {aiError && (
                  <div className="mt-2 p-2.5 bg-red-50 border border-red-200 rounded text-red-800 text-xs">
                    {aiError}
                  </div>
                )}

                {/* AI Reminder */}
                {aiReminder && (
                  <p className="text-[11px] text-[#2F5D50] italic flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>{aiReminder}</span>
                  </p>
                )}
              </div>

              {/* Math Worksheet Mode Selector (Trace, Trace and answer, Do it yourself) */}
              {isMathWorksheet && (
                <div className="bg-[#FFFFFF] border border-[#2F5D50]/40 rounded-xl p-3.5 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50] flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-[#2F5D50]" />
                      <span>Math Worksheet Mode</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2F5D50]/10 text-[#2F5D50]">
                      {mathMode === 'trace'
                        ? 'Full Fact'
                        : mathMode === 'trace-and-answer'
                        ? 'Fill-in-Blank'
                        : 'Do It Yourself'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSelectMathMode('trace')}
                      className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all cursor-pointer ${
                        mathMode === 'trace'
                          ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                          : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                      }`}
                    >
                      Trace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectMathMode('trace-and-answer')}
                      className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all cursor-pointer ${
                        mathMode === 'trace-and-answer'
                          ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                          : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                      }`}
                    >
                      Trace and answer
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectMathMode('diy')}
                      className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all cursor-pointer ${
                        mathMode === 'diy'
                          ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                          : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                      }`}
                    >
                      Do it yourself
                    </button>
                  </div>

                  <p className="text-[11px] text-[#44514A] italic leading-tight">
                    {mathMode === 'trace' && 'Full fact traced: all numbers and operations (e.g. 3 x 4 = 12).'}
                    {mathMode === 'trace-and-answer' && 'Answer is left blank for student to solve and write: 3 x 4 = ___.'}
                    {mathMode === 'diy' && 'Model given above; practice line is a blank guide line to write from memory.'}
                  </p>
                </div>
              )}

              {/* Latin Worksheet Options Panel */}
              {isLatinWorksheet && (
                <div className="bg-[#FFFFFF] border border-[#2F5D50]/40 rounded-xl p-3.5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D50] flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-[#2F5D50]" />
                      <span>Latin Worksheet Options</span>
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2F5D50]/10 text-[#2F5D50]">
                      latin - meaning
                    </span>
                  </div>

                  {/* Meaning-note display option */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2E2B26] block">
                      Meaning Display Format:
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSelectLatinMeaningMode('inline')}
                        className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all cursor-pointer ${
                          latinMeaningMode === 'inline'
                            ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                            : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                        }`}
                      >
                        Inline (word - meaning)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectLatinMeaningMode('note')}
                        className={`py-1.5 px-2 text-xs font-bold rounded-md border text-center transition-all cursor-pointer ${
                          latinMeaningMode === 'note'
                            ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                            : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                        }`}
                      >
                        Meaning-Note Below
                      </button>
                    </div>
                    <p className="text-[11px] text-[#44514A] italic leading-tight">
                      {latinMeaningMode === 'inline'
                        ? 'Traces both the Latin word and English meaning together on the guideline.'
                        : 'Traces the Latin word on the guideline with an italicized English meaning note below.'}
                    </p>
                  </div>

                  {/* "Use it in a sentence" checkbox */}
                  <div className="pt-2 border-t border-[#E4EDE7] space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[#2E2B26] font-semibold">
                      <input
                        type="checkbox"
                        checked={latinSentencePractice}
                        onChange={(e) => setLatinSentencePractice(e.target.checked)}
                        className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
                      />
                      <span>Use it in a sentence</span>
                    </label>
                    <p className="text-[10px] text-[#5C6B62] pl-5">
                      Adds an italic note with a simple Latin sentence and English translation, plus a blank practice guideline.
                    </p>
                  </div>
                </div>
              )}

              {/* Free-typing Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2E2B26]">
                    Sentences to Practice
                  </label>
                  <span className="text-[11px] text-[#5C6B62]">One sentence per line</span>
                </div>
                <textarea
                  rows={6}
                  value={sentencesText}
                  onChange={(e) => {
                    setSentencesText(e.target.value);
                    setPacketSections(null);
                    setActivePack(null);
                    setWorksheetItems([]);
                  }}
                  placeholder="Type or paste sentences here, one per line..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50] resize-y"
                />
                <p className="text-[11px] text-[#5C6B62] mt-1">
                  Long sentences wrap automatically between words onto stacked guide lines.
                </p>
              </div>
            </>
          )}

          {/* Style & Size Options */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
                Letter Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as LetterStyle)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
              >
                <option value="print">Print (Josefin Sans)</option>
                <option value="cursive">Cursive (Playwrite US Trad)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
                Letter Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as LetterSize)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#C2CFC6] rounded-md text-[#2E2B26] focus:outline-none focus:ring-2 focus:ring-[#2F5D50]"
              >
                <option value="large">Large (K–1st Grade)</option>
                <option value="medium">Medium (2nd–3rd Grade)</option>
                <option value="small">Small (4th Grade & Up)</option>
              </select>
            </div>
          </div>

          {/* Trace Style Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
              Trace Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTraceStyle('dotted')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  traceStyle === 'dotted'
                    ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-sm'
                    : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full border border-dashed border-current inline-block" />
                <span>Dotted</span>
              </button>
              <button
                type="button"
                onClick={() => setTraceStyle('gray')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  traceStyle === 'gray'
                    ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-sm'
                    : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#B8B2A8] inline-block" />
                <span>Gray letters</span>
              </button>
            </div>
          </div>

          {/* Trace Copies Count */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-1.5">
              Trace Copies per Sentence: {reps}
            </label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setReps(num)}
                  className={`flex-1 py-1 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                    reps === num
                      ? 'bg-[#2F5D50] text-white border-[#2F5D50]'
                      : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-[#D5DED8] text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#2E2B26]">
              <input
                type="checkbox"
                checked={showModel}
                onChange={(e) => setShowModel(e.target.checked)}
                className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
              />
              <span>Solid model line above each sentence</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[#2E2B26]">
              <input
                type="checkbox"
                checked={showBlank}
                onChange={(e) => setShowBlank(e.target.checked)}
                className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
              />
              <span>Blank guide line for freehand writing</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-[#2E2B26]">
              <input
                type="checkbox"
                checked={showHeader}
                onChange={(e) => setShowHeader(e.target.checked)}
                className="rounded text-[#2F5D50] focus:ring-[#2F5D50]"
              />
              <span>Name and Date header line</span>
            </label>
          </div>

          {/* Guide Legend */}
          <div className="bg-[#E4EDE7]/40 rounded-lg p-3 text-[11px] text-[#44514A] space-y-1 border border-[#D5DED8]">
            <div className="font-bold text-[#2E2B26] mb-0.5">Handwriting Guide Alignment:</div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#5A92C4] inline-block" />
              <span>Blue Top Line: Capitals & tall letters touch here</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b border-dashed border-[#5A92C4] inline-block" />
              <span>Dashed Midline: Lowercase letters (halfway point)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-[#D9534F] inline-block" />
              <span>Red Baseline: All letter bases rest here</span>
            </div>
          </div>
        </div>

        {/* Live Worksheet Preview (US Letter Pages with Exact Pagination & Column Layout) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          <WorksheetPagesView
            title={title}
            showHeader={showHeader}
            style={style}
            size={size}
            traceStyle={traceStyle}
            reps={reps}
            showModel={showModel}
            showBlank={showBlank}
            mathMode={mathMode}
            fillInTheBlankMath={fillInTheBlankMath}
            isMathWorksheet={isMathWorksheet}
            isLatinWorksheet={isLatinWorksheet}
            latinMeaningMode={latinMeaningMode}
            latinSentencePractice={latinSentencePractice}
            rawSentences={rawSentences}
            items={effectiveItems}
            packetSections={packetSections}
            findLatinInfo={findLatinInfo}
            isPrinting={isPrinting}
            onPrint={handlePrint}
            printBlockedNotice={printBlockedNotice}
            onDismissBlockedNotice={() => setPrintBlockedNotice(null)}
            pageRefs={pageRefs}
            forceSingleColumn={!packetSections && (isPresidentsWithVPs || isBillOfRights)}
            showScienceNotes={showScienceNotes}
          />
        </div>
      </div>

      {/* EXTRACTED DATA INSPECTION MODAL (ALL SUBJECTS & CYCLES) */}
      {showExtractedModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs no-print">
          <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#D5DED8] flex items-center justify-between bg-white">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#2E2B26] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#2F5D50]" />
                  <span>Review Packet Extracted Memory Work Checklist</span>
                </h3>
                <p className="text-xs text-[#5C6B62] mt-0.5">
                  Strict Data Rule: Only uploaded guide pages & public-domain texts are wired in. Unuploaded weeks are marked as placeholders.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExtractedModal(false)}
                className="p-1.5 text-[#5C6B62] hover:text-[#2E2B26] hover:bg-[#E4EDE7] rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Filters */}
            <div className="px-4 py-3 bg-[#E4EDE7]/40 border-b border-[#D5DED8] flex flex-wrap items-center justify-between gap-2">
              {/* Subject Tabs */}
              <div className="flex flex-wrap gap-1">
                {(['bible', 'latin', 'math', 'geography', 'science', 'history', 'timeline', 'english'] as SubjectKey[]).map(
                  (sk) => {
                    const sm = SUBJECT_METAS[sk];
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => setModalSubjectTab(sk)}
                        className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                          modalSubjectTab === sk
                            ? 'bg-[#2F5D50] text-white shadow-xs'
                            : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                        }`}
                      >
                        {sm.label}
                      </button>
                    );
                  }
                )}
              </div>

              {/* Cycle Tabs */}
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-[#44514A] mr-1">Cycle:</span>
                {([1, 2, 3] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModalCycleTab(c)}
                    className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                      modalCycleTab === c
                        ? 'bg-[#2E2B26] text-white shadow-xs'
                        : 'bg-white text-[#44514A] border border-[#D5DED8] hover:bg-[#E4EDE7]'
                    }`}
                  >
                    Cycle {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body: Table of Extracted Data */}
            <div className="p-4 overflow-y-auto flex-1 text-xs space-y-4">
              <div className="border border-[#D5DED8] rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#E4EDE7]/70 text-[#2E2B26] border-b border-[#D5DED8]">
                      <th className="p-2.5 font-bold w-16 text-center">Week</th>
                      <th className="p-2.5 font-bold w-48">Topic / Heading</th>
                      <th className="p-2.5 font-bold">Extracted Content / Status</th>
                      <th className="p-2.5 font-bold w-32 text-center">Source Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4EDE7]">
                    {Array.from({ length: 24 }, (_, i) => i + 1).map((wk) => {
                      if (modalSubjectTab === 'math') {
                        const m = getMathWeekData(wk, false);
                        return (
                          <tr key={wk} className="hover:bg-[#FFFFFF]">
                            <td className="p-2.5 font-bold text-center text-[#2F5D50]">Week {wk}</td>
                            <td className="p-2.5 font-semibold text-[#2E2B26]">{m.heading}</td>
                            <td className="p-2.5 text-[#44514A]">
                              <span className="font-mono text-[11px] block">
                                {m.lines.slice(0, 4).join(', ')}
                                {m.lines.length > 4 && ` ... (${m.lines.length} items)`}
                              </span>
                            </td>
                            <td className="p-2.5 text-center">
                              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                Generated Formula
                              </span>
                            </td>
                          </tr>
                        );
                      }

                      if (modalSubjectTab === 'geography') {
                        if (modalCycleTab === 3) {
                          const geo = CYCLE_3_GEOGRAPHY_WEEKS[wk];
                          return (
                            <tr key={wk} className="hover:bg-[#FFFFFF]">
                              <td className="p-2.5 font-bold text-center text-[#2F5D50]">Week {wk}</td>
                              <td className="p-2.5 font-semibold text-[#2E2B26]">{geo?.heading || 'U.S. States'}</td>
                              <td className="p-2.5 text-[#44514A]">
                                {geo ? (
                                  <div className="font-mono text-[11px]">
                                    {geo.states.map((s) => `${s.state} (${s.capital})`).join(' • ')}
                                  </div>
                                ) : (
                                  'Review week'
                                )}
                              </td>
                              <td className="p-2.5 text-center">
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  App State Data
                                </span>
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr key={wk} className="hover:bg-[#FFFFFF]">
                              <td className="p-2.5 font-bold text-center text-[#2F5D50]">Week {wk}</td>
                              <td className="p-2.5 font-semibold text-[#2E2B26]">Cycle {modalCycleTab} World Geo</td>
                              <td className="p-2.5 text-amber-800 italic font-mono">
                                [Week {wk}: upload this guide page]
                              </td>
                              <td className="p-2.5 text-center">
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Missing Guide Photo
                                </span>
                              </td>
                            </tr>
                          );
                        }
                      }

                      if (modalSubjectTab === 'latin') {
                        const latinWeeks = LATIN_MEMORY_WORK[modalCycleTab] || [];
                        const found = latinWeeks.find((item) => item.week === wk);

                        return (
                          <tr key={wk} className="hover:bg-[#FFFFFF]">
                            <td className="p-2.5 font-bold text-center text-[#2F5D50]">Week {wk}</td>
                            <td className="p-2.5 font-semibold text-[#2E2B26]">
                              {found?.heading || `Week ${wk} Latin`}
                            </td>
                            <td className="p-2.5 text-[#44514A]">
                              {found && found.hasGuidePage && found.entries.length > 0 ? (
                                <div className="space-y-0.5 font-mono text-[11px]">
                                  {found.entries.slice(0, 4).map((e, idx) => (
                                    <span key={idx} className="mr-2 inline-block">
                                      <strong>{e.latin}</strong> - {e.meaning};
                                    </span>
                                  ))}
                                  {found.entries.length > 4 && ` ... (${found.entries.length} items)`}
                                </div>
                              ) : (
                                <span className="text-amber-800 italic font-mono">
                                  [Week {wk}: upload this guide page]
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center">
                              {found && found.hasGuidePage ? (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  {modalCycleTab === 3 && wk >= 12
                                    ? 'Public Vulgate (John 1)'
                                    : modalCycleTab === 3 && wk >= 7
                                    ? 'Public Vulgate'
                                    : 'Uploaded Guide'}
                                </span>
                              ) : (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                  Missing Guide Photo
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      }

                      // Bible, Science, History, Timeline, English
                      const guideData = getSubjectGuideData(modalCycleTab, modalSubjectTab, wk);
                      const subLabel = SUBJECT_METAS[modalSubjectTab].label;

                      return (
                        <tr key={wk} className="hover:bg-[#FFFFFF]">
                          <td className="p-2.5 font-bold text-center text-[#2F5D50]">Week {wk}</td>
                          <td className="p-2.5 font-semibold text-[#2E2B26]">
                            {guideData.prompt ? (
                              <div>
                                <span className="text-[10px] uppercase font-bold text-[#1C3B32] block">Prompt:</span>
                                <span className="italic">{guideData.prompt}</span>
                              </div>
                            ) : (
                              guideData.heading || `Week ${wk}: ${subLabel}`
                            )}
                          </td>
                          <td className="p-2.5 text-[#44514A]">
                            {guideData.hasGuidePage && guideData.lines.length > 0 ? (
                              <div className="font-mono text-[11px] text-[#2E2B26] space-y-0.5">
                                {guideData.lines.slice(0, 3).map((line, lIdx) => (
                                  <div key={lIdx} className="truncate max-w-lg">
                                    {line}
                                  </div>
                                ))}
                                {guideData.lines.length > 3 && (
                                  <span className="text-[#5C6B62] text-[10px]">
                                    ... ({guideData.lines.length} lines total)
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-amber-800 italic font-mono">
                                [Week {wk}: upload this guide page]
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-center">
                            {modalSubjectTab === 'bible' ? (
                              <span className="bg-amber-100 text-[#1C3B32] text-[10px] font-bold px-2 py-0.5 rounded border border-[#BFD0C5]">
                                Memory Masters (Carol Eichert)
                              </span>
                            ) : guideData.hasGuidePage ? (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                {modalCycleTab === 3 ? 'Summary Proof Sheet' : 'Uploaded Guide'}
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                Missing Guide Photo
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-white border-t border-[#D5DED8] flex items-center justify-between text-xs">
              <span className="text-[#5C6B62]">
                To add memory work for any subject, upload photo pages of that section.
              </span>
              <button
                type="button"
                onClick={() => setShowExtractedModal(false)}
                className="px-4 py-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white font-bold rounded-lg cursor-pointer"
              >
                Done Checking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

