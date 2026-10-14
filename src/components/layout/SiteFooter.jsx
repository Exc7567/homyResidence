import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Music2 } from 'lucide-react';
import { BRAND } from '../../data/brand';
import { PROPERTIES } from '../../data/properties';
import { isPlaceholder, IS_DEV, PLACEHOLDER_TOOLTIP } from '../../lib/placeholders';
import { buildWaLink } from '../../lib/whatsapp';
import Logo from '../common/Logo';
import Text from '../common/Text';
import WhatsAppIcon from '../common/WhatsAppIcon';

const SOCIAL_ICONS = { instagram: Instagram, tiktok: Music2, facebook: Facebook };
const SOCIAL_LABELS = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook' };

export default function SiteFooter() {
  const properties = [...PROPERTIES].sort((a, b) => a.order - b.order);
  // Social links: real URLs always; placeholders only in dev (with amber outline).
  const socials = Object.entries(BRAND.social).filter(([, url]) => url && (!isPlaceholder(url) || IS_DEV));

  return (
    <footer id="kontak" className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <Logo />
            <Text as="p" value={BRAND.blurb} className="site-footer__blurb" />
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Properti</h2>
            <ul className="site-footer__list">
              {properties.map((p) =>
                p.status === 'open' ? (
                  <li key={p.id}>
                    <Link to={`/${p.slug}`} className="site-footer__link">{p.name}</Link>
                  </li>
                ) : (
                  <li key={p.id} className="site-footer__disabled">{p.name} (Under Construction)</li>
                ),
              )}
            </ul>
          </div>

          <div className="site-footer__col">
            <h2 className="site-footer__title">Kontak</h2>
            <ul className="site-footer__list">
              <li>
                <a
                  href={buildWaLink({ intent: 'general' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__link site-footer__contact"
                  data-intent="general"
                >
                  <WhatsAppIcon size={18} /> {BRAND.whatsappDisplay}
                </a>
              </li>
              {BRAND.email && (
                <li className="site-footer__contact">
                  <Mail size={18} aria-hidden="true" />
                  {isPlaceholder(BRAND.email) ? (
                    <Text value={BRAND.email} />
                  ) : (
                    <a href={`mailto:${BRAND.email}`} className="site-footer__link">{BRAND.email}</a>
                  )}
                </li>
              )}
              {BRAND.address && (
                <li className="site-footer__contact">
                  <MapPin size={18} aria-hidden="true" />
                  <Text value={BRAND.address} />
                </li>
              )}
            </ul>
            {socials.length > 0 && (
              <div className="site-footer__social">
                {socials.map(([key, url]) => {
                  const SIcon = SOCIAL_ICONS[key] || Instagram;
                  const ph = isPlaceholder(url);
                  return (
                    <a
                      key={key}
                      href={ph ? undefined : url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-icon site-footer__social-btn ${ph ? 'ph-dev' : ''}`}
                      aria-label={SOCIAL_LABELS[key] || key}
                      title={ph ? `${PLACEHOLDER_TOOLTIP}: ${url}` : undefined}
                    >
                      <SIcon size={20} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <p className="site-footer__bottom">
          © {new Date().getFullYear()} {BRAND.name}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
