# Fonts and layout BEFORE Update 03 (rollback record)

> Recorded on 2026-10-16, **before any Update 03 change**, from the running site (computed styles read in Chrome at 1440 px and 390 px) and from the source CSS. Code state at that moment = git commit `8c2815f` (working tree identical for `src/`, `index.html`, `public/`).
>
> **Purpose:** Update 03 switches the whole site to **Josefin Sans** as an experiment. If the owner does not like it, this file lets the original font setup be restored exactly.
> **Rollback scope = only the Josefin Sans switch.** Everything else from Update 03 (Nura logo, new hero, no footer, addresses, Kost Putri / Kost Campur labels) stays. See "How to roll back" at the end.
>
> This file lives in the project root and is not deployed (Vite only publishes `public/` and the build).

Screenshots (in `update-md/update-03-refs/`):
- `home.png`, `footer.png`: owner's screenshots of the old homepage hero and footer (desktop).
- `before-home-desktop-hero.png`, `before-home-mobile-hero.png`, `before-footer-desktop.png`, `before-footer-mobile.png`: captured from the running site just before the change (dev mode, so placeholders have an amber dashed outline and placeholder social icons are visible; production hides the placeholder social icons).
- `home_references.png`: the owner's reference for the new hero.

---

## 1. Font family, loading and fallback

**Only one family was used on the whole site: Inter** (Google Fonts), weights **400, 500, 600, 700**, all **normal (no italic)**. No self-hosted font files existed.

Loading, in `index.html` `<head>` (exact lines):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Font token, in `src/styles/tokens.css` (exact line):

```css
--font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

Base text, in `src/styles/base.css` `@layer base`:

```css
body {
  font-family: var(--font-sans);
  font-size: var(--fs-body);   /* 16px */
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
h1 { font-size: var(--fs-h1); font-weight: 700; line-height: 1.25; }
h2 { font-size: var(--fs-h2); font-weight: 700; line-height: 1.3; }
h3 { font-size: var(--fs-h3); font-weight: 600; line-height: 1.35; }
button { font: inherit; }
```

No component set its own `font-family`; everything inherited `--font-sans`. No Tailwind font utilities (`font-*`, `text-*`, `tracking-*`, `leading-*`) were used in components.

Numbers: `.tabular`, `.price` and a few pills used `font-variant-numeric: tabular-nums` (Inter supports it).

## 2. Type scale tokens (`src/styles/tokens.css`)

| Token | Mobile (< 1024 px) | Desktop (≥ 1024 px) |
|---|---|---|
| `--fs-display` | 32px | 56px |
| `--fs-h1` | 24px | 32px |
| `--fs-h2` | 20px | 24px |
| `--fs-h3` | 18px | 20px |
| `--fs-body` | 16px | 16px |
| `--fs-small` | 14px | 14px |
| `--fs-xs` | 12px | 12px |
| `--fs-price` | 22px | 24px |
| `--fs-price-card` | 20px | 20px |

Shared text utilities (`base.css`): `.small` 14px / line-height 1.5 · `.xs` 12px / 1.4 · `.eyebrow` 12px / 600 / letter-spacing 0.04em / uppercase · `.btn` 16px / 600 / line-height 1.2 · `.btn-sm` 15px · `.btn-link` 600 · `.chip-highlight` 13px / 600 / 1.3 · `.badge` 12px / 600 · `.tag-unggulan` 12px / 600 · `.price` var(--fs-price) / 700 / 1.2 / tabular-nums · `.price-suffix` 14px / 400.

## 3. Fonts per section and component

All rows: family **Inter**, style **normal**. "lh" = computed line-height, "ls" = letter-spacing ("normal" when not set). Desktop values at 1440 px; mobile in brackets when different.

### Header (all pages)
| Element | Weight | Size | lh | ls | Notes |
|---|---|---|---|---|---|
| Logo "Homy" (`.logo__mark`) | 700 | 22px | 22px (1) | -0.02em (-0.44px) | color primary green |
| Logo "Residence" (`.logo__sub`) | 400 | 22px | 22px | normal | color text; 5px gap, baseline-aligned |
| Nav link Properti / Fasilitas / Kontak (`.site-header__link`, ≥1024 only) | 500 | 15px | 23.25px | normal | underline grows on hover |
| Book Now (`.site-header__cta`, `.btn-sm`, ≥1024 only) | 600 | 15px | 18px | normal | WhatsApp green |

### Homepage hero (old)
| Element | Weight | Size | lh | ls | Notes |
|---|---|---|---|---|---|
| Eyebrow "KOST & VILLA" (`.hero__eyebrow`) | 600 | 12px | 18.6px | 0.04em (0.48px) | uppercase, sand pill |
| h1 "Homy Residence" (`.hero__title`) | 700 | 56px [32px] | 1.1 | -0.02em | color primary green |
| Tagline (`.hero__tagline`) | 500 | 20px | 31px | normal | |
| Subtitle (`.hero__subtitle`) | 400 | 16px | 24.8px | normal | muted, max-width 520px |
| Button "Lihat Properti" (`.hero__btn`) | 600 | 16px | 19.2px | normal | dark green, arrow-down icon |
| Photo placeholder label | 500 | 12px | 18.6px | normal | |

### Property grid and cards (homepage)
| Element | Weight | Size | lh | ls | Notes |
|---|---|---|---|---|---|
| Section eyebrow "PILIHAN HUNIAN" (`.eyebrow`) | 600 | 12px | 18.6px | 0.48px | uppercase, muted |
| Section h2 "Pilih Hunian Homy" | 700 | 24px [20px] | 1.3 | normal | |
| Section intro (`.muted`) | 400 | 16px | 24.8px | normal | |
| Kind badge "Kost" / "Villa" (`.badge`) | 600 | 12px | 18.6px | normal | |
| Card name h3 (`.property-card__name`) | 700 | 20px | 26px | normal | 2-line clamp |
| Location line | 400 | 14px | 21.7px | normal | muted |
| Nearest campus line | 500 | 14px | 21.7px | normal | |
| Campus time pill "🏍️ ~N min" | 600 | 14px | 21.7px | normal | tabular-nums |
| Highlight chip | 600 | 13px | 16.9px | normal | |
| "Mulai dari" (`.xs`) | 400 | 12px | 16.8px | normal | muted |
| Price (`.price.property-card__price-num`) | 700 | 20px | 24px | normal | red, tabular-nums |
| "/bulan" (`.price-suffix`) | 400 | 14px | 21.7px | normal | |
| Buttons "Lihat Detail" / "Book Now" | 600 | 16px | 19.2px | normal | |
| Carousel counter "1/6" | 500 | 12px | 18.6px | normal | tabular-nums |
| Image placeholder label | 500 | 12px | 18.6px | normal | |
| Under-construction name | 700 | 20px | 26px | normal | subtle grey |
| "Under Construction" label | 600 | 18px | 27.9px | normal | |

### "Fasilitas di Semua Hunian" strip and "Bingung pilih kamar?" help band
| Element | Weight | Size | lh | ls |
|---|---|---|---|---|
| Strip h2 | 700 | 24px [20px] | 1.3 | normal |
| Strip item h3 (AC / WiFi / Listrik Token) | 600 | 20px [18px] | 1.35 | normal |
| Strip item text | 400 | 16px | 24.8px | normal |
| Help band h2 | 700 | 24px [20px] | 1.3 | normal |
| Help band text | 400 | 16px | 24.8px | normal |
| Help band button "Book Now" | 600 | 16px | 19.2px | normal |

### Footer (old, all pages)
| Element | Weight | Size | lh | ls |
|---|---|---|---|---|
| Logo "Homy" / "Residence" | 700 / 400 | 22px | 22px | -0.44px / normal |
| Blurb | 400 | 16px | 24.8px | normal |
| Column title "Properti" / "Kontak" (h2) | 700 | 16px | 20.8px | normal |
| Property links, contact rows | 400 | 16px | 24.8px | normal |
| Disabled villa row | 400 | 16px | 24.8px | normal |
| Copyright line | 400 | 14px | 21.7px | normal |

### Property detail page
| Element | Weight | Size | lh | ls | Notes |
|---|---|---|---|---|---|
| Mobile top bar brand (`.detail-topbar__brand`) | 600 → 400 when the name shows | 14px → 12px | 1.3 | normal | |
| Mobile top bar property name | 600 | 14px | 1.3 | normal | ellipsis |
| Section tabs, mobile (green bar) | 600 | 16px | 24.8px | normal | |
| Section tabs, desktop | 600 | 15px | 23.25px | normal | |
| Breadcrumb | 400 | 14px | 21.7px | normal | |
| Gallery logo overlay (`Logo small light`) | 700 / 400 | 16px | 16px | -0.32px / normal | gold "Homy", white "Residence" |
| Gallery "+N" pill | 600 | 16px | 24.8px | normal | |
| Property h1 (`.header-block__title`) | 700 | 32px [24px] | 1.25 | normal | |
| Location line under h1 | 400 | 16px | 24.8px | normal | muted |
| Section h2 (Fasilitas, Kamar, Lokasi, Tata Tertib, FAQ, Hunian Homy Lainnya) | 700 | 24px [20px] | 1.3 | normal | |
| Sub-titles h3 (Point of Interest, Visit Hunian) | 600 | 20px [18px] | 1.35 | normal | |
| Facility label | 400 | 16px | 24.8px | normal | |
| Facility sub-line | 400 | 14px | 21.7px | normal | muted |
| "Unggulan" tag | 600 | 12px | 18.6px | normal | |
| "Total N kamar" pill | 600 | 14px | 21.7px | normal | |
| Room name h3 | 600 | 20px [18px] | 1.35 | normal | |
| Room count badge | 600 | 12px | 18.6px | normal | |
| Room letters line | 500 | 16px | 24.8px | normal | |
| Room meta (size / occupancy) | 400 | 14px | 21.7px | normal | muted |
| Room feature chip (Parahyangan) | 400 | 14px | 1.55 | normal | |
| Room price | 700 | 24px [22px] | 1.2 | normal | red, tabular-nums |
| Room Book Now | 600 | 16px | 19.2px | normal | |
| Map hint pill | 500 | 14px | 21.7px | normal | |
| Address text | 400 | 16px | 24.8px | normal | |
| "Buka di Maps" (`.btn-sm`) | 600 | 15px | 18px | normal | |
| POI category tabs | 600 | 15px | 23.25px | normal | |
| POI category label | 600 | 12px | 18.6px | 0.02em | uppercase |
| POI name | 600 | 16px | 1.35 | normal | |
| POI time pill | 600 | 14px | 21.7px | normal | tabular-nums |
| POI "Rute" link | 600 | 14px | 21.7px | normal | underlined |
| Visit button "Jadwalkan Visit" | 600 | 16px | 19.2px | normal | |
| Tata Tertib group titles (TENTANG HUNIAN, PENGHUNI, SEWA, ATURAN HARIAN) | 700 | 14px | 1.35 | 0.04em | uppercase, muted |
| "Tentang Hunian" text | 400 | 16px | 24.8px | normal | |
| Info list title (dt) | 600 | 16px | 24.8px | normal | |
| Info list text (dd) | 400 | 16px | 24.8px | normal | muted |
| FAQ question | 600 | 16px | 24.8px | normal | |
| FAQ answer | 400 | 16px | 24.8px | normal | muted |
| Desktop price card "Mulai dari" (`.small`) | 400 | 14px | 21px | normal | |
| Desktop price card price | 700 | 24px | 28.8px | normal | tabular-nums |
| Desktop price card "/bulan" | 400 | 16px | 24.8px | normal | |
| Price card / mobile bar buttons | 600 | 16px | 19.2px | normal | |
| Mobile bottom bar price | 700 | 22px | 26.4px | normal | tabular-nums |
| Mini card name (Hunian Homy Lainnya) | 700 | 16px | 24.8px | normal | |
| Mini card location | 400 | 14px | 21.7px | normal | |
| Mini card price | 700 | 18px | 21.6px | normal | tabular-nums |

### Overlays, misc and 404
| Element | Weight | Size | lh | ls | Notes |
|---|---|---|---|---|---|
| Lightbox counter "1 / 6" | 500 | 14px | 1.55 | normal | tabular-nums |
| Toast ("Link disalin") | 400 | 14px | 1.55 | normal | |
| Floating WhatsApp button | (icon only) | | | | |
| 404 big "404" | 700 | 96px | 96px | -0.04em | sand color |
| 404 h1 | 700 | 32px [24px] | 1.25 | normal | |
| 404 text | 400 | 16px | 24.8px | normal | |
| 404 button | 600 | 16px | 19.2px | normal | |

---

## 4. The old homepage hero (replaced by Update 03)

Reference: `update-md/update-03-refs/home.png` (desktop) and `before-home-mobile-hero.png`.

**Structure** (`src/components/home/Hero.jsx`, commit `8c2815f`):
- `<section class="hero">` with two decorative blurred blobs (`.hero__blob--a` sand, top right; `.hero__blob--b` teal-soft, bottom left; both `animate-float`).
- `.container.hero__inner`: a grid, **two columns on desktop** (55fr text / 45fr photo, gap 48px), one column on mobile.
- Left column `.hero__text` (left-aligned, gap 16px): eyebrow pill **"KOST & VILLA"** → h1 **"Homy Residence"** (`BRAND.name`) → tagline placeholder (`BRAND.tagline`) → long subtitle placeholder paragraph (`BRAND.heroSubtitle`) → dark green button **"Lihat Properti"** with an arrow-down icon (link to `#properti`, full width on mobile < 640 px) → optional stats row (`BRAND.heroStats`, unused).
- Right column `.hero__media` (desktop only): one big 4:3 photo card (`BRAND.heroImage`, placeholder "Foto Hero Homy Residence"), radius 24px, soft shadow, with a sand-colored offset block behind it (24px down/right).

**Key styles** (`src/styles/home.css`): background `linear-gradient(180deg, sand-soft → white)`; padding 32px/40px mobile, 64px/80px desktop; h1 56px/700/-0.02em primary green (32px mobile); tagline 20px/500; subtitle 16px muted max 520px; entrance animations `animate-fade-up` staggered 0–320ms.

## 5. The old footer (removed by Update 03)

Reference: `update-md/update-03-refs/footer.png` (desktop) and `before-footer-mobile.png`.

**Structure** (`src/components/layout/SiteFooter.jsx`, commit `8c2815f`), rendered on the homepage, every property page and the 404 page:
- `<footer id="kontak" class="site-footer">` (the header's "Kontak" link pointed to this `#kontak` anchor).
- Three columns (desktop grid `1.3fr 1fr 1fr`; stacked on mobile):
  1. Logo + blurb placeholder (`BRAND.blurb`).
  2. **"Properti"**: a link per open property (sorted by `order`) and the villa as a grey "Villa Purnava Permata (Under Construction)" row.
  3. **"Kontak"**: WhatsApp link with `BRAND.whatsappDisplay` (+62 813-1165-4066), email placeholder (`BRAND.email`), office address placeholder (`BRAND.address`), social icon buttons (`BRAND.social`: Instagram, TikTok, Facebook; placeholders shown in dev only).
- Bottom line: "© {year} Homy Residence. Seluruh hak cipta dilindungi." above a 1px border.

**Key styles:** background `--color-sand-soft` (#F6F3EA), top border `--color-border`, padding 48px top / 24px bottom; column titles 16px/700; links 16px/400, min-height 44px, hover → primary green + 3px slide; copyright 14px muted.

---

## 6. How to roll back (Josefin Sans → Inter)

Written after the change, so it matches the Update 03 code exactly. It restores every font value in sections 1 to 3 above. **Keep** everything Nura-related (`--font-logo`, `--fs-logo`, `--fs-logo-small`, `--fs-hero`, the two Nura `@font-face` blocks, the two Nura preload lines): the Nura logo stays either way. The new hero, the removed footer, the addresses and the kost type labels are not part of the rollback.

**Rollback recipe**

1. **`index.html`**: delete the two Josefin preload lines (`JosefinSans-Regular.woff2`, `JosefinSans-SemiBold.woff2`) and put the three Inter lines from section 1 back (preconnect ×2 + the Google Fonts stylesheet), right under the Nura preloads.
2. **`src/styles/fonts.css`**: delete the five `font-family: 'Josefin Sans'` `@font-face` blocks (keep the two `'Nura'` blocks). Delete `public/fonts/JosefinSans-*.woff2`.
3. **`src/styles/tokens.css`**, in `:root`, set these values (everything not listed stays):

   ```css
   --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
   --font-logo: 'Nura', system-ui, sans-serif;
   --fs-h1: 24px;
   --fs-h2: 20px;
   --fs-h3: 18px;
   --fs-body: 16px;
   --fs-small: 14px;
   --fs-xs: 12px;
   --fs-btn: 16px;
   --fs-btn-sm: 15px;
   --fs-chip: 13px;
   --fs-tab: 16px;
   --fs-tab-sm: 15px;
   --fs-card-title: 20px;
   --ls-label: 0.04em;
   ```

   and in the `@media (min-width: 1024px)` block: `--fs-h1: 32px; --fs-h2: 24px; --fs-h3: 20px;` (`--fs-price` 22px/24px and `--fs-price-card` 20px never changed).
4. **`src/styles/detail.css`**: `.poi__cat` → `letter-spacing: 0.02em;` (it was the only uppercase label with 0.02em instead of 0.04em).
5. **`src/styles/base.css`**: delete the `.rp-cur` rule (the smaller "Rp" was only needed because Josefin's "1" looks like "l"). The `<Rupiah>` component can stay; without that rule it renders exactly like the old `formatRupiah` text.
6. **`src/styles/home.css`**: the new hero subtitle is italic and the Inter link above loads no italic, so set `.hero__subtitle { font-style: normal; }` (or add italic 400 to the Google Fonts URL: `family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400`).
7. Check: `grep -rn "Josefin" src index.html public` should only find comments; `npm run build` must pass. Optional: the per-element table in section 3 can be compared with the browser's computed styles.

What does **not** need touching: the accordion question and the price-card "/bulan" now use `var(--fs-body)` (they were a hard-coded 16px, which `--fs-body` is again after step 3); the `ascent-override`/`descent-override` lines exist only in the font files' `@font-face` blocks, so they leave with step 2 (Nura keeps its own). The old token `--fs-display` (32px / 56px) was only used by the old hero headline, which no longer exists, so it was removed and does not come back.
