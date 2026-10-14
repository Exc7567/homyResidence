# Build Progress Checklist (resume point)

> Spec: `allMD/00..10`. Project is built **in this folder** (`d:/BEHOMY/homyResidence`).
> If work stops, read this file, find the first unchecked box, continue from there.
> Owner override: **Tailwind CSS added** (owner request, overrides "no Tailwind" in files 01/09).
> Tailwind v4 via `@tailwindcss/vite`; its theme reads the CSS variables in `src/styles/tokens.css`,
> so tokens.css stays the single source of truth for colors/fonts. Used mainly for animations
> (entrance reveal, hover lift, stagger, shimmer) — all disabled under `prefers-reduced-motion`.

## Phase 1 — Scaffold
- [x] package.json, vite.config.js, index.html (meta per file 07 §3.3), eslint config
- [x] npm install (react, react-dom, react-router-dom, lucide-react, vite, plugin-react, tailwindcss, @tailwindcss/vite)
- [x] public/: favicon.svg, robots.txt, sitemap.xml, images/brand/og-default.jpg placeholder, image folder skeleton

## Phase 2 — Data + lib
- [x] src/data/brand.js, facilities.js, properties.js, houseRules.js, faq.js (verbatim from file 03)
- [x] src/lib/format.js, whatsapp.js, assets.js, placeholders.js, property helpers (priceFrom etc.)

## Phase 3 — Styles
- [x] src/styles/tokens.css (file 02 all tokens)
- [x] src/styles/base.css (reset, type, buttons, container, placeholder outline, reduced motion)
- [x] src/styles/index.css (Tailwind import + theme mapped to tokens + animation keyframes)

## Phase 4 — Common components
- [x] Logo, WhatsAppIcon, Icon map, ImageWithFallback, PlaceholderText
- [x] ImageCarousel (transform, arrows, swipe, keyboard, dots, counter, lazy, click-vs-drag, a11y)
- [x] Lightbox, Accordion, Expandable, Toast (context), WhatsAppButton, HighlightChip, Reveal (scroll animation)

## Phase 5 — Layout + Home
- [x] SiteHeader, SiteFooter, FloatingWhatsApp, ScrollManager (scroll top/restore/hash)
- [x] Hero, PropertyGrid, PropertyCard, PropertyCardUnderConstruction, SharedFacilitiesStrip, HelpBand
- [x] HomePage (+ App.jsx, main.jsx, NotFoundPage written early; PropertyPage done in Phase 6)

## Phase 6 — Detail page
- [x] DetailTopBar, SectionTabs (scrollspy), Breadcrumb
- [x] GalleryMosaic (desktop mosaic + mobile carousel), HeaderBlock (managed banner)
- [x] StickyActionCard, MobileActionBar
- [x] FacilitiesSection (grid, Unggulan, Fasilitas unggulan, Parkir)
- [x] LocationSection: MapEmbed (overlay), address panel, PoiList (tabs), VisitBlock
- [x] RoomsSection, RoomTypeCard, RoomModal (bottom sheet / dialog)
- [x] HouseInfoSections (Aturan Tambahan, Kebijakan, Tata Tertib)
- [x] AboutSection, FaqSection, OtherProperties
- [x] PropertyPage, NotFoundPage, App routes (villa redirect, lazy), main.jsx

## Phase 7 — Scripts / deploy
- [x] scripts/prerender-meta.mjs (per-route meta, og fallback, no [ISI: in meta, basename aware)
- [x] scripts/check-placeholders.mjs (+ --strict)
- [x] .github/workflows/deploy.yml
- [x] README.md (owner guide)

## Phase 8 — Verify (file 10)
- [x] npm run build succeeds, dist/<slug>/index.html + 404.html exist
- [x] npm run lint passes
- [x] npm run check:placeholders works
- [x] Grep: no hex colors in components; no parking text on homepage
- [x] Final delivery note (placeholders list, open questions Q1–Q10, tokens note, domain steps)
- note: CSS split into src/styles/{index,tokens,base,common,home,detail}.css; placeholder text component = common/Text.jsx; hooks in src/lib/hooks.js
- note: overlays (room modal, lightbox) use history state via src/lib/useOverlayState.js so phone back gesture closes them; section tab constants in src/lib/sections.js

## Status: COMPLETE (2026-10-13)
Browser QA (Chrome via playwright-core, scratchpad only): 320–1440px, no horizontal overflow,
no console errors, tap targets ≥44px, all functional checks pass. Remaining work is owner content
(see `npm run check:placeholders`) and deployment (README §5).
