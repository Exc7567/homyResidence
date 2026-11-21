# 04. Homepage Specification (`/`)

Reference: **Johan Property** (hero, card grid rhythm, footer), **ERA Indonesia** (card details), **Rukita** (colors, radii, buttons).
All data from `src/data` (file 03). All copy in Indonesian. Mobile first.

---

## 1. Page structure (top to bottom)

1. Site header (sticky)
2. Hero
3. "Pilih Hunian" property grid (5 cards)
4. "Fasilitas di Semua Hunian" strip
5. Help CTA band
6. Footer
7. Floating WhatsApp button (global, mobile and desktop)

Page `<title>`: `Homy Residence | Kost & Villa` (placeholder-friendly; see file 07). Page `h1`: `BRAND.name` ("Homy Residence") inside the hero.

---

## 2. Site header (`<SiteHeader />`)

**Mobile (<1024):** height 64px, white bg, bottom border 1px `--color-border`, sticky top, z-index 40.
- Left: `<Logo />` (wordmark "Homy" in `--color-primary` 700 + "Residence" 400; later replaceable with image).
- Right: compact WhatsApp button "Book Now" (height 40px, `.btn-wa`, icon + text) .
- No hamburger menu (only anchors would be inside; not needed).

**Desktop (≥1024):** height 72px, container max 1200.
- Left: `<Logo />`.
- Center: nav anchors with smooth scroll: **Properti** (`#properti`), **Fasilitas** (`#fasilitas`), **Kontak** (`#kontak`). Text 15px/500, hover underline in `--color-primary`.
- Right: `.btn-wa` "Book Now".

On scroll > 8px add `--shadow-header`.

On **detail pages** the header is replaced by the Rukita-style mobile top bar (file 05); on desktop the standard header is used.

---

## 3. Hero (Johan layout, Rukita colors)

Purpose: say what this is and send the visitor to the property cards.

**Layout mobile:** padding 32px 16px 40px, bg gradient from `--color-sand-soft` to white (no image required). Left-aligned.
**Layout desktop:** two columns 55/45. Left: text. Right: a large rounded (`--radius-xl`) placeholder image (4:3) from `public/images/brand/hero.jpg` (placeholder until provided).

Content, in order:
- Small eyebrow pill (`--color-sand` bg, `--color-primary` text, 12px/600, uppercase letter-spacing .04em): `KOST & VILLA`
- `h1`: **"Homy Residence"** (`--fs-display`, `--color-primary`)
- Tagline: `BRAND.tagline` (placeholder), 20px/500, `--color-text`
- Subtitle: `BRAND.heroSubtitle` (placeholder), 16px, `--color-text-muted`, max-width 520px
- Buttons row (stack on mobile, inline on desktop): `.btn-primary` **"Lihat Properti"** (scrolls to `#properti`), `.btn-wa` **"Book Now"** (generic WhatsApp message)
- Optional stats row (Johan has "1000+ Premium Property"): **disabled by default.** Implement as `BRAND.heroStats` (undefined = not rendered). Do **not** invent numbers.

---

## 4. Property grid `#properti`

**Section header:** eyebrow `PILIHAN HUNIAN` (12px/600 muted), `h2` **"Pilih Hunian Homy"**, sub text `"Pilih properti, lihat tipe kamar dan fasilitasnya, lalu chat kami via WhatsApp untuk booking."` (16px muted).

**Grid:** 1 column (<640), 2 columns (≥640), 3 columns (≥1024). Gap 20px (mobile) / 24px (desktop). Cards sorted by `order`. With 5 cards, desktop shows 3 + 2; the last row is left-aligned (no centering tricks).

### 4.1 Open property card (`<PropertyCard />`)

Container: white, `--radius-lg`, `--shadow-card`, overflow hidden, display flex column, height 100% (equal-height rows).

**A. Media (carousel)**, aspect ratio 4:3, `<ImageCarousel />` from file 06:
- Images: `property.gallery` (placeholders now, real photos later), first image eager, rest lazy.
- **Next/Previous:** two 40×40 circular `.btn-icon` buttons (white, 90% opacity, chevrons) vertically centered at left and right edges (8px inset), **always visible** on touch and desktop. Swipe left/right on touch. Keyboard: arrow keys when the carousel is focused.
- **Dots:** centered 8px from bottom, max 6 dots, active dot wider (16px) white, inactive 6px 60% white.
- **Counter pill** (bottom-right, e.g. `1/6`), 12px, black 55% bg, white text.
- Clicking/tapping the image (not the arrows) navigates to the detail page.
- Top-left badges (ERA style, 8px inset, gap 6px): **Type badge** `kind` ("Kost"/"Villa") bg `--color-primary` white text; both pill-shaped, 12px/600, height 24px, padding 0 10px.
- Top-right: nothing (keep clean).

**B. Body**, padding 16px, gap 12px:
1. **Name**: `h3` property `name` (20px/700, `--color-text`). Entire name is a link to the detail page.
2. **Location row**: `MapPin` icon (16px, `--color-teal`) + `locationLabel` (14px, muted, 1 line with ellipsis, up to 2 lines allowed on mobile).
3. **Stat row** (ERA icon row): three items in a flex row with 16px gap, 14px/500:
   - `BedDouble` + `"N Tipe Kamar"` (N = `roomTypes.length`)
   - `LayoutGrid` + `"N Fasilitas"` (N per file 03 derived rules)
   - `Wifi` and `AirVent` small icons followed by the text "AC • WiFi"
   Wrap to two lines on narrow widths; never overflow.
4. **Highlights** (up to 2): teal-soft chips (`--color-teal-soft` bg, `--color-teal` text, 13px/600, `Sparkles` 14px, radius pill, padding 6px 10px). Label text from `highlights[].label` where `showOnCard` is true. **Parking highlights must never appear here.**
5. **Divider** 1px `--color-border`.
6. **Price block:** `"Mulai dari"` (12px muted) above **`Rp1.200.000`** (`--color-price`, 22px/700) followed by `" /bulan"` (14px muted). Under it, a 12px muted line: `"Listrik tidak termasuk"`.
7. **Actions** (two equal-width buttons, 8px gap, height 48px):
   - `.btn-outline` **"Lihat Detail"** → `/slug`
   - `.btn-wa` **"Book Now"** → WhatsApp with property-specific prefilled message (file 07). Opens in a new tab.

Hover (desktop): lift and larger shadow. Whole card is not a single anchor (avoid nested interactive elements): the image area, name and "Lihat Detail" are links; "Book Now" is its own link.

### 4.2 Under-construction card (Villa Purnava Permata)

Same outer size and position in the grid as open cards (last in order). Differences, exactly as owner requested ("just grey with under construction, no ribbons, no contact button"):
- Entire card **greyed**: media gets `filter: grayscale(1)` and `opacity: .6`; card bg `#F3F3F3`; text colors `--color-text-subtle`; shadow reduced to `0 1px 4px rgba(0,0,0,.06)`.
- Media shows the single placeholder image (grey). **No carousel arrows, dots or counter.**
- **No type badge ribbon, no corner ribbon.**
- Name (`h3`): `Villa Purnava Permata`, greyed.
- Location row only if `locationLabel` is filled; otherwise omit.
- In place of the price block: plain text **"Under Construction"** (18px/600, `--color-text-subtle`). Nothing else.
- **No buttons at all** ("Lihat Detail", "Book Now" and any "Hubungi" button are all absent).
- **Not clickable:** no link, `cursor: default`, not focusable, `aria-disabled="true"`, `role="group"` with `aria-label="Villa Purnava Permata, Under Construction"`.

---

## 5. "Fasilitas di Semua Hunian" strip `#fasilitas`

Johan "benefits" rhythm: a section with a title and three items with round dark icons.

- `h2` **"Fasilitas di Semua Hunian"**
- Three items in a row (stack on mobile): each has a 56px circle (`--color-primary` bg, white 24px icon) and a title + one-line description:
  1. `AirVent`, **AC**, "Setiap kamar dilengkapi AC."
  2. `Wifi`, **WiFi**, "Internet WiFi tersedia di setiap hunian."
  3. `Zap`, **Listrik Token**, "Listrik tidak termasuk. Setiap kamar memakai token meter sendiri."
- This block replaces the "Beneifts" block of the Johan reference (do **not** copy its typo or lorem ipsum).

---

## 6. Help CTA band

Full-width rounded panel (`--radius-xl`) inside the container, bg `--color-primary`, padding 32px (mobile) / 48px (desktop), white text.
- `h2` white: **"Bingung pilih kamar?"**
- Text (`--color-gold` or white 80%): "Ceritakan kebutuhanmu, tim kami bantu pilihkan tipe kamar yang cocok."
- `.btn-wa` **"Book Now"** (generic message). On desktop the button sits on the right of the text.

---

## 7. Footer `#kontak` (Johan columns, Rukita colors)

Bg `--color-sand-soft`, top border `--color-border`. Container, padding 48px 16px 24px. Columns: 1 (mobile, stacked), 3 (≥768).
- **Col 1: Brand:** `<Logo />`, short blurb `[ISI: 1-2 kalimat tentang Homy]`.
- **Col 2: Properti:** links to `/a7`, `/h14`, `/parahyangan`, `/alamanda`; the villa appears as non-link grey text "Villa Purnava Permata (Under Construction)".
- **Col 3: Kontak:** WhatsApp number (`BRAND.whatsappDisplay`) as a link to the WhatsApp URL, `BRAND.email` and `BRAND.address` placeholders, social icons (Instagram etc.) rendered only for values that are not placeholders in production (in dev show them with amber outline).
- Bottom bar: `© {currentYear} Homy Residence. Seluruh hak cipta dilindungi.` 14px muted, top border.

---

## 8. Floating WhatsApp button (`<FloatingWhatsApp />`)

- 56×56 circle, `--color-whatsapp`, WhatsApp icon white 28px, `--shadow-card-hover`, fixed `right: 16px; bottom: 16px` (add `env(safe-area-inset-bottom)`).
- Opens the generic WhatsApp message.
- Visible on the homepage on all sizes. **Hidden on detail pages on mobile** (they have the sticky bottom bar) and shown on detail pages ≥1024.
- `aria-label="Chat WhatsApp Homy Residence"`.

---

## 9. Behavior and edge cases

- Anchors scroll smoothly with `scroll-margin-top` equal to header height + 8px.
- If JS images fail, placeholders show (never broken-image icons).
- Cards must remain readable with long placeholder text (`[ISI: ...]` lines): clamp location to 2 lines, name to 2 lines.
- No layout shift: reserve media aspect ratio.
- All prices come from `formatRupiah(priceFrom)`.
- The page must score well on mobile Lighthouse (performance ≥ 90) with placeholders; lazy-load below-the-fold media.
