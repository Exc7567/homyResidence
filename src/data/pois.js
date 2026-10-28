// Points of Interest (approved list: update-md/homy-properties-poi.md, UPDATE-01 §4).
// One shared catalog (many POIs appear near several properties) + minutes by motorcycle per property.
// Coordinates stay strings so the Google Maps route URLs match the owner's source file exactly.
// Keep this file free of Vite-specific imports: scripts import it in Node.
import { POI_PHOTO_IDS } from './poiPhotos.js';

// Fixed order and labels for every property.
export const POI_CATEGORIES = [
  { id: 'universitas', label: 'Universitas' },
  { id: 'mall', label: 'Mall' },
  { id: 'supermarket', label: 'Supermarket' },
  { id: 'rumah-sakit', label: 'Rumah Sakit' },
];

export const POI_CATEGORY_LABELS = Object.fromEntries(POI_CATEGORIES.map((c) => [c.id, c.label]));

// Optional `cardName` = shorter name for the homepage card (detail page keeps `name`).
export const POI_CATALOG = {
  // Surabaya
  'ubaya':                  { name: 'Universitas Surabaya (UBAYA)',     category: 'universitas', lat: '-7.320103', lng: '112.767937' },
  'transmart-rungkut':      { name: 'Transmart Rungkut',                category: 'mall',        lat: '-7.320790', lng: '112.770455' },
  'plasa-marina':           { name: 'Plasa Marina Surabaya',            category: 'mall',        lat: '-7.315908', lng: '112.748364' },
  'trans-icon-mall':        { name: 'Trans Icon Mall',                  category: 'mall',        lat: '-7.338686', lng: '112.728729' },
  'alfamidi-rungkut':       { name: 'Alfamidi Rungkut',                 category: 'supermarket', lat: '-7.320799', lng: '112.765884' },
  'indomaret-raya-tenggilis': { name: 'Indomaret Raya Tenggilis',       category: 'supermarket', lat: '-7.320193', lng: '112.761470' },
  'palapa-swalayan':        { name: 'Palapa Swalayan',                  category: 'supermarket', lat: '-7.320016', lng: '112.755907' },
  'chicco-swalayan':        { name: 'Chicco Swalayan',                  category: 'supermarket', lat: '-7.320566', lng: '112.754737' },
  'ubaya-medical-center':   { name: 'Ubaya Medical Center',             category: 'rumah-sakit', lat: '-7.319365', lng: '112.766945' },
  'rs-ubaya':               { name: 'RS Ubaya',                         category: 'rumah-sakit', lat: '-7.314191', lng: '112.765751' },
  // Tangerang
  'pramita':                { name: 'Universitas Pramita Indonesia',    category: 'universitas', lat: '-6.234057', lng: '106.585048' },
  'uph-college':            { name: 'UPH College',                      category: 'universitas', lat: '-6.228131', lng: '106.611514' },
  'uph':                    { name: 'Universitas Pelita Harapan (UPH)', cardName: 'Universitas Pelita Harapan', category: 'universitas', lat: '-6.228373', lng: '106.611269' },
  'supermal-karawaci':      { name: 'Supermal Karawaci',                category: 'mall',        lat: '-6.226553', lng: '106.607182' },
  'maxxbox-lippo-village':  { name: 'MaxxBox Lippo Village',            category: 'mall',        lat: '-6.229035', lng: '106.606565' },
  'indomaret-taman-permata': { name: 'Indomaret Taman Permata',         category: 'supermarket', lat: '-6.227609', lng: '106.582488' },
  'alfamart-permata-raya':  { name: 'Alfamart Permata Raya',            category: 'supermarket', lat: '-6.224280', lng: '106.591463' },
  'indomaret-harapan-kita': { name: 'Indomaret Harapan Kita',           category: 'supermarket', lat: '-6.219865', lng: '106.601546' },
  'siloam-lippo-village':   { name: 'Siloam Hospitals Lippo Village',   category: 'rumah-sakit', lat: '-6.225462', lng: '106.598768' },
};

// Approved POIs per property: [catalog id, minutes by motorcycle]. Do not mix between properties.
export const POI_MINUTES_BY_SLUG = {
  h14: [
    ['ubaya', 3],
    ['transmart-rungkut', 4], ['plasa-marina', 10], ['trans-icon-mall', 18],
    ['alfamidi-rungkut', 2], ['indomaret-raya-tenggilis', 3], ['palapa-swalayan', 5], ['chicco-swalayan', 6],
    ['ubaya-medical-center', 3], ['rs-ubaya', 5],
  ],
  a7: [
    ['pramita', 4], ['uph-college', 12], ['uph', 12],
    ['supermal-karawaci', 10], ['maxxbox-lippo-village', 10],
    ['indomaret-taman-permata', 3], ['alfamart-permata-raya', 4],
    ['siloam-lippo-village', 7],
  ],
  alamanda: [
    ['uph-college', 5], ['uph', 5], ['pramita', 12],
    ['supermal-karawaci', 3], ['maxxbox-lippo-village', 4],
    ['indomaret-harapan-kita', 3],
    ['siloam-lippo-village', 4],
  ],
  parahyangan: [
    ['pramita', 4], ['uph-college', 14], ['uph', 14],
    ['supermal-karawaci', 12], ['maxxbox-lippo-village', 12],
    ['indomaret-taman-permata', 2], ['alfamart-permata-raya', 5],
    ['siloam-lippo-village', 8],
  ],
};

export const pinUrl = (pin) => `https://www.google.com/maps/search/?api=1&query=${pin.lat},${pin.lng}`;

export const routeUrl = (pin, poi) =>
  `https://www.google.com/maps/dir/?api=1&origin=${pin.lat},${pin.lng}&destination=${poi.lat},${poi.lng}&travelmode=two-wheeler`;

// Processed photos live in public/images/poi (see scripts/process-poi-photos.mjs).
// One photo per POI, reused wherever that POI appears. Missing → standard placeholder.
const poiPhoto = (id, name) =>
  POI_PHOTO_IDS.includes(id)
    ? { src: `/images/poi/${id}.webp`, srcSm: `/images/poi/${id}-sm.webp`, alt: `Foto ${name}`, label: name }
    : { src: null, alt: `Foto ${name} (placeholder)`, label: name };

const CATEGORY_ORDER = POI_CATEGORIES.map((c) => c.id);

// Ordered by category (fixed order), then minutes ascending (ties keep the source order).
export function buildPois(slug, pin) {
  return (POI_MINUTES_BY_SLUG[slug] || [])
    .map(([id, minutes], i) => {
      const poi = POI_CATALOG[id];
      return { id, ...poi, minutes, photo: poiPhoto(id, poi.name), routeUrl: routeUrl(pin, poi), _i: i };
    })
    .sort((a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) || a.minutes - b.minutes || a._i - b._i)
    .map(({ _i, ...poi }) => poi);
}
