// Netlify Function wrapper around the app's Express API (the three Gemini routes).
// GEMINI_API_KEY is set in Netlify: Site settings -> Environment variables.
// Requests arrive via the /api/* redirect in netlify.toml.
import serverless from 'serverless-http';
import { app } from '../../server';

export const handler = serverless(app);
