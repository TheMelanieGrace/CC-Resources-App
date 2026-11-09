import { CYCLE_3_HISTORY_WEEKS } from './reviewPacketData';
import { WorksheetItem } from '../types';
import { parseLabeledItem } from '../utils/labelHelper';

/**
 * Bill of Rights Data Provider
 *
 * STRICT DATA RULE:
 * This section pulls ONLY from the already-verified Cycle 3 Week 24 History data
 * in reviewPacketData (the ten-line Bill of Rights memory work).
 * Do not generate, expand, paraphrase, or add any amendment text of your own.
 * If that data is missing, show the standard "upload this guide page" placeholder instead.
 */

export interface BillOfRightsSelection {
  items: WorksheetItem[];
  lines: string[];
  isPlaceholder: boolean;
  heading: string;
  start: number;
  end: number;
}

/**
 * Returns raw verified lines from Cycle 3 Week 24 History data.
 * If data is missing, returns null.
 */
export function getVerifiedWeek24HistoryLines(): string[] | null {
  const week24 = CYCLE_3_HISTORY_WEEKS?.[24];
  if (!week24 || !Array.isArray(week24.lines) || week24.lines.length === 0) {
    return null;
  }
  return week24.lines;
}

/**
 * Returns the Bill of Rights worksheet selection for a given amendment range (1–10).
 * Word-for-word from verified Cycle 3 Week 24 History data.
 */
export function getBillOfRightsSelection(start = 1, end = 10): BillOfRightsSelection {
  const rawLines = getVerifiedWeek24HistoryLines();

  if (!rawLines) {
    // Standard placeholder if guide page data is missing
    const placeholderText = 'Week 24: upload this guide page';
    return {
      items: [{ text: placeholderText, type: 'note' }],
      lines: [placeholderText],
      isPlaceholder: true,
      heading: 'The Bill of Rights: upload this guide page',
      start: 1,
      end: 10,
    };
  }

  const s = Math.max(1, Math.min(start, 10));
  const e = Math.max(s, Math.min(end, 10));

  // Word-for-word slice from CYCLE_3_HISTORY_WEEKS[24].lines
  const slice = rawLines.slice(s - 1, e);

  const items: WorksheetItem[] = slice.map((line) => {
    const parsed = parseLabeledItem(line);
    const prompt = parsed.prompt || parsed.label;
    return {
      text: parsed.answer || parsed.content,
      label: prompt,
      promptHeader: prompt,
      prompt: prompt,
      type: 'memoryWork' as const,
    };
  });

  const heading =
    s === 1 && e === 10
      ? 'The Bill of Rights (Amendments 1–10)'
      : `The Bill of Rights (Amendments ${s}–${e})`;

  return {
    items,
    lines: items.map((it) => it.text),
    isPlaceholder: false,
    heading,
    start: s,
    end: e,
  };
}
