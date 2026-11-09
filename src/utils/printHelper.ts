/**
 * Robust printing engine for US Letter worksheets.
 * Handles sandboxed iframes, font loading, new-tab fallback, and friendly blocked notices.
 */

export interface PrintOptions {
  pagesHtml: string[];
  docTitle?: string;
  onBlockedNotice?: (message: string) => void;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getDocumentStyles(): string {
  if (typeof document === 'undefined') return '';
  return Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((el) => el.outerHTML)
    .join('\n');
}

export function buildPrintHtmlDocument(pagesHtml: string[], docTitle: string = 'Worksheet'): string {
  const docStyles = getDocumentStyles();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(docTitle)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Josefin+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Playwrite+US+Trad:wght@400&display=swap" rel="stylesheet">
  ${docStyles}
  <style>
    @page {
      size: letter portrait;
      margin: 0.35in 0.4in;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: white;
      color: #2E2B26;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .print-page-card {
      width: 100%;
      min-height: 10.2in;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      padding: 0;
      box-sizing: border-box;
    }
    .print-page-card:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    .pdf-note {
      display: none;
    }
    @media screen {
      body {
        background: #F0EDE6;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .pdf-note {
        display: block;
        background: #2F5D50;
        color: white;
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 13px;
        margin-bottom: 24px;
        max-width: 816px;
        width: 100%;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }
      .print-page-card {
        background: white;
        max-width: 816px;
        width: 100%;
        min-height: 1056px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        border: 1px solid #D5DED8;
        border-radius: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="pdf-note">
    💡 <strong>Print Tip:</strong> Choose <strong>"Save as PDF"</strong> as your destination in the print dialog to download this worksheet as a PDF file.
  </div>
  ${pagesHtml
    .map(
      (pHtml, index) => `
    <div class="print-page-card" data-page-number="${index + 1}">
      ${pHtml}
    </div>`
    )
    .join('\n')}
</body>
</html>`;
}

function openInNewTabFallback(fullDocHtml: string, onBlockedNotice?: (msg: string) => void): boolean {
  try {
    const newTab = window.open('', '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      throw new Error('New tab popup blocked by browser');
    }

    newTab.document.open();
    newTab.document.write(fullDocHtml);
    newTab.document.close();
    newTab.focus();

    setTimeout(() => {
      try {
        newTab.print();
      } catch (printErr) {
        console.warn('[PrintHelper] New tab automatic print dialog triggered:', printErr);
      }
    }, 700);

    return true;
  } catch (err) {
    console.error('[PrintHelper] Popup window was blocked:', err);
    onBlockedNotice?.(
      "Printing is blocked in this preview. Open the app's shared link in a normal browser tab and print from there."
    );
    return false;
  }
}

export async function printWorksheetPages(options: PrintOptions): Promise<void> {
  const { pagesHtml, docTitle = 'Worksheet', onBlockedNotice } = options;
  if (!pagesHtml || pagesHtml.length === 0) return;

  const fullDocHtml = buildPrintHtmlDocument(pagesHtml, docTitle);

  return new Promise((resolve) => {
    let handled = false;

    // Timeout fallback if iframe never loads (e.g. sandbox completely prevents srcdoc execution)
    const safetyTimeout = setTimeout(() => {
      if (!handled) {
        handled = true;
        console.warn('[PrintHelper] Iframe load timed out, using new tab fallback...');
        openInNewTabFallback(fullDocHtml, onBlockedNotice);
        resolve();
      }
    }, 2500);

    try {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      iframe.setAttribute('sandbox', 'allow-modals allow-same-origin allow-scripts');

      iframe.onload = async () => {
        if (handled) return;
        handled = true;
        clearTimeout(safetyTimeout);

        try {
          // Wait for fonts to be ready
          if (iframe.contentDocument?.fonts?.ready) {
            await iframe.contentDocument.fonts.ready;
          }
          await new Promise((r) => setTimeout(r, 200));

          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          setTimeout(() => {
            try {
              iframe.remove();
            } catch {
              // ignore
            }
            resolve();
          }, 4000);
        } catch (iframeErr) {
          console.warn('[PrintHelper] Iframe print blocked, falling back to new tab:', iframeErr);
          openInNewTabFallback(fullDocHtml, onBlockedNotice);
          try {
            iframe.remove();
          } catch {
            // ignore
          }
          resolve();
        }
      };

      document.body.appendChild(iframe);
      iframe.srcdoc = fullDocHtml;
    } catch (createErr) {
      if (!handled) {
        handled = true;
        clearTimeout(safetyTimeout);
        console.warn('[PrintHelper] Could not create iframe, falling back to new tab:', createErr);
        openInNewTabFallback(fullDocHtml, onBlockedNotice);
        resolve();
      }
    }
  });
}
