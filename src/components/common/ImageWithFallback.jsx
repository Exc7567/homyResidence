import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { asset } from '../../lib/assets';
import { IS_DEV, PLACEHOLDER_TOOLTIP } from '../../lib/placeholders';
import RoomIllustration from './RoomIllustration';

// Renders a photo, or a neutral placeholder block when src is empty or fails to load.
// Room/property photos (`image.placeholder === 'room'`) get the room illustration + "Foto segera hadir" instead.
// Optional image.srcSm (400w) + src (800w) become a srcset; pass `sizes` with it.
// The wrapper always reserves the aspect ratio (no layout shift).
export default function ImageWithFallback({
  image,
  aspect,
  priority = false,
  className = '',
  imgClassName = '',
  fit = 'cover',
  sizes,
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = image?.src && !failed ? asset(image.src) : null;
  const label = image?.label || 'Homy Residence';
  const style = aspect ? { aspectRatio: aspect } : undefined;

  if (!src && image?.placeholder === 'room') {
    return (
      <div
        className={`img-ph img-ph--room ${IS_DEV ? 'img-ph--dev' : ''} ${className}`}
        style={style}
        role="img"
        aria-label="Foto belum tersedia"
        title={IS_DEV ? PLACEHOLDER_TOOLTIP : undefined}
      >
        <RoomIllustration className="img-ph__room" />
        <span className="img-ph__label">Foto segera hadir</span>
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className={`img-ph ${IS_DEV ? 'img-ph--dev' : ''} ${className}`}
        style={style}
        role="img"
        aria-label={image?.alt || `Foto ${label} (placeholder)`}
        title={IS_DEV ? PLACEHOLDER_TOOLTIP : undefined}
      >
        <ImageIcon className="img-ph__icon" strokeWidth={1.5} aria-hidden="true" />
        <span className="img-ph__label">Foto {label}</span>
      </div>
    );
  }

  return (
    <div className={`img-wrap ${loaded ? 'is-loaded' : ''} ${className}`} style={style}>
      <img
        src={src}
        alt={image.alt || `Foto ${label}`}
        loading={priority ? 'eager' : 'lazy'}
        // Lowercase: React 18 does not know the camelCase prop and warns about it.
        {...(priority ? { fetchpriority: 'high' } : {})}
        decoding="async"
        srcSet={image.srcSm ? `${asset(image.srcSm)} 400w, ${src} 800w` : undefined}
        sizes={sizes}
        className={imgClassName}
        style={{ objectFit: fit }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        draggable={false}
      />
    </div>
  );
}
