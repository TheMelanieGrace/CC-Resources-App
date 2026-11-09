export type MathMode = 'trace' | 'trace-and-answer' | 'diy';

export interface MathFactItem {
  full: string;
  blankAnswer: string;
}

export interface MathStarterPack {
  id: string;
  label: string;
  title: string;
  items: MathFactItem[];
}

function generateTable(n: number): MathFactItem[] {
  const items: MathFactItem[] = [];
  for (let i = 1; i <= 15; i++) {
    items.push({
      full: `${n} x ${i} = ${n * i}`,
      blankAnswer: `${n} x ${i} = ___`,
    });
  }
  return items;
}

function generateSkipCount(n: number): MathFactItem {
  const nums: number[] = [];
  for (let i = 1; i <= 15; i++) {
    nums.push(n * i);
  }
  // blankAnswer masks every other number or end for testing
  const masked = nums.map((val, idx) => (idx % 3 === 2 ? '___' : val.toString())).join(', ');
  return {
    full: `Skip Counting ${n}s: ${nums.join(', ')}`,
    blankAnswer: `Skip Counting ${n}s: ${masked}`,
  };
}

export const CC_MATH_PACKS: MathStarterPack[] = [
  // Weeks 1-6: One pack per pair
  {
    id: 'math-w1-2',
    label: 'Math: 1s & 2s Tables & Skip-Counting',
    title: 'Foundations Math: 1s and 2s Multiplication',
    items: [
      generateSkipCount(1),
      ...generateTable(1),
      generateSkipCount(2),
      ...generateTable(2),
    ],
  },
  {
    id: 'math-w3-4',
    label: 'Math: 3s & 4s Tables & Skip-Counting',
    title: 'Foundations Math: 3s and 4s Multiplication',
    items: [
      generateSkipCount(3),
      ...generateTable(3),
      generateSkipCount(4),
      ...generateTable(4),
    ],
  },
  {
    id: 'math-w5-6',
    label: 'Math: 5s & 6s Tables & Skip-Counting',
    title: 'Foundations Math: 5s and 6s Multiplication',
    items: [
      generateSkipCount(5),
      ...generateTable(5),
      generateSkipCount(6),
      ...generateTable(6),
    ],
  },
  {
    id: 'math-w7-8',
    label: 'Math: 7s & 8s Tables & Skip-Counting',
    title: 'Foundations Math: 7s and 8s Multiplication',
    items: [
      generateSkipCount(7),
      ...generateTable(7),
      generateSkipCount(8),
      ...generateTable(8),
    ],
  },
  {
    id: 'math-w9-10',
    label: 'Math: 9s & 10s Tables & Skip-Counting',
    title: 'Foundations Math: 9s and 10s Multiplication',
    items: [
      generateSkipCount(9),
      ...generateTable(9),
      generateSkipCount(10),
      ...generateTable(10),
    ],
  },
  {
    id: 'math-w11-12',
    label: 'Math: 11s & 12s Tables & Skip-Counting',
    title: 'Foundations Math: 11s and 12s Multiplication',
    items: [
      generateSkipCount(11),
      ...generateTable(11),
      generateSkipCount(12),
      ...generateTable(12),
    ],
  },

  // Weeks 7-9: 13s, 14s, 15s tables
  {
    id: 'math-w7-9-tables',
    label: 'Math: Weeks 7–9 (13s, 14s, 15s Tables)',
    title: 'Foundations Math: 13s, 14s, 15s Tables',
    items: [
      generateSkipCount(13),
      ...generateTable(13),
      generateSkipCount(14),
      ...generateTable(14),
      generateSkipCount(15),
      ...generateTable(15),
    ],
  },

  // Week 10: Squares
  {
    id: 'math-w10-squares',
    label: 'Math: Week 10 (Squares: 1x1 through 15x15)',
    title: 'Foundations Math: Squares (1 to 15)',
    items: [
      { full: '1 x 1 = 1', blankAnswer: '1 x 1 = ___' },
      { full: '2 x 2 = 4', blankAnswer: '2 x 2 = ___' },
      { full: '3 x 3 = 9', blankAnswer: '3 x 3 = ___' },
      { full: '4 x 4 = 16', blankAnswer: '4 x 4 = ___' },
      { full: '5 x 5 = 25', blankAnswer: '5 x 5 = ___' },
      { full: '6 x 6 = 36', blankAnswer: '6 x 6 = ___' },
      { full: '7 x 7 = 49', blankAnswer: '7 x 7 = ___' },
      { full: '8 x 8 = 64', blankAnswer: '8 x 8 = ___' },
      { full: '9 x 9 = 81', blankAnswer: '9 x 9 = ___' },
      { full: '10 x 10 = 100', blankAnswer: '10 x 10 = ___' },
      { full: '11 x 11 = 121', blankAnswer: '11 x 11 = ___' },
      { full: '12 x 12 = 144', blankAnswer: '12 x 12 = ___' },
      { full: '13 x 13 = 169', blankAnswer: '13 x 13 = ___' },
      { full: '14 x 14 = 196', blankAnswer: '14 x 14 = ___' },
      { full: '15 x 15 = 225', blankAnswer: '15 x 15 = ___' },
    ],
  },

  // Week 11: Cubes
  {
    id: 'math-w11-cubes',
    label: 'Math: Week 11 (Cubes: 1 through 10 cubed)',
    title: 'Foundations Math: Cubes (1 to 10)',
    items: [
      { full: '1 cubed = 1 x 1 x 1 = 1', blankAnswer: '1 cubed = 1 x 1 x 1 = ___' },
      { full: '2 cubed = 2 x 2 x 2 = 8', blankAnswer: '2 cubed = 2 x 2 x 2 = ___' },
      { full: '3 cubed = 3 x 3 x 3 = 27', blankAnswer: '3 cubed = 3 x 3 x 3 = ___' },
      { full: '4 cubed = 4 x 4 x 4 = 64', blankAnswer: '4 cubed = 4 x 4 x 4 = ___' },
      { full: '5 cubed = 5 x 5 x 5 = 125', blankAnswer: '5 cubed = 5 x 5 x 5 = ___' },
      { full: '6 cubed = 6 x 6 x 6 = 216', blankAnswer: '6 cubed = 6 x 6 x 6 = ___' },
      { full: '7 cubed = 7 x 7 x 7 = 343', blankAnswer: '7 cubed = 7 x 7 x 7 = ___' },
      { full: '8 cubed = 8 x 8 x 8 = 512', blankAnswer: '8 cubed = 8 x 8 x 8 = ___' },
      { full: '9 cubed = 9 x 9 x 9 = 729', blankAnswer: '9 cubed = 9 x 9 x 9 = ___' },
      { full: '10 cubed = 10 x 10 x 10 = 1,000', blankAnswer: '10 cubed = 10 x 10 x 10 = ___' },
    ],
  },

  // Week 12: Teaspoons and tablespoons
  {
    id: 'math-w12-spoons',
    label: 'Math: Week 12 (Teaspoons & Tablespoons)',
    title: 'Foundations Math: Teaspoons and Tablespoons',
    items: [
      { full: '3 teaspoons = 1 tablespoon', blankAnswer: '3 teaspoons = ___ tablespoon' },
      { full: '2 tablespoons = 1 fluid ounce', blankAnswer: '2 tablespoons = ___ fluid ounce' },
    ],
  },

  // Week 13: Liquid equivalents
  {
    id: 'math-w13-liquid',
    label: 'Math: Week 13 (Liquid Equivalents)',
    title: 'Foundations Math: Liquid Equivalents',
    items: [
      { full: '8 fluid ounces = 1 cup', blankAnswer: '8 fluid ounces = ___ cup' },
      { full: '2 cups = 1 pint', blankAnswer: '2 cups = ___ pint' },
      { full: '2 pints = 1 quart', blankAnswer: '2 pints = ___ quart' },
      { full: '4 quarts = 1 gallon', blankAnswer: '4 quarts = ___ gallon' },
    ],
  },

  // Week 14: Linear equivalents
  {
    id: 'math-w14-linear',
    label: 'Math: Week 14 (Linear Equivalents)',
    title: 'Foundations Math: Linear Equivalents',
    items: [
      { full: '12 inches = 1 foot', blankAnswer: '12 inches = ___ foot' },
      { full: '3 feet = 1 yard', blankAnswer: '3 feet = ___ yard' },
      { full: '5,280 feet = 1 mile', blankAnswer: '5,280 feet = ___ mile' },
    ],
  },

  // Week 15: Metric
  {
    id: 'math-w15-metric',
    label: 'Math: Week 15 (Metric Equivalents)',
    title: 'Foundations Math: Metric Equivalents',
    items: [
      { full: '10 millimeters = 1 centimeter', blankAnswer: '10 millimeters = ___ centimeter' },
      { full: '100 centimeters = 1 meter', blankAnswer: '100 centimeters = ___ meter' },
      { full: '1,000 meters = 1 kilometer', blankAnswer: '1,000 meters = ___ kilometer' },
    ],
  },

  // Weeks 16-20: Area and circumference
  {
    id: 'math-w16-20-geometry',
    label: 'Math: Weeks 16–20 (Area & Circumference)',
    title: 'Foundations Math: Area and Circumference',
    items: [
      { full: 'Area of a rectangle = length x width', blankAnswer: 'Area of a rectangle = _______________' },
      { full: 'Area of a square = side squared', blankAnswer: 'Area of a square = _______________' },
      { full: 'Area of a triangle = one-half base x height', blankAnswer: 'Area of a triangle = _______________' },
      { full: 'Area of a circle = pi x radius squared', blankAnswer: 'Area of a circle = _______________' },
      { full: 'Circumference of a circle = 2 x pi x radius', blankAnswer: 'Circumference of a circle = _______________' },
    ],
  },

  // Weeks 21-24: Math laws
  {
    id: 'math-w21-24-laws',
    label: 'Math: Weeks 21–24 (Math Laws & Examples)',
    title: 'Foundations Math: Math Laws',
    items: [
      { full: 'Associative Law: (a + b) + c = a + (b + c)', blankAnswer: 'Associative Law: (a + b) + c = _______________' },
      { full: 'Worked Example: (2 + 3) + 4 = 2 + (3 + 4) = 9', blankAnswer: 'Worked Example: (2 + 3) + 4 = _______________' },
      { full: 'Commutative Law: a + b = b + a', blankAnswer: 'Commutative Law: a + b = _______________' },
      { full: 'Worked Example: 4 + 5 = 5 + 4 = 9', blankAnswer: 'Worked Example: 4 + 5 = _______________' },
      { full: 'Distributive Law: a(b + c) = ab + ac', blankAnswer: 'Distributive Law: a(b + c) = _______________' },
      { full: 'Worked Example: 2(3 + 4) = (2 x 3) + (2 x 4) = 14', blankAnswer: 'Worked Example: 2(3 + 4) = _______________' },
      { full: 'Identity Law: a + 0 = a and a x 1 = a', blankAnswer: 'Identity Law: a + 0 = ___ and a x 1 = ___' },
      { full: 'Worked Example: 7 + 0 = 7 and 7 x 1 = 7', blankAnswer: 'Worked Example: 7 + 0 = ___ and 7 x 1 = ___' },
    ],
  },
];
