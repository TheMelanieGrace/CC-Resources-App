import { LetterSize, LetterStyle } from '../types';

export interface GuideSizeConfig {
  svgWidth: number;
  rowHeight: number;
  topY: number;      // Solid blue top line = capital & tall ascender height
  midY: number;      // Dashed blue middle line = EXACT halfway point (50%) between top & baseline
  baseY: number;     // Solid red baseline = where all letter bases rest
  fontSize: number;  // Calibrated so capitals span exactly from top line to baseline
  startX: number;    // Left margin of text
  maxLineWidth: number; // Drawn line minus safety margin (wrapping width)
  fontFamily: string;
  descenderDepth: number; // Measured depth below red baseline
}

// Measured metrics for print font "Josefin Sans":
// unitsPerEm: 1000
// Cap height (A, H, P, b, d, l): ~725 units average
// Lowercase height (a, c, e, m, n, o, r, s, u, v, w, x, z): ~400 units (natural ~50% ratio)
// Descenders (g, j, p, q, y): ~190 units below baseline
const JOSEFIN_CAP_UNITS = 725;

// Measured metrics for cursive font "Playwrite US Trad":
// unitsPerEm: 1000
// Cap height: 1015 units
const CURSIVE_CAP_UNITS = 1015;

/**
 * Returns exact guide geometry where:
 * 1. The solid red line is the BASELINE (letters sit on it).
 * 2. The solid blue TOP line marks capital height.
 * 3. The dashed blue MIDDLE line is at the EXACT halfway point between top line & baseline (measured x-height).
 * 4. Capital letters span from top line to baseline, and lowercase letters land on the dashed line.
 * 5. Tight row heights and compact fonts calibrated so a page fits roughly 8 to 10 guide rows instead of 4.
 */
export function getGuideSizeConfig(
  size: LetterSize,
  style: LetterStyle
): GuideSizeConfig {
  const svgWidth = 760;
  const startX = 14;
  // Safety margin: leaves at least 40px on the right edge so punctuation never clips
  const maxLineWidth = 710;

  let capSpan = 22;
  let topY = 4;
  let rowHeight = 34;

  if (size === 'large') {
    capSpan = 28;
    topY = 5;
    rowHeight = style === 'print' ? 42 : 46;
  } else if (size === 'medium') {
    capSpan = 22;
    topY = 4;
    rowHeight = style === 'print' ? 34 : 38;
  } else {
    // small
    capSpan = 16;
    topY = 3;
    rowHeight = style === 'print' ? 26 : 28;
  }

  const baseY = topY + capSpan;
  // EXACT halfway point between solid blue top line and solid red baseline
  const midY = Number((topY + capSpan / 2).toFixed(2));

  if (style === 'print') {
    // Josefin Sans print manuscript
    // Scale font so measured capital height equals capSpan
    const fontSize = Number((capSpan * (1000 / JOSEFIN_CAP_UNITS)).toFixed(2));
    const descenderDepth = Number((fontSize * 0.19).toFixed(2));

    return {
      svgWidth,
      rowHeight,
      topY,
      midY,
      baseY,
      fontSize,
      startX,
      maxLineWidth,
      fontFamily: "'Josefin Sans', sans-serif",
      descenderDepth,
    };
  } else {
    // Playwrite US Trad cursive
    const fontSize = Number((capSpan * (1000 / CURSIVE_CAP_UNITS)).toFixed(2));
    const descenderDepth = Number((fontSize * 0.45).toFixed(2));

    return {
      svgWidth,
      rowHeight,
      topY,
      midY,
      baseY,
      fontSize,
      startX,
      maxLineWidth,
      fontFamily: "'Playwrite US Trad', cursive",
      descenderDepth,
    };
  }
}

// Exact TrueType advance widths in 1000 unitsPerEm for Josefin Sans
const JOSEFIN_ADVANCES: Record<string, number> = {
  " ": 307, "!": 209, "\"": 261, "#": 526, "$": 520, "%": 716, "&": 648, "'": 182,
  "(": 253, ")": 253, "*": 339, "+": 427, ",": 201, "-": 305, ".": 165, "/": 305,
  "0": 532, "1": 315, "2": 520, "3": 515, "4": 528, "5": 509, "6": 540, "7": 490,
  "8": 544, "9": 540, ":": 176, ";": 201, "<": 427, "=": 427, ">": 427, "?": 412,
  "@": 803, "A": 706, "B": 612, "C": 686, "D": 718, "E": 558, "F": 545, "G": 709,
  "H": 752, "I": 234, "J": 420, "K": 640, "L": 482, "M": 923, "N": 745, "O": 753,
  "P": 554, "Q": 753, "R": 640, "S": 531, "T": 556, "U": 692, "V": 647, "W": 948,
  "X": 662, "Y": 579, "Z": 583, "[": 253, "\\": 305, "]": 253, "^": 353, "_": 384,
  "`": 248, "a": 559, "b": 562, "c": 469, "d": 562, "e": 487, "f": 328, "g": 564,
  "h": 570, "i": 218, "j": 224, "k": 501, "l": 225, "m": 787, "n": 570, "o": 564,
  "p": 562, "q": 562, "r": 352, "s": 368, "t": 325, "u": 544, "v": 483, "w": 743,
  "x": 488, "y": 454, "z": 444, "{": 253, "|": 201, "}": 253, "~": 427,
  "“": 312, "”": 312, "‘": 182, "’": 182, "—": 776, "–": 476, "…": 650
};

// Exact TrueType advance widths in 1000 unitsPerEm for Playwrite US Trad
const CURSIVE_ADVANCES: Record<string, number> = {
  " ": 300, "!": 328, "\"": 450, "#": 600, "$": 600, "%": 800, "&": 750, "'": 250,
  "(": 360, ")": 360, "*": 450, "+": 600, ",": 300, "-": 360, ".": 300, "/": 450,
  "0": 600, "1": 450, "2": 600, "3": 600, "4": 600, "5": 600, "6": 600, "7": 600,
  "8": 600, "9": 600, ":": 300, ";": 300, "<": 600, "=": 600, ">": 600, "?": 500,
  "@": 800, "A": 1087, "B": 855, "C": 800, "D": 900, "E": 800, "F": 850, "G": 850,
  "H": 1193, "I": 600, "J": 600, "K": 950, "L": 800, "M": 1300, "N": 1000, "O": 800,
  "P": 855, "Q": 850, "R": 850, "S": 750, "T": 800, "U": 950, "V": 850, "W": 1200,
  "X": 850, "Y": 850, "Z": 800, "[": 360, "\\": 450, "]": 360, "^": 450, "_": 500,
  "`": 300, "a": 622, "b": 614, "c": 500, "d": 641, "e": 444, "f": 450, "g": 622,
  "h": 614, "i": 350, "j": 316, "k": 550, "l": 394, "m": 989, "n": 614, "o": 550,
  "p": 701, "q": 635, "r": 500, "s": 550, "t": 388, "u": 614, "v": 550, "w": 850,
  "x": 550, "y": 640, "z": 500, "{": 400, "|": 300, "}": 400, "~": 500,
  "“": 450, "”": 450, "‘": 250, "’": 250, "—": 800, "–": 500, "…": 750
};

/**
 * Measures the pixel width of a string at the given font size and letter style.
 */
export function measureStringWidth(
  str: string,
  style: LetterStyle,
  fontSize: number
): number {
  const table = style === 'print' ? JOSEFIN_ADVANCES : CURSIVE_ADVANCES;
  const scale = fontSize / 1000;
  let total = 0;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const adv = table[ch] ?? (ch === ' ' ? 307 : 500);
    total += adv * scale;
  }

  return total;
}

/**
 * Usable writing content width on US Letter portrait sheet (816px total width)
 * matching baseCfg SVG width (760px) inside 24px-padded printable area (768px).
 */
export const USABLE_WRITING_WIDTH = 760;

/**
 * Minimum gutter between columns: about half an inch (48px at 96 DPI).
 */
export const MIN_COLUMN_GUTTER = 48;

/**
 * Automatically decides the number of columns (1, 2, or 3) for a group of items:
 * Measure the widest item in the model font:
 * - 3 columns if it fits a third of usable width with half-inch gutters
 * - 2 columns if it fits half of usable width with half-inch gutters
 * - else full width (1 column with wrapping) for long sentences
 */
export function determineColumnsForGroup(
  lines: string[],
  style: LetterStyle,
  size: LetterSize
): 1 | 2 | 3 {
  if (!lines || lines.length <= 1) return 1;

  // Filter out empty lines and headers/notes when determining column layout
  const validLines = lines
    .map((l) => l.trim())
    .filter(
      (l) =>
        l.length > 0 &&
        !l.startsWith('Skip Counting') &&
        !/^([\d_]+[\s,]+){4,}[\d_]+$/.test(l) &&
        !l.startsWith('Note:') &&
        !l.startsWith('[Note]') &&
        !l.startsWith('---') &&
        !l.startsWith('[')
    );

  if (validLines.length <= 1) return 1;

  const cfg = getGuideSizeConfig(size, style);
  const gutter = MIN_COLUMN_GUTTER; // 48px (half an inch at 96 DPI)
  const writingWidth = USABLE_WRITING_WIDTH; // 760px
  const thirdWidth = Math.floor((writingWidth - 2 * gutter) / 3); // 221px
  const halfWidth = Math.floor((writingWidth - gutter) / 2); // 356px

  let maxW = 0;
  for (const line of validLines) {
    const w = measureStringWidth(line, style, cfg.fontSize);
    if (w > maxW) maxW = w;
  }

  // 3 columns if widest item fits a third of usable width with half-inch gutters
  if (maxW <= thirdWidth) {
    return 3;
  }

  // 2 columns if widest item fits half of usable width with half-inch gutters
  if (maxW <= halfWidth) {
    return 2;
  }

  return 1;
}

/**
 * Returns a GuideSizeConfig tailored for a specific column width.
 * Sets startX, svgWidth, and maxLineWidth for columns with exact half-inch gutters (48px).
 * If any single item in a group is slightly wider, scales down font size proportionally so
 * text never clips or touches column borders on screen or in print.
 */
export function getColumnGuideConfig(
  baseCfg: GuideSizeConfig,
  columns: 1 | 2 | 3,
  items?: string[],
  style: LetterStyle = 'print'
): GuideSizeConfig {
  if (columns === 1) {
    return baseCfg;
  }

  const gutter = MIN_COLUMN_GUTTER; // 48px (0.5 in)
  const writingWidth = USABLE_WRITING_WIDTH; // 744px

  let colWidth: number;
  let startX: number;
  let safetyMargin: number;

  if (columns === 3) {
    colWidth = Math.floor((writingWidth - 2 * gutter) / 3); // 216px
    startX = 8;
    safetyMargin = 8;
  } else {
    // 2 columns
    colWidth = Math.floor((writingWidth - gutter) / 2); // 348px
    startX = 10;
    safetyMargin = 10;
  }

  const maxAllowedTextWidth = colWidth - startX - safetyMargin;

  // Measure widest item in this group at the base model font
  let maxItemWidth = 0;
  if (items && items.length > 0) {
    for (const it of items) {
      const trimmed = it.trim();
      if (!trimmed || trimmed.startsWith('Note:') || trimmed.startsWith('[') || trimmed.startsWith('---')) continue;
      const w = measureStringWidth(trimmed, style, baseCfg.fontSize);
      if (w > maxItemWidth) maxItemWidth = w;
    }
  }

  // If any item exceeds maxAllowedTextWidth, scale down font size until it fits
  if (maxItemWidth > maxAllowedTextWidth) {
    const targetTextWidth = maxAllowedTextWidth - 4;
    const scale = Math.max(0.68, targetTextWidth / maxItemWidth);
    const fittedFontSize = Number((baseCfg.fontSize * scale).toFixed(2));

    const capSpan =
      style === 'print'
        ? Number((fittedFontSize * (JOSEFIN_CAP_UNITS / 1000)).toFixed(2))
        : Number((fittedFontSize * (CURSIVE_CAP_UNITS / 1000)).toFixed(2));

    const descenderDepth =
      style === 'print'
        ? Number((fittedFontSize * 0.19).toFixed(2))
        : Number((fittedFontSize * 0.45).toFixed(2));

    const topY = Math.max(3, Math.round(baseCfg.topY * scale));
    const baseY = topY + capSpan;
    const midY = Number((topY + capSpan / 2).toFixed(2));
    const rowHeight = Math.ceil(baseY + descenderDepth + 3);

    return {
      svgWidth: colWidth,
      rowHeight,
      topY,
      midY,
      baseY,
      fontSize: fittedFontSize,
      startX,
      maxLineWidth: maxAllowedTextWidth,
      fontFamily: baseCfg.fontFamily,
      descenderDepth,
    };
  }

  return {
    ...baseCfg,
    svgWidth: colWidth,
    startX,
    maxLineWidth: maxAllowedTextWidth,
  };
}

/**
 * Splits a sentence into multiple lines such that no line exceeds maxLineWidth.
 * Breaks ONLY between words, never mid-word.
 * Preserves all original punctuation (periods, commas, semicolons, etc.).
 */
export function wrapSentenceToRows(
  sentence: string,
  style: LetterStyle,
  size: LetterSize
): string[] {
  const trimmed = sentence.trim();
  if (!trimmed) return [];

  const cfg = getGuideSizeConfig(size, style);
  const words = trimmed.split(/\s+/);
  const spaceWidth = measureStringWidth(' ', style, cfg.fontSize);

  const rows: string[] = [];
  let currentRowWords: string[] = [];
  let currentRowWidth = 0;

  for (const word of words) {
    const wordWidth = measureStringWidth(word, style, cfg.fontSize);

    if (currentRowWords.length === 0) {
      currentRowWords.push(word);
      currentRowWidth = wordWidth;
    } else {
      const testWidth = currentRowWidth + spaceWidth + wordWidth;
      // If adding this word exceeds maxLineWidth, wrap onto next line
      if (testWidth > cfg.maxLineWidth) {
        rows.push(currentRowWords.join(' '));
        currentRowWords = [word];
        currentRowWidth = wordWidth;
      } else {
        currentRowWords.push(word);
        currentRowWidth = testWidth;
      }
    }
  }

  if (currentRowWords.length > 0) {
    rows.push(currentRowWords.join(' '));
  }

  return rows;
}

