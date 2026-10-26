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
