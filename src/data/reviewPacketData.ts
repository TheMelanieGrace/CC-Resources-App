import { LATIN_MEMORY_WORK, LatinWeekData } from './latinReviewData';
import { getScienceFunctionNotes } from './scienceFunctionsData';
import { getEnglishHelpNotes } from './englishHelpData';
import { CYCLE_1_WEEKS } from './cycle1SampleWeeks';
import { STATE_METADATA } from './usGeographyData';
import { WorksheetItem } from '../types';
import { splitPromptAndAnswer } from '../utils/labelHelper';
import {
  getBibleWeekData,
  CYCLE_1_BIBLE_WEEKS,
  CYCLE_2_BIBLE_WEEKS,
  CYCLE_3_BIBLE_WEEKS,
} from './bibleData';

export type SubjectKey =
  | 'bible'
  | 'latin'
  | 'math'
  | 'science'
  | 'english'
  | 'history'
  | 'timeline'
  | 'geography';

export interface SubjectMeta {
  key: SubjectKey;
  label: string;
  shortLabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  hasGuidePagesRule: boolean;
}

export const SUBJECT_METAS: Record<SubjectKey, SubjectMeta> = {
  bible: {
    key: 'bible',
    label: 'Bible',
    shortLabel: 'BIB',
    color: '#1C3B32',
    bgColor: '#FFFFFF',
    borderColor: '#BFD0C5',
    hasGuidePagesRule: true,
  },
  latin: {
    key: 'latin',
    label: 'Latin',
    shortLabel: 'LAT',
    color: '#1C3B32',
    bgColor: '#E2ECE9',
    borderColor: '#82A79D',
    hasGuidePagesRule: true,
  },
  math: {
    key: 'math',
    label: 'Math',
    shortLabel: 'MATH',
    color: '#2A4365',
    bgColor: '#EBF8FF',
    borderColor: '#90CDF4',
    hasGuidePagesRule: false, // math tables generated formulaically
  },
  science: {
    key: 'science',
    label: 'Science',
    shortLabel: 'SCI',
    color: '#2C5282',
    bgColor: '#EBF4FF',
    borderColor: '#A3BFFA',
    hasGuidePagesRule: true,
  },
  english: {
    key: 'english',
    label: 'English',
    shortLabel: 'ENG',
    color: '#744210',
    bgColor: '#FEFCBF',
    borderColor: '#F6E05E',
    hasGuidePagesRule: true,
  },
  history: {
    key: 'history',
    label: 'History',
    shortLabel: 'HIST',
    color: '#A93E2C',
    bgColor: '#FEEBC8',
    borderColor: '#FBD38D',
    hasGuidePagesRule: true,
  },
  timeline: {
    key: 'timeline',
    label: 'Timeline',
    shortLabel: 'TIME',
    color: '#553C9A',
    bgColor: '#E9D8FD',
    borderColor: '#D6BCFA',
    hasGuidePagesRule: true,
  },
  geography: {
    key: 'geography',
    label: 'Geography',
    shortLabel: 'GEO',
    color: '#22543D',
    bgColor: '#C6F6D5',
    borderColor: '#9AE6B4',
    hasGuidePagesRule: false, // Cycle 3 uses US states & capitals in app
  },
};

export interface PacketSectionItem {
  id: string;
  week: number;
  subject: SubjectKey;
  heading: string;
  prompt?: string;
  isPlaceholder: boolean;
  placeholderText?: string;
  lines: string[];
  items?: WorksheetItem[];
  sampleSentence?: { latin: string; english: string };
  latinSentence?: {
    latin: string;
    english: string;
    reference: string;
    formatted?: string;
  };
}

/**
 * Generate Math multiplication tables or mathematical laws for a given week.
 * Week 1: 1s up to 15
 * Week 2: 2s up to 15
 * Week 3: 3s up to 15
 * Week 4: 4s up to 15
 * Week 5: 5s up to 15
 * Week 6: 6s up to 15
 * Week 7: 7s up to 15
 * Week 8: 8s up to 15
 * Week 9: 9s up to 15
 * Week 10: Squares (1x1 to 15x15)
 * Week 11: Cubes (1^3 to 10^3)
 * Week 12: Liquid Equivalents
 * Week 13: Linear Equivalents
 * Week 14: Area of a Rectangle
 * Week 15: Area of a Square
 * Week 16: Area of a Triangle
 * Week 17: Area of a Circle
 * Week 18: Circumference of a Circle
 * Week 19: Associative Law
 * Week 20: Commutative Law
 * Week 21: Distributive Law
 * Week 22: Identity Law for Addition
 * Week 23: Identity Law for Multiplication
 * Week 24: Metric Equivalents
 */
export function getMathWeekData(
  week: number,
  fillInTheBlank: boolean = false
): { heading: string; lines: string[] } {
  const ans = (val: number | string) => (fillInTheBlank ? '__' : String(val));

  switch (week) {
    case 1: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) {
        lines.push(`1 x ${i} = ${ans(1 * i)}`);
      }
      return { heading: '1s Multiplication Table (to 15)', lines };
    }
    case 2: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`2 x ${i} = ${ans(2 * i)}`);
      return { heading: '2s Multiplication Table (to 15)', lines };
    }
    case 3: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`3 x ${i} = ${ans(3 * i)}`);
      return { heading: '3s Multiplication Table (to 15)', lines };
    }
    case 4: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`4 x ${i} = ${ans(4 * i)}`);
      return { heading: '4s Multiplication Table (to 15)', lines };
    }
    case 5: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`5 x ${i} = ${ans(5 * i)}`);
      return { heading: '5s Multiplication Table (to 15)', lines };
    }
    case 6: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`6 x ${i} = ${ans(6 * i)}`);
      return { heading: '6s Multiplication Table (to 15)', lines };
    }
    case 7: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`7 x ${i} = ${ans(7 * i)}`);
      return { heading: '7s Multiplication Table (to 15)', lines };
    }
    case 8: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`8 x ${i} = ${ans(8 * i)}`);
      return { heading: '8s Multiplication Table (to 15)', lines };
    }
    case 9: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`9 x ${i} = ${ans(9 * i)}`);
      return { heading: '9s Multiplication Table (to 15)', lines };
    }
    case 10: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) {
        lines.push(`${i} x ${i} = ${ans(i * i)}`);
      }
      return { heading: 'Squares (1 to 15 squared)', lines };
    }
    case 11: {
      const lines: string[] = [];
      for (let i = 1; i <= 10; i++) {
        lines.push(`${i}^3 = ${ans(i * i * i)}`);
      }
      return { heading: 'Cubes (1 to 10 cubed)', lines };
    }
    case 12: {
      return {
        heading: 'Liquid Equivalents',
        lines: [
          `8 fluid ounces = ${ans('1 cup')}`,
          `2 cups = ${ans('1 pint')}`,
          `2 pints = ${ans('1 quart')}`,
          `4 quarts = ${ans('1 gallon')}`,
        ],
      };
    }
    case 13: {
      return {
        heading: 'Linear Equivalents',
        lines: [
          `12 inches = ${ans('1 foot')}`,
          `3 feet = ${ans('1 yard')}`,
          `5,280 feet = ${ans('1 mile')}`,
          `1,760 yards = ${ans('1 mile')}`,
        ],
      };
    }
    case 14: {
      return {
        heading: 'Area of a Rectangle',
        lines: [
          `The area of a rectangle = ${ans('length x width')}`,
          `A = ${ans('l x w')}`,
        ],
      };
    }
    case 15: {
      return {
        heading: 'Area of a Square',
        lines: [
          `The area of a square = ${ans('side squared')}`,
          `A = ${ans('s^2')}`,
        ],
      };
    }
    case 16: {
      return {
        heading: 'Area of a Triangle',
        lines: [
          `The area of a triangle = ${ans('1/2 base x height')}`,
          `A = ${ans('1/2 b x h')}`,
        ],
      };
    }
    case 17: {
      return {
        heading: 'Area of a Circle',
        lines: [
          `The area of a circle = ${ans('pi x radius squared')}`,
          `A = ${ans('pi x r^2')}`,
        ],
      };
    }
    case 18: {
      return {
        heading: 'Circumference of a Circle',
        lines: [
          `The circumference of a circle = ${ans('2 x pi x radius')}`,
          `C = ${ans('2 x pi x r')}`,
        ],
      };
    }
    case 19: {
      return {
        heading: 'Associative Law',
        lines: [
          `For Addition: (a + b) + c = ${ans('a + (b + c)')}`,
          `For Multiplication: (a x b) x c = ${ans('a x (b x c)')}`,
        ],
      };
    }
    case 20: {
      return {
        heading: 'Commutative Law',
        lines: [
          `For Addition: a + b = ${ans('b + a')}`,
          `For Multiplication: a x b = ${ans('b x a')}`,
        ],
      };
    }
    case 21: {
      return {
        heading: 'Distributive Law',
        lines: [`The distributive law states: a(b + c) = ${ans('ab + ac')}`],
      };
    }
    case 22: {
      return {
        heading: 'Identity Law for Addition',
        lines: [`The identity law for addition states: a + 0 = ${ans('a')}`],
      };
    }
    case 23: {
      return {
        heading: 'Identity Law for Multiplication',
        lines: [`The identity law for multiplication states: a x 1 = ${ans('a')}`],
      };
    }
    case 24: {
      return {
        heading: 'Metric Equivalents',
        lines: [
          `10 millimeters = ${ans('1 centimeter')}`,
          `100 centimeters = ${ans('1 meter')}`,
          `1,000 meters = ${ans('1 kilometer')}`,
        ],
      };
    }
    default:
      return { heading: `Week ${week} Math`, lines: [] };
  }
}

/**
 * U.S. Geography mapping per week (Cycle 3) using state data from app.
 */
export const CYCLE_3_GEOGRAPHY_WEEKS: Record<
  number,
  { heading: string; states: { state: string; capital: string }[] }
> = {
  1: {
    heading: 'Northern New England',
    states: [
      { state: 'Maine', capital: 'Augusta' },
      { state: 'New Hampshire', capital: 'Concord' },
      { state: 'Massachusetts', capital: 'Boston' },
      { state: 'Rhode Island', capital: 'Providence' },
      { state: 'Connecticut', capital: 'Hartford' },
    ],
  },
  2: {
    heading: 'Mid-Atlantic',
    states: [
      { state: 'New York', capital: 'Albany' },
      { state: 'New Jersey', capital: 'Trenton' },
      { state: 'Pennsylvania', capital: 'Harrisburg' },
      { state: 'Delaware', capital: 'Dover' },
      { state: 'Maryland', capital: 'Annapolis' },
    ],
  },
  3: {
    heading: 'Upper South & Atlantic Coast',
    states: [
      { state: 'Virginia', capital: 'Richmond' },
      { state: 'West Virginia', capital: 'Charleston' },
      { state: 'North Carolina', capital: 'Raleigh' },
      { state: 'South Carolina', capital: 'Columbia' },
      { state: 'Georgia', capital: 'Atlanta' },
    ],
  },
  4: {
    heading: 'Deep South & Gulf Coast',
    states: [
      { state: 'Florida', capital: 'Tallahassee' },
      { state: 'Alabama', capital: 'Montgomery' },
      { state: 'Mississippi', capital: 'Jackson' },
      { state: 'Louisiana', capital: 'Baton Rouge' },
    ],
  },
  5: {
    heading: 'Eastern Midwest & Central',
    states: [
      { state: 'Michigan', capital: 'Lansing' },
      { state: 'Ohio', capital: 'Columbus' },
      { state: 'Indiana', capital: 'Indianapolis' },
      { state: 'Kentucky', capital: 'Frankfort' },
      { state: 'Tennessee', capital: 'Nashville' },
    ],
  },
  6: {
    heading: 'Western Midwest & Ozarks',
    states: [
      { state: 'Wisconsin', capital: 'Madison' },
      { state: 'Illinois', capital: 'Springfield' },
      { state: 'Iowa', capital: 'Des Moines' },
      { state: 'Missouri', capital: 'Jefferson City' },
      { state: 'Arkansas', capital: 'Little Rock' },
    ],
  },
  7: {
    heading: 'Northern Plains',
    states: [
      { state: 'Minnesota', capital: 'Saint Paul' },
      { state: 'North Dakota', capital: 'Bismarck' },
      { state: 'South Dakota', capital: 'Pierre' },
      { state: 'Nebraska', capital: 'Lincoln' },
      { state: 'Kansas', capital: 'Topeka' },
    ],
  },
  8: {
    heading: 'South Central & Texas',
    states: [
      { state: 'Oklahoma', capital: 'Oklahoma City' },
      { state: 'Texas', capital: 'Austin' },
    ],
  },
  9: {
    heading: 'Northern Rockies & Pacific Northwest',
    states: [
      { state: 'Colorado', capital: 'Denver' },
      { state: 'Wyoming', capital: 'Cheyenne' },
      { state: 'Montana', capital: 'Helena' },
      { state: 'Idaho', capital: 'Boise' },
      { state: 'Washington', capital: 'Olympia' },
    ],
  },
  10: {
    heading: 'Southwest & Great Basin',
    states: [
      { state: 'Oregon', capital: 'Salem' },
      { state: 'California', capital: 'Sacramento' },
      { state: 'Nevada', capital: 'Carson City' },
      { state: 'Utah', capital: 'Salt Lake City' },
      { state: 'Arizona', capital: 'Phoenix' },
      { state: 'New Mexico', capital: 'Santa Fe' },
    ],
  },
  11: {
    heading: 'Non-Contiguous States',
    states: [
      { state: 'Alaska', capital: 'Juneau' },
      { state: 'Hawaii', capital: 'Honolulu' },
    ],
  },
  12: {
    heading: 'Review: Northern States & Capitals',
    states: [
      { state: 'Maine', capital: 'Augusta' },
      { state: 'Vermont', capital: 'Montpelier' },
      { state: 'New Hampshire', capital: 'Concord' },
      { state: 'Massachusetts', capital: 'Boston' },
      { state: 'New York', capital: 'Albany' },
    ],
  },
  13: {
    heading: 'Review: Mid-Atlantic States & Capitals',
    states: [
      { state: 'Pennsylvania', capital: 'Harrisburg' },
      { state: 'Maryland', capital: 'Annapolis' },
      { state: 'Virginia', capital: 'Richmond' },
      { state: 'North Carolina', capital: 'Raleigh' },
    ],
  },
  14: {
    heading: 'Review: Southern States & Capitals',
    states: [
      { state: 'South Carolina', capital: 'Columbia' },
      { state: 'Georgia', capital: 'Atlanta' },
      { state: 'Florida', capital: 'Tallahassee' },
      { state: 'Alabama', capital: 'Montgomery' },
    ],
  },
  15: {
    heading: 'Review: Gulf & Delta States & Capitals',
    states: [
      { state: 'Mississippi', capital: 'Jackson' },
      { state: 'Louisiana', capital: 'Baton Rouge' },
      { state: 'Arkansas', capital: 'Little Rock' },
      { state: 'Tennessee', capital: 'Nashville' },
    ],
  },
  16: {
    heading: 'Review: Great Lakes States & Capitals',
    states: [
      { state: 'Ohio', capital: 'Columbus' },
      { state: 'Michigan', capital: 'Lansing' },
      { state: 'Indiana', capital: 'Indianapolis' },
      { state: 'Illinois', capital: 'Springfield' },
      { state: 'Wisconsin', capital: 'Madison' },
    ],
  },
  17: {
    heading: 'Review: Central Plains States & Capitals',
    states: [
      { state: 'Iowa', capital: 'Des Moines' },
      { state: 'Missouri', capital: 'Jefferson City' },
      { state: 'Kansas', capital: 'Topeka' },
      { state: 'Nebraska', capital: 'Lincoln' },
    ],
  },
  18: {
    heading: 'Review: Northern Plains States & Capitals',
    states: [
      { state: 'Minnesota', capital: 'Saint Paul' },
      { state: 'North Dakota', capital: 'Bismarck' },
      { state: 'South Dakota', capital: 'Pierre' },
      { state: 'Wyoming', capital: 'Cheyenne' },
    ],
  },
  19: {
    heading: 'Review: Mountain States & Capitals',
    states: [
      { state: 'Colorado', capital: 'Denver' },
      { state: 'Utah', capital: 'Salt Lake City' },
      { state: 'Montana', capital: 'Helena' },
      { state: 'Idaho', capital: 'Boise' },
    ],
  },
  20: {
    heading: 'Review: Southwest States & Capitals',
    states: [
      { state: 'Texas', capital: 'Austin' },
      { state: 'Oklahoma', capital: 'Oklahoma City' },
      { state: 'New Mexico', capital: 'Santa Fe' },
      { state: 'Arizona', capital: 'Phoenix' },
    ],
  },
  21: {
    heading: 'Review: Pacific Northwest States & Capitals',
    states: [
      { state: 'Washington', capital: 'Olympia' },
      { state: 'Oregon', capital: 'Salem' },
      { state: 'Nevada', capital: 'Carson City' },
      { state: 'California', capital: 'Sacramento' },
    ],
  },
  22: {
    heading: 'Review: Pacific Coast & Islands',
    states: [
      { state: 'California', capital: 'Sacramento' },
      { state: 'Hawaii', capital: 'Honolulu' },
      { state: 'Alaska', capital: 'Juneau' },
    ],
  },
  23: {
    heading: 'Review: Eastern Seaboard Highlights',
    states: [
      { state: 'Delaware', capital: 'Dover' },
      { state: 'Rhode Island', capital: 'Providence' },
      { state: 'Connecticut', capital: 'Hartford' },
      { state: 'New Jersey', capital: 'Trenton' },
    ],
  },
  24: {
    heading: 'Review: United States Capitals Capstone',
    states: [
      { state: 'Washington, D.C.', capital: 'Nation Capital' },
      { state: 'Virginia', capital: 'Richmond' },
      { state: 'Maryland', capital: 'Annapolis' },
      { state: 'Pennsylvania', capital: 'Harrisburg' },
    ],
  },
};

/**
 * Classical Conversations Timeline (All 161 card titles grouped by week + Week 24 Presidents)
 * 7 cards per week for Weeks 1–23 (161 cards total), plus Week 24 U.S. Presidents song groups.
 */
export const CYCLE_3_TIMELINE_WEEKS: Record<
  number,
  { heading: string; cards: string[] }
> = {
  1: {
    heading: 'Week 1: Cards 1–7 (Age of Ancient Empires)',
    cards: [
      '1. Age of Ancient Empires (Creation to circa 450 A.D.)',
      '2. Creation and the Fall',
      '3. The Flood and the Tower of Babel',
      '4. Mesopotamia and Sumer',
      '5. Egyptians',
      '6. Indus River Valley Civilization',
      '7. Minoans and Mycenaeans',
    ],
  },
  2: {
    heading: 'Week 2: Cards 8–14 (Ancient Empires & Dynasties)',
    cards: [
      '8. Seven Wonders of the Ancient World',
      '9. Patriarchs of Israel',
      '10. Hittites and Canaanites',
      '11. Kushites',
      '12. Assyrians',
      '13. Babylonians',
      '14. China\'s Shang Dynasty',
    ],
  },
  3: {
    heading: 'Week 3: Cards 15–21 (Early Civilizations & Israel)',
    cards: [
      '15. Hinduism in India',
      '16. Phoenicians and the Alphabet',
      '17. Olmecs of Mesoamerica',
      '18. Israelite Exodus and Desert Wandering',
      '19. Israelite Conquest and Judges',
      '20. Greek Dark Ages',
      '21. Israel\'s United Kingdom',
    ],
  },
  4: {
    heading: 'Week 4: Cards 22–28 (Kingdoms & Philosophers)',
    cards: [
      '22. Early Native Americans',
      '23. Israel Divides into Two Kingdoms',
      '24. Homer and Hesiod',
      '25. Rome Founded by Romulus and Remus',
      '26. Israel Falls to Assyria',
      '27. Assyria Falls to Babylon',
      '28. Lao-Tzu, Confucius, Buddha',
    ],
  },
  5: {
    heading: 'Week 5: Cards 29–35 (Persia & Classical Greece)',
    cards: [
      '29. Judah Falls to Babylon, Temple Destroyed',
      '30. Babylon Falls to Persia',
      '31. Jews Return and Rebuild the Temple',
      '32. Roman Republic',
      '33. Golden Age of Greece',
      '34. Peloponnesian Wars',
      '35. Persia Falls to Alexander the Great',
    ],
  },
  6: {
    heading: 'Week 6: Cards 36–42 (Rome, Greece & Caesar)',
    cards: [
      '36. India\'s Mauryan Empire',
      '37. Mayans of Mesoamerica',
      '38. Punic Wars',
      '39. Rome Conquers Greece',
      '40. Roman Dictator Julius Caesar',
      '41. Caesar Augustus and the Pax Romana',
      '42. John the Baptist',
    ],
  },
  7: {
    heading: 'Week 7: Cards 43–49 (Early Church & Roman Empire)',
    cards: [
      '43. Jesus the Messiah',
      '44. Pentecost and the Early Church',
      '45. Persecution Spreads the Gospel',
      '46. Herod\'s Temple Destroyed by Titus',
      '47. Diocletian Divides the Roman Empire',
      '48. Constantine Legalizes Christianity',
      '49. India\'s Gupta Dynasty',
    ],
  },
  8: {
    heading: 'Week 8: Cards 50–56 (Church Councils & Middle Ages)',
    cards: [
      '50. Council of Nicaea',
      '51. Augustine of Hippo',
      '52. Jerome Completes the Vulgate',
      '53. Visigoths Sack Rome',
      '54. The Middle Ages (circa 450 to circa 1500)',
      '55. Council of Chalcedon',
      '56. Western Roman Empire Falls to Barbarians',
    ],
  },
  9: {
    heading: 'Week 9: Cards 57–63 (Byzantine & Rise of Islam)',
    cards: [
      '57. Byzantine Emperor Justinian',
      '58. Benedict and Monasticism',
      '59. Muhammad Founds Islam',
      '60. Zanj and Early Ghana in Africa',
      '61. Franks Defeat Muslims at the Battle of Tours',
      '62. Golden Age of Islam',
      '63. Vikings Raid and Trade',
    ],
  },
  10: {
    heading: 'Week 10: Cards 64–70 (Mound Builders to East-West Schism)',
    cards: [
      '64. Early North American Mound Builders',
      '65. Charlemagne Crowned Emperor of Europe',
      '66. Alfred the Great of England',
      '67. Erik the Red and Leif Eriksson, Norse Explorers',
      '68. Vladimir I of Kiev',
      '69. Byzantine Emperor Basil II',
      '70. East-West Schism of the Church',
    ],
  },
  11: {
    heading: 'Week 11: Cards 71–77 (Feudalism, Crusades & Americas)',
    cards: [
      '71. Norman Conquest and Feudalism in Europe',
      '72. The Crusades',
      '73. Zimbabwe and Early Mali in Africa',
      '74. Aztecs of Mesoamerica',
      '75. Francis of Assisi and Thomas Aquinas',
      '76. Japan\'s Shoguns',
      '77. Incas of South America',
    ],
  },
  12: {
    heading: 'Week 12: Cards 78–84 (Mongols, Magna Carta & Renaissance)',
    cards: [
      '78. Genghis Khan Rules the Mongols',
      '79. England\'s Magna Carta',
      '80. Ottoman Empire',
      '81. Marco Polo\'s Journey to China',
      '82. The Hundred Years\' War and Black Death',
      '83. The Renaissance',
      '84. China\'s Ming Dynasty',
    ],
  },
  13: {
    heading: 'Week 13: Cards 85–91 (Age of Exploration & Navigation)',
    cards: [
      '85. Age of Exploration (circa 1400 to circa 1600)',
      '86. Prince Henry Founds School of Navigation',
      '87. Slave Trade in Africa',
      '88. Gutenberg\'s Printing Press',
      '89. Songhai in Africa',
      '90. Czar Ivan the Great of Russia',
      '91. The Spanish Inquisition',
    ],
  },
  14: {
    heading: 'Week 14: Cards 92–98 (Reformation & Absolute Monarchs)',
    cards: [
      '92. Columbus Sails to the Caribbean',
      '93. Age of Absolute Monarchs (circa 1500 to circa 1800)',
      '94. Protestant Reformation',
      '95. Spanish Conquistadors in the Americas',
      '96. Calvin\'s Institutes of the Christian Religion',
      '97. Council of Trent',
      '98. Baroque Period of the Arts',
    ],
  },
  15: {
    heading: 'Week 15: Cards 99–105 (Enlightenment & Colonies)',
    cards: [
      '99. Japan\'s Isolation',
      '100. Jamestown and Plymouth Colony Founded',
      '101. Age of Enlightenment (circa 1650 to circa 1800)',
      '102. Hudson\'s Bay Company',
      '103. First Great Awakening',
      '104. Classical Period of the Arts',
      '105. The Seven Years\' War',
    ],
  },
  16: {
    heading: 'Week 16: Cards 106–112 (Industry, Revolutions & Lewis and Clark)',
    cards: [
      '106. Age of Industry (circa 1760 to circa 1969)',
      '107. James Cook Sails to Australia and Antarctica',
      '108. American Revolution and General George Washington',
      '109. Madison\'s Constitution and the Bill of Rights',
      '110. French Revolution',
      '111. Second Great Awakening',
      '112. Louisiana Purchase and Lewis and Clark Expedition',
    ],
  },
  17: {
    heading: 'Week 17: Cards 113–119 (Napoleon & Romantic Period)',
    cards: [
      '113. Napoleon Crowned Emperor of France',
      '114. Liberation of South America',
      '115. The War of 1812',
      '116. The Missouri Compromise',
      '117. Immigrants Flock to America',
      '118. The Monroe Doctrine',
      '119. Romantic Period of the Arts',
    ],
  },
  18: {
    heading: 'Week 18: Cards 120–126 (Westward Expansion & Dred Scott)',
    cards: [
      '120. Cherokee Trail of Tears',
      '121. U.S. Westward Expansion',
      '122. Marx Publishes The Communist Manifesto',
      '123. The Compromise of 1850 and the Dred Scott Decision',
      '124. U.S. Restores Trade with Japan',
      '125. British Queen Victoria\'s Rule Over India',
      '126. Darwin Publishes On the Origin of Species',
    ],
  },
  19: {
    heading: 'Week 19: Cards 127–133 (War Between States & Progressive Era)',
    cards: [
      '127. Lincoln\'s War Between the States',
      '128. Reconstruction of the Southern States',
      '129. Dominion of Canada',
      '130. Otto von Bismarck Unifies Germany',
      '131. Boer War in Africa',
      '132. The Spanish-American War',
      '133. The Progressive Era',
    ],
  },
  20: {
    heading: 'Week 20: Cards 134–140 (World War I & Bolshevik Revolution)',
    cards: [
      '134. Australia Becomes a Commonwealth',
      '135. Mexican Revolution',
      '136. World War I and President Wilson',
      '137. Lenin and the Bolshevik Revolution in Russia',
      '138. U.S. Evangelist Billy Sunday',
      '139. Modern Period of the Arts',
      '140. Scopes Trial',
    ],
  },
  21: {
    heading: 'Week 21: Cards 141–147 (Depression, World War II & Cold War)',
    cards: [
      '141. The Great Depression and the New Deal',
      '142. World War II and President Franklin D. Roosevelt',
      '143. Stalin of the USSR and the Katyn Massacre',
      '144. The United Nations Formed',
      '145. The Cold War',
      '146. Gandhi and India\'s Independence',
      '147. Jewish State Established',
    ],
  },
  22: {
    heading: 'Week 22: Cards 148–154 (Civil Rights Movement & Vietnam)',
    cards: [
      '148. Mao and Communist Victory in China',
      '149. North Atlantic Treaty Organization Formed',
      '150. The Korean War',
      '151. Martin Luther King, Jr. and the Civil Rights Movement',
      '152. Jim and Elisabeth Elliot, Missionaries to Ecuador',
      '153. The Antarctic Treaty',
      '154. The Vietnam War',
    ],
  },
  23: {
    heading: 'Week 23: Cards 155–161 (Moon Walk to September 11, 2001)',
    cards: [
      '155. U.S. Astronauts Walk on the Moon',
      '156. Age of Information and Globalization (circa 1970 to the Present)',
      '157. Watergate, President Nixon Resigns',
      '158. Fall of Communism in Eastern Europe',
      '159. European Union Formed',
      '160. Apartheid Abolished in South Africa',
      '161. September 11, 2001',
    ],
  },
  24: {
    heading: 'Week 24: Presidents of the United States (Groups 1–7)',
    cards: [
      'Group 1: Washington, Adams, Jefferson, Madison, Monroe',
      'Group 2: Adams, Jackson, Van Buren, Harrison, Tyler, Polk, Taylor',
      'Group 3: Fillmore, Pierce, Buchanan, Lincoln, Johnson, Grant, Hayes',
      'Group 4: Garfield, Arthur, Cleveland, Harrison, Cleveland, McKinley',
      'Group 5: Roosevelt, Taft, Wilson, Harding, Coolidge, Hoover',
      'Group 6: Roosevelt, Truman, Eisenhower, Kennedy, Johnson, Nixon, Ford',
      'Group 7: Carter, Reagan, Bush, Clinton, Bush, Obama, Trump, Biden, Trump',
    ],
  },
};

/**
 * Classical Conversations Cycle 3 Science (Weeks 1–24 Complete Q&A)
 * Human Anatomy (Weeks 1–12), Chemistry (Weeks 13–18), Origins & Probability (Weeks 19–24).
 */
export const CYCLE_3_SCIENCE_WEEKS: Record<
  number,
  { question: string; answer: string; heading: string; lines: string[] }
> = {
  1: {
    heading: 'Week 1: Four Types of Tissue',
    question: 'What are four types of tissue?',
    answer: 'Connective, epithelial, muscle, nerve.',
    lines: ['Connective, epithelial, muscle, nerve.'],
  },
  2: {
    heading: 'Week 2: The Axial Skeleton',
    question: 'Which bones make up the axial skeleton?',
    answer: 'Skull, vertebrae, ribs, sternum.',
    lines: ['Skull, vertebrae, ribs, sternum.'],
  },
  3: {
    heading: 'Week 3: Three Types of Muscle',
    question: 'What are three types of muscle?',
    answer: 'Skeletal, smooth, cardiac.',
    lines: ['Skeletal, smooth, cardiac.'],
  },
  4: {
    heading: 'Week 4: The Nervous System',
    question: 'What are three parts of the nervous system?',
    answer: 'Brain, spinal cord, nerves.',
    lines: ['Brain, spinal cord, nerves.'],
  },
  5: {
    heading: 'Week 5: The Five Senses',
    question: 'What are the five main senses?',
    answer: 'Sight, hearing, taste, smell, touch.',
    lines: ['Sight, hearing, taste, smell, touch.'],
  },
  6: {
    heading: 'Week 6: The Digestive System',
    question: 'What are some parts of the digestive system?',
    answer: 'Mouth, esophagus, stomach, liver, small intestine, large intestine.',
    lines: ['Mouth, esophagus, stomach, liver, small intestine, large intestine.'],
  },
  7: {
    heading: 'Week 7: The Excretory System',
    question: 'What are four parts of the excretory system?',
    answer: 'Urinary tract, lungs, skin, intestines.',
    lines: ['Urinary tract, lungs, skin, intestines.'],
  },
  8: {
    heading: 'Week 8: The Circulatory System',
    question: 'What are six parts of the circulatory system?',
    answer: 'Heart, arteries, veins, capillaries, red and white blood cells, platelets.',
    lines: ['Heart, arteries, veins, capillaries, red and white blood cells, platelets.'],
  },
  9: {
    heading: 'Week 9: The Lymph System',
    question: 'What are four parts of the lymph system?',
    answer: 'Lymph vessels, lymph nodes, spleen, thymus.',
    lines: ['Lymph vessels, lymph nodes, spleen, thymus.'],
  },
  10: {
    heading: 'Week 10: The Respiratory System',
    question: 'What are some parts of the respiratory system?',
    answer: 'Nose, pharynx, larynx, trachea, bronchi, bronchioles, alveoli, lungs.',
    lines: ['Nose, pharynx, larynx, trachea, bronchi, bronchioles, alveoli, lungs.'],
  },
  11: {
    heading: 'Week 11: The Endocrine System',
    question: 'What is the endocrine system?',
    answer: 'The endocrine system consists of glands that secrete hormones into the bloodstream.',
    lines: ['The endocrine system consists of glands that secrete hormones into the bloodstream.'],
  },
  12: {
    heading: 'Week 12: Major Purposes of Blood',
    question: 'What are the major purposes of blood?',
    answer: 'Transportation, protection, regulation.',
    lines: ['Transportation, protection, regulation.'],
  },
  13: {
    heading: 'Week 13: Atomic Number',
    question: 'What is the atomic number?',
    answer: 'The atomic number is the number of protons in the nucleus of an atom.',
    lines: ['The atomic number is the number of protons in the nucleus of an atom.'],
  },
  14: {
    heading: 'Week 14: Chemical Element',
    question: 'What is an element?',
    answer: 'An element is a basic chemical substance that cannot be broken down into simpler substances.',
    lines: ['An element is a basic chemical substance that cannot be broken down into simpler substances.'],
  },
  15: {
    heading: 'Week 15: Parts of an Atom',
    question: 'What are the parts of an atom?',
    answer: 'Nucleus, protons, electrons, quarks, leptons, neutrons.',
    lines: ['Nucleus, protons, electrons, quarks, leptons, neutrons.'],
  },
  16: {
    heading: 'Week 16: Periodic Table Elements 1–4',
    question: 'What are the first four elements in the periodic table?',
    answer: '1 Hydrogen H 1, 2 Helium He 4, 3 Lithium Li 7, 4 Beryllium Be 9.',
    lines: ['1 Hydrogen H 1, 2 Helium He 4, 3 Lithium Li 7, 4 Beryllium Be 9.'],
  },
  17: {
    heading: 'Week 17: Periodic Table Elements 5–8',
    question: 'What are the second four elements in the periodic table?',
    answer: '5 Boron B 11, 6 Carbon C 12, 7 Nitrogen N 14, 8 Oxygen O 16.',
    lines: ['5 Boron B 11, 6 Carbon C 12, 7 Nitrogen N 14, 8 Oxygen O 16.'],
  },
  18: {
    heading: 'Week 18: Periodic Table Elements 9–12',
    question: 'What are the third four elements in the periodic table?',
    answer: '9 Fluorine F 19, 10 Neon Ne 20, 11 Sodium Na 23, 12 Magnesium Mg 24.',
    lines: ['9 Fluorine F 19, 10 Neon Ne 20, 11 Sodium Na 23, 12 Magnesium Mg 24.'],
  },
  19: {
    heading: 'Week 19: Acids and Bases',
    question: 'What is the difference between an acid and a base?',
    answer: 'An acid donates a hydrogen ion and tastes sour; a base accepts a hydrogen ion and tastes bitter.',
    lines: [
      'An acid donates a hydrogen ion and tastes sour; a base accepts a hydrogen ion and tastes bitter.',
    ],
  },
  20: {
    heading: 'Week 20: Chemical Bonds of DNA',
    question: 'What do the chemical bonds of DNA consist of?',
    answer: 'Pairs of hydrogen-bonded nucleotide bases: adenine and thymine, guanine and cytosine.',
    lines: [
      'Pairs of hydrogen-bonded nucleotide bases: adenine and thymine, guanine and cytosine.',
    ],
  },
  21: {
    heading: 'Week 21: Theory of Evolution',
    question: 'What does the theory of evolution rely on?',
    answer: 'The theory of evolution relies on the belief that life began as a chance combination of non-living things.',
    lines: [
      'The theory of evolution relies on the belief that life began as a chance combination of non-living things.',
    ],
  },
  22: {
    heading: 'Week 22: Theory of Intelligent Design',
    question: 'What does the theory of intelligent design rely on?',
    answer: 'The theory of intelligent design relies on the belief that life began as the result of intention and purpose.',
    lines: [
      'The theory of intelligent design relies on the belief that life began as the result of intention and purpose.',
    ],
  },
  23: {
    heading: 'Week 23: Preservation of Earth’s History',
    question: 'What are some ways Earth\'s history is preserved?',
    answer: 'Rocks, fossils, ice, tar, amber.',
    lines: ['Rocks, fossils, ice, tar, amber.'],
  },
  24: {
    heading: 'Week 24: Natural Selection',
    question: 'What is natural selection?',
    answer: 'Natural selection is the idea that the fittest survive and pass along their traits to their offspring.',
    lines: [
      'Natural selection is the idea that the fittest survive and pass along their traits to their offspring.',
    ],
  },
};

/**
 * Classical Conversations Cycle 3 English Grammar (Weeks 1–24 Complete)
 * Definitions, verb principal parts, sentence parts, structures, and patterns.
 */
export const CYCLE_3_ENGLISH_WEEKS: Record<
  number,
  { topic: string; heading: string; lines: string[]; prompt?: string; answer?: string }
> = {
  1: {
    topic: 'Infinitive',
    heading: 'Week 1: Infinitive',
    prompt: 'Infinitive',
    answer: 'An infinitive is "to" plus a verb, used as a noun, adjective, or adverb.',
    lines: ['An infinitive is "to" plus a verb, used as a noun, adjective, or adverb.'],
  },
  2: {
    topic: 'Present Participle',
    heading: 'Week 2: Present Participle',
    prompt: 'Present Participle',
    answer: 'A present participle is a verb ending in "-ing" used as an adjective or a verb.',
    lines: ['A present participle is a verb ending in "-ing" used as an adjective or a verb.'],
  },
  3: {
    topic: 'Past Participle',
    heading: 'Week 3: Past Participle',
    prompt: 'Past Participle',
    answer: 'A past participle is a verb plus "-ed" used as an adjective or a verb.',
    lines: ['A past participle is a verb plus "-ed" used as an adjective or a verb.'],
  },
  4: {
    topic: 'Verb Principal Parts',
    heading: 'Week 4: Verb Principal Parts',
    prompt: 'Verb Principal Parts',
    answer: 'Every verb has five principal parts: infinitive, present, past, present participle, past participle.',
    lines: [
      'Every verb has five principal parts: infinitive, present, past, present participle, past participle.',
    ],
  },
  5: {
    topic: 'To Be',
    heading: 'Week 5: Verb "To Be"',
    prompt: 'To be',
    answer: 'be, am/is/are, was/were, being, been.',
    lines: ['be, am/is/are, was/were, being, been.'],
  },
  6: {
    topic: 'To Do',
    heading: 'Week 6: Verb "To Do"',
    prompt: 'To do',
    answer: 'do, do/does, did, doing, done.',
    lines: ['do, do/does, did, doing, done.'],
  },
  7: {
    topic: 'To Rise',
    heading: 'Week 7: Verb "To Rise"',
    prompt: 'To rise',
    answer: 'rise, rise/rises, rose, rising, risen.',
    lines: ['rise, rise/rises, rose, rising, risen.'],
  },
  8: {
    topic: 'To Raise',
    heading: 'Week 8: Verb "To Raise"',
    prompt: 'To raise',
    answer: 'raise, raise/raises, raised, raising, raised.',
    lines: ['raise, raise/raises, raised, raising, raised.'],
  },
  9: {
    topic: 'To Lay',
    heading: 'Week 9: Verb "To Lay"',
    prompt: 'To lay',
    answer: 'lay, lay/lays, laid, laying, laid.',
    lines: ['lay, lay/lays, laid, laying, laid.'],
  },
  10: {
    topic: 'To Lie',
    heading: 'Week 10: Verb "To Lie"',
    prompt: 'To lie',
    answer: 'lie, lie/lies, lay, lying, lain.',
    lines: ['lie, lie/lies, lay, lying, lain.'],
  },
  11: {
    topic: 'To Set',
    heading: 'Week 11: Verb "To Set"',
    prompt: 'To set',
    answer: 'set, set/sets, set, setting, set.',
    lines: ['set, set/sets, set, setting, set.'],
  },
  12: {
    topic: 'To Sit',
    heading: 'Week 12: Verb "To Sit"',
    prompt: 'To sit',
    answer: 'sit, sit/sits, sat, sitting, sat.',
    lines: ['sit, sit/sits, sat, sitting, sat.'],
  },
  13: {
    topic: 'To Beat',
    heading: 'Week 13: Verb "To Beat"',
    prompt: 'To beat',
    answer: 'beat, beat/beats, beat, beating, beaten.',
    lines: ['beat, beat/beats, beat, beating, beaten.'],
  },
  14: {
    topic: 'To Break',
    heading: 'Week 14: Verb "To Break"',
    prompt: 'To break',
    answer: 'break, break/breaks, broke, breaking, broken.',
    lines: ['break, break/breaks, broke, breaking, broken.'],
  },
  15: {
    topic: 'To Write',
    heading: 'Week 15: Verb "To Write"',
    prompt: 'To write',
    answer: 'write, write/writes, wrote, writing, written.',
    lines: ['write, write/writes, wrote, writing, written.'],
  },
  16: {
    topic: 'To Go',
    heading: 'Week 16: Verb "To Go"',
    prompt: 'To go',
    answer: 'go, go/goes, went, going, gone.',
    lines: ['go, go/goes, went, going, gone.'],
  },
  17: {
    topic: 'Subject',
    heading: 'Week 17: Subject',
    prompt: 'Subject',
    answer: 'The subject is that part of a sentence about which something is being said.',
    lines: ['The subject is that part of a sentence about which something is being said.'],
  },
  18: {
    topic: 'Predicate',
    heading: 'Week 18: Predicate',
    prompt: 'Predicate',
    answer: 'The predicate is that part of a sentence that says something about the subject.',
    lines: ['The predicate is that part of a sentence that says something about the subject.'],
  },
  19: {
    topic: 'Clause',
    heading: 'Week 19: Clause',
    prompt: 'Clause',
    answer: 'A clause is a group of words that contains both a subject and a verb.',
    lines: ['A clause is a group of words that contains both a subject and a verb.'],
  },
  20: {
    topic: 'Independent Clause',
    heading: 'Week 20: Independent Clause',
    prompt: 'Independent Clause',
    answer: 'An independent clause expresses a complete thought and can stand alone as a sentence.',
    lines: ['An independent clause expresses a complete thought and can stand alone as a sentence.'],
  },
  21: {
    topic: 'Subordinate Clause',
    heading: 'Week 21: Subordinate Clause',
    prompt: 'Subordinate Clause',
    answer: 'A subordinate clause does not express a complete thought and cannot stand alone.',
    lines: ['A subordinate clause does not express a complete thought and cannot stand alone.'],
  },
  22: {
    topic: 'Phrase',
    heading: 'Week 22: Phrase',
    prompt: 'Phrase',
    answer: 'A phrase is a group of words that does not contain both a subject and a verb and may be used as a single part of speech.',
    lines: ['A phrase is a group of words that does not contain both a subject and a verb and may be used as a single part of speech.'],
  },
  23: {
    topic: 'Sentence Structures',
    heading: 'Week 23: Sentence Structures',
    prompt: 'The four sentence structures are',
    answer: 'simple, compound, complex, and compound-complex.',
    lines: ['simple, compound, complex, and compound-complex.'],
  },
  24: {
    topic: 'Sentence Patterns',
    heading: 'Week 24: Sentence Patterns',
    prompt: 'The seven sentence patterns are',
    answer: 'S-Vi, S-Vt-DO, S-Vl-PN, S-Vl-PA, S-Vt-IO-DO, S-Vt-DO-OCN, S-Vt-DO-OCA.',
    lines: ['S-Vi, S-Vt-DO, S-Vl-PN, S-Vl-PA, S-Vt-IO-DO, S-Vt-DO-OCN, S-Vt-DO-OCA.'],
  },
};

/**
 * Classical Conversations Cycle 3 History (Weeks 1–24 Complete)
 * Early America through modern history, including the full Preamble (Week 23) and Bill of Rights (Week 24).
 */
export const CYCLE_3_HISTORY_WEEKS: Record<
  number,
  { heading: string; lines: string[] }
> = {
  1: {
    heading: 'Tell me about Columbus.',
    lines: [
      'In 1492, Columbus made the first of four trips to the Caribbean on three Spanish ships named the Nina, the Pinta, and the Santa Maria.',
    ],
  },
  2: {
    heading: 'Tell me about the Pilgrims.',
    lines: [
      'In 1620, the Pilgrims sailed from Plymouth, England, and signed the Mayflower Compact before founding Plymouth Colony in North America.',
    ],
  },
  3: {
    heading: 'Tell me about the Boston Tea Party.',
    lines: [
      'In 1773, the Boston Tea Party took place when colonists dumped British tea into Boston Harbor to protest taxation without representation.',
    ],
  },
  4: {
    heading: 'Tell me about the Declaration of Independence.',
    lines: [
      'In 1776, the Continental Congress published the Declaration of Independence in Philadelphia, announcing the colonists\' intent to separate from England.',
    ],
  },
  5: {
    heading: 'Tell me about George Washington.',
    lines: [
      'In 1789, in New York, George Washington was inaugurated as the first President of the United States.',
    ],
  },
  6: {
    heading: 'Tell me about the Louisiana Purchase.',
    lines: [
      'In 1803, the purchase of Louisiana from France prompted westward exploration by pioneers such as Lewis and Clark and Congressman Davy Crockett.',
    ],
  },
  7: {
    heading: 'Tell me about the Monroe Doctrine.',
    lines: [
      'In 1823, the Monroe Doctrine warned European powers not to attempt further colonization in the Americas.',
    ],
  },
  8: {
    heading: 'Tell me about the Missouri Compromise.',
    lines: [
      'In 1820, Henry Clay worked out the Missouri Compromise, allowing Missouri to enter the Union as a slave state and Maine as a free state.',
    ],
  },
  9: {
    heading: 'Tell me about the Compromise of 1850.',
    lines: [
      'The Compromise of 1850, the Fugitive Slave Act, and the Dred Scott decision preceded the secession of the Southern states.',
    ],
  },
  10: {
    heading: 'Tell me about Manifest Destiny.',
    lines: [
      'President Polk believed that the Mexican War and the Gadsden Purchase in the mid-1800s affirmed America\'s manifest destiny to spread across the continent.',
    ],
  },
  11: {
    heading: 'Tell me about the Civil War.',
    lines: [
      'In 1861, the Civil War began when President Abraham Lincoln went to war with the southern states that seceded from the Union.',
    ],
  },
  12: {
    heading: 'Tell me about General Robert E. Lee.',
    lines: [
      'In 1865, General Robert E. Lee surrendered his Army of Northern Virginia to General Ulysses S. Grant at Appomattox Court House in Virginia.',
    ],
  },
  13: {
    heading: 'Tell me about the Fourteenth Amendment.',
    lines: [
      'In 1868, the Fourteenth Amendment made all persons born or naturalized in the United States citizens, ensuring equal protection under the law.',
    ],
  },
  14: {
    heading: 'Tell me about tycoons of industry.',
    lines: [
      'During the late 1800s, tycoons like Vanderbilt, Rockefeller, Carnegie, and Swift fueled the nation\'s industrial age by developing American resources.',
    ],
  },
  15: {
    heading: 'Tell me about immigrants.',
    lines: [
      'From 1820 to 1930, more than 37 million immigrants arrived in the United States, seeking freedom and opportunities to increase their personal wealth.',
    ],
  },
  16: {
    heading: 'Tell me about World War I.',
    lines: [
      'In 1917, President Wilson asked Congress to enter World War I against the Central Powers two years after German U-boats sank the Lusitania, killing American citizens.',
    ],
  },
  17: {
    heading: 'Tell me about the Nineteenth Amendment.',
    lines: [
      'In 1920, the Nineteenth Amendment to the U.S. Constitution granted women the right to vote.',
    ],
  },
  18: {
    heading: 'Tell me about Pearl Harbor.',
    lines: [
      'On December 7, 1941, the Japanese bombed Pearl Harbor, Hawaii, causing the United States to join the Allies in World War II.',
    ],
  },
  19: {
    heading: 'Tell me about the formation of NATO.',
    lines: [
      'In 1949, the United States and its allies formed the North Atlantic Treaty Organization to resist the spread of Soviet communism.',
    ],
  },
  20: {
    heading: 'Tell me about Brown v. Board of Education.',
    lines: [
      'In 1954, in Brown versus Board of Education, the Supreme Court ruled that racial segregation in public schools was unconstitutional.',
    ],
  },
  21: {
    heading: 'Tell me about the U.S. astronauts.',
    lines: [
      'In 1969, U.S. astronaut Neil Armstrong stepped onto the Moon, declaring, "That\'s one small step for man, one giant leap for mankind."',
    ],
  },
  22: {
    heading: 'Tell me about September 11, 2001.',
    lines: [
      'On September 11, 2001, terrorists hijacked four airplanes. They flew two into the World Trade Center in New York City, and one into the Pentagon in Washington, D.C. The fourth plane crashed into a Pennsylvania field.',
    ],
  },
  23: {
    heading: 'The Preamble to the U.S. Constitution.',
    lines: [
      'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
    ],
  },
  24: {
    heading: 'The Bill of Rights.',
    lines: [
      'Amendment 1: Freedom of religion, speech, press, assembly, and petition.',
      'Amendment 2: The right to keep and bear arms.',
      'Amendment 3: No quartering of soldiers in private homes.',
      'Amendment 4: No unreasonable searches and seizures.',
      'Amendment 5: Due process, no self-incrimination, no double jeopardy.',
      'Amendment 6: The right to a speedy and public trial by jury.',
      'Amendment 7: The right to a jury trial in civil lawsuits.',
      'Amendment 8: No excessive bail or cruel and unusual punishment.',
      'Amendment 9: Rights retained by the people not listed here.',
      'Amendment 10: Powers not given to the federal government belong to the states.',
    ],
  },
};

/**
 * Subject guide upload registry.
 * Records whether weekly guide pages have been uploaded as photos.
 * STRICT RULE: If not uploaded, NEVER invent from memory; mark hasGuidePage: false.
 */
export interface SubjectWeekRecord {
  week: number;
  hasGuidePage: boolean;
  heading: string;
  prompt?: string;
  lines: string[];
  items?: WorksheetItem[];
}

/**
 * Cycle Subject Guide Data (Cycles 1, 2, 3)
 * Cycle 3 is 100% complete across all 24 weeks for all subjects from Summary Proof Sheets.
 * Cycles 1 & 2 guide pages for Science, History, Timeline, English remain pending upload.
 */
export function getSubjectGuideData(
  cycle: 1 | 2 | 3,
  subject: SubjectKey,
  week: number
): SubjectWeekRecord {
  if (subject === 'bible') {
    const bibleWeek = getBibleWeekData(cycle, week);
    if (bibleWeek) {
      const items: WorksheetItem[] = bibleWeek.lines.map((line, idx) => ({
        text: line,
        type: 'memoryWork' as const,
        prompt: idx === 0 ? bibleWeek.prompt : undefined,
        promptHeader: idx === 0 ? bibleWeek.prompt : undefined,
        label: idx === 0 ? bibleWeek.prompt : undefined,
      }));
      return {
        week,
        hasGuidePage: true,
        heading: bibleWeek.heading,
        prompt: bibleWeek.prompt,
        lines: bibleWeek.lines,
        items,
      };
    }
    return {
      week,
      hasGuidePage: false,
      heading: `Week ${week}: Bible`,
      lines: [],
      items: [],
    };
  }

  // Cycle 1 verified sample weeks (from Melanie's guide pages; the rest stay placeholders)
  if (cycle === 1) {
    const rec = CYCLE_1_WEEKS[subject]?.[week];
    if (rec) {
      const items: WorksheetItem[] = rec.lines.map((line, idx2) => ({
        text: line,
        type: 'memoryWork' as const,
        prompt: idx2 === 0 ? rec.prompt : undefined,
        promptHeader: idx2 === 0 ? rec.prompt : undefined,
        label: idx2 === 0 ? rec.prompt : undefined,
      }));
      return { week, hasGuidePage: true, heading: rec.heading, prompt: rec.prompt, lines: rec.lines, items };
    }
  }

  if (subject === 'latin') {
    const latinWeeks = LATIN_MEMORY_WORK[cycle] || [];
    const found = latinWeeks.find((w) => w.week === week);
    if (!found || !found.hasGuidePage) {
      return {
        week,
        hasGuidePage: false,
        heading: found?.heading || `Week ${week} Latin`,
        lines: [],
        items: [],
      };
    }
    const lines = found.entries.map((e) => `${e.latin} - ${e.meaning}`);
    return {
      week,
      hasGuidePage: true,
      heading: found.heading,
      lines,
      items: lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
    };
  }

  if (subject === 'math') {
    // Math is generated formulaically without photos
    const math = getMathWeekData(week, false);
    const items: WorksheetItem[] = math.lines.map((l) => {
      const parsed = splitPromptAndAnswer(l);
      return {
        text: parsed.answer,
        type: 'memoryWork' as const,
        prompt: parsed.prompt,
        promptHeader: parsed.prompt,
        label: parsed.prompt,
      };
    });
    return {
      week,
      hasGuidePage: true,
      heading: math.heading,
      lines: items.map((it) => it.text),
      items,
    };
  }

  if (subject === 'geography') {
    if (cycle === 3) {
      const geo = CYCLE_3_GEOGRAPHY_WEEKS[week];
      if (geo) {
        const lines = geo.states.map((s) => `${s.state} - ${s.capital}`);
        return {
          week,
          hasGuidePage: true,
          heading: geo.heading,
          lines,
          items: lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
        };
      }
    }
    // Cycle 1 & 2 world geography pages not uploaded yet
    return {
      week,
      hasGuidePage: false,
      heading: `Week ${week} Geography`,
      lines: [],
      items: [],
    };
  }

  // Complete Cycle 3 Data from Summary Proof Sheets (Zero placeholders)
  if (cycle === 3) {
    if (subject === 'timeline') {
      const timeData = CYCLE_3_TIMELINE_WEEKS[week];
      if (timeData) {
        return {
          week,
          hasGuidePage: true,
          heading: timeData.heading,
          lines: timeData.cards,
          items: timeData.cards.map((l) => ({ text: l, type: 'memoryWork' as const })),
        };
      }
    }

    if (subject === 'science') {
      const sciData = CYCLE_3_SCIENCE_WEEKS[week];
      if (sciData) {
        return {
          week,
          hasGuidePage: true,
          heading: sciData.heading,
          lines: [sciData.answer],
          items: [
            {
              text: sciData.answer,
              type: 'memoryWork' as const,
              prompt: sciData.question,
              promptHeader: sciData.question,
              label: sciData.question,
              functionNotes: getScienceFunctionNotes(3, week),
            },
          ],
        };
      }
    }

    if (subject === 'english') {
      const engData = CYCLE_3_ENGLISH_WEEKS[week];
      if (engData) {
        const engHelps = getEnglishHelpNotes(3, week);
        const items: WorksheetItem[] = engData.lines.map((l, lineIdx) => {
          const parsed = splitPromptAndAnswer(l);
          const prompt = engData.prompt || parsed.prompt || engData.heading;
          return {
            text: parsed.answer,
            type: 'memoryWork' as const,
            prompt,
            promptHeader: prompt,
            label: prompt,
            // Grammar helper notes attach once, on the week's first item
            functionNotes: lineIdx === 0 ? engHelps : undefined,
          };
        });
        return {
          week,
          hasGuidePage: true,
          heading: engData.heading,
          lines: items.map((it) => it.text),
          items,
        };
      }
    }

    if (subject === 'history') {
      const histData = CYCLE_3_HISTORY_WEEKS[week];
      if (histData) {
        const items: WorksheetItem[] = histData.lines.map((l) => {
          const parsed = splitPromptAndAnswer(l);
          const prompt = parsed.prompt || histData.heading;
          return {
            text: parsed.answer,
            type: 'memoryWork' as const,
            prompt,
            promptHeader: prompt,
            label: prompt,
          };
        });
        return {
          week,
          hasGuidePage: true,
          heading: histData.heading,
          lines: items.map((it) => it.text),
          items,
        };
      }
    }
  }

  // Cycles 1 & 2 for Science, History, Timeline, English pending upload
  const subjectName = SUBJECT_METAS[subject].label;
  return {
    week,
    hasGuidePage: false,
    heading: `Week ${week}: ${subjectName}`,
    lines: [],
    items: [],
  };
}
