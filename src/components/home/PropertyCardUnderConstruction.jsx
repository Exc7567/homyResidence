import { MapPin } from 'lucide-react';
import { isPlaceholder } from '../../lib/placeholders';
import ImageWithFallback from '../common/ImageWithFallback';

// Greyed, non-interactive card: no ribbon, no buttons, no link, not focusable.
export default function PropertyCardUnderConstruction({ property: p }) {
  return (
    <article
      className="property-card property-card--uc"
      role="group"
      aria-disabled="true"
      aria-label={`${p.name}, Under Construction`}
    >
      <div className="property-card__media property-card__media--uc">
        <ImageWithFallback image={p.gallery?.[0]} aspect="4/3" />
      </div>
      <div className="property-card__body">
        <h3 className="property-card__name">{p.name}</h3>
        {p.locationLabel && !isPlaceholder(p.locationLabel) && (
          <p className="property-card__location">
            <MapPin size={16} aria-hidden="true" />
            <span className="property-card__location-text">{p.locationLabel}</span>
          </p>
        )}
        <p className="property-card__uc-label">Under Construction</p>
      </div>
    </article>
  );
}
