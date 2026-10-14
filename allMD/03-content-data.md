# 03. Content Data (Single Source of Truth)

> Every fact shown on the website comes from here. If a fact is not here, it is a **placeholder** (`[ISI: ...]`). Do not guess.
> The agent must create the data files in section 8 **exactly** (same ids, slugs, prices, counts). Prices are **Rupiah per month**, stored as plain integers.

---

## 1. Source document (owner-provided, translated)

The owner's room list, in thousands of Rupiah (`1700` = Rp1.700.000):

**Homy Permata A7 (18 rooms)**
- Standard (Rp1.700.000/bulan): rooms A, B, C, D, H, I, J, K, Q → 9 rooms
- Superior (Rp1.900.000/bulan): rooms E, F, M, P → 4 rooms
- Executive (Rp2.500.000/bulan): rooms G, N, O → 3 rooms
- Deluxe (Rp2.000.000/bulan): room L and the room named "Fanta" → 2 rooms
- All rooms: private bathroom inside with water heater, AC, fully furnished, free WiFi, free laundry (washed and ironed)
- Deposit paid up front: Rp500.000

**Homy Residence H14 (18 rooms)**
- Executive (Rp2.500.000/bulan): room A → 1 room
- Standard (Rp1.700.000/bulan): rooms B to Q → 16 rooms
- Superior (Rp1.850.000/bulan): room R → 1 room
- All rooms: private bathroom inside with water heater, AC, fully furnished, free WiFi, free laundry (washed and ironed)
- Deposit: Rp500.000
- Parking: basement. Motorbike parking free. Car parking Rp150.000 to keep a parking spot (billing period not stated, see open items)

**Homy Parahyangan**
- Superior (Rp1.650.000/bulan): rooms A, B, C, D → 4 rooms. Private bathroom inside with water heater, free laundry, AC, free WiFi, fully furnished
- Standard (Rp1.450.000/bulan): rooms E, F, G, H, I, J, K, M, N → 9 rooms. Bathroom **outside** with water heater, free laundry, AC, free WiFi, fully furnished
- Small (Rp1.200.000/bulan): room L → 1 room. Bathroom **outside** with water heater (other amenities not stated)
- Deposit: Rp500.000
- Total rooms is not stated by the owner; 4 + 9 + 1 = **14** is *derived* (confirm, see open items)

**Homy Budget Alamanda (40 rooms)**
- One tier: Rp1.000.000/bulan
- AC, free WiFi, fully furnished, bathroom **outside**
- Washing machine available on floor 4 (no free laundry service stated)
- Deposit: Rp200.000

**Villa Purnava Permata**: under construction. No data yet.

**Applies to all properties:** AC and WiFi included. Electricity is **not** included: token meter per room.

Owner decisions: room letters are **not** shown on the website; rooms are grouped by **type**. "Fully furnished" is stated as is, without itemizing. Bathroom sharing/cleaning details are not stated anywhere.

---

## 2. Unique-facility ("Unggulan") rules

A property "highlight" is a feature that makes it clearly different from the other open properties. Highlights render as **teal-soft chips with a Sparkles icon** (see file 02). Each highlight has `showOnCard` (homepage card) and `showOnDetail` flags.

| Property | Highlights | showOnCard | Why it is unique |
|---|---|---|---|
| Homy Permata A7 | "4 tipe kamar, termasuk Deluxe" | true | Only property offering a Deluxe type; widest choice (Standard, Superior, Deluxe, Executive) |
| Homy Permata A7 | "Kamar mandi dalam + water heater di semua kamar" | true | Shared only with H14 (not Parahyangan standard/small, not Alamanda) |
| Homy Residence H14 | "Parkir basement (motor gratis)" | **false (detail page only)** | Only property with basement parking. **Never on the homepage.** |
| Homy Residence H14 | "Kamar mandi dalam + water heater di semua kamar" | true | Shared with A7 |
| Homy Parahyangan | "Tersedia tipe Small mulai Rp1.200.000" | true | Only property with a Small tier |
| Homy Parahyangan | "Pilihan kamar mandi dalam (Superior) atau luar" | false | |
| Homy Budget Alamanda | "Paling terjangkau, Rp1.000.000/bulan" | true | Lowest price |
| Homy Budget Alamanda | "Mesin cuci tersedia di lantai 4" | true | Only property with a shared washing machine (others give free laundry service) |
| Homy Budget Alamanda | "Deposit hanya Rp200.000" | false | Lowest deposit |

Card display rule: show **at most 2** `showOnCard` highlights per card (first two in array order).
Detail display rule: show all highlights with `showOnDetail: true` in the Fasilitas section under a sub-heading "Fasilitas unggulan" (see file 05).
Also mark the *facility rows themselves* with a small teal "Unggulan" tag in the detail facility grid when the facility id is in the property's `uniqueFacilityIds`.

---

## 3. Facility catalog

Defined once in `src/data/facilities.js`; properties reference ids.

| id | Label (Indonesian, exact) | lucide icon |
|---|---|---|
| `ac` | AC | `AirVent` |
| `wifi` | WiFi | `Wifi` |
| `furnished` | Fully Furnished | `Sofa` |
| `bathroom_in` | Kamar Mandi Dalam | `ShowerHead` |
| `bathroom_out` | Kamar Mandi Luar | `DoorOpen` |
| `water_heater` | Water Heater | `Flame` |
| `laundry_free` | Free Laundry (cuci + setrika) | `Shirt` |
| `washing_machine` | Mesin Cuci (Lantai 4) | `WashingMachine` |
| `parking_front` | Parkir di Teras Depan | `ParkingCircle` |
| `parking_basement` | Parkir Basement | `Car` |
| `electricity_token` | Listrik Token per Kamar (di luar harga) | `Zap` |

Shared by **all** properties: `ac`, `wifi`, `electricity_token` (rendered with the note "Listrik tidak termasuk").

---

## 4. Room type catalog (per property)

Fields: `id`, `name`, `price` (int), `units` (internal count, **not shown by default**), `bathroom` (`'in' | 'out'`), `facilityIds` (array), `size` (placeholder), `occupancyNote` (placeholder), `photos` (placeholder list).

| Property | Type | Price/month | Units | Bathroom | Facility ids |
|---|---|---|---|---|---|
| a7 | Standard | 1.700.000 | 9 | in | ac, wifi, furnished, bathroom_in, water_heater, laundry_free |
| a7 | Superior | 1.900.000 | 4 | in | same as above |
| a7 | Deluxe | 2.000.000 | 2 | in | same as above |
| a7 | Executive | 2.500.000 | 3 | in | same as above |
| h14 | Standard | 1.700.000 | 16 | in | ac, wifi, furnished, bathroom_in, water_heater, laundry_free |
| h14 | Superior | 1.850.000 | 1 | in | same |
| h14 | Executive | 2.500.000 | 1 | in | same |
| parahyangan | Superior | 1.650.000 | 4 | in | ac, wifi, furnished, bathroom_in, water_heater, laundry_free |
| parahyangan | Standard | 1.450.000 | 9 | out | ac, wifi, furnished, bathroom_out, water_heater, laundry_free |
| parahyangan | Small | 1.200.000 | 1 | out | ac, wifi, bathroom_out, water_heater (furnishing and laundry not stated) |
| alamanda | Standard (single tier) | 1.000.000 | 40 | out | ac, wifi, furnished, bathroom_out |

Display order inside a property: ascending by price (so "Mulai dari" = first item).
`priceFrom` is computed as `Math.min(...roomTypes.map(r => r.price))`, never hard-coded twice.
Room "units" must never render as availability. If the owner later wants availability, use the optional `status` field described in file 05.

Note for A7: the room named "Fanta" is a Deluxe room. Room letters/names are **not** shown on the site.

---

## 5. Points of interest (POI)

| Property | POIs (exact names) |
|---|---|
| a7, parahyangan, alamanda | Supermall Karawaci · UPH College · Universitas Pelita Harapan |
| h14 | Universitas Surabaya · Rumah Sakit UBAYA |

Each POI: `{ id, name, category, distance, photo }`.
- `category`: `'universitas' | 'pusat-perbelanjaan' | 'rumah-sakit'` (Supermall Karawaci → pusat-perbelanjaan; UPH College and Universitas Pelita Harapan → universitas; Universitas Surabaya → universitas; Rumah Sakit UBAYA → rumah-sakit).
- `distance`: **unknown**, store `null` and render as a muted `-- km` / `[ISI: jarak]` placeholder (file 08). Format when filled: `0.4 km` (Rukita style).
- `photo`: `null` for now; placeholder image shown.

H14's POIs point to Surabaya while the other three point to Karawaci; the owner has not confirmed H14's city. `locationLabel` for H14 is a placeholder (file 08).

---

## 6. Prices and deposits summary

| Property | Price from | Deposit |
|---|---|---|
| a7 | Rp1.700.000 | Rp500.000 |
| h14 | Rp1.700.000 | Rp500.000 |
| parahyangan | Rp1.200.000 | Rp500.000 |
| alamanda | Rp1.000.000 | Rp200.000 |

Deposit is shown only as a **disclaimer**: *"Deposit di awal sebesar Rp500.000 (dibayarkan sebelum masuk). Detail ketentuan dikonfirmasi melalui WhatsApp."* Use the property's `deposit` value. Do not show a deposit on homepage cards.

Standard disclaimer lines (render as small muted text under prices and in the Kamar section):
1. `Harga per bulan. Listrik tidak termasuk (token meter per kamar).`
2. The deposit disclaimer above.

---

## 7. Placeholder text convention

Any unknown value is a string starting with `[ISI:` and ending with `]`, for example `'[ISI: alamat lengkap Homy Permata A7]'`.
`npm run check:placeholders` greps `src/data` for `[ISI:` and prints file, line and text (file 09). In **dev mode only**, components render placeholder strings with an amber dashed outline (`isPlaceholder(value)` helper: `typeof v === 'string' && v.startsWith('[ISI:')`).

---

## 8. The data files to create

> Create these files **verbatim** (formatting may be adjusted, content may not). They must be plain ES modules **without** Vite-specific imports (no `import.meta`, no asset imports) so the prerender script (file 07/09) can `import` them in Node.

### `src/data/brand.js`
```js
export const BRAND = {
  name: 'Homy Residence',
  tagline: '[ISI: tagline utama, contoh: "Hunian nyaman untuk mahasiswa & profesional"]',
  heroSubtitle:
    '[ISI: 1-2 kalimat pengantar di hero. Contoh: "Pilih kost Homy yang paling cocok untukmu. Tanya ketersediaan langsung via WhatsApp."]',
  blurb: '[ISI: 1-2 kalimat tentang Homy untuk footer]',
  managedByText: 'Hunian nyaman dengan fasilitas lengkap', // shown under "Dikelola oleh Homy"; owner may change
  // heroStats: undefined,  // optional: [{ value: '...', label: '...' }]; leave undefined to hide (never invent numbers)
  domain: 'homyresidence.id',
  whatsappNumber: '6281311654066',         // digits only, international format, no plus sign
  whatsappDisplay: '+62 813-1165-4066',
  email: '[ISI: email kontak (opsional)]',
  address: '[ISI: alamat kantor / pemasaran (opsional)]',
  social: {
    instagram: '[ISI: URL Instagram]',
    tiktok: '[ISI: URL TikTok (opsional)]',
    facebook: '[ISI: URL Facebook (opsional)]',
  },
  logo: null, // later: '/images/brand/logo.svg'
  ogImage: '/images/brand/og-default.jpg', // placeholder file must exist (see file 08)
};

export const SHARED_FACILITY_IDS = ['ac', 'wifi', 'electricity_token'];

export const NOTES = {
  electricity: 'Listrik tidak termasuk (memakai token meter per kamar).',
  monthly: 'Harga per bulan.',
  depositTemplate: (amount) =>
    `Deposit di awal sebesar ${amount}. Detail ketentuan dikonfirmasi melalui WhatsApp.`,
};
```

### `src/data/facilities.js`
```js
export const FACILITIES = {
  ac:                { label: 'AC',                                   icon: 'AirVent' },
  wifi:              { label: 'WiFi',                                 icon: 'Wifi' },
  furnished:         { label: 'Fully Furnished',                      icon: 'Sofa' },
  bathroom_in:       { label: 'Kamar Mandi Dalam',                    icon: 'ShowerHead' },
  bathroom_out:      { label: 'Kamar Mandi Luar',                     icon: 'DoorOpen' },
  water_heater:      { label: 'Water Heater',                         icon: 'Flame' },
  laundry_free:      { label: 'Free Laundry (cuci + setrika)',        icon: 'Shirt' },
  washing_machine:   { label: 'Mesin Cuci (Lantai 4)',                icon: 'WashingMachine' },
  parking_front:     { label: 'Parkir di Teras Depan',                icon: 'ParkingCircle' },
  parking_basement:  { label: 'Parkir Basement',                      icon: 'Car' },
  electricity_token: { label: 'Listrik Token per Kamar (di luar harga)', icon: 'Zap' },
};
```

### `src/data/properties.js`
```js
const KARAWACI_MAP = {
  // PLACEHOLDER pin: replace with the real "Share > Embed a map" src later (file 07).
  embedUrl: 'https://www.google.com/maps?q=Supermall+Karawaci&z=15&output=embed',
  openUrl: 'https://www.google.com/maps/search/?api=1&query=Supermall+Karawaci',
  isPlaceholder: true,
};

const SURABAYA_MAP = {
  embedUrl: 'https://www.google.com/maps?q=Universitas+Surabaya&z=15&output=embed',
  openUrl: 'https://www.google.com/maps/search/?api=1&query=Universitas+Surabaya',
  isPlaceholder: true,
};

const KARAWACI_POIS = [
  { id: 'supermall-karawaci', name: 'Supermall Karawaci',          category: 'pusat-perbelanjaan', distance: null, photo: null },
  { id: 'uph-college',        name: 'UPH College',                 category: 'universitas',        distance: null, photo: null },
  { id: 'uph',                name: 'Universitas Pelita Harapan',  category: 'universitas',        distance: null, photo: null },
];

const SURABAYA_POIS = [
  { id: 'ubaya',      name: 'Universitas Surabaya',  category: 'universitas', distance: null, photo: null },
  { id: 'rs-ubaya',   name: 'Rumah Sakit UBAYA',     category: 'rumah-sakit', distance: null, photo: null },
];

const placeholderPhotos = (label, n = 4) =>
  Array.from({ length: n }, (_, i) => ({ src: null, alt: `Foto ${label} ${i + 1} (placeholder)`, label: `${label} ${i + 1}` }));

export const PROPERTIES = [
  /* ------------------------------------------------ 1. A7 */
  {
    id: 'a7',
    slug: 'a7',
    order: 1,
    status: 'open',                    // 'open' | 'under_construction'
    kind: 'Kost',                      // badge text on image
    name: 'Homy Permata A7',
    shortName: 'Permata A7',
    locationLabel: '[ISI: lokasi singkat, contoh "Karawaci, Tangerang"]',
    address: '[ISI: alamat lengkap Homy Permata A7]',
    description: '[ISI: 2-3 paragraf "Tentang Hunian" Homy Permata A7. Lihat template di file 08]',
    totalRooms: 18,
    deposit: 500000,
    gallery: placeholderPhotos('Homy Permata A7', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [], // none are exclusive; highlights below carry the differentiation
    highlights: [
      { id: 'four-types',   label: '4 tipe kamar, termasuk Deluxe',                     showOnCard: true, showOnDetail: true },
      { id: 'private-bath', label: 'Kamar mandi dalam + water heater di semua kamar',   showOnCard: true, showOnDetail: true },
    ],
    parking: {
      summary: 'Parkir di teras depan kost',
      detail:  'Area parkir berada di teras depan kost.',
    },
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 9, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar, contoh "3 x 4 m"]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard A7', 4) },
      { id: 'superior',  name: 'Superior',  price: 1900000, units: 4, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior A7', 4) },
      { id: 'deluxe',    name: 'Deluxe',    price: 2000000, units: 2, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Deluxe A7', 4) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 3, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Executive A7', 4) },
    ],
    map: { ...KARAWACI_MAP },
    pois: KARAWACI_POIS,
  },

  /* ------------------------------------------------ 2. H14 */
  {
    id: 'h14',
    slug: 'h14',
    order: 2,
    status: 'open',
    kind: 'Kost',
    name: 'Homy Residence H14',
    shortName: 'Residence H14',
    locationLabel: '[ISI: lokasi singkat H14. Catatan: POI mengarah ke Surabaya, mohon konfirmasi kota]',
    address: '[ISI: alamat lengkap Homy Residence H14]',
    description: '[ISI: 2-3 paragraf "Tentang Hunian" Homy Residence H14]',
    totalRooms: 18,
    deposit: 500000,
    gallery: placeholderPhotos('Homy Residence H14', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_basement', 'electricity_token'],
    uniqueFacilityIds: ['parking_basement'],
    highlights: [
      { id: 'private-bath',     label: 'Kamar mandi dalam + water heater di semua kamar', showOnCard: true,  showOnDetail: true },
      { id: 'basement-parking', label: 'Parkir basement (motor gratis)',                  showOnCard: false, showOnDetail: true }, // NEVER on homepage
    ],
    parking: {
      summary: 'Parkir basement',
      detail:
        'Parkir motor gratis. Parkir mobil Rp150.000 untuk menjaga/memesan slot parkir ([ISI: konfirmasi apakah per bulan atau sekali bayar]).',
    },
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 16, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard H14', 4) },
      { id: 'superior',  name: 'Superior',  price: 1850000, units: 1, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior H14', 4) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 1, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Executive H14', 4) },
    ],
    map: { ...SURABAYA_MAP },
    pois: SURABAYA_POIS,
  },

  /* ------------------------------------------------ 3. Parahyangan */
  {
    id: 'parahyangan',
    slug: 'parahyangan',
    order: 3,
    status: 'open',
    kind: 'Kost',
    name: 'Homy Parahyangan',
    shortName: 'Parahyangan',
    locationLabel: '[ISI: lokasi singkat Homy Parahyangan]',
    address: '[ISI: alamat lengkap Homy Parahyangan]',
    description: '[ISI: 2-3 paragraf "Tentang Hunian" Homy Parahyangan]',
    totalRooms: 14, // DERIVED (4 + 9 + 1). Owner to confirm. See file 08.
    deposit: 500000,
    gallery: placeholderPhotos('Homy Parahyangan', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'bathroom_out', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [],
    highlights: [
      { id: 'small-tier',   label: 'Tersedia tipe Small mulai Rp1.200.000',           showOnCard: true,  showOnDetail: true },
      { id: 'bath-choice',  label: 'Pilihan kamar mandi dalam (Superior) atau luar',  showOnCard: false, showOnDetail: true },
    ],
    parking: {
      summary: 'Parkir di teras depan kost',
      detail:  'Area parkir berada di teras depan kost.',
    },
    roomTypes: [
      { id: 'small',    name: 'Small',    price: 1200000, units: 1, bathroom: 'out',
        facilityIds: ['ac','wifi','bathroom_out','water_heater'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Small Parahyangan', 4) },
      { id: 'standard', name: 'Standard', price: 1450000, units: 9, bathroom: 'out',
        facilityIds: ['ac','wifi','furnished','bathroom_out','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard Parahyangan', 4) },
      { id: 'superior', name: 'Superior', price: 1650000, units: 4, bathroom: 'in',
        facilityIds: ['ac','wifi','furnished','bathroom_in','water_heater','laundry_free'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior Parahyangan', 4) },
    ],
    map: { ...KARAWACI_MAP },
    pois: KARAWACI_POIS,
  },

  /* ------------------------------------------------ 4. Alamanda */
  {
    id: 'alamanda',
    slug: 'alamanda',
    order: 4,
    status: 'open',
    kind: 'Kost',
    name: 'Homy Budget Alamanda',
    shortName: 'Budget Alamanda',
    locationLabel: '[ISI: lokasi singkat Homy Budget Alamanda]',
    address: '[ISI: alamat lengkap Homy Budget Alamanda]',
    description: '[ISI: 2-3 paragraf "Tentang Hunian" Homy Budget Alamanda]',
    totalRooms: 40,
    deposit: 200000,
    gallery: placeholderPhotos('Homy Budget Alamanda', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_out', 'washing_machine', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: ['washing_machine'],
    highlights: [
      { id: 'cheapest',        label: 'Paling terjangkau, Rp1.000.000/bulan', showOnCard: true,  showOnDetail: true },
      { id: 'washing-machine', label: 'Mesin cuci tersedia di lantai 4',      showOnCard: true,  showOnDetail: true },
      { id: 'low-deposit',     label: 'Deposit hanya Rp200.000',              showOnCard: false, showOnDetail: true },
    ],
    parking: {
      summary: 'Parkir di teras depan kost',
      detail:  'Area parkir berada di teras depan kost.',
    },
    roomTypes: [
      { id: 'standard', name: 'Standard', price: 1000000, units: 40, bathroom: 'out',
        facilityIds: ['ac','wifi','furnished','bathroom_out'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard Alamanda', 4) },
    ],
    map: { ...KARAWACI_MAP },
    pois: KARAWACI_POIS,
  },

  /* ------------------------------------------------ 5. Villa (inactive) */
  {
    id: 'villa-purnava',
    slug: 'villa-purnava',
    order: 5,
    status: 'under_construction',
    kind: 'Villa',
    name: 'Villa Purnava Permata',
    shortName: 'Villa Purnava',
    locationLabel: '[ISI: lokasi singkat Villa Purnava Permata]',
    gallery: placeholderPhotos('Villa Purnava Permata', 1),
    roomTypes: [],
    facilityIds: [],
    highlights: [],
    pois: [],
    map: null,
  },
];

export const getProperty = (slug) => PROPERTIES.find((p) => p.slug === slug);
export const OPEN_PROPERTIES = PROPERTIES.filter((p) => p.status === 'open');
```

### `src/data/houseRules.js`
Per-property override-able placeholders for the "Aturan / Kebijakan / Tata Tertib" sections (all `[ISI: ...]` until the owner confirms; full explanation in file 08):
```js
export const DEFAULT_HOUSE_INFO = {
  occupantPolicy: '[ISI: penghuni putra / putri / campur, contoh: "Kost campur dengan lantai terpisah"]',
  additionalOccupants: '[ISI: aturan tambahan penghuni, contoh: "Tambahan penghuni tidak diperbolehkan"]',
  checkInOut: '[ISI: jam check-in dan check-out, contoh: "Check-in 08.00-20.00, check-out maks 12.00"]',
  minimumStay: '[ISI: minimal masa sewa, contoh: "Minimal 1 bulan"]',
  cancellation: '[ISI: kebijakan pembatalan / pengembalian deposit]',
  access24h: '[ISI: akses 24 jam? kunci/kode/security]',
  overnightGuests: '[ISI: aturan tamu menginap]',
  visitors: '[ISI: aturan bertamu, jam malam, tamu lawan jenis]',
  smoking: '[ISI: aturan merokok]',
  pets: '[ISI: aturan hewan peliharaan]',
  extraRules: '[ISI: aturan tambahan lain (opsional)]',
};

export const HOUSE_INFO_BY_SLUG = {
  a7: {}, h14: {}, parahyangan: {}, alamanda: {}, // spread over DEFAULT_HOUSE_INFO; owner overrides per property
};
```

### `src/data/faq.js`
Build FAQ answers **from data where possible** (functions that take a property) and placeholders otherwise:
```js
export const buildFaq = (p, helpers) => [
  { q: `Fasilitas apa saja yang tersedia di ${p.name}?`,
    a: `Fasilitas meliputi ${helpers.facilityLabels(p).join(', ')}. ${helpers.NOTES.electricity}` },
  { q: 'Tipe kamar apa saja yang tersedia?',
    a: `${p.name} menyediakan tipe ${p.roomTypes.map(r => `${r.name} (Rp${helpers.num(r.price)}/bulan)`).join(', ')}. Detail ada di bagian Kamar.` },
  { q: `Apakah wajib membayar deposit di ${p.name}?`,
    a: helpers.NOTES.depositTemplate(helpers.rupiah(p.deposit)) },
  { q: 'Apakah listrik sudah termasuk?',
    a: 'Tidak. Listrik menggunakan token meter per kamar sehingga dibayar terpisah sesuai pemakaian.' },
  { q: 'Apakah diperbolehkan membawa hewan peliharaan?', a: '[ISI: jawaban aturan hewan peliharaan]' },
  { q: 'Apakah merokok diperbolehkan?',                  a: '[ISI: jawaban aturan merokok]' },
  { q: 'Bagaimana cara booking?',
    a: 'Klik tombol "Book Now" untuk chat langsung dengan tim kami via WhatsApp. Proses booking dilakukan di WhatsApp, bukan di website ini.' },
];
```

---

## 9. Derived values (compute, never hard-code)

| Value | Formula |
|---|---|
| `priceFrom` | min of `roomTypes[].price` |
| Room type count on card | `roomTypes.length` → "4 Tipe Kamar" (singular/plural: always "Tipe Kamar") |
| Facility count on card | `facilityIds.length` excluding `electricity_token`, labelled "N Fasilitas" |
| Card shared mini-icons | `ac`, `wifi` icons always shown |
| Highlights on card | `highlights.filter(h => h.showOnCard).slice(0, 2)` |
| Highlights on detail | `highlights.filter(h => h.showOnDetail)` |
| Formatted price | `formatRupiah(1700000) → "Rp1.700.000"` using `Intl.NumberFormat('id-ID')` with manual "Rp" prefix |
