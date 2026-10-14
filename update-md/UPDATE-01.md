# UPDATE-01: First Major Update for the Homy Residence Website

## How to read this file (important)

- **This is a planning guide, not a blueprint.** It describes *what the owner wants* and *why*. **How to build it, the code structure, the visual design details, the libraries, the file names, and every creative decision are up to you, the AI agent.** Use your own judgment and taste; the site already has an established look, so keep it consistent.
- The website is **already built** from the original spec pack (`00-README.md` to `10-acceptance-checklist.md`). This file lists **changes to the existing site**. Where this file conflicts with the original pack, **this file wins**. Everything not mentioned here stays as it is.
- Wording used below:
  - **MUST** = a hard requirement from the owner (exact labels, exact data, exact behavior).
  - **Intent** = the reason behind a change, so you can make good decisions on your own.
  - **Your call** = explicitly left to you.
- UI language is **Indonesian**. This file is in English.
- If something in this file is ambiguous or seems wrong against the real codebase, **choose the option that best matches the stated intent**, and mention the decision in your final note to the owner.

---

## 1. Summary of changes

1. New **order of tabs and sections** on the property detail page; three old sections merge into Tata Tertib.
2. **"Fasilitas bersama" becomes "Fasilitas"** everywhere.
3. New approved **POI data** (4 unified categories, motorcycle minutes, Google Maps route links); the POI list is titled **"Point of Interest"** and lives under Lokasi.
4. **POI photos** from the `poi-assets` folder, resized and cropped uniformly.
5. **Real map pins** and location labels.
6. **Corrected room types** for all properties, now showing **room letters and totals**.
7. **Reduce repeated information** across the whole website and fill the freed space with other relevant information.

---

## 2. Detail page: tabs and section order

**MUST:** the tab bar and the page sections follow exactly this order and these labels:

| # | Tab label | Notes |
|---|---|---|
| 1 | **Foto** | Gallery, unchanged |
| 2 | **Fasilitas** | See sections 3 and 8 |
| 3 | **Kamar** | See section 7 (it now comes **before** Lokasi) |
| 4 | **Lokasi** | Map and address |
| 5 | **Point of Interest** | A tab of its own, but the content sits **inside the Lokasi block**, below the map and address |
| 6 | **Tata Tertib** | Rules plus the merged content below |
| 7 | **FAQ** | New tab |

- The sub-heading that is currently called **"Lokasi terdekat"** (or whatever the POI list is currently titled) **MUST** be renamed to **"Point of Interest"**.
- The "Visit Hunian" / "Jadwalkan Visit" block stays in the Lokasi area.
- The "Hubungi Tim Kami" button that currently sits in the tab bar (see the owner's screenshot) is removed.
- **Intent:** a cleaner, shorter tab bar in the order a prospective tenant actually thinks: photos, what's included, which room, where it is, what's nearby, the rules, questions. **Your call:** how the tab highlighting follows scroll, especially for the Lokasi and Point of Interest tabs that point into the same block; make sure the correct tab lights up and tapping each tab lands in the right place without being hidden under the sticky bars.

### Merged into Tata Tertib (owner decision: remove these tabs, keep the content)

The old sections **Aturan Tambahan Penghuni**, **Kebijakan Hunian** and **Tentang Hunian** no longer exist as separate sections. Their content moves into **Tata Tertib**, as clear blocks. It **MUST** cover: Tentang Hunian (short description), who may live there (penghuni), additional occupants, minimum stay, check-in/out, **deposit**, cancellation, 24-hour access, overnight guests, visitors, smoking, pets, and optional extra rules. Existing `[ISI: ...]` placeholders stay visible. **Your call:** the order and visual treatment of the blocks (keep the existing Tata Tertib style).

- Drop (do not merge) the "Listrik" line, the "Hubungi Tim Kami" link, and the "Landmark terdekat" list; they repeat other sections (see section 8).
- **Tentang Hunian** text becomes a **short (2-3 sentences) description of the property's character** (atmosphere, who it suits) and **must not** restate prices, room types, facilities, deposit, electricity or nearby places. Keep it as a placeholder with that instruction.

---

## 3. Rename

**MUST:** "Fasilitas bersama" becomes **"Fasilitas"** in the tab, the section heading, and anywhere else users can see or hear it (labels, tooltips, aria text). Leave the homepage strip "Fasilitas di Semua Hunian" as is.

---

## 4. Point of Interest

### 4.1 Rules (MUST)
- Use **only** the approved POIs in section 4.4 for each property. Do not mix POIs between properties, add, or remove any.
- Use the names **exactly as written** (for example **"Supermal Karawaci"** with one "l", **"MaxxBox Lippo Village"**). The earlier spelling "Supermall Karawaci" is retired.
- Each POI shows its **travel time by motorcycle** in the form **`🏍️ ~N min`**. Times are estimates, and the owner explicitly wants **no note or disclaimer** about busy hours or estimation.
- Each POI has a **"Rute"** link that opens Google Maps directions from the property pin to the POI in motorcycle mode, opening in a new tab. Pattern (use as-is):
  `https://www.google.com/maps/dir/?api=1&origin=<propertyLat>,<propertyLng>&destination=<poiLat>,<poiLng>&travelmode=two-wheeler`
  Keep coordinates as the exact strings below (including trailing zeros) so the URLs are identical to the owner's source file. Verify this for every POI.
- The old **km distances** and the `-- km` placeholders are removed.
- Each POI shows a **photo** (section 5), its name, the time, and the Rute link.

### 4.2 Unified categories (owner: make it consistent)
Same four categories, labels and order for every property: **Universitas, Mall, Supermarket, Rumah Sakit**.
"Supermarket / Swalayan" in the source becomes **Supermarket**; "Medical" and "Hospital" become **Rumah Sakit** (so "Ubaya Medical Center" and "RS Ubaya" are both Rumah Sakit). Within a category, order by minutes ascending. Keep the existing category-tab behavior of the POI component. **Your call:** layout and styling of the POI items (it must be excellent on mobile; the owner uses a phone most).

### 4.3 Property pins (origin of every route)

| Property | Slug | Latitude | Longitude |
|---|---|---|---|
| Homy Residence H14 | `h14` | -7.321895 | 112.764931 |
| Homy Permata A7 | `a7` | -6.228501 | 106.586875 |
| Homy Budget Alamanda | `alamanda` | -6.223237 | 106.604628 |
| Homy Parahyangan | `parahyangan` | -6.226586 | 106.583741 |

### 4.4 Approved POIs (minutes by motorcycle) and POI coordinates

| POI (exact name) | Category | Latitude | Longitude | H14 | A7 | Alamanda | Parahyangan |
|---|---|---|---|---|---|---|---|
| Universitas Surabaya (UBAYA) | Universitas | -7.320103 | 112.767937 | 3 | | | |
| Universitas Pramita Indonesia | Universitas | -6.234057 | 106.585048 | | 4 | 12 | 4 |
| UPH College | Universitas | -6.228131 | 106.611514 | | 12 | 5 | 14 |
| Universitas Pelita Harapan (UPH) | Universitas | -6.228373 | 106.611269 | | 12 | 5 | 14 |
| Transmart Rungkut | Mall | -7.320790 | 112.770455 | 4 | | | |
| Plasa Marina Surabaya | Mall | -7.315908 | 112.748364 | 10 | | | |
| Trans Icon Mall | Mall | -7.338686 | 112.728729 | 18 | | | |
| Supermal Karawaci | Mall | -6.226553 | 106.607182 | | 10 | 3 | 12 |
| MaxxBox Lippo Village | Mall | -6.229035 | 106.606565 | | 10 | 4 | 12 |
| Alfamidi Rungkut | Supermarket | -7.320799 | 112.765884 | 2 | | | |
| Indomaret Raya Tenggilis | Supermarket | -7.320193 | 112.761470 | 3 | | | |
| Palapa Swalayan | Supermarket | -7.320016 | 112.755907 | 5 | | | |
| Chicco Swalayan | Supermarket | -7.320566 | 112.754737 | 6 | | | |
| Indomaret Taman Permata | Supermarket | -6.227609 | 106.582488 | | 3 | | 2 |
| Alfamart Permata Raya | Supermarket | -6.224280 | 106.591463 | | 4 | | 5 |
| Indomaret Harapan Kita | Supermarket | -6.219865 | 106.601546 | | | 3 | |
| Ubaya Medical Center | Rumah Sakit | -7.319365 | 112.766945 | 3 | | | |
| RS Ubaya | Rumah Sakit | -7.314191 | 112.765751 | 5 | | | |
| Siloam Hospitals Lippo Village | Rumah Sakit | -6.225462 | 106.598768 | | 7 | 4 | 8 |

(An empty cell means that POI does **not** belong to that property.)

Example check: for A7 → UPH College the route URL must be
`https://www.google.com/maps/dir/?api=1&origin=-6.228501,106.586875&destination=-6.228131,106.611514&travelmode=two-wheeler`.

**Your call:** data structure (a shared POI catalog is recommended since many POIs appear at several properties), and how the list is built from it.

---

## 5. POI photos from `poi-assets`

- The website folder contains a folder named exactly **`poi-assets`** holding the photos for **all POIs of all properties** (including the convenience stores). You have access to it.
- The photos have **different sizes and aspect ratios**, so they must be processed. **MUST:**
  - Match each photo to its POI by file name (expect spelling variants and extra suffixes; the longest, most specific match wins, so "UPH College" is never mistaken for "UPH"). **Do not guess** when a match is unclear; leave a placeholder and report it.
  - Resize and **crop every photo to the same 4:3 ratio** around a **focal point** so the POI itself (building, entrance, signboard, storefront) stays visible. The default focal point can be the center (slightly upper for portrait photos), but you should **look at each result** (if you can view images) and adjust the focal point of any photo where the subject is cut off. Make the focal point easy for the owner to adjust later.
  - **Never modify or delete the originals.** Write the processed images to a new location that the site serves, and commit them so deployment does not depend on the raw folder.
  - Reuse one processed photo per POI wherever that POI appears (do not duplicate per property).
  - Fall back to the standard placeholder if a photo is missing.
- Suggested output: WebP, about 800×600 for the main image and about 400×300 for small thumbnails (feel free to choose better numbers).
- Produce a short **report** (not deployed) listing: matched files, unmatched files, POIs without a photo, and photos that needed a heavy crop. Mention it in your final note.
- **Your call:** the tooling (for example the `sharp` library), script naming, and file naming.

---

## 6. Map pins and location labels

**MUST:**
- Replace every placeholder pin with the owner's coordinates (section 4.3). The map must pin that exact point; the "Pin sementara" chip disappears. "Buka di Maps" opens the owner's pin link: `https://www.google.com/maps/search/?api=1&query=<lat>,<lng>`.
- Fill the `locationLabel` shown on cards and the detail header:

| Property | Location label |
|---|---|
| Homy Residence H14 | **Kalirungkut, Surabaya** |
| Homy Permata A7 | **Taman Permata, Binong, Tangerang** |
| Homy Budget Alamanda | **Lippo Karawaci, Tangerang** |
| Homy Parahyangan | **Taman Parahyangan, Binong, Tangerang** |

- Full street addresses remain placeholders (`[ISI: ...]`) until the owner provides them.
- **H14 is in Surabaya** (this resolves the earlier open question).

---

## 7. Room types (corrected data and new display)

### 7.1 Authoritative data (replaces all earlier room data)

**Homy Residence H14: total 18 rooms**

| Type | Rooms | Count | Price per month | Bathroom |
|---|---|---|---|---|
| Standard | B – Q | 16 | Rp1.700.000 | Dalam |
| Superior | R | 1 | Rp1.850.000 | Dalam |
| Executive | A | 1 | Rp2.500.000 | Dalam |

**Homy Parahyangan: total 14 rooms**

| Type | Rooms | Count | Price per month | Bathroom |
|---|---|---|---|---|
| Small | L | 1 | Rp1.200.000 | Luar |
| Standard | E – K, M, N (room L is excluded; L is Small) | 9 | Rp1.450.000 | Luar |
| Superior | A – D | 4 | Rp1.650.000 | Dalam |

The Small room has the **same facilities** as the others (AC, WiFi, fully furnished, water heater, free laundry); the **only difference is the bathroom outside**.

**Homy Budget Alamanda: total 40 rooms**

| Type | Rooms | Count | Price per month | Bathroom |
|---|---|---|---|---|
| Standard | all rooms (no letters; show as "Semua kamar") | 40 | Rp1.000.000 | Luar |

**Homy Permata A7: total 18 rooms**

| Type | Rooms | Count | Price per month | Bathroom |
|---|---|---|---|---|
| Standard | A, B, C, D, H, I, J, K, Q | 9 | Rp1.700.000 | Dalam |
| Superior | E, F, M, P | 4 | Rp1.900.000 | Dalam |
| Deluxe | L, Fanta | 2 | Rp2.000.000 | Dalam |
| Executive | G, N, O | 3 | Rp2.500.000 | Dalam |

**Fanta is a Deluxe room only.** Counts must add up to each property's total (H14 18, Parahyangan 14, Alamanda 40, A7 18).

### 7.2 Display (MUST; this reverses the earlier rule of hiding room letters and counts)
- Each room type card shows the **type name**, the **number of rooms of that type** and the **room letters/names** (for example "9 kamar" and "Kamar A, B, C, D, H, I, J, K, Q"; ranges like "Kamar B – Q"; "Kamar L, Fanta"; "Semua kamar" for Alamanda), plus the price and the existing "Book Now" action.
- The Kamar section shows the property's **total rooms** once (for example "Total 18 kamar").
- Rooms stay sorted by ascending price.
- **Your call:** the exact visual design of the room cards and how the letters and counts are presented so they are clear and not cluttered.

### 7.3 Facilities that differ between room types
Describe each facility **once**, where it belongs:
- Facilities that are the **same for every room type** of a property (AC, WiFi, fully furnished, bathroom when it is the same everywhere, water heater, free laundry, parking, washing machine, electricity token) are shown **only in the Fasilitas section**.
- Facilities that **differ between room types** are shown **only on the room cards**. Currently that is only Parahyangan's bathroom (Superior = Kamar Mandi Dalam; Standard and Small = Kamar Mandi Luar), so Parahyangan's Fasilitas section no longer lists either bathroom type. For A7, H14 and Alamanda the room cards carry no facility chips.

---

## 8. Remove repeated information across the whole website

**Why:** the owner noticed that a homepage card shows information and the detail page opened from that card shows the **same information again**, and similar repetition inside the detail page. **Goal:** every fact has **one home**; use the freed space for other relevant information. Apply this to the **entire website**, including places not listed below if you find more.

### 8.1 The principle
1. A fact appears **once per page**, in the place where it belongs.
2. A homepage card is a **teaser**: it must not be duplicated block-for-block on the detail page. Only the page identity (property name, location label) and the price call-to-action naturally repeat.
3. A section that only restates other sections should be removed or filled with new information.
4. Shared sentences (like the electricity note) are rendered in exactly one place per page.

### 8.2 What is repeated today and where it should live

| Fact | Single home after the update | Remove from |
|---|---|---|
| AC, WiFi | Homepage: the "Fasilitas di Semua Hunian" strip. Detail page: the Fasilitas section | Card icon row, room card chips, FAQ, any popup |
| Electricity excluded (token meter) | Homepage: the strip. Detail page: the electricity row in Fasilitas | Card line, price card lines, Kamar subtitle and notes, room cards, Kebijakan, FAQ |
| Deposit | Detail page: Tata Tertib ("Deposit") only | Room cards, FAQ |
| "Harga per bulan" lines | The "/bulan" next to each price is enough | Price card, Kebijakan |
| Highlights / unique facilities | Card: up to 2 highlight chips (homepage). Detail: the small "Unggulan" marker on the facility row | Detail header chips, the separate "Fasilitas unggulan" block |
| "Kost" label and total rooms | Card: kind badge. Detail: "Total N kamar" in Kamar | Detail header type row |
| Number of room types / facilities | Visible in the sections themselves | Card stat row ("N Tipe Kamar", "N Fasilitas") |
| Room types and prices | Detail: Kamar. Card: "Mulai dari" price | FAQ, About text |
| Nearby places | Detail: Point of Interest only | "Landmark terdekat" list in the old About section, FAQ |
| Parking | Detail: one row in Fasilitas, with H14's detail text inline | Separate "Parkir" block. Parking must still **never** appear on the homepage |
| Property name | The h1 | Mobile top bar pill should not print the name a second time while the h1 is on screen (a title that appears once the h1 scrolls away is a good pattern; your call) |
| "Dikelola oleh Homy" banner | n/a (carries no information) | Remove |
| Room "Lihat Detail" popup | The room card itself already carries the information | Remove the popup; tapping a room photo should open the existing photo viewer (lightbox) |
| WhatsApp buttons | Fewer, each with a purpose | Homepage hero "Book Now"; tab-bar "Hubungi Tim Kami"; FAQ "Hubungi Kami"; the link in the old Aturan Tambahan. Keep: header "Book Now" on desktop, floating button on mobile/tablet (avoid showing both at once), the help band, per-card and per-room "Book Now", the price card/bottom bar, and "Jadwalkan Visit" |

### 8.3 What goes into the freed space (relevant, new, not repeated)
- **Homepage card:** one **nearest-campus line**, for example `🏍️ ~4 min ke Universitas Pramita Indonesia`, taken from the property's POI data (the Universitas POI with the fewest minutes). It replaces the removed stat/icon rows. Keep: media carousel, kind badge, name, location label, up to 2 highlight chips, "Mulai dari" price (without the electricity line), and the two buttons. Highlight labels must not repeat the price (see 8.4).
- **Room cards:** room letters and counts (section 7).
- **Kamar header:** total rooms.
- **POI:** photos and Rute buttons.
- **FAQ:** new questions only (8.5).
- **Tata Tertib:** all policy content in one place.
- H14's basement-parking highlight stays **off the homepage card** (parking is never shown on the homepage).
- Compact "Hunian Homy Lainnya" cards: photo, name, location label and "Mulai dari" price only.

### 8.4 Highlight wording (they must not repeat the price)

| Property | Card highlights (max 2) | Detail-page "Unggulan" marker |
|---|---|---|
| A7 | "4 tipe kamar, termasuk Deluxe" · "Kamar mandi dalam + water heater di semua kamar" | none |
| H14 | "Kamar mandi dalam + water heater di semua kamar" (the basement parking highlight is **not** shown on the card) | Parkir basement row |
| Parahyangan | "Ada tipe Small, pilihan paling hemat" | none |
| Alamanda | "Mesin cuci tersedia di lantai 4" · "Pilihan paling hemat" | Mesin cuci row |

### 8.5 FAQ (replace the generated FAQ; the same five questions for every property)
The FAQ must contain information that is **not stated anywhere else** on the page. Heading stays "Pertanyaan yang sering ditanyakan di {name}". Questions and answers:

1. **Bagaimana cara booking?** "Klik tombol "Book Now" untuk chat langsung dengan tim kami via WhatsApp. Proses booking dan konfirmasi kamar dilakukan di WhatsApp, bukan di website ini."
2. **Apakah bisa melihat kamar dulu sebelum menyewa?** "Bisa. Gunakan tombol "Jadwalkan Visit" di bagian Lokasi untuk mengatur jadwal kunjungan lewat WhatsApp."
3. **Bagaimana cara pembayaran sewa?** `[ISI: metode dan jadwal pembayaran, contoh: transfer bank, dibayar di awal bulan]`
4. **Apakah masa sewa bisa diperpanjang atau pindah kamar?** `[ISI: aturan perpanjangan sewa dan pindah kamar]`
5. **Jam berapa tim bisa dihubungi?** `[ISI: jam operasional balasan WhatsApp, contoh: setiap hari 08.00-21.00]`

**Your call:** every visual and structural decision needed to apply the principle cleanly (what the cards look like after the cleanup, spacing, how sections breathe once repeated blocks are gone).

---

## 9. Things you decide (the owner trusts your judgment)

- Architecture, data structures, component boundaries, naming, file organization, and tooling for all of the above.
- Visual design and micro-interactions for the new POI items, room cards, cards after cleanup, and the collapsing mobile title. Keep the established look and feel (Rukita-inspired, mobile first, accessible).
- Scroll-highlighting logic of the tab bar.
- Any improvement that clearly serves the stated intent, as long as it does not contradict a **MUST** in this file.

## 10. Earlier rules that this update changes

- Detail section list and order (Aturan Tambahan, Kebijakan, Tentang removed as sections; FAQ gets a tab; Kamar before Lokasi).
- POI data, categories, time format (minutes instead of km), "Rute" links, and the photo set.
- Map placeholders replaced by real pins; location labels filled.
- Room data; room letters and counts now **shown** (previously hidden); the room popup removed.
- Header blocks, price card lines, FAQ content, and WhatsApp button placement (section 8).
- Earlier open questions now **resolved**: H14 is in Surabaya; Parahyangan has 14 rooms; the Small room has the same facilities with bathroom outside.

**Still open (unchanged placeholders):** H14 car-parking fee period, house rules and gender policy, room sizes and occupancy notes, full addresses, villa details, and the three `[ISI: ...]` FAQ answers above.

---

## 11. Acceptance checklist

**Order and naming**
- [ ] Tab bar: exactly Foto, Fasilitas, Kamar, Lokasi, Point of Interest, Tata Tertib, FAQ; page sections in the same order; Kamar above Lokasi.
- [ ] No "Fasilitas bersama" text remains anywhere users can see.
- [ ] Aturan Tambahan Penghuni, Kebijakan Hunian and Tentang Hunian no longer exist as sections; their content is inside Tata Tertib; the correct tab highlights while scrolling (including Lokasi vs Point of Interest).

**POI and photos**
- [ ] The POI sub-heading is "Point of Interest" and sits under Lokasi.
- [ ] Each property shows exactly its approved POIs with exact names, in the four unified categories, with `🏍️ ~N min`, a photo and a "Rute" link; no km values, no busy-hours note.
- [ ] Every "Rute" URL matches the pattern and coordinates in section 4 exactly and opens in a new tab.
- [ ] POI photos come from `poi-assets`, are uniformly 4:3, show the POI clearly, originals untouched, one processed photo reused per POI, report produced.

**Maps**
- [ ] Each map pins the owner's coordinates; no "Pin sementara" chip; location labels updated.

**Rooms**
- [ ] All four properties match the data in section 7.1 (types, letters, counts, prices, bathrooms, totals); Fanta appears only under Deluxe.
- [ ] Room cards show type, count, letters, price and "Book Now"; the Kamar section shows the total once; no room popup exists.
- [ ] Parahyangan's bathroom difference appears only on room cards; other room cards show no repeated facility chips.

**Repetition**
- [ ] The homepage card has no stat/icon rows or electricity line and has the nearest-campus line; highlights follow 8.4.
- [ ] The detail header shows only the name and location label.
- [ ] AC, WiFi and the electricity note appear once on the homepage and once on each detail page; the deposit appears once on the detail page; parking never appears on the homepage.
- [ ] FAQ matches 8.5; WhatsApp buttons follow 8.2.
- [ ] No other obvious repeated information remains across the website.

**Quality**
- [ ] Build succeeds, no console errors, mobile (360 to 412 px) and desktop verified, no horizontal scroll.
- [ ] Final note to the owner lists: unmatched or heavily cropped POI photos, remaining placeholders, and every judgment call you made.
