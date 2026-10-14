import { buildWaLink } from '../../lib/whatsapp';
import WhatsAppIcon from './WhatsAppIcon';

const DEFAULT_LABEL = { general: 'Book Now', property: 'Book Now', room: 'Book Now', visit: 'Jadwalkan Visit' };

// Every WhatsApp action is an <a> (works best on iOS and for accessibility).
export default function WhatsAppButton({
  intent = 'general',
  property,
  room,
  variant = 'solid',
  size,
  block = false,
  className = '',
  icon,
  children,
  ...rest
}) {
  const cls = [
    'btn',
    variant === 'outline' ? 'btn-wa-outline' : 'btn-wa',
    size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className,
  ].join(' ');
  return (
    <a
      href={buildWaLink({ intent, property, room })}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      data-intent={intent}
      data-property={property?.slug}
      {...rest}
    >
      {icon ?? <WhatsAppIcon />}
      <span>{children ?? DEFAULT_LABEL[intent] ?? 'Book Now'}</span>
    </a>
  );
}
