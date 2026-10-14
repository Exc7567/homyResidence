// Derived values (file 03 section 9). Compute, never hard-code.

export const priceFrom = (p) => Math.min(...p.roomTypes.map((r) => r.price));

export const sortedRoomTypes = (p) => [...p.roomTypes].sort((a, b) => a.price - b.price);

export const cardHighlights = (p) => (p.cardHighlights || []).slice(0, 2);

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
