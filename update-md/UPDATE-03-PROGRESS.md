# UPDATE-03 Progress Checklist (resume point)

> Spec: `update-md/UPDATE-03.md` (Revision 1: H14 + Alamanda = Kost Putri; Parahyangan + A7 = Kost Campur).
> Reference images (owner): `C:\Users\User\Downloads\home_references.png`, `home.png`, `footer.png`.
> Font files: `font/` (Josefin Sans TTF, all weights; Nura OTF incl. Black + ExtraLight).
> If work stops, read this file, find the first unchecked box, continue from there.
> Notes/decisions are logged at the bottom so the final owner note can be written from them.

## A. Record the original (BEFORE any font/layout change)
- [x] A1 Read all CSS + components; capture fonts per section/component (family, weight, style, size, line-height, letter-spacing), loading method, fallback stack
- [x] A2 Describe current homepage hero + footer (structure, key styles; refs home.png / footer.png)
- [x] A3 Write `FONT-AND-LAYOUT-BEFORE-UPDATE-03.md` (project root, not deployed) — before-data done; **rollback recipe section still to append after fonts are done (F4)**

## B. Fonts
- [x] B1 Convert fonts to woff2 → `public/fonts/` (Josefin 400, 400i, 500, 600, 700 + Nura Black/ExtraLight)
- [x] B2 `src/styles/fonts.css` @font-face (swap, ascent/descent override 85/15), imported in index.css; index.html preloads Nura×2 + Josefin 400/600; Google Fonts removed
- [x] B3 tokens.css: Josefin font stack, sizes +1px for lowercase text, new tokens (--fs-btn, --fs-btn-sm, --fs-chip, --fs-tab, --fs-tab-sm, --fs-card-title, --ls-label, --fs-logo, --fs-logo-small, --fs-hero); base/common/detail/home css use them. `<Rupiah>` (smaller "Rp") in 5 price spots. (visual tuning continues in F2)
- [x] B4 Logo: Nura 900/200, uppercase via CSS, letter-spacing .02/.1em, color primary for both words
- [ ] B5 Grep: no leftover old font family anywhere (CSS, index.html, scripts, og/meta, favicon)

## C. Footer removal + Kontak
- [x] C1 Delete SiteFooter component + usages (Home, Property, 404) + footer CSS
- [x] C2 Footer `#kontak` gone; brand.js: removed blurb, whatsappDisplay, email, address, social (+ heroSubtitle, heroImage, heroStats); check-placeholders uses heroPhotos
- [x] C3 HelpBand section now `id="kontak"` + anchor-target; header link `/#kontak` (works cross-page via ScrollManager)
- [x] C4 Page ends: `.home` padding-bottom (mobile, floating WA); `.detail` padding = measured `--mobile-bar-h` + 24px (MobileActionBar ResizeObserver); 404 fills the screen

## D. Homepage hero redesign
- [x] D1 SiteHeader rewritten: grid logo | pill | Book Now (pill radius), transparent on home until scroll, pill highlights section in view (home only)
- [x] D2 Hero.jsx rewritten: glow (3 radial blobs, float anim), h1 Nura 2 lines, tagline italic, "Lihat Property" pill + ArrowDown in white circle → #properti
- [x] D3 HeroPhotoArc: 5 cards from BRAND.heroPhotos, CSS 3D rotateY(k) + lift(k²) under one perspective, aria-hidden
- [x] D4 Mobile: 24vw cards, smaller turn/lift, headline 16.4vw (verify 360/430 in F2)
- [x] D5 Old hero CSS removed (blob, eyebrow, tagline, actions, stats, media); animations off under reduced motion (global rule; check in F2)

## E. Addresses + kost type
- [x] E1 Addresses (exact text) in `address` of the 4 properties (panel under the map)
- [x] E2 `KOST_TYPES` + `kostType: 'putri'|'campur'` in properties.js; badge via `badgeLabel()` (lib/property.js); villa unchanged (no badge on UC card)
- [x] E3 Tata Tertib → Penghuni via `occupantsText()`; `occupantPolicy` placeholder removed from houseRules.js
- [x] E4 prerender-meta: "<name>: Kost Putri/Kost Campur bulanan mulai Rp…/bulan. …"
- [x] E5 verify-data also asserts the 4 kost types + exact addresses; check-placeholders lists 5 hero photos

## F. Verify
- [x] F1 lint + verify:data + build pass (build with MSYS_NO_PATHCONV=1 in Git Bash, else VITE_BASE gets mangled)
- [x] F2 QA script (scratchpad/tools/qa.mjs) on production preview: 280/280 pass — 9 home widths 360–1920, 4 property pages × 3 widths, 404, reduced motion, Kontak from home/detail/404, hero button, pill highlight, page ends
- [x] F3 Grep clean (Inter only in comments pointing to the record; no footer/brand-field leftovers)
- [x] F4 README updated (kostType, hero photos, fonts §3b, no footer/Kontak, villa note); rollback recipe appended to the record and TESTED: 85/85 comparable elements identical to the original Inter capture
- [x] F5 Final note to owner (in chat, 2026-10-16)

STATUS: UPDATE-03 COMPLETE 2026-10-16.

## Decisions / notes log
- Font folder contains all needed files: Nura-Black.otf + Nura-ExtraLight.otf present; Josefin Sans full TTF family present. Nothing missing.
- Tools (scratchpad, not project): playwright-core + system Chrome for capture/QA; fontkit + subset-font (wawoff2) for font conversion. Scripts: scratchpad/tools/capture-fonts.mjs. Dev server: `npx vite --port 5199 --strictPort --host 127.0.0.1` → http://127.0.0.1:5199/homyResidence/
- Before-capture: all Inter 400/500/600/700, Google Fonts link. Screenshots + owner refs copied to `update-md/update-03-refs/`.
- Josefin Sans = OFL 1.1 WITH Reserved Font Name → convert TTF→WOFF2 unmodified (no subsetting). Josefin has NO tnum feature → tabular-nums is a no-op; counters need fixed min-width.
- Nura name table: "Copyright © 2021 by Irpan maulana. All rights reserved.", no license field → flag to owner (verify web-embedding rights). Converted unmodified to WOFF2.
- Gallery mosaic watermark also uses <Logo small light /> → will use Nura too (same logo component); mention in final note.
- Rollback-relevant changes so far (for the recipe): tokens block; fonts.css; index.html preloads; base.css (.eyebrow ls, .btn, .btn-sm, .chip-highlight → tokens; .rp-cur added); common.css (.logo block → Nura; accordion 16px → var(--fs-body)); detail.css (tabs 16/15 → --fs-tab/--fs-tab-sm, poi tab 15 → --fs-tab-sm, poi cat ls .02em → --ls-label, rules title ls .04em → --ls-label, price-card suffix 16 → --fs-body); home.css (card name 20 → --fs-card-title). Removed token --fs-display (old hero only).
- Fixed pre-existing dev console error: React 18 warns on camelCase fetchPriority → ImageWithFallback uses lowercase `fetchpriority` only when priority.
- Kontak target = help band section `id="kontak"` (keeps old /#kontak links working). Header pill scrollspy: line slides to the bottom over the last screen (short last sections) + clicked item pinned until the visitor scrolls.
- Hero: button arrow points down (it scrolls down); glow = whatsapp-green/gold/teal radial blobs; arc cards 24vw mobile, clamp(200px, 20.5vw, 440px) desktop so outer photos always run past the edges; --fs-hero clamp(52,16.4vw,108) mobile, clamp(96, min(10.4vw,19vh), 168) desktop.
- Logo: both words in primary green (old logo had "Residence" in text black); header Book Now now pill-shaped to match the pill menu.
- Page ends: mobile detail padding = measured bottom-bar height (+24px) instead of fixed 150px.
