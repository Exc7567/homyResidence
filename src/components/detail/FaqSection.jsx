import { FAQ } from '../../data/faq';
import Accordion from '../common/Accordion';
import Reveal from '../common/Reveal';
import RuleText from './RuleText';

// Answers go through RuleText: the contact number opens WhatsApp, like in the Tata Tertib.
export default function FaqSection({ property: p }) {
  return (
    <section id="faq" className="detail-section detail-anchor" aria-labelledby="faq-title">
      <Reveal>
        <h2 id="faq-title" className="section-title">Pertanyaan yang sering ditanyakan di {p.name}</h2>
        <Accordion items={FAQ} renderAnswer={(a) => <RuleText text={a} />} />
      </Reveal>
    </section>
  );
}
