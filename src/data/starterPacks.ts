import { CC_MATH_PACKS, MathFactItem } from './mathPacks';
import { LatinWordEntry } from './latinReviewData';
import { WorksheetItem } from '../types';
import { normalizeWorksheetItems } from '../utils/labelHelper';
import {
  CYCLE_1_LATIN_PACKS,
  CYCLE_2_LATIN_PACKS,
  CYCLE_3_LATIN_PACKS,
} from './latinPacks';
import {
  getPresidentsInOrder,
  getPresidentsWithVPs,
} from './presidentsData';
import { getBillOfRightsSelection } from './billOfRightsData';
import { CYCLE_3_HISTORY_WEEKS } from './reviewPacketData';
import {
  CYCLE_1_BIBLE_WEEKS,
  CYCLE_2_BIBLE_WEEKS,
  CYCLE_3_BIBLE_WEEKS,
} from './bibleData';

export type StarterCategory =
  | 'Cycle 1'
  | 'Cycle 2'
  | 'Cycle 3'
  | 'Bible'
  | 'Latin'
  | 'English'
  | 'Science'
  | 'Essentials & IEW'
  | 'Civics'
  | 'History'
  | 'Geography'
  | 'Timeline'
  | 'Presidents & VPs'
  | 'Bill of Rights';

export const STARTER_CATEGORIES: StarterCategory[] = [
  'Cycle 1',
  'Cycle 2',
  'Cycle 3',
  'Bible',
  'Latin',
  'English',
  'Science',
  'Essentials & IEW',
  'Civics',
  'History',
  'Geography',
  'Timeline',
  'Presidents & VPs',
  'Bill of Rights',
];

export interface StarterPack {
  id: string;
  category: StarterCategory;
  label: string;
  title: string;
  lines: string[];
  items?: WorksheetItem[];
  isMath?: boolean;
  mathItems?: MathFactItem[];
  isLatin?: boolean;
  latinEntries?: LatinWordEntry[];
}

const createCycleMathPacks = (cycle: 'Cycle 1' | 'Cycle 2' | 'Cycle 3'): StarterPack[] =>
  CC_MATH_PACKS.map((mp) => ({
    id: `${cycle.toLowerCase().replace(/\s+/g, '-')}-${mp.id}`,
    category: cycle,
    label: mp.label,
    title: mp.title.replace('Foundations Math', `Foundations ${cycle} Math`),
    lines: mp.items.map((it) => it.full),
    items: mp.items.map((it) => ({ text: it.full, type: 'memoryWork' as const })),
    isMath: true,
    mathItems: mp.items,
  }));

const createCycle3HistoryPack = (
  id: string,
  label: string,
  title: string,
  weeks: number[]
): StarterPack => {
  const lines: string[] = [];
  const items: WorksheetItem[] = [];
  for (const w of weeks) {
    const entry = CYCLE_3_HISTORY_WEEKS[w];
    if (entry) {
      lines.push(...entry.lines);
      for (const line of entry.lines) {
        items.push({
          text: line,
          type: 'memoryWork',
          promptHeader: entry.heading,
        });
      }
    }
  }
  return {
    id,
    category: 'Cycle 3',
    label,
    title,
    lines,
    items,
  };
};

const createBibleStarterPacks = (): StarterPack[] => {
  const packs: StarterPack[] = [];

  // Cycle 1 Bible Highlights
  packs.push({
    id: 'bible-c1-plagues',
    category: 'Bible',
    label: 'Ten Plagues of Egypt (Cycle 1, W17–18)',
    title: 'What are the 10 Plagues of Egypt?',
    lines: [
      ...CYCLE_1_BIBLE_WEEKS[17].lines,
      ...CYCLE_1_BIBLE_WEEKS[18].lines,
    ],
    items: [
      ...CYCLE_1_BIBLE_WEEKS[17].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_1_BIBLE_WEEKS[17].prompt : undefined,
        prompt: idx === 0 ? CYCLE_1_BIBLE_WEEKS[17].prompt : undefined,
        label: idx === 0 ? CYCLE_1_BIBLE_WEEKS[17].prompt : undefined,
      })),
      ...CYCLE_1_BIBLE_WEEKS[18].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_1_BIBLE_WEEKS[18].prompt : undefined,
        prompt: idx === 0 ? CYCLE_1_BIBLE_WEEKS[18].prompt : undefined,
        label: idx === 0 ? CYCLE_1_BIBLE_WEEKS[18].prompt : undefined,
      })),
    ],
  });

  packs.push({
    id: 'bible-c1-sons',
    category: 'Bible',
    label: '12 Sons/Tribes of Israel (Cycle 1, W12–13)',
    title: 'Who are the 12 Sons/Tribes of Israel?',
    lines: [
      ...CYCLE_1_BIBLE_WEEKS[12].lines,
      ...CYCLE_1_BIBLE_WEEKS[13].lines,
    ],
    items: [
      ...CYCLE_1_BIBLE_WEEKS[12].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_1_BIBLE_WEEKS[12].prompt : undefined,
        prompt: idx === 0 ? CYCLE_1_BIBLE_WEEKS[12].prompt : undefined,
      })),
      ...CYCLE_1_BIBLE_WEEKS[13].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_1_BIBLE_WEEKS[13].prompt : undefined,
        prompt: idx === 0 ? CYCLE_1_BIBLE_WEEKS[13].prompt : undefined,
      })),
    ],
  });

  packs.push({
    id: 'bible-c2-judges',
    category: 'Bible',
    label: '8 Significant Judges of Israel (Cycle 2, W1–2)',
    title: 'Who are 8 significant judges of Israel?',
    lines: [
      ...CYCLE_2_BIBLE_WEEKS[1].lines,
      ...CYCLE_2_BIBLE_WEEKS[2].lines,
    ],
    items: [
      ...CYCLE_2_BIBLE_WEEKS[1].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_2_BIBLE_WEEKS[1].prompt : undefined,
        prompt: idx === 0 ? CYCLE_2_BIBLE_WEEKS[1].prompt : undefined,
      })),
      ...CYCLE_2_BIBLE_WEEKS[2].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_2_BIBLE_WEEKS[2].prompt : undefined,
        prompt: idx === 0 ? CYCLE_2_BIBLE_WEEKS[2].prompt : undefined,
      })),
    ],
  });

  packs.push({
    id: 'bible-c2-prophets',
    category: 'Bible',
    label: '18 Significant Prophets of Israel (Cycle 2, W10–12)',
    title: 'Who are 18 significant prophets of Israel?',
    lines: [
      ...CYCLE_2_BIBLE_WEEKS[10].lines,
      ...CYCLE_2_BIBLE_WEEKS[11].lines,
      ...CYCLE_2_BIBLE_WEEKS[12].lines,
    ],
    items: [
      ...CYCLE_2_BIBLE_WEEKS[10].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_2_BIBLE_WEEKS[10].prompt : undefined,
        prompt: idx === 0 ? CYCLE_2_BIBLE_WEEKS[10].prompt : undefined,
      })),
      ...CYCLE_2_BIBLE_WEEKS[11].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_2_BIBLE_WEEKS[11].prompt : undefined,
        prompt: idx === 0 ? CYCLE_2_BIBLE_WEEKS[11].prompt : undefined,
      })),
      ...CYCLE_2_BIBLE_WEEKS[12].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_2_BIBLE_WEEKS[12].prompt : undefined,
        prompt: idx === 0 ? CYCLE_2_BIBLE_WEEKS[12].prompt : undefined,
      })),
    ],
  });

  packs.push({
    id: 'bible-c3-books-ot',
    category: 'Bible',
    label: 'Books of the Bible: Old Testament (Cycle 3, W4–8)',
    title: 'Books of the Bible: Old Testament (39 Books)',
    lines: [
      ...CYCLE_3_BIBLE_WEEKS[4].lines,
      ...CYCLE_3_BIBLE_WEEKS[5].lines,
      ...CYCLE_3_BIBLE_WEEKS[6].lines,
      ...CYCLE_3_BIBLE_WEEKS[7].lines,
      ...CYCLE_3_BIBLE_WEEKS[8].lines,
    ],
    items: [
      ...CYCLE_3_BIBLE_WEEKS[4].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[5].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[6].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[7].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[8].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
    ],
  });

  packs.push({
    id: 'bible-c3-books-nt',
    category: 'Bible',
    label: 'Books of the Bible: New Testament (Cycle 3, W9–12)',
    title: 'Books of the Bible: New Testament (27 Books)',
    lines: [
      ...CYCLE_3_BIBLE_WEEKS[9].lines,
      ...CYCLE_3_BIBLE_WEEKS[10].lines,
      ...CYCLE_3_BIBLE_WEEKS[11].lines,
      ...CYCLE_3_BIBLE_WEEKS[12].lines,
    ],
    items: [
      ...CYCLE_3_BIBLE_WEEKS[9].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[10].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[11].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
      ...CYCLE_3_BIBLE_WEEKS[12].lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
    ],
  });

  packs.push({
    id: 'bible-c3-disciples',
    category: 'Bible',
    label: '12 Disciples of Jesus (Cycle 3, W14–15)',
    title: 'What are the names of Jesus’ original 12 disciples?',
    lines: [
      ...CYCLE_3_BIBLE_WEEKS[14].lines,
      ...CYCLE_3_BIBLE_WEEKS[15].lines,
    ],
    items: [
      ...CYCLE_3_BIBLE_WEEKS[14].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_3_BIBLE_WEEKS[14].prompt : undefined,
        prompt: idx === 0 ? CYCLE_3_BIBLE_WEEKS[14].prompt : undefined,
      })),
      ...CYCLE_3_BIBLE_WEEKS[15].lines.map((l, idx) => ({
        text: l,
        type: 'memoryWork' as const,
        promptHeader: idx === 0 ? CYCLE_3_BIBLE_WEEKS[15].prompt : undefined,
        prompt: idx === 0 ? CYCLE_3_BIBLE_WEEKS[15].prompt : undefined,
      })),
    ],
  });

  // Cycle Overviews (Full 24 weeks)
  for (const c of [1, 2, 3] as const) {
    const table = c === 1 ? CYCLE_1_BIBLE_WEEKS : c === 2 ? CYCLE_2_BIBLE_WEEKS : CYCLE_3_BIBLE_WEEKS;
    const catName: StarterCategory = c === 1 ? 'Cycle 1' : c === 2 ? 'Cycle 2' : 'Cycle 3';
    const cTitle = c === 1 ? 'Creation to Moses' : c === 2 ? 'Judges to Jesus' : 'Gospels to Revelation & Books of the Bible';

    const cycleItems: WorksheetItem[] = [];
    const cycleLines: string[] = [];

    for (let w = 1; w <= 24; w++) {
      const entry = table[w];
      if (!entry) continue;
      cycleLines.push(...entry.lines);
      entry.lines.forEach((line, idx) => {
        cycleItems.push({
          text: line,
          type: 'memoryWork' as const,
          promptHeader: idx === 0 ? `Week ${w}: ${entry.prompt}` : undefined,
          prompt: idx === 0 ? `Week ${w}: ${entry.prompt}` : undefined,
          label: idx === 0 ? `Week ${w}: ${entry.prompt}` : undefined,
        });
      });
    }

    packs.push({
      id: `bible-c${c}-full-cycle`,
      category: 'Bible',
      label: `Cycle ${c} Bible: ${cTitle} (Weeks 1–24)`,
      title: `Cycle ${c} Bible Memory Work: ${cTitle}`,
      lines: cycleLines,
      items: cycleItems,
    });

    packs.push({
      id: `c${c}-bible-full`,
      category: catName,
      label: `Bible: ${cTitle} (Weeks 1–24)`,
      title: `Cycle ${c} Bible Memory Work: ${cTitle}`,
      lines: cycleLines,
      items: cycleItems,
    });
  }

  return packs;
};

const RAW_STARTER_PACKS: StarterPack[] = [
  // ==========================================
  // BIBLE (Cycles 1, 2, 3 Memory Masters)
  // ==========================================
  ...createBibleStarterPacks(),

  // ==========================================
  // CYCLE 1 (Sorted by Subject: Math, History, Science, Latin, English)
  // ==========================================
  ...createCycleMathPacks('Cycle 1'),
  {
    id: 'cycle-1-history',
    category: 'Cycle 1',
    label: 'History: Ancient World & Empires',
    title: 'Foundations Cycle 1: Ancient History',
    lines: [],
    items: [
      { text: 'Cycle 1 History guide pages pending upload.', type: 'note' },
    ],
  },
  {
    id: 'cycle-1-science',
    category: 'Cycle 1',
    label: 'Science: Biology & Classifications',
    title: 'Foundations Cycle 1: Biology',
    lines: [],
    items: [
      { text: 'Cycle 1 Science guide pages pending upload.', type: 'note' },
    ],
  },
  ...CYCLE_1_LATIN_PACKS,
  {
    id: 'cycle-1-english',
    category: 'Cycle 1',
    label: 'English: Helping & Linking Verbs',
    title: 'Foundations Cycle 1: English Grammar',
    lines: [],
    items: [
      { text: 'Cycle 1 English guide pages pending upload.', type: 'note' },
    ],
  },

  // ==========================================
  // CYCLE 2 (Sorted by Subject: Math, History, Science, Latin, English)
  // ==========================================
  ...createCycleMathPacks('Cycle 2'),
  {
    id: 'cycle-2-history',
    category: 'Cycle 2',
    label: 'History: Medieval World & Magna Carta',
    title: 'Foundations Cycle 2: Medieval History',
    lines: [],
    items: [
      { text: 'Cycle 2 History guide pages pending upload.', type: 'note' },
    ],
  },
  {
    id: 'cycle-2-science',
    category: 'Cycle 2',
    label: 'Science: Astronomy & Laws of Motion',
    title: 'Foundations Cycle 2: Astronomy & Motion',
    lines: [],
    items: [
      { text: 'Cycle 2 Science guide pages pending upload.', type: 'note' },
    ],
  },
  ...CYCLE_2_LATIN_PACKS,
  {
    id: 'cycle-2-english',
    category: 'Cycle 2',
    label: 'English: Pronouns & Adverbs',
    title: 'Foundations Cycle 2: English Grammar',
    lines: [],
    items: [
      { text: 'Cycle 2 English guide pages pending upload.', type: 'note' },
    ],
  },

  // ==========================================
  // CYCLE 3 (Sorted by Subject: Math, History, Science, Latin, English)
  // ==========================================
  ...createCycleMathPacks('Cycle 3'),
  createCycle3HistoryPack(
    'cycle-3-history',
    'History: Early America & Founding (Weeks 1–5)',
    'Foundations Cycle 3: Early America',
    [1, 2, 3, 4, 5]
  ),
  createCycle3HistoryPack(
    'cycle-3-history-civil-war',
    'History: Civil War & Westward Expansion (Weeks 6–13)',
    'Cycle 3 History: Civil War & Expansion',
    [6, 7, 8, 9, 10, 11, 12, 13]
  ),
  createCycle3HistoryPack(
    'cycle-3-history-modern',
    'History: 20th Century to Present (Weeks 14–22)',
    'Cycle 3 History: Modern America',
    [14, 15, 16, 17, 18, 19, 20, 21, 22]
  ),
  createCycle3HistoryPack(
    'cycle-3-preamble',
    'History: The Preamble to the U.S. Constitution (Week 23)',
    'Preamble to the United States Constitution',
    [23]
  ),
  createCycle3HistoryPack(
    'cycle-3-bill-of-rights',
    'History: The Bill of Rights (Week 24)',
    'The Bill of Rights (Amendments 1–10)',
    [24]
  ),
  {
    id: 'cycle-3-science',
    category: 'Cycle 3',
    label: 'Science: Human Anatomy & Heart',
    title: 'Foundations Cycle 3: Human Anatomy',
    lines: [
      'Fourteen systems of the human body include skeletal, muscular, circulatory, and nervous.',
      'The axial skeleton consists of skull, vertebrae, ribs, and sternum.',
      'The appendicular skeleton includes arms, legs, pelvis, and shoulder girdle.',
      'The heart has four chambers: right atrium, right ventricle, left atrium, left ventricle.',
    ],
  },
  {
    id: 'cycle-3-science-chemistry',
    category: 'Cycle 3',
    label: 'Science: Chemistry & Periodic Table',
    title: 'Foundations Cycle 3: Chemistry',
    lines: [
      'The atomic number is the number of protons in the nucleus of an atom.',
      'An element is a basic chemical substance that cannot be broken down.',
      'Parts of an atom: nucleus, protons, electrons, quarks, leptons, neutrons.',
      '1 Hydrogen H 1, 2 Helium He 4, 3 Lithium Li 7, 4 Beryllium Be 9.',
      '5 Boron B 11, 6 Carbon C 12, 7 Nitrogen N 14, 8 Oxygen O 16.',
      '9 Fluorine F 19, 10 Neon Ne 20, 11 Sodium Na 23, 12 Magnesium Mg 24.',
      'An acid donates a hydrogen ion; a base accepts a hydrogen ion.',
    ],
  },
  {
    id: 'cycle-3-science-origins',
    category: 'Cycle 3',
    label: 'Science: Origins & Earth History',
    title: 'Foundations Cycle 3: Origins Science',
    lines: [
      'DNA bonds consist of pairs of nucleotide bases: adenine and thymine, guanine and cytosine.',
      'Theory of evolution: life began as a chance combination of non-living things.',
      'Theory of intelligent design: life began as the result of intention and purpose.',
      'Earth history is preserved in rocks, fossils, ice, tar, and amber.',
      'Natural selection: the fittest survive and pass along traits to offspring.',
    ],
  },
  ...CYCLE_3_LATIN_PACKS,
  {
    id: 'cycle-3-english',
    category: 'Cycle 3',
    label: 'English: Verb Principal Parts',
    title: 'Foundations Cycle 3: English Verb Parts',
    lines: [
      'Every verb has five principal parts: infinitive, present, past, present participle, past participle.',
      'To be: be, am/is/are, was/were, being, been.',
      'To do: do, do/does, did, doing, done.',
      'To rise: rise, rise/rises, rose, rising, risen.',
      'To raise: raise, raise/raises, raised, raising, raised.',
      'To lay: lay, lay/lays, laid, laying, laid.',
      'To lie: lie, lie/lies, lay, lying, lain.',
      'To set: set, set/sets, set, setting, set.',
      'To sit: sit, sit/sits, sat, sitting, sat.',
      'To beat: beat, beat/beats, beat, beating, beaten.',
      'To break: break, break/breaks, broke, breaking, broken.',
      'To write: write, write/writes, wrote, writing, written.',
      'To go: go, go/goes, went, going, gone.',
    ],
  },
  {
    id: 'cycle-3-english-grammar',
    category: 'Cycle 3',
    label: 'English: Clauses, Structures & Patterns',
    title: 'Foundations Cycle 3: Grammar & Structures',
    lines: [
      'The subject is that part of a sentence about which something is being said.',
      'The predicate is that part of a sentence that says something about the subject.',
      'A clause is a group of words that contains both a subject and a verb.',
      'An independent clause expresses a complete thought and can stand alone.',
      'A subordinate clause does not express a complete thought and cannot stand alone.',
      'A phrase does not contain both a subject and verb; used as single part of speech.',
      'Four structures: simple, compound, complex, and compound-complex.',
      'Seven patterns: S-Vi, S-Vt-DO, S-Vl-PN, S-Vl-PA, S-Vt-IO-DO, S-Vt-DO-OCN, S-Vt-DO-OCA.',
    ],
  },
  {
    id: 'cycle-3-timeline-summary',
    category: 'Cycle 3',
    label: 'Timeline: 161 Historical Card Highlights',
    title: 'Foundations Timeline: All 161 Cards Across History',
    lines: [
      'Age of Ancient Empires (Creation to circa 450 A.D.)',
      'Seven Wonders of the Ancient World • Patriarchs of Israel',
      'Roman Republic • Golden Age of Greece • Peloponnesian Wars',
      'Jesus the Messiah • Pentecost and the Early Church',
      'The Middle Ages • Charlemagne Crowned Emperor of Europe',
      'Norman Conquest and Feudalism in Europe • The Crusades',
      'Genghis Khan Rules the Mongols • England\'s Magna Carta',
      'Age of Exploration • Gutenberg\'s Printing Press',
      'Columbus Sails to the Caribbean • Protestant Reformation',
      'Age of Industry • American Revolution and General Washington',
      'Madison\'s Constitution and the Bill of Rights • French Revolution',
      'Cherokee Trail of Tears • Lincoln\'s War Between the States',
      'World War I and President Wilson • Lenin and the Bolsheviks',
      'World War II and President Roosevelt • The United Nations',
      'U.S. Astronauts Walk on the Moon • Fall of Communism in Europe',
      'September 11, 2001',
    ],
  },
  {
    id: 'cycle-3-timeline-presidents',
    category: 'Cycle 3',
    label: 'Timeline: U.S. Presidents Song (Week 24)',
    title: 'Foundations Timeline: Presidents of the United States',
    lines: [
      'Group 1: Washington, Adams, Jefferson, Madison, Monroe',
      'Group 2: Adams, Jackson, Van Buren, Harrison, Tyler, Polk, Taylor',
      'Group 3: Fillmore, Pierce, Buchanan, Lincoln, Johnson, Grant, Hayes',
      'Group 4: Garfield, Arthur, Cleveland, Harrison, Cleveland, McKinley',
      'Group 5: Roosevelt, Taft, Wilson, Harding, Coolidge, Hoover',
      'Group 6: Roosevelt, Truman, Eisenhower, Kennedy, Johnson, Nixon, Ford',
      'Group 7: Carter, Reagan, Bush, Clinton, Bush, Obama, Trump, Biden, Trump',
    ],
  },

  // ==========================================
  // ESSENTIALS & IEW
  // ==========================================
  {
    id: 'iew-openers',
    category: 'Essentials & IEW',
    label: 'IEW: [1] to [6] Sentence Openers',
    title: 'IEW Sentence Openers [1]–[6]',
    lines: [
      '[1] Subject Opener: The noble knight defended the ancient castle.',
      '[2] Prepositional Opener: Into the dark forest, the brave adventurer journeyed.',
      '[3] -ly Adverb Opener: Swiftly, the clever fox leaped across the stream.',
      '[4] -ing Participle Opener: Running at top speed, the messenger reached the gates.',
      '[5] Clausal Opener: Because the storm raged, the sailors reefed the sails.',
      '[6] Very Short Sentence (V.S.S.): Fear gripped him.',
    ],
  },
  {
    id: 'iew-dress-ups',
    category: 'Essentials & IEW',
    label: 'IEW: The Six Stylistic Dress-Ups',
    title: 'IEW Six Stylistic Dress-Ups',
    lines: [
      '-ly Adverb: The courageous pioneer determinedly pressed westward.',
      'Who / Which Clause: George Washington, who led the army, became president.',
      'Strong Verb: The ferocious lion pounced upon its prey in the savanna.',
      'Quality Adjective: The brilliant inventor created an astounding apparatus.',
      'www.asia.b Clause: When the bell tolled, the faithful pilgrims knelt.',
      'Dual Verbs: The student read and analyzed the classic story.',
    ],
  },
  {
    id: 'parts-of-speech',
    category: 'Essentials & IEW',
    label: 'Essentials: The Eight Parts of Speech',
    title: 'The Eight Parts of Speech',
    lines: [
      'Noun: Names a person, place, thing, activity, or idea.',
      'Pronoun: Replaces a noun in order to avoid repetition.',
      'Verb: Asserts action, being, or state of being.',
      'Adverb: Modifies a verb, adjective, or another adverb.',
      'Adjective: Modifies a noun or pronoun by describing it.',
      'Preposition: Conforms a noun or pronoun to another word.',
      'Conjunction: Connects words, phrases, or clauses.',
      'Interjection: Expresses strong or sudden feeling.',
    ],
  },
  {
    id: 'spido-pona',
    category: 'Essentials & IEW',
    label: 'Essentials: SPIDO PONA (Nine Noun Usages)',
    title: 'The Nine Noun Usages (SPIDO PONA)',
    lines: [
      'S - Subject Noun (SN)',
      'P - Possessive Noun Adjective (PNA)',
      'I - Indirect Object (IO)',
      'D - Direct Object (DO)',
      'O - Object of the Preposition (OP)',
      'P - Predicate Nominative (PN)',
      'O - Object Complement Noun (OCN)',
      'N - Noun of Direct Address (NDA)',
      'A - Appositive (AP)',
    ],
  },

  // ==========================================
  // CIVICS
  // ==========================================
  {
    id: 'bill-of-rights',
    category: 'Civics',
    label: 'The Bill of Rights (Ten Summary Lines)',
    title: 'The Bill of Rights',
    lines: CYCLE_3_HISTORY_WEEKS[24].lines,
    items: CYCLE_3_HISTORY_WEEKS[24].lines.map((l) => ({
      text: l,
      type: 'memoryWork' as const,
      promptHeader: CYCLE_3_HISTORY_WEEKS[24].heading,
    })),
  },

  // ==========================================
  // HISTORY
  // ==========================================
  {
    id: 'presidents',
    category: 'History',
    label: 'U.S. Presidents 1–47 (with Vice Presidents)',
    title: 'U.S. Presidents and Vice Presidents',
    lines: [
      '1. George Washington (John Adams)',
      '2. John Adams (Thomas Jefferson)',
      '3. Thomas Jefferson (Aaron Burr, George Clinton)',
      '4. James Madison (George Clinton, Elbridge Gerry)',
      '5. James Monroe (Daniel D. Tompkins)',
      '6. John Quincy Adams (John C. Calhoun)',
      '7. Andrew Jackson (John C. Calhoun, Martin Van Buren)',
      '8. Martin Van Buren (Richard M. Johnson)',
      '9. William Henry Harrison (John Tyler)',
      '10. John Tyler (no vice president)',
      '11. James K. Polk (George M. Dallas)',
      '12. Zachary Taylor (Millard Fillmore)',
      '13. Millard Fillmore (no vice president)',
      '14. Franklin Pierce (William R. King)',
      '15. James Buchanan (John C. Breckinridge)',
      '16. Abraham Lincoln (Hannibal Hamlin, Andrew Johnson)',
      '17. Andrew Johnson (no vice president)',
      '18. Ulysses S. Grant (Schuyler Colfax, Henry Wilson)',
      '19. Rutherford B. Hayes (William A. Wheeler)',
      '20. James A. Garfield (Chester A. Arthur)',
      '21. Chester A. Arthur (no vice president)',
      '22. Grover Cleveland (Thomas A. Hendricks)',
      '23. Benjamin Harrison (Levi P. Morton)',
      '24. Grover Cleveland (Adlai E. Stevenson)',
      '25. William McKinley (Garret Hobart, Theodore Roosevelt)',
      '26. Theodore Roosevelt (Charles W. Fairbanks)',
      '27. William Howard Taft (James S. Sherman)',
      '28. Woodrow Wilson (Thomas R. Marshall)',
      '29. Warren G. Harding (Calvin Coolidge)',
      '30. Calvin Coolidge (Charles G. Dawes)',
      '31. Herbert Hoover (Charles Curtis)',
      '32. Franklin D. Roosevelt (John Garner, Henry Wallace, Harry Truman)',
      '33. Harry S. Truman (Alben W. Barkley)',
      '34. Dwight D. Eisenhower (Richard Nixon)',
      '35. John F. Kennedy (Lyndon B. Johnson)',
      '36. Lyndon B. Johnson (Hubert Humphrey)',
      '37. Richard Nixon (Spiro Agnew, Gerald Ford)',
      '38. Gerald Ford (Nelson Rockefeller)',
      '39. Jimmy Carter (Walter Mondale)',
      '40. Ronald Reagan (George H. W. Bush)',
      '41. George H. W. Bush (Dan Quayle)',
      '42. Bill Clinton (Al Gore)',
      '43. George W. Bush (Dick Cheney)',
      '44. Barack Obama (Joe Biden)',
      '45. Donald Trump (Mike Pence)',
      '46. Joe Biden (Kamala Harris)',
      '47. Donald Trump (JD Vance)',
    ],
  },

  // ==========================================
  // GEOGRAPHY (Sorted: East Coast, Midwest, West Coast)
  // ==========================================
  {
    id: 'east-coast',
    category: 'Geography',
    label: 'East Coast States and Capitals',
    title: 'East Coast States and Capitals',
    lines: [
      'Maine - Augusta',
      'New Hampshire - Concord',
      'Massachusetts - Boston',
      'Rhode Island - Providence',
      'Connecticut - Hartford',
      'New York - Albany',
      'New Jersey - Trenton',
      'Delaware - Dover',
      'Maryland - Annapolis',
      'Virginia - Richmond',
      'North Carolina - Raleigh',
      'South Carolina - Columbia',
      'Georgia - Atlanta',
      'Florida - Tallahassee',
    ],
  },
  {
    id: 'midwest',
    category: 'Geography',
    label: 'Midwest States and Capitals',
    title: 'Midwest States and Capitals',
    lines: [
      'Ohio - Columbus',
      'Michigan - Lansing',
      'Indiana - Indianapolis',
      'Illinois - Springfield',
      'Wisconsin - Madison',
      'Minnesota - Saint Paul',
      'Iowa - Des Moines',
      'Missouri - Jefferson City',
      'North Dakota - Bismarck',
      'South Dakota - Pierre',
      'Nebraska - Lincoln',
      'Kansas - Topeka',
    ],
  },
  {
    id: 'west-coast',
    category: 'Geography',
    label: 'West Coast States and Capitals',
    title: 'West Coast States and Capitals',
    lines: [
      'California - Sacramento',
      'Oregon - Salem',
      'Washington - Olympia',
      'Alaska - Juneau',
      'Hawaii - Honolulu',
    ],
  },

  // ==========================================
  // TIMELINE
  // ==========================================
  {
    id: 'timeline-card-highlights',
    category: 'Timeline',
    label: 'Timeline: 161 Historical Card Highlights',
    title: 'Foundations Timeline: All 161 Cards Across History',
    lines: [
      'Age of Ancient Empires (Creation to circa 450 A.D.)',
      'Seven Wonders of the Ancient World • Patriarchs of Israel',
      'Roman Republic • Golden Age of Greece • Peloponnesian Wars',
      'Jesus the Messiah • Pentecost and the Early Church',
      'The Middle Ages • Charlemagne Crowned Emperor of Europe',
      'Norman Conquest and Feudalism in Europe • The Crusades',
      'Genghis Khan Rules the Mongols • England\'s Magna Carta',
      'Age of Exploration • Gutenberg\'s Printing Press',
      'Columbus Sails to the Caribbean • Protestant Reformation',
      'Age of Industry • American Revolution and General Washington',
      'Madison\'s Constitution and the Bill of Rights • French Revolution',
      'Cherokee Trail of Tears • Lincoln\'s War Between the States',
      'World War I and President Wilson • Lenin and the Bolsheviks',
      'World War II and President Roosevelt • The United Nations',
      'U.S. Astronauts Walk on the Moon • Fall of Communism in Europe',
      'September 11, 2001',
    ],
  },
  {
    id: 'timeline-presidents-song-pack',
    category: 'Timeline',
    label: 'Timeline: U.S. Presidents Song (Week 24)',
    title: 'Foundations Timeline: Presidents of the United States',
    lines: [
      'Group 1: Washington, Adams, Jefferson, Madison, Monroe',
      'Group 2: Adams, Jackson, Van Buren, Harrison, Tyler, Polk, Taylor',
      'Group 3: Fillmore, Pierce, Buchanan, Lincoln, Johnson, Grant, Hayes',
      'Group 4: Garfield, Arthur, Cleveland, Harrison, Cleveland, McKinley',
      'Group 5: Roosevelt, Taft, Wilson, Harding, Coolidge, Hoover',
      'Group 6: Roosevelt, Truman, Eisenhower, Kennedy, Johnson, Nixon, Ford',
      'Group 7: Carter, Reagan, Bush, Clinton, Bush, Obama, Trump, Biden, Trump',
    ],
  },

  // ==========================================
  // PRESIDENTS & VPS
  // ==========================================
  {
    id: 'presidents-1-10-vps',
    category: 'Presidents & VPs',
    label: 'Presidents 1–10 with VPs',
    title: 'Presidents 1–10 with VPs',
    lines: getPresidentsWithVPs(1, 10),
  },
  {
    id: 'presidents-1-10-order',
    category: 'Presidents & VPs',
    label: 'Presidents 1–10 in Order',
    title: 'Presidents 1–10 in Order',
    lines: getPresidentsInOrder(1, 10),
  },
  {
    id: 'presidents-11-20-vps',
    category: 'Presidents & VPs',
    label: 'Presidents 11–20 with VPs',
    title: 'Presidents 11–20 with VPs',
    lines: getPresidentsWithVPs(11, 20),
  },
  {
    id: 'presidents-11-20-order',
    category: 'Presidents & VPs',
    label: 'Presidents 11–20 in Order',
    title: 'Presidents 11–20 in Order',
    lines: getPresidentsInOrder(11, 20),
  },
  {
    id: 'presidents-21-30-vps',
    category: 'Presidents & VPs',
    label: 'Presidents 21–30 with VPs',
    title: 'Presidents 21–30 with VPs',
    lines: getPresidentsWithVPs(21, 30),
  },
  {
    id: 'presidents-31-40-vps',
    category: 'Presidents & VPs',
    label: 'Presidents 31–40 with VPs',
    title: 'Presidents 31–40 with VPs',
    lines: getPresidentsWithVPs(31, 40),
  },
  {
    id: 'presidents-41-47-vps',
    category: 'Presidents & VPs',
    label: 'Presidents 41–47 with VPs',
    title: 'Presidents 41–47 with VPs',
    lines: getPresidentsWithVPs(41, 47),
  },
  {
    id: 'presidents-all-vps',
    category: 'Presidents & VPs',
    label: 'Presidents with VPs (All 1–47)',
    title: 'Presidents with Vice Presidents (1–47)',
    lines: getPresidentsWithVPs(1, 47),
  },
  {
    id: 'presidents-all-order',
    category: 'Presidents & VPs',
    label: 'Presidents in Order (All 1–47)',
    title: 'Presidents in Order (1–47)',
    lines: getPresidentsInOrder(1, 47),
  },

  // ==========================================
  // BILL OF RIGHTS (CYCLE 3 WEEK 24 HISTORY)
  // ==========================================
  {
    id: 'bill-of-rights-all',
    category: 'Bill of Rights',
    label: 'The Bill of Rights (Amendments 1–10)',
    title: 'The Bill of Rights (Amendments 1–10)',
    lines: getBillOfRightsSelection(1, 10).lines,
    items: getBillOfRightsSelection(1, 10).items,
  },
  {
    id: 'bill-of-rights-1-5',
    category: 'Bill of Rights',
    label: 'The Bill of Rights (Amendments 1–5)',
    title: 'The Bill of Rights (Amendments 1–5)',
    lines: getBillOfRightsSelection(1, 5).lines,
    items: getBillOfRightsSelection(1, 5).items,
  },
  {
    id: 'bill-of-rights-6-10',
    category: 'Bill of Rights',
    label: 'The Bill of Rights (Amendments 6–10)',
    title: 'The Bill of Rights (Amendments 6–10)',
    lines: getBillOfRightsSelection(6, 10).lines,
    items: getBillOfRightsSelection(6, 10).items,
  },
];

// Ensure every single starter pack has typed WorksheetItem[] with prompts cleanly separated from answers
export const STARTER_PACKS: StarterPack[] = RAW_STARTER_PACKS.map((pack) => {
  const rawItems =
    pack.items && pack.items.length > 0
      ? pack.items
      : pack.lines.map((l) => ({ text: l, type: 'memoryWork' as const }));
  const normalized = normalizeWorksheetItems(rawItems);
  return {
    ...pack,
    lines: normalized.map((it) => it.text),
    items: normalized,
  };
});
