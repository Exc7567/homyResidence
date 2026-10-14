# 02. Design System

> **Important honesty note for the implementing agent.**
> The exact hex codes and font files of Rukita, ERA and Johan were **not available as source code**; they were read from screenshots and page text. Exactly **one color is verified** (Rukita's published `theme-color` meta tag: `#E7E1D1`). Everything else below is a **close estimate from screenshots**.
> Therefore: implement **every** color, font and size as a CSS variable in a single file `src/styles/tokens.css`. The owner can correct any value there and the whole site updates. Do **not** hard-code colors or sizes anywhere else.

---

## 1. Which reference supplies which element

| Element | Reference | What to copy |
|---|---|---|
| Overall look, white page, deep-green primary buttons, sand panels, rounded corners | **Rukita** | Colors, radius, spacing, button style |
| Property detail page structure and behavior | **Rukita** | Every section (file 05) |
| Mobile detail top bar (dark green, back arrow, title pill, share) and scrollable tab bar with underline | **Rukita (mobile screenshots)** | Layout and colors |
| Mobile sticky bottom bar (price + two buttons) | **Rukita (mobile screenshot)** | Layout |
| Homepage hero (big headline, subtext, single button) | **Johan Property** | Layout and hierarchy, not the copy |
| Featured card grid and "benefits + map" block rhythm | **Johan Property** | Rhythm and whitespace |
| Footer (brand blurb, link columns, contact, social) | **Johan Property** | Columns |
| Listing card anatomy: badges on image, green WhatsApp button, icon stat row, soft shadow card | **ERA Indonesia** | Card details |
| Price emphasis color (warm red) | **Rukita + ERA** | Price text |

---

## 2. Color tokens

Define in `:root` inside `src/styles/tokens.css`.

```css
:root {
  /* Surfaces */
  --color-bg: #FFFFFF;
  --color-sand: #E7E1D1;          /* VERIFIED: Rukita theme-color meta. Use for borders on warm panels, hero bg tint */
  --color-sand-soft: #F6F3EA;     /* estimated: info panels (address card, "Dikelola oleh" light variants) */
  --color-surface-muted: #F4F4F2; /* estimated: skeletons, placeholder image bg */

  /* Brand */
  --color-primary: #15352F;       /* estimated: Rukita deep green. Primary buttons, mobile top bar, managed banner */
  --color-primary-hover: #0F2823;
  --color-primary-contrast: #FFFFFF;
  --color-gold: #C9A55C;          /* estimated: small label text on dark green banner ("Dikelola oleh Homy") */

  /* Accents */
  --color-teal: #0F8F89;          /* estimated: map pin, outline tag text, active small accents */
  --color-teal-soft: #E1F3F1;     /* estimated: "Unggulan" / unique-facility highlight chip background */
  --color-price: #E0412F;         /* estimated: price emphasis (Rukita and ERA both use warm red/orange) */
  --color-whatsapp: #1F9D55;      /* estimated: ERA green WhatsApp button */
  --color-whatsapp-hover: #178046;

  /* Text */
  --color-text: #1C1C1C;
  --color-text-muted: #6B6B6B;
  --color-text-subtle: #9A9A9A;

  /* Lines */
  --color-border: #E5E2DA;
  --color-border-strong: #CFCBC0;

  /* States */
  --color-disabled-bg: #ECECEC;
  --color-disabled-text: #8A8A8A;
  --color-overlay: rgba(0, 0, 0, 0.55);
  --color-placeholder-flag: #F59E0B; /* dev-only amber outline for placeholders */
}
```

### Usage rules
- **Primary green** = the only fill color for main actions that are not WhatsApp, the mobile detail header bar, the "Lihat Tipe Kamar" button, and the "Dikelola oleh Homy" banner.
- **WhatsApp green** = every button that opens WhatsApp, always with the WhatsApp icon on the left.
- **Price** is the only place the warm red is used for text.
- **Teal soft** chips = unique/highlight facilities. Never use it for anything else (so highlights stay recognizable).
- Contrast: all text/background pairs must meet WCAG AA (4.5:1 for body text). If an estimated color fails, darken it.

---

## 3. Typography

**Family:** `Inter` from Google Fonts (weights 400, 500, 600, 700). It is the closest match to Rukita's clean geometric sans. Fallback stack:
`font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;`

Load with `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` and `display=swap`. Define the family in a token so the owner can swap it:

```css
:root { --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
```

### Type scale (mobile → desktop)

| Token | Mobile | Desktop ≥1024 | Weight | Line-height | Used for |
|---|---|---|---|---|---|
| `--fs-display` | 32px | 56px | 700 | 1.1 | Homepage hero headline |
| `--fs-h1` | 24px | 32px | 700 | 1.25 | Detail page property name |
| `--fs-h2` | 20px | 24px | 700 | 1.3 | Section titles ("Fasilitas bersama", "Lokasi", "Kamar") |
| `--fs-h3` | 18px | 20px | 600 | 1.35 | Card titles, room type names |
| `--fs-body` | 16px | 16px | 400 | 1.55 | Body text |
| `--fs-small` | 14px | 14px | 400/500 | 1.5 | Meta, chips, captions, disclaimers |
| `--fs-xs` | 12px | 12px | 500 | 1.4 | Badges, tiny labels |
| `--fs-price` | 22px | 24px | 700 | 1.2 | Price numbers (cards use 20px) |

Rules: body text is never below 14px. Inputs/buttons are 16px (prevents iOS zoom). Use `font-variant-numeric: tabular-nums` on prices and distances.

---

## 4. Spacing, layout, radii, shadows

```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px;
  --space-12: 48px; --space-16: 64px; --space-20: 80px;

  --radius-sm: 8px;    /* chips, inputs */
  --radius-md: 12px;   /* buttons, small cards */
  --radius-lg: 16px;   /* property cards, panels, gallery */
  --radius-xl: 24px;   /* bottom sheet top corners */
  --radius-pill: 999px;

  --shadow-card: 0 2px 12px rgba(0,0,0,0.08);          /* ERA-style soft card */
  --shadow-card-hover: 0 8px 24px rgba(0,0,0,0.12);
  --shadow-sticky: 0 -4px 16px rgba(0,0,0,0.10);       /* mobile bottom bar */
  --shadow-header: 0 2px 8px rgba(0,0,0,0.06);

  --container-max: 1200px;
  --gutter: 16px; /* 24px ≥768, 32px ≥1024 */
  --header-h: 64px;      /* desktop site header */
  --mobile-topbar-h: 64px;
  --tabbar-h: 48px;
}
```

- Page container: `max-width: var(--container-max); margin-inline: auto; padding-inline: var(--gutter);`
- Section vertical rhythm: 40px (mobile) / 64px (desktop) between sections. Section title → content gap: 16px.
- Cards: white bg, `--radius-lg`, `--shadow-card`, 1px `--color-border` optional. Hover (desktop only): shadow-card-hover and `translateY(-2px)`.

### Breakpoints (mobile first, `min-width`)
| Name | Width | Notes |
|---|---|---|
| base | 0–639 | Design target 360–430 px |
| `sm` | 640 | Cards 2 columns begin at 640 |
| `md` | 768 | Gutter 24px; detail page still single column |
| `lg` | 1024 | Detail page becomes 2 columns with sticky price card; cards 3 columns; desktop header |
| `xl` | 1280 | Container reaches max width |

Never allow horizontal page scroll at any width from 320 px up. Test at 320, 360, 390, 412, 768, 1024, 1280, 1440.

---

## 5. Buttons

All buttons: min-height **48px** on mobile (44px minimum tap area), font 16px/600, `--radius-md`, horizontal padding 20px, icon 20px with 8px gap, transition 150ms, focus-visible ring `2px solid var(--color-teal)` + 2px offset.

| Variant | Class | Style | Use |
|---|---|---|---|
| Primary | `.btn-primary` | bg `--color-primary`, text white; hover `--color-primary-hover` | "Lihat Tipe Kamar", "Lihat Detail" on detail cards |
| WhatsApp | `.btn-wa` | bg `--color-whatsapp`, text white, WhatsApp icon left | **Every "Book Now"** and "Jadwalkan Visit" |
| Outline | `.btn-outline` | transparent, 1px `--color-border-strong`, text `--color-text`; hover bg `--color-sand-soft` | "Lihat Detail" on homepage cards, "Buka di Maps" |
| Ghost / link | `.btn-link` | text only, underline on hover, `--color-text` | "Lihat Selengkapnya" (underlined by default like Rukita) |
| Icon button | `.btn-icon` | 44×44 circle, white bg, subtle shadow | Carousel arrows, share, close |
| Disabled | `[disabled]` | bg `--color-disabled-bg`, text `--color-disabled-text`, no hover | Not used for the villa card (it has no button at all) |

Do not use gradients on buttons.

---

## 6. Icons

- Library: **lucide-react**, stroke width 1.75, default size 20px (24px for large feature icons).
- WhatsApp icon: custom inline SVG component `<WhatsAppIcon />` (monochrome, `currentColor`).
- Facility icon mapping (defined in file 03 as `icon` field): AC → `AirVent`, WiFi → `Wifi`, Fully furnished → `Sofa`, Kamar mandi dalam → `ShowerHead`, Kamar mandi luar → `DoorOpen`, Water heater → `Flame`, Free laundry → `Shirt`, Mesin cuci → `WashingMachine`, Parkir motor/mobil → `ParkingCircle`, Parkir basement → `Car`, Listrik token → `Zap`.
- Meta icons: `MapPin` (location), `BedDouble` (room types), `Sparkles` (highlight), `ChevronLeft/Right` (carousel), `X` (close), `Share2` (share), `Ruler` (room size), `Users`, `Clock`.

---

## 7. Imagery and placeholders

- **All photos are placeholders for now.** Create a `<ImageWithFallback />` / `<Placeholder />` component: if `src` is null/empty/fails to load, render a neutral block (`--color-surface-muted`) with a centered `Image` lucide icon and a small label (e.g. "Foto Tipe Standard") and, in dev mode only, an amber dashed outline (`--color-placeholder-flag`).
- Aspect ratios: property card media **4:3** (16:10 on mobile cards is also acceptable; pick **4:3** and keep it consistent), detail gallery hero **16:10**, room card media **4:3**, POI photo **4:3**, thumbnails **1:1**.
- `object-fit: cover` for photos. Always set `width`/`height` or `aspect-ratio` to avoid layout shift. Use `loading="lazy"` except for the first visible image (`fetchpriority="high"`).
- Real photos will be dropped into `public/images/<slug>/...` by the owner (naming convention in file 08). Ship **no** copyrighted stock or reference-site photos.

---

## 8. Motion

- Durations 150–250ms, easing `cubic-bezier(0.2, 0, 0, 1)`.
- Carousel slide: 250ms transform. Modal: fade 150ms + bottom sheet slide-up 250ms. Hover lift 150ms.
- Respect `@media (prefers-reduced-motion: reduce)`: disable transforms and transitions except opacity.
- No parallax, no auto-playing carousels, no scroll-jacking.

---

## 9. Elevation and z-index scale

| Layer | z-index |
|---|---|
| Page content | 0 |
| Sticky tab bar | 20 |
| Desktop sticky price card | 15 |
| Mobile bottom bar | 30 |
| Site header | 40 |
| Floating WhatsApp button | 35 |
| Modal / lightbox backdrop | 100 |
| Toast | 110 |

---

## 10. Accessibility baseline (applies to every component)

- Semantic landmarks: `header`, `nav`, `main`, `section` (with `aria-labelledby`), `footer`.
- All interactive elements keyboard reachable with visible focus.
- Images have meaningful `alt` text (placeholders: "Foto <label> (placeholder)").
- Color is never the only signal (greyed villa card also has the text "Under Construction").
- `lang="id"` on `<html>`.
