// Netlify Function (modern v2 syntax) serving the app's Express API (the Gemini routes).
// The modern runtime injects AI Gateway credentials (GEMINI_API_KEY + GOOGLE_GEMINI_BASE_URL),
// so no key needs to be configured. Requests arrive via the /api/* redirect in netlify.toml.
import type { AddressInfo } from 'net';
import type { Server } from 'http';
import { app } from '../../server';

let serverPromise: Promise<string> | null = null;

// Start the Express app once per function instance on a random local port.
function getBaseUrl(): Promise<string> {
  if (!serverPromise) {
    serverPromise = new Promise((resolve, reject) => {
      const server: Server = app.listen(0, '127.0.0.1', () => {
        const { port } = server.address() as AddressInfo;
        resolve(`http://127.0.0.1:${port}`);
      });
      server.on('error', (err) => {
        serverPromise = null;
        reject(err);
      });
    });
  }
  return serverPromise;
}

export default async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  // Strip any function prefix so Express sees /api/...
  let pathname = url.pathname.replace(/^\/\.netlify\/functions\/api(?=\/|$)/, '');
  if (!pathname.startsWith('/api/')) pathname = `/api${pathname.startsWith('/') ? '' : '/'}${pathname}`;

  const baseUrl = await getBaseUrl();
  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('content-length');

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  const upstream = await fetch(`${baseUrl}${pathname}${url.search}`, {
    method: req.method,
    headers,
    body: hasBody ? await req.text() : undefined,
  });

  const outHeaders = new Headers(upstream.headers);
  outHeaders.delete('content-encoding');
  outHeaders.delete('content-length');
  outHeaders.delete('transfer-encoding');
  return new Response(await upstream.arrayBuffer(), {
    status: upstream.status,
    headers: outHeaders,
  });
};

export const config = {
  path: '/api/*',
};
