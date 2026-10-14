# Homy Residence Website: Build Specification Pack

> **Audience:** an AI coding agent (or developer) that will build this website from scratch.
> **Owner:** Excel. **Language of the website UI:** Indonesian (Bahasa Indonesia). **Language of these specs:** English.
> Read **every file in this pack, in order, before writing any code.** Do not skip files. Do not improvise where a file says what to do.

---

## 1. What is being built (one paragraph)

A mobile-first marketing website for a small group of kost (boarding house) and villa properties.
Visitors land on a homepage titled **"Homy Residence"** that shows one **card per property**.
Clicking a card opens that property's own **detail page** with its own shareable URL (for example `homyresidence.id/alamanda`).
The detail page is a faithful rebuild of the **Rukita property detail page** (gallery, sticky section tabs, shared facilities, location with map and points of interest, room types, house rules, about, FAQ).
**There is no booking engine.** Every "Book Now" / contact button opens **WhatsApp** with a prefilled message. All booking happens in the WhatsApp chat.

## 2. The five properties

| # | Display name | URL path | Status |
|---|---|---|---|
| 1 | Homy Permata A7 | `/a7` | Open |
| 2 | Homy Residence H14 | `/h14` | Open |
| 3 | Homy Parahyangan | `/parahyangan` | Open |
| 4 | Homy Budget Alamanda | `/alamanda` | Open |
| 5 | Villa Purnava Permata | `/villa-purnava` (reserved, inactive) | **Under Construction** (greyed card, not clickable) |

## 3. File index (read in this order)

| File | What it contains |
|---|---|
| `00-README.md` | This file: overview, golden rules, glossary |
| `01-project-brief.md` | Goals, audience, scope, non-goals, routes, tech stack decisions |
| `02-design-system.md` | Colors, typography, spacing, radii, shadows, buttons, icons, breakpoints, and which reference each element is copied from |
| `03-content-data.md` | **Single source of truth for all content**: full data of the 5 properties, room types, prices, facilities, POIs, and the exact `src/data` file contents |
| `04-homepage-spec.md` | Homepage, section by section, with the property card anatomy |
| `05-property-detail-spec.md` | Property detail page, section by section (Rukita rebuild) |
| `06-components-interactions.md` | Carousel, lightbox, tabs/scrollspy, modals, accordion, map interaction, toasts, accessibility |
| `07-whatsapp-maps-seo.md` | WhatsApp link builder and message templates, Google Maps embed and swap procedure, per-route SEO and link previews |
| `08-placeholders-and-open-items.md` | Every placeholder in the site, what the owner should put there, and unresolved questions |
| `09-tech-structure-deployment.md` | Folder structure, dependencies, scripts, GitHub Pages deployment, custom domain, SPA routing |
| `10-acceptance-checklist.md` | Final QA checklist. The build is not done until every item passes |

## 4. Golden rules (apply to the whole project)

1. **Never invent data.** Prices, room counts, facilities and POIs come only from `03-content-data.md`. Anything unknown is a **placeholder** (see rule 2).
2. **Placeholders must be obvious and easy to replace.** Use the `[ISI: ...]` text convention and the `isPlaceholder` flags defined in files 03 and 08. A script (`npm run check:placeholders`) must list every placeholder still left.
3. **All editable content lives in `src/data/`** (plain JavaScript objects). Components contain no hard-coded prices, names, numbers, links or copy about a specific property.
4. **Mobile first.** Design at 360 px width first, then enhance for tablet and desktop. The owner will use and share this mostly on phones. Every tap target is at least 44 × 44 px.
5. **No booking on the website.** No forms, no date pickers, no payment, no login. The only conversion action is opening WhatsApp.
6. **Never display parking details on the homepage.** Parking is shown only on property detail pages (see file 05). H14's basement parking is a *detail-page-only* highlight.
7. **Electricity is always shown as excluded** ("Listrik tidak termasuk, memakai token meter per kamar"). **AC and WiFi are shown as available at every property.**
8. **Deposit is shown as a disclaimer** (small note), not as a headline price.
9. **Prices are monthly only.** No weekly, daily or yearly pricing anywhere.
10. **Every property has its own working direct URL** (reload and share must work on GitHub Pages; see file 09).
11. **Unique facilities must be highlighted**, so a visitor immediately sees what makes each property different (rules in file 03, visuals in files 04 and 05).
12. **The Villa is "Under Construction":** greyed out, labelled "Under Construction", **no ribbon, no contact button, not clickable.**
13. **Look and feel follows Rukita** (primary guide). The Johan Property site and the ERA Indonesia site are secondary references. See file 02 for exactly which element comes from where.
14. **Do not copy Rukita or other brands' logos, images, copy text, promo codes, or flash-sale/discount mechanics.** Reproduce *layout and behavior*, not their branding or content.

## 5. Glossary

| Term | Meaning |
|---|---|
| Kost | Monthly-rental boarding house with private rooms |
| Tipe Kamar | Room type (Standard, Superior, Deluxe, Executive, Small) |
| Fasilitas | Facilities / amenities |
| Titik Lokasi | Location pin / map |
| POI (Point of Interest) | Nearby landmark (university, mall, hospital) |
| Fully furnished | Room comes with standard furniture; do not itemize it |
| Token meter | Prepaid electricity meter per room; electricity is **not** included in rent |
| Deposit | Refundable security deposit paid up front (amounts in file 03) |
| Placeholder | Temporary text or image the owner will replace later |
| Detail page | Per-property page, route `/<slug>` |

## 6. Reference sources used by this spec

- **Primary (layout and behavior of the detail page, overall design language):** Rukita property page, `https://www.rukita.co/place/rukita-twin-cube-tawakal-tomang`
- **Secondary (property card layout, WhatsApp button on cards, badges):** ERA Indonesia listing, `https://eraindonesia.com/properties?advanced=1&province=BANTEN&city=TANGERANG`
- **Secondary (homepage hero, featured card grid, benefits and map block, footer):** Johan Property, `https://www.johanproperty.com/`

Where two references disagree, **Rukita wins**, except where file 02 or 04 explicitly assigns an element to another reference.
