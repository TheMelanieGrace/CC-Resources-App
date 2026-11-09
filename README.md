# CC Resources App (CC Classroom Tools)

Custom tools for Classical Conversations Foundations & Essentials families.
Built by Melanie F. with Claude. Not affiliated with Classical Conversations.

## What's inside
- **Foundations**: Tracing Worksheets (all subjects, print & cursive, Review Packet builder
  with quarter presets and helper notes), Geography, Math Practice Builder
  (traditional algorithms: stacked add/subtract, tables, long division, rounding),
  Fine Arts (artist & composer studies with public-domain portraits).
- **Essentials**: Sentence Diagrams (Reed-Kellogg, all 7 patterns), Editor Practice
  (find-and-fix paragraphs and history sentences), Spelling & Homophones (grades 2-5).
- Verified data layer: Cycle 3 complete across all subjects; Bible for all three cycles
  (audited word-for-word against the Memory Masters supplement, Nov 2026).

## Run it locally
```
npm install
npm run dev        # http://localhost:3000 (runs dev-server.ts)
```

## Deploy on Netlify (one-time setup)
1. Push this folder to the GitHub repo **TheMelanieGrace/CC-Resources-App**.
2. In Netlify: **Add new site → Import an existing project → GitHub → CC-Resources-App**.
   Build settings are read automatically from `netlify.toml` (build `npm run build`,
   publish `dist`). Click **Deploy**.
3. The AI features (Ask AI, AI sentence diagrams) use Netlify AI Gateway automatically; no API key is needed.

After that, every update is: replace files on GitHub → Netlify redeploys itself.

## Content rules (the project's constitution)
- Worksheet content comes ONLY from Melanie's guide pages, public-domain texts
  (Vulgate John 1 / Douay-Rheims), or universal facts. AI never composes worksheet content.
- Prompts/questions are never traced; only memory-work answers go on guide lines.
- One source of truth per dataset; every subject list feeds from one shared list.
- Images: public domain only (`public/images/README.txt` has provenance).
- The full build record lives in the Claude project "CC Resources".
