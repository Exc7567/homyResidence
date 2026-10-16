import Reveal from '../common/Reveal';
import WhatsAppButton from '../common/WhatsAppButton';

// "Bingung pilih kamar?" band. It is the target of the header's "Kontak" link (/#kontak),
// which works from every page (ScrollManager scrolls to the hash after going home).
export default function HelpBand() {
  return (
    <section id="kontak" className="section help-band-section anchor-target" aria-labelledby="help-title">
      <div className="container">
        <Reveal className="help-band">
          <span className="help-band__glow" aria-hidden="true" />
          <div className="help-band__text">
            <h2 id="help-title" className="help-band__title">Bingung pilih kamar?</h2>
            <p className="help-band__sub">
              Ceritakan kebutuhanmu, tim kami bantu pilihkan tipe kamar yang cocok.
            </p>
          </div>
          <WhatsAppButton intent="general" className="help-band__btn btn-shine" />
        </Reveal>
      </div>
    </section>
  );
}
