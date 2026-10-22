# Homy Residence — Website

Website marketing untuk kost & villa Homy Residence. Tidak ada booking di website: setiap tombol **Book Now** membuka **WhatsApp** dengan pesan yang sudah terisi.

Built with Vite + React, React Router, lucide-react icons, and Tailwind CSS (for animations). Design tokens (colors, fonts, sizes) live in one file.

---

## 1. Run it on your computer

Requires [Node.js 20+](https://nodejs.org).

```bash
npm install        # once
npm run dev        # open the URL it prints (usually http://localhost:5173)
```

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the site into `dist/` (+ per-property link-preview pages, sitemap) |
| `npm run preview` | Serves the built `dist/` locally |
| `npm run check:placeholders` | Lists everything that is still a placeholder |
| `npm run check:placeholders -- --strict` | Same, but fails if anything is left (use before launch) |
| `npm run lint` | Code check |

In `npm run dev`, every placeholder has an **amber dashed outline** so you can spot it. Hover it to see "Placeholder: isi nanti".

---

## 2. Where to edit content

All content is in `src/data/`. You never need to touch components.

| I want to change… | File | Field |
|---|---|---|
| Price of a room type | `src/data/properties.js` | `roomTypes[].price` (number, e.g. `1700000`) |
| Add / remove a room type | `src/data/properties.js` | `roomTypes` array |
| Room size / "Harga untuk 1 orang" | `src/data/properties.js` | `roomTypes[].size`, `roomTypes[].occupancyNote` |
| Room letters / count | `src/data/properties.js` | `roomTypes[].rooms` (e.g. `'B – Q'`; `null` = "Semua kamar"), `roomTypes[].units`; all `units` must add up to `totalRooms` (`npm run verify:data` checks) |
| Facility that differs per room type | `src/data/properties.js` | `roomTypes[].facilityIds` (only differing ones, e.g. Parahyangan bathrooms). Shared facilities go in the property's `facilityIds` |
| Property facilities | `src/data/properties.js` | `facilityIds` (ids from `src/data/facilities.js`) |
| Facility names / icons | `src/data/facilities.js` | `label`, `icon` ([lucide icon names](https://lucide.dev/icons)) |
| Homepage card highlights | `src/data/properties.js` | `cardHighlights` (max 2; never repeat the price or mention parking) |
| "Unggulan" marker (detail page) | `src/data/properties.js` | `uniqueFacilityIds` |
| Extra line under a facility (e.g. H14 parking) | `src/data/properties.js` | `facilityNotes: { parking_basement: '...' }` |
| Short location (cards) | `src/data/properties.js` | `locationLabel` (max ~40 characters) |
| Full address (panel under the map) | `src/data/properties.js` | `address` |
| Kost Putri / Kost Campur | `src/data/properties.js` | `kostType: 'putri'` or `'campur'` (one field per property). It drives the badge on the homepage card and the link-preview text. The wording itself is in `KOST_TYPES` at the top of the same file |
| Deposit amount (kept in the data; not shown on the site since Update 04) | `src/data/properties.js` | `deposit` |
| Map pin | `src/data/properties.js` | `pin: { lat: '...', lng: '...' }` (map, "Buka di Maps" and every POI route follow it) |
| Point of Interest | `src/data/pois.js` | `POI_CATALOG` (name, category, coordinates) and `POI_MINUTES_BY_SLUG` (minutes by motorcycle per property) |
| POI photos | `poi-assets/` + `scripts/poi-photo-config.mjs` | see section 3 |
| Tata Tertib Peraturan Kost | `src/data/houseRules.js` | `HOUSE_RULES` (one list for every property; numbers are automatic). `onlyFor: ['h14']` shows a rule only for those properties (e.g. the parking rule) |
| FAQ (same for every property) | `src/data/faq.js` | `FAQ` |
| WhatsApp number | `src/data/brand.js` | `whatsappNumber` (digits only, e.g. `6281311654066`) |
| WhatsApp prefilled messages | `src/lib/whatsapp.js` | `TEMPLATES` (keep `{property}`, `{room}`, `{price}`) |
| Hero subtitle (under "HOMY RESIDENCE") | `src/data/brand.js` | `tagline` |
| Hero photos (the curved row of five, random on every load) | `src/data/heroImages.js` | `HERO_IMAGES` (see section 3) |
| Colors, fonts, sizes, radius | `src/styles/tokens.css` | CSS variables (values are estimates — correct freely). Font files: see section 3b |
| Logo | `public/images/brand/logo.svg` + `src/data/brand.js` | set `logo: '/images/brand/logo.svg'` (replaces the Nura text logo everywhere) |

Rule of the site: every fact has one home. AC, WiFi and electricity appear once on the homepage (the "Fasilitas di Semua Hunian" strip) and once per detail page (Fasilitas). Parking never appears on the homepage. Room letters and counts are shown on the room cards.

There is no footer. WhatsApp is reached through the "Book Now" buttons (header on desktop, floating button on phones and tablets, bottom bar on property pages). The header menu item **Kontak** goes to the "Bingung pilih kamar?" band on the homepage (`/#kontak`), from every page.

---

## 3. Add photos

Property and hero photos live in `public/property-pictures/`, with their original file names (already web-sized, used as they are):

```
public/property-pictures/
├── A7/            a7-1.jpg … a7-7.jpg
├── ALAMANDA/      alamanda1.jpg … alamanda4.jpg
├── H14/           fasad/ dapur/ standard/ deluxe/ superior/ + hall.jpg, basement-parking.jpg
├── PARAHYANGAN/   (empty: Parahyangan still shows placeholders)
└── HERO-random/   homepage hero photos
public/images/
├── brand/  logo.svg · og-default.jpg (1200×630)
└── a7/og.jpg …    (1200×630, link preview for /a7 — picked up automatically; same for h14/, parahyangan/, alamanda/)
```

GitHub Pages is **case-sensitive**: `a7-1.JPG` and `a7-1.jpg` are different files online, even if both work on your computer. Write every name exactly like the file.

Then list the files in `src/data/properties.js` with the `photos(folder, label, files)` helper, in the order they should appear (the first one is the first slide):

```js
gallery: photos('A7', 'Homy Permata A7', ['a7-1.jpg', 'a7-2.jpg', 'a7-3.jpg']),
cardCover: 'a7-2.jpg', // optional: homepage card only, this gallery photo comes first
```

The homepage card opens on the first gallery photo, or on `cardCover` when it is set (H14 and Alamanda use it). The property page and the "Hunian Homy Lainnya" cards always start with the first gallery photo.

Room photos go in `roomTypes[].photos` the same way. A7's room cards currently show stand-in photos marked `tempPhotos: true` (amber outline + "Foto sementara" line on the card): put the right photos for that room type and delete `tempPhotos: true`.

**Homepage hero:** every page load shows 5 random photos from `HERO_IMAGES` in `src/data/heroImages.js` on the curved row. To add one, copy it into `public/property-pictures/HERO-random/` and add its exact file name to that list (GitHub Pages cannot read the folder by itself). The cards are tall, so keep the subject near the middle. The current `public/images/brand/og-default.jpg` is a generated placeholder — replace it with a real 1200×630 image.

### POI photos

1. Put the raw photo in `poi-assets/` (any size, any folder). Name the folder or file after the POI, e.g. `poi-assets/pramita/pramita.jpg`.
2. Run `npm run poi:photos`. Each photo is matched to its POI by name (aliases in `scripts/poi-photo-config.mjs`), cropped to 4:3 and saved as `public/images/poi/<id>.webp` (800×600) and `<id>-sm.webp` (400×300). Originals are never changed.
3. Read `update-md/poi-photo-report.md` (matched, unmatched, missing, heavy crops).
4. If a subject is cut off, set `focus: { x, y }` for that POI in `scripts/poi-photo-config.mjs` (0–1 from left/top) and run step 2 again.
5. Commit `public/images/poi/` and `src/data/poiPhotos.js`.

### 3b. Fonts

- **Josefin Sans** is the font of the whole site; **Nura** is used only for the logo text (header logo and the big homepage headline): "HOMY" in Nura Black, "RESIDENCE" in Nura Extra Light.
- The web files are in `public/fonts/` (WOFF2, converted 1:1 from the originals in `font/`), declared in `src/styles/fonts.css`, and selected in `src/styles/tokens.css` (`--font-sans`, `--font-logo`, text sizes).
- The font setup before Update 03 (Inter) is recorded in `FONT-AND-LAYOUT-BEFORE-UPDATE-03.md`, together with the exact steps to switch the site back to it (the Nura logo stays either way).

---

## 4. Replace a map pin

1. In Google Maps, long-press the exact spot and copy the coordinates (e.g. `-6.228501, 106.586875`).
2. In `src/data/properties.js`, set that property's `pin: { lat: '-6.228501', lng: '106.586875' }` (keep them as text).
3. The embedded map, "Buka di Maps" and every POI "Rute" link update automatically. Run `npm run verify:data`.

---

## 5. Deploy to GitHub Pages and connect the domain

One-time setup:

1. Create a GitHub repository and push this project to the `main` branch.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` now builds and deploys automatically (`.github/workflows/deploy.yml`).

**Custom domain (live since Update 04):** the main address is `https://www.homyresidence.id`; GitHub redirects `homyresidence.id` to it.

- `public/CNAME` contains exactly `www.homyresidence.id` (copied into `dist/` by the build).
- The site is served from the root `/`: `base: '/'` in `vite.config.js`, and `SITE_URL: https://www.homyresidence.id` in `.github/workflows/deploy.yml` (canonical/link-preview URLs, sitemap, robots).
- DNS (already done): a `CNAME` record for `www` → the GitHub account's Pages host (`<github-username>.github.io`), and four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
- Because the site deploys with GitHub Actions, GitHub reads the domain from **Settings → Pages → Custom domain** (it must say `www.homyresidence.id`), not from the `CNAME` file. Tick **Enforce HTTPS** there once it is available.

Direct links such as `www.homyresidence.id/alamanda` work on refresh because the build writes `dist/alamanda/index.html` for every open property (with its own link-preview title, description and image). Unknown paths show the in-app 404 page.

Other hosts (only if you move): Netlify → `public/_redirects` with `/*  /index.html  200`; Vercel → `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`.

---

## 6. Open the Villa when it is ready

Routes, homepage card, link-preview page and sitemap all follow `status`, so opening the villa is a data change in `src/data/properties.js`, on the `villa-purnava` entry:

1. Change `status: 'under_construction'` → `status: 'open'`.
2. Fill in the same fields the other properties have: `address`, `totalRooms`, `deposit`, `gallery`, `facilityIds`, `uniqueFacilityIds`, `cardHighlights`, `roomTypes` (at least one), `pin`; add its POIs in `src/data/pois.js`.
3. The Tata Tertib rules in `src/data/houseRules.js` apply automatically (rules with `onlyFor` only where listed).

Then `npm run build` — `/villa-purnava` gets its own page and is added to the sitemap automatically.

---

## 7. Project structure

```
src/
  data/        ← all content (edit here)
  lib/         helpers: formatRupiah, WhatsApp links, assets, hooks
  styles/      tokens.css (design tokens) + component styles; index.css wires Tailwind
  components/  layout/, common/, home/, detail/
  pages/       HomePage, PropertyPage, NotFoundPage
scripts/       prerender-meta.mjs (link previews), check-placeholders.mjs, verify-data.mjs,
               process-poi-photos.mjs + poi-photo-config.mjs (POI photos)
public/        static files and images
```

Animations: Tailwind utilities (`animate-fade-up`, `animate-pop-in`, …) defined in `src/styles/index.css`, plus a scroll-reveal component (`src/components/common/Reveal.jsx`). All motion is switched off for visitors who enable "reduce motion" on their device.
