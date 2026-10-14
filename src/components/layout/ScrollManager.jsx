import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { prefersReducedMotion } from '../../lib/hooks';

const positions = new Map();

// Scrolls to top on new pages, restores the position on back/forward,
// and scrolls to #hash targets (e.g. header links to "/#properti").
// Same-path history entries (room modal / lightbox state) never move the page.
export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const prevPath = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
  }, []);

  // Remember the position of the current history entry.
  useEffect(() => {
    const key = location.key;
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [location.key]);

  useLayoutEffect(() => {
    const samePath = prevPath.current === location.pathname;
    prevPath.current = location.pathname;

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        else if (attempts++ < 10) setTimeout(tryScroll, 50);
      };
      tryScroll();
      return;
    }
    if (samePath) return;
    if (navType === 'POP' && positions.has(location.key)) {
      const y = positions.get(location.key);
      // Wait for lazy pages to render before restoring.
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, y)));
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, location.pathname, location.hash, navType]);

  return null;
}
