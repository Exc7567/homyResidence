import { houseRulesFor } from '../../data/houseRules';
import Reveal from '../common/Reveal';

// Tata Tertib: the kost rules (src/data/houseRules.js). The <ol> numbers them, so a rule that does
// not apply to this property (e.g. H14-only parking) leaves no gap.
export default function TataTertibSection({ property: p }) {
  return (
    <section id="tata-tertib" className="detail-section detail-anchor" aria-labelledby="tata-tertib-title">
      <Reveal>
        <h2 id="tata-tertib-title" className="section-title">Tata Tertib Peraturan Kost</h2>
        <ol className="rules-list">
          {houseRulesFor(p.slug).map((rule) => (
            <li key={rule} className="rules-list__item">{rule}</li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
