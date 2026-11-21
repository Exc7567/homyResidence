# 09. Tech Structure, Scripts and Deployment (GitHub Pages)

---

## 1. Project setup

- Create with Vite's React (JavaScript) template: `npm create vite@latest homy-residence -- --template react`.
- Node 20+ (LTS). Package manager: npm.
- `package.json` must contain `"type": "module"` (the Vite template does) so Node scripts can import `src/data/*.js`.

### Dependencies
```jsonc
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "vite": "^5.4.0",
    "@vitejs/plugin-react": "^4.3.0"
  }
}
```
(Newer compatible versions are fine. Use exact installed versions from the lockfile; commit `package-lock.json`.) **Do not** add Tailwind, UI kits, carousel/modal libraries, or the Google Maps SDK.

### Scripts
```jsonc
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && node scripts/prerender-meta.mjs",
    "preview": "vite preview",
    "check:placeholders": "node scripts/check-placeholders.mjs"
  }
}
```

### `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Custom domain (homyresidence.id) serves from root. For a project URL like
  // https://USERNAME.github.io/REPO/ set VITE_BASE=/REPO/ at build time.
  base: process.env.VITE_BASE || '/',
});
```
When `base` is not `/`, `BrowserRouter` needs `basename={import.meta.env.BASE_URL}` and the prerender script must prefix paths accordingly. **Preferred path:** get the custom domain connected so `base` stays `/`. The agent should implement `basename` support anyway.

---

## 2. Folder structure

```
homy-residence/
├── index.html
├── package.json
├── vite.config.js
├── README.md                      (owner-facing: how to edit data, swap map pins, add photos, deploy)
├── public/
│   ├── CNAME                      (contents: homyresidence.id   ← only after the domain is bought)
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/ …                  (structure in file 08 section 5)
├── scripts/
│   ├── prerender-meta.mjs         (file 07)
│   └── check-placeholders.mjs     (file 08)
├── .github/workflows/deploy.yml   (section 4)
└── src/
    ├── main.jsx
    ├── App.jsx                    (routes)
    ├── data/
    │   ├── brand.js
    │   ├── facilities.js
    │   ├── properties.js
    │   ├── houseRules.js
    │   └── faq.js
    ├── lib/
    │   ├── format.js              (formatRupiah, formatDistance)
    │   ├── whatsapp.js            (file 07)
    │   ├── assets.js              (asset() prefixing BASE_URL)
    │   └── placeholders.js        (isPlaceholder)
    ├── styles/
    │   ├── tokens.css             (file 02: ALL design tokens)
    │   ├── base.css               (reset, typography, utilities, buttons)
    │   └── …per-component css
    ├── components/
    │   ├── layout/    SiteHeader, SiteFooter, Logo, FloatingWhatsApp, ScrollToTop
    │   ├── common/    ImageWithFallback, ImageCarousel, Lightbox, Accordion, Expandable, Toast, WhatsAppButton, WhatsAppIcon, HighlightChip, Icon (lucide name→component map)
    │   ├── home/      Hero, PropertyCard, PropertyCardUnderConstruction, PropertyGrid, SharedFacilitiesStrip, HelpBand
    │   └── detail/    DetailTopBar, SectionTabs, GalleryMosaic, HeaderBlock, StickyActionCard, MobileActionBar, FacilitiesSection, LocationSection, MapEmbed, PoiList, VisitBlock, RoomsSection, RoomTypeCard, RoomModal, HouseInfoSections, AboutSection, FaqSection, OtherProperties
    └── pages/     HomePage.jsx, PropertyPage.jsx, NotFoundPage.jsx
```

### `src/lib/format.js`
```js
export const formatRupiah = (n) => 'Rp' + Number(n).toLocaleString('id-ID');         // Rp1.700.000
export const formatDistance = (d) => (d == null ? '-- km' : `${String(Number(d.toFixed(2)))} km`);
```
### `src/lib/assets.js`
```js
export const asset = (p) => (p && p.startsWith('/') ? import.meta.env.BASE_URL.replace(/\/$/, '') + p : p);
```
(Used inside components when rendering `src`; data files stay Vite-free.)

### `src/lib/icons` mapping
`components/common/Icon.jsx` maps the icon-name strings in `facilities.js` (`'AirVent'`, `'Wifi'`, ...) to lucide-react components, with a safe default (`CircleHelp`) for unknown names.

---

## 3. `index.html` essentials
See the full tag list in file 07 section 3.3. Also add Inter via Google Fonts (preconnect + `display=swap`, weights 400;500;600;700). Include `<noscript>` text "Aktifkan JavaScript untuk melihat halaman ini." and a root `<div id="root">`.

---

## 4. GitHub Pages deployment (owner will deploy via GitHub and attach a domain later)

### 4.1 Workflow `.github/workflows/deploy.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          # BEFORE the custom domain exists, use the project URL:
          #   VITE_BASE: /REPO_NAME/
          #   SITE_URL: https://USERNAME.github.io/REPO_NAME
          # AFTER the custom domain is connected, use:
          VITE_BASE: /
          SITE_URL: https://homyresidence.id
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 4.2 One-time owner steps (document in README)
1. Create a GitHub repository, push the project to `main`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` builds and deploys automatically.
4. **Custom domain (after buying `homyresidence.id`):**
   - Add `public/CNAME` containing exactly `homyresidence.id`, **or** set it in Settings → Pages → Custom domain.
   - At the domain registrar, add DNS records: four `A` records for the apex `@` pointing to GitHub Pages' IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and a `CNAME` for `www` pointing to `<USERNAME>.github.io`. (The agent must tell the owner to double-check these in GitHub's current "Managing a custom domain" docs.)
   - Enable **Enforce HTTPS** in Settings → Pages when available (can take up to ~24 hours after DNS).
   - Update the workflow env to `VITE_BASE: /` and `SITE_URL: https://homyresidence.id` (already the default above).
5. A `.id` domain typically requires registrar/PANDI verification; allow extra time.

### 4.3 Direct-URL routing on GitHub Pages
Static hosting returns 404 for unknown paths. Two layers make `/alamanda`, `/a7`, etc. work on direct load and refresh:
1. **Primary:** the prerender script (file 07) writes `dist/<slug>/index.html` for each open property, so GitHub Pages serves a real file for each path.
2. **Fallback:** `dist/404.html` is a copy of the SPA `index.html`. For any other unknown path GitHub Pages serves it with a 404 status and React Router renders the in-app 404 page. (This is acceptable; real routes never hit it.)
Do **not** use `HashRouter` (the owner wants clean URLs like `homyresidence.id/alamanda`).

### 4.4 Alternative hosts (only if asked)
- **Netlify:** `public/_redirects` → `/*  /index.html  200`
- **Vercel:** `vercel.json` → `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
Not required for GitHub Pages; may be included commented-out in the README.

---

## 5. Owner-facing `README.md` (the agent must write it)

Short, in simple English (or Indonesian), with copy-paste steps for:
1. Running locally: `npm install`, `npm run dev`.
2. Where to edit content: a table mapping "I want to change X" → file + field (price, room type, facility, address, phone number, WhatsApp message, tagline, colors, fonts, logo).
3. How to add photos (folder convention, file 08 section 5) and set `src`.
4. How to replace the map pin (file 07 section 2.3).
5. How to see what is still placeholder: `npm run check:placeholders`.
6. How to deploy and connect the domain (section 4).
7. How to open the Villa when ready: change `status` to `'open'`, add room types, facilities, map, POIs, then add `/villa-purnava` to the router and sitemap (explain the 3 small code changes needed; the agent should make this switch easy by driving routes and the sitemap from `status`).

---

## 6. Performance and quality budget

- Mobile Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (with placeholder images).
- JS bundle (gzipped) ≤ 150 KB; CSS ≤ 30 KB.
- No layout shift (CLS < 0.05), LCP image prioritized.
- Code-split the detail page (`React.lazy` for `PropertyPage`, `RoomModal`, `Lightbox`) so the homepage stays light.
- No runtime errors or console warnings in production.
- ESLint (Vite default) passes.
