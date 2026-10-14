# 10. Acceptance Checklist

The build is **not finished** until every item below passes. Test on a real phone (or Chrome DevTools device mode) **and** on desktop. Tick each box and report any failure to the owner.

---

## A. Owner requirements (must all be true)

- [ ] Homepage title/h1 is **"Homy Residence"** and it shows **cards for all 5 properties**.
- [ ] Clicking a card opens that property's own page at `/a7`, `/h14`, `/parahyangan`, `/alamanda`. The URL in the browser changes and can be shared.
- [ ] Opening each of those URLs **directly** (typing or refreshing) works on the deployed site (no 404).
- [ ] No booking happens on the website. Every "Book Now" opens **WhatsApp** (`wa.me/6281311654066`) with a prefilled message.
- [ ] Every property page shows: **Tipe Kamar**, **Fasilitas**, **Titik Lokasi** (map), **Point of Interest** (with photos/placeholders).
- [ ] All photos are placeholders, clearly replaceable; the owner can drop real photos in without code changes.
- [ ] **AC and WiFi** shown for every property; **electricity shown as excluded** (token meter per room).
- [ ] **Unique facilities are highlighted** (teal "Unggulan" chips) per file 03 section 2.
- [ ] **Parking details do NOT appear on the homepage** (cards, strip, footer, any text). They appear on detail pages (all four) and H14 shows basement parking, motor free, car Rp150.000.
- [ ] **Deposit** appears as a disclaimer (detail page: Kebijakan Hunian, room cards, FAQ), not on homepage cards.
- [ ] **Villa Purnava Permata** card is **greyed**, labelled **"Under Construction"**, has **no ribbon, no buttons (no "Hubungi"), and is not clickable or focusable**.
- [ ] A **placeholder tagline** exists on the homepage.
- [ ] Button label is **"Book Now"** (exact capitalization).
- [ ] Language of the UI is Indonesian; prices formatted `Rp1.700.000 /bulan`; only monthly prices.
- [ ] Map is **draggable/zoomable** (after the first tap/click activation), uses a placeholder pin, and the real pin can be swapped by editing one field.
- [ ] Image carousels on property cards **change pictures via Next/Previous arrows** (and swipe on touch).
- [ ] Detail page follows the **Rukita structure** (all sections of file 05 present, in order).

## B. Data correctness (compare against file 03)

- [ ] A7: Standard 1.700.000 · Superior 1.900.000 · Deluxe 2.000.000 · Executive 2.500.000; deposit 500.000.
- [ ] H14: Standard 1.700.000 · Superior 1.850.000 · Executive 2.500.000; deposit 500.000.
- [ ] Parahyangan: Small 1.200.000 · Standard 1.450.000 · Superior 1.650.000; deposit 500.000; Superior has bathroom inside, Standard/Small outside.
- [ ] Alamanda: one tier 1.000.000; deposit 200.000; bathroom outside; washing machine floor 4.
- [ ] "Mulai dari" on cards: A7 Rp1.700.000, H14 Rp1.700.000, Parahyangan Rp1.200.000, Alamanda Rp1.000.000 (computed, not hard-coded).
- [ ] POIs: Supermall Karawaci, UPH College, Universitas Pelita Harapan (A7, Parahyangan, Alamanda); Universitas Surabaya, Rumah Sakit UBAYA (H14).
- [ ] Room letters/names (including "Fanta") and unit counts are **not** displayed anywhere.
- [ ] Property names are the exact strings: Homy Permata A7, Homy Residence H14, Homy Parahyangan, Homy Budget Alamanda, Villa Purnava Permata.

## C. Mobile (360, 390, 412 px wide; also 320 px)

- [ ] No horizontal page scroll anywhere.
- [ ] All tap targets ≥ 44×44 px; text ≥ 14 px; inputs/buttons 16 px.
- [ ] Detail page: dark-green top bar with back, title pill and share; sticky scrollable tab bar with underline on the active tab; fixed bottom bar with price + "Book Now" + "Lihat Tipe Kamar"; content is never hidden behind the bar.
- [ ] Tabs scroll horizontally, active tab auto-centers, tapping a tab scrolls to the correct section without being covered by sticky bars.
- [ ] Map does not trap page scroll; first tap activates dragging; hint chip visible.
- [ ] Room modal opens as a bottom sheet, scrolls inside, "Book Now" pinned, closes with X/backdrop/back gesture.
- [ ] Share button uses the native share sheet (or copies the link and shows "Link disalin").
- [ ] Floating WhatsApp button visible on homepage, hidden on mobile detail pages.
- [ ] Safe-area insets respected on notched phones (bottom bar, floating button).

## D. Tablet / Desktop (768, 1024, 1280, 1440 px)

- [ ] Homepage grid: 1 / 2 / 3 columns at <640 / ≥640 / ≥1024.
- [ ] Detail page ≥1024: gallery mosaic (1 large + 4 small, "+N" overlay), two-column layout with sticky price card, sticky tab bar under the header, breadcrumb.
- [ ] Hover states only enhance (nothing essential depends on hover).
- [ ] Lightbox: arrows, keyboard, Esc, thumbnails.

## E. Interactions

- [ ] Carousel: arrows, swipe, dots, counter, keyboard; no accidental click after a drag.
- [ ] Accordion (FAQ) single-open; Expandable "Lihat Selengkapnya" toggles and hides when not needed.
- [ ] POI tabs generated from categories; "Semua" tab appears only when >1 category.
- [ ] WhatsApp links: correct number, message differs by context (general / property / room / visit), properly URL-encoded, open in a new tab with `noopener noreferrer`.
- [ ] `/villa-purnava` redirects to `/`; unknown URL shows the friendly 404 page.

## F. Placeholders

- [ ] `npm run check:placeholders` prints every remaining placeholder (text and images).
- [ ] No `[ISI: ...]` text leaks into `<title>` or meta descriptions.
- [ ] In dev, placeholders have the amber dashed outline; map placeholder shows the "Pin sementara" chip.

## G. SEO and link preview

- [ ] `dist/a7/index.html`, `dist/h14/index.html`, `dist/parahyangan/index.html`, `dist/alamanda/index.html`, `dist/404.html` exist after `npm run build`.
- [ ] Each has its own `<title>`, description, canonical URL and `og:*` / `twitter:*` tags (view-source check).
- [ ] `robots.txt` and `sitemap.xml` present (villa excluded).
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## H. Accessibility

- [ ] Keyboard-only: every control reachable, visible focus ring, dialogs trap focus and return it.
- [ ] Icon-only buttons have Indonesian `aria-label`s; images have `alt`.
- [ ] Color contrast AA for all text (including the white-on-green top bar and muted grey text).
- [ ] `prefers-reduced-motion` respected.

## I. Code quality

- [ ] All colors, fonts, radii and spacing come from `tokens.css` (grep for hard-coded hex in components returns nothing).
- [ ] No property-specific text, price or number is hard-coded in components.
- [ ] Data files import cleanly in Node (the prerender script runs).
- [ ] No console errors/warnings; ESLint passes; `npm run build` succeeds.
- [ ] README written for the owner (file 09 section 5).

## J. Final delivery note (the agent must include)

1. What was built and the live preview URL.
2. The list from `npm run check:placeholders`.
3. The **open questions** from file 08 section 6 (especially H14's city, Parahyangan room count and Small-room amenities, H14 car-parking period).
4. A reminder that colors and fonts are **estimates from screenshots** and where to correct them (`src/styles/tokens.css`).
5. Steps to connect the domain.
