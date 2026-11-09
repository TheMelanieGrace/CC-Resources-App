import { WorksheetItem, WorksheetItemType } from '../types';

/**
 * Universal Prompt & Label Helper for Worksheet Items
 *
 * Universal rule across the ENTIRE app, every subject, every cycle, all weeks 1-24,
 * and every worksheet path (Review Packet, Standard Tracing, starter packs, AI helper):
 *
 * 1. A PROMPT is any question or ask-line stored with the memory work, including but not limited to:
 *    - Anything beginning "Tell me about..."
 *    - Any question ending in "?" ("What is an element?", "What are the parts of an atom?", etc.)
 *    - Any header line like "Week 14: Chemical Element"
 *    - Any prefix like "Amendment 1:", "Group 1:", "Skip Counting 2s:", "Associative Law:", "To be:", etc.
 *    Prompts are NEVER traceable. Rendered as one small plain-text line (about 10-11pt) above writing lines,
 *    with NO guide lines, NO model line, NO dotted trace row, NO blank line.
 *
 * 2. Only the ANSWER (the memory work itself) goes on the guide lines: model line plus trace row.
 */

export interface LabeledItemResult {
  label?: string;
  prompt?: string;
  content: string;
  answer: string;
  isPurePrompt?: boolean;
}

/**
 * Checks if a string is purely a prompt / question / header line with NO memory answer on that same line.
 */
export function isPurePrompt(rawText: string): boolean {
  if (!rawText) return false;
  const text = rawText.trim();
  if (!text) return false;

  // 1. "Tell me about..." prompt line with no following answer sentence
  if (/^Tell me about\s+[^.?:!\n-]+[.:?!-]?$/i.test(text)) {
    return true;
  }

  // 2. Any question ending in "?" (e.g. "What is an element?", "What are four types of tissue?")
  if (/^[^?\n]+\?\s*$/.test(text)) {
    return true;
  }

  // 3. Any week / cycle header line (e.g. "Week 14: Chemical Element", "WEEK 1 - HISTORY - Tell me about Columbus")
  if (/^(?:WEEK\s+\d+|Week\s+\d+)(?:\s*[-:]\s*[A-Za-z0-9\s'–—&]+)?(?:\s*[:–—-])?\s*$/i.test(text)) {
    return true;
  }

  // 4. Pure structured label with colon and no body (e.g. "Amendment 1:", "Group 1:", "Part 1:")
  if (/^(?:Amendment|Group|Section|Article|Part|Rule|Law|Step|Item|Card)\s+(?:\d+|[IVXLCDM]+|[A-Za-z]+)\s*[:–—.-]?\s*$/i.test(text)) {
    return true;
  }

  // 5. Explicit note/tip prefix
  if (/^(?:note:|tip:|instructions?:|\[note\])/i.test(text)) {
    return true;
  }

  return false;
}

/**
 * Cleans a prompt string into a polished plain-text display line.
 */
export function cleanPromptText(rawPrompt: string): string {
  if (!rawPrompt) return '';
  let p = rawPrompt.trim();

  // Strip legacy "WEEK X - HISTORY - " prefix if present
  p = p.replace(/^WEEK \d+\s*-\s*HISTORY\s*-\s*/i, '').trim();
  // Strip "Week X: " prefix if present when formatting prompt header
  if (/^Week \d+:\s*/i.test(p)) {
    p = p.replace(/^Week \d+:\s*/i, '').trim();
  }

  // Clean trailing colons/dashes
  p = p.replace(/[:–—-]$/, '').trim();

  // "Tell me about..." prompts should end with a period if no terminal punctuation
  if (/^Tell me about/i.test(p) && !/[.?!]$/.test(p)) {
    p += '.';
  }

  // Question prompts should end with a question mark
  if (/^(?:what|which|how|who|where|why|name|is|are|do|does|did|can|could)\b/i.test(p) && !/[.?!]$/.test(p)) {
    p += '?';
  }

  return p;
}

/**
 * Splits a text into its PROMPT (plain-text, non-traceable) and ANSWER (traceable memory work).
 */
export function splitPromptAndAnswer(rawText: string): LabeledItemResult {
  if (!rawText) return { content: '', answer: '', isPurePrompt: false };
  const text = rawText.trim();
  if (!text) return { content: '', answer: '', isPurePrompt: false };

  // If this text is purely a prompt with no answer attached:
  if (isPurePrompt(text)) {
    const prompt = cleanPromptText(text);
    return {
      prompt,
      label: prompt,
      content: '',
      answer: '',
      isPurePrompt: true,
    };
  }

  // 1. "Tell me about..." prompt with answer following in the same string:
  // e.g. "Tell me about Columbus: In 1492, Columbus made the first of four trips..."
  // or "Tell me about Columbus. In 1492, Columbus made..."
  const tellMeMatch = text.match(/^(Tell me about\s+[^.?:!\n-]+)[.:?!;–—\s]\s+([A-Z0-9].+)$/i);
  if (tellMeMatch) {
    const prompt = cleanPromptText(tellMeMatch[1]);
    const answer = tellMeMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 2. Question ending in "?" followed by answer:
  // e.g. "What is an element? An element is a basic chemical substance..."
  // e.g. "What are four types of tissue? Connective, epithelial, muscle, nerve."
  const questionMatch = text.match(/^([^?\n]+\?)\s+([A-Z0-9].+)$/i);
  if (questionMatch) {
    const prompt = questionMatch[1].trim();
    const answer = questionMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 3. Week header line followed by answer:
  // e.g. "Week 14: Chemical Element: An element is a basic chemical substance..."
  // e.g. "Week 1: Four Types of Tissue - Connective, epithelial, muscle, nerve."
  const weekHeaderMatch = text.match(/^(Week\s+\d+\s*:\s*[^:–—\n]+)[:–—-]\s+(.+)$/i);
  if (weekHeaderMatch) {
    const prompt = cleanPromptText(weekHeaderMatch[1]);
    const answer = weekHeaderMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 4. Amendment pattern: "Amendment 1: Freedom of religion, speech...", "Amendment 10: ..."
  const amendmentMatch = text.match(/^(Amendment\s+(?:\d+|[IVXLCDM]+|[A-Za-z]+))\s*:\s*(.+)$/i);
  if (amendmentMatch) {
    const prompt = amendmentMatch[1].trim();
    const answer = amendmentMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 5. Group pattern (e.g. Presidents songs "Group 1: Washington, Adams..."):
  const groupMatch = text.match(/^(Group\s+(?:\d+|[IVXLCDM]+|[A-Za-z]+))\s*:\s*(.+)$/i);
  if (groupMatch) {
    const prompt = groupMatch[1].trim();
    const answer = groupMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 6. Math laws and equivalents:
  const mathLawMatch = text.match(
    /^(Associative Law|Commutative Law|Distributive Law|Identity Law(?: for (?:addition|multiplication))?|Worked Example|For Addition|For Multiplication|Skip Counting\s+\d+s?)\s*:\s*(.+)$/i
  );
  if (mathLawMatch) {
    const prompt = mathLawMatch[1].trim();
    const answer = mathLawMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  const mathStateMatch = text.match(
    /^(The distributive law states|The identity law for addition states|The identity law for multiplication states)\s*:\s*(.+)$/i
  );
  if (mathStateMatch) {
    const prompt = mathStateMatch[1].trim();
    const answer = mathStateMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 7. English structures / patterns / verbs:
  const engMatch = text.match(
    /^(The four sentence structures are|The seven sentence patterns are|Four structures|Seven patterns|To (?:be|do|rise|raise|lay|lie|set|sit|beat|break|write|go))\s*:\s*(.+)$/i
  );
  if (engMatch) {
    const prompt = engMatch[1].trim();
    const answer = engMatch[2].trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 8. Structured categories (Section, Article, Part, Rule, Law, Step, Item, Card, etc.):
  const structuredMatch = text.match(
    /^(Section|Article|Part|Rule|Law|Step|Item|Card|Category|Principle|Commandment|Clause|Question)\s+(?:\d+|[IVXLCDM]+|[A-Za-z]+)\s*:\s*(.+)$/i
  );
  if (structuredMatch) {
    const colonIdx = text.indexOf(':');
    const prompt = text.substring(0, colonIdx).trim();
    const answer = text.substring(colonIdx + 1).trim();
    return { prompt, label: prompt, content: answer, answer, isPurePrompt: false };
  }

  // 9. Generic "Label: content" prefix (concise header <= 32 chars, not a normal clause):
  const genericMatch = text.match(/^([A-Za-z0-9\s'–—-]{1,32}):\s+(.+)$/);
  if (genericMatch) {
    const candidateLabel = genericMatch[1].trim();
    const candidateContent = genericMatch[2].trim();
    const words = candidateLabel.split(/\s+/);
    const lastWord = words[words.length - 1].toLowerCase();
    const excludedVerbs = new Set([
      'are',
      'is',
      'was',
      'were',
      'have',
      'has',
      'had',
      'include',
      'includes',
      'including',
      'say',
      'says',
      'said',
      'namely',
      'like',
      'called',
      'named',
    ]);

    if (words.length <= 5 && !excludedVerbs.has(lastWord) && candidateContent.length > 0) {
      return {
        prompt: candidateLabel,
        label: candidateLabel,
        content: candidateContent,
        answer: candidateContent,
        isPurePrompt: false,
      };
    }
  }

  return { content: text, answer: text, isPurePrompt: false };
}

/**
 * Backward-compatible parseLabeledItem implementation.
 */
export function parseLabeledItem(rawText: string): LabeledItemResult {
  return splitPromptAndAnswer(rawText);
}

/**
 * Normalizes an array of WorksheetItems across ALL subjects, cycles, and worksheet paths.
 *
 * Guarantees:
 * - Standalone prompt lines preceding memory work answers are paired as the plain-text prompt.
 * - Any string containing both prompt and answer is split into a separate prompt and answer.
 * - Prompts are NEVER placed in `text` (the traceable answer).
 * - Guide lines and trace rows only receive `text` (the answer).
 * - Items with no answer are marked as `type: 'note'`, ensuring they NEVER render on guide lines.
 */
export function normalizeWorksheetItems(rawList: WorksheetItem[]): WorksheetItem[] {
  if (!rawList || rawList.length === 0) return [];

  // Pass 1: Pair standalone prompts with subsequent answers
  const pass1: WorksheetItem[] = [];
  for (let i = 0; i < rawList.length; i++) {
    const current = rawList[i];
    const text = (current.text || '').trim();
    if (!text) continue;

    // Check if this item is explicitly a note
    if (current.type === 'note' || /^(?:note:|tip:|instructions?:|\[note\])/i.test(text)) {
      pass1.push({
        ...current,
        text,
        type: 'note',
      });
      continue;
    }

    // Check if current item is a pure prompt (with no answer on its line)
    const isPure = isPurePrompt(text);
    if (isPure) {
      const promptLabel = cleanPromptText(text);

      // Check if a following answer exists
      let nextIdx = i + 1;
      while (nextIdx < rawList.length && !rawList[nextIdx].text?.trim()) {
        nextIdx++;
      }

      if (nextIdx < rawList.length) {
        const nextItem = rawList[nextIdx];
        const nextText = (nextItem.text || '').trim();
        // If next item is NOT a pure prompt or note, pair this prompt with it!
        if (!isPurePrompt(nextText) && !/^(?:note:|tip:|instructions?:|\[note\])/i.test(nextText)) {
          const combinedPrompt = nextItem.promptHeader || nextItem.prompt || promptLabel;
          pass1.push({
            ...nextItem,
            text: nextText,
            type: 'memoryWork',
            promptHeader: combinedPrompt,
            prompt: combinedPrompt,
            label: combinedPrompt,
          });
          i = nextIdx; // advance past the paired item
          continue;
        }
      }

      // If standalone prompt with no following answer, convert to note (NEVER traceable!)
      pass1.push({
        text: promptLabel,
        type: 'note',
      });
      continue;
    }

    pass1.push(current);
  }

  // Pass 2: Split any combined prompt and answer in each item
  const pass2: WorksheetItem[] = pass1.map((item) => {
    if (item.type === 'note') return item;

    const rawText = (item.text || '').trim();
    let prompt = item.prompt || item.promptHeader || item.label;

    // Clean legacy "WEEK X - HISTORY - " prefix if present in prompt
    if (prompt && /^WEEK \d+\s*-\s*HISTORY\s*-\s*/i.test(prompt)) {
      prompt = prompt.replace(/^WEEK \d+\s*-\s*HISTORY\s*-\s*/i, '').trim();
    }
    if (prompt && /^Week \d+:\s*/i.test(prompt)) {
      prompt = prompt.replace(/^Week \d+:\s*/i, '').trim();
    }

    // Split text if it has prompt and answer in one string
    const split = splitPromptAndAnswer(rawText);

    if (split.isPurePrompt) {
      // It's a pure prompt: render as note, NEVER on guide lines!
      return {
        text: split.prompt || rawText,
        type: 'note' as WorksheetItemType,
      };
    }

    if (split.prompt) {
      prompt = prompt || split.prompt;
    }

    const answer = split.answer.trim();

    // If answer is empty or just punctuation, convert to note
    if (!answer || /^[-.:?!\s]+$/.test(answer)) {
      return {
        text: prompt || rawText,
        type: 'note' as WorksheetItemType,
      };
    }

    // Clean prompt format
    if (prompt) {
      prompt = cleanPromptText(prompt);
    }

    return {
      ...item,
      text: answer,
      type: 'memoryWork' as WorksheetItemType,
      promptHeader: prompt,
      prompt: prompt,
      label: prompt,
    };
  });

  return pass2;
}

/**
 * Formats a list of weeks into a clean readable label:
 * - Empty: "No Weeks Selected"
 * - Single: "Week 4"
 * - Consecutive: "Weeks 1–5"
 * - Non-consecutive: "Weeks 2, 5, 11"
 */
export function formatWeeksLabel(weeks: number[]): string {
  if (!weeks || weeks.length === 0) return 'No Weeks Selected';
  const sorted = Array.from(new Set(weeks)).sort((a, b) => a - b);
  if (sorted.length === 1) return `Week ${sorted[0]}`;

  const isConsecutive = sorted.every((w, idx) => idx === 0 || w === sorted[idx - 1] + 1);
  if (isConsecutive) {
    return `Weeks ${sorted[0]}–${sorted[sorted.length - 1]}`;
  }

  return `Weeks ${sorted.join(', ')}`;
}
