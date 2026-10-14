import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BRAND } from '../../data/brand';

export default function Breadcrumb({ property }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/" className="breadcrumb__link">Beranda</Link></li>
        <li aria-hidden="true"><ChevronRight size={14} /></li>
        <li><Link to="/#properti" className="breadcrumb__link">{BRAND.name}</Link></li>
        <li aria-hidden="true"><ChevronRight size={14} /></li>
        <li aria-current="page" className="breadcrumb__current">{property.name}</li>
      </ol>
    </nav>
  );
}
