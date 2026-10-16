import { useEffect } from 'react';
import { BRAND } from '../data/brand';
import SiteHeader from '../components/layout/SiteHeader';
import FloatingWhatsApp from '../components/layout/FloatingWhatsApp';
import Hero from '../components/home/Hero';
import PropertyGrid from '../components/home/PropertyGrid';
import SharedFacilitiesStrip from '../components/home/SharedFacilitiesStrip';
import HelpBand from '../components/home/HelpBand';

export default function HomePage() {
  useEffect(() => {
    document.title = `${BRAND.name} | Kost & Villa`;
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main" className="home">
        <Hero />
        <PropertyGrid />
        <SharedFacilitiesStrip />
        <HelpBand />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
