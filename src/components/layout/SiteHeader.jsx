import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import WhatsAppButton from '../common/WhatsAppButton';

// Homepage sections, in page order. "Kontak" is the "Bingung pilih kamar?" band (HelpBand).
const NAV = [
  { id: 'properti', label: 'Properti' },
  { id: 'fasilitas', label: 'Fasilitas' },
  { id: 'kontak', label: 'Kontak' },
];

// Sticky site header: logo left, floating pill menu in the center and Book Now right (both ≥1024;
// smaller screens use the floating WhatsApp button). On the homepage the header is transparent over
// the hero until the page scrolls, and the pill highlights the section in view.
// On detail pages it is hidden on mobile (DetailTopBar replaces it).
export default function SiteHeader({ hideOnMobile = false }) {
  const isHome = useLocation().pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const active = useSectionInView(isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cls = [
    'site-header',
    isHome && 'site-header--home',
    scrolled && 'is-scrolled',
    hideOnMobile && 'site-header--desktop-only',
  ].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Homy Residence, ke Beranda">
          <Logo />
        </Link>
        <nav className="site-header__nav" aria-label="Navigasi utama">
          <ul className="site-header__pill">
            {NAV.map((n) => (
              <li key={n.id}>
                <Link
                  to={{ pathname: '/', hash: `#${n.id}` }}
                  className={`site-header__link ${active === n.id ? 'is-active' : ''}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton intent="general" size="sm" className="site-header__cta" />
      </div>
    </header>
  );
}

// Homepage only: the last section (in page order) whose top has passed a line at 40% of the screen;
// none while the hero is in view. Fasilitas and Kontak are short and the page may stop before they
// reach that line, so over the last screen of scrolling the line slides down to the bottom edge.
// After a menu click (or arriving on /#kontak etc.) the chosen item stays highlighted until the
// visitor scrolls again.
function useSectionInView(enabled) {
  const { hash, key } = useLocation();
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!enabled) return undefined;
    let pinned = NAV.some((n) => `#${n.id}` === hash) ? hash.slice(1) : null;
    let settled = false; // true once the scroll to the chosen section has finished
    let settleTimer = setTimeout(() => { settled = true; }, 1000);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (pinned) { setActive(pinned); return; }
      const vh = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - vh - window.scrollY;
      const line = vh * 0.4 + vh * 0.6 * Math.max(0, 1 - remaining / vh);
      let current = null;
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (pinned && settled) pinned = null;
      else if (pinned) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => { settled = true; }, 200);
      }
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
    };
  }, [enabled, hash, key]);
  return enabled ? active : null;
}
