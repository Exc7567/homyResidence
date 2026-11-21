# 07. WhatsApp, Google Maps, and SEO / Link Previews

---

## 1. WhatsApp redirect (the only conversion path)

**Number (from owner):** `+62 813-1165-4066` → stored as digits `6281311654066` in `BRAND.whatsappNumber` (international format, no `+`, no spaces, no leading `0`).

### 1.1 Link format
```
https://wa.me/6281311654066?text=<URL-ENCODED MESSAGE>
```
Use `encodeURIComponent(message)`. Always open in a new tab with `rel="noopener noreferrer"`. On phones this opens the WhatsApp app; on desktop it opens WhatsApp Web / Desktop.

### 1.2 Helper `src/lib/whatsapp.js`
```js
import { BRAND } from '../data/brand';
import { formatRupiah } from './format';

const TEMPLATES = {
  // OWNER WILL EDIT THESE LATER. Keep {placeholders} in curly braces.
  general:  'Halo Homy Residence, saya ingin menanyakan hunian yang tersedia. Boleh dibantu?',
  property: 'Halo Homy Residence, saya ingin menanyakan hunian {property}. Boleh dibantu?',
  room:     'Halo Homy Residence, saya tertarik dengan kamar tipe {room} di {property} ({price}/bulan). Apakah masih tersedia?',
  visit:    'Halo Homy Residence, saya ingin menjadwalkan visit ke {property}. Boleh dibantu?',
};

export function buildWaMessage({ intent = 'general', property, room } = {}) {
  let t = TEMPLATES[intent] || TEMPLATES.general;
  if (!property && (intent === 'property' || intent === 'room' || intent === 'visit')) t = TEMPLATES.general;
  return t
    .replace('{property}', property?.name ?? '')
    .replace('{room}', room?.name ?? '')
    .replace('{price}', room ? formatRupiah(room.price) : '');
}

export function buildWaLink(opts = {}) {
  const text = buildWaMessage(opts);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
```

### 1.3 Where each intent is used

| Place | Intent | Resulting context |
|---|---|---|
| Header "Book Now", hero "Book Now", help CTA band, floating button (homepage) | `general` | No property |
| Homepage property card "Book Now" | `property` | That property |
| Detail: top tab bar "Hubungi Tim Kami", price card "Book Now", mobile bottom bar "Book Now", FAQ "Hubungi Kami", "Aturan Tambahan" link | `property` | That property |
| Detail: room card and room modal "Book Now" | `room` | Property + room type + price |
| Detail: "Jadwalkan Visit" | `visit` | That property |

The owner said the **phone number and prefilled messages will be provided later**; the number above is already final, the message texts above are **editable defaults**. All templates live in one object so the owner can change them in one place.

### 1.4 Fallbacks
- If the user's device cannot open WhatsApp, the link still opens the `wa.me` web page which offers "Continue to chat". No extra handling required.
- Show the readable number `BRAND.whatsappDisplay` in the footer so people can save it manually.

### 1.5 Never
- Never call `window.open` from a non-user-initiated event. Never collect phone numbers or names on the site. Never add a form.

---

## 2. Google Maps (keyless embed, draggable)

### 2.1 Decision
The owner asked for a draggable, zoomable map like the Johan Property reference ("so that people can see and drag the map"). The standard **Google Maps iframe embed** provides exactly that (pan, zoom, "Buka di Maps" card) and needs **no API key, no billing, no JavaScript SDK**. Do **not** install the Maps JavaScript API and do **not** ask for an API key. (A key is only needed for custom markers/styling, which are out of scope.)

### 2.2 Placeholder pin (for now)
The owner's real pins are not set up yet, so each property uses a **generic placeholder map**:
- a7, parahyangan, alamanda → `https://www.google.com/maps?q=Supermall+Karawaci&z=15&output=embed`
- h14 → `https://www.google.com/maps?q=Universitas+Surabaya&z=15&output=embed`

These are stored in `property.map.embedUrl` with `isPlaceholder: true` (file 03). The map shows the amber "Pin sementara" chip until the real pin is set.

> Technical note for the agent: the `?q=...&output=embed` form is the widely used keyless embed. If a placeholder ever fails to load, fall back to the "Peta belum tersedia" panel (file 06 section 6) rather than throwing.

### 2.3 How the owner swaps in the real pin (document this verbatim in the repo README)
1. Open Google Maps, search the exact property location, and drop/confirm the pin.
2. Click **Share** → tab **Embed a map** → **Copy HTML**.
3. From the copied `<iframe src="...">`, copy **only the `src` URL**.
4. Open `src/data/properties.js`, find the property, and paste it into `map.embedUrl`.
5. Click **Share** → **Copy link** (the `maps.app.goo.gl/...` short link) and paste into `map.openUrl`.
6. Set `isPlaceholder: false` for that property's map. The amber chip disappears automatically.
7. Replace `address` (and `locationLabel`) with the real text.

(The Johan reference page uses exactly this kind of embed URL, `https://www.google.com/maps/embed?pb=...`.)

### 2.4 Content-Security note
If the owner later adds a `Content-Security-Policy`, allow `frame-src https://www.google.com`.

---

## 3. SEO and link previews (important: owner will share per-property URLs)

### 3.1 The problem
This is a single-page React app hosted on **static GitHub Pages**. Link-preview bots (WhatsApp, Instagram, Facebook) do **not run JavaScript**, so without extra work every URL (`/alamanda`, `/h14`, ...) would show the same title, description and image from `index.html`. Since sharing individual property links is a core goal, per-route meta must exist in the **static HTML**.

### 3.2 The solution: build-time prerender of meta (no SSR framework needed)
Add a post-build script `scripts/prerender-meta.mjs` that, after `vite build`, takes `dist/index.html` as a template and writes one HTML file per route:

```
dist/index.html                  (homepage meta)
dist/a7/index.html               (A7 meta)
dist/h14/index.html
dist/parahyangan/index.html
dist/alamanda/index.html
dist/404.html                    (copy of the SPA index with a neutral title, used by GitHub Pages as fallback)
```
Each file is the same React bundle but with the correct `<title>`, `<meta name="description">`, Open Graph and Twitter tags, and `<link rel="canonical">`. Because GitHub Pages serves `dist/alamanda/index.html` for `/alamanda`, **direct loads and reloads work with no 404 hack**, and bots see the right preview.

Reference implementation (the agent may adapt):
```js
// scripts/prerender-meta.mjs  (Node ESM, runs after `vite build`)
import fs from 'node:fs';
import path from 'node:path';
import { PROPERTIES } from '../src/data/properties.js';
import { BRAND } from '../src/data/brand.js';

const SITE = process.env.SITE_URL || `https://${BRAND.domain}`;
const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const rp = (n) => 'Rp' + n.toLocaleString('id-ID');

function withMeta(html, { title, description, url, image }) {
  return html
    .replace(/<title>.*?<\/title>/s, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
}

for (const p of PROPERTIES.filter((x) => x.status === 'open')) {
  const from = Math.min(...p.roomTypes.map((r) => r.price));
  const html = withMeta(template, {
    title: `${p.name} | Homy Residence`,
    description: `${p.name}: kost bulanan mulai ${rp(from)}/bulan. Lihat tipe kamar, fasilitas, lokasi dan chat WhatsApp untuk booking.`,
    url: `${SITE}/${p.slug}`,
    image: `${SITE}/images/${p.slug}/og.jpg`,   // owner provides; fallback below
  });
  fs.mkdirSync(path.join(dist, p.slug), { recursive: true });
  fs.writeFileSync(path.join(dist, p.slug, 'index.html'), html);
}
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('Prerendered meta for', PROPERTIES.filter((x) => x.status === 'open').length, 'properties');
```
`package.json`: `"build": "vite build && node scripts/prerender-meta.mjs"`.

Requirements for `index.html` so the regexes work: it must contain exactly one each of `<title>`, `<meta name="description" content="...">`, `<link rel="canonical" href="...">`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:title`, `twitter:description`, `twitter:image`, with attributes in the order shown (property/name first, then `content`).

### 3.3 `index.html` baseline tags
```html
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Homy Residence | Kost & Villa</title>
  <meta name="description" content="Homy Residence: kost bulanan untuk mahasiswa dan profesional. Lihat tipe kamar, fasilitas dan lokasi, lalu booking via WhatsApp." />
  <link rel="canonical" href="https://homyresidence.id/" />
  <meta name="theme-color" content="#15352F" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Homy Residence" />
  <meta property="og:locale" content="id_ID" />
  <meta property="og:title" content="Homy Residence | Kost & Villa" />
  <meta property="og:description" content="Homy Residence: kost bulanan untuk mahasiswa dan profesional." />
  <meta property="og:url" content="https://homyresidence.id/" />
  <meta property="og:image" content="https://homyresidence.id/images/brand/og-default.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Homy Residence | Kost & Villa" />
  <meta name="twitter:description" content="Homy Residence: kost bulanan untuk mahasiswa dan profesional." />
  <meta name="twitter:image" content="https://homyresidence.id/images/brand/og-default.jpg" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</head>
```
- `og:image` must be an **absolute URL**, 1200×630 recommended. Per-property OG image at `public/images/<slug>/og.jpg`; if missing, the script should fall back to `og-default.jpg` (check `fs.existsSync` against `public/` and choose accordingly).
- Until the domain is bought, `SITE_URL` is set in the GitHub Actions workflow (file 09) to the GitHub Pages URL; after buying the domain, change it to `https://homyresidence.id` (one place).

### 3.4 Client-side title updates
In the React app, set `document.title` per route in an effect (`Homy Residence | Kost & Villa`, `{name} | Homy Residence`) so in-app navigation updates the tab title.

### 3.5 Other files
- `public/robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: https://homyresidence.id/sitemap.xml`.
- `public/sitemap.xml`: `/`, `/a7`, `/h14`, `/parahyangan`, `/alamanda` (the villa is excluded until it opens).
- Optional JSON-LD (`LodgingBusiness`) per property in the prerendered HTML; not required.
