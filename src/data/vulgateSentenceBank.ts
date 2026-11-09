/**
 * Authentic Latin Vulgate Sentence Bank (John 1:1–7, Public Domain)
 * with Douay-Rheims English Translations.
 *
 * Stored verbatim per strict accuracy requirements.
 * Used for "Use it in a sentence" copywork rows in Latin worksheets.
 */

export interface VulgateVerse {
  reference: string;
  latin: string;
  english: string;
}

export const VULGATE_JOHN_1_VERSES: VulgateVerse[] = [
  {
    reference: 'John 1:1',
    latin: 'In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.',
    english: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
  },
  {
    reference: 'John 1:2',
    latin: 'Hoc erat in principio apud Deum.',
    english: 'The same was in the beginning with God.',
  },
  {
    reference: 'John 1:3',
    latin: 'Omnia per ipsum facta sunt: et sine ipso factum est nihil, quod factum est.',
    english: 'All things were made by him: and without him was made nothing that was made.',
  },
  {
    reference: 'John 1:4',
    latin: 'In ipso vita erat, et vita erat lux hominum.',
    english: 'In him was life, and the life was the light of men.',
  },
  {
    reference: 'John 1:5',
    latin: 'Et lux in tenebris lucet, et tenebrae eam non comprehenderunt.',
    english: 'And the light shineth in darkness, and the darkness did not comprehend it.',
  },
  {
    reference: 'John 1:6',
    latin: 'Fuit homo missus a Deo, cui nomen erat Ioannes.',
    english: 'There was a man sent from God, whose name was John.',
  },
  {
    reference: 'John 1:7',
    latin: 'Hic venit in testimonium ut testimonium perhiberet de lumine, ut omnes crederent per illum.',
    english: 'This man came for a witness, to give testimony of the light, that all men might believe through him.',
  },
];

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Checks if a given verse contains a Latin word or phrase as whole word(s).
 */
function verseContainsWord(verseLatin: string, word: string): boolean {
  if (!word || !word.trim()) return false;
  const cleanWord = word.trim().toLowerCase();

  // Handle common Vulgate spelling variants
  const variants = [cleanWord];
  if (cleanWord === 'iohannes') variants.push('ioannes');
  if (cleanWord === 'ioannes') variants.push('iohannes');
  if (cleanWord === 'conprehenderunt') variants.push('comprehenderunt');
  if (cleanWord === 'comprehenderunt') variants.push('conprehenderunt');

  return variants.some((v) => {
    const regex = new RegExp(`(^|[^a-zA-Z])${escapeRegExp(v)}([^a-zA-Z]|$)`, 'i');
    return regex.test(verseLatin);
  });
}

/**
 * Returns all matching verses for a set of Latin words,
 * ranked by:
 * 1. matchCount DESCENDING (prefer the verse containing the MOST of that week's Latin words)
 * 2. length ASCENDING (tie-break by shortest)
 * 3. stable bank order
 */
export function getRankedVulgateVersesForWords(words: string[]): VulgateVerse[] {
  if (!words || words.length === 0) return [];

  const candidates: Array<{
    verse: VulgateVerse;
    matchCount: number;
    matchedWords: string[];
    length: number;
    originalIndex: number;
  }> = [];

  VULGATE_JOHN_1_VERSES.forEach((verse, idx) => {
    const matched = words.filter((w) => verseContainsWord(verse.latin, w));
    if (matched.length > 0) {
      candidates.push({
        verse,
        matchCount: matched.length,
        matchedWords: matched,
        length: verse.latin.length,
        originalIndex: idx,
      });
    }
  });

  // Prefer most words matched, then shortest, then bank order
  candidates.sort((a, b) => {
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.originalIndex - b.originalIndex;
  });

  return candidates.map((c) => c.verse);
}

/**
 * Given a list of Latin target words/phrases, select from the bank the verse
 * containing the MOST of those words, tie-break by shortest.
 * If no verse matches, returns null.
 */
export function getShortestVulgateVerseForWords(words: string[]): VulgateVerse | null {
  const ranked = getRankedVulgateVersesForWords(words);
  return ranked.length > 0 ? ranked[0] : null;
}

/**
 * Extracts whole-word Latin tokens from memory work entries for a week,
 * filtering out grammar rule descriptions and hyphenated endings.
 */
export function extractWeekLatinWords(entries: Array<{ latin: string; meaning?: string }>): string[] {
  const wordTokens = new Set<string>();

  for (const entry of entries) {
    if (!entry.latin) continue;
    const meaning = (entry.meaning || '').toLowerCase();

    // Skip full grammar rule sentences in English (e.g. Weeks 9–11)
    if (meaning.includes('rule') || entry.latin.includes('conjugations') || entry.latin.includes('declensions')) {
      continue;
    }

    // Split on commas, slashes, or whitespace
    const rawParts = entry.latin.split(/[,/;\s]+/);
    for (const raw of rawParts) {
      const clean = raw
        .trim()
        .replace(/^[.,;:?!"'()]+|[.,;:?!"'()]+$/g, '')
        .toLowerCase();

      // Skip suffixes/prefixes with hyphens (e.g. -us, -a, -i) and placeholders (e.g. varies)
      if (!clean || clean.startsWith('-') || clean.endsWith('-') || clean === 'varies') {
        continue;
      }

      wordTokens.add(clean);
    }

    // Also include multi-word phrases if applicable (e.g. "facta sunt", "factum est")
    const cleanPhrase = entry.latin
      .trim()
      .replace(/[.,;:?!"'()]+/g, '')
      .toLowerCase();
    if (cleanPhrase.includes(' ') && !cleanPhrase.includes('rule')) {
      wordTokens.add(cleanPhrase);
    }
  }

  return Array.from(wordTokens);
}
