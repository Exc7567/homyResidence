import { BRAND } from '../data/brand';
import { formatRupiah } from './format';

const TEMPLATES = {
  // OWNER WILL EDIT THESE LATER. Keep {placeholders} in curly braces.
  // "\n" is a line break in the WhatsApp message; "\n\n" leaves one blank line between sections.
  general:  'Halo Homy Residence, saya ingin menanyakan hunian yang tersedia. Boleh dibantu?',
  property: 'Halo Homy Residence, saya ingin menanyakan hunian\n\n* {property}\n\nBoleh dibantu?',
  room:     'Halo Homy Residence, saya tertarik dengan kamar\n\n* Tipe {room} ({price}/bulan)\n* {property}\n\nApakah masih tersedia?',
  roomFull: 'Halo Homy Residence, kamar ini sedang penuh\n\n* Tipe {room} ({price}/bulan)\n* {property}\n\nBoleh saya masuk daftar tunggu?',
  visit:    'Halo Homy Residence, saya ingin menjadwalkan visit ke\n\n* {property}\n\nBoleh dibantu?',
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

// A plain chat with a phone number, no preloaded message. "081311654066" → https://wa.me/6281311654066
export const buildWaChatLink = (phone) => `https://wa.me/${phone.replace(/\D/g, '').replace(/^0/, '62')}`;
