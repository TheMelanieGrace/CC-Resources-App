// Spelling lists (grades 2-5) and homophone sets.
// Original content authored for CC Classroom Tools by Melanie + Claude (Nov 2026).
// Lists follow a classical phonics-to-morphology progression; grade 5 leans into
// Latin and Greek roots to pair with the Latin strand.

export interface SpellingList {
  id: string;
  name: string;
  tip: string; // the pattern, in kid language
  words: string[];
}

export const SPELLING_LISTS: Record<2 | 3 | 4 | 5, SpellingList[]> = {
  2: [
    { id: 'g2-1', name: 'Short a and e', tip: 'Short vowels say their quick sound: a as in cat, e as in bed.', words: ['cat', 'map', 'ran', 'bag', 'hand', 'bed', 'pen', 'leg', 'nest', 'went'] },
    { id: 'g2-2', name: 'Short i, o, and u', tip: 'Quick sounds again: i as in sit, o as in top, u as in cup.', words: ['sit', 'win', 'dig', 'top', 'box', 'hop', 'cup', 'run', 'bug', 'jump'] },
    { id: 'g2-3', name: 'Beginning blends', tip: 'Two consonants that each keep their sound: st, pl, tr, gr.', words: ['stop', 'step', 'plan', 'plus', 'trip', 'tree', 'grab', 'grin', 'flag', 'swim'] },
    { id: 'g2-4', name: 'sh and ch', tip: 'Two letters, one new sound: sh as in ship, ch as in chin.', words: ['ship', 'shop', 'fish', 'wish', 'chin', 'chop', 'much', 'lunch', 'shell', 'chest'] },
    { id: 'g2-5', name: 'th and wh', tip: 'th as in this and thin; wh asks questions: when, which.', words: ['this', 'that', 'thin', 'with', 'bath', 'when', 'which', 'white', 'whale', 'think'] },
    { id: 'g2-6', name: 'Magic e with a', tip: 'Silent e makes the vowel say its name: can becomes cane.', words: ['make', 'cake', 'name', 'game', 'late', 'gate', 'save', 'wave', 'plane', 'grape'] },
    { id: 'g2-7', name: 'Magic e with i and o', tip: 'Same trick: rid becomes ride, hop becomes hope.', words: ['ride', 'time', 'fine', 'bike', 'smile', 'hope', 'home', 'bone', 'rope', 'stone'] },
    { id: 'g2-8', name: 'ee and ea', tip: 'Two vowels go walking: ee and ea both say long e.', words: ['see', 'tree', 'feet', 'keep', 'sleep', 'eat', 'read', 'team', 'clean', 'beach'] },
    { id: 'g2-9', name: 'ai and ay', tip: 'Long a two ways: ai in the middle, ay at the end.', words: ['rain', 'mail', 'tail', 'wait', 'train', 'day', 'play', 'stay', 'away', 'today'] },
    { id: 'g2-10', name: 'oa and ow', tip: 'Long o two ways: oa in the middle, ow often at the end.', words: ['boat', 'coat', 'road', 'soap', 'toast', 'snow', 'grow', 'show', 'slow', 'yellow'] },
    { id: 'g2-11', name: 'Plurals', tip: 'Add s for more than one; add es after s, x, ch, or sh.', words: ['cats', 'dogs', 'books', 'hands', 'boxes', 'dishes', 'wishes', 'benches', 'foxes', 'classes'] },
    { id: 'g2-12', name: 'ing and ed', tip: 'ing means happening now; ed means it already happened.', words: ['jumping', 'playing', 'reading', 'going', 'looking', 'jumped', 'played', 'looked', 'wanted', 'helped'] },
  ],
  3: [
    { id: 'g3-1', name: 'ar and or', tip: 'Bossy r changes the vowel: ar as in car, or as in corn.', words: ['car', 'farm', 'star', 'hard', 'party', 'corn', 'fort', 'storm', 'north', 'morning'] },
    { id: 'g3-2', name: 'er, ir, and ur', tip: 'Three spellings, one sound: her, bird, turn.', words: ['her', 'fern', 'under', 'bird', 'girl', 'first', 'turn', 'hurt', 'nurse', 'Thursday'] },
    { id: 'g3-3', name: 'The two oo sounds', tip: 'oo can say moon or book; listen closely.', words: ['moon', 'food', 'room', 'school', 'smooth', 'book', 'look', 'good', 'stood', 'wood'] },
    { id: 'g3-4', name: 'ou and ow', tip: 'The ouch sound: loud and cow both shout it.', words: ['out', 'loud', 'found', 'house', 'mouth', 'cow', 'down', 'town', 'brown', 'flower'] },
    { id: 'g3-5', name: 'oi and oy', tip: 'oi in the middle, oy at the end: coin, enjoy.', words: ['oil', 'coin', 'join', 'point', 'voice', 'boy', 'toy', 'joy', 'enjoy', 'royal'] },
    { id: 'g3-6', name: 'aw and au', tip: 'The aw sound: saw, because, August.', words: ['saw', 'draw', 'straw', 'lawn', 'crawl', 'haul', 'fault', 'because', 'author', 'August'] },
    { id: 'g3-7', name: 'Compound words', tip: 'Two small words shake hands and make one.', words: ['sunshine', 'rainbow', 'bedtime', 'baseball', 'popcorn', 'cupcake', 'homework', 'birthday', 'outside', 'grandmother'] },
    { id: 'g3-8', name: 'Y at the end', tip: 'Y says long i in dry, long e in happy.', words: ['dry', 'fly', 'sky', 'try', 'why', 'happy', 'funny', 'story', 'family', 'twenty'] },
    { id: 'g3-9', name: 'le endings', tip: 'The consonant-plus-le ending: lit-tle, ta-ble.', words: ['little', 'table', 'apple', 'purple', 'middle', 'candle', 'turtle', 'simple', 'uncle', 'people'] },
    { id: 'g3-10', name: 'Prefixes un and re', tip: 'un means not; re means do it again.', words: ['unhappy', 'unkind', 'unlock', 'unfair', 'untie', 'redo', 'reread', 'rewrite', 'return', 'retell'] },
    { id: 'g3-11', name: 'Suffixes ful and less', tip: 'ful means full of; less means without.', words: ['helpful', 'careful', 'thankful', 'cheerful', 'useful', 'careless', 'fearless', 'helpless', 'spotless', 'endless'] },
    { id: 'g3-12', name: 'Tricky past tense', tip: 'Some verbs change completely instead of adding ed.', words: ['said', 'went', 'came', 'made', 'found', 'told', 'wrote', 'took', 'knew', 'thought'] },
  ],
  4: [
    { id: 'g4-1', name: 'Soft c and g', tip: 'Before e, i, or y: c says s (city) and g says j (giant).', words: ['city', 'circle', 'center', 'pencil', 'office', 'giant', 'gentle', 'magic', 'cage', 'bridge'] },
    { id: 'g4-2', name: 'Silent letters', tip: 'Some letters hide: kn, wr, mb, and gh say nothing.', words: ['knee', 'knife', 'know', 'knock', 'write', 'wrong', 'wrist', 'climb', 'thumb', 'night'] },
    { id: 'g4-3', name: 'tion endings', tip: 'tion says shun: nation, question.', words: ['nation', 'station', 'action', 'question', 'addition', 'fraction', 'attention', 'direction', 'vacation', 'invention'] },
    { id: 'g4-4', name: 'sion endings', tip: 'sion also says shun, or sometimes zhun: mission, division.', words: ['mission', 'session', 'passion', 'division', 'decision', 'television', 'confusion', 'explosion', 'permission', 'discussion'] },
    { id: 'g4-5', name: 'ture endings', tip: 'ture says chur: picture, nature.', words: ['picture', 'nature', 'future', 'capture', 'culture', 'mixture', 'creature', 'adventure', 'furniture', 'temperature'] },
    { id: 'g4-6', name: 'Double before ing', tip: 'Short vowel, one consonant: double it before ing or ed (run, running).', words: ['running', 'sitting', 'swimming', 'stopping', 'hopping', 'clapped', 'dropped', 'planned', 'shopping', 'beginning'] },
    { id: 'g4-7', name: 'ie and ei', tip: 'i before e, except after c, or when it says long a as in neighbor.', words: ['believe', 'field', 'piece', 'friend', 'chief', 'receive', 'ceiling', 'eight', 'weigh', 'neighbor'] },
    { id: 'g4-8', name: 'ous endings', tip: 'ous means full of: dangerous means full of danger.', words: ['famous', 'nervous', 'dangerous', 'enormous', 'curious', 'serious', 'various', 'jealous', 'generous', 'mysterious'] },
    { id: 'g4-9', name: 'ment and ness', tip: 'ment and ness turn actions and feelings into nouns.', words: ['moment', 'payment', 'movement', 'agreement', 'government', 'kindness', 'darkness', 'illness', 'weakness', 'happiness'] },
    { id: 'g4-10', name: 'Contractions', tip: 'The apostrophe stands where letters left: do not becomes don’t.', words: ["don't", "can't", "won't", "isn't", "didn't", "it's", "I'm", "we're", "they're", "you're"] },
    { id: 'g4-11', name: 'Longer closed syllables', tip: 'Break big words into syllables, then spell each part.', words: ['basket', 'sudden', 'problem', 'contest', 'public', 'napkin', 'index', 'rabbit', 'traffic', 'until'] },
    { id: 'g4-12', name: 'Often misspelled', tip: 'Words that love to trick people; picture them before you write.', words: ['again', 'always', 'because', 'before', 'favorite', 'really', 'together', 'tomorrow', 'different', 'beautiful'] },
  ],
  5: [
    { id: 'g5-1', name: 'Latin root port', tip: 'port means to carry: transport carries across.', words: ['port', 'export', 'import', 'report', 'transport', 'portable', 'porter', 'support', 'reporter', 'important'] },
    { id: 'g5-2', name: 'Latin roots dict and scrib', tip: 'dict means say; scrib and script mean write.', words: ['dictate', 'predict', 'verdict', 'dictionary', 'contradict', 'scribble', 'describe', 'inscribe', 'manuscript', 'prescription'] },
    { id: 'g5-3', name: 'Greek roots photo and graph', tip: 'photo means light; graph means write or draw.', words: ['photo', 'photograph', 'photography', 'graph', 'paragraph', 'autograph', 'biography', 'geography', 'telegraph', 'phonograph'] },
    { id: 'g5-4', name: 'Greek roots tele and micro', tip: 'tele means far away; micro means tiny.', words: ['telephone', 'television', 'telescope', 'telegram', 'microphone', 'microscope', 'microwave', 'microbe', 'telepathy', 'microchip'] },
    { id: 'g5-5', name: 'able and ible', tip: 'Both mean can be done: readable, visible.', words: ['comfortable', 'enjoyable', 'reasonable', 'valuable', 'remarkable', 'possible', 'terrible', 'horrible', 'visible', 'responsible'] },
    { id: 'g5-6', name: 'ant and ent', tip: 'Listen fails here; memory wins: servant but student.', words: ['servant', 'distant', 'instant', 'important', 'elegant', 'student', 'moment', 'different', 'excellent', 'confident'] },
    { id: 'g5-7', name: 'The ough puzzle', tip: 'One spelling, many sounds: though, through, thought.', words: ['though', 'through', 'thought', 'brought', 'bought', 'enough', 'rough', 'tough', 'cough', 'although'] },
    { id: 'g5-8', name: 'ch that says k', tip: 'Greek words spell k with ch: school, echo, chorus.', words: ['school', 'echo', 'chorus', 'character', 'chemistry', 'stomach', 'anchor', 'orchestra', 'mechanic', 'Christmas'] },
    { id: 'g5-9', name: 'cial and tial', tip: 'Both say shul: special, essential.', words: ['special', 'social', 'official', 'artificial', 'commercial', 'essential', 'partial', 'initial', 'potential', 'confidential'] },
    { id: 'g5-10', name: 'Prefixes pre and pro', tip: 'pre means before; pro means forward or for.', words: ['prepare', 'prevent', 'predict', 'preview', 'prefix', 'protect', 'produce', 'program', 'project', 'promote'] },
    { id: 'g5-11', name: 'Double trouble', tip: 'Big words with double letters; spell them syllable by syllable.', words: ['beginning', 'committee', 'necessary', 'different', 'difficult', 'possess', 'address', 'success', 'occurred', 'disappear'] },
    { id: 'g5-12', name: 'Champion words', tip: 'The classics of spelling bees and book reports.', words: ['separate', 'definitely', 'probably', 'restaurant', 'library', 'February', 'Wednesday', 'surprise', 'knowledge', 'rhythm'] },
  ],
};

export interface HomophoneSet {
  words: { word: string; meaning: string }[];
  sentence: string; // one traceable example using at least two of the set
}

export const HOMOPHONE_SETS: HomophoneSet[] = [
  { words: [{ word: 'their', meaning: 'belongs to them' }, { word: 'there', meaning: 'a place' }, { word: "they're", meaning: 'they are' }], sentence: "They're putting their books over there." },
  { words: [{ word: 'to', meaning: 'toward; part of a verb' }, { word: 'too', meaning: 'also, or too much' }, { word: 'two', meaning: 'the number 2' }], sentence: 'The two of us want to come too.' },
  { words: [{ word: 'its', meaning: 'belongs to it' }, { word: "it's", meaning: 'it is' }], sentence: "It's time for the dog to find its bone." },
  { words: [{ word: 'your', meaning: 'belongs to you' }, { word: "you're", meaning: 'you are' }], sentence: "You're going to love your new book." },
  { words: [{ word: 'hear', meaning: 'with your ears' }, { word: 'here', meaning: 'this place' }], sentence: 'Come here so you can hear the music.' },
  { words: [{ word: 'see', meaning: 'with your eyes' }, { word: 'sea', meaning: 'the ocean' }], sentence: 'I can see the sea from the hill.' },
  { words: [{ word: 'write', meaning: 'with a pencil' }, { word: 'right', meaning: 'correct, or the opposite of left' }], sentence: 'Write the right answer on the line.' },
  { words: [{ word: 'knight', meaning: 'a soldier in armor' }, { word: 'night', meaning: 'when it is dark' }], sentence: 'The knight rode home at night.' },
  { words: [{ word: 'one', meaning: 'the number 1' }, { word: 'won', meaning: 'did win' }], sentence: 'Only one team won the game.' },
  { words: [{ word: 'ate', meaning: 'did eat' }, { word: 'eight', meaning: 'the number 8' }], sentence: 'My brother ate eight grapes.' },
  { words: [{ word: 'flour', meaning: 'for baking bread' }, { word: 'flower', meaning: 'grows in a garden' }], sentence: 'She drew a flower with flour on the counter.' },
  { words: [{ word: 'would', meaning: 'the helping verb' }, { word: 'wood', meaning: 'what trees are made of' }], sentence: 'Would you stack the wood by the door?' },
  { words: [{ word: 'know', meaning: 'to understand' }, { word: 'no', meaning: 'the opposite of yes' }], sentence: 'I know there is no school today.' },
  { words: [{ word: 'knew', meaning: 'did know' }, { word: 'new', meaning: 'not old' }], sentence: 'She knew the new student was shy.' },
  { words: [{ word: 'our', meaning: 'belongs to us' }, { word: 'hour', meaning: 'sixty minutes' }], sentence: 'Our lesson lasts one hour.' },
  { words: [{ word: 'by', meaning: 'next to, or made by' }, { word: 'buy', meaning: 'to pay for' }, { word: 'bye', meaning: 'short for goodbye' }], sentence: 'Stand by me while I buy the tickets.' },
  { words: [{ word: 'meat', meaning: 'food from animals' }, { word: 'meet', meaning: 'to come together' }], sentence: 'We will meet at the meat counter.' },
  { words: [{ word: 'son', meaning: 'a boy child' }, { word: 'sun', meaning: 'the star in our sky' }], sentence: 'Her son played outside in the sun.' },
  { words: [{ word: 'tale', meaning: 'a story' }, { word: 'tail', meaning: 'on the back of an animal' }], sentence: 'The tale was about a fox with a fluffy tail.' },
  { words: [{ word: 'weak', meaning: 'not strong' }, { word: 'week', meaning: 'seven days' }], sentence: 'He felt weak for a whole week.' },
];
