# UPDATE-07 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-07.md`. If work stops, read this file, find the first unchecked box, continue from there.
> Decisions and findings are logged at the bottom; the final report is written from them.

## T0. Read
- [x] 0a Read README §5, UPDATE-04, deploy.yml, vite.config.js, index.html, prerender-meta.mjs, main.jsx, App.jsx, brand.js, whatsapp.js, WhatsAppButton, FloatingWhatsApp, RuleText, useOverlayState, ScrollManager

## T1. Remove GitHub Pages deployment
- [x] 1a Delete .github/workflows/deploy.yml (+ empty .github/)
- [x] 1b Delete public/CNAME
- [x] 1c .vercel in .gitignore
- [x] 1d Comments: GitHub Pages / github.io → Vercel / live site (no logic changes)

## T2. Apex domain https://homyresidence.id
- [x] 2a brand.js domain + comment
- [x] 2b index.html canonical / og:url / og:image / twitter:image
- [x] 2c public/robots.txt + public/sitemap.xml
- [x] 2d vite.config.js comment (base '/')

## T3. vercel.json
- [x] 3a vercel.json exactly as spec, no rewrites; README catch-all line removed

## T4. Vercel Analytics + Speed Insights
- [x] 4a npm install @vercel/analytics @vercel/speed-insights
- [x] 4b <Analytics /> + <SpeedInsights /> in App.jsx next to ScrollManager

## T5. Meta Pixel
- [x] 5a Base code in index.html (head script; noscript at top of body)
- [x] 5b src/lib/metaPixel.js + src/components/layout/MetaPixelTracker.jsx (PageView on pathname change, Contact on WhatsApp taps)
- [x] 5c WhatsAppButton data-room

## T6. README
- [x] 6a §5 "Deploy (Vercel) and the domain"; §7 structure; "the live site is case-sensitive"

## V. Verify
- [x] V1 npm ci, lint, verify:data, check:placeholders, build
- [x] V2 dist greps: no www, no CNAME, pixel ID ×2 per HTML, canonicals apex
- [x] V3 Browser: pixel PageView/Contact (preview), ad blocker / no fbq, Vercel Analytics debug (dev), desktop + mobile
- [ ] V4 Commit + push main; Vercel deploy status — committed locally (2 commits on top of 585a0a7); push REJECTED 403: this PC's GitHub credential is account "Beyondcy888", no write access to Exc7567/homyResidence. Owner pushes (`git push origin main`), then checks the Vercel deployment.

## Decisions / notes log
- Owner's message gave `@vercel/analytics/next` / `@vercel/speed-insights/next` imports; this is a Vite + React app (no Next.js), so the `/react` entry points from the spec are used.
- `update-md/UPDATE-07-OWNER-STEPS.md` (named in the spec's report section) does not exist in the folder; not created (owner's own guide).
- T1: deploy.yml + public/CNAME deleted (.github/ removed, now empty). Comments updated in vite.config.js, prerender-meta.mjs (header, homepage, 404.html → Vercel serves it with status 404), assets.js, heroImages.js, properties.js, room-videos.mjs, check-placeholders.mjs. No logic changed. README line "GitHub rejects files above 100 MB" (git push limit for videos) kept: still true, not about hosting.
- T2: brand.domain 'homyresidence.id'; index.html, public/robots.txt, public/sitemap.xml → apex. Only remaining www mention outside history: brand.js comment + README §5.
- T4: @vercel/analytics ^2.0.1, @vercel/speed-insights ^2.1.0 (both have /react entry points). Lockfile diff = only these 2 packages. Fresh `npm ci` OK.
- T5: snippet copied programmatically from UPDATE-07.md (byte-identical in every dist HTML; checked with includes()). Kept at column 0. JSON-LD still inserted (before </head>, after the pixel + Vite's module script).
- V1: npm ci, lint, verify:data (All data checks passed), check:placeholders (23 [ISI:] + 1 photo placeholder = unchanged Villa/room size items), build (SITE_URL=https://homyresidence.id) OK.
- V2: dist: no "www.homyresidence.id", no CNAME; pixel ID count 2 in index.html, a7/h14/parahyangan/alamanda index.html, 404.html; canonical/og:url/og:image/twitter:image all https://homyresidence.id; sitemap + robots apex.
- V3 browser (scratchpad tools/qa.mjs + va.mjs, playwright-core + installed Chrome, port 4391 preview / 5199 dev; 4173 was taken by another process). facebook.com/tr requests were stubbed locally → no test event reached the real pixel.
  - FINDING: fbevents.js blocks "HeadlessChrome" as bot traffic ("[Meta pixel] Bot traffic detected and blocked") → tests use the normal Chrome UA.
  - Contact: one per tap, params correct, new WhatsApp tab opens: header Book Now / help band / floating (general, "Homy Residence"), property card A7 + H14, price box (desktop) + mobile price bar (property), room card A7 Standard / Parahyangan Small (room + room_type), Jadwalkan Visit (visit), Tata Tertib phone (chat, "Homy Residence"), middle-click (auxclick) → 1.
  - PageView: first load 1 (base code); card → /a7 +1; lightbox ×2 + room video open/close (✕, Esc, back) +0; back to home +1; direct load /parahyangan 1 (no double).
  - FINDING: header "/#properti" while on "/" → +1 PageView. Not from our code: fbevents.js wraps history.pushState/replaceState itself (unless fbq.disablePushState) and sends an automatic PageView when location.href changes, hash included. It also de-duplicates manual PageViews per page load: fbq('track','PageView') after the first is dropped (tested on / and /a7). Experiment with disablePushState=true injected in the served HTML only: no PageView at all on in-app page changes → the reference tracker's PageView is in practice a no-op; Meta's own hook sends the (single) PageView per URL change. Spec implementation kept as written. No double PageView observed with fbevents 2.9.441, but the dedupe is gated on Meta-side flags (allowDuplicatePageViews / spa_pageview_fix): Meta can change it without a site change, and page changes would then send two. Not worked around because the base code must stay unchanged → report to owner.
  - FINDING: Meta also sends "SubscribedButtonClick" for button/link taps = Meta's "automatic events" (Events Manager setting), not our code.
  - Ad blocker (fbevents.js blocked) and window.fbq deleted: no errors, links open WhatsApp, no Contact sent. (With fbq deleted, the already-loaded fbevents.js still sends its own automatic PageView/SubscribedButtonClick.)
  - Desktop 1366 + mobile 390: no console errors (except /_vercel/* 404 on local preview — those scripts only exist on Vercel), no horizontal overflow.
  - Vercel Analytics (npm run dev, debug): one "[view]" line per page change (/, /a7, back → /#properti); none for hash link, lightbox, video popup, back-closing overlay. Speed Insights "[vitals]" line OK.
