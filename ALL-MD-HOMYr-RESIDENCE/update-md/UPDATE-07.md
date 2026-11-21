# UPDATE-07 — Homy Residence: move hosting to Vercel, main domain `homyresidence.id`, Meta Pixel, Vercel Analytics

You have full access to the project folder. Before changing anything, read: `README.md` (especially §5), `update-md/UPDATE-04.md` + `UPDATE-04-PROGRESS.md` (how the custom domain was set up for GitHub Pages), `.github/workflows/deploy.yml`, `vite.config.js`, `index.html`, `scripts/prerender-meta.mjs`, `src/main.jsx`, `src/App.jsx`, `src/data/brand.js`, `src/lib/whatsapp.js`, `src/components/common/WhatsAppButton.jsx`, `src/components/layout/FloatingWhatsApp.jsx`, `src/components/detail/RuleText.jsx`, `src/lib/useOverlayState.js`, `src/components/layout/ScrollManager.jsx`.

Follow the current structure, naming and code style. Change only what this update asks for. Do not redesign anything and do not add features that are not listed here.

---

## Current state (what you will find)

- Repo: `github.com/Exc7567/homyResidence`, branch `main`. Vite 6 + React 18 + React Router 7, static output in `dist/`.
- **Two deployments run on every push to `main` today:**
  1. GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`, sets `SITE_URL=https://www.homyresidence.id`; `public/CNAME` = `www.homyresidence.id`).
  2. Vercel's Git integration (there is no `vercel.json` yet; Vercel uses dashboard defaults).
- DNS for the domain (managed at Hostinger) still points to GitHub Pages. **The owner changes DNS, the Vercel dashboard and GitHub settings manually** — not you.
- `npm run build` = `vite build && node scripts/prerender-meta.mjs`. The script uses `dist/index.html` as a template and writes `dist/index.html`, `dist/<slug>/index.html` for every open property, `dist/404.html`, `dist/sitemap.xml` and `dist/robots.txt`. The site URL comes from `process.env.SITE_URL`, otherwise `https://${BRAND.domain}`.
- The main address today is `https://www.homyresidence.id`. **After this update the main address is `https://homyresidence.id` (no www)**; `www` will redirect to it (configured by the owner in Vercel).

---

## Ground rules

- **Do not** touch DNS, the Vercel dashboard or GitHub repo settings. The owner does those with a separate guide.
- **Do not** change any content, design, text, image, video, route or WhatsApp message.
- **Do not** edit `allMD/` or the older `update-md/UPDATE-0x*.md` files; they are history.
- **Do not** pin Node.js 20 anywhere (it is end-of-life). Do not add an `engines` field.
- **Copy the Meta Pixel code exactly** as given in Task 5. Do not use an npm pixel package (`react-facebook-pixel` etc.).
- File paths stay **case-sensitive** on Vercel exactly as on GitHub Pages. Keep every existing case-sensitivity warning in comments and the README; only replace the words "GitHub Pages" with the live host.
- Keep a progress checklist in `update-md/UPDATE-07-PROGRESS.md` in the same style as `UPDATE-06-PROGRESS.md` (tasks with checkboxes, decisions/findings log at the bottom), so work can resume if it stops.
- When you finish, give the report described at the end of this file.

---

## Task 1 — Remove the GitHub Pages deployment

1. Delete `.github/workflows/deploy.yml`. If `.github/workflows/` and `.github/` are then empty, delete them too.
2. Delete `public/CNAME`. Vercel does not use it; the domain is set in the Vercel dashboard.
3. Add `.vercel` to `.gitignore` (keep the existing lines).
4. Update **comments only** that describe GitHub Pages so they describe Vercel / the live site instead. Search the project (excluding `node_modules`, `dist`, `.git`, `allMD/`, `update-md/`) for `GitHub Pages`, `github.io` and `gh-pages`. Known places:
   - `vite.config.js` (base comment; mentions `public/CNAME`)
   - `scripts/prerender-meta.mjs` (header comment "on static GitHub Pages"; homepage comment mentioning "the github.io URL"; the comment above the `404.html` write → say Vercel serves `dist/404.html` automatically, with HTTP status 404, for any path that has no file)
   - `src/lib/assets.js`, `src/data/heroImages.js`, `src/data/properties.js`, `scripts/room-videos.mjs`, `scripts/check-placeholders.mjs`
   - "Cannot list folders at runtime" is still true on Vercel (static site); keep that meaning.
   - Do not change any logic in these files in this task.

**Done when:** no workflow file, no `CNAME` in `public/` or `dist/`, and the only remaining mentions of GitHub Pages / github.io in the project (outside `allMD/` and old `update-md/` files) are in the README's short history note if you add one.

---

## Task 2 — Main domain becomes `https://homyresidence.id` (no www)

1. `src/data/brand.js` → `domain: 'homyresidence.id'`. Update the comment: main address; `www.homyresidence.id` redirects here (set in Vercel → Settings → Domains).
2. `index.html` → `canonical`, `og:url`, `og:image`, `twitter:image` use `https://homyresidence.id/...`.
3. `public/robots.txt` and `public/sitemap.xml` → `https://homyresidence.id/...` (they are regenerated at build time anyway, but keep the source files correct).
4. `vite.config.js` comment → custom domain `https://homyresidence.id`, served from root `/`. Keep `base: '/'`.
5. Keep the `SITE_URL` support in `scripts/prerender-meta.mjs` unchanged. Vercel needs no environment variable: the fallback `https://${BRAND.domain}` now gives `https://homyresidence.id`.
6. Project-wide search (excluding `node_modules`, `dist`, `.git`, `allMD/`, old `update-md/` files) for `www.homyresidence.id`. The only allowed remaining mentions: the `brand.js` comment and README sentences explaining that www redirects to the main address.

**Done when:** after a build, `grep -r "www.homyresidence.id" dist` finds nothing; `dist/index.html` canonical is `https://homyresidence.id/`; `dist/a7/index.html` canonical is `https://homyresidence.id/a7`; sitemap and robots use the apex domain.

---

## Task 3 — Add `vercel.json`

Create `vercel.json` in the project root with exactly:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "installCommand": "npm ci",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Rules:
- **Do not add a catch-all rewrite** (`/(.*)` → `/index.html`). Every real route already has its own file (`dist/<slug>/index.html`), so direct links and refreshes work without it. Without a rewrite, Vercel serves `dist/404.html` with a real 404 status for unknown paths, and that file loads the app, which shows the in-app 404 page (and redirects closed properties such as `/villa-purnava` home, as today). A catch-all rewrite would return status 200 for every wrong URL, which is bad for SEO.
- Do not add the www → apex redirect here; the owner sets it in the Vercel dashboard.
- Remove the outdated line at the end of README §5 that recommends the Vercel catch-all rewrite.

---

## Task 4 — Vercel Web Analytics and Speed Insights

1. `npm install @vercel/analytics @vercel/speed-insights` (as normal `dependencies`). Commit `package.json` and `package-lock.json`.
2. In `src/App.jsx`, render both components **once**, next to `<ScrollManager />` (inside the router, outside `<Routes>`):
   ```jsx
   import { Analytics } from '@vercel/analytics/react';
   import { SpeedInsights } from '@vercel/speed-insights/react';
   // ...
   <ScrollManager />
   <MetaPixelTracker />   {/* Task 5 */}
   <Analytics />
   <SpeedInsights />
   ```
3. No other configuration. Data appears only on the deployed Vercel site after the owner has enabled Web Analytics and Speed Insights in the dashboard.
4. Check in `npm run dev`: the browser console shows `[Vercel Web Analytics]` debug lines. Confirm one page-view line per page change (homepage → property → back) and **no** extra page-view line when opening/closing a room modal or the photo lightbox (those add history entries with the same URL via `useOverlayState`). If extra page views appear for same-URL entries, do not work around it; write it in the report.

---

## Task 5 — Meta Pixel (Pixel ID `1107640528767265`)

### 5.1 Base code in `index.html`

The owner's code, to be used **character-for-character**:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1107640528767265');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1107640528767265&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

Placement:
- Put the `<!-- Meta Pixel Code -->` comment and the `<script>…</script>` block in `<head>`, directly before `</head>` (after the font preloads).
- Put the `<noscript>…</noscript>` block (with a `<!-- Meta Pixel (noscript) -->` comment) at the top of `<body>`, directly before the existing `<noscript>Aktifkan JavaScript…</noscript>`. Reason: an `<img>` inside `<noscript>` in `<head>` is invalid HTML; in `<body>` it does the same job. This is the only allowed change to the snippet.
- Because `prerender-meta.mjs` uses `dist/index.html` as its template, every generated page (`index.html`, each `<slug>/index.html`, `404.html`) automatically gets the pixel. Confirm the JSON-LD insertion (it replaces `</head>`) still works.

### 5.2 PageView on in-app page changes

The base code sends `PageView` only on the first load. The site is a single-page app, so moving from the homepage to `/a7` inside the app sends nothing. Fix this:

- New file `src/lib/metaPixel.js` with a safe helper (does nothing when the pixel is blocked by an ad blocker or not loaded):
  ```js
  // Meta Pixel helpers. The base code and the first PageView live in index.html.
  export function fbqTrack(event, params) {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    if (params) window.fbq('track', event, params);
    else window.fbq('track', event);
  }
  ```
- New component `src/components/layout/MetaPixelTracker.jsx` (renders `null`, same pattern as `ScrollManager`), rendered once in `App.jsx` (see Task 4).
- Send `fbqTrack('PageView')` **only when the pathname changes**. Do not send it on the first render (index.html already did), on hash-only changes (`/#properti` while on `/`), on search changes, or on history-state-only entries (room modal / lightbox).
- Must be correct under React `StrictMode` (effects run twice in dev). Use a module-level "last tracked path" initialised from `window.location.pathname`, not a "first render" flag.

### 5.3 `Contact` event when a WhatsApp link is tapped

- Every WhatsApp link today is an `<a href="https://wa.me/...">` with `target="_blank"`: `WhatsAppButton` (has `data-intent` and `data-property`), `FloatingWhatsApp` (has `data-intent`), and the phone-number links in `RuleText` (no data attributes). Search for any other `wa.me` / `api.whatsapp.com` / `whatsapp://` link and include it.
- In `MetaPixelTracker`, add **one** delegated listener on `document` (capture phase) for `click` and for `auxclick` with middle button (`e.button === 1`). Find the link with `e.target.closest('a[href^="https://wa.me/"]')` (extend the selector if you found other WhatsApp URL forms). Remove the listeners in the effect cleanup so StrictMode never double-binds.
- On a match send:
  ```js
  fbqTrack('Contact', {
    content_name: <property name from PROPERTIES by data-property slug, else 'Homy Residence'>,
    content_category: <data-intent, else 'chat'>,   // general | property | room | visit | chat
    room_type: <data-room, only if present>,
    page_path: window.location.pathname,
  });
  ```
- In `WhatsAppButton.jsx`, add **only** `data-room={room?.name}` next to the existing data attributes (React omits it when `undefined`). No other change to that component.
- Never `preventDefault`, delay or otherwise change the link behaviour. Exactly one `Contact` per tap.
- Do not add any other Meta events (no `Lead`, `ViewContent`, etc.).

### Reference implementation (adapt to the project's code style)

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PROPERTIES } from '../../data/properties';
import { fbqTrack } from '../../lib/metaPixel';

// The first PageView is sent by the Meta Pixel base code in index.html.
// Module-level so React StrictMode's double effects never send it twice.
let lastPath = typeof window !== 'undefined' ? window.location.pathname : null;

const WA_LINK = 'a[href^="https://wa.me/"]';

export default function MetaPixelTracker() {
  const { pathname } = useLocation();

  // PageView on in-app page changes (not hash / search / modal history entries).
  useEffect(() => {
    if (pathname === lastPath) return;
    lastPath = pathname;
    fbqTrack('PageView');
  }, [pathname]);

  // Contact on every WhatsApp link tap.
  useEffect(() => {
    const onClick = (e) => {
      if (e.type === 'auxclick' && e.button !== 1) return;
      const link = e.target.closest?.(WA_LINK);
      if (!link) return;
      const { intent, property: slug, room } = link.dataset;
      const property = slug ? PROPERTIES.find((p) => p.slug === slug) : null;
      fbqTrack('Contact', {
        content_name: property?.name ?? 'Homy Residence',
        content_category: intent || 'chat',
        ...(room ? { room_type: room } : {}),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('auxclick', onClick, true);
    };
  }, []);

  return null;
}
```

---

## Task 6 — README

Rewrite README §5 as **"Deploy (Vercel) and the domain"**, short and plain, for the owner:

- Every push to `main` deploys to production on Vercel automatically; other branches and pull requests get a preview URL. Build settings live in `vercel.json`.
- Main address `https://homyresidence.id`; `www.homyresidence.id` redirects to it (Vercel → project → Settings → Domains).
- DNS at Hostinger: `A` record for `@` and `CNAME` record for `www`, both with the exact values shown on the domain cards in Vercel → Settings → Domains.
- Direct links such as `homyresidence.id/alamanda` work on refresh because the build writes `dist/alamanda/index.html` for every open property; unknown paths get `dist/404.html` (status 404) and show the in-app 404 page. No rewrite is needed.
- Analytics: Vercel → project → **Analytics** and **Speed Insights** tabs.
- Meta Pixel: base code in `index.html` (`<head>` script + `<noscript>` at the top of `<body>`); in-app PageView and WhatsApp `Contact` in `src/components/layout/MetaPixelTracker.jsx` + `src/lib/metaPixel.js`. To change the Pixel ID, edit **both** places in `index.html` (the `fbq('init', …)` line and the `noscript` image URL).
- File names stay case-sensitive on the live site.

Also update README §7 (project structure) to mention `vercel.json`, `src/lib/metaPixel.js` and `MetaPixelTracker.jsx`, and replace the remaining "GitHub Pages is case-sensitive" wording (e.g. in §2) with "the live site is case-sensitive".

---

## Final check before you finish

- [ ] Fresh `npm ci`, then `npm run lint`, `npm run verify:data`, `npm run check:placeholders`, `npm run build` all pass
- [ ] `.github/workflows/deploy.yml` and `public/CNAME` are deleted; `dist/CNAME` does not exist; `.vercel` is in `.gitignore`
- [ ] `vercel.json` exists exactly as in Task 3; no rewrites
- [ ] `grep -r "www.homyresidence.id" dist` → nothing; canonical/og URLs in every `dist/**/*.html` start with `https://homyresidence.id`; sitemap and robots use the apex
- [ ] Pixel ID `1107640528767265` appears exactly **2** times in each of `dist/index.html`, every `dist/<slug>/index.html` and `dist/404.html` (`grep -c`)
- [ ] `npx vite preview`, DevTools → Network, filter `facebook`:
  - first load → `fbevents.js` loads and one `tr?…ev=PageView` request
  - click a property card → exactly one more `PageView`; open/close room modal or lightbox → none; header link to `/#properti` while on `/` → none; back to homepage → one `PageView`
  - tap each kind of WhatsApp link (header "Book Now", help band, floating button, property card, price bar, room card, "Jadwalkan Visit", a phone number in Tata Tertib) → exactly one `tr?…ev=Contact` request each, with the expected `cd[content_name]` / `cd[content_category]` / `cd[room_type]`; WhatsApp still opens in a new tab
  - (keep this testing short: localhost events are sent to the real pixel)
- [ ] With an ad blocker on (or `window.fbq` deleted): no console errors, all links still work
- [ ] `npm run dev` → Vercel Analytics debug lines behave as described in Task 4
- [ ] Desktop and mobile browser check: no console errors, site looks exactly as before
- [ ] Nothing outside this update was changed
- [ ] Commit with clear messages and push to `main` (this triggers the Vercel production deploy). Do not push to any other remote.

## Report back with

1. The list of files you created, changed and deleted.
2. The `grep` results for the pixel ID counts and the `www.homyresidence.id` search in `dist/`.
3. What the Network tab showed for PageView and Contact (which buttons you tested, the params sent).
4. Whether the Vercel Analytics debug output showed any extra page views for modal/lightbox history entries.
5. Any other WhatsApp link format you found and how you covered it.
6. Anything you were unsure about or could not complete.
7. A reminder to the owner to follow `UPDATE-07-OWNER-STEPS.md` (Vercel domains, Hostinger DNS, turning off GitHub Pages).
