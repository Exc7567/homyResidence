import { useEffect, useRef, useState } from 'react';
import { Hand, MapPin } from 'lucide-react';

// Keyless Google Maps iframe pinned on the property coordinates (src/data/properties.js).
// An overlay prevents the map from trapping page scroll:
// the first tap/click activates it; tapping outside or leaving with the mouse deactivates it.
export default function MapEmbed({ map, title }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActive(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [active]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  if (!map?.embedUrl) {
    return (
      <div className="map map--empty">
        <MapPin size={28} aria-hidden="true" />
        <p>Peta belum tersedia</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`map ${active ? 'is-active' : ''}`}
      onMouseEnter={() => clearTimeout(leaveTimer.current)}
      onMouseLeave={() => {
        leaveTimer.current = setTimeout(() => setActive(false), 1000);
      }}
    >
      <iframe
        src={map.embedUrl}
        title={`Peta lokasi ${title}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        tabIndex={active ? 0 : -1}
      />
      {!active && (
        <button type="button" className="map__overlay" onClick={() => setActive(true)} aria-label="Aktifkan peta untuk digeser">
          <span className="map__hint">
            <Hand size={16} aria-hidden="true" /> Ketuk untuk menggeser peta
          </span>
        </button>
      )}
    </div>
  );
}
