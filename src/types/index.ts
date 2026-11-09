export type LetterStyle = 'print' | 'cursive';
export type LetterSize = 'large' | 'medium' | 'small';

export interface Modifier {
  word: string;
  prep?: {
    object: {
      word: string;
      modifiers?: Modifier[];
    };
  };
}

export interface Complement {
  type: 'DO' | 'PN' | 'PA' | 'OCN' | 'OCA';
  word: string;
  modifiers?: Modifier[];
}

export interface WordJob {
  word: string;
  pos: string;
  job: string;
}

export interface DiagramKids {
  pattern_why: string;
  words: WordJob[];
}

export interface DiagramClause {
  clause: string;
  pattern: 'S-Vi' | 'S-Vt-DO' | 'S-Vl-PN' | 'S-Vl-PA' | 'S-Vt-IO-DO' | 'S-Vt-DO-OCN' | 'S-Vt-DO-OCA' | string;
  note?: string;
  interjection?: string | null;
  nda?: string | null;
  expletive?: string | null;
  subject: {
    word: string | null;
    modifiers?: Modifier[];
    compound?: {
      conjunction: string;
      branches: Array<{
        word: string;
        modifiers?: Modifier[];
      }>;
    };
    appositive?: {
      word: string;
      modifiers?: Modifier[];
    } | null;
  };
  verb: {
    word: string | null;
    modifiers?: Modifier[];
    compound?: {
      conjunction: string;
      branches: Array<{
        word: string;
        modifiers?: Modifier[];
      }>;
    };
  };
  io?: {
    word: string;
    modifiers?: Modifier[];
  } | null;
  complements: Complement[];
  kids?: DiagramKids;
}

export interface DiagramAnalysis {
  clauses: DiagramClause[];
  split_note?: string | null;
}

export interface StateGeo {
  n: string; // Name
  a: string; // Abbreviation (2 letters)
  c: string; // Capital
  l: [number, number]; // Label center [x, y]
  k?: [number, number]; // Capital star location [x, y]
  r: number[][][]; // Polygons
}

export type RegionKey = 'east' | 'midwest' | 'south' | 'mountain' | 'west' | 'us';

export type WorksheetItemType = 'memoryWork' | 'note';

export interface WorksheetItem {
  text: string;
  type: WorksheetItemType;
  latinInfo?: any;
  promptHeader?: string;
  label?: string;
  prompt?: string;
  /** Science "What it does" notes: one kid-level line per term, shown above the tracing. */
  functionNotes?: { term: string; note: string }[];
}
