# UPDATE-06 — Homy Residence

You have full access to the project folder. Read the existing code first, and read `UPDATE-04.md`, `UPDATE-04-PROGRESS.md` and `UPDATE-05.md` (and their progress files, if present) to see how Tata Tertib, photos, the WhatsApp helper, the Toast and the room cards were built. Follow the current structure, naming and styling. Change only what this update asks for. Do not redesign anything or add features that are not listed here.

---

## Ground rules

- **Keep the existing design.** Reuse existing components (for example the existing Toast, buttons, chips and icon set) wherever possible.
- **Do not compress, resize, rename or convert any image.** Use images exactly as they are.
- **File paths are case-sensitive on GitHub Pages.** Every image and video path must match the real filename exactly, including the capitalization of the extension. Folder names may differ in case from what is written in this file (for example `PARAHYANGAN` vs `Parahyangan`, `small` vs `Small`): find them **case-insensitively**, then use the real names in the paths. If a name contains spaces or special characters, make sure the path works in the browser (URL-encode if needed).
- **Ignore non-media files** such as `.DS_Store`, `Thumbs.db`, `desktop.ini`.
- **Photo order:** the owner names photo files with numbers. Always use **numeric natural order** (`2` before `10`).
- **Do not guess:** if a folder or file cannot be matched with confidence, leave that item unchanged and list it in your report.
- **Refer to rules by their wording, not by number.** Rule numbers differ per property (the parking rule exists only for H14, so numbers shift by one). Numbering must stay automatic (ordered list) and must never be typed by hand.
- When you finish, give me the report described at the end of this file.

---

## Task 1 — Tata Tertib changes

The Tata Tertib text (from Update 04) stays exactly as it is **except** for the changes below. The deposit line above the rules (Update 05) stays. Copy all new Indonesian text **exactly** as written here.

### 1.1 New and changed rules

**A. AC cleaning rule — new, all four properties**
> AC dibersihkan oleh pemilik kos setiap 8 bulan sejak tanggal pembersihan terakhir, berdasarkan permintaan (request) penyewa. Jika tidak ada permintaan, AC tidak dibersihkan. Jika permintaan diajukan sebelum 8 bulan sejak pembersihan terakhir, biaya pembersihan ditanggung sendiri oleh penyewa.

**B. Appliance and bathroom responsibility — new**

*For Homy Parahyangan and Homy Budget Alamanda (two separate rules, in this order):*
> Seluruh peralatan (appliance) di dalam kamar adalah tanggung jawab penyewa, bukan pemilik kos. Contohnya bola lampu dan baterai remote: jika mati atau habis, penyewa menggantinya sendiri.

> Untuk kamar dengan kamar mandi dalam, seluruh peralatan dan sanitary di kamar mandi adalah tanggung jawab penyewa jika rusak. Untuk kamar mandi luar atau fasilitas bersama, perbaikannya adalah tanggung jawab pemilik kos.

*For Homy Permata A7 and Homy Residence H14 (one rule only, because all their bathrooms are inside):*
> Seluruh peralatan (appliance) di dalam kamar dan kamar mandi dalam, termasuk sanitary kamar mandi (seperti shower head dan lain-lain), adalah tanggung jawab penyewa jika rusak. Contohnya bola lampu dan baterai remote: jika mati atau habis, penyewa wajib menggantinya sendiri.

**C. Move-out rule — new**

*For Homy Permata A7, Homy Residence H14 and Homy Parahyangan:*
> Penyewa yang ingin keluar wajib melakukan pembayaran terakhir pada tanggal 1, disertai catatan (notes) saat pembayaran bahwa akan keluar pada akhir bulan, serta menginformasikan hal tersebut ke nomor 081311654066.

*For Homy Budget Alamanda (its payments are not on the 1st):*
> Penyewa yang ingin keluar wajib melakukan pembayaran terakhir pada tanggal jatuh tempo, disertai catatan (notes) saat pembayaran bahwa akan keluar pada akhir periode sewa tersebut, serta menginformasikan ke nomor 081311654066.

**D. Homy Budget Alamanda only — changed rules**
- **Payment rule** (the one currently starting "Pembayaran uang kost setiap tanggal 1…") becomes:
  > Pembayaran uang kost dilakukan setiap tanggal jatuh tempo pembayaran masing-masing penyewa. Akan diberikan tenggang waktu maksimal 10 hari sejak tanggal jatuh tempo. Jika lebih dari 10 hari, akan dikenakan denda sebesar Rp. 10.000/hari.
- **Free laundry rule** (the one starting "Penyewa yang include free laundry…") is **replaced** (same position) by:
  > Jika ingin mencuci, tersedia mesin cuci di lantai 4.
  Do not say that it is paid.
- **Remove** the rule "Dilarang menggunakan mesin cuci untuk keperluan pribadi." (it contradicts the washing machine on floor 4).
- **Remove** the rule starting "Untuk menjaga kebersihan kamar mandi dalam…" (all Alamanda bathrooms are outside).

**E. Rules that stay unchanged for every property**
- The rule "Bola lampu, baterai remot jika habis menjadi tanggung jawab penyewa kost. (Permulaan kost bola lampu, baterai akan disediakan oleh pemilik kost)" **stays exactly as it is** (it records that the owner provides them at the start). The new appliance rules do not replace it.
- All other rules, including the H14-only parking rule, stay as they are.

### 1.2 Where the new rules go

- **AC rule + appliance rule(s):** one **consecutive block in the middle of the list**, clearly not at the top and not at the bottom (the block starts around the middle number of the property's final list). Order inside the block: the AC rule first, then the appliance rule(s). The existing rules after the block shift down automatically.
- **Move-out rule:** right **after the payment rules** (after the rule saying payment stays full even in holiday months), since it belongs with them.
- Numbering is generated automatically (ordered list), always 1…N with no gaps.

### 1.3 Expected totals (use to verify)

| Property | Final number of rules |
|---|---|
| Homy Permata A7 | 23 |
| Homy Residence H14 | 24 |
| Homy Parahyangan | 24 |
| Homy Budget Alamanda | 22 |

### 1.4 Implementation note (your call)
Keep the rules stored **once** with per-property variants, exclusions and replacements (as Update 04 did for the parking rule), not copied into each property. Keep the data easy to edit later.

### Done when
- Each property shows the right rules, text, order and total above, with correct automatic numbering.
- The Alamanda page has no "mesin cuci pribadi" rule, no inside-bathroom cleaning rule, no "free laundry" rule, and uses the due-date payment and move-out wording.

---

## Task 2 — Clickable account number and phone number

### 2.1 BCA account number → copy to clipboard
In the Tata Tertib rule about payment (the text contains the account number `7610797053`, on every property):
- Make **the number itself** clickable. Clicking it **copies the number to the clipboard** and shows a small notification with the text **"Tersalin"** (use the existing Toast pattern).
- Make it obvious that it can be clicked: a **dotted underline and a small copy icon** next to the number, in the site's existing style.
- It must be a real button (keyboard accessible, `aria-label` such as "Salin nomor rekening") and must work on mobile. Provide a fallback if the Clipboard API is unavailable or blocked.
- The visible text stays exactly `7610797053`; the rest of the rule text is unchanged.

### 2.2 Phone number → WhatsApp
Every place where the text **`081311654066`** appears on the website (the Tata Tertib rules, including the new move-out rule, and anywhere else the project-wide search finds it):
- Make the number a link that opens **WhatsApp chat with that number and no preloaded message**: `https://wa.me/6281311654066` (no `text` parameter). Open it in a new tab with `rel="noopener noreferrer"`.
- Keep the visible text exactly `081311654066`. Give it a subtle link style consistent with the site.
- If the same number also appears in another format (for example `+62 813-1165-4066`) on a page, you may link it the same way; mention it in your report.

### Done when
- Clicking the account number copies it and shows "Tersalin"; clicking any `081311654066` opens a blank WhatsApp chat with that number.

---

## Task 3 — Room letters display

### 3.1 Write out every room letter
In every room type card, replace ranges with the full list separated by commas. Expected results (verify against the data):

| Property | Room type | Display |
|---|---|---|
| Homy Permata A7 | Standard | A, B, C, D, H, I, J, K, Q |
| | Superior | E, F, M, P |
| | Deluxe | L, Fanta |
| | Executive | G, N, O *(see 3.2)* |
| Homy Residence H14 | Standard | B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q |
| | Superior | R |
| | Executive | A |
| Homy Parahyangan | Superior | A, B, C, D |
| | Standard | E, F, G, H, I, J, K, M, N |
| | Small | L |
| Homy Budget Alamanda | Standard | Semua kamar (unchanged) |

Keep the existing "Kamar …" prefix and the room-count chip. Make sure long lists (H14 Standard) wrap nicely and stay readable on mobile.

### 3.2 A7 room O: "Free TV Cable"
Next to the letter **O** in the A7 Executive card, show a **small, appealing tag** (not plain text): a small rounded chip with a small TV icon and the text **"Free TV Cable"**, in the site's existing chip style. It sits right after the letter O in the room line, stays small, and does not break the layout on mobile. **Your call:** the exact look. Store it in the room data (a note attached to that letter) so it can be edited later.

### Done when
- No range such as "A – D" or "B – Q" remains anywhere; the O tag shows only on A7 Executive.

---

## Task 4 — WhatsApp message format

Replace the preloaded WhatsApp messages with these multi-line formats everywhere on the site (all buttons: homepage cards, price card, mobile bottom bar, room cards, visit button, floating button, help band, header, anywhere else). Keep all templates in the one existing place (the WhatsApp helper) and keep the number unchanged. Use real line breaks (properly URL-encoded). One blank line between sections.

**Room (a specific room type button):**
```
Halo Homy Residence, saya tertarik dengan kamar

* Tipe Standard (Rp1.700.000/bulan)
* Homy Residence H14

Apakah masih tersedia?
```
(Room type name, price from the data, property name from the data.)

**Property (a property button without a room type):**
```
Halo Homy Residence, saya ingin menanyakan hunian

* Homy Parahyangan

Boleh dibantu?
```

**Visit ("Jadwalkan Visit"):**
```
Halo Homy Residence, saya ingin menjadwalkan visit ke

* Homy Parahyangan

Boleh dibantu?
```

**General (no property, for example the floating button or the help band):**
```
Halo Homy Residence, saya ingin menanyakan hunian yang tersedia. Boleh dibantu?
```

Note: the earlier site produced the property and room messages glued together on one line; make sure each button now sends only its own message in the format above.

### Done when
- Clicking a room's Book Now opens WhatsApp with the room format and correct type, price and property; the other buttons use their formats.

---

## Task 5 — Photos

### 5.1 Homy Parahyangan — Small room
The Small room photos have been added at `property-pictures/` → the Parahyangan folder → `small` (find folder names case-insensitively; the owner wrote `PARAHYANGAN`). Show **every image of that folder in numeric order** in the Small room card. The room illustration placeholder from Update 05 no longer shows for Small once it has photos (it remains the fallback only for cards that still have none).

### 5.2 Homy Parahyangan — Standard room
Remove the picture in **slide 4** (the fourth photo in numeric order) from the **Standard room card only**, so the Standard card shows only 3 pictures. Do **not** delete the file and do **not** change the Parahyangan property gallery. If the folder holds more than four photos and the result would not be exactly 3 pictures, stop and report instead of guessing.

### 5.3 Homy Permata A7 — Deluxe room
Replace the Deluxe room card photos with the images in `property-pictures/` → the A7 folder → `deluxe` → `NEW` (find case-insensitively), in numeric order. These **replace** the previous Deluxe card photos entirely. Do **not** add them to the A7 gallery, and the A7 gallery must stay exactly as it is (make sure the gallery does not automatically pick up the new folder).

### Done when
- Parahyangan Small shows its photos; Parahyangan Standard has exactly 3 slides; A7 Deluxe shows only the `NEW` pictures; every path matches real filenames exactly.

---

## Task 6 — Room videos

### 6.1 What the owner wants
Every room type card shows a way to **play a video of that room**, **except Homy Budget Alamanda** (no videos yet; do **not** hard-code an exclusion, simply register no videos for Alamanda so adding some later works). The owner will provide the videos later in a folder named **`property-videos`**; build the feature now.

### 6.2 Where the videos live
- Folder: `property-videos`, placed so that it is **published** (like `property-pictures`, inside `public/`; create the folder if it does not exist, with a short README note saying what goes where).
- Expected structure (mirrors the photo folders): `property-videos/<property folder>/<room type>.mp4`, for example the A7 folder with a `Deluxe` video. Match property folders and room types **case-insensitively** by name, as with photos. Format: **mp4**. If other formats are found (for example `.mov`), report them instead of using them.
- Videos should become available **without editing component code**: when the owner drops a correctly named video into the right folder, it should appear on the right card after the next build. **Your call:** how (for example a build-time scan that generates a registry, or one clearly commented registry file; document the chosen way in the README). GitHub Pages cannot list folders at runtime.
- **Do not create or commit fake videos.** If you test with a temporary dummy file, remove it afterwards and make sure nothing fake is in the published output.
- Size: GitHub rejects files above **100 MB**. Do not re-encode videos; if you notice a file above 50 MB, mention it in your report.

### 6.3 Behaviour
1. **Hidden until a video exists:** a room card only shows the video button when a video file is registered for that property and room type. No video, no button, no empty space.
2. **The button:** a clear, small control on the card (play icon with the label **"Lihat Video"**), in the site's existing style. **Your call:** exact placement, as long as it is obvious on mobile and desktop.
3. **Clicking it plays the video inside the card**: the photo slides area is replaced by the video player with native controls, starts playing, works on phones (`playsInline`). Provide a **"Kembali ke foto"** control to return to the photos.
4. **Caption below the video while it is shown:** the property name, then the room type, for example **"Homy Permata A7 — Deluxe"** (names from the data).
5. **Performance:** do not download any video before the visitor clicks (`preload="none"` or equivalent). Only one video plays at a time; starting another pauses the first; returning to photos stops the video. Use the card's first photo as the poster when sensible.
6. No new lightbox, popup or page: everything stays inside the room card.

### Done when
- With a registered video, the card shows "Lihat Video"; clicking plays it in the card with the "Property — Room type" caption; "Kembali ke foto" returns to the photos.
- Cards without a registered video look exactly like today; Alamanda has no video button.
- Dropping a new correctly named video into `property-videos` and rebuilding makes it appear, as documented.

---

## Final check before you finish

- [ ] Tata Tertib rule texts, order, exceptions and numbering are correct for all four properties (totals A7 23, H14 24, Parahyangan 24, Alamanda 22); the bulbs rule is unchanged; Alamanda has none of the removed rules
- [ ] Account number copies with a "Tersalin" notice; every `081311654066` opens a blank WhatsApp chat
- [ ] No room range ("A – D", "B – Q", "E – K, M, N") remains; A7 Executive shows the "Free TV Cable" tag next to O only
- [ ] All WhatsApp buttons use the new multi-line formats
- [ ] Parahyangan Small has its photos; Parahyangan Standard has 3 slides; A7 Deluxe shows the `NEW` photos; galleries unchanged
- [ ] Room video feature works as described and is hidden where no video exists; no fake video in the output
- [ ] All image and video paths match real filenames exactly (case-sensitive)
- [ ] Lint and build pass; the site works from the root `/`; browser check on desktop and mobile with no console errors
- [ ] Nothing outside this update was changed

## Report back with

1. The list of files you changed.
2. The final rule count per property and where you placed the new rule block in each.
3. How the folders for Parahyangan Small, Parahyangan Standard and A7 Deluxe `NEW` were matched, and how many photos each card now has.
4. How the video feature finds videos, and where the owner should put them (also written in the README).
5. Any other place where `081311654066` appeared and how you handled it.
6. Anything you were unsure about or could not complete.
