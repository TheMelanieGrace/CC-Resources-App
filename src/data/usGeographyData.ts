import { RegionKey } from '../types';

export interface RegionInfo {
  name: string;
  abbrs: string[] | null;
  stateNames: string[];
  description: string;
}

export interface StateInfo {
  name: string;
  abbr: string;
  capital: string;
  region: string;
  capitalProjected: [number, number];
  labelOffset?: [number, number]; // custom offset if needed
  fontSize?: number; // custom font size for abbreviation
  capitalLabelOffset?: [number, number];
}

export const REGIONS: Record<RegionKey, RegionInfo> = {
  east: {
    name: 'East Coast',
    abbrs: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'VA', 'NC', 'SC', 'GA', 'FL'],
    stateNames: [
      'Maine', 'New Hampshire', 'Vermont', 'Massachusetts', 'Rhode Island',
      'Connecticut', 'New York', 'New Jersey', 'Pennsylvania', 'Delaware',
      'Maryland', 'Virginia', 'North Carolina', 'South Carolina', 'Georgia', 'Florida',
    ],
    description: '16 Atlantic and coastal states from Maine down to Florida with shared borders.',
  },
  midwest: {
    name: 'Midwest',
    abbrs: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
    stateNames: [
      'Ohio', 'Michigan', 'Indiana', 'Illinois', 'Wisconsin', 'Minnesota',
      'Iowa', 'Missouri', 'North Dakota', 'South Dakota', 'Nebraska', 'Kansas',
    ],
    description: '12 central heartland states from the Great Lakes across the Great Plains.',
  },
  south: {
    name: 'South',
    abbrs: ['TX', 'OK', 'AR', 'LA', 'MS', 'AL', 'TN', 'KY', 'WV'],
    stateNames: [
      'Texas', 'Oklahoma', 'Arkansas', 'Louisiana', 'Mississippi',
      'Alabama', 'Tennessee', 'Kentucky', 'West Virginia',
    ],
    description: '9 Southern states from Texas and the Gulf Coast through the Appalachians.',
  },
  mountain: {
    name: 'Mountain West',
    abbrs: ['MT', 'ID', 'WY', 'NV', 'UT', 'CO', 'AZ', 'NM'],
    stateNames: [
      'Montana', 'Idaho', 'Wyoming', 'Nevada', 'Utah',
      'Colorado', 'Arizona', 'New Mexico',
    ],
    description: '8 Rocky Mountain and Desert Southwest interior states.',
  },
  west: {
    name: 'West Coast',
    abbrs: ['CA', 'OR', 'WA', 'AK', 'HI'],
    stateNames: [
      'California', 'Oregon', 'Washington', 'Alaska', 'Hawaii',
    ],
    description: '5 Pacific coastal states including Alaska and Hawaii.',
  },
  us: {
    name: 'All 50 States',
    abbrs: null,
    stateNames: [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
      'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
      'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
      'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
      'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
      'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
      'West Virginia', 'Wisconsin', 'Wyoming',
    ],
    description: 'Complete United States geography copywork and study map with real Census boundaries.',
  },
};

// All 50 states with exact true projected capital locations in Albers USA coordinates (scale 1300, translate [487.5, 305])
export const STATE_METADATA: Record<string, StateInfo> = {
  AL: { name: 'Alabama', abbr: 'AL', capital: 'Montgomery', region: 'South', capitalProjected: [682.6, 440.3] },
  AK: { name: 'Alaska', abbr: 'AK', capital: 'Juneau', region: 'West Coast', capitalProjected: [176.9, 556.1] },
  AZ: { name: 'Arizona', abbr: 'AZ', capital: 'Phoenix', region: 'Mountain West', capitalProjected: [197.2, 399.8] },
  AR: { name: 'Arkansas', abbr: 'AR', capital: 'Little Rock', region: 'South', capitalProjected: [586.3, 403.4] },
  CA: { name: 'California', abbr: 'CA', capital: 'Sacramento', region: 'West Coast', capitalProjected: [55.6, 248.0], labelOffset: [-10, 10] },
  CO: { name: 'Colorado', abbr: 'CO', capital: 'Denver', region: 'Mountain West', capitalProjected: [342.8, 273.9] },
  CT: { name: 'Connecticut', abbr: 'CT', capital: 'Hartford', region: 'East Coast', capitalProjected: [885.9, 187.0], fontSize: 7, capitalLabelOffset: [6, -4] },
  DE: { name: 'Delaware', abbr: 'DE', capital: 'Dover', region: 'East Coast', capitalProjected: [852.1, 256.3], fontSize: 6.5, capitalLabelOffset: [7, 2] },
  FL: { name: 'Florida', abbr: 'FL', capital: 'Tallahassee', region: 'East Coast', capitalProjected: [726.2, 479.8], labelOffset: [15, 0] },
  GA: { name: 'Georgia', abbr: 'GA', capital: 'Atlanta', region: 'East Coast', capitalProjected: [715.0, 405.1] },
  HI: { name: 'Hawaii', abbr: 'HI', capital: 'Honolulu', region: 'West Coast', capitalProjected: [267.0, 549.2] },
  ID: { name: 'Idaho', abbr: 'ID', capital: 'Boise', region: 'Mountain West', capitalProjected: [159.2, 137.9] },
  IL: { name: 'Illinois', abbr: 'IL', capital: 'Springfield', region: 'Midwest', capitalProjected: [616.5, 273.5] },
  IN: { name: 'Indiana', abbr: 'IN', capital: 'Indianapolis', region: 'Midwest', capitalProjected: [667.8, 271.8] },
  IA: { name: 'Iowa', abbr: 'IA', capital: 'Des Moines', region: 'Midwest', capitalProjected: [557.5, 226.7] },
  KS: { name: 'Kansas', abbr: 'KS', capital: 'Topeka', region: 'Midwest', capitalProjected: [503.7, 297.1] },
  KY: { name: 'Kentucky', abbr: 'KY', capital: 'Frankfort', region: 'South', capitalProjected: [701.3, 311.2] },
  LA: { name: 'Louisiana', abbr: 'LA', capital: 'Baton Rouge', region: 'South', capitalProjected: [586.8, 488.2] },
  ME: { name: 'Maine', abbr: 'ME', capital: 'Augusta', region: 'East Coast', capitalProjected: [917.1, 118.6] },
  MD: { name: 'Maryland', abbr: 'MD', capital: 'Annapolis', region: 'East Coast', capitalProjected: [836.4, 263.8], fontSize: 7, labelOffset: [-8, 0], capitalLabelOffset: [7, -3] },
  MA: { name: 'Massachusetts', abbr: 'MA', capital: 'Boston', region: 'East Coast', capitalProjected: [908.7, 167.1], fontSize: 8, labelOffset: [-6, 0] },
  MI: { name: 'Michigan', abbr: 'MI', capital: 'Lansing', region: 'Midwest', capitalProjected: [698.8, 203.0] },
  MN: { name: 'Minnesota', abbr: 'MN', capital: 'Saint Paul', region: 'Midwest', capitalProjected: [544.7, 161.5] },
  MS: { name: 'Mississippi', abbr: 'MS', capital: 'Jackson', region: 'South', capitalProjected: [627.5, 442.2] },
  MO: { name: 'Missouri', abbr: 'MO', capital: 'Jefferson City', region: 'Midwest', capitalProjected: [577.8, 309.8] },
  MT: { name: 'Montana', abbr: 'MT', capital: 'Helena', region: 'Mountain West', capitalProjected: [247.9, 90.9] },
  NE: { name: 'Nebraska', abbr: 'NE', capital: 'Lincoln', region: 'Midwest', capitalProjected: [486.2, 247.7] },
  NV: { name: 'Nevada', abbr: 'NV', capital: 'Carson City', region: 'Mountain West', capitalProjected: [86.1, 235.1] },
  NH: { name: 'New Hampshire', abbr: 'NH', capital: 'Concord', region: 'East Coast', capitalProjected: [896.0, 150.4], fontSize: 7.5 },
  NJ: { name: 'New Jersey', abbr: 'NJ', capital: 'Trenton', region: 'East Coast', capitalProjected: [860.0, 229.6], fontSize: 7, capitalLabelOffset: [6, 0] },
  NM: { name: 'New Mexico', abbr: 'NM', capital: 'Santa Fe', region: 'Mountain West', capitalProjected: [320.1, 375.9] },
  NY: { name: 'New York', abbr: 'NY', capital: 'Albany', region: 'East Coast', capitalProjected: [863.6, 171.6] },
  NC: { name: 'North Carolina', abbr: 'NC', capital: 'Raleigh', region: 'East Coast', capitalProjected: [813.0, 343.1] },
  ND: { name: 'North Dakota', abbr: 'ND', capital: 'Bismarck', region: 'Midwest', capitalProjected: [423.5, 118.3] },
  OH: { name: 'Ohio', abbr: 'OH', capital: 'Columbus', region: 'Midwest', capitalProjected: [721.4, 260.8] },
  OK: { name: 'Oklahoma', abbr: 'OK', capital: 'Oklahoma City', region: 'South', capitalProjected: [473.3, 375.5] },
  OR: { name: 'Oregon', abbr: 'OR', capital: 'Salem', region: 'West Coast', capitalProjected: [70.3, 101.2] },
  PA: { name: 'Pennsylvania', abbr: 'PA', capital: 'Harrisburg', region: 'East Coast', capitalProjected: [823.8, 236.1] },
  RI: { name: 'Rhode Island', abbr: 'RI', capital: 'Providence', region: 'East Coast', capitalProjected: [906.1, 180.4], fontSize: 6.5, capitalLabelOffset: [6, 2] },
  SC: { name: 'South Carolina', abbr: 'SC', capital: 'Columbia', region: 'East Coast', capitalProjected: [776.3, 390.7] },
  SD: { name: 'South Dakota', abbr: 'SD', capital: 'Pierre', region: 'Midwest', capitalProjected: [427.7, 173.9] },
  TN: { name: 'Tennessee', abbr: 'TN', capital: 'Nashville', region: 'South', capitalProjected: [683.0, 362.4] },
  TX: { name: 'Texas', abbr: 'TX', capital: 'Austin', region: 'South', capitalProjected: [463.9, 497.4] },
  UT: { name: 'Utah', abbr: 'UT', capital: 'Salt Lake City', region: 'Mountain West', capitalProjected: [221.7, 227.0] },
  VT: { name: 'Vermont', abbr: 'VT', capital: 'Montpelier', region: 'East Coast', capitalProjected: [873.6, 131.4], fontSize: 7.5 },
  VA: { name: 'Virginia', abbr: 'VA', capital: 'Richmond', region: 'East Coast', capitalProjected: [826.7, 299.4] },
  WA: { name: 'Washington', abbr: 'WA', capital: 'Olympia', region: 'West Coast', capitalProjected: [85.6, 56.2] },
  WV: { name: 'West Virginia', abbr: 'WV', capital: 'Charleston', region: 'South', capitalProjected: [757.5, 294.6] },
  WI: { name: 'Wisconsin', abbr: 'WI', capital: 'Madison', region: 'Midwest', capitalProjected: [609.6, 196.4] },
  WY: { name: 'Wyoming', abbr: 'WY', capital: 'Cheyenne', region: 'Mountain West', capitalProjected: [329.8, 209.6] },
};

// Array of all 50 states for easy iteration
export const ALL_STATES: StateInfo[] = Object.values(STATE_METADATA);

// Lookup from full name to StateInfo
export const STATE_NAME_MAP: Record<string, StateInfo> = {};
ALL_STATES.forEach((s) => {
  STATE_NAME_MAP[s.name] = s;
});
