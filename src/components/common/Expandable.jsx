import { useLayoutEffect, useRef, useState } from 'react';

// Collapses long content to about N lines with a "Lihat Selengkapnya" toggle.
// Height-based (works for paragraphs and lists). The toggle hides itself when
// the content is not actually clamped.
export default function Expandable({ lines = 6, children, className = '' }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () => {
      if (!expanded) setClamped(node.scrollHeight > node.clientHeight + 1);
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(node);
    return () => ro?.disconnect();
  }, [expanded, children]);

  return (
    <div className={className}>
      <div
        ref={ref}
        className={`expandable ${expanded ? 'is-expanded' : ''} ${clamped && !expanded ? 'is-clamped' : ''}`}
        style={{ '--expandable-lines': lines }}
      >
        {children}
      </div>
      {(clamped || expanded) && (
        <button type="button" className="btn-link" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya'}
        </button>
      )}
    </div>
  );
}
