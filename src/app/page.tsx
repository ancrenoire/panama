import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import Gallery from "@/components/Gallery";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  const { brand, brandGuide, gallery } = content;
  const { identity, renders } = brandGuide;
  const media = [...gallery.images];
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <SiteHeader
        brand={{ ...brand, logoSrc: "/images/Panama-icon.svg" }}
        nav={brandGuide.nav}
        centerLogo
      />

      <main id="top" className="slides">
        {/* Variations */}
        <section
          id="identity"
          className="slide slide--split"
          aria-label={identity.logotype.title}
        >
          <div className="split">
            <div className="split__half split__half--light">
              <img
                className="split__logo"
                src="/images/Panama-logo-cropped.svg"
                alt="Logotype Panama, version foncée"
              />
            </div>
            <div className="split__half split__half--dark">
              <img
                className="split__logo"
                src="/images/Panama-logo-cropped-white.svg"
                alt="Logotype Panama, version blanche"
              />
            </div>
          </div>
        </section>

        {/* Construction */}
        <section
          id="construction"
          className="slide slide--construction"
          aria-label={identity.construction.title}
        >
          <div className="slide__body">
            <img
              className="construction__image"
              src="/images/Panama-logo-construction.svg"
              alt="Construction du logotype Panama"
            />
          </div>
        </section>

        {/* Motif interactif */}
        <section
          id="elements"
          className="slide slide--dots"
          aria-label={identity.elements.title}
        >
          <DotGrid fieldStart={0} maxSize={8} spacing={14} />
        </section>

        {/* Typographie */}
        <section
          id="typography"
          className="slide"
          aria-label={identity.typography.title}
        >
          <div className="grid slide__body">
            {identity.typography.specimens.map((spec) => (
              <div key={spec.name} className="col-4">
                <div className="spec">
                  <p className={`spec__sample ${spec.className}`}>Aa</p>
                  <p className="spec__name">{spec.name}</p>
                  <p className="spec__role mono-label">{spec.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reel */}
        <section
          id="reel"
          className="slide slide--reel"
          aria-label={renders.title}
        >
          <video
            className="reel__video"
            src="/images/renders/0001-0252-2.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </section>

        {/* Rendu carré */}
        <section
          id="render-square"
          className="slide slide--render-square"
          aria-label={renders.title}
        >
          <video
            className="render-square__video"
            src="/images/renders/0001-0252.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </section>

        {/* Rendus */}
        <section
          id="renders"
          className="slide slide--renders"
          aria-label={renders.title}
        >
          <div className="slide__body">
            <Gallery images={media} alt={renders.title} />
          </div>
        </section>
      </main>

      <div className="closing">
        <div className="closing__bg" aria-hidden>
          <DotGrid variant="closing" fieldStart={0} maxSize={7} spacing={12} />
        </div>

        <footer className="site-footer">
          <div className="grid site-footer__inner">
            <div className="col-6">
              <span className="site-footer__brand">{brand.name}</span>
              <p className="mono-label">© {year}</p>
            </div>
            <div className="col-6 site-footer__meta">
              <a className="site-footer__link" href="/web">
                Site
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
