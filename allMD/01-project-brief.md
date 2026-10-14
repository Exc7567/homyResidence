# 01. Project Brief

## 1. Purpose

Give prospective tenants a clean, trustworthy place to browse Homy's properties and then **move the conversation to WhatsApp**, where the owner's team handles booking.
The site is a *shop window*, not a booking system.

## 2. Target audience

- Students (near universities)
- Young professionals
- Monthly-stay tenants only

Typical entry: a link shared in WhatsApp or Instagram, opened on a phone. Therefore **per-property shareable URLs and good link previews matter** (see file 07).

## 3. Success criteria

1. A visitor can understand each property (rooms, facilities, location, nearby places, price from) in under a minute on a phone.
2. Every page has a clear WhatsApp action ("Book Now").
3. The owner can change any text, price, image, map pin or link by editing files in `src/data/` and `public/images/`, without touching components.
4. Sharing `homyresidence.id/alamanda` in WhatsApp shows a sensible title, description and image (file 07).

## 4. In scope

- Homepage with 5 property cards (4 open, 1 under construction)
- 4 property detail pages (Rukita-style)
- WhatsApp redirect everywhere (prefilled messages, one per context)
- Google Maps embed per property (placeholder pin now, real pin later)
- Photo carousels and a full-screen lightbox (placeholder images now)
- Placeholder system with a checker script
- GitHub Pages deployment with custom domain support
- Per-route SEO meta and link previews (build-time)

## 5. Out of scope (do NOT build)

- Online booking, payments, availability calendar, login, user accounts, admin panel, CMS, backend, database
- Multi-language switcher (Indonesian only)
- Flash sale, promo codes, vouchers, countdown timers (these exist on Rukita; **do not copy**)
- 360° tours, video hosting (a video slot is optional and off by default)
- Reviews/ratings
- Cookie banners or analytics (can be added later by the owner)

## 6. Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Homepage | Title "Homy Residence" |
| `/a7` | Homy Permata A7 | |
| `/h14` | Homy Residence H14 | |
| `/parahyangan` | Homy Parahyangan | |
| `/alamanda` | Homy Budget Alamanda | |
| `/villa-purnava` | Reserved | **Inactive.** Redirect to `/` for now. The card on the homepage is not a link. |
| `*` | Not found | Friendly 404 page with a button back to `/` |

The production domain will be `homyresidence.id` (owner will buy it later and connect it to GitHub Pages). The code must work on both the default `*.github.io` URL and the custom domain (file 09).

## 7. Tech stack (decided)

- **Vite + React 18+ (JavaScript, not TypeScript)**, HTML, plain **CSS** (CSS variables + CSS modules or one global stylesheet per component), **react-router-dom** for routing.
- **lucide-react** for icons (plus one hand-written WhatsApp SVG).
- **No** UI framework (no Tailwind, MUI, Bootstrap), so that colors, fonts and spacing can be controlled exactly from `02-design-system.md`.
- **No** Google Maps JavaScript API key. Use the **keyless Google Maps iframe embed** (file 07). It is already draggable and zoomable.
- Hosting: **GitHub Pages** (static). Everything must work as static files.

## 8. Design direction in one sentence

*Warm, calm, premium-but-affordable coliving look (Rukita): white page, deep green primary actions, soft sand-colored panels, rounded cards, plenty of whitespace, clear price and one obvious action per card.*

## 9. Content language and tone

- All visible text is **Indonesian**, friendly and clear, using "kamu"-style neutral phrasing where addressing the visitor (as Rukita does) or neutral nouns. Avoid slang.
- Button vocabulary (use these exact labels):
  - Primary WhatsApp action: **"Book Now"** (kept in English by owner decision)
  - Go to detail: **"Lihat Detail"**
  - Jump to rooms: **"Lihat Tipe Kamar"**
  - Schedule visit: **"Jadwalkan Visit"**
  - Open map: **"Buka di Maps"**
  - Show more facilities: **"Lihat Selengkapnya"**
  - Share: **"Bagikan"**
- Currency format: `Rp1.700.000` (no space after "Rp", dot as thousands separator). Monthly suffix: ` /bulan`.
- Use a single helper `formatRupiah(n)` for all prices.

## 10. Brand name usage

- Site/brand name: **Homy Residence** (homepage title, header logo text, footer).
- Property names are **exact strings** from file 03 (`name`). Note: one property is itself named "Homy Residence H14"; this is intentional and not a bug.
- Logo and brand colors are **not final**. Build a text-based logo placeholder (wordmark "Homy" + "Residence") in a single component `<Logo />` so the real logo file can replace it by editing one file (file 08).

## 11. Non-negotiables recap

Mobile first. WhatsApp only. All content in `src/data`. Parking not on homepage. Electricity always "excluded". AC and WiFi everywhere. Villa greyed, not clickable. Placeholders obvious. Rukita layout for detail pages.
