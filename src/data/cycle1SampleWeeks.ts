// Cycle 1 verified weeks, extracted from Melanie's guide sample pages (Weeks 21-22).
// Verbatim from the source pages. All other Cycle 1 weeks remain placeholders
// until their guide pages are photographed.
import { SubjectKey } from './reviewPacketData';

export interface SimpleWeekRecord {
  heading: string;
  prompt?: string;
  lines: string[];
}

export const CYCLE_1_WEEKS: Partial<Record<SubjectKey, Record<number, SimpleWeekRecord>>> = {
  math: {
    21: {
      heading: 'Week 21: Associative Law',
      lines: [
        'The Associative Law for addition states: (a + b) + c = a + (b + c)',
        'The Associative Law for multiplication states: (a x b) x c = a x (b x c)',
      ],
    },
    22: {
      heading: 'Week 22: Commutative Law',
      lines: [
        'The Commutative Law for addition states: a + b = b + a',
        'The Commutative Law for multiplication states: a x b = b x a',
      ],
    },
  },
  science: {
    21: {
      heading: 'Week 21: Circles of Latitude',
      prompt: 'What are five circles of latitude?',
      lines: ['Arctic Circle, Tropic of Cancer, equator, Tropic of Capricorn, Antarctic Circle.'],
    },
    22: {
      heading: 'Week 22: Weather Fronts',
      prompt: 'What are some types of weather fronts?',
      lines: ['Cold, warm, stationary, occluded.'],
    },
  },
  english: {
    21: {
      heading: 'Week 21: Helping and Linking Verb "To Be"',
      prompt: 'Helping and linking verb: to be',
      lines: ['am, are, is, was, were, be, being, been'],
    },
    22: {
      heading: 'Week 22: Linking Verbs',
      prompt: 'Linking verbs',
      lines: ['feel, become, remain, taste'],
    },
  },
  history: {
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
  },
  geography: {
    21: {
      heading: 'Week 21: Canadian Waters',
      prompt: 'Canadian Waters',
      lines: ['Great Bear Lake, Great Slave Lake, Hudson Bay, Baffin Bay, Labrador Sea'],
    },
    22: {
      heading: 'Week 22: South America (West)',
      prompt: 'South America (West)',
      lines: ['Venezuela, Colombia, Ecuador, Peru, Bolivia, Chile'],
    },
  },
  timeline: {
    21: {
      heading: 'Week 21: History Cards 141-147',
      lines: [
        '141. World War II and President Franklin D. Roosevelt',
        '142. Stalin of the USSR and the Katyn Massacre',
        '143. The United Nations Formed',
        '144. The Cold War',
        "145. Gandhi and India's Independence",
        '146. Jewish State Established',
        '147. Mao and Communist Victory in China',
      ],
    },
    22: {
      heading: 'Week 22: History Cards 148-154',
      lines: [
        '148. North Atlantic Treaty Organization',
        '149. The Korean War',
        '150. Martin Luther King, Jr. and the Civil Rights Movement',
        '151. Jim and Elisabeth Elliot, Missionaries to Ecuador',
        '152. The Antarctic Treaty',
        '153. The Vietnam War',
        '154. U.S. Astronauts Walk on the Moon',
      ],
    },
  },
};
