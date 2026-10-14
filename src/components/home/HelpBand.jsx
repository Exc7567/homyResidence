import Reveal from '../common/Reveal';
import WhatsAppButton from '../common/WhatsAppButton';

export default function HelpBand() {
  return (
    <section className="section help-band-section" aria-labelledby="help-title">
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
