# UPDATE-03: Addresses, Font Experiment, Kost Type Labels, Footer Removal, Homepage Redesign

> **Revision 1:** the kost type labels were corrected by the owner. **Homy Residence H14 and Homy Budget Alamanda are "Kost Putri"; Homy Parahyangan and Homy Permata A7 are "Kost Campur".** This replaces the earlier assumption that all four were Kost Putri. See section 3.

## How to read this file

- **This is a planning guide, not a blueprint.** It tells you *what the owner wants* and *why*. **How to build it, the code, the exact layout math, the animation details and every creative decision are up to you, the AI agent.** The owner trusts your judgment; use your own taste and engineering skill, and keep the result mobile-first, clean and consistent with the existing site.
- The site is already built and running (original spec pack plus Update 01, and the owner has already applied an Update 02 by himself, which you should treat as part of the existing site). This file lists **changes to the existing site**. Anything not mentioned stays exactly as it is.
- **MUST** = a hard requirement from the owner (exact text, exact data, exact behavior). **Intent** = why, so you can decide well. **Your call** = left to you.
- UI language is Indonesian. This file is in English.
- If something is ambiguous against the real codebase, pick what best serves the stated intent and mention the decision in your final note.

## Summary of changes

1. Real **addresses** under the maps of the four kost.
2. **Font experiment:** the whole website switches to **Josefin Sans**; the logo text uses **Nura**. The original fonts must be recorded first so the owner can go back.
3. Each of the four property cards states its kost type: **"Kost Putri"** or **"Kost Campur"**.
4. The **footer is removed** everywhere.
5. The **homepage hero is redesigned** after the owner's reference, with a big "HOMY RESIDENCE" headline.

Suggested order: (a) record the current fonts and layout, (b) fonts, (c) homepage redesign + footer removal, (d) addresses and kost type labels, (e) checks.

---

## 1. Addresses (MUST: exact text)

Replace **only** the address placeholder shown in the address panel **under the interactive map** on each property page. Copy the text exactly as written. Do not change map pins, "Buka di Maps" links, location labels, or any other placeholder.

| Property | Address |
|---|---|
| Homy Budget Alamanda | Jl. Alamanda IV Blok J.3 No.13, RT.7/RW.7, Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810 |
| Homy Parahyangan | Jl. Taman Parahyangan I No.88, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810 |
| Homy Permata A7 | Jl. Permata Sari sektor 5 Blok A7 No.33, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810 |
| Homy Residence H14 | Jl. Rungkut Mejoyo Selatan IX No 15 Blok H14, Kali Rungkut, Kec. Rungkut, Surabaya, Jawa Timur 60293 |

---

## 2. Font experiment

### 2.1 Record the original first (MUST)
**Before changing any font**, document the current state in a file in the project root (for example `FONT-AND-LAYOUT-BEFORE-UPDATE-03.md`, not deployed). It must capture:
- **Fonts, per section and component of the whole website** (header, hero, section titles, property cards, detail page sections, tabs, buttons, chips, prices, FAQ, floating button, etc.): font family, weight, style (regular/italic), size, line-height, letter-spacing, plus how the font is loaded and the fallback stack.
- A short description of the **current homepage hero and the current footer** (structure and key styles; reference screenshots `home.png` and `footer.png`).

**Intent:** this experiment may not be liked. The owner does **not** want a branch-based rollback; he wants the original fonts remembered precisely so that, if he asks, you can restore them. **Rollback scope = only the Josefin Sans switch** (the other changes in this file stay regardless). The Nura logo stays either way.

### 2.2 Josefin Sans everywhere (MUST)
- Change the overall website font to **Josefin Sans** (all text: headings, body, buttons, chips, prices, tabs, FAQ, forms of any kind, etc.), **except** the logo text described in 2.3.
- **Your call:** where to use bold, semi-bold, regular, italic, etc. Decide weights and styles per element so hierarchy stays clear and readable (Josefin Sans has a distinctive geometric look and small x-height, so adjust sizes, line-heights and letter-spacing where needed to keep text comfortable on mobile). Make sure prices, distances and numbers remain easy to read and aligned.
- Load it in the way you judge best for performance (self-hosting is fine); set a sensible fallback stack. Keep Indonesian characters rendering correctly.

### 2.3 Logo text in Nura (MUST)
- The words **HOMY RESIDENCE** use the **Nura** font, **all uppercase** (Nura has no lowercase letters).
  - **HOMY** → **Nura Black**
  - **RESIDENCE** → **Nura Extra Light**
- This applies to **both** places the owner circled in his screenshot: the **header logo** (top left) and the **hero headline** (new, section 5). **Only the logo text changes to Nura; the rest of the site uses Josefin Sans.**
- The font files are placed by the owner in the project folder named **`font`** (an open-licensed font). Inspect that folder, find the Black and ExtraLight files, and wire them up (convert or subset to web-friendly formats if useful). If a file is missing or the weights aren't there, don't guess; stop and tell the owner exactly what is missing and use a sensible temporary fallback.
- Keep the two weights clearly distinguishable, and make the wordmark look balanced (spacing between HOMY and RESIDENCE, letter-spacing). Where the logo appears small (header), make sure the Extra Light part stays legible.

---

## 3. Kost type labels: "Kost Putri" or "Kost Campur" (MUST)

The correct type of each property (owner-confirmed):

| Property | Kost type |
|---|---|
| Homy Residence H14 | **Kost Putri** |
| Homy Budget Alamanda | **Kost Putri** |
| Homy Parahyangan | **Kost Campur** |
| Homy Permata A7 | **Kost Campur** |

- On each of the **four open property cards** on the homepage, the kind badge currently reading **"Kost"** becomes that property's type from the table above (**"Kost Putri"** or **"Kost Campur"**), so visitors immediately know who the kost is for. The Villa card is unchanged.
- On each property page, in **Tata Tertib → "Penghuni"**, replace the occupant-policy placeholder with the property's type:
  - Kost Putri properties (H14, Alamanda): **"Kost Putri (khusus putri)"**
  - Kost Campur properties (Parahyangan, A7): **"Kost Campur (putra dan putri)"**
- Keep the type in the property data (one field per property) so it can be changed in one place.
- **Your call:** anywhere else it would naturally help and not repeat information unnecessarily (for example the per-property SEO description), as long as it follows the "say it once" spirit of Update 01 and uses the correct type for each property.

---

## 4. Remove the footer (MUST)

- Remove the **footer section** from the website, on **desktop and mobile**, on **every page** (homepage, property pages, 404). See the owner's `footer.png` for what is being removed (brand blurb, property links, contact column).
- **Nothing moves elsewhere.** The WhatsApp access stays through the existing "Book Now" buttons and the floating WhatsApp button.
- Clean up everything that only existed for the footer (component, styles, `#kontak` anchor, related data fields that become unused if safe to remove).
- The **"Kontak" item in the header menu stays**, but it now **scrolls/links to the "Bingung pilih kamar?" section** (the help band) on the homepage. From other pages it should take the visitor to that section on the homepage. **Your call:** how.
- Make sure pages still end cleanly and nothing is hidden behind the mobile bottom action bar or floating button once the footer is gone.

---

## 5. Homepage redesign (hero)

### 5.1 Reference
The owner's reference is the file **`home_references.png`** (a luxury-apartments website). If you don't have access to the image, ask the owner for it. Described in words so you can interpret it:
- A **light, airy page** with a **small logo at the top left**, a **floating pill-shaped menu in the center** (white, soft shadow, the active item highlighted inside the pill), and small round icons at the top right.
- A **soft, blurred multi-color gradient glow** behind the headline.
- A **huge, centered, two-line headline**, then a **small subtitle**, then a **dark pill button with a small circular arrow icon** at its right edge.
- At the bottom of the first screen, a **row of five tall, rounded photos arranged along a gentle curve** (the outer photos sit higher and are partly cut off by the screen edges; the middle photo is lowest), giving a curved "arc" gallery feel.

The owner wants this layout **replicated for the Homy homepage hero**, using Homy's content and brand. **Do not copy the reference's serif headline, wording, photos or logo.**

### 5.2 What the Homy hero must contain (MUST)
- **Headline: "HOMY RESIDENCE"** (replacing the reference's "Where luxury meets serenity"), in the Nura fonts of section 2.3: **HOMY** in Nura Black and **RESIDENCE** in Nura Extra Light, all uppercase. On desktop, use the reference's **two-line arrangement** (HOMY on the first line, RESIDENCE on the second). **Make the size big and proportional** to the screen, as in the reference. This is the page's `h1`.
- **Floating pill menu** (center, desktop): Properti, Fasilitas, Kontak (existing items; "Kontak" behaves per section 4). The **green "Book Now" button stays on the right**, where the reference has its icons. The logo stays on the left (Nura, section 2.3).
- **Subtitle** under the headline: use the existing tagline placeholder text (it stays an `[ISI: ...]` placeholder).
- **Button label: "Lihat Property"** (exact text from the owner; the previous label was "Lihat Properti"). Dark pill button with a **circular arrow icon** like the reference; it scrolls to the property cards. *(Note for the final message to the owner: the label is spelled "Property", as written by him; the rest of the site uses "Properti".)*
- **Glow:** the soft gradient behind the headline, **adapted to the Homy brand colors** (greens and warm sand) instead of the reference's green/yellow/pink. **Your call:** exact colors and blur, as long as it looks refined and keeps text readable.
- **Curved photo row with five placeholders** (no real pictures yet): five tall rounded placeholder cards (use the site's existing placeholder style with a label such as "Foto Hero 1" to "Foto Hero 5"), arranged on a gentle curve as in the reference. They are **decorative for now** (not links); the owner will send photos later, so **make it easy to swap in real images** (a simple list of image paths is enough). **Your call:** how to achieve the curved arrangement and whether to add subtle motion; keep it performant and respect reduced-motion preferences.

### 5.3 What is removed from the old hero
The old hero content is replaced: the old two-column layout, the "KOST & VILLA" eyebrow, the old headline treatment, the long placeholder paragraph, and the big single hero photo card. (If you think a small piece of the old content still fits the new design, that's your call; the redesign should look like the reference.)

### 5.4 Mobile (MUST: adapted, not removed)
- The photo row **stays on mobile** (the owner changed his mind about removing it). **Adapt it** so it looks good and proportional on phones (360 to 430 px wide): for example a smaller arc or a layout that fits the narrow width. **Your call.**
- The headline stays big and proportional on mobile (it can break onto two lines the same way), the subtitle and "Lihat Property" button stay centered, and the menu follows the site's existing mobile pattern (the floating pill menu is a desktop element; choose what works best on mobile and keep a way to reach Book Now).
- No horizontal page scroll; the first screen should feel intentional on a phone.

### 5.5 Everything else on the homepage stays
Property cards (with their Kost Putri / Kost Campur badge), the "Fasilitas di Semua Hunian" strip, the "Bingung pilih kamar?" help band, the floating WhatsApp button and all behaviors from earlier updates remain unchanged (except the footer removal).

---

## 6. Acceptance checklist

**Addresses**
- [ ] Each of the four property pages shows its exact address in the panel under the map; nothing else about the maps changed.

**Fonts**
- [ ] A record of the original fonts per section (and of the old hero and footer) exists in the project root, created **before** any change.
- [ ] The whole site uses Josefin Sans (no leftover old fonts), with sensible weights and styles; numbers and prices remain clear; mobile text is comfortable.
- [ ] Header logo and hero headline use Nura: HOMY in Black, RESIDENCE in Extra Light, all uppercase; nothing else uses Nura.
- [ ] If the owner later asks, the original fonts can be restored from the record (Josefin rollback only; Nura stays).

**Kost type labels**
- [ ] H14 and Alamanda cards show "Kost Putri"; Parahyangan and Permata A7 cards show "Kost Campur"; the villa card is unchanged.
- [ ] Each property page's Tata Tertib → Penghuni matches its type: "Kost Putri (khusus putri)" for H14 and Alamanda, "Kost Campur (putra dan putri)" for Parahyangan and A7.
- [ ] No property shows the wrong type anywhere (cards, property pages, SEO text).

**Footer**
- [ ] No footer on any page, desktop or mobile; no unused footer code or anchors remain.
- [ ] The "Kontak" menu item leads to the "Bingung pilih kamar?" section.
- [ ] Nothing is covered by the floating button or mobile action bar at the end of pages.

**Homepage hero**
- [ ] Desktop hero follows the reference: floating pill menu, brand-colored glow, big two-line "HOMY RESIDENCE" headline, subtitle placeholder, dark "Lihat Property" button with circular arrow, curved row of five placeholder photos.
- [ ] Mobile hero is adapted, proportional, includes the photo row, and has no horizontal scroll.
- [ ] The button scrolls to the property cards; Book Now remains reachable.
- [ ] Swapping in real hero images later is simple.

**Quality**
- [ ] Build succeeds, no console errors, layouts verified at mobile (360 to 430 px), tablet and desktop widths.
- [ ] Final note to the owner lists: any missing font files, the "Lihat Property" spelling, and every judgment call you made.
