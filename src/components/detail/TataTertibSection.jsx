import { Wallet } from 'lucide-react';
import { houseRulesFor } from '../../data/houseRules';
import Reveal from '../common/Reveal';
import Rupiah from '../common/Rupiah';

// Tata Tertib: the kost rules (src/data/houseRules.js). The <ol> numbers them, so a rule that does
// not apply to this property (e.g. H14-only parking) leaves no gap.
// The deposit line (property.deposit) sits above the rules and is not one of them.
export default function TataTertibSection({ property: p }) {
  return (
    <section id="tata-tertib" className="detail-section detail-anchor" aria-labelledby="tata-tertib-title">
      <Reveal>
        <h2 id="tata-tertib-title" className="section-title">Tata Tertib Peraturan Kost</h2>
        {p.deposit != null && (
          <p className="rules-deposit">
            <Wallet size={18} aria-hidden="true" />
            <span>Deposit <span className="rules-deposit__amount"><Rupiah value={p.deposit} /></span></span>
          </p>
        )}
        <ol className="rules-list">
          {houseRulesFor(p.slug).map((rule) => (
            <li key={rule} className="rules-list__item">{rule}</li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
