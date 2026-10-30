# UPDATE-06 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-06.md`. If work stops, read this file, find the first unchecked box, continue from there.
> Decisions and findings are logged at the bottom; the final report is written from them.

## T0. Read
- [x] 0a Read UPDATE-04/05 + progress, houseRules.js, TataTertibSection, whatsapp.js, Toast, RoomTypeCard, properties.js, photo folders

## T1. Tata Tertib
- [x] 1a houseRules.js: AC rule + appliance rules (variants), move-out rule (variants), Alamanda payment/laundry replacements, removals
- [x] 1b Block placement: AC+appliance block mid-list; move-out after "full payment in holiday months" rule
- [x] 1c Totals verified: A7 23, H14 24, Parahyangan 24, Alamanda 22; texts char-for-char

## T2. Clickable numbers
- [x] 2a Account number 7610797053 → copy button (dotted underline + copy icon, aria-label, fallback) + Toast "Tersalin"
- [x] 2b 081311654066 → wa.me/6281311654066 link (new tab, noopener noreferrer) everywhere; search other formats

## T3. Room letters
- [x] 3a Room data: full letter lists (no ranges); wrap on mobile
- [x] 3b A7 Executive O note "Free TV Cable" chip (TV icon), stored in data

## T4. WhatsApp messages
- [x] 4a whatsapp.js templates: room / property / visit / general multi-line; all callers send only their own message

## T5. Photos
- [x] 5a Parahyangan Small ← small/ folder (numeric order)
- [x] 5b Parahyangan Standard card: drop 4th photo (only if exactly 4) — gallery unchanged
- [x] 5c A7 Deluxe card ← deluxe/NEW (numeric order); A7 gallery unchanged (exclude NEW)

## T6. Room videos
- [x] 6a public/property-videos/ + README note
- [x] 6b Registry mechanism (build-time scan) + docs in README
- [x] 6c RoomTypeCard: "Lihat Video" button, in-card player (preload none, playsInline, poster), caption, "Kembali ke foto", one-at-a-time
- [x] 6d Scanner tested on a scratch folder (flat layout, .mov, 2 mp4s, .DS_Store); nothing fake in public/ or dist/

## V. Verify
- [x] V1 lint + verify:data + check:placeholders + build
- [x] V2 Browser check desktop + mobile; no console errors
- [x] V3 Final checklist walked; report written

## Decisions / notes log
- Found: owner already put 10 real videos in public/property-videos as `<PROP>/<ROOM>/<room>.mp4` (A7 4, H14 3, PARAHYANGAN 3, ALAMANDA empty). All H.264+AAC mp4, max 14.2 MB (none > 50 MB). Untracked in git. Spec said `<prop>/<room>.mp4` → support both layouts.
- Photos: PARAHYANGAN/small/ = 1 file `small.png` (no number, only file). PARAHYANGAN/standard = exactly 4 (1-4.jpg) → card 1-3. A7/deluxe/NEW = 1-4.jpg. A7 room letters were already written out (A7 data); H14 Standard 'B – Q', Parahyangan 'E – K, M, N' / 'A – D' are the ranges.
- T1: houseRules.js gets `variants: { slug: text }` (same position) besides onlyFor/except; KTP + payment pairs converted to variants (texts unchanged). Alamanda payment rule in HEAD was already an owner-added jatuh-tempo variant (1 day grace, commit 51cab6b) → replaced with the Update 06 text. Block placed after "Dilarang menggunakan paku…": starts at A7 #12/23, H14 #13/24, Parahyangan #12/24, Alamanda #12/22. Move-out right after "bulan liburan" (#6, H14 #7). Verified: all 8 new quotes char-for-char, totals 23/24/24/22, old rule order and texts kept (scratchpad rules-check.mjs / rules-diff.mjs).
- T2: src/components/detail/RuleText.jsx splits each rule on BANK_ACCOUNT_NUMBER / CONTACT_PHONE (exported from houseRules.js): copy <button> (aria-label "Salin nomor rekening", dotted underline + lucide Copy icon, toast "Tersalin"; fallback textarea+execCommand, last resort toast shows the number) and <a> to buildWaChatLink() = https://wa.me/6281311654066 (new helper in whatsapp.js). Project search: 081311654066 only in houseRules.js (4 rules incl. move-out); no "+62 813-1165-4066" on the site (only in historical docs).
- T4: whatsapp.js TEMPLATES multi-line (\n; encodeURIComponent → %0A). roomFull (unused, no room has status 'full') reformatted in the same style.
- T3: rooms strings written out; `roomNotes: { O: { text: 'Free TV Cable', icon: 'Tv' } }` on A7 Executive; RoomsLine in RoomTypeCard; tag reuses .tag-unggulan pill; roomsLabel → roomLetters (lib/property.js). Tv added to Icon map.
- T5: PARAHYANGAN_ROOM_PHOTOS.small = ['small/small.png'], standard card = 1-3, gallery listed explicitly (1-4 + superior). A7 deluxe card = deluxe/NEW/1-4; A7_GALLERY listed explicitly with old deluxe/1-3 (unchanged).
- T6: scripts/room-videos.mjs (scanRoomVideos + Vite plugin 'virtual:room-videos', dev watcher), src/lib/roomVideos.js, RoomVideo.jsx, RoomTypeCard button; CSS in detail.css; README 3c + public/property-videos/README.md; verify:data lists videos + unmatched + rule totals + no ranges.
- V1: lint, verify:data (10 videos matched, rule totals, no ranges), check:placeholders (1 photo placeholder left: Villa), build OK; dist/property-videos = only the owner's 10 mp4 + README.md.
- V2 (vite preview, Chrome 1366 + 390 mobile, scratchpad/tools/qa.mjs): 282/284. Both fails = H14 videos: Chrome/Edge PIPELINE_ERROR_DECODE with hardware decoding on this PC; play fine with --disable-accelerated-video-decode. H14 videos are ~60 fps (others 30 fps). Not re-encoded (spec) → report to owner. No console errors, no media 4xx, no horizontal overflow; clipboard + execCommand fallback + keyboard OK; no mp4 requested before click.
- Galleries unchanged: A7 17, H14 17, Parahyangan 7, Alamanda 4. Room cards: A7 deluxe 4 (NEW), Parahyangan small 1, standard 3.
STATUS: UPDATE-06 COMPLETE 2026-10-26 (not committed; owner to review/commit).

## Revision 1 (owner, 2026-10-26): videos do not play; no audio; full-screen popup
- [x] R1 Bug A (every video, `npm run dev`): StrictMode mounts effects twice; the old in-card player removed `src` in its cleanup, so the remounted <video> had no source (src null on all 10). Fix: the popup sets `src` in the effect itself (set → play; cleanup → pause, remove src, load), StrictMode-safe.
- [x] R2 Bug B (H14 only, any build): the 3 H14 mp4 files had a malformed avcC (SPS "67 67 64…", PPS "68 68 …": NAL header byte written twice). Software decoding tolerates it; Chrome/Edge hardware decoding fails after a few frames (PIPELINE_ERROR_DECODE). Repaired losslessly: duplicated bytes removed, box sizes + stco offsets adjusted, media payload byte-identical (checked), plays to the end with GPU decoding. Not re-encoded. Originals (bytes as delivered) backed up in the session scratchpad `h14-originals/`. New `npm run video:fix -- <file>` (scripts/fix-video-header.mjs) + scan/verify:data warn "broken H.264 header".
- [x] R3 No audio: `muted` + re-mute on volumechange; volume controls hidden (WebKit/Blink pseudo-elements).
- [x] R4 Popup: src/components/detail/RoomVideoPopup.jsx (portal, z-modal): 9:16 video fills the screen height (height min(100dvh, 100vw*16/9)), sides = low-res canvas copy of the video (cover crop, 12 fps) blurred 28px + brightness .45. Caption top-left, ✕ top-right; Esc, tap beside the video, phone back gesture (useOverlayState('video')) close it; scroll lock, focus trap, focus returns to "Lihat Video". In-card player + "Kembali ke foto" removed (RoomVideo.jsx deleted, CSS replaced).
- [x] R5 README 3c + public/property-videos/README.md updated; package.json `video:fix`.
- [x] R6 lint, verify:data, build OK; all 10 dist videos have a clean header. Browser (headed Chrome, GPU decoding on, desktop 1366 + mobile 390): dev server 276/276 ×2, production build 276/276 — every room video opens, plays (t > 1 s), muted, 9:16, fills screen, blurred sides drawn, closes by ✕/Esc/backdrop/back, scroll position + focus restored, no mp4 before click, Alamanda no button, no console errors. (Earlier scroll "failures" were Playwright's own click auto-scroll under `scroll-behavior: smooth`; real mouse/touch clicks keep the position.)
STATUS: REVISION 1 COMPLETE 2026-10-26 (not committed).

## Revision 2 (owner, 2026-10-28): homepage card location + travel rows
Owner answers: keep existing minutes; 3 rows sorted by minutes for A7/Parahyangan/Alamanda (H14 keeps UBAYA); location wraps naturally; Pramita removed from cards only (stays in the detail POI list).
- [x] C1 locationLabel: A7 'Lippo Karawaci, Taman Permata, Binong, Tangerang', Parahyangan 'Lippo Karawaci, Taman Parahyangan, Binong, Tangerang' (also used by the detail header + "other properties" mini cards). Mini-card location clamp 2 → 3 lines (detail.css) so the Parahyangan label is never cut on tablet/mobile; homepage card stays at 2 lines (fits at 1366/820/390).
- [x] C2 Card travel rows: `cardPoiIds: ['uph', 'uph-college', 'supermal-karawaci']` (TANGERANG_CARD_POIS) on A7, Parahyangan, Alamanda; `cardDestinations()` in lib/property.js (sorted by minutes, ties keep listed order; no cardPoiIds → nearestCampus, i.e. H14 UBAYA). PropertyCard renders a <ul> of rows. `cardName: 'Universitas Pelita Harapan'` on the uph catalog entry (detail page keeps "(UPH)").
- [x] C3 Minutes (unchanged pois.js data): A7 Supermal 10, UPH 12, UPH College 12 · Parahyangan 12, 14, 14 · Alamanda 3, 5, 5 · H14 UBAYA 3.
- [x] C4 README table: locationLabel note + cardPoiIds/cardName row.
- [x] C5 lint, verify:data, build OK; preview at 1366/820/390: rows + labels correct, no clipped location text, no horizontal overflow, no console errors.
STATUS: REVISION 2 COMPLETE 2026-10-28 (not committed).

## Revision 3 (owner, 2026-10-28): H14 card rows + room-card availability note
- [x] D1 H14 homepage card looked empty → `cardPoiIds: ['ubaya', 'alfamidi-rungkut', 'palapa-swalayan']` (existing minutes): Alfamidi Rungkut ~2, UBAYA ~3, Palapa Swalayan ~5 (sorted by minutes, same rule as the Tangerang cards). Every open property now has `cardPoiIds`; the nearest-campus fallback stays for future properties.
- [x] D2 Every room card (detail page, all 11 room types): small muted note under price + Book Now, full width, teal MessageCircle icon: "Silakan chat kami untuk mengetahui ketersediaan kamar." (owner's draft "tolong chat untuk mengetahui availibility kamar", reworded to Indonesian). `.room-card__note` in detail.css (--fs-xs).
- [x] D3 lint, verify:data, build OK; preview 1366 + 390: H14 card 3 rows, note on A7 4 / H14 3 / Parahyangan 3 / Alamanda 1 room cards, no horizontal overflow, no console errors.
STATUS: REVISION 3 COMPLETE 2026-10-28 (not committed).

## Revision 4 (owner, 2026-10-30): Alamanda photo order + FAQ placeholder
- [x] E1 Owner replaced public/property-pictures/ALAMANDA/alamanda1-4.jpg (files are .jpg, not .png). New content: 1-2 = room, 3-4 = building (the reverse of Update 04).
- [x] E2 Homepage card: `cardCover: 'alamanda4.jpg'` removed → slides in file order alamanda1, 2, 3, 4 (counter 1/4, first slide alamanda1). Detail gallery already 1-4 (unchanged). Room card "Standard" photos were ['alamanda4', 'alamanda3'] (now building shots) → ['alamanda1', 'alamanda2'] (room shots). Comment updated.
- [x] E3 Placeholder sweep (`check:placeholders` + grep "[ISI:" in src): the only one visitors could see was FAQ "Apakah masa sewa bisa diperpanjang atau pindah kamar?". Still left but hidden on the site: room `size` / `occupancyNote` (RoomTypeCard hides them) and the Villa `locationLabel` (under-construction card hides it). The FAQ is one shared list (src/data/faq.js), so the question exists once and shows on all 4 property pages.
- [x] E4 Answer: "Bisa. Silakan hubungi nomor 081311654066." (built from CONTACT_PHONE in houseRules.js). FaqSection passes answers through RuleText (new optional `renderAnswer` prop on Accordion) → the number is a wa.me/6281311654066 link (new tab, noopener noreferrer), same style as the Tata Tertib.
- [x] E5 lint, verify:data, check:placeholders (FAQ gone; 25 left = room size/occupancy + Villa), build OK. Preview 1366 + 390: Alamanda card starts at alamanda1; room card 1-2; FAQ link correct on a7/h14/parahyangan/alamanda; no visible "[ISI:" on any property page; no console errors.
STATUS: REVISION 4 COMPLETE 2026-10-30 (not committed).
