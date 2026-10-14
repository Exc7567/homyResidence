import { FAQ } from '../../data/faq';
import Accordion from '../common/Accordion';
import Reveal from '../common/Reveal';

export default function FaqSection({ property: p }) {
  return (
    <section id="faq" className="detail-section detail-anchor" aria-labelledby="faq-title">
      <Reveal>
        <h2 id="faq-title" className="section-title">Pertanyaan yang sering ditanyakan di {p.name}</h2>
        <Accordion items={FAQ} />
      </Reveal>
    </section>
  );
}
