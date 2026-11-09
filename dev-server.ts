// Local runner: `npm run dev` (Vite middleware) or `npm start` (serves dist/).
// Kept separate from server.ts so the Netlify Function never bundles Vite.
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { app } from './server';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer();
