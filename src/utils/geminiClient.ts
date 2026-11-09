/**
 * Utility for calling backend Gemini endpoints with automatic retries,
 * backoff intervals, model fallbacks, and user-friendly error formatting.
 */

export interface GeminiCallOptions {
  url: string;
  body: Record<string, any>;
  onStatusUpdate?: (status: string) => void;
}

const FRIENDLY_BUSY_MESSAGE =
  "Google's AI is very busy right now. Please wait a minute and press the button again.";

const RETRY_DELAYS_MS = [2000, 5000, 10000]; // 2s, 5s, 10s

function isUnavailableError(status: number, message: string): boolean {
  if (status === 503 || status === 429) return true;
  const lower = message.toLowerCase();
  return (
    lower.includes('503') ||
    lower.includes('unavailable') ||
    lower.includes('high demand') ||
    lower.includes('busy') ||
    lower.includes('overloaded') ||
    lower.includes('resource exhausted') ||
    lower.includes('quota') ||
    lower.includes('rate limit')
  );
}

function sanitizeErrorMessage(rawError: string): string {
  // If the error looks like raw JSON or contains 503/UNAVAILABLE codes, return the friendly message
  if (
    rawError.startsWith('{') ||
    rawError.includes('"code":') ||
    rawError.includes('UNAVAILABLE') ||
    rawError.includes('503') ||
    rawError.includes('high demand')
  ) {
    return FRIENDLY_BUSY_MESSAGE;
  }
  return rawError || FRIENDLY_BUSY_MESSAGE;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function callGeminiWithRetry<T = any>(options: GeminiCallOptions): Promise<T> {
  const { url, body, onStatusUpdate } = options;
  let lastError: any = null;

  // 1. Primary Model: Initial call + up to 3 retries (waiting 2s, 5s, 10s)
  for (let attempt = 0; attempt <= 3; attempt++) {
    try {
      if (attempt > 0) {
        const delay = RETRY_DELAYS_MS[attempt - 1] || 5000;
        console.warn(
          `[GeminiClient] Attempt ${attempt} failed with busy/503. Retrying in ${delay / 1000}s...`
        );
        onStatusUpdate?.('The AI is busy, retrying...');
        await wait(delay);
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, fallbackModel: false }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        return data as T;
      }

      const rawMsg = data?.error
        ? typeof data.error === 'object'
          ? JSON.stringify(data.error)
          : String(data.error)
        : `HTTP error ${res.status}`;

      // Log real error in browser console for debugging
      console.error(
        `[GeminiClient] Request to ${url} failed (Status ${res.status}):`,
        data || rawMsg
      );

      lastError = new Error(rawMsg);

      // Check if this error is a 503 / UNAVAILABLE / high demand
      if (!isUnavailableError(res.status, rawMsg)) {
        // Not a busy error (e.g., bad user input 400), don't retry repeatedly
        throw new Error(sanitizeErrorMessage(rawMsg));
      }
    } catch (err: any) {
      lastError = err;
      console.error(`[GeminiClient] Exception during attempt ${attempt}:`, err);
      // If error is not a 503/network error, stop retrying
      if (err?.message && !isUnavailableError(0, err.message)) {
        throw new Error(sanitizeErrorMessage(err.message));
      }
    }
  }

  // 2. All 3 retries with primary model failed: Try once more with different model (fallbackModel: true)
  console.warn('[GeminiClient] All retries on primary model failed. Attempting with fallback model...');
  onStatusUpdate?.('The AI is busy, retrying with alternative model...');

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, fallbackModel: true }),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      console.log('[GeminiClient] Success with fallback model.');
      return data as T;
    }

    const rawMsg = data?.error
      ? typeof data.error === 'object'
        ? JSON.stringify(data.error)
        : String(data.error)
      : `HTTP error ${res.status}`;

    console.error('[GeminiClient] Fallback model also failed:', data || rawMsg);
  } catch (err: any) {
    console.error('[GeminiClient] Exception during fallback model attempt:', err);
  }

  // 3. Everything failed: Throw friendly message (never raw JSON)
  throw new Error(FRIENDLY_BUSY_MESSAGE);
}
