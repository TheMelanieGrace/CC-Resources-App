import { DiagramAnalysis } from '../types';

export interface LibrarySentence {
  id: string;
  pattern: string;
  patternNumber: number;
  label: string;
  sentence: string;
  data: DiagramAnalysis;
}

export const DIAGRAM_LIBRARY: LibrarySentence[] = [
  {
    id: 'pattern-1-s-vi',
    pattern: 'S | Vi',
    patternNumber: 1,
    label: '1. S | Vi: The pony ran quickly.',
    sentence: 'The pony ran quickly.',
    data: {
      clauses: [
        {
          clause: 'The pony ran quickly.',
          pattern: 'S | Vi',
          note: 'Pattern 1: Subject with an intransitive verb. The vertical divider between S and Vi crosses completely through the baseline. No object follows on the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'pony',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'ran',
            modifiers: [{ word: 'quickly' }],
          },
          io: null,
          complements: [],
          kids: {
            pattern_why:
              'Pattern 1 (S | Vi): S stands for Subject and Vi stands for Intransitive Verb. The action "ran" does not transfer to an object. The vertical divider between subject and verb crosses completely through the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'pony', pos: 'N', job: 'S (Subject)' },
              { word: 'ran', pos: 'V', job: 'Vi (Intransitive Verb)' },
              { word: 'quickly', pos: 'AV', job: 'AV (adverb) modifying Vi' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-2-s-vt-do',
    pattern: 'S | Vt | DO',
    patternNumber: 2,
    label: '2. S | Vt | DO: The courageous knights protected the castle.',
    sentence: 'The courageous knights protected the castle.',
    data: {
      clauses: [
        {
          clause: 'The courageous knights protected the castle.',
          pattern: 'S | Vt | DO',
          note: 'Pattern 2: Subject with a transitive verb and direct object. The divider between S and Vt crosses through the baseline; the line before DO is vertical and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'knights',
            modifiers: [{ word: 'The' }, { word: 'courageous' }],
          },
          verb: {
            word: 'protected',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'castle',
              modifiers: [{ word: 'the' }],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 2 (S | Vt | DO): S is Subject, Vt is Transitive Verb, and DO is Direct Object. The knights transfer their protection to the castle. The line before DO is vertical and stops right at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'courageous', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'knights', pos: 'N', job: 'S (Subject)' },
              { word: 'protected', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'castle', pos: 'N', job: 'DO (Direct Object)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-3-s-vl-pn',
    pattern: 'S | Vl \\ PN',
    patternNumber: 3,
    label: '3. S | Vl \\ PN: Jesus is Lord.',
    sentence: 'Jesus is Lord.',
    data: {
      clauses: [
        {
          clause: 'Jesus is Lord.',
          pattern: 'S | Vl \\ PN',
          note: 'Pattern 3: Linking verb connects the subject to a predicate nominative renaming it. The divider before PN is slanted (\\), leaning back toward the subject, and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'Jesus',
            modifiers: [],
          },
          verb: {
            word: 'is',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'PN',
              word: 'Lord',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 3 (S | Vl \\ PN): S is Subject, Vl is Linking Verb, and PN is Predicate Nominative. "Lord" renames Jesus across the linking verb "is". The divider before PN slants backward (\\) toward the subject and stops at the baseline.',
            words: [
              { word: 'Jesus', pos: 'N', job: 'S (Subject)' },
              { word: 'is', pos: 'V', job: 'Vl (Linking Verb)' },
              { word: 'Lord', pos: 'N', job: 'PN (Predicate Nominative)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-4-s-vl-pa',
    pattern: 'S | Vl \\ PA',
    patternNumber: 4,
    label: '4. S | Vl \\ PA: The sweet roses smell wonderful.',
    sentence: 'The sweet roses smell wonderful.',
    data: {
      clauses: [
        {
          clause: 'The sweet roses smell wonderful.',
          pattern: 'S | Vl \\ PA',
          note: 'Pattern 4: Linking verb connects subject to a predicate adjective describing it. The line before PA is slanted (\\), leaning back toward the subject, and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'roses',
            modifiers: [{ word: 'The' }, { word: 'sweet' }],
          },
          verb: {
            word: 'smell',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'PA',
              word: 'wonderful',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 4 (S | Vl \\ PA): S is Subject, Vl is Linking Verb, and PA is Predicate Adjective. "Wonderful" describes the roses across the verb "smell". The divider before PA slants backward (\\) toward the subject and stops at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'sweet', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'roses', pos: 'N', job: 'S (Subject)' },
              { word: 'smell', pos: 'V', job: 'Vl (Linking Verb)' },
              { word: 'wonderful', pos: 'AJ', job: 'PA (Predicate Adjective)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-5-s-vt-io-do',
    pattern: 'S | Vt | IO | DO',
    patternNumber: 5,
    label: '5. S | Vt | IO | DO: The teacher gave the students books.',
    sentence: 'The teacher gave the students books.',
    data: {
      clauses: [
        {
          clause: 'The teacher gave the students books.',
          pattern: 'S | Vt | IO | DO',
          note: 'Pattern 5: Transitive verb with indirect object and direct object on the baseline. The line before IO is vertical and stops at the baseline; the line before DO is also vertical and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'teacher',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'gave',
            modifiers: [],
          },
          io: {
            word: 'students',
            modifiers: [{ word: 'the' }],
          },
          complements: [
            {
              type: 'DO',
              word: 'books',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 5 (S | Vt | IO | DO): S is Subject, Vt is Transitive Verb, IO is Indirect Object, and DO is Direct Object. Books were given (DO) to the students (IO). Per Chart A, the lines before both IO and DO are vertical and stop at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'teacher', pos: 'N', job: 'S (Subject)' },
              { word: 'gave', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying IO' },
              { word: 'students', pos: 'N', job: 'IO (Indirect Object)' },
              { word: 'books', pos: 'N', job: 'DO (Direct Object)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-6-s-vt-do-ocn',
    pattern: 'S | Vt | DO \\ OCN',
    patternNumber: 6,
    label: '6. S | Vt | DO \\ OCN: The class elected Mary president.',
    sentence: 'The class elected Mary president.',
    data: {
      clauses: [
        {
          clause: 'The class elected Mary president.',
          pattern: 'S | Vt | DO \\ OCN',
          note: 'Pattern 6: Transitive verb with direct object and object complement noun renaming it. The line before DO is vertical and stops at the baseline; the line before OCN is slanted (\\), leaning back toward DO, and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'class',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'elected',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'Mary',
              modifiers: [],
            },
            {
              type: 'OCN',
              word: 'president',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 6 (S | Vt | DO \\ OCN): S is Subject, Vt is Transitive Verb, DO is Direct Object, and OCN is Object Complement Noun. President renames Mary (the DO). The divider before OCN slants backward (\\) toward Mary and stops at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'class', pos: 'N', job: 'S (Subject)' },
              { word: 'elected', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'Mary', pos: 'N', job: 'DO (Direct Object)' },
              { word: 'president', pos: 'N', job: 'OCN (Object Complement Noun)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'pattern-7-s-vt-do-oca',
    pattern: 'S | Vt | DO \\ OCA',
    patternNumber: 7,
    label: '7. S | Vt | DO \\ OCA: The sun made the day warm.',
    sentence: 'The sun made the day warm.',
    data: {
      clauses: [
        {
          clause: 'The sun made the day warm.',
          pattern: 'S | Vt | DO \\ OCA',
          note: 'Pattern 7: Transitive verb with direct object and object complement adjective describing it. The line before DO is vertical and stops at baseline; the line before OCA is slanted (\\), leaning back toward DO, and stops at baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'sun',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'made',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'day',
              modifiers: [{ word: 'the' }],
            },
            {
              type: 'OCA',
              word: 'warm',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 7 (S | Vt | DO \\ OCA): S is Subject, Vt is Transitive Verb, DO is Direct Object, and OCA is Object Complement Adjective. "Warm" describes the day after the action. The divider before OCA slants backward (\\) toward "day" and stops at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'sun', pos: 'N', job: 'S (Subject)' },
              { word: 'made', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'day', pos: 'N', job: 'DO (Direct Object)' },
              { word: 'warm', pos: 'AJ', job: 'OCA (Object Complement Adjective)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'prep-phrase-test-sentence',
    pattern: 'S | Vi',
    patternNumber: 1,
    label: 'Practice: Did the eight parts of speech stick in your brain?',
    sentence: 'Did the eight parts of speech stick in your brain?',
    data: {
      clauses: [
        {
          clause: 'Did the eight parts of speech stick in your brain?',
          pattern: 'S | Vi',
          note: 'Pattern 1: Question reordered to Subject (parts) and Verb phrase (Did stick), with prepositional phrases "of speech" modifying the subject and "in your brain" modifying the verb.',
          interjection: null,
          nda: null,
          subject: {
            word: 'parts',
            modifiers: [
              { word: 'the' },
              { word: 'eight' },
              {
                word: 'of',
                prep: {
                  object: {
                    word: 'speech',
                    modifiers: [],
                  },
                },
              },
            ],
          },
          verb: {
            word: 'Did stick',
            modifiers: [
              {
                word: 'in',
                prep: {
                  object: {
                    word: 'brain',
                    modifiers: [{ word: 'your' }],
                  },
                },
              },
            ],
          },
          io: null,
          complements: [],
          kids: {
            pattern_why:
              'Pattern 1 (S | Vi): Subject is "parts" and Verb is "Did stick". The prepositional phrase "of speech" acts as an adjective modifying "parts", and "in your brain" acts as an adverb modifying "Did stick".',
            words: [
              { word: 'Did', pos: 'V', job: 'HV (Helping Verb in verb phrase "Did stick")' },
              { word: 'the', pos: 'AJ', job: 'AJ (Article adjective modifying "parts")' },
              { word: 'eight', pos: 'AJ', job: 'AJ (Adjective modifying "parts")' },
              { word: 'parts', pos: 'N', job: 'S (Subject)' },
              { word: 'of', pos: 'Pr', job: 'Pr (Preposition)' },
              { word: 'speech', pos: 'N', job: 'OP (Object of Preposition)' },
              { word: 'stick', pos: 'V', job: 'Vi (Intransitive Verb, main verb)' },
              { word: 'in', pos: 'Pr', job: 'Pr (Preposition)' },
              { word: 'your', pos: 'P', job: 'Possessive pronoun modifying "brain"' },
              { word: 'brain', pos: 'N', job: 'OP (Object of Preposition)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'expletive-there-was-dog-doo-doo',
    pattern: 'S | Vi',
    patternNumber: 1,
    label: 'Practice: There was dog doo-doo in your yard.',
    sentence: 'There was dog doo-doo in your yard.',
    data: {
      clauses: [
        {
          clause: 'There was dog doo-doo in your yard.',
          pattern: 'S | Vi',
          note: 'Pattern 1: Subject ("doo-doo") with intransitive verb ("was"). The opening "There" is an expletive (placeholder) diagrammed on its own short horizontal line floating above the subject, attached to nothing. The prepositional phrase "in your yard" answers "where?", modifying the verb "was".',
          interjection: null,
          nda: null,
          expletive: 'There',
          subject: {
            word: 'doo-doo',
            modifiers: [{ word: 'dog' }],
          },
          verb: {
            word: 'was',
            modifiers: [
              {
                word: 'in',
                prep: {
                  object: {
                    word: 'yard',
                    modifiers: [{ word: 'your' }],
                  },
                },
              },
            ],
          },
          io: null,
          complements: [],
          kids: {
            pattern_why:
              'Pattern 1 (S | Vi): S stands for Subject ("doo-doo") and Vi stands for Intransitive Verb ("was"). The opening "There" is an expletive placeholder introducing the inverted subject; it has no job in the sentence pattern and floats on its own short horizontal line above the subject. "Dog" is an adjective modifying "doo-doo", and "in your yard" is an adverbial prepositional phrase modifying "was".',
            words: [
              { word: 'There', pos: 'expletive', job: 'placeholder, no job in the sentence pattern.' },
              { word: 'was', pos: 'V', job: 'Vi (Intransitive Verb)' },
              { word: 'dog', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'doo-doo', pos: 'N', job: 'S (Subject)' },
              { word: 'in', pos: 'Pr', job: 'Pr (Preposition)' },
              { word: 'your', pos: 'P', job: 'Possessive pronoun modifying "yard"' },
              { word: 'yard', pos: 'N', job: 'OP (Object of Preposition)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'expletive-there-are-seven-continents',
    pattern: 'S | Vi',
    patternNumber: 1,
    label: 'Practice: There are seven continents.',
    sentence: 'There are seven continents.',
    data: {
      clauses: [
        {
          clause: 'There are seven continents.',
          pattern: 'S | Vi',
          note: 'Pattern 1: Subject ("continents") with intransitive verb ("are"). The opening "There" is an expletive diagrammed on its own short horizontal line floating above the subject, attached to nothing.',
          interjection: null,
          nda: null,
          expletive: 'There',
          subject: {
            word: 'continents',
            modifiers: [{ word: 'seven' }],
          },
          verb: {
            word: 'are',
            modifiers: [],
          },
          io: null,
          complements: [],
          kids: {
            pattern_why:
              'Pattern 1 (S | Vi): S stands for Subject ("continents") and Vi stands for Intransitive Verb ("are"). The opening "There" is an expletive placeholder introducing the inverted sentence; it has no job in the sentence pattern and floats on its own short horizontal line above the subject. "Seven" is an adjective modifying "continents".',
            words: [
              { word: 'There', pos: 'expletive', job: 'placeholder, no job in the sentence pattern.' },
              { word: 'are', pos: 'V', job: 'Vi (Intransitive Verb)' },
              { word: 'seven', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'continents', pos: 'N', job: 'S (Subject)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'adverb-put-the-book-there',
    pattern: 'S | Vt | DO',
    patternNumber: 2,
    label: 'Practice: Put the book there.',
    sentence: 'Put the book there.',
    data: {
      clauses: [
        {
          clause: 'Put the book there.',
          pattern: 'S | Vt | DO',
          note: 'Pattern 2: Imperative command with understood subject "(you)" and direct object ("book"). Here "there" is a real adverb of place modifying "Put", diagrammed on a slanted line under the verb.',
          interjection: null,
          nda: null,
          expletive: null,
          subject: {
            word: '(you)',
            modifiers: [],
          },
          verb: {
            word: 'Put',
            modifiers: [{ word: 'there' }],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'book',
              modifiers: [{ word: 'the' }],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 2 (S | Vt | DO): S is understood "(you)", Vt is Transitive Verb "Put", and DO is Direct Object "book". "There" is a true adverb telling where to put the book, modifying "Put" on a slanted line beneath the verb.',
            words: [
              { word: '(you)', pos: 'P', job: 'S (Subject, understood you)' },
              { word: 'Put', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'book', pos: 'N', job: 'DO (Direct Object)' },
              { word: 'there', pos: 'AV', job: 'AV (adverb) modifying Vt' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
];

export const PRACTICE_SENTENCES: LibrarySentence[] = [
  {
    id: 'practice-1-s-vi-baby-laughed',
    pattern: 'S | Vi',
    patternNumber: 1,
    label: 'S | Vi: The baby laughed.',
    sentence: 'The baby laughed.',
    data: {
      clauses: [
        {
          clause: 'The baby laughed.',
          pattern: 'S | Vi',
          note: 'Pattern 1: Subject ("baby") with an intransitive verb ("laughed"). The divider between subject and verb crosses completely through the baseline. No object follows on the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'baby',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'laughed',
            modifiers: [],
          },
          io: null,
          complements: [],
          kids: {
            pattern_why:
              'Pattern 1 (S | Vi): S stands for Subject and Vi stands for Intransitive Verb. The action "laughed" does not transfer to an object. The vertical divider between subject and verb crosses completely through the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'baby', pos: 'N', job: 'S (Subject)' },
              { word: 'laughed', pos: 'V', job: 'Vi (Intransitive Verb)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-2-s-vt-io-do-mom-told-me',
    pattern: 'S | Vt | IO | DO',
    patternNumber: 5,
    label: 'S | Vt | IO | DO: My mom told me a story.',
    sentence: 'My mom told me a story.',
    data: {
      clauses: [
        {
          clause: 'My mom told me a story.',
          pattern: 'S | Vt | IO | DO',
          note: 'Pattern 5: Transitive verb ("told") with indirect object ("me") and direct object ("story") on the baseline. The dividers before IO and DO are both vertical and stop at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'mom',
            modifiers: [{ word: 'My' }],
          },
          verb: {
            word: 'told',
            modifiers: [],
          },
          io: {
            word: 'me',
            modifiers: [],
          },
          complements: [
            {
              type: 'DO',
              word: 'story',
              modifiers: [{ word: 'a' }],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 5 (S | Vt | IO | DO): S is Subject ("mom"), Vt is Transitive Verb ("told"), IO is Indirect Object ("me"), and DO is Direct Object ("story"). A story was told (DO) to me (IO). The dividers before both IO and DO are vertical and stop at the baseline.',
            words: [
              { word: 'My', pos: 'P / AJ', job: 'Possessive pronoun modifying S' },
              { word: 'mom', pos: 'N', job: 'S (Subject)' },
              { word: 'told', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'me', pos: 'P', job: 'IO (Indirect Object)' },
              { word: 'a', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'story', pos: 'N', job: 'DO (Direct Object)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-3-s-vt-do-boy-kicked-ball',
    pattern: 'S | Vt | DO',
    patternNumber: 2,
    label: 'S | Vt | DO: The boy kicked the ball.',
    sentence: 'The boy kicked the ball.',
    data: {
      clauses: [
        {
          clause: 'The boy kicked the ball.',
          pattern: 'S | Vt | DO',
          note: 'Pattern 2: Subject ("boy") with transitive verb ("kicked") and direct object ("ball"). The divider before DO is vertical and stops right at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'boy',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'kicked',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'ball',
              modifiers: [{ word: 'the' }],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 2 (S | Vt | DO): S is Subject ("boy"), Vt is Transitive Verb ("kicked"), and DO is Direct Object ("ball"). The boy transfers action to the ball. The line before DO is vertical and stops right at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'boy', pos: 'N', job: 'S (Subject)' },
              { word: 'kicked', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'ball', pos: 'N', job: 'DO (Direct Object)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-4-s-vl-pn-george-washington',
    pattern: 'S | Vl | PN',
    patternNumber: 3,
    label: 'S | Vl | PN: George Washington was our first president.',
    sentence: 'George Washington was our first president.',
    data: {
      clauses: [
        {
          clause: 'George Washington was our first president.',
          pattern: 'S | Vl \\ PN',
          note: 'Pattern 3: Linking verb ("was") connects subject ("George Washington") to predicate nominative ("president") renaming it. The divider before PN is slanted (\\) leaning toward the subject and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'George Washington',
            modifiers: [],
          },
          verb: {
            word: 'was',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'PN',
              word: 'president',
              modifiers: [{ word: 'our' }, { word: 'first' }],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 3 (S | Vl \\ PN): S is Subject ("George Washington"), Vl is Linking Verb ("was"), and PN is Predicate Nominative ("president"). "President" renames George Washington across the linking verb "was". The divider before PN slants backward (\\) toward the subject and stops at the baseline.',
            words: [
              { word: 'George Washington', pos: 'N', job: 'S (Subject, proper noun)' },
              { word: 'was', pos: 'V', job: 'Vl (Linking Verb)' },
              { word: 'our', pos: 'P / AJ', job: 'Possessive pronoun modifying PN' },
              { word: 'first', pos: 'AJ', job: 'AJ (adjective) modifying PN' },
              { word: 'president', pos: 'N', job: 'PN (Predicate Nominative)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-5-s-vl-pa-latin-words',
    pattern: 'S | Vl | PA',
    patternNumber: 4,
    label: 'S | Vl | PA: The Latin words are easy.',
    sentence: 'The Latin words are easy.',
    data: {
      clauses: [
        {
          clause: 'The Latin words are easy.',
          pattern: 'S | Vl \\ PA',
          note: 'Pattern 4: Linking verb ("are") connects subject ("words") to predicate adjective ("easy") describing it. The divider before PA is slanted (\\) leaning toward the subject and stops at the baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'words',
            modifiers: [{ word: 'The' }, { word: 'Latin' }],
          },
          verb: {
            word: 'are',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'PA',
              word: 'easy',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 4 (S | Vl \\ PA): S is Subject ("words"), Vl is Linking Verb ("are"), and PA is Predicate Adjective ("easy"). "Easy" describes the words across the linking verb. The divider before PA slants backward (\\) toward the subject and stops at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'Latin', pos: 'AJ', job: 'AJ (proper adjective) modifying S' },
              { word: 'words', pos: 'N', job: 'S (Subject)' },
              { word: 'are', pos: 'V', job: 'Vl (Linking Verb)' },
              { word: 'easy', pos: 'AJ', job: 'PA (Predicate Adjective)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-6-s-vt-do-ocn-elected-lincoln',
    pattern: 'S | Vt | DO | OCN',
    patternNumber: 6,
    label: 'S | Vt | DO | OCN: We elected Lincoln president.',
    sentence: 'We elected Lincoln president.',
    data: {
      clauses: [
        {
          clause: 'We elected Lincoln president.',
          pattern: 'S | Vt | DO \\ OCN',
          note: 'Pattern 6: Transitive verb ("elected") with direct object ("Lincoln") and object complement noun ("president") renaming it. The divider before DO is vertical and stops at baseline; the divider before OCN is slanted (\\) leaning toward DO and stops at baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'We',
            modifiers: [],
          },
          verb: {
            word: 'elected',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'Lincoln',
              modifiers: [],
            },
            {
              type: 'OCN',
              word: 'president',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 6 (S | Vt | DO \\ OCN): S is Subject ("We"), Vt is Transitive Verb ("elected"), DO is Direct Object ("Lincoln"), and OCN is Object Complement Noun ("president"). President renames Lincoln. The divider before OCN slants backward (\\) toward Lincoln and stops at the baseline.',
            words: [
              { word: 'We', pos: 'P', job: 'S (Subject)' },
              { word: 'elected', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'Lincoln', pos: 'N', job: 'DO (Direct Object)' },
              { word: 'president', pos: 'N', job: 'OCN (Object Complement Noun)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
  {
    id: 'practice-7-s-vt-do-oca-painted-map-blue',
    pattern: 'S | Vt | DO | OCA',
    patternNumber: 7,
    label: 'S | Vt | DO | OCA: The students painted the map blue.',
    sentence: 'The students painted the map blue.',
    data: {
      clauses: [
        {
          clause: 'The students painted the map blue.',
          pattern: 'S | Vt | DO \\ OCA',
          note: 'Pattern 7: Transitive verb ("painted") with direct object ("map") and object complement adjective ("blue") describing it. The divider before DO is vertical and stops at baseline; the divider before OCA is slanted (\\) leaning toward DO and stops at baseline.',
          interjection: null,
          nda: null,
          subject: {
            word: 'students',
            modifiers: [{ word: 'The' }],
          },
          verb: {
            word: 'painted',
            modifiers: [],
          },
          io: null,
          complements: [
            {
              type: 'DO',
              word: 'map',
              modifiers: [{ word: 'the' }],
            },
            {
              type: 'OCA',
              word: 'blue',
              modifiers: [],
            },
          ],
          kids: {
            pattern_why:
              'Pattern 7 (S | Vt | DO \\ OCA): S is Subject ("students"), Vt is Transitive Verb ("painted"), DO is Direct Object ("map"), and OCA is Object Complement Adjective ("blue"). "Blue" describes the map as a result of the painting. The divider before OCA slants backward (\\) toward map and stops at the baseline.',
            words: [
              { word: 'The', pos: 'AJ', job: 'AJ (adjective) modifying S' },
              { word: 'students', pos: 'N', job: 'S (Subject)' },
              { word: 'painted', pos: 'V', job: 'Vt (Transitive Verb)' },
              { word: 'the', pos: 'AJ', job: 'AJ (adjective) modifying DO' },
              { word: 'map', pos: 'N', job: 'DO (Direct Object)' },
              { word: 'blue', pos: 'AJ', job: 'OCA (Object Complement Adjective)' },
            ],
          },
        },
      ],
      split_note: null,
    },
  },
];
