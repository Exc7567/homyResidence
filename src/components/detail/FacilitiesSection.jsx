import { Sparkles } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
import { orderedFacilityIds } from '../../lib/property';
import Icon from '../common/Icon';
import Reveal from '../common/Reveal';
import Text from '../common/Text';

// The single home on the detail page for facilities shared by every room type,
// including parking (with its detail inline) and the electricity note.
export default function FacilitiesSection({ property: p }) {
  const ids = orderedFacilityIds(p);

  return (
    <section id="fasilitas" className="detail-section detail-anchor" aria-labelledby="fasilitas-title">
      <Reveal>
        <h2 id="fasilitas-title" className="section-title">Fasilitas</h2>
        <ul className="facility-grid">
          {ids.map((id) => {
            const f = FACILITIES[id];
            if (!f) return null;
            const unique = p.uniqueFacilityIds?.includes(id);
            const note = id === 'electricity_token' ? 'Tidak termasuk dalam harga sewa' : p.facilityNotes?.[id];
            return (
              <li key={id} className={`facility-item ${note && id !== 'electricity_token' ? 'facility-item--wide' : ''}`}>
                <span className="facility-item__icon"><Icon name={f.icon} size={24} /></span>
                <span className="facility-item__text">
                  <span className="facility-item__label">
                    {f.label}
                    {unique && (
                      <span className="tag-unggulan"><Sparkles aria-hidden="true" /> Unggulan</span>
                    )}
                  </span>
                  {note && <Text value={note} className="facility-item__sub" />}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
