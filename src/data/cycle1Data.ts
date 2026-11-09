// Cycle 1 memory work, transcribed verbatim from Melanie's official
// Summary Proof Sheets (photographed Nov 9, 2026). Every line checked
// against the page images. Math is generated formulaically (identical in
// all cycles) and the Timeline (161 events + presidents) is shared across
// cycles, so neither lives here. Bible comes from the Memory Masters data.
import { SubjectKey } from './reviewPacketData';

export interface SimpleWeekRecord {
  heading: string;
  prompt?: string;
  lines: string[];
}

const LATIN_CASES: SimpleWeekRecord = {
  heading: 'Noun Cases',
  prompt: 'Latin noun cases',
  lines: [
    'nominative - subject',
    'genitive - possessive',
    'dative - indirect object',
    'accusative - direct object',
    'ablative - object of the prep.',
  ],
};
const LATIN_D1: SimpleWeekRecord = {
  heading: '1st Declension Noun Endings',
  prompt: '1st Declension Noun Endings',
  lines: [
    'Singular: -a, -ae, -ae, -am, -ā',
    'Plural: -ae, -ārum, -īs, -ās, -īs',
  ],
};
const LATIN_D2: SimpleWeekRecord = {
  heading: '2nd Declension Noun Endings',
  prompt: '2nd Declension Noun Endings',
  lines: [
    'Singular: -us, -ī, -ō, -um, -ō',
    'Plural: -ī, -ōrum, -īs, -ōs, -īs',
  ],
};
const LATIN_D3: SimpleWeekRecord = {
  heading: '3rd Declension Noun Endings',
  prompt: '3rd Declension Noun Endings',
  lines: [
    'Singular: various, -is, -ī, -em, -e',
    'Plural: -ēs, -um, -ibus, -ēs, -ibus',
  ],
};
const LATIN_D4: SimpleWeekRecord = {
  heading: '4th Declension Noun Endings',
  prompt: '4th Declension Noun Endings',
  lines: [
    'Singular: -us, -ūs, -uī, -um, -ū',
    'Plural: -ūs, -uum, -ibus, -ūs, -ibus',
  ],
};
const LATIN_D5: SimpleWeekRecord = {
  heading: '5th Declension Noun Endings',
  prompt: '5th Declension Noun Endings',
  lines: [
    'Singular: -ēs, -ēī, -ēī, -em, -ē',
    'Plural: -ēs, -ērum, -ēbus, -ēs, -ēbus',
  ],
};

function wk(n: number, rec: SimpleWeekRecord): [number, SimpleWeekRecord] {
  return [n, { ...rec, heading: `Week ${n}: ${rec.heading}` }];
}

export const CYCLE_1_WEEKS: Partial<Record<SubjectKey, Record<number, SimpleWeekRecord>>> = {
  science: {
    1: {
      heading: 'Week 1: Classifications of Living Things',
      prompt: 'What are the classifications of living things?',
      lines: ['Domain, kingdom, phylum, class, order, family, genus, species.'],
    },
    2: {
      heading: 'Week 2: Kingdoms of Living Things',
      prompt: 'What are the kingdoms of living things?',
      lines: ['Animalia, Plantae, Fungi, Protista, Archaea, Bacteria.'],
    },
    3: {
      heading: 'Week 3: Parts of an Animal Cell',
      prompt: 'What are some parts of an animal cell?',
      lines: ['Nucleus, cytoplasm, vacuole, mitochondria, cell membrane, Golgi bodies.'],
    },
    4: {
      heading: 'Week 4: Parts of a Plant Cell',
      prompt: 'What are some parts of a plant cell?',
      lines: [
        'Nucleus, cytoplasm, vacuole, mitochondria,',
        'cell membrane, cell wall, chloroplasts, Golgi bodies.',
      ],
    },
    5: {
      heading: 'Week 5: Major Groups of Invertebrates',
      prompt: 'What are the major groups of invertebrates?',
      lines: [
        'Sponges, stinging-cell animals, flatworms, roundworms,',
        'segmented worms, mollusks, sea stars, arthropods.',
      ],
    },
    6: {
      heading: 'Week 6: Major Groups of Vertebrates',
      prompt: 'What are the major groups of vertebrates?',
      lines: ['Fish, amphibians, reptiles, mammals, birds.'],
    },
    7: {
      heading: 'Week 7: Ways Animals Reproduce',
      prompt: 'What are some ways animals reproduce?',
      lines: ['Live birth, eggs, fragmentation, budding.'],
    },
    8: {
      heading: 'Week 8: Types of Seed Plants',
      prompt: 'What are some types of seed plants?',
      lines: ['Monocot, dicot, conifer.'],
    },
    9: {
      heading: 'Week 9: Parts of a Plant',
      prompt: 'What are some parts of a plant?',
      lines: ['Leaves, stems, roots.'],
    },
    10: {
      heading: 'Week 10: Leaf Shapes',
      prompt: 'What are some leaf shapes?',
      lines: ['Linear, oval, lobed, cleft, scalelike, needlelike.'],
    },
    11: {
      heading: 'Week 11: Parts of a Flower',
      prompt: 'What are some parts of a flower?',
      lines: ['Petal, stamen, anther, pistil, sepal.'],
    },
    12: {
      heading: 'Week 12: Plant Systems',
      prompt: 'What are some plant systems?',
      lines: ['Photosynthesis, respiration, transpiration.'],
    },
    13: {
      heading: 'Week 13: Parts of the Geosphere',
      prompt: 'What are some parts of the geosphere?',
      lines: ['Core, mantle, crust, hydrosphere, biosphere, atmosphere.'],
    },
    14: {
      heading: 'Week 14: Three Kinds of Rock',
      prompt: 'What are three kinds of rock?',
      lines: ['Sedimentary, metamorphic, igneous.'],
    },
    15: {
      heading: "Week 15: Each Continent's Highest Mountain",
      prompt: "What is each continent's highest mountain?",
      lines: [
        'Everest in Asia, Aconcagua in S. America, Denali in N. America,',
        'Kilimanjaro in Africa, Elbrus in Europe, Kosciuszko in Australia,',
        'Vinson Massif in Antarctica.',
      ],
    },
    16: {
      heading: 'Week 16: Four Kinds of Volcanoes',
      prompt: 'What are four kinds of volcanoes?',
      lines: ['Active, intermittent, dormant, extinct.'],
    },
    17: {
      heading: 'Week 17: Parts of a Volcano',
      prompt: 'What are some parts of a volcano?',
      lines: ['Magma, vents, lava, crater, gases.'],
    },
    18: {
      heading: 'Week 18: Four Types of Ocean Floor',
      prompt: 'What are four types of ocean floor?',
      lines: ['Continental shelf, abyssal plain, mid-ocean ridge, trench.'],
    },
    19: {
      heading: 'Week 19: Ocean Zones',
      prompt: 'What are some ocean zones?',
      lines: ['Epipelagic, mesopelagic, bathypelagic, abyssalpelagic.'],
    },
    20: {
      heading: 'Week 20: Parts of the Atmosphere',
      prompt: 'What are some parts of the atmosphere?',
      lines: ['Troposphere, stratosphere, mesosphere, thermosphere, exosphere.'],
    },
    21: {
      heading: 'Week 21: Circles of Latitude',
      prompt: 'What are five circles of latitude?',
      lines: ['Arctic Circle, Tropic of Cancer, equator, Tropic of Capricorn, Antarctic Circle.'],
    },
    22: {
      heading: 'Week 22: Weather Fronts',
      prompt: 'What are some kinds of weather fronts?',
      lines: ['Cold, warm, stationary, occluded.'],
    },
    23: {
      heading: 'Week 23: Types of Clouds',
      prompt: 'What are some types of clouds?',
      lines: ['Cumulonimbus, cirrus, stratus, cumulus, stratocumulus.'],
    },
    24: {
      heading: 'Week 24: Markings on the Globe',
      prompt: 'What are some markings on the globe?',
      lines: [
        'Latitude, longitude, Prime Meridian, degrees,',
        'Northern Hemisphere, Southern Hemisphere.',
      ],
    },
  },

  english: {
    1: {
      heading: 'Week 1: A Preposition',
      prompt: 'A preposition',
      lines: ['A preposition relates a noun or pronoun to another word.'],
    },
    2: { heading: 'Week 2: Prepositions', prompt: 'Prepositions', lines: ['about, above, across, after, against'] },
    3: { heading: 'Week 3: Prepositions', prompt: 'Prepositions', lines: ['along, amid, among, around, at, atop'] },
    4: { heading: 'Week 4: Prepositions', prompt: 'Prepositions', lines: ['before, behind, below, beneath, beside'] },
    5: { heading: 'Week 5: Prepositions', prompt: 'Prepositions', lines: ['between, beyond, but, by, concerning'] },
    6: { heading: 'Week 6: Prepositions', prompt: 'Prepositions', lines: ['down, during, except, for, from'] },
    7: { heading: 'Week 7: Prepositions', prompt: 'Prepositions', lines: ['in, inside, into, like, near'] },
    8: { heading: 'Week 8: Prepositions', prompt: 'Prepositions', lines: ['of, off, on, onto, out'] },
    9: { heading: 'Week 9: Prepositions', prompt: 'Prepositions', lines: ['outside, over, past, regarding, since'] },
    10: { heading: 'Week 10: Prepositions', prompt: 'Prepositions', lines: ['through, throughout, to, toward'] },
    11: { heading: 'Week 11: Prepositions', prompt: 'Prepositions', lines: ['under, underneath, until, up, upon'] },
    12: { heading: 'Week 12: Prepositions', prompt: 'Prepositions', lines: ['with, within, without'] },
    13: {
      heading: 'Week 13: Compound Prepositions',
      prompt: 'Compound prepositions',
      lines: ['according to, in addition to, except for,', 'in front of, out of, instead of'],
    },
    14: {
      heading: 'Week 14: A Helping Verb',
      prompt: 'A helping verb',
      lines: ['A helping verb helps another verb assert action, being, or existence.'],
    },
    15: { heading: 'Week 15: Helping Verbs', prompt: 'Helping verbs', lines: ['do, does, did'] },
    16: { heading: 'Week 16: Helping Verbs', prompt: 'Helping verbs', lines: ['has, have, had'] },
    17: { heading: 'Week 17: Helping Verbs', prompt: 'Helping verbs', lines: ['may, must, might'] },
    18: { heading: 'Week 18: Helping Verbs', prompt: 'Helping verbs', lines: ['should, could, would'] },
    19: { heading: 'Week 19: Helping Verbs', prompt: 'Helping verbs', lines: ['shall, will, can'] },
    20: {
      heading: 'Week 20: A Linking Verb',
      prompt: 'A linking verb',
      lines: ['A linking verb makes an assertion by joining two words.'],
    },
    21: {
      heading: 'Week 21: Helping and Linking Verb "To Be"',
      prompt: 'Helping and linking verb: to be',
      lines: ['am, are, is, was, were, be, being, been'],
    },
    22: { heading: 'Week 22: Linking Verbs', prompt: 'Linking verbs', lines: ['feel, become, remain, taste'] },
    23: { heading: 'Week 23: Linking Verbs', prompt: 'Linking verbs', lines: ['seem, appear, look, sound'] },
    24: { heading: 'Week 24: Linking Verbs', prompt: 'Linking verbs', lines: ['stay, smell, grow'] },
  },

  history: {
    1: {
      heading: 'Week 1: Commandments 1-5',
      prompt: 'Tell me about commandments 1-5.',
      lines: [
        'Thou shalt ...',
        '1 have no other gods before me.',
        '2 not make unto thee any graven image.',
        '3 not take the name of the LORD thy God in vain.',
        '4 remember the Sabbath day, to keep it holy.',
        '5 honor thy father and thy mother: that thy days may be long',
        'upon the land which the LORD thy God giveth thee.',
      ],
    },
    2: {
      heading: 'Week 2: Commandments 6-10',
      prompt: 'Tell me about commandments 6-10.',
      lines: [
        'Thou shalt ...',
        '6 not murder.',
        '7 not commit adultery.',
        '8 not steal.',
        '9 not bear false witness against thy neighbor.',
        '10 not covet.',
      ],
    },
    3: {
      heading: 'Week 3: The Greek and Roman Gods',
      prompt: 'Tell me about the Greek and Roman gods.',
      lines: [
        'Zeus - Jupiter',
        'Hera - Juno',
        'Ares - Mars',
        'Aphrodite - Venus',
        'Hermes - Mercury',
        'Athena - Minerva',
        'Poseidon - Neptune',
      ],
    },
    4: {
      heading: 'Week 4: The Seven Wonders of the Ancient World',
      prompt: 'Tell me about the Seven Wonders of the Ancient World.',
      lines: [
        'The Seven Wonders of the Ancient World are:',
        'Pyramids of Giza, Hanging Gardens of Babylon,',
        'Temple of Artemis at Ephesus, Statue of Zeus at Olympia,',
        'Mausoleum at Halicarnassus, Pharos Lighthouse at Alexandria,',
        'Colossus of Rhodes.',
      ],
    },
    5: {
      heading: 'Week 5: The Romans',
      prompt: 'Tell me about the Romans.',
      lines: [
        'The Roman Republic became the Roman Empire when Augustus was crowned emperor in 27 BC. This was followed by the Pax Romana. In AD 286, the empire divided into the Western and Eastern Empires until Germanic barbarians defeated the Western Empire in AD 476.',
      ],
    },
    6: {
      heading: 'Week 6: Some Ancient Greeks',
      prompt: 'Tell me about some ancient Greeks.',
      lines: [
        'Homer, a famous poet; Pythagoras, a famous mathematician; Socrates, a famous philosopher; and Archimedes, a famous inventor, shaped Western ideas. Ancient Greek city-states were among the first democracies.',
      ],
    },
    7: {
      heading: 'Week 7: Hinduism and Buddhism in India',
      prompt: 'Tell me about Hinduism and Buddhism in India.',
      lines: [
        'Hinduism developed around 1500 BC and is known for karma, reincarnation, and the caste system. Founded in the sixth century BC, Buddhism teaches self-denial as the path to enlightenment.',
      ],
    },
    8: {
      heading: 'Week 8: The Age of Imperialism',
      prompt: 'Tell me about the Age of Imperialism.',
      lines: [
        "During the Age of Imperialism, the British established rule over India in 1858, and Queen Victoria was declared the Empress of India in 1877. Before his assassination in 1948, Mohandas Gandhi led the passive resistance movement, which helped win India's independence.",
      ],
    },
    9: {
      heading: 'Week 9: Lao-Tzu and Confucius in China',
      prompt: 'Tell me about Lao-Tzu and Confucius in China.',
      lines: [
        'Around the sixth century BC, Lao-Tzu founded Taoism, which emphasizes harmony with nature, and Confucius taught compassion and obedience.',
      ],
    },
    10: {
      heading: "Week 10: Japan's Heian Period",
      prompt: "Tell me about Japan's Heian period.",
      lines: [
        "Around 794, Japan's emperors moved to Heian, present-day Kyoto. The Heian period ended in the twelfth century when civil war gave control to military commanders called shoguns in a feudal system where knights called samurai protected wealthy landowners.",
      ],
    },
    11: {
      heading: 'Week 11: Emperor Constantine and the Byzantine Empire',
      prompt: 'Tell me about Emperor Constantine and the Byzantine Empire.',
      lines: [
        "Emperor Constantine stopped the persecution of Christians in the Eastern Roman Empire. In AD 330, he moved the capital to Byzantium and renamed it Constantinople. Emperor Justinian's Code became a model for legal systems. The Byzantine Empire lasted until Ottoman Turks captured Constantinople in 1453.",
      ],
    },
    12: {
      heading: 'Week 12: The Muslim Empire',
      prompt: 'Tell me about the Muslim Empire.',
      lines: [
        'In 622, Islam was founded in the Arabian Peninsula by Muhammad, who worshiped Allah. Mecca is the holy city of Islam. During the 1400s, the Ottoman Turks expanded the Muslim Empire.',
      ],
    },
    13: {
      heading: 'Week 13: The Kush',
      prompt: 'Tell me about the Kush.',
      lines: [
        'The Kush mined gold along the Nile River from 2000 BC to AD 350. The Berbers traded gold, iron, and salt in the desert.',
      ],
    },
    14: {
      heading: 'Week 14: Trade in Africa',
      prompt: 'Tell me about trade in Africa.',
      lines: [
        'In 700, Ghana was known as "the land of gold." The Mali nation took control of the gold trade in 1240 and established Timbuktu as a center of trade, culture, and learning. By the mid-1400s, the wealthy and powerful Songhai Empire controlled trade in western Africa.',
      ],
    },
    15: {
      heading: 'Week 15: Prince Henry of Portugal',
      prompt: 'Tell me about Prince Henry of Portugal.',
      lines: [
        'In the 1400s, Prince Henry of Portugal founded a school of navigation. His work advanced European exploration and trade, including the slave trade.',
      ],
    },
    16: {
      heading: 'Week 16: The Civilizations of Mesoamerica',
      prompt: 'Tell me about the civilizations of Mesoamerica.',
      lines: [
        'Three of the advanced civilizations of Mesoamerica from 1200 BC to AD 1500 were the Olmecs, the Mayans, and the Aztecs.',
      ],
    },
    17: {
      heading: 'Week 17: The Aztecs',
      prompt: 'Tell me about the Aztecs.',
      lines: [
        'The Aztecs used pyramids in rituals of human sacrifice. Their civilization began to fall when Hernán Cortés of Spain defeated Montezuma II in 1519.',
      ],
    },
    18: {
      heading: 'Week 18: The Mound Builders',
      prompt: 'Tell me about the Mound Builders.',
      lines: [
        'Circa 1000 BC to AD 1450, three North American mound-building civilizations were the Adena, the Hopewell, and the Mississippians.',
      ],
    },
    19: {
      heading: 'Week 19: The Anasazi',
      prompt: 'Tell me about the Anasazi.',
      lines: [
        'The Anasazi of the southwestern United States built adobe villages in caves and on the sides of cliffs from 500 BC to AD 1200.',
      ],
    },
    20: {
      heading: 'Week 20: The Mexican Revolution',
      prompt: 'Tell me about the Mexican Revolution.',
      lines: [
        'Circa 1910, during the Mexican Revolution, Pancho Villa and Emiliano Zapata fought the federales for "Land and Liberty."',
      ],
    },
    21: {
      heading: 'Week 21: The Exploration of Canada',
      prompt: 'Tell me about the exploration of Canada.',
      lines: [
        "John Cabot and Samuel de Champlain explored Canada and the St. Lawrence River. Creation of the Hudson's Bay Company, in 1670, eventually led to war between Britain and France. The maple leaf is the symbol of Canada.",
      ],
    },
    22: {
      heading: 'Week 22: The British North America Act of 1867',
      prompt: 'Tell me about the British North America Act of 1867.',
      lines: [
        'In 1867, the British North America Act established the Dominion of Canada. The Canadians gained total independence from Britain in 1982. French is spoken in the province of Quebec.',
      ],
    },
    23: {
      heading: 'Week 23: The Liberation of South America',
      prompt: 'Tell me about the liberation of South America.',
      lines: [
        "In the early 1800s, San Martín of Argentina, O'Higgins of Chile, and Bolívar of Venezuela fought to liberate South America from Spain.",
      ],
    },
    24: {
      heading: 'Week 24: The Portuguese Empire',
      prompt: 'Tell me about the Portuguese Empire.',
      lines: [
        'When Napoleon threatened the Portuguese Empire, King John VI fled to Brazil. His son, Dom Pedro I, declared Brazil independent in 1822.',
      ],
    },
  },

  geography: {
    1: { heading: 'Week 1: Fertile Crescent', prompt: 'Fertile Crescent', lines: ['Mediterranean Sea, Mesopotamia, Euphrates River, Tigris River, Sumer'] },
    2: { heading: 'Week 2: Assyrian Empire', prompt: 'Assyrian Empire', lines: ['Red Sea, Persian Gulf, Caspian Sea, Black Sea, Babylon'] },
    3: { heading: 'Week 3: Hebrew Empire', prompt: 'Hebrew Empire', lines: ['Judah, Israel, Jordan River, Dead Sea, Phoenicia, Sea of Galilee'] },
    4: { heading: 'Week 4: Hittite Empire', prompt: 'Hittite Empire', lines: ['Hattusa, Asia Minor, Arabian Desert, Cyprus'] },
    5: { heading: 'Week 5: Egyptian Empire', prompt: 'Egyptian Empire', lines: ['Egypt, Nile River, Upper/Lower Egypt, Nile River Delta'] },
    6: { heading: 'Week 6: Ancient Greece', prompt: 'Ancient Greece', lines: ['Greece, Aegean Sea, Macedonia, Crete, Rhodes'] },
    7: { heading: 'Week 7: Roman Empire', prompt: 'Roman Empire', lines: ['Hispania, Gaul, Germania, Alexandria, Carthage'] },
    8: { heading: 'Week 8: Indus River Valley', prompt: 'Indus River Valley', lines: ['Ganges River, Himalayas, Arabian Sea, Bay of Bengal, Great Indian Desert'] },
    9: { heading: 'Week 9: China', prompt: 'China', lines: ['Mongolia, Yellow Sea, Yellow River, Yangtze River, Beijing'] },
    10: { heading: 'Week 10: Japan', prompt: 'Japan', lines: ['Kyoto, Tokyo, Mt. Fuji, Pacific Ocean, Sea of Japan'] },
    11: { heading: 'Week 11: Byzantine Empire', prompt: 'Byzantine Empire', lines: ['Constantinople, Rome, Athens, Ephesus, Antioch'] },
    12: { heading: 'Week 12: Muslim Empire', prompt: 'Muslim Empire', lines: ['Mecca, Medina, Baghdad, Damascus, Tours, Syria'] },
    13: { heading: 'Week 13: Western Africa', prompt: 'Western Africa', lines: ['Atlantic Ocean, Senegal River, Niger River, Sahara Desert, Ivory Coast'] },
    14: { heading: 'Week 14: Ancient Africa', prompt: 'Ancient Africa', lines: ['Ancient Ghana, Ancient Mali, Western Sahara, Fez, Tangier'] },
    15: { heading: 'Week 15: Middle East', prompt: 'Middle East', lines: ['Israel, Sinai Peninsula, Suez Canal, Cairo, Gaza Strip'] },
    16: { heading: 'Week 16: African Waters', prompt: 'African Waters', lines: ['Congo River, Lake Victoria, Zambezi River, Orange River'] },
    17: { heading: 'Week 17: African Countries', prompt: 'African Countries', lines: ['Ethiopia, Mozambique, Zimbabwe, South Africa, Madagascar'] },
    18: { heading: 'Week 18: Mesoamerica Regions', prompt: 'Mesoamerica Regions', lines: ['Gulf of Mexico, Yucatan Peninsula, Olmec Civilization,', 'Maya Civilization, Aztec Civilization'] },
    19: { heading: 'Week 19: Mesoamerica', prompt: 'Mesoamerica', lines: ['Mexico City, Chichen Itza, Lake Texcoco, Mayapan, Oaxaca'] },
    20: { heading: 'Week 20: Dominion of Canada', prompt: 'Dominion of Canada', lines: ['Ontario, Quebec, New Brunswick, Nova Scotia'] },
    21: { heading: 'Week 21: Canadian Waters', prompt: 'Canadian Waters', lines: ['Great Bear Lake, Great Slave Lake, Hudson Bay, Baffin Bay, Labrador Sea'] },
    22: { heading: 'Week 22: South America (West)', prompt: 'South America (West)', lines: ['Venezuela, Colombia, Ecuador, Peru, Bolivia, Chile'] },
    23: { heading: 'Week 23: South America (East)', prompt: 'South America (East)', lines: ['Argentina, Uruguay, Paraguay, Brazil,', 'French Guiana, Suriname, Guyana'] },
    24: { heading: 'Week 24: North Atlantic', prompt: 'North Atlantic', lines: ['Greenland, Iceland, Denmark Strait, Davis Strait'] },
  },

  latin: Object.fromEntries([
    wk(1, LATIN_CASES), wk(2, LATIN_CASES),
    wk(3, LATIN_D1), wk(4, LATIN_D1),
    wk(5, LATIN_D2), wk(6, LATIN_D2),
    wk(7, LATIN_D3), wk(8, LATIN_D3),
    wk(9, LATIN_D4), wk(10, LATIN_D4),
    wk(11, LATIN_D5), wk(12, LATIN_D5),
    wk(13, LATIN_CASES), wk(14, LATIN_CASES),
    wk(15, LATIN_D1), wk(16, LATIN_D1),
    wk(17, LATIN_D2), wk(18, LATIN_D2),
    wk(19, LATIN_D3), wk(20, LATIN_D3),
    wk(21, LATIN_D4), wk(22, LATIN_D4),
    wk(23, LATIN_D5), wk(24, LATIN_D5),
  ]),
};
