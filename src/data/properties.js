// All property content. Prices are Rupiah per month (plain integers).
// Keep this file free of Vite-specific imports: scripts/prerender-meta.mjs imports it in Node.
import { buildPois, pinUrl } from './pois.js';

// Map from the owner's pin (strings, exact). The embed pins that exact point.
const mapFor = (pin) => ({
  embedUrl: `https://www.google.com/maps?q=${pin.lat},${pin.lng}&z=16&output=embed`,
  openUrl: pinUrl(pin),
});

const placeholderPhotos = (label, n = 4) =>
  Array.from({ length: n }, (_, i) => ({ src: null, alt: `Foto ${label} ${i + 1} (placeholder)`, label: `${label} ${i + 1}` }));

// "Tentang Hunian" (shown inside Tata Tertib). Character only: never prices, room types,
// facilities, deposit, electricity or nearby places (those have their own sections).
const aboutPlaceholder = (name) =>
  `[ISI: 2-3 kalimat tentang karakter ${name}: suasana dan cocok untuk siapa. Jangan menyebut harga, tipe kamar, fasilitas, deposit, listrik, atau tempat terdekat]`;

// Room types:
//   rooms     = room letters/names as shown on the card ("Kamar ..."); null → "Semua kamar"
//   units     = number of rooms of this type (all types must add up to totalRooms)
//   facilityIds = ONLY facilities that differ between this property's room types.
//               Facilities shared by every room type live in the property's facilityIds (Fasilitas section).
// Property `facilityNotes` adds a detail line under a facility row in the Fasilitas section.

// Kost type (owner-confirmed, Update 03). Each kost has `kostType: 'putri' | 'campur'`.
//   label     → badge on the homepage card and the link-preview description
//   occupants → Tata Tertib → Penghuni → "Siapa yang bisa tinggal"
export const KOST_TYPES = {
  putri: { label: 'Kost Putri', occupants: 'Kost Putri (khusus putri)' },
  campur: { label: 'Kost Campur', occupants: 'Kost Campur (putra dan putri)' },
};

export const PROPERTIES = [
  /* ------------------------------------------------ 1. A7 */
  {
    id: 'a7',
    slug: 'a7',
    order: 1,
    status: 'open',                    // 'open' | 'under_construction'
    kind: 'Kost',                      // 'Kost' | 'Villa'
    kostType: 'campur',                // see KOST_TYPES above (badge on the homepage card, Tata Tertib, link preview)
    name: 'Homy Permata A7',
    shortName: 'Permata A7',
    locationLabel: 'Taman Permata, Binong, Tangerang',
    address: 'Jl. Permata Sari sektor 5 Blok A7 No.33, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810',
    description: aboutPlaceholder('Homy Permata A7'),
    pin: { lat: '-6.228501', lng: '106.586875' },
    totalRooms: 18,
    deposit: 500000,
    gallery: placeholderPhotos('Homy Permata A7', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [], // "Unggulan" marker on the detail page
    cardHighlights: ['4 tipe kamar, termasuk Deluxe', 'Kamar mandi dalam + water heater di semua kamar'], // max 2, never the price
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 9, rooms: 'A, B, C, D, H, I, J, K, Q', facilityIds: [],
        size: '[ISI: luas kamar, contoh "3 x 4 m"]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard A7', 4) },
      { id: 'superior',  name: 'Superior',  price: 1900000, units: 4, rooms: 'E, F, M, P', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior A7', 4) },
      { id: 'deluxe',    name: 'Deluxe',    price: 2000000, units: 2, rooms: 'L, Fanta', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Deluxe A7', 4) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 3, rooms: 'G, N, O', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Executive A7', 4) },
    ],
  },

  /* ------------------------------------------------ 2. H14 */
  {
    id: 'h14',
    slug: 'h14',
    order: 2,
    status: 'open',
    kind: 'Kost',
    kostType: 'putri',
    name: 'Homy Residence H14',
    shortName: 'Residence H14',
    locationLabel: 'Kalirungkut, Surabaya',
    address: 'Jl. Rungkut Mejoyo Selatan IX No 15 Blok H14, Kali Rungkut, Kec. Rungkut, Surabaya, Jawa Timur 60293',
    description: aboutPlaceholder('Homy Residence H14'),
    pin: { lat: '-7.321895', lng: '112.764931' },
    totalRooms: 18,
    deposit: 500000,
    gallery: placeholderPhotos('Homy Residence H14', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_basement', 'electricity_token'],
    uniqueFacilityIds: ['parking_basement'],
    // Basement parking is NOT a card highlight: parking never appears on the homepage.
    cardHighlights: ['Kamar mandi dalam + water heater di semua kamar'],
    facilityNotes: {
      parking_basement:
        'Parkir motor gratis. Parkir mobil Rp150.000 untuk menjaga/memesan slot parkir ([ISI: konfirmasi apakah per bulan atau sekali bayar]).',
    },
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 16, rooms: 'B – Q', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard H14', 4) },
      { id: 'superior',  name: 'Superior',  price: 1850000, units: 1, rooms: 'R', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior H14', 4) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 1, rooms: 'A', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Executive H14', 4) },
    ],
  },

  /* ------------------------------------------------ 3. Parahyangan */
  {
    id: 'parahyangan',
    slug: 'parahyangan',
    order: 3,
    status: 'open',
    kind: 'Kost',
    kostType: 'campur',
    name: 'Homy Parahyangan',
    shortName: 'Parahyangan',
    locationLabel: 'Taman Parahyangan, Binong, Tangerang',
    address: 'Jl. Taman Parahyangan I No.88, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810',
    description: aboutPlaceholder('Homy Parahyangan'),
    pin: { lat: '-6.226586', lng: '106.583741' },
    totalRooms: 14,
    deposit: 500000,
    gallery: placeholderPhotos('Homy Parahyangan', 6),
    // Bathroom differs per room type → shown on the room cards only, not here.
    facilityIds: ['ac', 'wifi', 'furnished', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [],
    cardHighlights: ['Ada tipe Small, pilihan paling hemat'],
    roomTypes: [
      // Small: same facilities as the other types; the only difference is the bathroom outside.
      { id: 'small',    name: 'Small',    price: 1200000, units: 1, rooms: 'L', facilityIds: ['bathroom_out'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Small Parahyangan', 4) },
      { id: 'standard', name: 'Standard', price: 1450000, units: 9, rooms: 'E – K, M, N', facilityIds: ['bathroom_out'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard Parahyangan', 4) },
      { id: 'superior', name: 'Superior', price: 1650000, units: 4, rooms: 'A – D', facilityIds: ['bathroom_in'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Superior Parahyangan', 4) },
    ],
  },

  /* ------------------------------------------------ 4. Alamanda */
  {
    id: 'alamanda',
    slug: 'alamanda',
    order: 4,
    status: 'open',
    kind: 'Kost',
    kostType: 'putri',
    name: 'Homy Budget Alamanda',
    shortName: 'Budget Alamanda',
    locationLabel: 'Lippo Karawaci, Tangerang',
    address: 'Jl. Alamanda IV Blok J.3 No.13, RT.7/RW.7, Bencongan, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810',
    description: aboutPlaceholder('Homy Budget Alamanda'),
    pin: { lat: '-6.223237', lng: '106.604628' },
    totalRooms: 40,
    deposit: 200000,
    gallery: placeholderPhotos('Homy Budget Alamanda', 6),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_out', 'washing_machine', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: ['washing_machine'],
    cardHighlights: ['Mesin cuci tersedia di lantai 4', 'Pilihan paling hemat'],
    roomTypes: [
      { id: 'standard', name: 'Standard', price: 1000000, units: 40, rooms: null, facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: placeholderPhotos('Tipe Standard Alamanda', 4) },
    ],
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
    cardHighlights: [],
    pin: null,
  },
].map((p) => ({
  ...p,
  map: p.pin ? mapFor(p.pin) : null,
  pois: p.pin ? buildPois(p.slug, p.pin) : [],
}));

export const getProperty = (slug) => PROPERTIES.find((p) => p.slug === slug);
export const OPEN_PROPERTIES = PROPERTIES.filter((p) => p.status === 'open');
