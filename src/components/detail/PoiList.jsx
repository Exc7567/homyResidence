import { useRef, useState } from 'react';
import { Navigation } from 'lucide-react';
import { POI_CATEGORIES, POI_CATEGORY_LABELS } from '../../data/pois';
import { formatMinutes } from '../../lib/format';
import ImageWithFallback from '../common/ImageWithFallback';

// Point of Interest list with category tabs ("Semua" + the four fixed categories that exist).
// Each item: 4:3 photo, name, motorcycle time, and a "Rute" link (Google Maps, new tab).
export default function PoiList({ pois }) {
  const categories = POI_CATEGORIES.map((c) => c.id).filter((id) => pois.some((p) => p.category === id));
  const tabs = categories.length > 1 ? ['semua', ...categories] : [];
  const [tab, setTab] = useState('semua');
  const tabRefs = useRef([]);
  const list = tab === 'semua' ? pois : pois.filter((p) => p.category === tab);

  const onKeyDown = (e, i) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    setTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="poi">
      {tabs.length > 0 && (
        <div className="poi__tabs" role="tablist" aria-label="Kategori Point of Interest">
          {tabs.map((c, i) => (
            <button
              key={c}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`poi-tab-${c}`}
              aria-selected={tab === c}
              aria-controls="poi-panel"
              tabIndex={tab === c ? 0 : -1}
              className={`poi__tab ${tab === c ? 'is-active' : ''}`}
              onClick={() => setTab(c)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {c === 'semua' ? 'Semua' : POI_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      )}
      <ul
        key={tab}
        id="poi-panel"
        className="poi__list animate-fade-in"
        role={tabs.length ? 'tabpanel' : undefined}
        aria-labelledby={tabs.length ? `poi-tab-${tab}` : undefined}
      >
        {list.map((poi) => (
          <li key={poi.id} className="poi__item">
            <ImageWithFallback
              image={poi.photo}
              aspect="4/3"
              className="poi__photo"
              sizes="(min-width: 768px) 360px, 112px"
            />
            <div className="poi__body">
              <span className="poi__cat">{POI_CATEGORY_LABELS[poi.category]}</span>
              <span className="poi__name">{poi.name}</span>
              <div className="poi__row">
                <span className="poi__time tabular" aria-label={`Sekitar ${poi.minutes} menit dengan motor`}>
                  <span aria-hidden="true">🏍️ {formatMinutes(poi.minutes)}</span>
                </span>
                <a
                  href={poi.routeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="poi__route"
                  aria-label={`Rute ke ${poi.name} di Google Maps`}
                >
                  <Navigation size={14} aria-hidden="true" /> Rute
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
