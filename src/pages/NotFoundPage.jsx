import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { BRAND } from '../data/brand';
import SiteHeader from '../components/layout/SiteHeader';
import SiteFooter from '../components/layout/SiteFooter';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = `Halaman tidak ditemukan | ${BRAND.name}`;
  }, []);

  return (
    <>
      <SiteHeader />
      <main id="main" className="not-found">
        <div className="container not-found__inner">
          <span className="not-found__code animate-pop-in" aria-hidden="true">404</span>
          <h1 className="animate-fade-up [animation-delay:100ms]">Halaman tidak ditemukan</h1>
          <p className="muted animate-fade-up [animation-delay:180ms]">
            Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
          </p>
          <Link to="/" className="btn btn-primary animate-fade-up [animation-delay:260ms]">
            <Home aria-hidden="true" /> Kembali ke Beranda
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
