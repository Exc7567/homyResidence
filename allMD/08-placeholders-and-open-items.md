# 08. Placeholders and Open Items

The owner deliberately held back several things. This file lists **every placeholder**, **where it appears**, **what the owner should provide**, and the **unresolved questions** the agent must not answer by guessing.

---

## 1. How placeholders work (implementation rules)

1. **Text placeholders** are strings in `src/data/*` that start with `[ISI:` and end with `]`. Example: `'[ISI: alamat lengkap Homy Permata A7]'`. The text after "ISI:" **tells the owner what to put there** (instructions are part of the placeholder).
2. **Image placeholders** are image objects with `src: null`. Rendered by `ImageWithFallback` as a neutral block with an icon and the `label` (file 02 section 7).
3. **Dev visibility:** in development (`import.meta.env.DEV`) any rendered placeholder string or image gets an **amber dashed outline** (`--color-placeholder-flag`) and a `title` tooltip "Placeholder: isi nanti". In production no outline, but the `[ISI: ...]` text is still visible so nothing ships unnoticed.
4. **Checker script** `npm run check:placeholders` (`scripts/check-placeholders.mjs`): scans `src/data/**` for `[ISI:` and for `src: null`, prints a table (file, line, text) and a count, and exits with code `0` (informational). A second mode `npm run check:placeholders -- --strict` exits `1` if any remain (use it right before launch / in CI if desired).
5. Never silently hide a placeholder section just because it is empty. Show the placeholder so the gap is visible (exception: `extraRules` and `heroStats`, which are optional and omitted when undefined).
6. **Do not** put placeholder values into `<meta>` tags during prerender: if a description would contain `[ISI:`, use the generic description instead.

---

## 2. Placeholder register

| ID | Where it appears | Data location | What the owner should provide |
|---|---|---|---|
| PH-01 | Brand logo (header, footer, gallery chip, managed banner) | `BRAND.logo` + `<Logo />` | Logo file (SVG preferred, PNG ok) → `public/images/brand/logo.svg`; set `BRAND.logo`. Until then a text wordmark is shown |
| PH-02 | Brand colors | `src/styles/tokens.css` | Exact brand hex codes (primary, accent). Edit the tokens; no component changes needed |
| PH-03 | Homepage tagline | `BRAND.tagline` | One line that sells the brand, e.g. "Hunian nyaman untuk mahasiswa & profesional" |
| PH-04 | Hero subtitle | `BRAND.heroSubtitle` | 1-2 sentences introducing the properties |
| PH-05 | Hero image | `public/images/brand/hero.jpg` | A wide, bright photo of a Homy property (recommended 1600×1200, ≤ 300 KB) |
| PH-06 | Link-preview image | `public/images/brand/og-default.jpg` | 1200×630 JPG with logo + a property photo |
| PH-07 | WhatsApp prefilled messages | `TEMPLATES` in `src/lib/whatsapp.js` | Final wording for general/property/room/visit messages (number is already set) |
| PH-08 | Social links | `BRAND.social.*` | Instagram, TikTok, Facebook URLs (Instagram recommended). Remove unused ones |
| PH-09 | Contact email and office address | `BRAND.email`, `BRAND.address` | Optional; delete the lines if not wanted |
| PH-10 | Footer blurb | `<SiteFooter />` prop / `BRAND.blurb` | 1-2 sentences about Homy |
| PH-11 | Location label per property (shown on cards) | `property.locationLabel` | Short area, e.g. "Karawaci, Tangerang". Max ~40 characters |
| PH-12 | Full address per property | `property.address` | Complete street address as it appears on Google Maps |
| PH-13 | Google Maps pin per property | `property.map.embedUrl`, `openUrl`, `isPlaceholder` | Follow the swap procedure in file 07 section 2.3 |
| PH-14 | POI photos | `property.pois[].photo` | One photo per POI → `public/images/<slug>/poi/<poi-id>.jpg` and set the path |
| PH-15 | POI distances | `property.pois[].distance` | Distance from the property in km (number, e.g. `0.8`) |
| PH-16 | Property gallery photos | `property.gallery[]` | 6+ photos per property → `public/images/<slug>/gallery/01.jpg ...` and set `src` |
| PH-17 | Room type photos | `roomTypes[].photos[]` | 3-4 photos per room type → `public/images/<slug>/rooms/<room-id>/01.jpg ...` |
| PH-18 | Room size | `roomTypes[].size` | e.g. "3 x 4 m" or "12 m²" |
| PH-19 | Occupancy note | `roomTypes[].occupancyNote` | e.g. "Harga untuk 1 orang" |
| PH-20 | "Tentang Hunian" text per property | `property.description` | See writing template in section 4 |
| PH-21 | House rules (all properties) | `src/data/houseRules.js` | See section 3: gender policy, check-in/out, cancellation, guests, smoking, pets, etc. |
| PH-22 | FAQ answers for pets and smoking | `src/data/faq.js` | Must match PH-21 |
| PH-23 | "Dikelola oleh Homy" line | `BRAND.managedByText` | One short sentence, default shown: "Hunian nyaman dengan fasilitas lengkap" |
| PH-24 | Villa details | `PROPERTIES` villa entry | Location label, opening date, photos, room types when ready |
| PH-25 | Contract-length pricing | `roomTypes[]` (future field `discounts`) | Owner said they will adjust manually later; **do not** build any discount UI now |

---

## 3. House rules: what each field means and what to write

For `src/data/houseRules.js` (all start as `[ISI: ...]`):

| Field | Meaning | Example answer |
|---|---|---|
| `occupantPolicy` | Who may live there | "Kost campur, lantai putra dan putri terpisah" / "Khusus putri" |
| `additionalOccupants` | Can a second person stay in a room? | "Tambahan penghuni tidak diperbolehkan" |
| `checkInOut` | Move-in and move-out hours | "Check-in 08.00-20.00. Check-out maksimal 12.00" |
| `minimumStay` | Minimum rental period | "Minimal 1 bulan" |
| `cancellation` | What happens if tenant cancels | "Pembatalan dikenakan biaya 50% dari deposit" |
| `access24h` | Building access hours | "Akses 24 jam, penghuni mendapat kunci/kode" |
| `overnightGuests` | Guests sleeping over | "Maksimal 3 hari; hanya sesama jenis atau keluarga" |
| `visitors` | Day visitors | "Maksimal pukul 22.00; tamu lawan jenis tidak boleh masuk kamar" |
| `smoking` | Smoking rule | "Dilarang merokok di dalam kamar dan area bersama" |
| `pets` | Pets rule | "Tidak diperbolehkan membawa hewan peliharaan" |
| `extraRules` | Anything else (optional) | "Dilarang membawa alat masak berdaya besar" |

(The examples above mirror the *kind* of content Rukita shows; they are **not** Homy's real rules. Do not pre-fill them as facts.)

---

## 4. "Tentang Hunian" writing template (for the owner)

Give the owner this template inside `property.description` as the placeholder's instruction, and use it in the README:

> **Paragraf 1: Siapa cocok & lokasi.** "[Nama properti] adalah kost bulanan di [area] yang cocok untuk mahasiswa dan profesional. Lokasinya dekat dengan [POI 1], [POI 2], dan [POI 3]."
> **Paragraf 2: Kamar & fasilitas.** "Tersedia tipe kamar [daftar tipe] mulai Rp[harga termurah]/bulan. Semua kamar dilengkapi AC, WiFi, dan [kamar mandi dalam/luar]. [Fasilitas unggulan]."
> **Paragraf 3: Biaya & booking.** "Listrik tidak termasuk (token meter per kamar). Deposit di awal sebesar Rp[deposit]. Untuk booking dan cek ketersediaan, klik 'Book Now' untuk chat WhatsApp."

Keep it factual, 80-150 words, no unverifiable claims ("terbaik", "termurah se-Indonesia").

---

## 5. Image conventions (so the owner can drop in photos without touching code)

```
public/images/
├── brand/
│   ├── logo.svg
│   ├── hero.jpg                (1600×1200)
│   └── og-default.jpg          (1200×630)
├── a7/
│   ├── og.jpg                  (1200×630, per-property link preview)
│   ├── gallery/01.jpg … 06.jpg (1600×1200 max, ≤ 250 KB each)
│   ├── rooms/standard/01.jpg … (and superior/, deluxe/, executive/)
│   └── poi/supermall-karawaci.jpg, uph-college.jpg, uph.jpg
├── h14/    (gallery/, rooms/standard|superior|executive/, poi/ubaya.jpg, rs-ubaya.jpg)
├── parahyangan/   (rooms/small|standard|superior/)
├── alamanda/      (rooms/standard/)
└── villa-purnava/ (gallery/01.jpg when available)
```
- Format: JPG or WebP, sRGB. Max width 1600 px for galleries; 1200 px for room photos; 800 px for POI photos. Compress to ≤ 250 KB.
- In data files, image paths are absolute from the site root, e.g. `{ src: '/images/a7/gallery/01.jpg', alt: 'Tampak depan Homy Permata A7' }`.
- Since the site may first be served from a sub-path (`username.github.io/repo/`), build asset URLs through a helper `asset(path)` that prefixes `import.meta.env.BASE_URL`. (Data files must stay Node-importable: store root-relative paths in data and apply `asset()` inside components, not in data.)

---

## 6. Open questions (owner has not answered; do NOT guess)

| # | Question | Current handling |
|---|---|---|
| Q1 | **Where is H14?** Its POIs (Universitas Surabaya, Rumah Sakit UBAYA) point to Surabaya, while A7, Parahyangan and Alamanda point to Karawaci (Tangerang). Is H14 in a different city? | `locationLabel` for H14 is a placeholder with this note; map placeholder centers on Universitas Surabaya |
| Q2 | **Parahyangan room count.** Owner list implies 4 + 9 + 1 = 14 rooms but never states the total | `totalRooms: 14` marked DERIVED; confirm or correct |
| Q3 | **Parahyangan "Small" room (L):** does it include free laundry, AC, WiFi, fully furnished? Owner said only "bathroom outside with water heater" and, globally, "all properties have AC and WiFi" | Small shows: AC, WiFi, Kamar Mandi Luar, Water Heater. Furnished/laundry not shown |
| Q4 | **H14 car parking Rp150.000:** per month or one-time "keep parking spot" fee? | Text keeps `[ISI: ...]` for the period |
| Q5 | **Alamanda laundry:** owner mentions a washing machine on floor 4 and no laundry service. Is a free laundry service really absent? | Only the washing machine is shown |
| Q6 | **Alamanda water heater:** not mentioned for Alamanda | Not shown |
| Q7 | **Mixed vs gender-specific kost** for each property | Placeholder in `occupantPolicy` |
| Q8 | **Number of facilities** wording on cards ("N Fasilitas") excludes electricity token; confirm acceptable | Implemented as in file 03 section 9 |
| Q9 | **Villa Purnava Permata:** location, opening date, room types | Greyed card only |
| Q10 | **Domain and hosting path:** domain not yet bought | Build works on `*.github.io` and on `homyresidence.id` (file 09) |

The agent should surface this list to the owner in the final delivery note and mark the corresponding data fields with `[ISI: ...]`.

---

## 7. Copy of placeholder wording to use (exact strings)

| Context | String |
|---|---|
| Missing distance | `-- km` |
| Missing image label | `Foto {label}` |
| Missing address on map panel | `[ISI: alamat lengkap]` |
| Map placeholder chip | `Pin sementara` |
| Villa label | `Under Construction` |
| Dev tooltip | `Placeholder: isi nanti` |
