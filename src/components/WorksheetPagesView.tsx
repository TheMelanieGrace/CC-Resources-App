import React, { useMemo } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { LetterStyle, LetterSize, WorksheetItem, WorksheetItemType } from '../types';
import { GuideSizeConfig, getGuideSizeConfig, determineColumnsForGroup, getColumnGuideConfig, wrapSentenceToRows } from '../utils/tracingWrap';
import { PacketSectionItem, SUBJECT_METAS, SubjectKey } from '../data/reviewPacketData';
import { MathMode } from '../data/mathPacks';
import { GuideLineSvgRow } from './GuideLineSvgRow';
import { normalizeWorksheetItems, parseLabeledItem, isPurePrompt, cleanPromptText } from '../utils/labelHelper';

export interface WorksheetPagesViewProps {
  title: string;
  showHeader: boolean;
  style: LetterStyle;
  size: LetterSize;
  traceStyle: 'dotted' | 'gray';
  reps: number;
  showModel: boolean;
  showBlank: boolean;
  mathMode: MathMode;
  fillInTheBlankMath?: boolean;
  isMathWorksheet: boolean;
  isLatinWorksheet: boolean;
  latinMeaningMode: 'inline' | 'note';
  latinSentencePractice: boolean;
  rawSentences: string[];
  items?: WorksheetItem[];
  packetSections: PacketSectionItem[] | null;
  findLatinInfo: (text: string) => any;
  isPrinting: boolean;
  onPrint: () => void;
  printBlockedNotice: string | null;
  onDismissBlockedNotice: () => void;
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  forceSingleColumn?: boolean;
  /** Science "What it does" notes toggle; defaults to on. */
  showScienceNotes?: boolean;
}

// Shared page-height budget in pixels for US Letter (816x1056 at 96 DPI)
// Total page height = 1056px.
// Page internal margins/padding: 24px top, 20px bottom (usable height = 1012px).
// Header: Page 1 compact title block ~41px, Page 2+ continuation header ~29px.
// Footer: credit line ~35px.
// Guaranteed budget ensures ONE app worksheet page maps to ONE printed US Letter sheet exactly with zero overflow.
const PAGE_1_CONTENT_HEIGHT = 930;
const PAGE_2_CONTENT_HEIGHT = 940;

interface ColumnGroup {
  columns: 1 | 2 | 3;
  colCfg?: GuideSizeConfig;
  items: Array<{
    text: string;
    type: WorksheetItemType;
    promptHeader?: string;
    label?: string;
    latinInfo?: any;
  }>;
}

interface StandardSentenceItem {
  original: string;
  wrappedRows: string[];
  type: WorksheetItemType;
  promptHeader?: string;
  label?: string;
  latinInfo?: any;
  functionNotes?: { term: string; note: string }[];
}

interface NoteItem {
  text: string;
}

interface StandardPageData {
  pageNumber: number;
  totalPages: number;
  type: 'standard';
  columnGroups?: ColumnGroup[];
  sentenceItems?: StandardSentenceItem[];
  notes?: NoteItem[];
}

interface PacketSectionPageSlice {
  id: string;
  week: number;
  subject: any;
  heading: string;
  prompt?: string;
  isPlaceholder: boolean;
  placeholderText?: string;
  isFirstSliceOfSection: boolean;
  columns: 1 | 2 | 3;
  columnGroups?: ColumnGroup[];
  sentenceLines?: Array<{
    original: string;
    wrappedRows: string[];
    type: WorksheetItemType;
    promptHeader?: string;
    label?: string;
    functionNotes?: { term: string; note: string }[];
  }>;
  notes?: NoteItem[];
  latinSentence?: {
    latin: string;
    english: string;
    reference?: string;
    formatted?: string;
    wrappedRows: string[];
  };
}

interface PacketPageData {
  pageNumber: number;
  totalPages: number;
  type: 'packet';
  sections: PacketSectionPageSlice[];
}

type PageData = StandardPageData | PacketPageData;

export const WorksheetPagesView: React.FC<WorksheetPagesViewProps> = ({
  title,
  showHeader,
  style,
  size,
  traceStyle,
  reps,
  showModel,
  showBlank,
  mathMode,
  fillInTheBlankMath = false,
  isMathWorksheet,
  isLatinWorksheet,
  latinMeaningMode,
  latinSentencePractice,
  rawSentences,
  items,
  packetSections,
  findLatinInfo,
  isPrinting,
  onPrint,
  printBlockedNotice,
  onDismissBlockedNotice,
  pageRefs,
  forceSingleColumn = false,
  showScienceNotes = true,
}) => {
  const baseCfg: GuideSizeConfig = useMemo(() => getGuideSizeConfig(size, style), [size, style]);

  // Height of a single unit of guide lines (reps of trace + blank)
  // The solid model text is a compact example (plain bold text), NOT on guide lines.
  const guideLinesPerItem = reps + (showBlank ? 1 : 0);
  const calcItemUnitHeight = (rowH: number) => guideLinesPerItem * rowH + Math.max(0, guideLinesPerItem - 1) * 2;
  const itemRowHeight = calcItemUnitHeight(baseCfg.rowHeight) + (showModel ? 22 : 0) + 8;

  // Pagination calculation
  const pages: PageData[] = useMemo(() => {
    // 1. Review Packet Mode (Continuous Flow across weeks within a subject)
    if (packetSections && packetSections.length > 0) {
      const packetPages: PacketPageData[] = [];
      let currentPageSections: PacketSectionPageSlice[] = [];
      let currentHeight = 0;
      let maxPageHeight = PAGE_1_CONTENT_HEIGHT;
      let currentSubject: SubjectKey | null = null;

      const finishPage = () => {
        if (currentPageSections.length > 0) {
          packetPages.push({
            pageNumber: packetPages.length + 1,
            totalPages: 1, // patched later
            type: 'packet',
            sections: currentPageSections,
          });
          currentPageSections = [];
          currentHeight = 0;
          maxPageHeight = PAGE_2_CONTENT_HEIGHT;
        }
      };

      interface WeekGroup {
        id: string;
        week: number;
        subject: SubjectKey;
        heading: string;
        prompt?: string;
        isPlaceholder: boolean;
        placeholderText?: string;
        memoryWorkItems: WorksheetItem[];
        noteItems: { text: string }[];
        latinSentence?: {
          latin: string;
          english: string;
          reference?: string;
          formatted?: string;
        };
      }

      // Grouping happens FIRST:
      // ALL memoryWork items belonging to the same week and subject
      // must be collected into ONE group before layout.
      // Grouping rule: ignore empty entries and attach prompts to the group header,
      // so a week's memoryWork items always form ONE unbroken group for the column algorithm.
      const weekGroups: WeekGroup[] = [];

      for (const sec of packetSections) {
        // Universal prompt/answer rule: Prompts are plain text headers above lines; only memoryWork answers render on guide lines
        // Ignore empty entries when collecting raw items
        let rawSecItems: WorksheetItem[] = (
          sec.items && sec.items.length > 0
            ? sec.items
            : (sec.lines || []).map((l): WorksheetItem => ({ text: l, type: 'memoryWork' }))
        ).filter((it) => it && it.text && it.text.trim().length > 0);

        // Fill-in-the-blank transform changes item TEXT only, BEFORE grouping,
        // so blanked equations flow through the same WeekGroup and determineColumnsForGroup as every other subject.
        if (sec.subject === 'math') {
          rawSecItems = rawSecItems.map((it) => {
            let newText = it.text;
            if (fillInTheBlankMath || mathMode === 'trace-and-answer') {
              if (/=\s*\d+/.test(newText)) {
                newText = newText.replace(/=\s*\d+.*$/, '= __');
              }
            } else {
              if (/=\s*_{2,}/.test(newText)) {
                const m = newText.match(/^(\d+)\s*x\s*(\d+)\s*=\s*_{2,}/i);
                if (m) {
                  newText = `${m[1]} x ${m[2]} = ${Number(m[1]) * Number(m[2])}`;
                }
              }
            }
            return {
              ...it,
              text: newText,
            };
          });
        }

        // Find if a group for this exact subject and week already exists
        const existingGroup = weekGroups.find(
          (g) => g.subject === sec.subject && g.week === sec.week
        );

        if (sec.isPlaceholder) {
          // If we already have items for this week, ignore empty/placeholder entries
          if (existingGroup && existingGroup.memoryWorkItems.length > 0) {
            continue;
          }
          if (!existingGroup) {
            weekGroups.push({
              id: sec.id,
              week: sec.week,
              subject: sec.subject,
              heading: sec.heading,
              isPlaceholder: true,
              placeholderText: sec.placeholderText,
              memoryWorkItems: [],
              noteItems: [],
            });
          }
          continue;
        }

        // Ignore empty section entries
        if (rawSecItems.length === 0) {
          continue;
        }

        const secItems = normalizeWorksheetItems(rawSecItems);

        const rawMemoryWork = secItems.filter(
          (it) => it.type === 'memoryWork' && Boolean(it.text && it.text.trim().length > 0)
        );
        const rawNotes = secItems.filter((it) => it.type === 'note').map((it) => ({ text: it.text }));

        // Keep week header as "Week N Subject" and show the prompt as the single small label line beneath it.
        // Never render the same prompt text twice in a row.
        let displayHeading = sec.heading;
        if (sec.subject === 'history' || sec.subject === 'bible') {
          displayHeading = '';
        } else if (isPurePrompt(sec.heading)) {
          displayHeading = '';
        }

        // Collect prompts to attach to the group header only for multi-item groups (like math)
        // so multi-item groups remain ONE unbroken group and don't fragment.
        // For single-item groups with their own prompt line (like history/bible), the prompt displays as the label line below.
        const promptHeaders = new Set<string>();
        if (sec.subject !== 'history' && sec.subject !== 'bible' && rawMemoryWork.length > 1) {
          for (const it of secItems) {
            const p = it.promptHeader || it.prompt || it.label;
            if (p && !p.toLowerCase().includes('upload this guide')) {
              promptHeaders.add(p);
            }
          }
          for (const n of rawNotes) {
            if (isPurePrompt(n.text)) {
              promptHeaders.add(cleanPromptText(n.text));
            }
          }

          for (const p of promptHeaders) {
            if (displayHeading && !displayHeading.toLowerCase().includes(p.toLowerCase())) {
              displayHeading = `${displayHeading} — ${p}`;
            }
          }
        }

        const secPrompt =
          sec.prompt ||
          secItems.find((it) => it.promptHeader || it.prompt)?.promptHeader ||
          secItems.find((it) => it.promptHeader || it.prompt)?.prompt;

        // In a group, prompts are attached to the header; individual memoryWork items do not fragment
        const memoryWorkItems: WorksheetItem[] = rawMemoryWork.map((it) => ({
          text: it.text,
          type: 'memoryWork' as const,
          promptHeader: rawMemoryWork.length === 1 ? it.promptHeader : undefined,
          label: rawMemoryWork.length === 1 ? it.label : undefined,
          functionNotes: it.functionNotes,
        }));

        const cleanNotes = rawNotes.filter((n) => !isPurePrompt(n.text));

        if (existingGroup) {
          // If the group was previously placeholder, unmark it now that we have memoryWork items
          if (existingGroup.isPlaceholder && memoryWorkItems.length > 0) {
            existingGroup.isPlaceholder = false;
            existingGroup.placeholderText = undefined;
          }
          if (sec.subject !== 'history' && sec.subject !== 'bible' && rawMemoryWork.length > 1) {
            for (const p of promptHeaders) {
              if (existingGroup.heading && !existingGroup.heading.toLowerCase().includes(p.toLowerCase())) {
                existingGroup.heading = `${existingGroup.heading} — ${p}`;
              }
            }
          }
          if (!existingGroup.prompt && secPrompt) {
            existingGroup.prompt = secPrompt;
          }
          existingGroup.memoryWorkItems.push(...memoryWorkItems);
          existingGroup.noteItems.push(...cleanNotes);
          if (sec.latinSentence) {
            existingGroup.latinSentence = sec.latinSentence;
          }
        } else {
          weekGroups.push({
            id: sec.id,
            week: sec.week,
            subject: sec.subject,
            heading: displayHeading,
            prompt: secPrompt,
            isPlaceholder: false,
            placeholderText: sec.placeholderText,
            memoryWorkItems,
            noteItems: cleanNotes,
            latinSentence: sec.latinSentence,
          });
        }
      }

      // Final pass on weekGroups: ensure multi-item groups (like math tables or bible lists) have clean unbroken items
      for (const group of weekGroups) {
        if (group.prompt) {
          for (const it of group.memoryWorkItems) {
            it.promptHeader = undefined;
            it.label = undefined;
          }
        } else if (group.memoryWorkItems.length > 1) {
          for (const it of group.memoryWorkItems) {
            it.promptHeader = undefined;
            it.label = undefined;
          }
        }
      }

      for (const group of weekGroups) {
        // ONLY TWO THINGS FORCE A PAGE BREAK:
        // (a) a change of SUBJECT (Latin to History, etc.)
        // (b) an item that will not fit in the space remaining.
        if (currentSubject !== null && group.subject !== currentSubject) {
          if (currentPageSections.length > 0) {
            finishPage();
          }
        }
        currentSubject = group.subject;

        if (group.isPlaceholder) {
          const phHeight = 44;
          if (currentHeight + phHeight > maxPageHeight && currentPageSections.length > 0) {
            finishPage();
          }
          currentPageSections.push({
            id: group.id,
            week: group.week,
            subject: group.subject,
            heading: group.heading,
            isPlaceholder: true,
            placeholderText: group.placeholderText,
            isFirstSliceOfSection: true,
            columns: 1,
          });
          currentHeight += phHeight + 8;
          continue;
        }

        // Measure Latin "Use it in a sentence" block if present
        let latinSentenceObj: {
          latin: string;
          english: string;
          reference?: string;
          formatted?: string;
          wrappedRows: string[];
          height: number;
        } | null = null;

        if (group.latinSentence && group.latinSentence.latin) {
          const wrappedRows = wrapSentenceToRows(group.latinSentence.latin, style, size);
          const sLinesCount = Math.max(1, reps) + (showBlank ? 1 : 0);
          const sLineH = sLinesCount * baseCfg.rowHeight + Math.max(0, sLinesCount - 1) * 2;
          const sHeight = wrappedRows.length * sLineH + 8;
          const modelTextH = showModel ? Math.max(1, Math.ceil(group.latinSentence.latin.length / 65)) * 20 + 4 : 0;
          const totalSentBlockH = 20 + modelTextH + sHeight + 16; // 20px label + compact model + sentence rows + 16px translation note line beneath
          latinSentenceObj = {
            latin: group.latinSentence.latin,
            english: group.latinSentence.english,
            reference: group.latinSentence.reference,
            formatted: group.latinSentence.formatted || group.latinSentence.latin,
            wrappedRows,
            height: totalSentBlockH,
          };
        }

        const headerHeight = 22;
        const notesHeight = group.noteItems.length > 0 ? group.noteItems.length * 16 : 0;

        // Grouping happens first; only then does the column algorithm run on the whole group
        // (measure widest item in model font, 3 columns if it fits a third of usable width, 2 if half, else full width, half-inch gutters)
        // Review packet items always flow through determineColumnsForGroup dynamically per week group.
        const groupCols = determineColumnsForGroup(
          group.memoryWorkItems.map((m) => m.text),
          style,
          size
        );

        if (groupCols > 1) {
          const sectionTexts = group.memoryWorkItems.map((m) => m.text);
          const colCfg = getColumnGuideConfig(baseCfg, groupCols, sectionTexts, style);
          const colModelH = showModel ? 18 : 0;
          const secItemRowHeight = calcItemUnitHeight(colCfg.rowHeight) + colModelH + 8;

          // Chunk lines into rows of groupCols
          const chunkedRows: ColumnGroup[] = [];
          for (let i = 0; i < group.memoryWorkItems.length; i += groupCols) {
            const chunk = group.memoryWorkItems.slice(i, i + groupCols);
            chunkedRows.push({
              columns: groupCols,
              colCfg,
              items: chunk.map((it) => ({
                text: it.text,
                type: 'memoryWork',
                promptHeader: it.promptHeader,
                label: it.label || it.promptHeader,
                latinInfo: group.subject === 'latin' ? findLatinInfo(it.text) : undefined,
              })),
            });
          }

          // ORPHAN HEADER RULE:
          // A week header is NEVER stranded alone at the bottom of a page;
          // if fewer than two item rows fit under it, move the header to the next page.
          const minRequiredRows = chunkedRows.length >= 2 ? 2 : chunkedRows.length;
          const minRowsHeight =
            minRequiredRows > 0
              ? minRequiredRows * secItemRowHeight
              : latinSentenceObj
              ? latinSentenceObj.height
              : 0;
          const neededToStartWeek = headerHeight + notesHeight + minRowsHeight;

          if (currentPageSections.length > 0 && currentHeight + neededToStartWeek > maxPageHeight) {
            finishPage();
          }

          let isFirstSlice = true;
          let remainingRows = [...chunkedRows];

          while (remainingRows.length > 0) {
            const overhead = isFirstSlice ? (headerHeight + notesHeight) : headerHeight;
            const available = maxPageHeight - currentHeight - overhead;
            let countToTake = Math.floor(available / secItemRowHeight);

            if (countToTake <= 0 && currentPageSections.length > 0) {
              finishPage();
              isFirstSlice = false; // Next slice starts at top of new page as continuation
              continue;
            }

            countToTake = Math.max(1, Math.min(remainingRows.length, countToTake));
            const takeRows = remainingRows.slice(0, countToTake);
            remainingRows = remainingRows.slice(countToTake);

            currentPageSections.push({
              id: `${group.id}-slice-${packetPages.length}-${currentPageSections.length}`,
              week: group.week,
              subject: group.subject,
              heading: group.heading,
              prompt: isFirstSlice ? group.prompt : undefined,
              isPlaceholder: false,
              isFirstSliceOfSection: isFirstSlice,
              columns: groupCols,
              columnGroups: takeRows,
              notes: isFirstSlice && group.noteItems.length > 0 ? group.noteItems : undefined,
            });

            currentHeight += overhead + takeRows.length * secItemRowHeight;
            isFirstSlice = false;
          }
        } else {
          // 1 column (wrapped sentences)
          // If no memory work items, render only the notes
          if (group.memoryWorkItems.length === 0 && group.noteItems.length > 0) {
            const neededTotal = headerHeight + notesHeight;
            if (currentPageSections.length > 0 && currentHeight + neededTotal > maxPageHeight) {
              finishPage();
            }
            currentPageSections.push({
              id: `${group.id}-notes-only-${packetPages.length}-${currentPageSections.length}`,
              week: group.week,
              subject: group.subject,
              heading: group.heading,
              isPlaceholder: false,
              isFirstSliceOfSection: true,
              columns: 1,
              notes: group.noteItems,
            });
            currentHeight += neededTotal;
          } else if (group.memoryWorkItems.length > 0) {
            const itemsWithMeta = group.memoryWorkItems.map((item) => {
              const wrappedRows = wrapSentenceToRows(item.text, style, size);
              const guideH = wrappedRows.length * calcItemUnitHeight(baseCfg.rowHeight) + 8;
              const modelH = showModel ? Math.max(1, Math.ceil(item.text.length / 65)) * 20 + 4 : 0;
              let h = guideH + modelH;
              const itemLabel = item.label || item.promptHeader;
              if (itemLabel) h += 18;
              const fnNotes = showScienceNotes !== false ? item.functionNotes : undefined;
              if (fnNotes && fnNotes.length > 0) h += fnNotes.length * 13 + 4;
              return {
                original: item.text,
                wrappedRows,
                type: 'memoryWork' as const,
                promptHeader: itemLabel,
                label: itemLabel,
                functionNotes: fnNotes,
                height: h,
              };
            });

            // Orphan header rule:
            const minRequiredCount = itemsWithMeta.length >= 2 ? 2 : itemsWithMeta.length;
            let minRowsHeight = 0;
            for (let i = 0; i < minRequiredCount; i++) {
              minRowsHeight += itemsWithMeta[i].height;
            }
            if (minRequiredCount === 0 && latinSentenceObj) {
              minRowsHeight = latinSentenceObj.height;
            }

            const neededToStartWeek = headerHeight + notesHeight + minRowsHeight;
            if (currentPageSections.length > 0 && currentHeight + neededToStartWeek > maxPageHeight) {
              finishPage();
            }

            let isFirstSlice = true;
            let remainingItems = [...itemsWithMeta];

            while (remainingItems.length > 0) {
              const overhead = isFirstSlice ? (headerHeight + notesHeight) : headerHeight;
              let available = maxPageHeight - currentHeight - overhead;

              // Collect ALL items that fit on the current page into ONE slice!
              const takeItems: typeof itemsWithMeta = [];
              let takenHeight = 0;

              for (const it of remainingItems) {
                if (takenHeight + it.height <= available || (takeItems.length === 0 && currentPageSections.length === 0)) {
                  takeItems.push(it);
                  takenHeight += it.height;
                } else {
                  break;
                }
              }

              if (takeItems.length === 0 && currentPageSections.length > 0) {
                finishPage();
                isFirstSlice = false;
                continue;
              }

              if (takeItems.length === 0 && remainingItems.length > 0) {
                takeItems.push(remainingItems[0]);
                takenHeight += remainingItems[0].height;
              }

              remainingItems = remainingItems.slice(takeItems.length);

              currentPageSections.push({
                id: `${group.id}-l-${packetPages.length}-${currentPageSections.length}`,
                week: group.week,
                subject: group.subject,
                heading: group.heading,
                prompt: isFirstSlice ? group.prompt : undefined,
                isPlaceholder: false,
                isFirstSliceOfSection: isFirstSlice,
                columns: 1,
                sentenceLines: takeItems.map((it) => ({
                  original: it.original,
                  wrappedRows: it.wrappedRows,
                  type: 'memoryWork',
                  promptHeader: it.promptHeader,
                  label: it.label,
                  functionNotes: it.functionNotes,
                })),
                notes: isFirstSlice && group.noteItems.length > 0 ? group.noteItems : undefined,
              });

              currentHeight += overhead + takenHeight;
              isFirstSlice = false;
            }
          }
        }

        // Place Latin "Use it in a sentence" block at the end of the week's list
        if (latinSentenceObj) {
          if (currentPageSections.length > 0 && currentHeight + latinSentenceObj.height > maxPageHeight) {
            finishPage();
          }

          const lastSlice = currentPageSections[currentPageSections.length - 1];
          if (lastSlice && lastSlice.week === group.week && lastSlice.subject === group.subject) {
            lastSlice.latinSentence = {
              latin: latinSentenceObj.latin,
              english: latinSentenceObj.english,
              reference: latinSentenceObj.reference,
              formatted: latinSentenceObj.formatted,
              wrappedRows: latinSentenceObj.wrappedRows,
            };
          } else {
            currentPageSections.push({
              id: `${group.id}-sent-${packetPages.length}-${currentPageSections.length}`,
              week: group.week,
              subject: group.subject,
              heading: group.heading,
              isPlaceholder: false,
              isFirstSliceOfSection: false,
              columns: 1,
              latinSentence: {
                latin: latinSentenceObj.latin,
                english: latinSentenceObj.english,
                reference: latinSentenceObj.reference,
                formatted: latinSentenceObj.formatted,
                wrappedRows: latinSentenceObj.wrappedRows,
              },
            });
          }
          currentHeight += latinSentenceObj.height;
        }

        // Inter-week spacing within same subject (no forced page break!)
        currentHeight += 12;
      }

      finishPage();

      const total = packetPages.length || 1;
      packetPages.forEach((p) => (p.totalPages = total));
      return packetPages;
    }

    // 2. Standard Mode: Universal prompt/answer rule
    let baseItems: WorksheetItem[] = (
      items && items.length > 0
        ? items
        : rawSentences.map((s): WorksheetItem => {
            const isNote = /^(note:|tip:|instructions?:|\[note\])/i.test(s);
            return { text: s, type: isNote ? 'note' : 'memoryWork' };
          })
    );

    // If isMathWorksheet or mathMode === 'trace-and-answer' or fillInTheBlankMath:
    // transform item TEXT only, BEFORE grouping
    if (isMathWorksheet || mathMode === 'trace-and-answer' || fillInTheBlankMath) {
      baseItems = baseItems.map((it) => {
        let newText = it.text;
        if (mathMode === 'trace-and-answer' || fillInTheBlankMath) {
          if (/=\s*\d+/.test(newText)) {
            newText = newText.replace(/=\s*\d+.*$/, '= ___');
          }
        }
        return { ...it, text: newText };
      });
    }

    const normalizedItems: WorksheetItem[] = normalizeWorksheetItems(baseItems);

    if (normalizedItems.length === 0) {
      return [
        {
          pageNumber: 1,
          totalPages: 1,
          type: 'standard',
          columnGroups: [],
        },
      ];
    }

    const memoryWorkList = normalizedItems.filter(
      (it) => it.type === 'memoryWork' && Boolean(it.text && it.text.trim().length > 0)
    );
    const noteList = normalizedItems.filter((it) => it.type === 'note').map((it) => ({ text: it.text }));

    const standardCols = forceSingleColumn
      ? 1
      : determineColumnsForGroup(
          memoryWorkList.map((m) => m.text),
          style,
          size
        );
    const standardPages: StandardPageData[] = [];

    // If there is NO memory work (e.g. placeholder packs or note-only sheets), render notes only
    if (memoryWorkList.length === 0) {
      return [
        {
          pageNumber: 1,
          totalPages: 1,
          type: 'standard',
          notes: noteList,
        },
      ];
    }

    if (standardCols > 1) {
      const memoryTexts = memoryWorkList.map((m) => m.text);
      const colCfg = getColumnGuideConfig(baseCfg, standardCols, memoryTexts, style);
      const colModelH = showModel ? 18 : 0;
      const secItemRowHeight = calcItemUnitHeight(colCfg.rowHeight) + colModelH + 8;

      // Multi-column short memory work items (e.g. math facts, states and capitals, latin pairs)
      const allRows: ColumnGroup[] = [];
      for (let i = 0; i < memoryWorkList.length; i += standardCols) {
        const slice = memoryWorkList.slice(i, i + standardCols);
        allRows.push({
          columns: standardCols,
          colCfg,
          items: slice.map((item) => ({
            text: item.text,
            type: 'memoryWork',
            promptHeader: item.promptHeader,
            label: item.label || item.promptHeader,
            latinInfo: isLatinWorksheet ? findLatinInfo(item.text) : null,
          })),
        });
      }

      let currentRows: ColumnGroup[] = [];
      let currentHeight = 0;
      let maxPageHeight = PAGE_1_CONTENT_HEIGHT;
      let isFirstPage = true;

      for (const row of allRows) {
        if (currentHeight + secItemRowHeight > maxPageHeight && currentRows.length > 0) {
          standardPages.push({
            pageNumber: standardPages.length + 1,
            totalPages: 1,
            type: 'standard',
            columnGroups: currentRows,
            notes: isFirstPage ? noteList : undefined,
          });
          currentRows = [];
          currentHeight = 0;
          maxPageHeight = PAGE_2_CONTENT_HEIGHT;
          isFirstPage = false;
        }

        currentRows.push(row);
        currentHeight += secItemRowHeight;
      }

      if (currentRows.length > 0) {
        standardPages.push({
          pageNumber: standardPages.length + 1,
          totalPages: 1,
          type: 'standard',
          columnGroups: currentRows,
          notes: isFirstPage ? noteList : undefined,
        });
      }
    } else {
      // 1 column with wrapping memory work sentences
      let currentSentences: StandardSentenceItem[] = [];
      let currentHeight = 0;
      let maxPageHeight = PAGE_1_CONTENT_HEIGHT;
      let isFirstPage = true;

      for (const item of memoryWorkList) {
        const wrappedRows = wrapSentenceToRows(item.text, style, size);
        const latinInfo = isLatinWorksheet ? findLatinInfo(item.text) : null;
        const guideH = wrappedRows.length * calcItemUnitHeight(baseCfg.rowHeight) + 8;
        const modelH = showModel ? Math.max(1, Math.ceil(item.text.length / 65)) * 20 + 4 : 0;
        let sHeight = guideH + modelH;
        const itemLabel = item.label || item.promptHeader;
        if (itemLabel) {
          sHeight += 18;
        }
        const stdFnNotes = showScienceNotes !== false ? item.functionNotes : undefined;
        if (stdFnNotes && stdFnNotes.length > 0) {
          sHeight += stdFnNotes.length * 13 + 4;
        }

        if (currentHeight + sHeight > maxPageHeight && currentSentences.length > 0) {
          standardPages.push({
            pageNumber: standardPages.length + 1,
            totalPages: 1,
            type: 'standard',
            sentenceItems: currentSentences,
            notes: isFirstPage ? noteList : undefined,
          });
          currentSentences = [];
          currentHeight = 0;
          maxPageHeight = PAGE_2_CONTENT_HEIGHT;
          isFirstPage = false;
        }

        currentSentences.push({
          original: item.text,
          wrappedRows,
          type: 'memoryWork',
          promptHeader: itemLabel,
          label: itemLabel,
          latinInfo,
          functionNotes: stdFnNotes,
        });
        currentHeight += sHeight;
      }

      if (currentSentences.length > 0) {
        standardPages.push({
          pageNumber: standardPages.length + 1,
          totalPages: 1,
          type: 'standard',
          sentenceItems: currentSentences,
          notes: isFirstPage ? noteList : undefined,
        });
      }
    }

    const total = standardPages.length || 1;
    standardPages.forEach((p) => (p.totalPages = total));
    return standardPages;
  }, [
    items,
    rawSentences,
    packetSections,
    style,
    size,
    reps,
    showModel,
    showBlank,
    baseCfg,
    guideLinesPerItem,
    isLatinWorksheet,
    findLatinInfo,
    forceSingleColumn,
    mathMode,
    fillInTheBlankMath,
    isMathWorksheet,
  ]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Print Blocked Friendly Warning Banner */}
      {printBlockedNotice && (
        <div className="w-full max-w-[816px] mb-4 bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start justify-between shadow-xs no-print text-amber-900 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Printing Notice</span>
              <span>{printBlockedNotice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onDismissBlockedNotice}
            className="text-amber-800 hover:text-amber-950 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Pages Container: EXACT US LETTER SHEETS (816px x 1056px at 96 DPI = 8.5in x 11in) */}
      <div className="w-full flex flex-col items-center gap-6 print:gap-0">
        {pages.map((page, pageIndex) => {
          return (
            <div
              key={pageIndex}
              ref={(el) => {
                pageRefs.current[pageIndex] = el;
              }}
              className="worksheet-page-sheet bg-white text-[#2E2B26] shadow-xl w-[816px] h-[1056px] min-h-[1056px] max-h-[1056px] flex flex-col justify-between border border-[#D5DED8] rounded-lg print:rounded-none print:border-none print:shadow-none print:m-0 overflow-hidden"
              style={{
                width: '816px',
                height: '1056px',
                minHeight: '1056px',
                maxHeight: '1056px',
                padding: '24px 28px 20px 28px',
                boxSizing: 'border-box',
              }}
            >
              {/* Top Section */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Page Header: One Compact Band */}
                {pageIndex === 0 ? (
                  <div className="flex items-center justify-between border-b border-[#2E2B26] pb-1.5 mb-2.5 text-xs">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-base font-bold tracking-tight text-[#2E2B26]">
                        {title || 'Handwriting Practice'}
                      </h2>
                      <div className="flex items-center text-[10px] text-[#5C6B62] gap-1.5">
                        <span className="capitalize">{style} Style</span>
                        <span>•</span>
                        <span className="capitalize">{size}</span>
                        {packetSections && (
                          <>
                            <span>•</span>
                            <span className="text-[#2F5D50] font-semibold">Review Packet</span>
                          </>
                        )}
                      </div>
                    </div>
                    {showHeader && (
                      <div className="text-xs font-medium text-[#2E2B26] space-x-3 shrink-0">
                        <span>Name: ____________________</span>
                        <span>Date: ________</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-between items-center border-b border-[#D5DED8] pb-1 mb-2 text-xs text-[#5C6B62]">
                    <span className="font-semibold text-[#2E2B26]">
                      {title || 'Handwriting Practice'} <span className="font-normal text-[11px]">(Cont.)</span>
                    </span>
                    <div className="flex items-center gap-3">
                      {showHeader && <span>Name: ________________</span>}
                      <span className="font-medium text-[#44514A] text-[11px]">
                        Page {pageIndex + 1} of {pages.length}
                      </span>
                    </div>
                  </div>
                )}

                {/* Page Content: Review Packet Mode */}
                {page.type === 'packet' && (
                  <div className="space-y-3">
                    {page.sections.map((secSlice) => {
                      const subMeta = SUBJECT_METAS[secSlice.subject as SubjectKey];

                      return (
                        <div key={secSlice.id} className="space-y-1">
                          {/* Section Header: One Small Bold Text Line with NO guide lines and NO trace row */}
                          {secSlice.isFirstSliceOfSection ? (
                            <div className="text-xs font-bold text-[#2E2B26] pt-0.5 pb-0.5 tracking-tight flex items-center gap-1.5">
                              <span>Week {secSlice.week} {subMeta?.label || 'Subject'}</span>
                              {secSlice.heading &&
                               secSlice.subject !== 'history' &&
                               !isPurePrompt(secSlice.heading) &&
                               secSlice.heading !== `Week ${secSlice.week}: ${subMeta?.label}` &&
                               !secSlice.heading.toLowerCase().includes('upload this guide') && (
                                <span className="font-normal text-[#5C6B62]">— {secSlice.heading}</span>
                              )}
                            </div>
                          ) : (
                            <div className="text-[11px] font-semibold text-[#5C6B62] pt-0.5 pb-0.5 tracking-tight flex items-center gap-1.5">
                              <span>Week {secSlice.week} {subMeta?.label || 'Subject'}</span>
                              <span className="text-[10px] text-[#7C8880]">(Cont.)</span>
                            </div>
                          )}

                          {/* Plain text notes: rendered as small gray text, NEVER on guide lines */}
                          {secSlice.notes && secSlice.notes.length > 0 && (
                            <div className="space-y-0.5 py-0.5">
                              {secSlice.notes.map((n, nIdx) => (
                                <p key={nIdx} className="text-[11px] text-[#5C6B62] italic font-normal">
                                  {n.text}
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Section Prompt line: standard small untraced prompt line */}
                          {secSlice.prompt && !secSlice.isPlaceholder && (
                            <div
                              className="pt-0.5 pb-1 text-[11px] font-bold tracking-tight"
                              style={{ color: subMeta?.color || '#1C3B32' }}
                            >
                              {secSlice.prompt}
                            </div>
                          )}

                          {/* Placeholder */}
                          {secSlice.isPlaceholder ? (
                            <div className="p-2.5 bg-amber-50/90 border border-dashed border-amber-300 rounded-md text-amber-900 text-xs flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span className="font-bold">{secSlice.placeholderText}</span>
                              </div>
                              <span className="text-[10px] text-amber-700 italic">
                                Guide photo not yet uploaded — never guessed
                              </span>
                            </div>
                          ) : secSlice.columns > 1 && secSlice.columnGroups ? (
                            /* Multi-Column Short Items for Section */
                            <div className="space-y-2">
                              {secSlice.columnGroups.map((group, grpIdx) => {
                                const colCfg = group.colCfg || getColumnGuideConfig(baseCfg, group.columns);
                                return (
                                  <div
                                    key={grpIdx}
                                    className={`grid ${
                                      group.columns === 3
                                        ? 'grid-cols-3 gap-x-12 gap-y-2'
                                        : 'grid-cols-2 gap-x-12 gap-y-2'
                                    }`}
                                    style={{ columnGap: '48px' }}
                                  >
                                    {group.items.map((item, itemIdx) => {
                                      const itemLabel = item.label || item.promptHeader;
                                      return (
                                        <div key={itemIdx} className="space-y-0">
                                          {itemLabel && (
                                            <div className="mb-0.5 flex items-center gap-2">
                                              <span className="text-[11px] font-bold text-[#A93E2C] tracking-tight">
                                                {itemLabel}
                                              </span>
                                            </div>
                                          )}
                                          {/* Compact Model text if showModel */}
                                          {showModel && (
                                            <div
                                              className="font-bold text-[#2E2B26] mb-0.5 leading-snug truncate"
                                              style={{
                                                fontFamily: colCfg.fontFamily,
                                                fontSize: `${Math.max(10, Math.round(colCfg.fontSize * 0.6))}px`,
                                              }}
                                            >
                                              {item.text}
                                            </div>
                                          )}
                                          {/* Trace lines: small fixed 2px gap */}
                                          {Array.from({ length: reps }).map((_, rIdx) => (
                                            <div key={rIdx} className={rIdx > 0 ? "mt-0.5" : ""}>
                                              <GuideLineSvgRow
                                                text={item.text}
                                                mode={mathMode === 'diy' && secSlice.subject === 'math' && showBlank ? 'blank' : 'trace'}
                                                cfg={colCfg}
                                                style={style}
                                                traceStyle={traceStyle}
                                              />
                                            </div>
                                          ))}
                                          {/* Blank line: ONLY when showBlank is checked */}
                                          {showBlank && (
                                            <div className="mt-0.5">
                                              <GuideLineSvgRow
                                                text=""
                                                mode="blank"
                                                cfg={colCfg}
                                                style={style}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            /* 1 Column Sentence Lines */
                            <div className="space-y-2">
                              {secSlice.sentenceLines?.map((sLine, slIdx) => {
                                const lineLabel = sLine.label || sLine.promptHeader;
                                const originalText = sLine.original || sLine.wrappedRows.join(' ');
                                return (
                                  <div key={slIdx} className="space-y-0">
                                    {lineLabel && (
                                      <div className="mb-0.5 flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-[#A93E2C] tracking-tight">
                                          {lineLabel}
                                        </span>
                                      </div>
                                    )}
                                    {/* Science "What it does" notes (above the tracing) */}
                                    {sLine.functionNotes && sLine.functionNotes.length > 0 && (
                                      <div className="mb-1">
                                        {sLine.functionNotes.map((fn, fnIdx) => (
                                          <div key={fnIdx} className="text-[10px] italic leading-snug text-[#5C6B62]">
                                            <span className="font-semibold not-italic text-[#1C3B32]">{fn.term}:</span> {fn.note}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {/* Compact Model Text (NOT on guide lines) */}
                                    {showModel && (sLine.original || sLine.wrappedRows.length > 0) && (
                                      <p
                                        className="font-bold text-[#2E2B26] mb-1 leading-snug"
                                        style={{
                                          fontFamily: baseCfg.fontFamily,
                                          fontSize: `${Math.max(12, Math.round(baseCfg.fontSize * 0.6))}px`,
                                        }}
                                      >
                                        {originalText}
                                      </p>
                                    )}
                                    {/* Dotted Trace rows on guide lines at full size */}
                                    {Array.from({ length: reps }).map((_, repIndex) => (
                                      <div
                                        key={`rep-${slIdx}-${repIndex}`}
                                        className={repIndex > 0 ? "space-y-0.5 mt-0.5" : "space-y-0.5"}
                                      >
                                        {sLine.wrappedRows.map((rowText, rIndex) => (
                                          <GuideLineSvgRow
                                            key={`trace-${slIdx}-${repIndex}-${rIndex}`}
                                            text={rowText}
                                            mode="trace"
                                            cfg={baseCfg}
                                            style={style}
                                            traceStyle={traceStyle}
                                          />
                                        ))}
                                      </div>
                                    ))}
                                    {/* Blank writing line: ONLY when showBlank is true */}
                                    {showBlank && (
                                      <div className="space-y-0.5 mt-0.5">
                                        {sLine.wrappedRows.map((_, rIndex) => (
                                          <GuideLineSvgRow
                                            key={`blank-${slIdx}-${rIndex}`}
                                            text=""
                                            mode="blank"
                                            cfg={baseCfg}
                                            style={style}
                                          />
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {/* "Use it in a sentence:" Block for Latin */}
                          {secSlice.latinSentence && (() => {
                            const latSent = secSlice.latinSentence;
                            return (
                              <div className="pt-2 pb-0.5 space-y-0.5">
                                {/* Plain text label, NO guide lines */}
                                <div className="text-[11px] font-bold text-[#1C3B32] tracking-tight">
                                  Use it in a sentence:
                                </div>

                                <div className="space-y-0">
                                  {/* Compact Model text */}
                                  {showModel && latSent.latin && (
                                    <p
                                      className="font-bold text-[#2E2B26] mb-1 leading-snug"
                                      style={{
                                        fontFamily: baseCfg.fontFamily,
                                        fontSize: `${Math.max(12, Math.round(baseCfg.fontSize * 0.6))}px`,
                                      }}
                                    >
                                      {latSent.latin}
                                    </p>
                                  )}

                                  {/* Trace lines (at least 1 trace row per reps) */}
                                  {Array.from({ length: Math.max(1, reps) }).map((_, repIndex) => (
                                    <div
                                      key={`latin-sent-trace-${repIndex}`}
                                      className={repIndex > 0 ? "space-y-0.5 mt-0.5" : "space-y-0.5"}
                                    >
                                      {latSent.wrappedRows.map((rowText, rIndex) => (
                                        <GuideLineSvgRow
                                          key={`latin-sent-trace-${repIndex}-${rIndex}`}
                                          text={rowText}
                                          mode="trace"
                                          cfg={baseCfg}
                                          style={style}
                                          traceStyle={traceStyle}
                                        />
                                      ))}
                                    </div>
                                  ))}

                                  {/* Blank writing line only if showBlank is checked */}
                                  {showBlank && (
                                    <div className="space-y-0.5 mt-0.5">
                                      {latSent.wrappedRows.map((_, rIndex) => (
                                        <GuideLineSvgRow
                                          key={`latin-sent-blank-${rIndex}`}
                                          text=""
                                          mode="blank"
                                          cfg={baseCfg}
                                          style={style}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* English translation as a small note line beneath, labeled with its reference (e.g. John 1:2) */}
                                <div className="text-[11px] text-[#44514A] italic pt-0.5">
                                  <span className="font-semibold text-[#1C3B32]">
                                    {latSent.reference ? `${latSent.reference}: ` : ''}
                                  </span>
                                  <span>{latSent.english}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Page Content: Standard Mode */}
                {page.type === 'standard' && (
                  <div>
                    {/* Notes */}
                    {page.notes && page.notes.length > 0 && (
                      <div className="space-y-0.5 mb-2 pb-1.5 border-b border-[#E4EDE7]">
                        {page.notes.map((note, nIdx) => (
                          <p key={nIdx} className="text-[11px] text-[#5C6B62] italic font-normal">
                            {note.text}
                          </p>
                        ))}
                      </div>
                    )}

                    {page.columnGroups && page.columnGroups.length > 0 ? (
                      /* Multi-Column Short Memory Work Items */
                      <div className="space-y-2">
                        {page.columnGroups.map((group, grpIdx) => {
                          const colCfg = group.colCfg || getColumnGuideConfig(baseCfg, group.columns);
                          return (
                            <div
                              key={grpIdx}
                              className={`grid ${
                                group.columns === 3
                                  ? 'grid-cols-3 gap-x-12 gap-y-2'
                                  : 'grid-cols-2 gap-x-12 gap-y-2'
                              }`}
                              style={{ columnGap: '48px' }}
                            >
                              {group.items.map((item, itemIdx) => {
                                const itemLabel = item.label || item.promptHeader;
                                return (
                                  <div key={itemIdx} className="space-y-0">
                                    {itemLabel && (
                                      <div className="mb-0.5 flex items-center gap-2">
                                        <span className="text-[11px] font-bold text-[#A93E2C] tracking-tight">
                                          {itemLabel}
                                        </span>
                                      </div>
                                    )}

                                    {/* Latin meaning note if mode is 'note' */}
                                    {isLatinWorksheet && latinMeaningMode === 'note' && item.latinInfo?.meaning && (
                                      <div className="text-[10px] text-[#44514A] italic truncate mb-0.5">
                                        <span className="font-semibold text-[#1C3B32]">Meaning:</span> {item.latinInfo.meaning}
                                      </div>
                                    )}

                                    {/* Compact model text */}
                                    {showModel && (
                                      <div
                                        className="font-bold text-[#2E2B26] mb-0.5 leading-snug truncate"
                                        style={{
                                          fontFamily: colCfg.fontFamily,
                                          fontSize: `${Math.max(10, Math.round(colCfg.fontSize * 0.6))}px`,
                                        }}
                                      >
                                        {item.text}
                                      </div>
                                    )}

                                    {/* Dotted trace lines: small fixed 2px gap */}
                                    {Array.from({ length: reps }).map((_, rIdx) => (
                                      <div key={rIdx} className={rIdx > 0 ? "mt-0.5" : ""}>
                                        <GuideLineSvgRow
                                          key={rIdx}
                                          text={item.text}
                                          mode={isMathWorksheet && mathMode === 'diy' && showBlank ? 'blank' : 'trace'}
                                          cfg={colCfg}
                                          style={style}
                                          traceStyle={traceStyle}
                                        />
                                      </div>
                                    ))}

                                    {/* Blank writing line: ONLY when showBlank is checked */}
                                    {showBlank && (
                                      <div className="mt-0.5">
                                        <GuideLineSvgRow
                                          text=""
                                          mode="blank"
                                          cfg={colCfg}
                                          style={style}
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ) : page.sentenceItems && page.sentenceItems.length > 0 ? (
                      /* 1 Column Sentence Lines with wrapping: space between items cut to half (~8px) */
                      <div className="space-y-2">
                        {page.sentenceItems.map((sItem, sIndex) => {
                          const itemLabel = sItem.label || sItem.promptHeader;
                          return (
                            <div key={sIndex} className="space-y-0">
                              {/* Section Label Line: e.g. "Amendment 1" or "Tell me about Columbus." */}
                              {itemLabel && (
                                <div className="mb-0.5 flex items-center gap-2">
                                  {itemLabel.includes('AI practice lines') ? (
                                    <span className="inline-block bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-2xs">
                                      AI practice lines - check against your guide
                                    </span>
                                  ) : (
                                    <span className="text-[11px] sm:text-xs font-bold text-[#A93E2C] tracking-tight">
                                      {itemLabel}
                                    </span>
                                  )}
                                </div>
                              )}

                            {/* Science "What it does" notes (above the tracing) */}
                            {sItem.functionNotes && sItem.functionNotes.length > 0 && (
                              <div className="mb-1">
                                {sItem.functionNotes.map((fn, fnIdx) => (
                                  <div key={fnIdx} className="text-[10px] italic leading-snug text-[#5C6B62]">
                                    <span className="font-semibold not-italic text-[#1C3B32]">{fn.term}:</span> {fn.note}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Latin Meaning Note */}
                            {isLatinWorksheet && latinMeaningMode === 'note' && sItem.latinInfo?.meaning && (
                              <div className="text-[11px] text-[#44514A] italic flex items-center gap-1.5 pl-1 mb-0.5">
                                <span className="font-semibold text-[#1C3B32]">Meaning:</span>
                                <span>{sItem.latinInfo.meaning}</span>
                              </div>
                            )}

                            {/* Compact Model Text (NOT on guide lines) */}
                            {showModel && (sItem.original || sItem.wrappedRows.length > 0) && (
                              <p
                                className="font-bold text-[#2E2B26] mb-1 leading-snug"
                                style={{
                                  fontFamily: baseCfg.fontFamily,
                                  fontSize: `${Math.max(12, Math.round(baseCfg.fontSize * 0.6))}px`,
                                }}
                              >
                                {sItem.original || sItem.wrappedRows.join(' ')}
                              </p>
                            )}

                            {/* Dotted Trace Lines: small fixed 2px gap */}
                            {Array.from({ length: reps }).map((_, repIndex) => (
                              <div
                                key={`rep-${sIndex}-${repIndex}`}
                                className={repIndex > 0 ? "space-y-0.5 mt-0.5" : "space-y-0.5"}
                              >
                                {sItem.wrappedRows.map((rowText, rIndex) => (
                                  <GuideLineSvgRow
                                    key={`trace-${sIndex}-${repIndex}-${rIndex}`}
                                    text={rowText}
                                    mode={isMathWorksheet && mathMode === 'diy' && showBlank ? 'blank' : 'trace'}
                                    cfg={baseCfg}
                                    style={style}
                                    traceStyle={traceStyle}
                                  />
                                ))}
                              </div>
                            ))}

                            {/* Blank Practice Lines: ONLY rendered when showBlank is true */}
                            {showBlank && (
                              <div className="space-y-0.5 mt-0.5">
                                {sItem.wrappedRows.map((_, rIndex) => (
                                  <GuideLineSvgRow
                                    key={`blank-${sIndex}-${rIndex}`}
                                    text=""
                                    mode="blank"
                                    cfg={baseCfg}
                                    style={style}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Footer Credit Line on EVERY Page */}
              <div className="pt-2 pb-1 text-center text-[10px] text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-2">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
