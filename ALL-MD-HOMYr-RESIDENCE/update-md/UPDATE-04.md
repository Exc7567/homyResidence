# UPDATE-04 — Homy Residence

You have full access to the project folder. Read the existing code first and follow its current structure, naming and styling. Change only what this update asks for. Do not redesign anything or add new features that are not listed here.

---

## Ground rules

- **Keep the existing design.** Fill the existing placeholders and sections. Do not add carousels, sliders, lightboxes or new layouts.
- **Do not compress, resize, rename or convert any images.** They are already web-sized. Use them as they are.
- **File paths are case-sensitive on GitHub Pages.** `photo.JPG` and `photo.jpg` are different files online, even if they work locally. Every image path must match the real filename exactly, including the extension's capitalization. If a filename contains spaces or special characters, make sure the path still works in the browser (URL-encode it if needed).
- **Ignore non-image files** in the picture folders, such as `.DS_Store`, `Thumbs.db` and `desktop.ini`.
- When you finish, give me the report described at the end of this file.

---

## Task 1 — Switch to the custom domain `www.homyresidence.id`

The site currently lives at `exc7567.github.io/homyResidence`. The DNS is already done: `www` has a CNAME record pointing to `exc7567.github.io`, and the root domain has the four GitHub A records. **Do not touch DNS.** Only update the code.

The main address is **`https://www.homyresidence.id`** (with www). GitHub will automatically redirect `homyresidence.id` to it.

### What to do

1. **Add a `CNAME` file** containing exactly this one line, with no `https://` and no trailing slash:
   ```
   www.homyresidence.id
   ```
   Put it in the folder that actually gets published. If the site is plain HTML, that is the repo root. If there is a build tool (such as Vite), put it in the folder that gets copied into the build output (for example `public/`), so `CNAME` ends up in the deployed files.

2. **Fix the blank page problem.** The site used to live under the `/homyResidence/` subfolder. On the new domain it lives at the root `/`. Any leftover subfolder path will break CSS, JS and images, which causes a blank page. Search the **whole project** for `homyResidence` (case-insensitive) and fix every place where it is used as a path, including:
   - Build config base paths (for example Vite `base: '/homyResidence/'` → `base: '/'`)
   - Router basenames (for example React Router `basename="/homyResidence"` → remove it or set it to `/`)
   - Hardcoded asset paths such as `/homyResidence/assets/...` → `/assets/...`
   - `homepage` in `package.json`, if present
   - Any `404.html` SPA-redirect script. If it keeps 1 path segment for the subfolder, change it to 0.

   Note: `homyResidence` may also appear as text (for example the brand name). Only change it where it is used as a **URL or path**.

3. **Replace every full link** to `exc7567.github.io/homyResidence` (with or without `https://`, with or without a trailing slash) with `https://www.homyresidence.id`. Check:
   - `<link rel="canonical">`
   - Open Graph / Twitter meta tags (`og:url`, `og:image`, etc.)
   - `sitemap.xml` and `robots.txt`
   - JSON-LD / structured data
   - Any share links or hardcoded links in the HTML/JS

### Done when

- No reference to `exc7567.github.io` or `/homyResidence/` as a path remains anywhere in the project. Confirm with a project-wide search.
- `CNAME` exists in the published output with `www.homyresidence.id`.
- The site works correctly when served from the root `/`, with CSS, JS, images and all pages and links working. If there is a build step, run it and check the output.

---

## Task 2 — Real property photos

There is a new folder called `property-pictures`. It contains **one subfolder per property** (the subfolder names match the properties), plus a folder called `HERO-random`, which is only for Task 3.

### What to do

1. Match each property subfolder to its property on the website.
2. For each property, **replace the empty placeholder pictures with that property's real photos**. Include **every** image in that property's folder; do not skip any.
   - Use the existing photo layout and slots. If a property has more photos than there are slots, extend the **same** layout so all photos appear. Do **not** add a carousel, slider or lightbox.
   - Order photos by filename in natural sort order (so `2.jpg` comes before `10.jpg`).
   - Give each image a sensible `alt` text, for example `"Homy Residence H14 — foto 3"`.
3. **Home section:** anywhere on the home page that shows a property card or preview with a placeholder image, use that property's first photo (from the same order as above).
4. `HERO-random` photos must **not** appear in any property gallery.

### Done when

- No property placeholder image remains anywhere on the site.
- Every image file in every property folder is shown on that property's section or page.
- All photos load on the live domain (paths and case match exactly).

---

## Task 3 — Random hero picture

### What to do

1. The hero section on the home page must use **only** the pictures in `property-pictures/HERO-random` (currently 5 pictures). Remove the current placeholder hero image.
2. On **every page load**, including a normal refresh, show **one** random picture from that folder. It is a single static image, not a slideshow and not auto-rotating.
3. Try to avoid showing the same picture twice in a row. If you remember the last picture using `localStorage`, wrap it in `try/catch` so the hero still works if storage is blocked.
4. GitHub Pages cannot list a folder's contents at runtime, so the list of hero filenames must be written in the code. Keep that list in **one clearly commented place** (for example a `HERO_IMAGES` array at the top of the script), so I know where to add new pictures later.
5. Pick the picture before or as the page renders, so the user does not see a flash of a wrong or empty image first. Keep the current hero styling (text overlay, darkening, sizing, mobile behavior).

### Done when

- Refreshing the page several times shows different hero pictures, all from `HERO-random` only.
- There is no visible flash or blank hero while loading, on desktop and mobile.

---

## Task 4 — Universitas Pramita POI picture

The Universitas Pramita POI picture(s) have been added to the `poi-assets` folder. Find them and connect them to the Universitas Pramita POI entry, **following exactly the same pattern the other POIs already use** (same image size, styling and data structure). Replace its placeholder if there is one.

### Done when

- Universitas Pramita shows its picture just like the other POIs.

---

## Task 5 — Replace the Tata Tertib section on every property

In the Tata Tertib section of **every property**, **delete all existing content** and replace it with the rules below. Use the heading **"Tata Tertib Peraturan Kost"** and copy the text **exactly**: same wording, spelling, punctuation, phone number and account number.

### Important: rule 3 is only for Homy Residence H14

- **Homy Residence H14** shows **all 21 rules**.
- **Every other property** does **not** show the parking rule (rule 3 below). The rules after it move up to fill the gap, so those properties show **20 rules numbered 1 to 20**. There must be no gap, no blank item and no skipped number: what was rule 4 becomes rule 3, and so on.
- Use an ordered list (`<ol>`) or generate the numbers in code, so the numbering always comes out right automatically. Do **not** type the numbers into the text. If the project stores content as data, store the rules **once** and mark the parking rule as H14-only, rather than copying the full list into every property.

### Rules text (full version, as shown for H14)

1. Pembayaran uang kost dan deposit harap di transfer ke rekening BCA atas nama Dewi Tjandra dengan nomor rekening 7610797053. Tidak menerima uang cash / tunai.
2. Uang deposit akan di transfer kembali ke penyewa dengan syarat pemberitahuan minimum 50 hari dari tanggal check out. Jika tidak ada pemberitahuan sebelumnya, uang deposit akan hangus.
3. **[H14 ONLY]** Bagi penyewa yang membawa mobil disediakan tempat parkir dibawah kanopi dengan biaya Rp. 150.000/bulan. Bagi yang sudah bayar parkir akan disediakan lot parkir private, sehingga orang lain tidak bisa menggunakan lot parkir tersebut.
4. Setiap penyewa wajib menyerahkan foto KTP melalui WA: 081311654066. Setiap penyewa pasutri wajib menyerahkan foto copy KTP dan foto copy surat nikah.
5. Pembayaran uang kost setiap tanggal 1. Akan diberikan tenggang waktu maksimal sampai tanggal 10 setiap bulan. Jika lebih dari tanggal 10, akan dikenakan denda sebesar Rp. 10.000/hari.
6. Pembayaran uang kost tetap penuh meskipun bulan tersebut bulan liburan.
7. Batas menerima tamu jam 10 malam. Menerima tamu hanya diperbolehkan di ruangan yang tersedia untuk bertamu. Dilarang menerima tamu di dalam kamar.
8. Tamu tidak diperbolehkan untuk menginap, mandi, memasak. Harus atas persetujuan dan izin terlebih dahulu dari pemilik kost.
9. Dilarang membuat keonaran yang dapat mengganggu ketenangan di dalam kost.
10. Dilarang membuat kerusakan atau merusak barang-barang milik kost (remot AC, TV, remot TV, shower, laci, meja, lemari dan sebagainya). Jika terjadi kerusakan akan dikenakan biaya ditanggung oleh penyewa atau penyewa diharuskan mengganti barang yang sudah dirusakkan.
11. Dilarang menggunakan paku, memasang stiker, dan mencoret-coret kamar.
12. Dilarang membawa minuman keras, obat terlarang (narkoba dan sejenisnya), berjudi, merokok di dalam kost.
13. Dilarang menggunakan mesin cuci untuk keperluan pribadi.
14. Penyewa yang include free laundry batas baju maksimal 2 pasang sehari.
15. Bola lampu, baterai remot jika habis menjadi tanggung jawab penyewa kost. (Permulaan kost bola lampu, baterai akan disediakan oleh pemilik kost)
16. Untuk menjaga kebersihan kamar mandi dalam, akan dilakukan pembersihan 2 minggu sekali oleh pembantu kost dengan izin penyewa kost terlebih dahulu.
17. Tidak diperbolehkan mencuci mobil atau sepeda motor di kost.
18. Jika kunci kamar hilang, harap di duplikat dengan biaya sendiri.
19. Penyewa kost diwajibkan mematuhi tata tertib kost yang tersedia oleh pemilik kost.
20. Pemilik kost berhak mengeluarkan penyewa kost apabila tidak mematuhi tata tertib kost.
21. Jika ada keluhan tolong WA di nomor 081311654066.

(The `[H14 ONLY]` marker is only a note for you. Do not show it on the website.)

### Done when

- H14 shows 21 rules; every other property shows 20 rules numbered 1–20 without the parking rule.
- No old Tata Tertib content remains on any property.
- The text matches the list above exactly.

---

## Task 6 — FAQ: replace all placeholder answers with real answers

Some FAQ answers still contain placeholder text in this format:

```
[ISI: <description>, contoh: <example value>]
```

### What to do

1. **Placeholders that include an example:** replace the **whole placeholder** with **only the example value**, written as a clean, natural answer (capitalize the first letter). Remove the brackets, `ISI:`, the description and the word `contoh`.
   - Example: `[ISI: jam operasional balasan WhatsApp, contoh: setiap hari 08.00-21.00]` → **`Setiap hari 08.00–21.00.`**
   - If the placeholder is part of a longer sentence, replace only the placeholder and make sure the sentence still reads naturally.
2. **Placeholders with no example value:** do **not** guess or make anything up. Leave them as they are and list them in your report so I can fill them in.
3. **Parking FAQ — special case:**
   - For **Homy Residence H14 only**, the answer becomes:
     **"Parkir motor gratis. Parkir mobil Rp150.000/bulan untuk menjaga/memesan slot parkir."**
     (The amount is per month, not a one-time payment.)
   - For **every other property**, do **not** show this parking FAQ item at all. Remove the whole question and answer, and leave no empty space.
   - If the FAQ is a single shared section for the whole site (not per property), keep the item but make it clear it applies only to H14, for example: **"Khusus Homy Residence H14: parkir motor gratis. Parkir mobil Rp150.000/bulan untuk menjaga/memesan slot parkir."** Mention in your report which situation applied.

### Done when

- A project-wide search for `[ISI` finds nothing except placeholders that had no example value, and those are listed in your report.
- The parking FAQ appears only for H14, with "Rp150.000/bulan".

---

## Task 7 — New home page tagline

Change the **visible tagline** on the home page to:

**Hunian nyaman untuk mahasiswa & profesional**

Change only the visible tagline text. Do **not** change the browser tab `<title>` or the meta description. Make sure `&` displays correctly (use `&amp;` in raw HTML if needed).

---

## Final check before you finish

- [ ] Project-wide search: no `exc7567.github.io`, and no `/homyResidence/` used as a path
- [ ] `CNAME` with `www.homyresidence.id` exists in the published output
- [ ] Site works when served from the root `/` (no blank page; CSS, JS and images all load)
- [ ] All property placeholder images replaced; every photo from every property folder is shown
- [ ] Home page property cards show real photos
- [ ] Hero shows one random picture from `HERO-random` on every load
- [ ] Universitas Pramita POI has its picture
- [ ] Tata Tertib: H14 has 21 rules, others have 20 rules numbered correctly, old content removed
- [ ] FAQ: no `[ISI` placeholders left (except those with no example, which are reported)
- [ ] Parking FAQ only on H14, with "Rp150.000/bulan"
- [ ] New tagline is visible on the home page
- [ ] All image paths match the real filenames exactly (case-sensitive)
- [ ] Nothing outside this update was changed

## Report back with

1. A list of the files you changed.
2. How each property folder was matched to each property, and how many photos each one got.
3. Where the `HERO_IMAGES` list lives, so I can add pictures later.
4. Whether the FAQ is per-property or shared, and how you handled the parking item.
5. Any `[ISI` placeholders you left because they had no example value.
6. Anything you were unsure about or could not complete.
