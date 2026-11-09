// Grammar helper notes for Cycle 3 English weeks.
// Kid-level definitions of the labels on each worksheet, each with a real example.
// Written by Melanie + Claude (Nov 2026). Verified against the guide's own forms.

export interface EnglishHelpNote {
  term: string;
  note: string;
}

const FIVE_PARTS = (
  verb: string,
  present: string,
  past: string,
  presPart: string,
  pastPart: string
): EnglishHelpNote[] => [
  { term: 'Infinitive', note: `The verb's name: "to" plus the verb (${verb}).` },
  { term: 'Present', note: `Happening now (${present}).` },
  { term: 'Past', note: `Already happened (${past}).` },
  { term: 'Present participle', note: `The "-ing" form, used with am/is/are (${presPart}).` },
  { term: 'Past participle', note: `The form used with have/has/had (${pastPart}).` },
];

export const CYCLE_3_ENGLISH_HELPS: Record<number, EnglishHelpNote[]> = {
  1: [
    { term: 'Examples', note: 'to run, to sing, to be.' },
    { term: 'Try it', note: '"I love to read." The infinitive "to read" names the action.' },
  ],
  2: [
    { term: 'Examples', note: 'running, singing, jumping.' },
    { term: 'Try it', note: '"The running water" and "I am running" both use a present participle.' },
  ],
  3: [
    { term: 'Examples', note: 'jumped, baked, painted.' },
    { term: 'Try it', note: '"I have jumped" and "the baked bread" both use a past participle.' },
  ],
  4: [
    { term: 'Conjugate', note: 'To say all the forms of a verb in order.' },
    ...FIVE_PARTS('to jump', 'I jump, she jumps', 'I jumped yesterday', 'I am jumping', 'I have jumped'),
  ],
  5: FIVE_PARTS('to be', 'I am, she is, they are', 'I was, they were', 'being', 'I have been'),
  6: FIVE_PARTS('to do', 'I do, she does', 'I did it', 'I am doing it', 'I have done it'),
  7: [
    { term: 'Rise vs. raise', note: 'Rise means to go up on its own: "The sun rises."' },
    ...FIVE_PARTS('to rise', 'I rise, the sun rises', 'The sun rose', 'The dough is rising', 'The sun has risen'),
  ],
  8: [
    { term: 'Raise vs. rise', note: 'Raise means to lift something else: "I raise my hand."' },
    ...FIVE_PARTS('to raise', 'I raise my hand', 'I raised my hand', 'I am raising my hand', 'I have raised my hand'),
  ],
  9: [
    { term: 'Lay vs. lie', note: 'Lay means to put something down: "I lay the book on the desk."' },
    ...FIVE_PARTS('to lay', 'I lay the book down', 'I laid it down yesterday', 'I am laying it down', 'I have laid it down'),
  ],
  10: [
    { term: 'Lie vs. lay', note: 'Lie means to rest or recline yourself: "I lie down for a nap."' },
    ...FIVE_PARTS('to lie', 'I lie down', 'Yesterday I lay down', 'I am lying down', 'I have lain down'),
  ],
  11: [
    { term: 'Set vs. sit', note: 'Set means to put something somewhere: "Set the table."' },
    ...FIVE_PARTS('to set', 'I set the cup down', 'I set it down yesterday', 'I am setting it down', 'I have set it down'),
  ],
  12: [
    { term: 'Sit vs. set', note: 'Sit means to seat yourself: "I sit in my chair."' },
    ...FIVE_PARTS('to sit', 'I sit, she sits', 'I sat down', 'I am sitting', 'I have sat here before'),
  ],
  13: FIVE_PARTS('to beat', 'I beat the drum', 'I beat the drum yesterday', 'I am beating the drum', 'I have beaten the drum'),
  14: FIVE_PARTS('to break', 'I break, it breaks', 'It broke', 'It is breaking', 'It has broken'),
  15: FIVE_PARTS('to write', 'I write, she writes', 'I wrote a letter', 'I am writing', 'I have written'),
  16: FIVE_PARTS('to go', 'I go, she goes', 'I went home', 'I am going', 'I have gone'),
  17: [
    { term: 'Example', note: '"The dog barked." Who barked? The dog. That is the subject.' },
  ],
  18: [
    { term: 'Example', note: '"The dog barked loudly." The predicate tells what the dog did.' },
  ],
  19: [
    { term: 'Example', note: '"because the dog barked" is a clause: subject (dog) plus verb (barked).' },
  ],
  20: [
    { term: 'Example', note: '"The dog barked." It is a complete sentence all by itself.' },
  ],
  21: [
    { term: 'Example', note: '"because the dog barked" leaves you waiting for more; it cannot stand alone.' },
  ],
  22: [
    { term: 'Example', note: '"down the street" is a phrase: no subject doing a verb.' },
  ],
  23: [
    { term: 'Simple', note: 'One complete thought: "The dog barked."' },
    { term: 'Compound', note: 'Two complete thoughts joined: "The dog barked, and the cat ran."' },
    { term: 'Complex', note: 'A complete thought plus a dependent one: "When the dog barked, the cat ran."' },
    { term: 'Compound-complex', note: '"When the dog barked, the cat ran, and I laughed."' },
  ],
  24: [
    { term: 'S-Vi', note: 'The baby laughed.' },
    { term: 'S-Vt-DO', note: 'The boy kicked the ball.' },
    { term: 'S-Vl-PN', note: 'George Washington was our first president.' },
    { term: 'S-Vl-PA', note: 'The Latin words are easy.' },
    { term: 'S-Vt-IO-DO', note: 'My mom told me a story.' },
    { term: 'S-Vt-DO-OCN', note: 'We elected Lincoln president.' },
    { term: 'S-Vt-DO-OCA', note: 'The students painted the map blue.' },
  ],
};

export function getEnglishHelpNotes(
  cycle: number,
  week: number
): EnglishHelpNote[] | undefined {
  if (cycle !== 3) return undefined;
  return CYCLE_3_ENGLISH_HELPS[week];
}
