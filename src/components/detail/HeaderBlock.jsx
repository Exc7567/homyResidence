import { MapPin } from 'lucide-react';
import Text from '../common/Text';

// Page identity only: name + location label. Everything else has its own section.
export default function HeaderBlock({ property: p }) {
  return (
    <div className="header-block">
      <h1 id="property-title" className="header-block__title animate-fade-up">{p.name}</h1>
      <p className="header-block__meta animate-fade-up [animation-delay:60ms]">
        <MapPin size={18} aria-hidden="true" className="header-block__pin" />
        <Text value={p.locationLabel} />
      </p>
    </div>
  );
}
