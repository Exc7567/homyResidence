import { BRAND } from '../data/brand';
import { formatRupiah } from './format';

const TEMPLATES = {
  // OWNER WILL EDIT THESE LATER. Keep {placeholders} in curly braces.
  general:  'Halo Homy Residence, saya ingin menanyakan hunian yang tersedia. Boleh dibantu?',
  property: 'Halo Homy Residence, saya ingin menanyakan hunian {property}. Boleh dibantu?',
  room:     'Halo Homy Residence, saya tertarik dengan kamar tipe {room} di {property} ({price}/bulan). Apakah masih tersedia?',
  roomFull: 'Halo Homy Residence, kamar tipe {room} di {property} sedang penuh. Boleh saya masuk daftar tunggu?',
  visit:    'Halo Homy Residence, saya ingin menjadwalkan visit ke {property}. Boleh dibantu?',
};

export function buildWaMessage({ intent = 'general', property, room } = {}) {
  let t = TEMPLATES[intent] || TEMPLATES.general;
  if (intent === 'room' && room?.status === 'full') t = TEMPLATES.roomFull;
  if (!property && (intent === 'property' || intent === 'room' || intent === 'visit')) t = TEMPLATES.general;
  return t
    .replace('{property}', property?.name ?? '')
    .replace('{room}', room?.name ?? '')
    .replace('{price}', room ? formatRupiah(room.price) : '');
}

export function buildWaLink(opts = {}) {
  const text = buildWaMessage(opts);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
