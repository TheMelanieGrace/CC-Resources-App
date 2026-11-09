// Cycle 2 memory work, transcribed verbatim from Melanie's official
// Summary Proof Sheets (photographed Nov 9, 2026). Math is generated
// formulaically (identical in all cycles); the Timeline is shared across
// cycles; Bible comes from the Memory Masters data.
import { SubjectKey } from './reviewPacketData';
import { SimpleWeekRecord } from './cycle1Data';

const CONJ = (
  weeks: [number, number],
  tense: string,
  singular: string,
  plural: string
): [number, SimpleWeekRecord][] =>
  [weeks[0], weeks[1]].map((n) => [
    n,
    {
      heading: `Week ${n}: First Conjugation Endings, ${tense} Tense`,
      prompt: `First Conjugation Endings: ${tense} Tense`,
      lines: [`Singular: ${singular}`, `Plural: ${plural}`],
    } as SimpleWeekRecord,
  ]);

export const CYCLE_2_WEEKS: Partial<Record<SubjectKey, Record<number, SimpleWeekRecord>>> = {
  science: {
    1: {
      heading: 'Week 1: The Days of Creation',
      prompt: 'What occurred on each day of creation?',
      lines: [
        'Day 1: earth, space, time, light',
        'Day 2: atmosphere',
        'Day 3: dry land, plants',
        'Day 4: sun, moon, stars',
        'Day 5: fish, sea creatures, birds',
        'Day 6: land animals, Adam, Eve',
      ],
    },
    2: {
      heading: 'Week 2: Land Biomes',
      prompt: 'What are some land biomes?',
      lines: [
        'Grassland, desert, scrubland, tundra,',
        'deciduous forest, coniferous forest, tropical rainforest.',
      ],
    },
    3: {
      heading: 'Week 3: Three Types of Consumers',
      prompt: 'What are three types of consumers?',
      lines: ['Herbivore, carnivore, omnivore.'],
    },
    4: {
      heading: 'Week 4: Parts of the Food Chain',
      prompt: 'What are some parts of the food chain?',
      lines: ['Producer, consumer, decomposer.'],
    },
    5: {
      heading: 'Week 5: Cycles in Nature',
      prompt: 'What are some cycles in nature?',
      lines: ['Water cycle, carbon and oxygen cycle, nitrogen cycle.'],
    },
    6: {
      heading: 'Week 6: How Animals React to Environmental Change',
      prompt: 'How do animals react to environmental change?',
      lines: ['Adapt, migrate, hibernate.'],
    },
    7: {
      heading: 'Week 7: Six Forms of Pollution',
      prompt: 'What are six forms of pollution?',
      lines: ['Noise, air, water, land, thermal, radioactive.'],
    },
    8: {
      heading: 'Week 8: Aquatic Biomes',
      prompt: 'What are some aquatic biomes?',
      lines: ['Ponds and lakes, streams and rivers,', 'wetlands and estuaries, oceans and seas.'],
    },
    9: {
      heading: 'Week 9: Parts of the Sun',
      prompt: 'What are some parts of the sun?',
      lines: [
        'Core, radiative zone, convective zone,',
        'sunspots, photosphere, solar flare, corona.',
      ],
    },
    10: {
      heading: 'Week 10: The Names of the Planets',
      prompt: 'What are the names of the planets?',
      lines: ['Mercury, Venus, Earth, Mars,', 'Jupiter, Saturn, Uranus, Neptune.'],
    },
    11: {
      heading: 'Week 11: The Phases of the Moon',
      prompt: 'What are the phases of the moon?',
      lines: ['New, crescent, quarter, gibbous, full.'],
    },
    12: {
      heading: 'Week 12: Other Bodies in Our Solar System',
      prompt: 'What are some other bodies in our solar system?',
      lines: ['Asteroids, meteroids, meteorites, comets.'],
    },
    13: {
      heading: 'Week 13: U.S. Space Missions',
      prompt: 'What are some names of U.S. space missions?',
      lines: ['Mercury, Gemini, Apollo, Shuttle.'],
    },
    14: {
      heading: 'Week 14: The States of Matter',
      prompt: 'What are the states of matter?',
      lines: ['Solid, liquid, gas, plasma.'],
    },
    15: {
      heading: 'Week 15: Two Forms of Energy',
      prompt: 'What are two forms of energy?',
      lines: ['Kinetic, potential.'],
    },
    16: {
      heading: "Week 16: Newton's First Law of Motion",
      prompt: "What is Newton's first law of motion?",
      lines: [
        "Newton's first law of motion states that an object at rest tends to remain at rest and an object in motion tends to continue moving in a straight line at constant speed unless an outside force acts upon it.",
      ],
    },
    17: {
      heading: "Week 17: Newton's Second Law of Motion",
      prompt: "What is Newton's second law of motion?",
      lines: [
        "Newton's second law of motion states that force equals mass times acceleration. F = ma",
      ],
    },
    18: {
      heading: "Week 18: Newton's Third Law of Motion",
      prompt: "What is Newton's third law of motion?",
      lines: [
        "Newton's third law of motion states that for every action, there is an equal and opposite reaction.",
      ],
    },
    19: {
      heading: 'Week 19: The First Law of Thermodynamics',
      prompt: 'What is the first law of thermodynamics?',
      lines: [
        'The first law of thermodynamics states that energy cannot be created or destroyed.',
      ],
    },
    20: {
      heading: 'Week 20: The Second Law of Thermodynamics',
      prompt: 'What is the second law of thermodynamics?',
      lines: [
        'Often called the law of entropy, the second law of thermodynamics explains why heat flows from an area of higher temperature to an area of lower temperature.',
      ],
    },
    21: {
      heading: 'Week 21: The Third Law of Thermodynamics',
      prompt: 'What is the third law of thermodynamics?',
      lines: [
        'The third law of thermodynamics explains that it is impossible to reach the state of absolute zero temperature.',
      ],
    },
    22: {
      heading: 'Week 22: Ways Light Is Observed',
      prompt: 'What are some ways light is observed?',
      lines: ['Reflection, refraction, spectrum, wave, particle.'],
    },
    23: {
      heading: 'Week 23: How Heat Flows',
      prompt: 'How does heat flow?',
      lines: ['Radiation, conduction, convection.'],
    },
    24: {
      heading: 'Week 24: Units Used to Measure Electricity',
      prompt: 'What units are used to measure electricity?',
      lines: [
        'Ohms measure resistance, volts measure voltage,',
        'amps measure current, watts measure power.',
      ],
    },
  },

  english: {
    1: {
      heading: 'Week 1: Parts of Speech',
      prompt: 'Parts of speech',
      lines: ['noun, pronoun, verb, adverb,', 'conjunction, interjection, preposition, adjective'],
    },
    2: {
      heading: 'Week 2: A Pronoun',
      prompt: 'A pronoun',
      lines: ['A pronoun replaces a noun in order to avoid repetition.'],
    },
    3: {
      heading: 'Week 3: Pronoun Order',
      prompt: 'Pronoun order',
      lines: [
        '1st person singular, 2nd person singular, 3rd person singular,',
        '1st person plural, 2nd person plural, 3rd person plural',
      ],
    },
    4: {
      heading: 'Week 4: Nominative Pronouns',
      prompt: 'Nominative pronouns',
      lines: ['I, you, he/she/it, we, you, they'],
    },
    5: {
      heading: 'Week 5: Objective Pronouns',
      prompt: 'Objective pronouns',
      lines: ['me, you, him/her/it, us, you, them'],
    },
    6: {
      heading: 'Week 6: Possessive Pronouns',
      prompt: 'Possessive pronouns',
      lines: ['mine, yours, his/hers/its, ours, yours, theirs'],
    },
    7: {
      heading: 'Week 7: Possessive Pronoun Adjectives',
      prompt: 'Possessive pronoun adjectives',
      lines: ['my, your, his/her/its, our, your, their'],
    },
    8: {
      heading: 'Week 8: Reflexive Pronouns',
      prompt: 'Reflexive pronouns',
      lines: ['myself, yourself, himself/herself/itself,', 'ourselves, yourselves, themselves'],
    },
    9: {
      heading: 'Week 9: Interrogative Pronouns',
      prompt: 'Interrogative pronouns',
      lines: ['who, whom, whose, which, what'],
    },
    10: {
      heading: 'Week 10: Demonstrative Pronouns',
      prompt: 'Demonstrative pronouns',
      lines: ['this, that, these, those'],
    },
    11: {
      heading: 'Week 11: Indefinite Pronouns',
      prompt: 'Indefinite pronouns',
      lines: ['all, another, any, anybody,', 'anyone, anything, both, each, either'],
    },
    12: {
      heading: 'Week 12: Indefinite Pronouns',
      prompt: 'Indefinite pronouns',
      lines: ['everybody, everyone, everything, few,', 'many, more, most, neither'],
    },
    13: {
      heading: 'Week 13: Indefinite Pronouns',
      prompt: 'Indefinite pronouns',
      lines: ['nobody, none, one, other,', 'several, some, somebody, someone, such'],
    },
    14: {
      heading: 'Week 14: An Adverb',
      prompt: 'An adverb',
      lines: [
        'An adverb modifies a verb, adjective, or another adverb',
        'and answers the questions: How? When? Where? and Why?',
      ],
    },
    15: {
      heading: 'Week 15: Four Purposes of Sentences',
      prompt: 'Four purposes of sentences',
      lines: ['declarative, exclamatory, interrogative, imperative'],
    },
    16: {
      heading: 'Week 16: A Verb',
      prompt: 'A verb',
      lines: [
        'A verb is a word that asserts an action, shows a state of being,',
        'links two words together, or helps another verb.',
      ],
    },
    17: {
      heading: 'Week 17: A Noun',
      prompt: 'A noun',
      lines: ['A noun names a person, place, thing, activity, or idea.'],
    },
    18: {
      heading: 'Week 18: Five Cases of Nouns',
      prompt: 'Five cases of nouns',
      lines: ['subject, direct object, indirect object,', 'object of the preposition, possessive'],
    },
    19: {
      heading: 'Week 19: A Gerund',
      prompt: 'A gerund',
      lines: ['A gerund is a present participle verb form used as a noun.'],
    },
    20: {
      heading: 'Week 20: An Appositive',
      prompt: 'An appositive',
      lines: [
        'An appositive is a noun or pronoun directly beside another noun',
        'that explains or identifies it.',
      ],
    },
    21: {
      heading: 'Week 21: A Conjunction',
      prompt: 'A conjunction',
      lines: ['A conjunction is a word used to connect words, phrases, or clauses together.'],
    },
    22: {
      heading: 'Week 22: Coordinating Conjunctions (FANBOYS)',
      prompt: 'Coordinating conjunctions',
      lines: ['For, And, Nor, But, Or, Yet, So'],
    },
    23: {
      heading: 'Week 23: An Adjective',
      prompt: 'An adjective',
      lines: [
        'An adjective modifies a noun or pronoun by describing, qualifying, or limiting',
        'and answers the questions: What kind? How many? Which? Whose?',
      ],
    },
    24: {
      heading: 'Week 24: An Interjection',
      prompt: 'An interjection',
      lines: ['An interjection is a word or phrase used as a strong expression of feeling or emotion.'],
    },
  },

  history: {
    1: {
      heading: 'Week 1: Charlemagne',
      prompt: 'Tell me about Charlemagne.',
      lines: [
        'In 800, during the medieval period, Pope Leo III crowned Charlemagne Holy Roman Emperor of Europe.',
      ],
    },
    2: {
      heading: 'Week 2: William the Conqueror',
      prompt: 'Tell me about William the Conqueror.',
      lines: [
        'In 1054, the church split into Roman Catholic and Eastern Orthodox. William the Conqueror defeated King Harold of England in 1066 and started feudalism.',
      ],
    },
    3: {
      heading: 'Week 3: The Crusades',
      prompt: 'Tell me about the Crusades.',
      lines: [
        'Richard the Lion-Hearted, son of Eleanor of Aquitaine, fought the Turks for Jerusalem during the time of the Crusades, from 1095 to 1291.',
      ],
    },
    4: {
      heading: 'Week 4: The Magna Carta',
      prompt: 'Tell me about the Magna Carta.',
      lines: [
        "English King John signed the Magna Carta in 1215, limiting the king's power. Later, England's King Edward III claimed to be king of France and began the Hundred Years' War in 1337.",
      ],
    },
    5: {
      heading: "Week 5: The Hundred Years' War",
      prompt: "Tell me about the Hundred Years' War.",
      lines: [
        "During the Hundred Years' War, Joan of Arc and King Charles VII led the French to defeat the English at the Siege of Orleans. In the late 1340s, fleas on rats carried the plague, which killed one out of three Europeans.",
      ],
    },
    6: {
      heading: 'Week 6: The Renaissance',
      prompt: 'Tell me about the Renaissance.',
      lines: [
        'During the Renaissance period, from 1350 to 1600, Leonardo da Vinci was a famous inventor, Shakespeare was a famous playwright, Michelangelo was a famous artist, and Copernicus was a famous scientist.',
      ],
    },
    7: {
      heading: 'Week 7: The Reformation',
      prompt: 'Tell me about the Reformation.',
      lines: [
        'In 1517, Martin Luther began the Protestant Reformation by printing the Ninety-Five Theses that made Pope Leo X excommunicate him. Later, John Calvin joined the Reformation.',
      ],
    },
    8: {
      heading: 'Week 8: European Explorers',
      prompt: 'Tell me about European explorers.',
      lines: [
        "Between the late 1400s and the mid-1500s, Dias rounded the Cape of Good Hope, Amerigo Vespucci sailed to the Americas, Balboa crossed Central America to the Pacific, Magellan's crew sailed around the globe, and Coronado explored the American Southwest.",
      ],
    },
    9: {
      heading: 'Week 9: Some Absolute Monarchs',
      prompt: 'Tell me about some absolute monarchs.',
      lines: [
        'Between the 1500s and 1800s, Henry VIII of England, Louis XIV of France, Philip II of Spain, Peter the Great of Russia, and Frederick the Great of Prussia ruled during the age of absolute monarchs.',
      ],
    },
    10: {
      heading: 'Week 10: The History of Russia',
      prompt: 'Tell me about the history of Russia.',
      lines: [
        'Vladimir I brought Christianity to Russia in the 900s. In the 1500s, Czar Ivan the Terrible unified Russia. Peter the Great and Catherine the Great expanded and Westernized Russia in the 1700s.',
      ],
    },
    11: {
      heading: 'Week 11: The French Revolution',
      prompt: 'Tell me about the French Revolution.',
      lines: [
        "In 1789, the French Revolution began when citizens stormed the Bastille and fought for the Declaration of the Rights of Man. Later, during the Reign of Terror, the aristocrats' heads were removed by the guillotine.",
      ],
    },
    12: {
      heading: 'Week 12: The Battle of Waterloo',
      prompt: 'Tell me about the Battle of Waterloo.',
      lines: [
        'Napoleon Bonaparte of the French Empire was defeated at the Battle of Waterloo by British General Wellington and his allies soon after the War of 1812 in the United States.',
      ],
    },
    13: {
      heading: 'Week 13: The Industrial Revolution',
      prompt: 'Tell me about the Industrial Revolution.',
      lines: [
        "Watt's steam engine, Cartwright's power loom, and Whitney's cotton gin spurred the Industrial Revolution that began in the 1760s.",
      ],
    },
    14: {
      heading: 'Week 14: World War I Leaders',
      prompt: 'Tell me about World War I leaders.',
      lines: [
        'Clemenceau of France, Lloyd George of England, Nicholas II of Russia, Wilhelm II of Germany, and Wilson of the United States were leaders during World War I, which started in 1914 and ended in 1918.',
      ],
    },
    15: {
      heading: 'Week 15: World War I Countries',
      prompt: 'Tell me about World War I countries.',
      lines: [
        'During World War I, Great Britain, France, and Russia were Allies and fought against Austria-Hungary and Germany, which were called the Central Powers. In 1917, the United States entered the war, assisting the Allies.',
      ],
    },
    16: {
      heading: 'Week 16: How World War II Began',
      prompt: 'Tell me about how World War II began.',
      lines: [
        'World War II began in 1939 when Hitler invaded Poland. Two engagements that helped the United States win the Pacific front were defeating Japan at the Battle of Midway and dropping atomic bombs on Hiroshima and Nagasaki in 1945.',
      ],
    },
    17: {
      heading: 'Week 17: World War II Leaders',
      prompt: 'Tell me about World War II leaders.',
      lines: [
        'World War II Axis leaders were: Hitler of Germany, Tojo of Japan, and Mussolini of Italy. World War II Allied leaders were: Churchill of England, Roosevelt, Eisenhower, and MacArthur of the United States, and Stalin of the USSR.',
      ],
    },
    18: {
      heading: 'Week 18: The United Nations',
      prompt: 'Tell me about the United Nations.',
      lines: [
        'In 1945, after the League of Nations failed to prevent World War II, American President Roosevelt, British Prime Minister Churchill, and Soviet Premier Stalin began the United Nations.',
      ],
    },
    19: {
      heading: 'Week 19: The Korean War',
      prompt: 'Tell me about the Korean War.',
      lines: [
        'In 1950, General Douglas MacArthur led United Nations forces to stop communist North Korea from capturing all of South Korea during the Korean War.',
      ],
    },
    20: {
      heading: 'Week 20: The Vietnam War',
      prompt: 'Tell me about the Vietnam War.',
      lines: [
        'In 1965, President Johnson sent U.S. troops to stop communist North Vietnam from capturing all of South Vietnam during the Vietnam War.',
      ],
    },
    21: {
      heading: 'Week 21: The End of the Cold War',
      prompt: 'Tell me about the end of the Cold War.',
      lines: [
        'In the 1980s, British Prime Minister Margaret Thatcher and American President Ronald Reagan worked together to end the Cold War, lessen big government, and strengthen the conservative movement.',
      ],
    },
    22: {
      heading: 'Week 22: The Fall of Communism',
      prompt: 'Tell me about the fall of communism.',
      lines: [
        'In 1989, the communist dictators began to fall in Eastern Europe when Soviet General Secretary Gorbachev refused to send them military aid.',
      ],
    },
    23: {
      heading: 'Week 23: The Gulf War',
      prompt: 'Tell me about the Gulf War.',
      lines: [
        'In 1990, President George H. W. Bush sent troops to the Persian Gulf to expel Iraqi leader Saddam Hussein from Kuwait during the Gulf War.',
      ],
    },
    24: {
      heading: 'Week 24: The End of Apartheid',
      prompt: 'Tell me about the end of apartheid.',
      lines: [
        "In 1994, South African President de Klerk allowed free elections. Nelson Mandela became South Africa's first black president, demonstrating apartheid was ending.",
      ],
    },
  },

  geography: {
    1: { heading: 'Week 1: Continents/Oceans', prompt: 'Continents/Oceans', lines: ['North America, South America, Europe, Asia,', 'Africa, Australia, Antarctica,', 'Indian Ocean, Arctic Ocean, Atlantic Ocean,', 'Pacific Ocean, Southern Ocean'] },
    2: { heading: 'Week 2: European Waters', prompt: 'European Waters', lines: ['North Sea, Baltic Sea, Adriatic Sea,', 'English Channel, Mediterranean Sea'] },
    3: { heading: 'Week 3: Western European Countries', prompt: 'Western European Countries', lines: ['Ireland, England, Portugal, Spain, France'] },
    4: { heading: 'Week 4: European Rivers', prompt: 'European Rivers', lines: ['Seine River, Rhine River, Elbe River,', 'Po River, Danube River, Volga River'] },
    5: { heading: 'Week 5: European Cities', prompt: 'European Cities', lines: ['London, Paris, Rome, Barcelona, Orleans'] },
    6: { heading: 'Week 6: European Mountains', prompt: 'European Mountains', lines: ['Pyrenees, Alps, Carpathians, Caucasus, Ural, Matterhorn'] },
    7: { heading: 'Week 7: European Peninsulas', prompt: 'European Peninsulas', lines: ['Iberian Peninsula, Balkan Peninsula,', 'Scandinavian Peninsula, Apennine Peninsula'] },
    8: { heading: 'Week 8: Mid-Atlantic World', prompt: 'Mid-Atlantic World', lines: ['Cape of Good Hope, Strait of Magellan,', 'Canary Islands, Treaty of Tordesillas'] },
    9: { heading: 'Week 9: Caribbean', prompt: 'Caribbean', lines: ['Cuba, Jamaica, Haiti, Dominican Republic, Puerto Rico'] },
    10: { heading: 'Week 10: Southwest Asia', prompt: 'Southwest Asia', lines: ['Afghanistan, Pakistan, India, Kolkata, Arabian Sea'] },
    11: { heading: 'Week 11: Europe and Asia', prompt: 'Europe and Asia', lines: ['Moscow, Kiev, Russia, Siberia, Ukraine'] },
    12: { heading: 'Week 12: Eastern European Seas', prompt: 'Eastern European Seas', lines: ['White Sea, Barents Sea, Black Sea, Caspian Sea, Aral Sea'] },
    13: { heading: 'Week 13: Northern European Countries', prompt: 'Northern European Countries', lines: ['Norway, Sweden, Finland, Denmark'] },
    14: { heading: 'Week 14: Baltic Europe', prompt: 'Baltic Europe', lines: ['Estonia, Latvia, Lithuania, Poland, Belarus'] },
    15: { heading: 'Week 15: The Levant', prompt: 'The Levant', lines: ['Turkey, Cyprus, Syria, Iraq, Iran'] },
    16: { heading: 'Week 16: Balkans', prompt: 'Balkans', lines: ['Greece, Albania, Bulgaria, Slovenia, Romania'] },
    17: { heading: 'Week 17: Central European Countries', prompt: 'Central European Countries', lines: ['Netherlands, Belgium, Luxembourg, Germany, Switzerland'] },
    18: { heading: 'Week 18: More Central European Countries', prompt: 'More Central European Countries', lines: ['Italy, Austria, Hungary, Czechia, Slovakia'] },
    19: { heading: 'Week 19: Southeastern Asia', prompt: 'Southeastern Asia', lines: ['North Korea, South Korea, Taiwan, Philippines, Guam'] },
    20: { heading: 'Week 20: South Central Asia', prompt: 'South Central Asia', lines: ['Laos, Thailand, Cambodia, North Vietnam, South Vietnam'] },
    21: { heading: 'Week 21: Central America', prompt: 'Central America', lines: ['Guatemala, Belize, El Salvador, Honduras, Nicaragua'] },
    22: { heading: 'Week 22: Oceania', prompt: 'Oceania', lines: ['Australia, Great Barrier Reef, New Zealand,', 'Papua New Guinea, Indonesia'] },
    23: { heading: 'Week 23: Central Asia', prompt: 'Central Asia', lines: ['Kazakhstan, Uzbekistan, Turkmenistan, Tajikistan, Kyrgyzstan'] },
    24: { heading: 'Week 24: Southern Africa', prompt: 'Southern Africa', lines: ['South Africa, Lesotho, Botswana, Mozambique, Namibia'] },
  },

  latin: Object.fromEntries([
    ...CONJ([1, 2], 'Present', '-ō, -s, -t', '-mus, -tis, -nt'),
    ...CONJ([3, 4], 'Imperfect', '-bam, -bās, -bat', '-bāmus, -bātis, -bant'),
    ...CONJ([5, 6], 'Future', '-bō, -bis, -bit', '-bimus, -bitis, -bunt'),
    ...CONJ([7, 8], 'Perfect', '-ī, -istī, -it', '-imus, -istis, -ērunt'),
    ...CONJ([9, 10], 'Pluperfect', '-eram, -erās, -erat', '-erāmus, -erātis, -erant'),
    ...CONJ([11, 12], 'Future Perfect', '-erō, -eris, -erit', '-erimus, -eritis, -erint'),
    ...CONJ([13, 14], 'Present', '-ō, -s, -t', '-mus, -tis, -nt'),
    ...CONJ([15, 16], 'Imperfect', '-bam, -bās, -bat', '-bāmus, -bātis, -bant'),
    ...CONJ([17, 18], 'Future', '-bō, -bis, -bit', '-bimus, -bitis, -bunt'),
    ...CONJ([19, 20], 'Perfect', '-ī, -istī, -it', '-imus, -istis, -ērunt'),
    ...CONJ([21, 22], 'Pluperfect', '-eram, -erās, -erat', '-erāmus, -erātis, -erant'),
    ...CONJ([23, 24], 'Future Perfect', '-erō, -eris, -erit', '-erimus, -eritis, -erint'),
  ]),
};
