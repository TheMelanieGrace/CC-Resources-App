import { LATIN_MEMORY_WORK, LatinWeekData } from './latinReviewData';
import { getScienceFunctionNotes } from './scienceFunctionsData';
import { getEnglishHelpNotes } from './englishHelpData';
import { CYCLE_1_WEEKS } from './cycle1Data';
import { CYCLE_2_WEEKS } from './cycle2Data';
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

  // Weeks 1-6: two multiplication tables per week (1s-12s), weeks 7-9: 13s-15s,
  // then squares, cubes, equivalents, formulas, and laws: matching the official
  // Math Summary Proof Sheets week for week.
  const table = (n: number): string[] => {
    const lines: string[] = [];
    for (let i = 1; i <= 15; i++) lines.push(`${n} x ${i} = ${ans(n * i)}`);
    return lines;
  };

  if (week >= 1 && week <= 6) {
    const a = week * 2 - 1;
    const b = week * 2;
    return {
      heading: `${a}s and ${b}s Multiplication Tables (to 15)`,
      lines: [...table(a), ...table(b)],
    };
  }
  if (week >= 7 && week <= 9) {
    const n = week + 6; // 13s, 14s, 15s
    return { heading: `${n}s Multiplication Table (to 15)`, lines: table(n) };
  }

  switch (week) {
    case 10: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`${i} x ${i} = ${ans(i * i)}`);
      return { heading: 'Squares (1 to 15 squared)', lines };
    }
    case 11: {
      const lines: string[] = [];
      for (let i = 1; i <= 15; i++) lines.push(`${i} x ${i} x ${i} = ${ans((i * i * i).toLocaleString('en-US'))}`);
      return { heading: 'Cubes (1 to 15 cubed)', lines };
    }
    case 12: {
      return {
        heading: 'Teaspoons and Tablespoons',
        lines: [
          `3 teaspoons equals ${ans('1 tablespoon')}`,
          `2 tablespoons equals ${ans('1 fluid ounce')}`,
        ],
      };
    }
    case 13: {
      return {
        heading: 'Liquid Equivalents',
        lines: [
          `8 fluid ounces equals ${ans('1 cup')}`,
          `2 cups equals ${ans('1 pint')}`,
          `2 pints equals ${ans('1 quart')}`,
          `4 quarts equals ${ans('1 gallon')}`,
        ],
      };
    }
    case 14: {
      return {
        heading: 'Linear Equivalents',
        lines: [
          `2.54 centimeters equals ${ans('1 inch')}`,
          `12 inches equals ${ans('1 foot')}`,
          `5,280 feet equals ${ans('1 mile')}`,
          `1 kilometer equals ${ans('5/8 mile')}`,
        ],
      };
    }
    case 15: {
      return {
        heading: 'Metric Measurements',
        lines: [
          `10 millimeters equals ${ans('1 centimeter')}`,
          `100 centimeters equals ${ans('1 meter')}`,
          `1,000 meters equals ${ans('1 kilometer')}`,
        ],
      };
    }
    case 16: {
      return {
        heading: 'Area of a Rectangle',
        lines: [`The area of a rectangle equals ${ans('length times width')}.`],
      };
    }
    case 17: {
      return {
        heading: 'Area of a Square',
        lines: [`The area of a square equals ${ans('length of its side squared')}.`],
      };
    }
    case 18: {
      return {
        heading: 'Area of a Triangle',
        lines: [`The area of a triangle equals ${ans('one-half base times height')}.`],
      };
    }
    case 19: {
      return {
        heading: 'Area of a Circle',
        lines: [`The area of a circle equals ${ans('pi (3.14) times the radius squared')}.`],
      };
    }
    case 20: {
      return {
        heading: 'Circumference of a Circle',
        lines: [`The circumference of a circle equals ${ans('2 times pi (3.14) times the radius')}.`],
      };
    }
    case 21: {
      return {
        heading: 'Associative Law',
        lines: [
          `The Associative Law for addition states: (a + b) + c = ${ans('a + (b + c)')}`,
          `The Associative Law for multiplication states: (a x b) x c = ${ans('a x (b x c)')}`,
        ],
      };
    }
    case 22: {
      return {
        heading: 'Commutative Law',
        lines: [
          `The Commutative Law for addition states: a + b = ${ans('b + a')}`,
          `The Commutative Law for multiplication states: a x b = ${ans('b x a')}`,
        ],
      };
    }
    case 23: {
      return {
        heading: 'Distributive Law',
        lines: [`The Distributive Law states: a(b + c) = ${ans('ab + ac')}`],
      };
    }
    case 24: {
      return {
        heading: 'Identity Law',
        lines: [
          `The Identity Law for addition states: a + 0 = ${ans('a')}`,
          `The Identity Law for multiplication states: a x 1 = ${ans('a')}`,
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
  { heading: string; lines: string[] }
> = {
  1: {
    heading: 'Week 1: States and Capitals',
    lines: [
      'Maine - Augusta',
      'New Hampshire - Concord',
      'Massachusetts - Boston',
      'Rhode Island - Providence',
      'Connecticut - Hartford',
    ],
  },
  2: {
    heading: 'Week 2: States and Capitals',
    lines: [
      'Vermont - Montpelier',
      'New York - Albany',
      'New Jersey - Trenton',
      'Pennsylvania - Harrisburg',
      'Delaware - Dover',
    ],
  },
  3: {
    heading: 'Week 3: States and Capitals',
    lines: [
      'Maryland - Annapolis',
      'Virginia - Richmond',
      'West Virginia - Charleston',
      'North Carolina - Raleigh',
      'South Carolina - Columbia',
      'Washington, DC',
    ],
  },
  4: {
    heading: 'Week 4: States and Capitals',
    lines: [
      'Georgia - Atlanta',
      'Florida - Tallahassee',
      'Alabama - Montgomery',
      'Mississippi - Jackson',
      'Louisiana - Baton Rouge',
    ],
  },
  5: {
    heading: 'Week 5: States and Capitals',
    lines: [
      'Michigan - Lansing',
      'Ohio - Columbus',
      'Indiana - Indianapolis',
      'Kentucky - Frankfort',
      'Tennessee - Nashville',
    ],
  },
  6: {
    heading: 'Week 6: States and Capitals',
    lines: [
      'Wisconsin - Madison',
      'Illinois - Springfield',
      'Iowa - Des Moines',
      'Missouri - Jefferson City',
      'Arkansas - Little Rock',
    ],
  },
  7: {
    heading: 'Week 7: States and Capitals',
    lines: [
      'Minnesota - St. Paul',
      'North Dakota - Bismarck',
      'South Dakota - Pierre',
      'Wyoming - Cheyenne',
      'Nebraska - Lincoln',
    ],
  },
  8: {
    heading: 'Week 8: States and Capitals',
    lines: [
      'Kansas - Topeka',
      'Oklahoma - Oklahoma City',
      'Texas - Austin',
      'Colorado - Denver',
      'New Mexico - Santa Fe',
    ],
  },
  9: {
    heading: 'Week 9: States and Capitals',
    lines: [
      'Utah - Salt Lake City',
      'Arizona - Phoenix',
      'Nevada - Carson City',
      'California - Sacramento',
      'Hawaii - Honolulu',
    ],
  },
  10: {
    heading: 'Week 10: States and Capitals',
    lines: [
      'Montana - Helena',
      'Idaho - Boise',
      'Washington - Olympia',
      'Oregon - Salem',
      'Alaska - Juneau',
    ],
  },
  11: {
    heading: 'Week 11: Northern Appalachian Mountains',
    lines: [
      'White Mountains',
      'Green Mountains',
      'Adirondack Mountains',
      'Allegheny Mountains',
    ],
  },
  12: {
    heading: 'Week 12: Southern Appalachian Mountains',
    lines: [
      'The Great Valley',
      'Blue Ridge Mountains',
      'Great Smoky Mountains',
      'Cumberland Mountains',
      'Mt. Mitchell',
    ],
  },
  13: {
    heading: 'Week 13: Western Mountains',
    lines: [
      'Rocky Mountains',
      'Pikes Peak',
      'Mt. Elbert',
      'Sierra Nevada',
      'Mt. Whitney',
    ],
  },
  14: {
    heading: 'Week 14: Northwest Mountains',
    lines: [
      'Cascade Mountains',
      'Mt. Rainier',
      'Mt. St. Helens',
      'Denali',
    ],
  },
  15: {
    heading: 'Week 15: Great Lakes',
    lines: [
      'Huron',
      'Ontario',
      'Michigan',
      'Erie',
      'Superior',
    ],
  },
  16: {
    heading: 'Week 16: Bays',
    lines: [
      'Chesapeake Bay',
      'Hudson Bay',
      'San Francisco Bay',
      'Puget Sound',
      'Pamlico Sound',
    ],
  },
  17: {
    heading: 'Week 17: Rivers (East)',
    lines: [
      'St. Lawrence River',
      'Ohio River',
      'Mississippi River',
      'Missouri River',
      'Arkansas River',
    ],
  },
  18: {
    heading: 'Week 18: Rivers (West)',
    lines: [
      'Colorado River',
      'Red River',
      'Rio Grande River',
      'Columbia River',
      'Great Salt Lake',
    ],
  },
  19: {
    heading: 'Week 19: Trails',
    lines: [
      'Cumberland Road',
      'Santa Fe Trail',
      'Mormon Trail',
      'Gila Trail',
      'Old Spanish Trail',
      'California Trail',
      'Oregon Trail',
    ],
  },
  20: {
    heading: 'Week 20: Canals',
    lines: [
      'Erie Canal',
      'Pennsylvania Canal',
      'Chesapeake and Ohio Canal',
      'Ohio and Erie Canal',
      'Miami and Erie Canal',
    ],
  },
  21: {
    heading: 'Week 21: Native American Regions',
    lines: [
      'Eastern Woodlands',
      'Plains',
      'Plateau',
      'Northwest Coast',
      'California',
      'Great Basin',
      'Southwest',
    ],
  },
  22: {
    heading: 'Week 22: Deserts',
    lines: [
      'Mojave Desert',
      'Sonoran Desert',
      'Colorado Desert',
      'Painted Desert',
      'Great Salt Lake Desert',
    ],
  },
  23: {
    heading: 'Week 23: Prominent Features',
    lines: [
      'Grand Canyon',
      'Black Hills',
      'Ozark Highlands',
      'Okefenokee Swamp',
      'Olympic Rain Forests',
      'Niagara Falls',
    ],
  },
  24: {
    heading: 'Week 24: More Prominent Features',
    lines: [
      'Mississippi River Delta',
      'Mammoth Cave',
      'San Andreas Fault',
      'Gulf of Mexico',
      'Death Valley',
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
    heading: 'Week 1: Timeline Cards 1\u20137',
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
    heading: 'Week 2: Timeline Cards 8\u201314',
    cards: [
      '8. Seven Wonders of the Ancient World',
      '9. Patriarchs of Israel',
      '10. Hittites and Canaanites',
      '11. Kush',
      '12. Assyrians',
      '13. Babylonians',
      '14. China\'s Shang Dynasty',
    ],
  },
  3: {
    heading: 'Week 3: Timeline Cards 15\u201321',
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
    heading: 'Week 4: Timeline Cards 22\u201328',
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
    heading: 'Week 5: Timeline Cards 29\u201335',
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
    heading: 'Week 6: Timeline Cards 36\u201342',
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
    heading: 'Week 7: Timeline Cards 43\u201349',
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
    heading: 'Week 8: Timeline Cards 50\u201356',
    cards: [
      '50. Council of Nicea',
      '51. Augustine of Hippo',
      '52. Jerome Completes the Vulgate',
      '53. Visigoths Sack Rome',
      '54. The Middle Ages (circa 450 to circa 1400)',
      '55. Council of Chalcedon',
      '56. Western Roman Empire Falls to Barbarians',
    ],
  },
  9: {
    heading: 'Week 9: Timeline Cards 57\u201363',
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
    heading: 'Week 10: Timeline Cards 64\u201370',
    cards: [
      '64. Japan\'s Heian Period',
      '65. Charlemagne Crowned Emperor of Europe',
      '66. Alfred the Great of England',
      '67. Erik the Red and Leif Eriksson, Norse Explorers',
      '68. Vladimir I of Kiev',
      '69. Byzantine Emperor Basil II',
      '70. East-West Schism of the Church',
    ],
  },
  11: {
    heading: 'Week 11: Timeline Cards 71\u201377',
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
    heading: 'Week 12: Timeline Cards 78\u201384',
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
    heading: 'Week 13: Timeline Cards 85\u201391',
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
    heading: 'Week 14: Timeline Cards 92\u201398',
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
    heading: 'Week 15: Timeline Cards 99\u2013105',
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
    heading: 'Week 16: Timeline Cards 106\u2013112',
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
    heading: 'Week 17: Timeline Cards 113\u2013119',
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
    heading: 'Week 18: Timeline Cards 120\u2013126',
    cards: [
      '120. Cherokee Trail of Tears',
      '121. U.S. Westward Expansion',
      '122. Marx Publishes The Communist Manifesto',
      '123. The Compromise of 1850 and the Dred Scott Decision',
      '124. U.S. Restores Trade with Japan',
      '125. British Queen Victoria\'s Rule Over India',
      '126. Darwin Publishes The Origin of Species',
    ],
  },
  19: {
    heading: 'Week 19: Timeline Cards 127\u2013133',
    cards: [
      '127. Lincoln\'s War Between the States',
      '128. Reconstruction of the Southern States',
      '129. Dominion of Canada',
      '130. Otto von Bismarck Unifies Germany',
      '131. Boer Wars in Africa',
      '132. The Spanish-American War',
      '133. The Progressive Era',
    ],
  },
  20: {
    heading: 'Week 20: Timeline Cards 134\u2013140',
    cards: [
      '134. Australia Becomes a Commonwealth',
      '135. Mexican Revolution',
      '136. World War I and President Wilson',
      '137. Lenin and the Bolshevik Revolution in Russia',
      '138. U.S. Evangelist Billy Graham',
      '139. Modern Period of the Arts',
      '140. The Great Depression and the New Deal',
    ],
  },
  21: {
    heading: 'Week 21: Timeline Cards 141\u2013147',
    cards: [
      '141. World War II and President Franklin D. Roosevelt',
      '142. Stalin of the USSR and the Katyn Massacre',
      '143. The United Nations Formed',
      '144. The Cold War',
      '145. Gandhi and India\'s Independence',
      '146. Jewish State Established',
      '147. Mao and Communist Victory in China',
    ],
  },
  22: {
    heading: 'Week 22: Timeline Cards 148\u2013154',
    cards: [
      '148. North Atlantic Treaty Organization',
      '149. The Korean War',
      '150. Martin Luther King, Jr. and the Civil Rights Movement',
      '151. Jim and Elisabeth Elliot, Missionaries to Ecuador',
      '152. The Antarctic Treaty',
      '153. The Vietnam War',
      '154. U.S. Astronauts Walk on the Moon',
    ],
  },
  23: {
    heading: 'Week 23: Timeline Cards 155\u2013161',
    cards: [
      '155. Age of Information and Globalization (circa 1970 to the Present)',
      '156. Watergate, President Nixon Resigns',
      '157. Fall of Communism in Eastern Europe',
      '158. European Union Formed',
      '159. Apartheid Abolished in South Africa',
      '160. September 11, 2001',
      '161. Rising Tide of Freedom',
    ],
  },
  24: {
    heading: 'Week 24: U.S. Presidents (Cards 162\u2013173)',
    cards: [
      '162. Washington, Adams, Jefferson, Madison',
      '163. Monroe, Adams, Jackson, Van Buren',
      '164. Harrison, Tyler, Polk, Taylor',
      '165. Fillmore, Pierce, Buchanan, Lincoln',
      '166. Johnson, Grant, Hayes, Garfield',
      '167. Arthur, Cleveland, Harrison, Cleveland',
      '168. McKinley, Roosevelt, Taft, Wilson',
      '169. Harding, Coolidge, Hoover, Roosevelt',
      '170. Truman, Eisenhower, Kennedy, Johnson',
      '171. Nixon, Ford, Carter, Reagan',
      '172. Bush, Clinton, Bush, Obama',
      '173. Trump, Biden',
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
    answer: 'The endocrine system consists of glands and organs that use hormones to send messages through the bloodstream to the rest of the body.',
    lines: ['The endocrine system consists of glands and organs that use hormones to send messages through the bloodstream to the rest of the body.'],
  },
  12: {
    heading: 'Week 12: Major Purposes of Blood',
    question: 'What are the major purposes of blood?',
    answer: 'Transportation, protection, communication, regulation.',
    lines: ['Transportation, protection, communication, regulation.'],
  },
  13: {
    heading: 'Week 13: Atomic Number',
    question: 'What is the atomic number?',
    answer: 'The atomic number is the number of protons in the nucleus of an atom, which is also the number of electrons in a neutral atom.',
    lines: ['The atomic number is the number of protons in the nucleus of an atom, which is also the number of electrons in a neutral atom.'],
  },
  14: {
    heading: 'Week 14: Chemical Element',
    question: 'What is an element?',
    answer: 'An element is a basic chemical substance defined by its atomic number and atomic mass.',
    lines: ['An element is a basic chemical substance defined by its atomic number and atomic mass.'],
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
    answer: 'An acid donates a hydrogen ion and a base accepts a hydrogen ion.',
    lines: [
      'An acid donates a hydrogen ion and a base accepts a hydrogen ion.',
    ],
  },
  20: {
    heading: 'Week 20: What the Heavens Declare',
    question: 'What do the heavens declare?',
    answer:
      'The heavens declare the glory of God; the skies proclaim the work of his hands. (Psalm 19:1 NIV)',
    lines: [
      'The heavens declare the glory of God; the skies proclaim the work of his hands. (Psalm 19:1 NIV)',
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
    answer: 'An independent clause expresses a complete thought like a sentence.',
    lines: ['An independent clause expresses a complete thought like a sentence.'],
  },
  21: {
    topic: 'Subordinate Clause',
    heading: 'Week 21: Subordinate Clause',
    prompt: 'Subordinate Clause',
    answer: 'A subordinate clause, also known as a dependent clause, does not express a complete thought and cannot stand alone.',
    lines: ['A subordinate clause, also known as a dependent clause, does not express a complete thought and cannot stand alone.'],
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
      'In 1492, Columbus made the first of four trips to the Caribbean on three Spanish ships named the Niña, the Pinta, and the Santa María.',
    ],
  },
  2: {
    heading: 'Tell me about the Pilgrims.',
    lines: [
      'In 1620, the Pilgrims sailed from Plymouth, England and signed the Mayflower Compact before founding Plymouth Colony in North America.',
    ],
  },
  3: {
    heading: 'Tell me about the Boston Tea Party.',
    lines: [
      'In 1773, colonists disguised as Mohawks dumped tea from the British East India Company into the Boston Harbor.',
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
      'In 1789, in New York, George Washington was granted the full powers and responsibilities of the presidency by the U.S. Constitution.',
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
      'After victory in the War of 1812, the United States wrote the Monroe Doctrine, which warned Europeans not to attempt to colonize the Americas.',
    ],
  },
  8: {
    heading: 'Tell me about the Missouri Compromise.',
    lines: [
      'In 1820, Henry Clay worked out the Missouri Compromise, allowing Missouri to enter the Union as a slave state and Maine as a free state.',
    ],
  },
  9: {
    heading: 'Tell me about the secession of the Southern states.',
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
      'In 1861, the Civil War began when President Abraham Lincoln went to war with the Southern states that had seceded from the Union.',
    ],
  },
  12: {
    heading: 'Tell me about General Robert E. Lee.',
    lines: [
      'In 1865, General Robert E. Lee surrendered to General Ulysses S. Grant at Appomattox Court House in Virginia.',
    ],
  },
  13: {
    heading: 'Tell me about the Fourteenth Amendment.',
    lines: [
      'In 1868, the Fourteenth Amendment made all former slaves U.S. citizens and paved the way for the Civil Rights Movement.',
    ],
  },
  14: {
    heading: 'Tell me about tycoons.',
    lines: [
      'During the late 1800s, tycoons like Vanderbilt, Rockefeller, Carnegie, and Swift fueled the nation\'s Industrial Age by developing American resources.',
    ],
  },
  15: {
    heading: 'Tell me about immigrants coming to America.',
    lines: [
      'From 1820 to 1930, more than 37 million immigrants came to America, seeking freedom and the opportunity to increase their personal wealth.',
    ],
  },
  16: {
    heading: 'Tell me about the United States and World War I.',
    lines: [
      'In 1917, President Wilson asked Congress to enter World War I against the Central Powers two years after German U-boats sank the Lusitania, killing American citizens.',
    ],
  },
  17: {
    heading: 'Tell me about the Nineteenth Amendment.',
    lines: [
      "Elizabeth Cady Stanton and Susan B. Anthony led the women's suffrage movement in the United States, resulting in the Nineteenth Amendment in 1920 that granted women the right to vote.",
    ],
  },
  18: {
    heading: 'Tell me about Pearl Harbor.',
    lines: [
      'On December 7, 1941, the Japanese bombed Pearl Harbor, Hawaii, causing the United States to join the Allies in World War II.',
    ],
  },
  19: {
    heading: 'Tell me about NATO.',
    lines: [
      'In 1949, the United States and its allies formed NATO to resist the spread of Soviet communism.',
    ],
  },
  20: {
    heading: 'Tell me about Brown v. Board of Education.',
    lines: [
      'In 1954, in Brown v. Board of Education, the U.S. Supreme Court ruled that the segregation of public schools by race is unconstitutional.',
    ],
  },
  21: {
    heading: 'Tell me about U.S. astronauts.',
    lines: [
      'In 1969, U.S. astronauts Neil Armstrong and Edwin Aldrin were the first men to walk on the moon.',
    ],
  },
  22: {
    heading: 'Tell me about September 11, 2001.',
    lines: [
      'On September 11, 2001, terrorists hijacked four airplanes. They flew two into the World Trade Center in New York City, and one into the Pentagon in Washington, DC. The fourth plane crashed into a Pennsylvania field.',
    ],
  },
  23: {
    heading: 'Tell me the Preamble to the U.S. Constitution.',
    lines: [
      'We the People of the United States, in order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defense, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
    ],
  },
  24: {
    heading: 'Tell me the Bill of Rights.',
    lines: [
      '1. Freedoms',
      '2. Own guns',
      '3. Quartering soldiers',
      '4. Warrants',
      '5. Cannot testify against self',
      '6. Right to speedy trial',
      '7. Right to a jury',
      '8. Cruel, unusual punishment',
      "9. People's rights",
      "10. States' rights",
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

  // The Timeline (161 events + U.S. presidents) is identical in all three
  // cycles, verified against the Cycle 1, 2, and 3 Summary Proof Sheets.
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

  // Cycles 1 & 2: complete data transcribed from the Summary Proof Sheets.
  if (cycle === 1 || cycle === 2) {
    const rec = (cycle === 1 ? CYCLE_1_WEEKS : CYCLE_2_WEEKS)[subject]?.[week];
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
        return {
          week,
          hasGuidePage: true,
          heading: geo.heading,
          lines: geo.lines,
          items: geo.lines.map((l) => ({ text: l, type: 'memoryWork' as const })),
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
