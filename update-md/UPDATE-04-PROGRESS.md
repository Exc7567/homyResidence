# UPDATE-04 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-04.md`. If work stops, read this file, find the first unchecked box, continue from there.
> Owner answers (2026-10-22) and other decisions are logged at the bottom; the final report is written from them.

## T1. Custom domain www.homyresidence.id
- [x] 1a `public/CNAME` = `www.homyresidence.id` (one line, no newline)
- [x] 1b `vite.config.js` base `/`; `.github/workflows/deploy.yml` drop VITE_BASE, SITE_URL `https://www.homyresidence.id`
- [x] 1c `index.html` canonical/og/twitter → `https://www.homyresidence.id/…`; `public/robots.txt` + `public/sitemap.xml` → www; `BRAND.domain` → `www.homyresidence.id` (prerender default)
- [x] 1d README §5 (domain/CNAME/workflow) updated
- [x] 1e Project-wide search: no `exc7567.github.io` / `/homyResidence/` path left (only historical update-md docs)

## T2. Property photos
- [x] 2a Move `property-pictures/` → `public/property-pictures/` (names unchanged; only public/ is published)
- [x] 2b properties.js: photo helper (exact paths, encodeURI, alt "<name> — foto N"), galleries: A7 (7), Alamanda (4), H14 (17, fasad first then natural path order)
- [x] 2c Room photos: H14 standard/→Standard, deluxe/→Superior (inferred), superior/→Executive; Alamanda Standard ← alamanda3+4; A7 all 4 types ← a7-1..a7-3 with `tempPhotos` marker
- [x] 2d RoomTypeCard: outline + small reminder text when `tempPhotos` (A7 only) + CSS
- [x] 2e Home cards / mini cards use gallery (first photo first) — verify, no code change expected

## T3. Random hero
- [x] 3a `src/data/heroImages.js`: `HERO_IMAGES` list (9 files in HERO-random), clearly commented
- [x] 3b `src/lib/heroPhotos.js`: pick 5 at random once per page load, centre ≠ last visit's centre (localStorage in try/catch)
- [x] 3c Hero.jsx uses it; BRAND.heroPhotos removed; check-placeholders.mjs + README updated; eager load on desktop (no blank hero)

## T4. Universitas Pramita POI photo
- [x] 4a `npm run poi:photos` → `public/images/poi/pramita(.webp|-sm.webp)`, `src/data/poiPhotos.js`, report; other POI webp files unchanged (git diff)

## T5. Tata Tertib
- [x] 5a houseRules.js: `HOUSE_RULES` (21 rules once, parking rule `onlyFor: ['h14']`) + `houseRulesFor(slug)`
- [x] 5b TataTertibSection: heading "Tata Tertib Peraturan Kost" + `<ol>`; old content removed (Tentang Hunian, Penghuni, Sewa, Aturan harian)
- [x] 5c Dead code removed (getHouseInfo/info prop, description/aboutPlaceholder, occupantsText, NOTES.depositTemplate, old CSS); README rows updated

## T6. FAQ placeholders + parking
- [x] 6a faq.js: payment → "Transfer bank, dibayar di awal bulan."; hours → "Setiap hari 08.00–21.00."; extension (no example) left
- [x] 6b H14 parking note → "Parkir motor gratis. Parkir mobil Rp150.000/bulan untuk menjaga/memesan slot parkir."

## T7. Tagline
- [x] 7a BRAND.tagline = "Hunian nyaman untuk mahasiswa & profesional"

## V. Verify
- [x] V1 lint + verify:data + check:placeholders + build (dist has CNAME, root paths)
- [x] V2 Serve dist from `/`: home, 4 property pages, 404; all images 200 with exact-case paths; hero random over reloads; no console errors
- [x] V3 Final checklist in UPDATE-04.md walked; report written to owner

## Decisions / notes log
- Owner (Q1 hero): keep the 5-card arc; each load shows 5 random photos from HERO-random. HERO-random actually has 9 files (spec said 5); all 9 are byte-identical copies of property photos.
- Owner (Q2 H14): "superior is Executive"; include all H14 pictures in the H14 property. → deluxe/ inferred = Superior (only remaining type) — flag in report.
- Owner (Q3 rooms): A7: room pictures on all room types + small outline + small reminder text. Alamanda: 2 room photos (alamanda3, alamanda4) in the room type, all 4 in the gallery.
- Owner (Q4): fill FAQ placeholders only; room notes/sizes stay placeholders (list in report).
- PARAHYANGAN folder is empty → its gallery/room placeholders stay (report). Villa (under construction) has no photos either.
- No parking item exists in faq.js; the H14 parking answer is the Fasilitas note `facilityNotes.parking_basement` (already H14-only). Update that text; no new FAQ item.
- FAQ is one shared list (src/data/faq.js) rendered on every property page.
- Index.html/sitemap/robots used non-www `homyresidence.id` → switched to the main address `https://www.homyresidence.id`.
- GitHub Pages deploys via Actions: GitHub ignores the CNAME file for Actions deployments; the custom domain must also be set in repo Settings → Pages (tell owner).
- Pramita POI: processed by the existing POI pipeline (same 800×600/400×300 WebP as every other POI) — the "do not convert" rule is about property photos; Task 4 asks for the same pattern as the other POIs.
- brand.js rewritten in one go: domain www, tagline (T7), heroPhotos removed (T3 → heroImages.js, Hero.jsx still to do), NOTES.depositTemplate removed (T5 → TataTertibSection still imports it until 5b).
- property-pictures/ moved with PowerShell Move-Item (bash mv got 'Permission denied'); 37 files, hashes unchanged. RoomTypeCard now always wraps the carousel in div.room-card__media (same layout); temp note uses --color-placeholder-chip tokens. Parking note (6b) + description/occupants removal (5c, data part) done in properties.js.
- T4: 18 existing POI webp byte-identical after rerun; pramita 1360x914 → 90% kept, crop checked visually. T5: rules verified char-for-char vs UPDATE-04.md (21; h14 21, others 20). Tailwind preflight resets lists → .rules-list sets list-style: decimal. Deposit amount + 'Siapa yang bisa tinggal' no longer shown anywhere (were only in old Tata Tertib) — tell owner.
- V1/V2 (2026-10-22): lint, verify:data, build OK (SITE_URL default www, dist/CNAME present, no /homyResidence/ in dist). QA scripts (scratchpad/tools/qa.mjs, qa2.mjs, shots.mjs; playwright-core + system Chrome; `npx vite preview --port 5199`): 535/538 on first run; the 3 fails were test artifacts (lazy POI image not yet loaded on fast scroll → re-checked: pramita-sm 112x84 loads like the others; DNS errors from the external Google Maps iframe). Hero: 9/9 photos seen over 10 reloads, centre never repeated; works with localStorage blocked. All 28 property photos requested with exact-case paths.
- 1e: remaining hits only in historical docs (allMD/, update-md/UPDATE-02.md, UPDATE-03-PROGRESS.md, UPDATE-04.md) + local disk path in PROGRESS.md. README DNS line reworded to avoid the old host name.
STATUS: UPDATE-04 COMPLETE 2026-10-22 (not committed; owner to review/commit).

## Revision 1 (owner, 2026-10-22): photo arrangement
- [x] R1 Homepage cards only: cover H14 = superior/IMG-20261019-WA0213.jpg, Alamanda = alamanda4.jpg (`cardCover` + `cardPhotos()`; detail gallery + "Hunian Homy Lainnya" mini cards unchanged)
- [x] R2 H14 room cards: Standard 1st slide WA0199; Executive 1st slide WA0213
- [x] R3 Alamanda Standard room card: swap slides (alamanda4 first)
- [x] R4 README, lint, build, browser check
- R1–R4 done: lint + build OK; browser check 16/16 (home covers H14 WA0213 + Alamanda alamanda4, all slides kept; property-page galleries and 'Hunian Homy Lainnya' cards unchanged; room first slides H14 Standard WA0199, Executive WA0213, Alamanda Standard alamanda4).
