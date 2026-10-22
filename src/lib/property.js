// Derived values (file 03 section 9). Compute, never hard-code.
import { KOST_TYPES } from '../data/properties.js';

// Homepage card badge: "Kost Putri" / "Kost Campur"; otherwise the kind (e.g. "Villa").
export const badgeLabel = (p) => KOST_TYPES[p.kostType]?.label ?? p.kind;

export const priceFrom = (p) => Math.min(...p.roomTypes.map((r) => r.price));

export const sortedRoomTypes = (p) => [...p.roomTypes].sort((a, b) => a.price - b.price);

export const cardHighlights = (p) => (p.cardHighlights || []).slice(0, 2);

// Homepage card photos: the gallery, starting with `cardCover` (a gallery file, e.g. 'alamanda4.jpg') when set.
export const cardPhotos = (p) => {
  const i = p.cardCover ? p.gallery.findIndex((g) => g.src?.endsWith('/' + encodeURI(p.cardCover))) : -1;
  return i > 0 ? [p.gallery[i], ...p.gallery.filter((_, j) => j !== i)] : p.gallery;
};

// "Kamar A, B, C" / "Kamar B – Q" / "Semua kamar".
export const roomsLabel = (room) => (room.rooms ? `Kamar ${room.rooms}` : 'Semua kamar');

// Detail facility order: ac, wifi, rest in array order, electricity_token last.
export const orderedFacilityIds = (p) => {
  const first = ['ac', 'wifi'].filter((id) => p.facilityIds.includes(id));
  const rest = p.facilityIds.filter((id) => !first.includes(id) && id !== 'electricity_token');
  const last = p.facilityIds.includes('electricity_token') ? ['electricity_token'] : [];
  return [...first, ...rest, ...last];
};

// Nearest campus for the homepage card (pois are already sorted by minutes within a category).
export const nearestCampus = (p) => (p.pois || []).find((poi) => poi.category === 'universitas') || null;
