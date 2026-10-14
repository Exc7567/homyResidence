import { prefersReducedMotion } from './hooks';

// Detail-page section tabs, in page order (ids match the section elements).
// "poi" is a block inside the Lokasi section (below the map and address).
export const SECTION_TABS = [
  { id: 'foto', label: 'Foto' },
  { id: 'fasilitas', label: 'Fasilitas' },
  { id: 'kamar', label: 'Kamar' },
  { id: 'lokasi', label: 'Lokasi' },
  { id: 'poi', label: 'Point of Interest' },
  { id: 'tata-tertib', label: 'Tata Tertib' },
  { id: 'faq', label: 'FAQ' },
];

export const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
};
