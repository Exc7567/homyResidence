# 05. Property Detail Page Specification (`/:slug`)

**This page is a faithful rebuild of the Rukita property detail page** (`rukita.co/place/rukita-twin-cube-tawakal-tomang`), adapted to Homy's data and rules. Reproduce Rukita's **section order, layout, hierarchy and behavior**. Do **not** copy Rukita's logo, photos, wording specific to Rukita, promo codes, flash sale banners, countdowns, vouchers, discount mechanics, 360 view, "Join Waiting List", or partner/corporate links.

Routes handled: `/a7`, `/h14`, `/parahyangan`, `/alamanda`. Unknown slug or `villa-purnava` → redirect to `/` (villa) or show 404 (others).

All content comes from `getProperty(slug)` plus helpers (file 03). Components contain no property-specific copy.

---

## 1. Section map (Rukita → Homy)

| # | Rukita section | Homy section | Anchor id | Tab label |
|---|---|---|---|---|
| 0 | Breadcrumb | Breadcrumb | n/a | n/a |
| 1 | Photo mosaic / carousel | Gallery | `#foto` | Foto |
| 2 | Title, location, type, "Dikelola oleh" banner | Header block | n/a | n/a |
| 3 | Right sticky price card (desktop) / bottom bar (mobile) | Price & action card | n/a | n/a |
| 4 | Fasilitas bersama | Fasilitas bersama (+ Fasilitas unggulan, parking) | `#fasilitas` | Fasilitas bersama |
| 5 | Lokasi (map, address, POI tabs) | Lokasi (map, address, POI tabs with photos) | `#lokasi` | Lokasi |
| 6 | Visit Hunian | Visit Hunian | within `#lokasi` | n/a |
| 7 | Kamar (room cards) | Kamar (room type cards) | `#kamar` | Kamar |
| 8 | Aturan Tambahan Penghuni | Aturan Tambahan Penghuni | `#aturan-tambahan` | Aturan Tambahan Penghuni |
| 9 | Kebijakan Hunian | Kebijakan Hunian | `#kebijakan` | Kebijakan Hunian |
| 10 | Tata Tertib | Tata Tertib | `#tata-tertib` | Tata Tertib |
| 11 | Tentang Hunian (+ landmark, facilities nearby) | Tentang Hunian | `#tentang` | Tentang Hunian |
| 12 | FAQ accordion | FAQ | `#faq` | n/a |
| 13 | "Hunian Lain Dekat Sini" | "Hunian Homy Lainnya" | n/a | n/a |
| 14 | Footer | Shared site footer (file 04) | n/a | n/a |

Rukita elements **intentionally dropped**: flash sale ribbons and timers, promo-code chips, "-10%" badges and strikethrough prices, "Pelunasan di awal" discounts, "Join Waiting List", "Sedang penuh" (optional status, see 7.5), 360/video badges (video slot optional), "Laporkan", "Cari Kost Lainnya di ..." SEO link lists, date picker "Lihat ketersediaan", favorites (heart).

---

## 2. Page shell and responsive layout

### Mobile (<1024): single column
Order: **Top bar** → **Tab bar** (sticky under it) → Gallery → Header block → sections in order → FAQ → other properties → footer. A **fixed bottom action bar** is shown (section 4.2).

### Desktop (≥1024): two columns inside container (max 1200)
- Row 1: **gallery mosaic** full width.
- Row 2: **left column (flex 1, ~ 66%)** = header block, tab bar, all sections. **Right column (360px, sticky `top: calc(var(--header-h) + var(--tabbar-h) + 16px)`)** = price & action card. Gap 32px.
- Desktop top: standard site header (file 04), then breadcrumb row.

---

## 3. Top bar (mobile) and breadcrumb (desktop)

### 3.1 Mobile top bar (copy of Rukita mobile)
Height 64px, bg `--color-primary`, sticky top (z-index 40), padding 0 16px.
- Left: back button (`ChevronLeft`, white, 44×44) → `navigate(-1)` if history exists within the site, else `/`.
- Center: a white **pill** (radius-pill, height 48px, flex 1, margin 0 12px, padding 0 16px) with two lines: line 1 small muted 12px "Homy Residence", line 2 14px/600 dark: the property `name` (single line, ellipsis).
- Right: **Share** icon button (`Share2`, white, 44×44). Behavior: `navigator.share({ title, text, url })` when available; otherwise copy `window.location.href` to the clipboard and show a toast "Link disalin". (Owner's goal: easily share one property's URL.)

### 3.2 Tab bar (sticky, directly under the top bar)
- Mobile: bg `--color-primary`, height 48px, horizontally scrollable (`overflow-x: auto`, hidden scrollbar, `scroll-snap-type: x proximity`), tab text 16px/600 white 80%, padding 0 16px; **active tab** white 100% with a 3px white underline (radius 2px, 16px below text) exactly like Rukita's mobile screenshot. Tabs: Foto, Fasilitas bersama, Lokasi, Kamar, Aturan Tambahan Penghuni, Kebijakan Hunian, Tata Tertib, Tentang Hunian.
- Desktop: white bg, bottom border `--color-border`, tabs 15px/600 `--color-text-muted`, active `--color-text` with 3px `--color-primary` underline. Sticks below the site header (`top: var(--header-h)`).
- Clicking a tab smooth-scrolls to its section with `scroll-margin-top = topbar + tabbar + 8px`; **scrollspy** (IntersectionObserver, `rootMargin: '-40% 0px -55% 0px'`) updates the active tab and auto-scrolls the tab bar horizontally to keep the active tab visible.
- Include a right-aligned **"Hubungi Tim Kami"** link/button in the desktop tab bar (outline small button with WhatsApp icon) → WhatsApp general-intent message for this property.

### 3.3 Desktop breadcrumb
`Beranda › Homy Residence › {property.name}` (14px muted; last item `--color-text`). `Beranda` links to `/`. Include JSON-LD `BreadcrumbList` in prerendered meta (optional).

---

## 4. Gallery, header block, price card

### 4.1 Gallery (`#foto`)
Source: `property.gallery` (placeholders now).

**Desktop mosaic (Rukita):** grid 4 columns × 2 rows, height 392px (aspect ~ 2.4:1), gap 8px, radius `--radius-lg`, overflow hidden.
- Big image = columns 1-2, rows 1-2 (the first photo).
- Four small images = columns 3-4, rows 1-2.
- The last small tile shows a dark overlay + centered pill **"+N"** with an image icon (N = remaining photos; Rukita shows "+22") and opens the lightbox. If gallery has ≤ 5 photos, no "+N".
- Clicking any tile opens the **Lightbox** (file 06) at that photo.
- A "Homy" logo chip (dark green, top-left, 8px inset) may overlay the big photo like Rukita's logo tag. Use the text `<Logo small />`.

**Mobile:** single image carousel (aspect 4:3, full-bleed, no radius), swipe, counter pill `1/6` bottom-right, dots optional, tap opens Lightbox. Arrows hidden on touch (swipe), visible with mouse.

### 4.2 Header block
Below the gallery (mobile) / in the left column (desktop):
1. `h1` property `name` (`--fs-h1`).
2. Location line: `MapPin` + `locationLabel` (`--color-text-muted`).
3. Type row: small icon `Home` + `kind` ("Kost"), like Rukita's "Coliving" label. Add `· {totalRooms} kamar` after it (e.g. "Kost · 18 kamar").
4. **Highlights row** (unique facilities): all `highlights` with `showOnDetail` as teal-soft chips (file 03 rules). This is where H14's "Parkir basement (motor gratis)" appears (detail only).
5. **"Dikelola oleh Homy" banner** (Rukita's dark managed-by card): full-width rounded (`--radius-lg`) block, background `--color-primary` with a subtle diagonal gold-line decoration (CSS gradient/pseudo-element, optional), padding 20px. Left: `<Logo small light />`, a 1px vertical divider, then a text block: label **"Dikelola oleh Homy"** (`--color-gold`, 14px/600) above `"Hunian nyaman dengan fasilitas lengkap"` placeholder-able text (white 14px). Right: chevron icon (non-interactive, decorative) or omit chevron on Homy (it is not a link).

### 4.3 Price & action card

**Desktop (right column, sticky):** white card, `--radius-lg`, 1px `--color-border`, `--shadow-card`, padding 20px, gap 12px.
- "Mulai dari" (14px muted)
- **`Rp1.700.000`** (`--color-price`, `--fs-price`) + `" /bulan"` (16px muted)
- Muted 12px lines: "Harga per bulan." and "Listrik tidak termasuk (token meter per kamar)."
- Two full-width buttons stacked, in this order:
  1. `.btn-primary` **"Lihat Tipe Kamar"** → smooth-scroll to `#kamar`
  2. `.btn-wa` **"Book Now"** (WhatsApp green, WhatsApp icon) → WhatsApp message for this property
  (Rukita's second button is an outline "Chat Rukita"; Homy uses the owner's required label "Book Now" in WhatsApp green.)
- No discount lines, no vouchers.

**Mobile fixed bottom bar (Rukita mobile screenshot):** `position: fixed; bottom: 0`, white, top radius `--radius-xl`, `--shadow-sticky`, padding 16px 16px calc(16px + env(safe-area-inset-bottom)), z-index 30.
- Row 1: "Mulai dari" (muted 14px) and, below, **price + /bulan** in the price style.
- Row 2: two buttons side by side, equal width, height 52px: left `.btn-wa` **"Book Now"**, right `.btn-primary` **"Lihat Tipe Kamar"** (matches Rukita: left outline "Chat Rukita", right dark "Lihat Tipe Kamar"; Homy puts the green WhatsApp button on the left).
- Add `padding-bottom` to the page equal to the bar height so content is never hidden. Hide the bar while the lightbox or any modal is open.
- Optional: compact the bar (hide row 1) after scrolling past the Kamar section.

---

## 5. Fasilitas bersama `#fasilitas`

Rukita: heading "Fasilitas bersama" then a 2-column (mobile) / 3-column (desktop) grid of icon + label, then an underlined "Lihat Selengkapnya".

Homy:
- `h2` **"Fasilitas bersama"** (we keep Rukita's label; it covers facilities of the building).
- Grid (2 columns mobile, 3 columns ≥768): each item = lucide icon 24px (`--color-text`) + label (16px). Show **first 6** items by default (order: ac, wifi, then the rest in property array order; `electricity_token` last). "Lihat Selengkapnya" (underlined `.btn-link`) expands in place (accordion) or opens a modal listing all; with ≤ 6 items hide the link.
- **Unique facility tag:** items whose id is in `uniqueFacilityIds` get a small teal-soft "Unggulan" tag (12px, with `Sparkles`) next to the label.
- **Electricity row:** item `Listrik Token per Kamar (di luar harga)` always present, with muted sub-text "Tidak termasuk dalam harga sewa".
- Sub-heading **"Fasilitas unggulan"** (only when the property has detail highlights) listing highlight chips again as a vertical list with short descriptions. Keep this compact: chips only, no extra copy.
- Sub-heading **"Parkir"** (**detail page only; this is where parking details live**): row with `ParkingCircle`/`Car` icon, bold `parking.summary` and normal text `parking.detail`. For H14 this explains motor free, car Rp150.000 (period placeholder).
- Fully furnished is listed as the item "Fully Furnished" with no sub-list.

---

## 6. Lokasi `#lokasi`

Rukita: heading "Lokasi", a map card with the address under it, then category tabs and a list of nearby places with distances, then a "Visit Hunian" block.

### 6.1 Map (`<MapEmbed />`)
- Container: rounded `--radius-lg`, 1px `--color-border`, height 280px mobile / 360px desktop.
- Content: Google Maps iframe from `property.map.embedUrl` (keyless embed, draggable and zoomable; see file 07). The embed itself shows its own white info card with "Buka di Maps" like the owner's screenshot; that is native Google UI.
- **Mobile touch handling:** by default overlay an invisible layer with the hint chip "Ketuk untuk menggeser peta"; first tap enables map interaction (`pointer-events: auto`); tapping outside the map or scrolling the page disables it again. This prevents the page from getting "stuck" while scrolling on phones.
- If `map.isPlaceholder` is true, show (dev and prod) a small amber chip over the map: **"Pin sementara"** and in dev add a console warning. Remove the chip automatically when `isPlaceholder` is false.
- Under the map, Rukita's beige address panel: `--color-sand-soft` bg, 1px `--color-border`, `--radius-lg`, padding 16px: `MapPin` teal icon + full `address` (16px) and a `.btn-outline` small **"Buka di Maps"** linking to `map.openUrl` (new tab).

### 6.2 POI (Points of interest) with photos
- **Category tabs** (Rukita: Transportasi Umum | Perkantoran | Universitas | Hospital | Pusat Perbelanjaan & Hiburan): build tabs **dynamically from the categories present in `pois`**. Labels: `universitas` → "Universitas", `pusat-perbelanjaan` → "Pusat Perbelanjaan", `rumah-sakit` → "Rumah Sakit". First tab is "Semua" when there is more than one category (so with ≤ 1 category show no tabs).
- Tab style: text 14-15px/600, active has a 2px bottom border in `--color-text` (Rukita underline style); horizontally scrollable on mobile.
- **POI list** (owner wants a picture for each POI): vertical list on mobile, 2 columns ≥768. Each POI row/card:
  - Photo (4:3 on desktop cards, 72×72 rounded square thumbnail in the list on mobile; placeholder if `photo` is null)
  - Name (16px/600)
  - Category label (12px muted)
  - Distance on the right (Rukita style, right-aligned, `tabular-nums`): `0.4 km` when filled, muted `-- km` placeholder when `distance` is null
- Rows separated by 1px `--color-border`.

### 6.3 Visit Hunian
Rukita block: heading "Visit Hunian", sentence, and an outlined full-width button "Jadwalkan Visit" with a calendar icon.
- `h3` **"Visit Hunian"**
- Text: "Jika kamu ingin melihat hunian secara langsung, kamu bisa menjadwalkan visit ke hunian ini."
- `.btn-wa` (outline-style variant allowed: white bg, green border/text) **"Jadwalkan Visit"** with `CalendarDays` icon → WhatsApp visit-intent message.

---

## 7. Kamar `#kamar`

Rukita lists each room as a card: title, status, size, feature bullets, "Lihat Detail", price block, "Chat" button. Homy lists **one card per room type** (rooms are grouped by type; no room letters).

`h2` **"Kamar"**. Under it a muted line: "Listrik tidak termasuk (token meter per kamar)." Cards sorted ascending by price. Layout: 1 column mobile, 2 columns ≥1024 inside the left column (or full width list; choose 1 column on desktop too if width < 420px per card).

### 7.1 Room type card (`<RoomTypeCard />`)
White card, `--radius-lg`, 1px border, padding 16px, gap 12px.
1. **Media carousel** (4:3, `room.photos`, placeholder), with arrows/dots/counter like the property card (file 06). Tap opens the room modal.
2. **Title row:** `h3` room `name` (e.g. "Superior") and an optional status badge (7.5).
3. **Meta row** (14px muted): `Ruler` + `size` (placeholder `[ISI: ...]`), `Users` + `occupancyNote` (placeholder; Rukita shows "Harga untuk 1 orang").
4. **Feature chips** (Rukita bullet list as chips): from `room.facilityIds` → lucide icon + label, wrap. Minimum shown: bathroom (in/out), AC, WiFi, Water Heater where present, Fully Furnished, Free Laundry. **Do not itemize furniture.**
5. **Included note** (14px): `"Termasuk: WiFi{, free laundry}"` (laundry only if `laundry_free` in the room's facility ids) and `"Tidak termasuk: listrik (token meter per kamar)"` in muted text. For Alamanda also: "Mesin cuci tersedia di lantai 4".
6. **Price row:** large `--color-price` **`Rp1.700.000`** + ` /bulan` (muted). No strikethrough, no discount chips.
7. **Deposit disclaimer** (12px muted): from `NOTES.depositTemplate`.
8. **Buttons** (stacked on mobile, side by side ≥640): `.btn-outline` **"Lihat Detail"** (opens modal 7.2), `.btn-wa` **"Book Now"** (WhatsApp room-intent message including room type and price).

### 7.2 Room detail modal
Mobile: full-height bottom sheet (top radius `--radius-xl`, slides up, drag handle, close `X`). Desktop: centered dialog 720px max, radius `--radius-lg`.
Content: carousel (larger), room name, price, size/occupancy placeholders, full facility list (icon + label grid), the included / not included notes, deposit disclaimer, sticky footer with `.btn-wa` **"Book Now"**. Trap focus, close on Esc and backdrop click, restore scroll position.

### 7.3 Do not show
- Number of rooms/units per type, room letters/names ("Fanta" etc.), availability counts.

### 7.4 Under 'Kamar' footer note
One line: "Booking dan ketersediaan kamar dikonfirmasi melalui WhatsApp."

### 7.5 Optional availability status (off by default)
Rukita shows "Tersedia" / "Sedang penuh". Support an optional `room.status` (`'available' | 'full'`). If undefined, **render nothing.** If `'full'`, show a grey badge "Sedang penuh" and change the WhatsApp text to ask about the waiting list. The owner will not fill this initially.

---

## 8. Aturan Tambahan Penghuni `#aturan-tambahan`
Rukita: heading + a sentence ("Tambahan penghuni di hunian ini tidak diperbolehkan") + "Untuk permintaan khusus, Hubungi Tim Kami".
Homy: `h3` **"Aturan Tambahan Penghuni"**, text = `houseInfo.additionalOccupants` (placeholder), then "Untuk permintaan khusus, " + link **"Hubungi Tim Kami"** (WhatsApp, property general message).

## 9. Kebijakan Hunian `#kebijakan`
Rukita renders a definition-style list with titles (Check-in/out, Deposit, Informasi pembatalan) and a "Lihat selengkapnya" link.
Homy: `h3` **"Kebijakan Hunian"**, a vertical list, each item = bold title (16px/600) + text (16px) with 1px dividers:
1. **Masa sewa:** `houseInfo.minimumStay` + "Harga hanya per bulan." (monthly only)
2. **Check-in/out:** `houseInfo.checkInOut`
3. **Deposit:** `NOTES.depositTemplate(rupiah(deposit))` ← this is the deposit "disclaimer" the owner requested
4. **Informasi pembatalan:** `houseInfo.cancellation`
5. **Listrik:** "Listrik tidak termasuk. Setiap kamar memakai token meter."
If longer than ~5 lines, collapse with "Lihat selengkapnya" (underlined).

## 10. Tata Tertib `#tata-tertib`
Rukita: titled blocks separated by `---` lines: Akses 24 jam, Aturan Menginap, Aturan Bertamu, Extra House Rules, Tidak diperbolehkan merokok.
Homy: `h3` **"Tata Tertib"**, blocks separated by 1px dividers; each block has a bold title and text:
- **Penghuni:** `houseInfo.occupantPolicy` (putra / putri / campur)
- **Akses 24 jam:** `houseInfo.access24h`
- **Aturan Menginap:** `houseInfo.overnightGuests`
- **Aturan Bertamu:** `houseInfo.visitors`
- **Merokok:** `houseInfo.smoking`
- **Hewan Peliharaan:** `houseInfo.pets`
- **Aturan Tambahan:** `houseInfo.extraRules` (omit block entirely if the value is empty)
All values are placeholders until the owner confirms (file 08 explains what to write).

## 11. Tentang Hunian `#tentang`
Rukita: heading "Tentang {name}", long SEO paragraphs, "Landmark dan akses transportasi terdekat" lists, "Fasilitas di sekitar" lists, article links, "Lihat Selengkapnya".
Homy: `h3` **"Tentang {name}"**, then `property.description` (3-4 paragraphs, placeholder with a writing template in file 08), then a **"Landmark terdekat"** list built from `pois` as `📍`-style rows using the `MapPin` icon: `{name}` + `({distance} km)` or `--`. Collapse long text to ~6 lines with "Lihat Selengkapnya". No article links.

## 12. FAQ `#faq`
Rukita: heading "Pertanyaan yang sering ditanyakan di {name}", accordion of questions.
Homy: `h3` **"Pertanyaan yang sering ditanyakan di {name}"**, accordion built from `buildFaq(property, helpers)` (file 03). One panel open at a time; `+`/`-` or chevron icon on the right; 1px dividers; `aria-expanded`. Below it: text "Masih punya pertanyaan?" + `.btn-wa` **"Hubungi Kami"** (outline allowed) → general message. (Here "Hubungi Kami" is allowed; the "no contact button" rule applies only to the Villa card.)

## 13. Hunian Homy Lainnya
Rukita's "Hunian Lain Dekat Sini": a horizontal carousel of compact cards.
Homy: `h2` **"Hunian Homy Lainnya"**: horizontally scrollable row (scroll-snap) of compact cards for the **other open properties** (exclude the current one; exclude the villa). Compact card: 4:3 photo (first gallery image), name, location label, "Mulai dari Rp... /bulan"; whole card links to `/slug`. Card width 260px mobile / 300px desktop. **Parking info must not appear.**

---

## 14. Page-level states and rules

- **Loading:** data is static, so no loading state; show skeleton only for lazy images.
- **Not found:** unknown slug → 404 page (title "Halaman tidak ditemukan", button "Kembali ke Beranda").
- **Document title** per route: `{name} | Homy Residence` (also prerendered, file 07).
- **Scroll restoration:** on route change scroll to top; on back navigation restore the previous position.
- **Bottom bar overlap:** content gets bottom padding on mobile; the floating WhatsApp button is hidden on mobile detail pages.
- **Performance:** hero gallery image eager, everything else lazy; room modal content mounts only when opened.
- **Accessibility:** tabs use `role="tablist"`/`tab` + `aria-controls` or simple anchor links with `aria-current="true"` on the active one; accordion and dialogs follow WAI-ARIA patterns (file 06).
