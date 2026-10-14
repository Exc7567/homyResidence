import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PROPERTIES } from './data/properties';
import ScrollManager from './components/layout/ScrollManager';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const PropertyPage = lazy(() => import('./pages/PropertyPage'));

// Routes are driven by `status`: open properties get a page; others redirect home.
// To open the Villa later just set its status to 'open' (see README).
export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {PROPERTIES.map((p) => (
            <Route
              key={p.slug}
              path={`/${p.slug}`}
              element={p.status === 'open' ? <PropertyPage slug={p.slug} /> : <Navigate to="/" replace />}
            />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
