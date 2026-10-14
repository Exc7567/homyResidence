import { buildWaLink } from '../../lib/whatsapp';
import WhatsAppIcon from '../common/WhatsAppIcon';

// Floating WhatsApp button for mobile/tablet (hidden ≥1024, where the header has "Book Now").
// Not used on detail pages: the bottom bar carries the WhatsApp action there.
export default function FloatingWhatsApp() {
  const intent = 'general';
  return (
    <a
      href={buildWaLink({ intent })}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa animate-pop-in"
      aria-label="Chat WhatsApp Homy Residence"
      data-intent={intent}
    >
      <span className="floating-wa__ring animate-pulse-ring" aria-hidden="true" />
      <WhatsAppIcon size={28} />
    </a>
  );
}
