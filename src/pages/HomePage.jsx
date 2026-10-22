import { useEffect } from 'react';
import { BRAND } from '../data/brand';
import { useMediaQuery } from '../lib/hooks';
import SiteHeader from '../components/layout/SiteHeader';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import Hero from '../components/home/Hero';
import PropertyGrid from '../components/home/PropertyGrid';
import SharedFacilitiesStrip from '../components/home/SharedFacilitiesStrip';
import HelpBand from '../components/home/HelpBand';

// Below the desktop breakpoint (1024, see home.css) the page opens on the properties and the hero
// moves to the end. Reordered in the DOM, not with CSS `order`, so focus order follows the screen.
const MOBILE = '(max-width: 1023.98px)';

export default function HomePage() {
  const isMobile = useMediaQuery(MOBILE);

  useEffect(() => {
    document.title = `${BRAND.name} | Kost & Villa`;
  }, []);

  const hero = <Hero key="hero" eager={!isMobile} />;
  const sections = [
    <PropertyGrid key="properti" />,
    <SharedFacilitiesStrip key="fasilitas" />,
    <HelpBand key="kontak" />,
  ];

  return (
    <>
      <SiteHeader />
      <main id="main" className="home">
        {isMobile ? [...sections, hero] : [hero, ...sections]}
      </main>
      <FloatingWhatsApp />
    </>
  );
}
