import { useEffect, useRef, useState } from 'react';

// Scroll-reveal wrapper: fades/slides children in once when they enter the viewport.
// Respects prefers-reduced-motion (handled in index.css). Content is visible without JS.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined; }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Also reveal elements the visitor already scrolled past (e.g. after an anchor jump).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) { setVisible(true); io.disconnect(); }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
