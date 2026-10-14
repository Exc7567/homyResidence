# UPDATE-01 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-01.md` (+ data in `update-md/homy-properties-poi.md`).
> If work stops, read this file, find the first unchecked box, continue from there.
> Notes/decisions are logged at the bottom so the final owner note can be written from them.

## A. Data layer
- [x] A1 `src/data/pois.js`: shared POI catalog (exact names, coords as strings, category, photo key) + per-property minutes; route URL builder
- [x] A2 properties.js: real pins (lat/lng strings), map embed/open URLs, no isPlaceholder; locationLabel filled
- [x] A3 properties.js: room data per §7.1 (letters, counts, bathroom); Parahyangan facilities w/o bathrooms; room facilityIds only for differing facilities
- [x] A4 highlights per §8.4 (card + Unggulan marker); remove description "Tentang" → short placeholder w/ instruction
- [x] A5 faq.js replaced with the 5 questions (§8.5)
- [x] A6 houseRules.js: Tata Tertib merged blocks (about, penghuni, occupants, min stay, check-in/out, deposit, cancellation, 24h, overnight, visitors, smoking, pets, extra)
- [x] A7 lib/property.js: nearest-campus helper, POI-by-category helper; remove obsolete helpers; format.js remove km

## B. POI photos
- [x] B1 install `sharp` (devDep), script `scripts/process-poi-photos.mjs` with focal-point config (`scripts/poi-photo-config.mjs` or json)
- [x] B2 run → `public/images/poi/<id>.webp` (800x600) + `<id>-sm.webp` (400x300); originals untouched
- [x] B3 view each result, adjust focal points
- [x] B4 report `update-md/poi-photo-report.md` (matched, unmatched, missing, heavy crops)

## C. Detail page
- [x] C1 sections.js: tabs Foto, Fasilitas, Kamar, Lokasi, Point of Interest, Tata Tertib, FAQ
- [x] C2 SectionTabs: remove "Hubungi Tim Kami"; scrollspy works for lokasi vs poi; scroll offset under sticky bars
- [x] C3 HeaderBlock: only name + location label (no chips, no type row, no managed banner)
- [x] C4 FacilitiesSection: rename to "Fasilitas", Unggulan marker, parking row inline (H14 detail), electricity row, remove "Fasilitas unggulan" + separate Parkir block
- [x] C5 RoomsSection: "Total N kamar", no electricity subtitle/notes; RoomTypeCard: type, count, letters, price, Book Now, differing chips only; photo → lightbox; delete RoomModal
- [x] C6 LocationSection: real map, no "Pin sementara", POI under map+address titled "Point of Interest", Visit block stays
- [x] C7 PoiList: 4 unified categories, photo, name, `🏍️ ~N min`, Rute link (new tab)
- [x] C8 Tata Tertib merged section; delete AboutSection + old Aturan/Kebijakan
- [x] C9 FaqSection: new FAQ, no "Hubungi Kami" button
- [x] C10 PriceActions / MobileActionBar: remove "Harga per bulan" + electricity lines
- [x] C11 DetailTopBar: name appears only after h1 scrolls away
- [x] C12 OtherProperties compact cards: photo, name, location, "Mulai dari" only
- [x] C13 PropertyPage: section order wired

## D. Homepage / global
- [x] D1 PropertyCard: remove stat/icon rows + electricity line; add nearest-campus line; highlights per 8.4
- [x] D2 Hero: remove "Book Now" WhatsApp button
- [x] D3 Header Book Now desktop only vs floating button mobile/tablet (no both at once)
- [x] D4 Grep whole site for "Fasilitas bersama", "Supermall", "km", parking on homepage, other repeats
- [x] D5 scripts/prerender-meta.mjs + check-placeholders still OK with new data; README/PROGRESS notes

## E. Verify
- [x] E1 npm run build + lint pass
- [x] E2 Verify route URLs vs source md (script)
- [x] E3 Browser QA 360/412/desktop: no overflow, no console errors, tabs highlight
- [x] E4 Final note to owner

## Decisions / notes log
- Data: shared catalog `src/data/pois.js`; property `pois` + `map` derived from `pin` in properties.js. `scripts/verify-data.mjs` checks totals + all 33 route URLs vs owner md (passes).
- Room `facilityIds` now = only facilities that differ per type (Parahyangan bathrooms). `rooms` string = letters; null → "Semua kamar".
- Highlights simplified to `cardHighlights` (max 2); detail "Unggulan" = `uniqueFacilityIds`. Parking detail → `facilityNotes`.
- Electricity facility label shortened to "Listrik Token per Kamar" (sub-line "Tidak termasuk dalam harga sewa" already says it).
- Nearest campus tie (Alamanda: UPH College 5 = UPH 5) → source order → "UPH College".
- POI photos: `npm run poi:photos` (scripts/process-poi-photos.mjs + scripts/poi-photo-config.mjs focal points). 18/18 files matched, Pramita has no photo (placeholder). Focus adjusted: UPH (y .7), Indomaret Raya Tenggilis (y .52), Palapa (y .45). Palapa source is 415px → upscaled, owner should supply better photo. Report: update-md/poi-photo-report.md
- Not a git repo: processed photos are in public/images/poi (deployed with the build); owner must commit them.
- Detail: AboutSection, RoomModal deleted; HouseInfoSections → TataTertibSection (Tentang Hunian + Penghuni / Sewa / Aturan harian groups). Room photo → shared Lightbox (overlay state {set, index}).
- Scrollspy rewritten: last section whose top passed (tab-bar bottom + min(160px, 25vh)); click locks 900ms then rechecks.
- WhatsApp: hero button removed; header Book Now ≥1024 only, floating button <1024 only (homepage); detail page has no floating button (header on desktop, bottom bar on mobile). FAQ "Hubungi Kami", tab-bar CTA, Aturan link removed.
- Rooms footer note ("Booking dan ketersediaan dikonfirmasi via WhatsApp") removed: FAQ Q1 says the same.
- Facilities: no "Lihat Selengkapnya" collapse anymore (max 8 rows) so the electricity row is always visible.
- C/D/E1/E2 done 2026-10-14; lint + build + verify:data pass. Next: E3 browser QA.
- D4 grep clean; README owner guide updated (pins, POI, photos, room letters, one-home rule). Scrollspy fix: line measured from the bar's stuck position (desktop Foto tab bug).
- E3 QA (headless Chrome, 360/412/768/1280, all 4 detail pages + home): no overflow, no console errors, all 7 tabs highlight correctly on click and manual scroll (Lokasi vs POI), counts of WiFi/electricity/deposit = 1 per detail page, no parking on homepage, room lightbox OK, top-bar title appears after h1 scrolls away. STATUS: UPDATE-01 COMPLETE 2026-10-14.
