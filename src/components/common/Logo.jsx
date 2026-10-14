import { BRAND } from '../../data/brand';
import { asset } from '../../lib/assets';

// Single replaceable logo. Set BRAND.logo to an image path to swap the text wordmark.
export default function Logo({ small = false, light = false, className = '' }) {
  const cls = `logo ${small ? 'logo--small' : ''} ${light ? 'logo--light' : ''} ${className}`;
  if (BRAND.logo) {
    return <img className={cls} src={asset(BRAND.logo)} alt={BRAND.name} height={small ? 24 : 32} />;
  }
  return (
    <span className={cls} aria-label={BRAND.name}>
      <span className="logo__mark" aria-hidden="true">Homy</span>
      <span className="logo__sub" aria-hidden="true">Residence</span>
    </span>
  );
}
