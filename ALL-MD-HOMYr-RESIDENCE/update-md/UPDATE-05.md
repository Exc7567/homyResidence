# UPDATE-05 — Homy Residence

You have full access to the project folder. Read the existing code first, and read `UPDATE-04-PROGRESS.md` to see exactly how the previous update handled photos (photo helper, galleries, room photos, `cardCover` / `cardPhotos()`, the A7 `tempPhotos` marker). Follow the current structure, naming and styling. Change only what this update asks for. Do not redesign anything or add features that are not listed here.

---

## Ground rules (same as Update 04)

- **Keep the existing design.** Fill existing slots. Do not add carousels, sliders, lightboxes or new layouts.
- **Do not compress, resize, rename or convert any image.** Use them exactly as they are.
- **File paths are case-sensitive on GitHub Pages.** Every image path must match the real filename exactly, including the capitalization of the extension. If a filename has spaces or special characters, make sure the path still works in the browser (URL-encode if needed).
- **Ignore non-image files** such as `.DS_Store`, `Thumbs.db`, `desktop.ini`.
- **Photo order:** the owner named the picture files with numbers. Use **numeric natural order** (`2` before `10`) for the slides of every card and gallery.
- Do not touch the `HERO-random` folder, the hero, the POI photos, the Tata Tertib rules text, the FAQ, or the domain setup.
- When you finish, give me the report described at the end of this file.

---

## Where the photos are

The folder structure is:

```
property-pictures/
  <property folder>/              e.g. the A7 folder, the Parahyangan folder
    <room type folder>/           e.g. Standard, Superior, Deluxe, ...
      1.jpg, 2.jpg, ...           numbered files
    (and/or numbered photos directly in the property folder)
```

- The owner **updated the project folder** with new and replaced pictures. Update 04 moved `property-pictures/` into `public/property-pictures/` (only `public/` is published). Look for the updated pictures in **both** the project root `property-pictures/` and `public/property-pictures/`. Make sure the **final published copy** is in `public/property-pictures/` with filenames unchanged, with the newest versions of the files, and leave no stale duplicate copy behind (mention what you did in the report).
- Match each folder to its property and room type **by folder name, case-insensitively** (for example a folder named `standard` or `Standard` is the Standard room type). **If a folder name does not clearly match a property or room type, do not guess: stop for that item, leave it unchanged and list it in your report.** (In Update 04 the H14 room folders had to be inferred; the owner does not want any guessing this time.)
- Use the **actual files currently in the folders**. If a photo was removed or replaced by the owner, the website must reflect the folder exactly (no references to files that no longer exist).

---

## Task 1 — Homy Permata A7: room card photos

In the **Kamar** section of the A7 page, replace the temporary photos of three room types with the real photos from the matching room folders inside the A7 property folder:

| Room type card | What to do |
|---|---|
| **Standard** | Use all images from the A7 `Standard` room folder, in numeric order |
| **Superior** | Use all images from the A7 `Superior` room folder, in numeric order |
| **Deluxe** | Use all images from the A7 `Deluxe` room folder, in numeric order |
| **Executive** | **Leave its photos exactly as they are now.** Do not switch it to a folder, even if an `Executive` folder exists (if one exists, only mention it in the report) |

Also:
1. **Remove the "Foto sementara" text** and the small outline that marks temporary photos from **all four** A7 room cards (including Executive, whose current pictures are now the correct ones). If the temporary-photo marker feature (`tempPhotos` and its styling and text) is not used anywhere else, **delete it completely**.
2. **A7 gallery and homepage card:** the A7 pictures were updated, so make the A7 property gallery show **every image of the A7 folder** (same approach Update 04 used for the other properties, numeric order). The homepage A7 card and the "Hunian Homy Lainnya" mini card use the **first photo** of that order.
3. Each image keeps a sensible `alt`, for example `"Homy Permata A7 — Deluxe — foto 2"`.

### Done when
- A7 Standard, Superior and Deluxe cards show their own real photos in numeric order; Executive is unchanged.
- No "Foto sementara" text or temporary outline remains anywhere on the site.
- The A7 gallery shows every photo in the A7 folder; nothing else on A7 changed.

---

## Task 2 — Homy Parahyangan: photos on every card

The Parahyangan folder was empty during Update 04 and now contains pictures. Fill **every** Parahyangan placeholder:

1. **Property gallery (Foto section):** every image of the Parahyangan property folder, numeric order, same approach as the other properties.
2. **Room type cards:** use the matching room folders:
   - **Superior** ← the Parahyangan `Superior` folder
   - **Standard** ← the Parahyangan `Standard` folder
   - **Small** ← **no photos yet. Leave it without photos** (see Task 3 for how the empty slot looks)
3. **Homepage card and "Hunian Homy Lainnya" mini card:** use the **first photo** of the Parahyangan gallery order.
4. Search the whole Parahyangan page and the homepage for any remaining Parahyangan placeholder image and fill it, except the Small room.
5. Sensible `alt` text as in Task 1.

### Done when
- No Parahyangan placeholder image remains except the Small room card.
- Every image in the Parahyangan folders is shown in the right place, in numeric order.

---

## Task 3 — Illustration for empty photo slots (replaces the grey placeholder)

Currently an empty photo slot shows a plain grey box with a picture icon and a small text. Replace that look with **a very simple illustration of a room** that makes it obvious "the photo is not available yet".

### What to do
1. Create **one reusable placeholder illustration** (inline SVG; it must not require loading an extra file). It should be:
   - **Very simple** (line or flat style): for example a bed, a window and a wardrobe or a small table, drawn minimally.
   - In the **site's existing brand colors** (soft greens and sand), light and calm.
   - Clearly a **placeholder**: people must understand it is an illustration, not a real photo. Add a small caption **"Foto segera hadir"** under or inside the illustration.
   - **Same 4:3 ratio** as the photos, no layout shift, looks good on mobile and desktop.
2. Use it in every **empty room-type photo slot and empty property photo slot** (a room card or property card/gallery that has no real photo). Right now that means:
   - the **Parahyangan Small** room card,
   - the **Villa Purnava Permata** card (keep its existing greyed look; the illustration is just greyed with it, and the card stays non-clickable as before),
   - any other room or property slot that is still empty.
3. **Do not change POI photo placeholders** or any other non-room/non-property placeholder.
4. A card with the illustration shows no carousel arrows, dots or counter (it is a single empty slot, as it works today).
5. Give the illustration an accessible label (for example `aria-label="Foto belum tersedia"`).
6. **Your call:** the exact drawing and how it is built; keep it small, clean and consistent with the design.

### Done when
- The Parahyangan Small card and the Villa card show the room illustration with the caption; no slot with a missing room/property photo still shows the old grey box.
- POI placeholders (if any remain) are unchanged.

---

## Task 4 — Show the deposit on every property page

Add the deposit amount to the **Tata Tertib** section of each property page, **above the numbered rules**, as a short, clearly visible information line (a simple highlighted line or small box in the existing style):

| Property | Text shown |
|---|---|
| Homy Permata A7 | **Deposit Rp500.000** |
| Homy Residence H14 | **Deposit Rp500.000** |
| Homy Parahyangan | **Deposit Rp500.000** |
| Homy Budget Alamanda | **Deposit Rp200.000** (Alamanda stays Rp200.000) |

- Format the amount exactly like other prices on the site (`Rp500.000`, dot as thousands separator).
- Take the amount from the property's single `deposit` value in the data (add or correct the field if needed; Alamanda `200000`, all others `500000`), not from hardcoded text in the component.
- **It is not part of the numbered rules.** The 21/20 rules and their numbering and wording stay exactly as they are; the deposit line sits above them and must not shift the numbering.
- Show it **once per property page** and **not** on the homepage cards or anywhere else.

### Done when
- Each of the four property pages shows its deposit line above the rules; the rules text and numbering are unchanged.

---

## Final check before you finish

- [ ] A7 Standard, Superior and Deluxe room cards show their folder photos in numeric order; Executive unchanged
- [ ] No "Foto sementara" text, temporary outline or `tempPhotos` leftovers anywhere
- [ ] A7 gallery shows every photo in the A7 folder
- [ ] Parahyangan gallery, Superior card, Standard card, homepage card and mini card all show real photos
- [ ] Parahyangan Small card and Villa card show the room illustration with "Foto segera hadir"; no old grey placeholder remains in room/property slots
- [ ] Deposit line above the rules: A7, H14, Parahyangan = Rp500.000; Alamanda = Rp200.000; rule numbering untouched
- [ ] All image paths match the real filenames exactly (case-sensitive); no references to missing files
- [ ] Final published photos live in `public/property-pictures/` without stale duplicates
- [ ] Lint and build pass; the site works from the root `/`; browser check on desktop and mobile with no console errors
- [ ] Nothing outside this update was changed

## Report back with

1. The list of files you changed.
2. For A7 and Parahyangan: which folder was matched to which room type or gallery, and how many photos each got.
3. Where the updated picture folders were found, and what you did with duplicates.
4. Which slots now use the room illustration.
5. Whether an `Executive` folder exists for A7, and any folder you could not match with confidence.
6. Anything you were unsure about or could not complete.
