/**
 * Classical Conversations Memory Masters Bible Memory Work (Cycles 1, 2, 3)
 *
 * Source: "Bible Memory Work Model for Families" created by Carol Eichert (Foundations Community Director from Ohio).
 * Transcribed verbatim from the 3-cycle, 24-week Memory Master Bible sheets.
 * Cycle 1: "Creation to Moses"
 * Cycle 2: "Judges to Jesus"
 * Cycle 3: "Gospels to Revelation and Books of the Bible"
 *
 * Universal prompt/answer rule:
 * - The question/prompt is rendered as a small untraced prompt line.
 * - The answer lines are traceable memory work on guide lines, numbered as printed.
 * - Continuing weeks without a new question receive the previous question + "(continued)" as their prompt.
 */

export interface BibleWeekEntry {
  week: number;
  cycle: 1 | 2 | 3;
  heading: string;
  question: string;
  prompt: string;
  lines: string[];
}

export const CYCLE_1_BIBLE_WEEKS: Record<number, BibleWeekEntry> = {
  1: {
    week: 1,
    cycle: 1,
    heading: 'Creation: Days 1–3',
    question: 'What did God create on Days 1, 2, 3?',
    prompt: 'What did God create on Days 1, 2, 3?',
    lines: [
      'Day 1: Earth, space, time, and light',
      'Day 2: Atmosphere',
      'Day 3: Dry land and plants',
    ],
  },
  2: {
    week: 2,
    cycle: 1,
    heading: 'Creation: Days 4–6',
    question: 'What did God create on Days 4, 5, 6?',
    prompt: 'What did God create on Days 4, 5, 6?',
    lines: [
      'Day 4: Sun, moon, stars',
      'Day 5: Fish, sea creatures, birds',
      'Day 6: Land animals, man, woman',
    ],
  },
  3: {
    week: 3,
    cycle: 1,
    heading: 'God’s Covenant with Adam',
    question: 'What was God’s covenant with Adam after Adam and Eve sinned in the garden?',
    prompt: 'What was God’s covenant with Adam after Adam and Eve sinned in the garden?',
    lines: ['To send a Redeemer to the world'],
  },
  4: {
    week: 4,
    cycle: 1,
    heading: 'Noah',
    question: 'Who was Noah?',
    prompt: 'Who was Noah?',
    lines: [
      'Noah saved his family from the Great Flood by building an ark at God’s command.',
    ],
  },
  5: {
    week: 5,
    cycle: 1,
    heading: 'God’s Covenant with Noah',
    question: 'What was God’s covenant with Noah?',
    prompt: 'What was God’s covenant with Noah?',
    lines: [
      'A promise to save Noah’s family',
      'A command to be fruitful and multiply',
      'A promise to never destroy the human race by a world-wide flood again.',
    ],
  },
  6: {
    week: 6,
    cycle: 1,
    heading: 'Tower of Babel',
    question: 'People spoke one language until what major historical event?',
    prompt: 'People spoke one language until what major historical event?',
    lines: ['The Tower of Babel'],
  },
  7: {
    week: 7,
    cycle: 1,
    heading: 'God’s Covenant with Abraham',
    question: 'What was God’s covenant with Abraham?',
    prompt: 'What was God’s covenant with Abraham?',
    lines: [
      'The promise of land',
      'The promise of descendants',
      'The promise of blessing and redemption',
    ],
  },
  8: {
    week: 8,
    cycle: 1,
    heading: 'Job',
    question: 'Who was Job?',
    prompt: 'Who was Job?',
    lines: [
      'Job was a God-fearing man who endured Satan’s destruction of his family and wealth as God demonstrated His authority during his suffering.',
    ],
  },
  9: {
    week: 9,
    cycle: 1,
    heading: 'Ishmael’s Descendants',
    question: 'The Arab people came through whom?',
    prompt: 'The Arab people came through whom?',
    lines: ['Abraham’s son Ishmael'],
  },
  10: {
    week: 10,
    cycle: 1,
    heading: 'Isaac’s Descendants',
    question: 'The Jewish people came through whom?',
    prompt: 'The Jewish people came through whom?',
    lines: ['Abraham’s son Isaac'],
  },
  11: {
    week: 11,
    cycle: 1,
    heading: 'Esau & Jacob',
    question: 'What are the names of Isaac’s two sons?',
    prompt: 'What are the names of Isaac’s two sons?',
    lines: ['Esau', 'Jacob, who was also called Israel'],
  },
  12: {
    week: 12,
    cycle: 1,
    heading: '12 Sons/Tribes of Israel (Part 1)',
    question: 'Who are the twelve sons of Israel, for which the twelve tribes are named?',
    prompt: 'Who are the twelve sons of Israel, for which the twelve tribes are named?',
    lines: ['Reuben', 'Simeon', 'Levi', 'Judah', 'Dan', 'Naphtali'],
  },
  13: {
    week: 13,
    cycle: 1,
    heading: '12 Sons/Tribes of Israel (Part 2)',
    question: 'Who are the twelve sons of Israel, for which the twelve tribes are named?',
    prompt: 'Who are the twelve sons of Israel, for which the twelve tribes are named? (continued)',
    lines: ['Gad', 'Asher', 'Issachar', 'Zebulun', 'Joseph', 'Benjamin'],
  },
  14: {
    week: 14,
    cycle: 1,
    heading: 'Joseph',
    question: 'Describe Jacob’s son Joseph.',
    prompt: 'Describe Jacob’s son Joseph.',
    lines: [
      'Joseph was betrayed by his brothers, sold into slavery, and later used his position in Egypt to save his brothers and father from famine.',
    ],
  },
  15: {
    week: 15,
    cycle: 1,
    heading: 'Moses',
    question: 'What job did God give Moses to do?',
    prompt: 'What job did God give Moses to do?',
    lines: ['Deliver the Israelites from Egyptian slavery'],
  },
  16: {
    week: 16,
    cycle: 1,
    heading: 'Aaron',
    question: 'Who was Aaron?',
    prompt: 'Who was Aaron?',
    lines: ['Moses’ older brother and right-hand man'],
  },
  17: {
    week: 17,
    cycle: 1,
    heading: '10 Plagues in Egypt (1–5)',
    question: 'What are the ten plagues of Egypt?',
    prompt: 'What are the ten plagues of Egypt?',
    lines: [
      '1. Bloody waters',
      '2. Frogs',
      '3. Gnats or lice',
      '4. Flies',
      '5. Death of cattle',
    ],
  },
  18: {
    week: 18,
    cycle: 1,
    heading: '10 Plagues in Egypt (6–10)',
    question: 'What are the ten plagues of Egypt?',
    prompt: 'What are the ten plagues of Egypt? (continued)',
    lines: [
      '6. Boils',
      '7. Hail',
      '8. Locusts',
      '9. Darkness',
      '10. Death of firstborn',
    ],
  },
  19: {
    week: 19,
    cycle: 1,
    heading: 'God’s Covenant with Moses',
    question: 'What was God’s covenant with Moses?',
    prompt: 'What was God’s covenant with Moses?',
    lines: [
      'A promise of blessings and curses',
      'A promise to make Israel a kingdom of priests and a holy nation',
    ],
  },
  20: {
    week: 20,
    cycle: 1,
    heading: '10 Jewish Feasts (1–5)',
    question: 'What are the ten Jewish feasts?',
    prompt: 'What are the ten Jewish feasts?',
    lines: [
      '1. Passover',
      '2. Unleavened Bread',
      '3. First Fruits',
      '4. Pentecost',
      '5. Feast of Trumpets',
    ],
  },
  21: {
    week: 21,
    cycle: 1,
    heading: '10 Jewish Feasts (6–10)',
    question: 'What are the ten Jewish feasts?',
    prompt: 'What are the ten Jewish feasts? (continued)',
    lines: [
      '6. Day of Atonement',
      '7. Feast of Booths',
      '8. Rejoicing in the Law',
      '9. Feast of Dedication',
      '10. Feast of Lots',
    ],
  },
  22: {
    week: 22,
    cycle: 1,
    heading: 'Tabernacle',
    question: 'What is the Tabernacle?',
    prompt: 'What is the Tabernacle?',
    lines: ['A portable tent of meeting with God'],
  },
  23: {
    week: 23,
    cycle: 1,
    heading: '5 Sacrifices in the Tabernacle',
    question: 'What are the five sacrifices in the Tabernacle?',
    prompt: 'What are the five sacrifices in the Tabernacle?',
    lines: [
      '1. Sin offering',
      '2. Guilt offering',
      '3. Burnt offering',
      '4. Grain offering',
      '5. Fellowship offering',
    ],
  },
  24: {
    week: 24,
    cycle: 1,
    heading: '7 Parts of the Tabernacle',
    question: 'What are the seven parts of the Tabernacle?',
    prompt: 'What are the seven parts of the Tabernacle?',
    lines: [
      '1. Brazen altar',
      '2. Laver of bronze',
      '3. Golden lampstand',
      '4. Table of showbread',
      '5. Altar of incense',
      '6. Veil',
      '7. Ark of the Covenant',
    ],
  },
};

export const CYCLE_2_BIBLE_WEEKS: Record<number, BibleWeekEntry> = {
  1: {
    week: 1,
    cycle: 2,
    heading: '8 Significant Judges (1–4)',
    question: 'What are the names of eight significant judges of Israel?',
    prompt: 'What are the names of eight significant judges of Israel?',
    lines: ['1. Othniel', '2. Ehud', '3. Deborah', '4. Gideon'],
  },
  2: {
    week: 2,
    cycle: 2,
    heading: '8 Significant Judges (5–8)',
    question: 'What are the names of eight significant judges of Israel?',
    prompt: 'What are the names of eight significant judges of Israel? (continued)',
    lines: ['5. Jephthah', '6. Samson', '7. Eli', '8. Samuel'],
  },
  3: {
    week: 3,
    cycle: 2,
    heading: '3 Kings of United Israel',
    question: 'Who are the three kings of united Israel?',
    prompt: 'Who are the three kings of united Israel?',
    lines: ['1. Saul', '2. David', '3. Solomon'],
  },
  4: {
    week: 4,
    cycle: 2,
    heading: 'David',
    question: 'Who was David?',
    prompt: 'Who was David?',
    lines: [
      'Warrior, hero, musician, poet, king; fell greatly in sin, yet rose again to love and serve God',
    ],
  },
  5: {
    week: 5,
    cycle: 2,
    heading: 'God’s Covenant with David',
    question: 'What is God’s covenant with David?',
    prompt: 'What is God’s covenant with David?',
    lines: [
      'That the Messiah would come from the family of David;', 'The tribe of Judah would establish an unending kingdom',
    ],
  },
  6: {
    week: 6,
    cycle: 2,
    heading: 'King Solomon Builds 1st Temple',
    question: 'Who oversaw the building of the first Jewish temple?',
    prompt: 'Who oversaw the building of the first Jewish temple?',
    lines: ['King Solomon'],
  },
  7: {
    week: 7,
    cycle: 2,
    heading: 'Why Israel Divided into 2 Kingdoms',
    question:
      'What was the consequence of King Solomon building worship temples to false gods for his pagan wives to worship?',
    prompt:
      'What was the consequence of King Solomon building worship temples to false gods for his pagan wives to worship?',
    lines: ['Israel divided into two kingdoms'],
  },
  8: {
    week: 8,
    cycle: 2,
    heading: '1st King of Israel (Northern Kingdom)',
    question: 'Who was the first king of Israel, the northern kingdom?',
    prompt: 'Who was the first king of Israel, the northern kingdom?',
    lines: ['Jeroboam I'],
  },
  9: {
    week: 9,
    cycle: 2,
    heading: '1st King of Judah (Southern Kingdom)',
    question: 'Who was the first king of Judah, the southern kingdom?',
    prompt: 'Who was the first king of Judah, the southern kingdom?',
    lines: ['Rehoboam, son of Solomon'],
  },
  10: {
    week: 10,
    cycle: 2,
    heading: '18 Significant Prophets of Israel (1–6)',
    question: 'Who are eighteen significant prophets of Israel?',
    prompt: 'Who are eighteen significant prophets of Israel?',
    lines: [
      '1. Elijah',
      '2. Elisha',
      '3. Obadiah',
      '4. Joel',
      '5. Jonah',
      '6. Amos',
    ],
  },
  11: {
    week: 11,
    cycle: 2,
    heading: '18 Significant Prophets of Israel (7–12)',
    question: 'Who are eighteen significant prophets of Israel?',
    prompt: 'Who are eighteen significant prophets of Israel? (continued)',
    lines: [
      '7. Hosea',
      '8. Isaiah',
      '9. Micah',
      '10. Jeremiah',
      '11. Zephaniah',
      '12. Habakkuk',
    ],
  },
  12: {
    week: 12,
    cycle: 2,
    heading: '18 Significant Prophets of Israel (13–18)',
    question: 'Who are eighteen significant prophets of Israel?',
    prompt: 'Who are eighteen significant prophets of Israel? (continued)',
    lines: [
      '13. Nahum',
      '14. Ezekiel',
      '15. Daniel',
      '16. Haggai',
      '17. Malachi',
      '18. Zechariah',
    ],
  },
  13: {
    week: 13,
    cycle: 2,
    heading: 'Captivities: Assyria and Babylon',
    question: 'What 2 nations took the Jewish people into captivity?',
    prompt: 'What 2 nations took the Jewish people into captivity?',
    lines: ['Assyria (722 BC); Babylon (586 BC)'],
  },
  14: {
    week: 14,
    cycle: 2,
    heading: 'Prophecy of New Covenant (Jer. 31:31–34)',
    question:
      'Who prophesies in the Old Testament about the New Covenant that God fulfills through Jesus?',
    prompt:
      'Who prophesies in the Old Testament about the New Covenant that God fulfills through Jesus?',
    lines: ['Jeremiah'],
  },
  15: {
    week: 15,
    cycle: 2,
    heading: 'Destruction of 1st Jewish Temple',
    question: 'What caused the destruction of the first Jewish temple in 586 BC?',
    prompt: 'What caused the destruction of the first Jewish temple in 586 BC?',
    lines: ['Babylonian invasion under King Nebuchadnezzar'],
  },
  16: {
    week: 16,
    cycle: 2,
    heading: 'Destruction of 2nd Jewish Temple',
    question: 'What caused the destruction of the second Jewish temple in 70 AD?',
    prompt: 'What caused the destruction of the second Jewish temple in 70 AD?',
    lines: ['Roman soldiers during the first Jewish revolt'],
  },
  17: {
    week: 17,
    cycle: 2,
    heading: 'Old Testament Prophecies',
    question: 'Prophecies found in the Old Testament pertain to:',
    prompt: 'Prophecies found in the Old Testament pertain to:',
    lines: ['Israel and other nations', 'The Messiah', 'End Times'],
  },
  18: {
    week: 18,
    cycle: 2,
    heading: 'Types of Psalms',
    question: 'What are the five main types of Psalms?',
    prompt: 'What are the five main types of Psalms?',
    lines: [
      'Hymns of praise',
      'Songs of thanksgiving',
      'Royal psalms',
      'Wisdom psalms',
      'Laments',
    ],
  },
  19: {
    week: 19,
    cycle: 2,
    heading: 'Book of Proverbs',
    question:
      'What book of the Old Testament contains a collection of wise instruction for living a godly life?',
    prompt:
      'What book of the Old Testament contains a collection of wise instruction for living a godly life?',
    lines: ['Proverbs'],
  },
  20: {
    week: 20,
    cycle: 2,
    heading: 'Three Hebrew Names of God',
    question: 'What are three of the many Hebrew names of God?',
    prompt: 'What are three of the many Hebrew names of God?',
    lines: [
      'YHWH (Yahweh), “I am”',
      'Adonai, “The Lord”',
      'Elohim, “The all-powerful God”',
    ],
  },
  21: {
    week: 21,
    cycle: 2,
    heading: 'Original Languages of Old Testament',
    question: 'What are the original languages of the Old Testament?',
    prompt: 'What are the original languages of the Old Testament?',
    lines: ['Hebrew and Aramaic'],
  },
  22: {
    week: 22,
    cycle: 2,
    heading: 'Emperor of Rome at Christ’s Birth',
    question: 'Who was Emperor of Rome when Jesus was born?',
    prompt: 'Who was Emperor of Rome when Jesus was born?',
    lines: ['Caesar Augustus'],
  },
  23: {
    week: 23,
    cycle: 2,
    heading: 'Jesus Teaching in the Temple',
    question:
      'What age was Jesus when He started teaching alongside the Jewish leaders in the temple?',
    prompt:
      'What age was Jesus when He started teaching alongside the Jewish leaders in the temple?',
    lines: ['12 years old'],
  },
  24: {
    week: 24,
    cycle: 2,
    heading: 'Messianic Prophecies Fulfilled',
    question: 'How many Old Testament prophecies did Jesus fulfill?',
    prompt: 'How many Old Testament prophecies did Jesus fulfill?',
    lines: ['Over 100!'],
  },
};

export const CYCLE_3_BIBLE_WEEKS: Record<number, BibleWeekEntry> = {
  1: {
    week: 1,
    cycle: 3,
    heading: '2 Major Themes of the Bible',
    question: 'What are the two major themes of the Bible?',
    prompt: 'What are the two major themes of the Bible?',
    lines: ['Who God is and His covenant with man'],
  },
  2: {
    week: 2,
    cycle: 3,
    heading: '2 Major Divisions of the Bible',
    question: 'What are the two major divisions of the Bible?',
    prompt: 'What are the two major divisions of the Bible?',
    lines: ['Old Testament', 'New Testament'],
  },
  3: {
    week: 3,
    cycle: 3,
    heading: '7 Subdivisions of the Bible',
    question: 'What are the seven subdivisions of the Bible?',
    prompt: 'What are the seven subdivisions of the Bible?',
    lines: [
      'Law',
      'History',
      'Poetry',
      'Prophets',
      'Gospels',
      'Letters',
      'Prophecy',
    ],
  },
  4: {
    week: 4,
    cycle: 3,
    heading: 'Books of the Bible: Old Testament (1–8)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order:',
    lines: [
      'Genesis',
      'Exodus',
      'Leviticus',
      'Numbers',
      'Deuteronomy',
      'Joshua',
      'Judges',
      'Ruth',
    ],
  },
  5: {
    week: 5,
    cycle: 3,
    heading: 'Books of the Bible: Old Testament (9–18)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      '1 Samuel',
      '2 Samuel',
      '1 Kings',
      '2 Kings',
      '1 Chronicles',
      '2 Chronicles',
      'Ezra',
      'Nehemiah',
      'Esther',
      'Job',
    ],
  },
  6: {
    week: 6,
    cycle: 3,
    heading: 'Books of the Bible: Old Testament (19–24)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      'Psalms',
      'Proverbs',
      'Ecclesiastes',
      'Song of Songs',
      'Isaiah',
      'Jeremiah',
    ],
  },
  7: {
    week: 7,
    cycle: 3,
    heading: 'Books of the Bible: Old Testament (25–32)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      'Lamentations',
      'Ezekiel',
      'Daniel',
      'Hosea',
      'Joel',
      'Amos',
      'Obadiah',
      'Jonah',
    ],
  },
  8: {
    week: 8,
    cycle: 3,
    heading: 'Books of the Bible: Old Testament (33–39)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      'Micah',
      'Nahum',
      'Habakkuk',
      'Zephaniah',
      'Haggai',
      'Zechariah',
      'Malachi',
    ],
  },
  9: {
    week: 9,
    cycle: 3,
    heading: 'Books of the Bible: New Testament (1–5)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: ['Matthew', 'Mark', 'Luke', 'John', 'Acts'],
  },
  10: {
    week: 10,
    cycle: 3,
    heading: 'Books of the Bible: New Testament (6–12)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      'Romans',
      '1 Corinthians',
      '2 Corinthians',
      'Galatians',
      'Ephesians',
      'Philippians',
      'Colossians',
    ],
  },
  11: {
    week: 11,
    cycle: 3,
    heading: 'Books of the Bible: New Testament (13–19)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      '1 Thessalonians',
      '2 Thessalonians',
      '1 Timothy',
      '2 Timothy',
      'Titus',
      'Philemon',
      'Hebrews',
    ],
  },
  12: {
    week: 12,
    cycle: 3,
    heading: 'Books of the Bible: New Testament (20–27)',
    question: 'List the 66 books of the Bible in order:',
    prompt: 'List the 66 books of the Bible in order: (continued)',
    lines: [
      'James',
      '1 Peter',
      '2 Peter',
      '1 John',
      '2 John',
      '3 John',
      'Jude',
      'Revelation',
    ],
  },
  13: {
    week: 13,
    cycle: 3,
    heading: 'Jesus in the Gospels',
    question: 'How is Jesus portrayed in each gospel?',
    prompt: 'How is Jesus portrayed in each gospel?',
    lines: [
      'Matthew: as King',
      'Mark: as Servant',
      'Luke: as Man',
      'John: as God',
    ],
  },
  14: {
    week: 14,
    cycle: 3,
    heading: '12 Disciples (Part 1)',
    question: 'What are the names of Jesus’ original twelve disciples?',
    prompt: 'What are the names of Jesus’ original twelve disciples?',
    lines: [
      'Peter',
      'John',
      'James, the brother of John',
      'Andrew',
      'Philip',
    ],
  },
  15: {
    week: 15,
    cycle: 3,
    heading: '12 Disciples (Part 2)',
    question: 'What are the names of Jesus’ original twelve disciples?',
    prompt: 'What are the names of Jesus’ original twelve disciples? (continued)',
    lines: [
      'Thomas',
      'Bartholomew',
      'Matthew',
      'James, the son of Alphaeus',
      'Simon the Zealot',
      'Thaddaeus',
      'Judas Iscariot',
    ],
  },
  16: {
    week: 16,
    cycle: 3,
    heading: 'Judas Iscariot',
    question: 'Who was Judas Iscariot?',
    prompt: 'Who was Judas Iscariot?',
    lines: [
      'The disciple who betrayed Jesus and delivered Him over to the Jewish chief priests',
    ],
  },
  17: {
    week: 17,
    cycle: 3,
    heading: 'New Covenant',
    question: 'What is God’s new covenant with man?',
    prompt: 'What is God’s new covenant with man?',
    lines: [
      'Jesus, the perfect sacrifice for sin',
      'Eternal life to those who believe',
      'The Holy Spirit lives within believers',
    ],
  },
  18: {
    week: 18,
    cycle: 3,
    heading: 'Acts',
    question: 'What does the book of Acts record?',
    prompt: 'What does the book of Acts record?',
    lines: [
      'The ascension of Christ',
      'Pentecost',
      'Powerful acts of God through the Church',
    ],
  },
  19: {
    week: 19,
    cycle: 3,
    heading: 'Saul',
    question: 'Who was Saul of Tarsus?',
    prompt: 'Who was Saul of Tarsus?',
    lines: [
      'A Jewish leader (later known as Paul) who at first persecuted Christians but then received Jesus, became a devoted follower of Christ, and wrote most of the New Testament',
    ],
  },
  20: {
    week: 20,
    cycle: 3,
    heading: 'Peter/Paul Ministries',
    question: 'Peter and Paul took the Gospel to which groups of people?',
    prompt: 'Peter and Paul took the Gospel to which groups of people?',
    lines: ['Peter: to the Jews', 'Paul: to the Gentiles'],
  },
  21: {
    week: 21,
    cycle: 3,
    heading: 'Satan',
    question: 'How is Satan described in 1 Peter?',
    prompt: 'How is Satan described in 1 Peter?',
    lines: [
      'A roaring lion, prowling about and seeking whom he may devour',
    ],
  },
  22: {
    week: 22,
    cycle: 3,
    heading: 'Revelation',
    question:
      'What book of the New Testament is typically considered a prophecy of the end times?',
    prompt:
      'What book of the New Testament is typically considered a prophecy of the end times?',
    lines: ['Revelation, written by the apostle John'],
  },
  23: {
    week: 23,
    cycle: 3,
    heading: 'Third Jewish Temple',
    question:
      'The rebuilding of the third Jewish temple is usually associated with what important event?',
    prompt:
      'The rebuilding of the third Jewish temple is usually associated with what important event?',
    lines: ['Jesus’ return to the earth'],
  },
  24: {
    week: 24,
    cycle: 3,
    heading: 'Original Language of New Testament',
    question: 'What is the main original language of the New Testament?',
    prompt: 'What is the main original language of the New Testament?',
    lines: ['Koine Greek'],
  },
};

export const BIBLE_CYCLE_NAMES: Record<1 | 2 | 3, string> = {
  1: 'Creation to Moses',
  2: 'Judges to Jesus',
  3: 'Gospels to Revelation and Books of the Bible',
};

export function getBibleWeekData(
  cycle: 1 | 2 | 3,
  week: number
): BibleWeekEntry | undefined {
  if (cycle === 1) return CYCLE_1_BIBLE_WEEKS[week];
  if (cycle === 2) return CYCLE_2_BIBLE_WEEKS[week];
  if (cycle === 3) return CYCLE_3_BIBLE_WEEKS[week];
  return undefined;
}

/**
 * Deterministic Bible Q&A lookup for AI helper routing.
 * Ensures Bible questions are answered directly and verbatim from the verified data,
 * never generated or hallucinated by LLM.
 */
export function findBibleAnswerByQuery(query: string): {
  found: boolean;
  cycle?: 1 | 2 | 3;
  week?: number;
  entry?: BibleWeekEntry;
  explanation?: string;
} {
  const q = query.toLowerCase().trim();

  // Keyword / phrase matcher
  const matchers: Array<{
    pattern: RegExp;
    cycle: 1 | 2 | 3;
    week: number;
  }> = [
    // Cycle 1 Plagues (Weeks 17 & 18)
    { pattern: /(?:ten|10)\s+plagues?/i, cycle: 1, week: 17 },
    { pattern: /plagues?\s+(?:of|in)\s+egypt/i, cycle: 1, week: 17 },
    { pattern: /bloody\s+waters|frogs|gnats|flies|death\s+of\s+cattle/i, cycle: 1, week: 17 },
    { pattern: /boils|locusts|firstborn/i, cycle: 1, week: 18 },

    // Days of Creation
    { pattern: /days?\s+(?:1|one)[\s,-]+(?:2|two)[\s,-]+(?:3|three)|days?\s+1\s*[-–]\s*3/i, cycle: 1, week: 1 },
    { pattern: /days?\s+(?:4|four)[\s,-]+(?:5|five)[\s,-]+(?:6|six)|days?\s+4\s*[-–]\s*6/i, cycle: 1, week: 2 },
    { pattern: /what\s+did\s+god\s+create/i, cycle: 1, week: 1 },

    // Covenants
    { pattern: /covenant\s+with\s+adam/i, cycle: 1, week: 3 },
    { pattern: /covenant\s+with\s+noah/i, cycle: 1, week: 5 },
    { pattern: /covenant\s+with\s+abraham/i, cycle: 1, week: 7 },
    { pattern: /covenant\s+with\s+moses/i, cycle: 1, week: 19 },
    { pattern: /covenant\s+with\s+david/i, cycle: 2, week: 5 },
    { pattern: /new\s+covenant/i, cycle: 3, week: 17 },

    // Figures
    { pattern: /\bwho\s+was\s+noah\b|ark\s+at\s+god['’]s\s+command/i, cycle: 1, week: 4 },
    { pattern: /tower\s+of\s+babel|one\s+language/i, cycle: 1, week: 6 },
    { pattern: /\bwho\s+was\s+job\b|god-fearing\s+man\s+who\s+endured/i, cycle: 1, week: 8 },
    { pattern: /arab\s+people|ishmael/i, cycle: 1, week: 9 },
    { pattern: /jewish\s+people\s+came\s+through|isaac['’]s\s+2nd\s+son/i, cycle: 1, week: 10 },
    { pattern: /isaac['’]s\s+2\s+sons|esau\s+and\s+jacob/i, cycle: 1, week: 11 },
    { pattern: /(?:twelve|12)\s+sons|(?:twelve|12)\s+tribes\s+of\s+israel/i, cycle: 1, week: 12 },
    { pattern: /reuben|simeon|levi|judah|issachar|zebulun/i, cycle: 1, week: 12 },
    { pattern: /describe\s+jacob['’]s\s+son\s+joseph|\bjoseph\b.*slavery/i, cycle: 1, week: 14 },
    { pattern: /what\s+job\s+did\s+god\s+give\s+moses|\bwho\s+was\s+moses\b/i, cycle: 1, week: 15 },
    { pattern: /\bwho\s+was\s+aaron\b/i, cycle: 1, week: 16 },
    { pattern: /(?:ten|10)\s+jewish\s+feasts|passover.*unleavened/i, cycle: 1, week: 20 },
    { pattern: /what\s+is\s+the\s+tabernacle/i, cycle: 1, week: 22 },
    { pattern: /(?:five|5)\s+sacrifices.*tabernacle/i, cycle: 1, week: 23 },
    { pattern: /(?:seven|7)\s+parts\s+of\s+the\s+tabernacle/i, cycle: 1, week: 24 },

    // Cycle 2
    { pattern: /(?:eight|8)\s+significant\s+judges|judges\s+of\s+israel/i, cycle: 2, week: 1 },
    { pattern: /othniel|ehud|deborah|gideon|jephthah|samson/i, cycle: 2, week: 1 },
    { pattern: /(?:three|3)\s+kings\s+of\s+united\s+israel|saul.*david.*solomon/i, cycle: 2, week: 3 },
    { pattern: /\bwho\s+was\s+david\b/i, cycle: 2, week: 4 },
    { pattern: /building\s+of\s+the\s+1st\s+jewish\s+temple|solomon\s+builds/i, cycle: 2, week: 6 },
    { pattern: /why\s+israel\s+divided|divided\s+into\s+2\s+kingdoms/i, cycle: 2, week: 7 },
    { pattern: /1st\s+king\s+of\s+israel|jeroboam/i, cycle: 2, week: 8 },
    { pattern: /1st\s+king\s+of\s+judah|rehoboam/i, cycle: 2, week: 9 },
    { pattern: /(?:eighteen|18)\s+significant\s+prophets|prophets\s+of\s+israel/i, cycle: 2, week: 10 },
    { pattern: /elijah.*elisha|obadiah|habakkuk|zephaniah/i, cycle: 2, week: 10 },
    { pattern: /assyria.*babylonia|nations\s+took\s+the\s+jewish\s+people\s+into\s+captivity/i, cycle: 2, week: 13 },
    { pattern: /jeremiah.*new\s+covenant/i, cycle: 2, week: 14 },
    { pattern: /destruction\s+of\s+(?:the\s+)?1st\s+(?:jewish\s+)?temple/i, cycle: 2, week: 15 },
    { pattern: /destruction\s+of\s+(?:the\s+)?2nd\s+(?:jewish\s+)?temple/i, cycle: 2, week: 16 },
    { pattern: /types\s+of\s+psalms/i, cycle: 2, week: 18 },
    { pattern: /wise\s+instruction.*godly\s+life|proverbs/i, cycle: 2, week: 19 },
    { pattern: /hebrew\s+names\s+of\s+god|yhwh|adonai|elohim/i, cycle: 2, week: 20 },
    { pattern: /original\s+languages?\s+of\s+(?:the\s+)?old\s+testament/i, cycle: 2, week: 21 },
    { pattern: /emperor\s+of\s+rome.*christ['’]s\s+birth|caesar\s+augustus/i, cycle: 2, week: 22 },
    { pattern: /what\s+age\s+was\s+jesus.*teaching.*temple/i, cycle: 2, week: 23 },
    { pattern: /how\s+many\s+old\s+testament\s+prophecies.*fulfill/i, cycle: 2, week: 24 },

    // Cycle 3
    { pattern: /major\s+themes\s+of\s+the\s+bible/i, cycle: 3, week: 1 },
    { pattern: /major\s+divisions\s+of\s+the\s+bible/i, cycle: 3, week: 2 },
    { pattern: /subdivisions\s+of\s+the\s+bible/i, cycle: 3, week: 3 },
    { pattern: /66\s+books\s+of\s+the\s+bible|books\s+of\s+the\s+bible/i, cycle: 3, week: 4 },
    { pattern: /how\s+is\s+jesus\s+portrayed\s+in\s+each\s+gospel/i, cycle: 3, week: 13 },
    { pattern: /(?:twelve|12)\s+disciples|names\s+of\s+jesus['’]\s+original\s+12\s+disciples/i, cycle: 3, week: 14 },
    { pattern: /who\s+is\s+judas\s+iscariot/i, cycle: 3, week: 16 },
    { pattern: /what\s+does\s+the\s+book\s+of\s+acts\s+record/i, cycle: 3, week: 18 },
    { pattern: /saul\s+of\s+tarsus|apostle[,\s]+paul/i, cycle: 3, week: 19 },
    { pattern: /peter\s+and\s+paul.*which\s+groups/i, cycle: 3, week: 20 },
    { pattern: /how\s+is\s+satan\s+described\s+in\s+1\s+peter|roaring\s+lion/i, cycle: 3, week: 21 },
    { pattern: /prophecy\s+of\s+the\s+end\s+times.*revelation/i, cycle: 3, week: 22 },
    { pattern: /third\s+jewish\s+temple.*jesus['’]\s+return/i, cycle: 3, week: 23 },
    { pattern: /original\s+language\s+of\s+(?:the\s+)?new\s+testament|koine\s+greek/i, cycle: 3, week: 24 },
  ];

  for (const m of matchers) {
    if (m.pattern.test(q)) {
      const entry = getBibleWeekData(m.cycle, m.week);
      if (entry) {
        return {
          found: true,
          cycle: m.cycle,
          week: m.week,
          entry,
          explanation: `From CC Memory Masters Bible (Cycle ${m.cycle} "${BIBLE_CYCLE_NAMES[m.cycle]}", Week ${m.week}):\n\nPrompt: ${entry.prompt}\nAnswer:\n${entry.lines.join('\n')}`,
        };
      }
    }
  }

  // Broad search across all weeks in all cycles
  for (const c of [1, 2, 3] as const) {
    const table = c === 1 ? CYCLE_1_BIBLE_WEEKS : c === 2 ? CYCLE_2_BIBLE_WEEKS : CYCLE_3_BIBLE_WEEKS;
    for (let w = 1; w <= 24; w++) {
      const entry = table[w];
      if (!entry) continue;
      const haystack = `${entry.heading} ${entry.question} ${entry.prompt} ${entry.lines.join(' ')}`.toLowerCase();
      if (haystack.includes(q) || (q.length > 5 && haystack.includes(q.substring(0, 8)))) {
        return {
          found: true,
          cycle: c,
          week: w,
          entry,
          explanation: `From CC Memory Masters Bible (Cycle ${c} "${BIBLE_CYCLE_NAMES[c]}", Week ${w}):\n\nPrompt: ${entry.prompt}\nAnswer:\n${entry.lines.join('\n')}`,
        };
      }
    }
  }

  return { found: false };
}
