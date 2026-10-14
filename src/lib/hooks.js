import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Locks body scroll while `active`, keeping the scroll position. Counts nested locks.
let lockCount = 0;
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    const y = window.scrollY;
    lockCount += 1;
    document.body.classList.add('scroll-locked');
    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.classList.remove('scroll-locked');
        window.scrollTo(0, y);
      }
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

// Traps Tab focus inside `ref` while active; returns focus to the opener on cleanup.
export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const opener = document.activeElement;
    const node = ref.current;
    const focusables = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    (focusables()[0] || node).focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    node.addEventListener('keydown', onKey);
    return () => {
      node.removeEventListener('keydown', onKey);
      if (opener && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
    };
  }, [ref, active]);
}

export function useEscape(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onEscape(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onEscape, active]);
}
