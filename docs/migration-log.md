# CC Resources App — Migration Day Log (Nov 6, 2026)

Companion to cc-classroom-tools-build-record.md. What changed when the app moved from Google AI Studio into Claude Code.

## DEPLOYED ✅ (Nov 9, 2026)

Live at ccresourcesapp.netlify.app (Netlify project "ccresourcesapp", GitHub repo TheMelanieGrace/CC-Resources-App, branch main). Deploy saga: GitHub's web uploader flattened every folder to the repo root three times (drag "choose your files" loses directory structure), so Vite couldn't find src/main.tsx. Resolution: Melanie fed the prebuilt site zip to Netlify's own Claude agent, which restructured the repo on branch agent-ai-gateway-for-deploy-8bbf (PR #1); Claude verified the branch byte-identical to the tested tree in src/ and public/ and building clean before Melanie merged. Notable changes the Netlify agent made (keep these):

- netlify/functions rewritten in Netlify's modern function format; function claims /api/* itself.
- Ask AI + AI sentence diagrams now run on Netlify AI Gateway credentials — no GEMINI_API_KEY needed; usage bills to the Netlify account's AI credits.
- Local dev-server startup moved to dev-server.ts (npm run dev / npm start unchanged).

Housekeeping: stray CC-Resources-App.zip removed from repo root (Nov 9). Still possible: delete the accidental "serene-speculoos" Netlify Drop project.

Claude Code sessions now have push access to the repo. Workflow: Claude makes changes on a branch, builds and checks them in a browser, opens a pull request; Melanie merges and Netlify redeploys.

## Shipped Nov 9

**PR #2 — Homepage simplified.** Homepage is now a welcome message + "Where would you like to start?" with Foundations and Essentials buttons (with age/subject lines). Old homepage sections moved to the hubs (src/components/HubExtras.tsx): memory-work quick starts, Bill of Rights, Presidents & VPs, and Cycle Overviews (collapsed by default) on Foundations; IEW reference on Essentials. Duplicate Tool 1/2/3 cards dropped. App renamed "CC Resources App" (header, tab title, metadata).

**Phone header fix.** Header wraps onto two rows on narrow screens and hides the tagline on phones (still shown when printing); footer text wraps on phones. No more sideways scrolling.

**18. Body Systems tool** (AnatomyTool.tsx, Foundations hub, route #anatomy): eight one-page printables — Skeletal, Muscular, Nervous, Lymphatic, Digestive, Urinary, plus Skull and Heart & Lungs close-ups. Checkbox picker (close-ups off by default), print via printWorksheetPages. Each page: labeled PD diagram + authored kid-level "what it does" notes (urinary uses a number-key legend matching the diagram). Images in public/images/anatomy/ (all verified public domain, provenance in public/images/README.txt): skeletal/nervous/digestive/urinary by Mariana Ruiz Villarreal (LadyofHats, released PD); muscular vectorized from Julien Bouglé 1899 (the raw Bouglé plate is NOT kid-safe — anatomically complete; the sanitized SVG version is the one shipped); lymphatic from NCI SEER Training (US gov PD), lightly retouched for classroom modesty + 2x upscale. Wikimedia fetches rate-limit hard (429s): space requests, use Special:FilePath?width=900, descriptive User-Agent.

## Shipped Nov 6 (all verified in a real browser)

1. Migration: ai.studio export builds clean (fixed esbuild pin). Repo name: TheMelanieGrace/CC-Resources-App (private). Hosting: Netlify.
2. Navigation restructure: Home | Foundations | Essentials. Foundations = Tracing, Geography, Math Practice, Fine Arts, Body Systems. Essentials = Diagrams, Editor Practice, Spelling & Homophones, Verb Conjugation Charts, Essentials tracing.
3. Quarter presets: Weeks 1-6 / 7-12 / 13-18 / 19-24 / All.
4. Palette: tan/brown replaced with white + forest green (#2F5D50 kept); guide-line colors untouched; prompt-label red now #A93E2C.
5. Review Packet starts with no subjects selected; button prompts "Check the subjects you want".
6. Science "What it does" notes (scienceFunctionsData.ts): one kid-level line per term, all list weeks incl. wk6 digestive; toggle (default on) shared with English helps.
7. English grammar helps (englishHelpData.ts): label definitions with each week's own verb; lay/lie, rise/raise, sit/set distinctions; sentence-part examples; pattern examples reuse the 7 diagram chip sentences.
8. Math Practice Builder (MathPracticeTool.tsx): stacked +/- (regroup levels), table drills, long division with classic bracket + remainders, rounding (rule box: "4 or less, let it rest..."), skip counting, deterministic shuffle, answer key. Traditional algorithms only, per Melanie.
9. Editor Practice (EditorPracticeTool.tsx): original paragraph bank + Cycle 3 history-sentence mode; plants capital-start, proper-noun, end-mark, and spelling errors (MISSPELL map); editor's-marks legend + mechanics checklist (own wording; CC's Rules 1-17 NOT copied); answer key.
10. Spelling & Homophones (spellingData.ts, SpellingTool.tsx): 48 lists (grades 2-5 × 12, phonics→morphology; grade 5 = Latin/Greek roots), 20 homophone sets with meanings + traceable sentence; study sheet + dictation test sheet; "Trace These Words" hands lines to the Tracing tool.
11. Fine Arts (FineArtsTool.tsx): full 24-week strand (gaps filled from the Cycle 3 Year-at-a-Glance Melanie sent: wk11 Note Names and D Scale, wk12 Review and Celebration, wk19 Composers Intro Romantic & Modern); skill weeks = drawing-box sheet (lesson content NOT reproduced); artist weeks = facts + name copywork (+ PD portrait for O'Keeffe, Rockwell); composer weeks = listening sheet + PD portraits (Tchaikovsky, Debussy, Stravinsky). Picasso/Moses/Wyeth/Lichtenstein are text-only (works still copyrighted).
12. Bible verbatim audit: 72 corrections against the Memory Masters PDF, incl. C1W1-2 creation days (were wrong), C3W14 "James, the brother of John" (was "of Jesus"), number-words style, YHWH (Yahweh) quotes, "Brazen altar" spelling.
13. Netlify packaging: netlify.toml (SPA + /api redirects), netlify/functions/api.ts (rewritten by Netlify agent Nov 9, see top); server exports app and skips listen on Netlify.
14. Images: public/images/ with provenance README; anatomy set now wired into Body Systems (item 18).
15. Source archive: CC-Resources-Source-Documents.zip delivered to Melanie (all uploads, foldered) for her Google Drive.
16. Cycle 1 first real data (cycle1SampleWeeks.ts): Weeks 21-22 verbatim from Melanie's sample guide pages — math laws, latitude circles, weather fronts, to-be/linking verbs, Canada history (exploration + British North America Act), Canadian Waters + South America (West) geography, timeline cards 141-154. Wired into getSubjectGuideData ahead of placeholders. (Latin 4th-declension endings table not yet modeled.)
17. Verb Conjugation Charts (VerbChartTool.tsx, Essentials): modeled on CC's conjugation-practice method from Melanie's TO LAY sample, with original layout/sentences; verbs parsed from verified CYCLE_3_ENGLISH_WEEKS weeks 5-16; principal-parts header, meaning box for the tricky pairs, fill-in tables (helping-verb blanks on participles), circle-the-correct-word for lay/lie/rise/raise/set/sit, computed answer key incl. to-be irregulars (am/is/are, was/were).

## Open items

- Cycle 1 (beyond weeks 21-22 + Bible) & Cycle 2 subject data: still placeholder, awaiting photos. C1 Latin declension-table format needs modeling. (Prompt template already given to Melanie.)
- Gallbladder bonus note on digestion week: offered, awaiting Melanie's yes.
- Fetch a pre-1930 Picasso photograph (exact Commons filename needed) if a portrait is wanted.
- Tutor announcement message: offered to draft, not yet requested.
- Paywall/access decision still Melanie's call (CC IP considerations flagged in Sept).
- Build record (cc-classroom-tools-build-record.md) not yet in the repo — add it to docs/ when available.
