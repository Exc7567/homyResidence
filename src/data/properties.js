// All property content. Prices are Rupiah per month (plain integers).
// Keep this file free of Vite-specific imports: scripts/prerender-meta.mjs imports it in Node.
import { buildPois, pinUrl } from './pois.js';

// Map from the owner's pin (strings, exact). The embed pins that exact point.
const mapFor = (pin) => ({
  embedUrl: `https://www.google.com/maps?q=${pin.lat},${pin.lng}&z=16&output=embed`,
  openUrl: pinUrl(pin),
});

// `placeholder: 'room'`: an empty (or failed) room/property photo slot shows the room illustration
// with "Foto segera hadir" (ImageWithFallback). POI photos do not have it and keep the plain placeholder.
// No photo yet: one empty slot (no arrows, dots or counter).
const noPhoto = (label) => [{ src: null, alt: 'Foto belum tersedia', label, placeholder: 'room' }];

// Real photos: public/property-pictures/<folder>/<file>, original file names, in the order given.
// GitHub Pages is case-sensitive: folder, file name and extension must match the file exactly.
const photos = (folder, label, files) =>
  files.map((file, i) => ({ src: encodeURI(`/property-pictures/${folder}/${file}`), alt: `${label} — foto ${i + 1}`, label, placeholder: 'room' }));

// Homy Residence H14 photos are sorted into subfolders. Room folders (owner-confirmed, Update 04):
// standard/ = Standard, superior/ = Executive (room A), deluxe/ = Superior (room R, the remaining type).
// Listed in slide order (the first one is the room card's first slide).
const H14_ROOM_PHOTOS = {
  standard: ['standard/IMG-20261019-WA0199.jpg', 'standard/IMG-20261019-WA0195.jpg'],
  superior: ['deluxe/IMG-20261019-WA0205.jpg', 'deluxe/IMG-20261019-WA0209.jpg'],
  executive: ['superior/IMG-20261019-WA0213.jpg', 'superior/IMG-20261019-WA0202.jpg', 'superior/IMG-20261019-WA0210.jpg'],
};
// Gallery = every H14 photo: the facade first (the property page opens on the building), then the rest by name.
const H14_GALLERY = [
  'fasad/h14-1.jpg', 'fasad/IMG-20261019-WA0184.jpg', 'fasad/IMG-20261019-WA0185.jpg',
  'fasad/IMG-20261019-WA0215.jpg', 'fasad/IMG-20261019-WA0217.jpg', 'fasad/IMG-20261019-WA0220.jpg',
  'basement-parking.jpg', 'dapur/IMG-20261019-WA0186.jpg', 'dapur/IMG-20261019-WA0190.jpg',
  'deluxe/IMG-20261019-WA0205.jpg', 'deluxe/IMG-20261019-WA0209.jpg', 'hall.jpg',
  'standard/IMG-20261019-WA0195.jpg', 'standard/IMG-20261019-WA0199.jpg',
  'superior/IMG-20261019-WA0202.jpg', 'superior/IMG-20261019-WA0210.jpg', 'superior/IMG-20261019-WA0213.jpg',
];

// A7 room folders (Update 05, matched by folder name): standard/, superior/, deluxe/, numeric order.
// There is no Executive folder: Executive keeps a7-1 to a7-3 (owner: these are its correct photos).
const A7_ROOM_PHOTOS = {
  standard: ['standard/1.jpg', 'standard/2.jpg', 'standard/3.jpg'],
  superior: ['superior/1.jpg', 'superior/2.jpg', 'superior/3.jpg', 'superior/4.jpg'],
  deluxe: ['deluxe/1.jpg', 'deluxe/2.jpg', 'deluxe/3.jpg'],
  executive: ['a7-1.jpg', 'a7-2.jpg', 'a7-3.jpg'],
};
// Gallery = every A7 photo, natural path order (the first one is the homepage and mini card photo).
const A7_GALLERY = [
  'a7-1.jpg', 'a7-2.jpg', 'a7-3.jpg', 'a7-4.jpg', 'a7-5.jpg', 'a7-6.jpg', 'a7-7.jpg',
  ...A7_ROOM_PHOTOS.deluxe, ...A7_ROOM_PHOTOS.standard, ...A7_ROOM_PHOTOS.superior,
];

// Homy Parahyangan room folders (Update 05, matched by folder name): standard/, superior/; small/ is empty.
// No photos directly in the property folder, so the gallery = the room photos, natural path order.
const PARAHYANGAN_ROOM_PHOTOS = {
  standard: ['standard/1.jpg', 'standard/2.jpg', 'standard/3.jpg', 'standard/4.jpg'],
  superior: ['superior/1.jpg', 'superior/2.jpg', 'superior/3.jpg'],
};
const PARAHYANGAN_GALLERY = [...PARAHYANGAN_ROOM_PHOTOS.standard, ...PARAHYANGAN_ROOM_PHOTOS.superior];

// Room types:
//   rooms     = room letters/names as shown on the card ("Kamar ..."); null → "Semua kamar"
//   units     = number of rooms of this type (all types must add up to totalRooms)
//   facilityIds = ONLY facilities that differ between this property's room types.
//               Facilities shared by every room type live in the property's facilityIds (Fasilitas section).
// Property `facilityNotes` adds a detail line under a facility row in the Fasilitas section.

// Kost type (owner-confirmed, Update 03). Each kost has `kostType: 'putri' | 'campur'`.
//   label → badge on the homepage card and the link-preview description
export const KOST_TYPES = {
  putri: { label: 'Kost Putri' },
  campur: { label: 'Kost Campur' },
};

export const PROPERTIES = [
  /* ------------------------------------------------ 1. A7 */
  {
    id: 'a7',
    slug: 'a7',
    order: 1,
    status: 'open',                    // 'open' | 'under_construction'
    kind: 'Kost',                      // 'Kost' | 'Villa'
    kostType: 'campur',                // see KOST_TYPES above (badge on the homepage card, link preview)
    name: 'Homy Permata A7',
    shortName: 'Permata A7',
    locationLabel: 'Taman Permata, Binong, Tangerang',
    address: 'Jl. Permata Sari sektor 5 Blok A7 No.33, Binong, Kec. Curug, Kabupaten Tangerang, Banten 15810',
    pin: { lat: '-6.228501', lng: '106.586875' },
    totalRooms: 18,
    deposit: 500000,
    gallery: photos('A7', 'Homy Permata A7', A7_GALLERY),
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [], // "Unggulan" marker on the detail page
    cardHighlights: ['4 tipe kamar, termasuk Deluxe', 'Kamar mandi dalam + water heater di semua kamar'], // max 2, never the price
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 9, rooms: 'A, B, C, D, H, I, J, K, Q', facilityIds: [],
        size: '[ISI: luas kamar, contoh "3 x 4 m"]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('A7', 'Homy Permata A7 — Standard', A7_ROOM_PHOTOS.standard) },
      { id: 'superior',  name: 'Superior',  price: 1900000, units: 4, rooms: 'E, F, M, P', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('A7', 'Homy Permata A7 — Superior', A7_ROOM_PHOTOS.superior) },
      { id: 'deluxe',    name: 'Deluxe',    price: 2000000, units: 2, rooms: 'L, Fanta', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('A7', 'Homy Permata A7 — Deluxe', A7_ROOM_PHOTOS.deluxe) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 3, rooms: 'G, N, O', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('A7', 'Homy Permata A7 — Executive', A7_ROOM_PHOTOS.executive) },
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
    pin: { lat: '-7.321895', lng: '112.764931' },
    totalRooms: 18,
    deposit: 500000,
    gallery: photos('H14', 'Homy Residence H14', H14_GALLERY),
    cardCover: 'superior/IMG-20261019-WA0213.jpg', // homepage card only: this gallery photo comes first
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_in', 'water_heater', 'laundry_free', 'parking_basement', 'electricity_token'],
    uniqueFacilityIds: ['parking_basement'],
    // Basement parking is NOT a card highlight: parking never appears on the homepage.
    cardHighlights: ['Kamar mandi dalam + water heater di semua kamar'],
    facilityNotes: {
      parking_basement: 'Parkir motor gratis. Parkir mobil Rp150.000/bulan untuk menjaga/memesan slot parkir.',
    },
    roomTypes: [
      { id: 'standard',  name: 'Standard',  price: 1700000, units: 16, rooms: 'B – Q', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('H14', 'Homy Residence H14 Tipe Standard', H14_ROOM_PHOTOS.standard) },
      { id: 'superior',  name: 'Superior',  price: 1850000, units: 1, rooms: 'R', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('H14', 'Homy Residence H14 Tipe Superior', H14_ROOM_PHOTOS.superior) },
      { id: 'executive', name: 'Executive', price: 2500000, units: 1, rooms: 'A', facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('H14', 'Homy Residence H14 Tipe Executive', H14_ROOM_PHOTOS.executive) },
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
    pin: { lat: '-6.226586', lng: '106.583741' },
    totalRooms: 14,
    deposit: 500000,
    gallery: photos('PARAHYANGAN', 'Homy Parahyangan', PARAHYANGAN_GALLERY),
    // Bathroom differs per room type → shown on the room cards only, not here.
    facilityIds: ['ac', 'wifi', 'furnished', 'water_heater', 'laundry_free', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: [],
    cardHighlights: ['Ada tipe Small, pilihan paling hemat'],
    roomTypes: [
      // Small: same facilities as the other types; the only difference is the bathroom outside.
      { id: 'small',    name: 'Small',    price: 1200000, units: 1, rooms: 'L', facilityIds: ['bathroom_out'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]', photos: noPhoto('Homy Parahyangan — Small') },
      { id: 'standard', name: 'Standard', price: 1450000, units: 9, rooms: 'E – K, M, N', facilityIds: ['bathroom_out'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('PARAHYANGAN', 'Homy Parahyangan — Standard', PARAHYANGAN_ROOM_PHOTOS.standard) },
      { id: 'superior', name: 'Superior', price: 1650000, units: 4, rooms: 'A – D', facilityIds: ['bathroom_in'],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('PARAHYANGAN', 'Homy Parahyangan — Superior', PARAHYANGAN_ROOM_PHOTOS.superior) },
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
    pin: { lat: '-6.223237', lng: '106.604628' },
    totalRooms: 40,
    deposit: 200000,
    // alamanda1-2 = building, alamanda3-4 = room (owner, Update 04)
    gallery: photos('ALAMANDA', 'Homy Budget Alamanda', ['alamanda1.jpg', 'alamanda2.jpg', 'alamanda3.jpg', 'alamanda4.jpg']),
    cardCover: 'alamanda4.jpg', // homepage card only: this gallery photo comes first
    facilityIds: ['ac', 'wifi', 'furnished', 'bathroom_out', 'washing_machine', 'parking_front', 'electricity_token'],
    uniqueFacilityIds: ['washing_machine'],
    cardHighlights: ['Mesin cuci tersedia di lantai 4', 'Pilihan paling hemat'],
    roomTypes: [
      { id: 'standard', name: 'Standard', price: 1000000, units: 40, rooms: null, facilityIds: [],
        size: '[ISI: luas kamar]', occupancyNote: '[ISI: contoh "Harga untuk 1 orang"]',
        photos: photos('ALAMANDA', 'Homy Budget Alamanda Tipe Standard', ['alamanda4.jpg', 'alamanda3.jpg']) },
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
    gallery: noPhoto('Villa Purnava Permata'),
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
