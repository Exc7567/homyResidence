import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import WhatsAppButton from '../common/WhatsAppButton';

const NAV = [
  { hash: '#properti', label: 'Properti' },
  { hash: '#fasilitas', label: 'Fasilitas' },
  { hash: '#kontak', label: 'Kontak' },
];

// Sticky site header. On detail pages it is hidden on mobile (DetailTopBar replaces it).
export default function SiteHeader({ hideOnMobile = false }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${hideOnMobile ? 'site-header--desktop-only' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="site-header__logo" aria-label="Homy Residence, ke Beranda">
          <Logo />
        </Link>
        <nav className="site-header__nav" aria-label="Navigasi utama">
          {NAV.map((n) => (
            <Link key={n.hash} to={{ pathname: '/', hash: n.hash }} className="site-header__link">
              {n.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton intent="general" size="sm" className="site-header__cta" />
      </div>
    </header>
  );
}
