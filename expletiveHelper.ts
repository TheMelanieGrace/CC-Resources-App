import { DiagramAnalysis, DiagramClause, WordJob } from '../types';

const BE_VERB_REGEX = /^(?:'s|is|are|was|were|will be|has been|have been|had been)\b/i;

/**
 * Checks if a sentence or clause begins with an expletive "There" or "Here".
 * CC Rule: When a sentence begins with "There" or "Here" followed by a be-verb
 * and the true subject comes after the verb (e.g., "There was X", "There are X", "Here is X"),
 * the opening word is an EXPLETIVE placeholder, not a location adverb.
 * If a later phrase already answers "where?" (e.g. "in your yard"), that confirms it is an expletive.
 */
export function isExpletiveClause(clauseText: string, clause?: Partial<DiagramClause>): boolean {
  const clean = (clauseText || '').trim();
  const startMatch = clean.match(/^(There|Here)\b/i);
  if (!startMatch) return false;

  const afterFirst = clean.slice(startMatch[0].length).trim();
  if (BE_VERB_REGEX.test(afterFirst)) {
    return true;
  }

  // Check if clause verb itself is a be-verb
  const verbWord = (clause?.verb?.word || '').trim().toLowerCase();
  const beVerbs = ['is', 'are', 'was', 'were', 'be', 'been', 'will be', 'has been', 'have been'];
  if (beVerbs.includes(verbWord) && /^(There|Here)\b/i.test(clause?.clause || clean)) {
    return true;
  }

  // Check if clause explanation or note already mentions expletive
  if (clause?.expletive) return true;
  if (clause?.kids?.pattern_why?.toLowerCase().includes('expletive')) return true;
  if (clause?.note?.toLowerCase().includes('expletive')) return true;

  return false;
}

/**
 * Enforces strict expletive consistency across Diagram, Table, and Explanation.
 */
export function enforceExpletiveClause(
  clause: DiagramClause,
  fullSentenceText: string
): DiagramClause {
  const sentenceText = fullSentenceText || clause.clause || '';
  const isExp = isExpletiveClause(sentenceText, clause);

  if (!isExp) {
    // If not an expletive (e.g., "Put the book there."), ensure "there" is NOT marked as expletive
    if (clause.expletive) {
      delete clause.expletive;
    }
    return clause;
  }

  // Determine expletive word (usually "There" or "Here")
  const startMatch = sentenceText.trim().match(/^(There|Here)\b/i) ||
    clause.clause.trim().match(/^(There|Here)\b/i);
  const expletiveWord = startMatch ? startMatch[0] : (clause.expletive || 'There');

  // 1. Assign expletive property to clause
  clause.expletive = expletiveWord;

  // 2. Remove expletive from verb modifiers (never a slanted line under the verb!)
  if (clause.verb?.modifiers && Array.isArray(clause.verb.modifiers)) {
    clause.verb.modifiers = clause.verb.modifiers.filter(
      (m) => (m.word || '').toLowerCase() !== expletiveWord.toLowerCase()
    );
  }

  // 3. Remove expletive from subject modifiers
  if (clause.subject?.modifiers && Array.isArray(clause.subject.modifiers)) {
    clause.subject.modifiers = clause.subject.modifiers.filter(
      (m) => (m.word || '').toLowerCase() !== expletiveWord.toLowerCase()
    );
  }

  // 4. If AI mistakenly labeled the expletive word as the subject, recover the true subject
  const currentSubjWord = (clause.subject?.word || '').toLowerCase();
  if (currentSubjWord === expletiveWord.toLowerCase() || !clause.subject?.word) {
    if (clause.complements && clause.complements.length > 0) {
      const realComp = clause.complements.shift()!;
      clause.subject = {
        word: realComp.word,
        modifiers: realComp.modifiers || [],
      };
    }
  }

  // 5. Pattern for expletive sentences with be-verb of existence is S | Vi (Pattern 1)
  if (clause.pattern !== 'S | Vi' && (!clause.complements || clause.complements.length === 0)) {
    clause.pattern = 'S | Vi';
  }

  const subjWord = clause.subject?.word || 'subject';
  const verbWord = clause.verb?.word || 'verb';

  // 6. Synchronize Word-Jobs Table (kids.words)
  if (!clause.kids) {
    clause.kids = {
      pattern_why: '',
      words: [],
    };
  }

  const words = Array.isArray(clause.kids.words) ? [...clause.kids.words] : [];

  // Remove any existing entries for the expletive word
  const filteredWords = words.filter(
    (w) => (w.word || '').toLowerCase() !== expletiveWord.toLowerCase()
  );

  // Exact required table format:
  // "There — expletive — placeholder, no job in the sentence pattern."
  const expletiveRow: WordJob = {
    word: expletiveWord,
    pos: 'expletive',
    job: 'placeholder, no job in the sentence pattern.',
  };

  // Place expletive as the very first word in the table
  const updatedWords: WordJob[] = [expletiveRow];

  // Verify remaining words (ensure be-verb is Vi, subject is S)
  for (const item of filteredWords) {
    const wLow = (item.word || '').toLowerCase();
    if (wLow === subjWord.toLowerCase()) {
      updatedWords.push({
        ...item,
        pos: item.pos === 'AV' ? 'N' : (item.pos || 'N'),
        job: 'S (Subject)',
      });
    } else if (wLow === verbWord.toLowerCase()) {
      updatedWords.push({
        ...item,
        pos: 'V',
        job: 'Vi (Intransitive Verb)',
      });
    } else {
      updatedWords.push(item);
    }
  }

  clause.kids.words = updatedWords;

  // 7. Synchronize Explanation & Grammar Note
  clause.note = `Pattern 1: Subject ("${subjWord}") with intransitive verb ("${verbWord}"). The opening "${expletiveWord}" is an expletive (placeholder) diagrammed on its own short horizontal line floating above the subject, attached to nothing. The vertical divider between S and Vi crosses completely through the baseline.`;

  // Make sure pattern_why clearly explains the expletive and does NOT call it an adverb
  const existingWhy = clause.kids.pattern_why || '';
  if (
    !existingWhy.includes('expletive') ||
    existingWhy.toLowerCase().includes('adverb') ||
    existingWhy.toLowerCase().includes('av')
  ) {
    clause.kids.pattern_why = `Pattern 1 (S | Vi): S stands for Subject ("${subjWord}") and Vi stands for Intransitive Verb ("${verbWord}"). The opening "${expletiveWord}" is an expletive placeholder introducing the inverted sentence; it has no job in the sentence pattern and floats on its own short horizontal line above the subject. The vertical divider between subject and verb crosses completely through the baseline.`;
  }

  return clause;
}

/**
 * Enforces expletive consistency across an entire DiagramAnalysis
 */
export function enforceExpletiveAnalysis(
  analysis: DiagramAnalysis,
  fullSentenceText: string
): DiagramAnalysis {
  if (!analysis || !Array.isArray(analysis.clauses)) {
    return analysis;
  }

  const updatedClauses = analysis.clauses.map((clause) =>
    enforceExpletiveClause(clause, fullSentenceText)
  );

  return {
    ...analysis,
    clauses: updatedClauses,
  };
}
