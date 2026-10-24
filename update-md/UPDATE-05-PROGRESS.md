# UPDATE-05 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-05.md`. If work stops, read this file, find the first unchecked box, continue from there.
> Decisions and findings are logged at the bottom; the final report is written from them.

## T0. Photo folders
- [x] 0a Inventory: root `property-pictures/` does not exist; only `public/property-pictures/` (+ build output `dist/`)
- [x] 0b Confirm no stale duplicate copies (root, dist is build output only)

## T1. A7 room photos
- [x] 1a properties.js: A7 Standard ← A7/standard (3), Superior ← A7/superior (4), Deluxe ← A7/deluxe (3); Executive unchanged (a7-1..a7-3)
- [x] 1b Remove `tempPhotos` everywhere (data, RoomTypeCard, detail.css, README, tokens comment)
- [x] 1c A7 gallery = every image in A7 folder (natural path order); homepage + mini card use first photo
- [x] 1d alt text "Homy Permata A7 — Deluxe — foto 2"

## T2. Parahyangan photos
- [x] 2a Gallery = every image in Parahyangan folders (natural path order)
- [x] 2b Superior ← superior/ (3), Standard ← standard/ (4), Small = empty slot (illustration)
- [x] 2c Homepage card + mini card use first gallery photo (automatic via gallery[0] / cardPhotos)

## T3. Room illustration placeholder
- [x] 3a Inline SVG component (bed/window/wardrobe), brand colors, caption "Foto segera hadir", 4:3, aria-label "Foto belum tersedia"
- [x] 3b Used for empty room/property slots (Parahyangan Small, Villa) via data marker; POI placeholder unchanged
- [x] 3c Single slot: no arrows/dots/counter; Small card not clickable to an empty lightbox
- [x] 3d check-placeholders still reports the empty slots

## T4. Deposit line
- [x] 4a TataTertibSection: deposit line above `<ol>` from `property.deposit` via <Rupiah> (same format as all prices)
- [x] 4b CSS in existing style; README row updated

## V. Verify
- [x] V1 lint + verify:data + check:placeholders + build
- [x] V2 Browser check (desktop + mobile): home, 4 property pages; images 200 exact-case; no console errors
- [x] V3 Final checklist walked; report written

## Decisions / notes log
- Folders found (public/property-pictures): A7/{standard 3, superior 4, deluxe 3} (new); A7 top-level a7-1..a7-7 unchanged since Update 04; PARAHYANGAN/{standard 4, superior 3, small 0}; no files directly in PARAHYANGAN/. No A7 Executive folder.
- No root `property-pictures/` exists, so there was nothing to merge or delete. `public/property-pictures/` is the only source; `dist/` is build output (gitignored) and `diff -rq` shows it identical to public/ after the build. No .DS_Store/Thumbs.db/desktop.ini files. Filenames untouched.
- A7 gallery = all 17 images (a7-1..7 + deluxe/1-3 + standard/1-3 + superior/1-4), natural path order, same approach as H14 (Update 04: every picture in the property folder incl. subfolders). Homepage + mini card = a7-1.jpg (unchanged).
- Parahyangan gallery = 7 (standard/1-4 then superior/1-3, natural path order; no files directly in the folder). Homepage + mini card = standard/1.jpg.
- Empty slots: `noPhoto(label)` (one slot, `placeholder: 'room'`) → ImageWithFallback renders RoomIllustration + "Foto segera hadir", aria-label "Foto belum tersedia". Real property photos also carry `placeholder: 'room'`, so a failed load shows the illustration too. POI objects lack it → old grey placeholder unchanged.
- Empty room card: photo not clickable (nothing to show in the viewer). Illustration has no shimmer.
- `--color-placeholder-chip*` tokens kept: they existed before Update 04 (dev chip tokens), not part of the tempPhotos feature.
- Alt for A7/Parahyangan rooms: "Homy Permata A7 — Deluxe — foto 2". H14/Alamanda room alts left as they were ("… Tipe Standard — foto N"), out of scope.
- V1: lint, verify:data, check:placeholders (2 photo placeholders left: Parahyangan Small, Villa), build OK.
- V2 (vite preview, root /, Chrome desktop 1366 + mobile 390): 113/114 checks; the 1 fail was a test error (Alamanda has 4 photos → no "+N" pill, correct). 0 image HTTP errors, 0 console errors. Screenshots checked: illustration, Villa greyed, deposit line.
STATUS: UPDATE-05 COMPLETE 2026-10-25 (not committed; owner to review/commit).

## Revision 1 (owner, 2026-10-25): remove room size / occupancy placeholders
Owner request: remove the "[ISI: luas kamar]" and "[ISI: contoh "Harga untuk 1 orang"]" line from every room card on the site.
- [x] R1 RoomTypeCard: show size / occupancy only when filled in (not an `[ISI: ...]` placeholder); no empty `.room-meta` row
- [x] R2 Data fields `size` / `occupancyNote` kept in properties.js (filling one in shows it again); README row updated
- [x] R3 Search the whole site (all room cards, homepage, mini cards) for any other visible `[ISI: luas kamar]` / `Harga untuk 1 orang` text
- [x] R4 lint + build; browser check (desktop + mobile): no room card shows the line on A7, H14, Parahyangan, Alamanda; no console errors
- R1–R4 done: only RoomTypeCard showed `size`/`occupancyNote`; now hidden while `[ISI: ...]` (all 11 room types are still placeholders → row gone everywhere). Lint + build OK; Chrome desktop + mobile on /, /a7, /h14, /parahyangan, /alamanda: 28/28 checks (no "luas kamar"/"Harga untuk 1 orang" text, no `.room-meta` row), 0 console errors.
