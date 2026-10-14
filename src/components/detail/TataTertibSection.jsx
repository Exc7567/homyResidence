import { NOTES } from '../../data/brand';
import { formatRupiah } from '../../lib/format';
import Reveal from '../common/Reveal';
import Text from '../common/Text';

function InfoList({ items }) {
  return (
    <dl className="info-list">
      {items.map((it) => (
        <div key={it.title} className="info-list__item">
          <dt className="info-list__title">{it.title}</dt>
          <dd className="info-list__text"><Text value={it.text} /></dd>
        </div>
      ))}
    </dl>
  );
}

// Tata Tertib: the single home for "Tentang Hunian", occupancy, rental policy (incl. deposit)
// and house rules (formerly Aturan Tambahan Penghuni, Kebijakan Hunian and Tentang Hunian).
export default function TataTertibSection({ property: p, info }) {
  const groups = [
    {
      title: 'Penghuni',
      items: [
        { title: 'Siapa yang bisa tinggal', text: info.occupantPolicy },
        { title: 'Tambahan penghuni', text: info.additionalOccupants },
      ],
    },
    {
      title: 'Sewa',
      items: [
        { title: 'Minimal masa sewa', text: info.minimumStay },
        { title: 'Check-in/out', text: info.checkInOut },
        { title: 'Deposit', text: NOTES.depositTemplate(formatRupiah(p.deposit)) },
        { title: 'Pembatalan', text: info.cancellation },
      ],
    },
    {
      title: 'Aturan harian',
      items: [
        { title: 'Akses 24 jam', text: info.access24h },
        { title: 'Tamu menginap', text: info.overnightGuests },
        { title: 'Bertamu', text: info.visitors },
        { title: 'Merokok', text: info.smoking },
        { title: 'Hewan peliharaan', text: info.pets },
        ...(info.extraRules ? [{ title: 'Aturan tambahan', text: info.extraRules }] : []),
      ],
    },
  ];

  return (
    <section id="tata-tertib" className="detail-section detail-anchor" aria-labelledby="tata-tertib-title">
      <Reveal>
        <h2 id="tata-tertib-title" className="section-title">Tata Tertib</h2>
        {p.description && (
          <div className="rules-about">
            <h3 className="rules-group__title">Tentang Hunian</h3>
            <Text as="p" value={p.description} className="rules-about__text" />
          </div>
        )}
        <div className="rules-groups">
          {groups.map((g) => (
            <div key={g.title} className="rules-group">
              <h3 className="rules-group__title">{g.title}</h3>
              <InfoList items={g.items} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
