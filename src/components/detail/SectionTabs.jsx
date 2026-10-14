import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/hooks';
import { SECTION_TABS, scrollToSection } from '../../lib/sections';

// Sticky, horizontally scrollable section tabs with a scroll-position scrollspy.
// Active tab = the last section (in page order) whose top has passed a line just below
// the sticky bars. Works for nested targets (Point of Interest sits inside Lokasi).
// The URL hash is never changed (keeps shared links clean).
export default function SectionTabs({ variant = 'mobile' }) {
  const [active, setActive] = useState(SECTION_TABS[0].id);
  const navRef = useRef(null);
  const barRef = useRef(null);
  const tabRefs = useRef({});
  const lockUntil = useRef(0); // ignore the scrollspy while a tab click is scrolling
  const recheck = useRef(() => {});

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (performance.now() < lockUntil.current) return;
      // Where the bar's bottom sits once stuck (before sticking, the desktop bar is lower on the page).
      const nav = navRef.current;
      const offset = nav ? (parseFloat(getComputedStyle(nav).top) || 0) + nav.offsetHeight : 120;
      const line = offset + Math.min(160, window.innerHeight * 0.25);
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = SECTION_TABS[0].id;
      for (const t of SECTION_TABS) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= line) current = t.id;
      }
      if (atBottom) {
        const last = SECTION_TABS[SECTION_TABS.length - 1].id;
        const el = document.getElementById(last);
        if (el && el.getBoundingClientRect().top < window.innerHeight) current = last;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    recheck.current = onScroll;
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Keep the active tab visible inside the horizontally scrollable bar.
  useEffect(() => {
    const tab = tabRefs.current[active];
    const bar = barRef.current;
    if (!tab || !bar) return;
    const left = tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2;
    bar.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [active]);

  const onClick = (id) => {
    setActive(id);
    const lock = prefersReducedMotion() ? 100 : 900;
    lockUntil.current = performance.now() + lock;
    setTimeout(() => recheck.current(), lock + 50);
    scrollToSection(id);
  };

  return (
    <nav ref={navRef} className={`section-tabs section-tabs--${variant}`} aria-label="Bagian halaman">
      <div className="section-tabs__inner">
        <ul className="section-tabs__list" ref={barRef}>
          {SECTION_TABS.map((t) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                ref={(el) => { tabRefs.current[t.id] = el; }}
                className={`section-tabs__tab ${active === t.id ? 'is-active' : ''}`}
                aria-current={active === t.id ? 'true' : undefined}
                onClick={(e) => { e.preventDefault(); onClick(t.id); }}
              >
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
