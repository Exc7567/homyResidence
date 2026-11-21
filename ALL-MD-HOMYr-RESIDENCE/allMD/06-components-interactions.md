# 06. Components and Interactions

Behavioral spec for every reusable component. File 04 and 05 say *where* they appear; this file says *how they work*.
All components: plain React function components, JavaScript, plain CSS (CSS modules or one `.css` per component importing tokens). No external carousel/modal libraries; build them (they are small) so behavior is exact and the bundle stays light.

---

## 1. Component inventory

| Component | Used in | Notes |
|---|---|---|
| `SiteHeader`, `SiteFooter`, `Logo`, `FloatingWhatsApp` | all pages | Logo is a single replaceable component |
| `PropertyCard`, `PropertyCardUnderConstruction` | home | file 04 |
| `ImageCarousel` | cards, room cards, mobile gallery | section 2 |
| `GalleryMosaic`, `Lightbox` | detail | section 3 |
| `DetailTopBar`, `SectionTabs`, `StickyActionCard`, `MobileActionBar` | detail | file 05 |
| `FacilityGrid`, `HighlightChip` | detail, cards | |
| `MapEmbed`, `PoiList` | detail | section 6 |
| `RoomTypeCard`, `RoomModal` | detail | section 4 |
| `Accordion` (FAQ), `Expandable` ("Lihat Selengkapnya") | detail | section 5 |
| `WhatsAppButton` | everywhere | wraps `buildWaLink` (file 07) |
| `ImageWithFallback` (a.k.a. Placeholder) | everywhere images appear | file 02 section 7 |
| `Toast` | share/copy | section 7 |
| `ScrollToTop` | router | scroll reset on navigation |

---

## 2. `ImageCarousel`

Props: `images: [{src, alt, label}]`, `aspect = '4/3'`, `onImageClick(index)`, `showCounter = true`, `showDots = true`, `priority = false`, `loop = false`.

**Behavior (the owner's key requirement: "click next to change the pictures"):**
- Renders a horizontal track (`display:flex`, each slide `flex: 0 0 100%`), moved by `transform: translateX(-index * 100%)` with a 250ms transition. Alternatively use CSS scroll-snap; pick **transform-based** for exact control of arrows and dots.
- **Arrows:** `Previous` and `Next` 40×40 circular buttons (white 90%, chevron icon, `aria-label="Foto sebelumnya"` / `"Foto berikutnya"`). Disabled (hidden) at the first/last image unless `loop` is true. Hit area 44×44 via padding. Visible at all times.
- **Swipe:** pointer events (touch): track follows the finger horizontally; release with a threshold of 15% of width (or fast flick) to change slide; vertical movement beyond 10px cancels the horizontal drag so page scrolling still works (`touch-action: pan-y` on the track).
- **Keyboard:** when the carousel container (`tabindex="0"`) is focused, Left/Right change slide.
- **Dots:** one per image up to 6; if more than 6 images show 6 dots mapped proportionally or show only the counter.
- **Counter:** `index+1 / total`.
- **Lazy loading:** only the current, previous and next slides get real `<img>` tags; others render lightweight placeholders until reached.
- **Click:** a click (not drag) on a slide calls `onImageClick(index)`. A drag longer than 5px must **not** trigger click.
- **Single image:** hide arrows, dots and counter.
- **Accessibility:** container `role="region"`, `aria-roledescription="carousel"`, `aria-label="Galeri foto {name}"`; slides `role="group"`, `aria-label="{i} dari {n}"`; live region announces slide changes politely.
- Reduced motion: no transition.

---

## 3. `GalleryMosaic` and `Lightbox`

### GalleryMosaic
Desktop mosaic and mobile carousel as described in file 05 section 4.1. On desktop, tiles are `<button>` elements with `aria-label="Buka foto {n}"`.

### Lightbox
- Opens full-screen over a `--color-overlay` backdrop (black 90% for the lightbox), z-index 100. Locks body scroll (`overflow: hidden`, restore on close, preserve scroll position).
- Top bar: counter `n / total` (left), Close `X` 44×44 (right). Esc closes.
- Center: current image (`object-fit: contain`, max 100% width/height), arrows left/right (hidden on touch, swipe instead), keyboard arrows.
- Bottom (≥768): thumbnail strip, active thumb has a 2px white border.
- Pinch-zoom not required.
- Focus trap; returns focus to the trigger on close.
- With placeholders: shows the placeholder block scaled up with its label, so the flow can be tested.

---

## 4. Rooms: `RoomTypeCard` and `RoomModal`

See file 05 section 7 for content. Interaction details:
- "Lihat Detail" and tapping the room image open `RoomModal` with that room selected; the modal URL does **not** change.
- Modal mount: render in a React portal; `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title.
- Mobile bottom sheet: slides up 250ms; supports drag-down-to-close on the handle (optional) and always has a visible `X`. Max height `90vh`, content scrolls inside; footer with "Book Now" stays pinned at the bottom with safe-area padding.
- Close on Esc, backdrop tap, and `X`. Restore focus to the opener.
- Hide `MobileActionBar` while the modal is open.

---

## 5. `Accordion` (FAQ) and `Expandable`

### Accordion
- Items: `<button aria-expanded aria-controls>` header + panel `<div role="region" aria-labelledby>`.
- Single-open behavior. Chevron rotates 180° (150ms). Panel height animates (or simple show/hide with reduced motion).
- Header text 16px/600, padding 16px 0, divider 1px `--color-border`.

### Expandable ("Lihat Selengkapnya")
- Wraps long text clamped by `line-clamp` to N lines (default 6). Button toggles the clamp and flips the label to **"Lihat Lebih Sedikit"**. Hide the button if the text is not actually clamped (measure with `scrollHeight > clientHeight`).
- Link style: `.btn-link` underlined (Rukita look).

---

## 6. Map and POI interaction

### `MapEmbed`
Props: `map: { embedUrl, openUrl, isPlaceholder }`, `title`.
- Renders `<iframe src={embedUrl} title={`Peta lokasi ${title}`} loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen>` inside a rounded container with `position: relative; overflow: hidden`.
- **Touch devices (`(pointer: coarse)`)**: overlay `div` with `position:absolute; inset:0` catching taps; hint chip bottom-center "Ketuk untuk menggeser peta". On first tap: `setActive(true)` → remove the overlay (iframe receives gestures). Re-enable the overlay when the user taps outside the map container (document `pointerdown` listener) or when the page starts scrolling and the pointer is outside the map.
- **Desktop (`(pointer: fine)`)**: no overlay; scroll-wheel zoom may hijack page scroll, so also use the overlay approach: first click activates (cursor changes to `grab`), mouse leave deactivates after 1s. Either approach is acceptable; **choose the overlay for both** for consistency.
- If `embedUrl` is falsy, render a sand-colored panel: "Peta belum tersedia" and still show the address and "Buka di Maps" if `openUrl` exists.
- `isPlaceholder` chip: see file 05 section 6.1.

### `PoiList` and category tabs
- Tabs are derived from `pois` categories (file 05 section 6.2). Keyboard: Left/Right switch tab; `role="tablist"`.
- Switching tabs filters the list without scroll jump; list animates opacity 150ms.
- Distance formatting helper `formatDistance(d)`: `null` → `"-- km"`; number → `d.toFixed(2).replace(/\.?0+$/, '') + ' km'` (e.g., `0.4 km`, `1.2 km`).

---

## 7. `Toast`

- Used for "Link disalin" (share fallback) and (optionally) "Gagal membuka WhatsApp, salin nomor: +62 813-1165-4066".
- Bottom-center, above the mobile action bar (`bottom: 96px` on detail mobile), dark bg (`--color-text`), white text 14px, radius-pill, auto-dismiss 2.5s, `role="status"`, `aria-live="polite"`.

---

## 8. `SectionTabs` scrollspy (precise implementation notes)

1. Build the list `[{id:'foto', label:'Foto'}, {id:'fasilitas', label:'Fasilitas bersama'}, {id:'lokasi', label:'Lokasi'}, {id:'kamar', label:'Kamar'}, {id:'aturan-tambahan', label:'Aturan Tambahan Penghuni'}, {id:'kebijakan', label:'Kebijakan Hunian'}, {id:'tata-tertib', label:'Tata Tertib'}, {id:'tentang', label:'Tentang Hunian'}]`.
2. One `IntersectionObserver` over the section elements with `rootMargin: '-40% 0px -55% 0px'`; set the active id from the entry that is intersecting (if several, pick the one nearest the top).
3. On tab click: `document.getElementById(id).scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })`; sections have `scroll-margin-top` = topbar + tabbar + 8px (CSS variable).
4. After the active tab changes, ensure the tab is visible inside the horizontally scrollable bar: `tabEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })`.
5. Update the URL hash? **No.** Do not change the URL (keeps shared links clean).
6. Tab bar is `position: sticky` directly under the top bar (mobile) / site header (desktop).

---

## 9. `WhatsAppButton`

Props: `intent: 'general' | 'property' | 'room' | 'visit'`, `property`, `room`, `variant: 'solid' | 'outline'`, `size`, `children`.
- Renders `<a href={buildWaLink(...)} target="_blank" rel="noopener noreferrer">` with the WhatsApp icon (20px) left of the label.
- Never a `<button>` with `window.open` (anchors work better on iOS and for accessibility).
- Default label by intent: general/property/room → **"Book Now"**, visit → **"Jadwalkan Visit"**. Callers may override only where file 04/05 says so ("Hubungi Kami", "Hubungi Tim Kami").
- Add `data-intent` and `data-property` attributes (handy for future analytics).
- Link construction in file 07.

---

## 10. Routing behavior

- `BrowserRouter` with routes from file 01. `ScrollToTop` on pathname change (not on hash).
- Links between pages use `<Link>`; external links use plain `<a target="_blank" rel="noopener noreferrer">`.
- `/villa-purnava` → `<Navigate to="/" replace />`.
- 404 page with a button back to `/`.

---

## 11. Global accessibility and quality checklist for components

- Every icon-only button has `aria-label` (Indonesian).
- Focus-visible ring on all interactive elements.
- No component relies on hover to reveal essential information (arrows are always visible).
- Touch targets ≥ 44×44 px.
- Respect `prefers-reduced-motion`.
- No console errors or warnings in production build.
- Images: width/height or aspect-ratio always set; alt text always present.
