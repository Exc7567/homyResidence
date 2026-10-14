import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Text from './Text';

// Single-open accordion (WAI-ARIA pattern). Height animates via grid rows.
export default function Accordion({ items }) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <h4 className="accordion__heading">
              <button
                id={btnId}
                type="button"
                className="accordion__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <ChevronDown className="accordion__chevron" size={20} aria-hidden="true" />
              </button>
            </h4>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel">
              <div className="accordion__inner">
                <Text as="p" value={item.a} className="accordion__answer" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
