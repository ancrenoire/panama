import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import Gallery from "@/components/Gallery";
import MotifShowcase from "@/components/MotifShowcase";
import SiteHeader from "@/components/SiteHeader";

const galleryImages = [
  "/images/renders/panama-r-1.png",
  "/images/renders/masonry/image 14.png",
  "/images/renders/masonry/image 15.png",
  "/images/renders/masonry/image 16.png",
  "/images/renders/masonry/image 17.png",
  "/images/renders/masonry/image 18.png",
  "/images/renders/masonry/image 19.png",
  "/images/renders/masonry/image 20.png",
  "/images/renders/masonry/image 21.png",
  "/images/renders/masonry/image 22.png",
];

export default function Home() {
  const {
    brand,
    nav,
    hero,
    motifs,
    process,
    technologie,
    applications,
    cta,
  } = content;
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <SiteHeader brand={brand} nav={nav} />

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero__bg" aria-hidden>
            <video
              className="hero__video"
              src="/images/renders/0001-0252-2.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="grid">
            <div className="col-12 hero__content">
              <h1 id="hero-heading" className="hero__title">
                {hero.title}
              </h1>
              <p className="hero__lead">{hero.lead}</p>
              <div className="hero__actions">
                <a className="btn btn--ghost" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="motifs" aria-labelledby="motifs-heading">
          <div className="grid">
            <div className="col-12">
              <MotifShowcase
                eyebrow={motifs.eyebrow}
                title={motifs.title}
                icon={motifs.icon}
                items={motifs.items}
              />
            </div>
          </div>
        </section>

        <section className="process" aria-labelledby="process-heading">
          <div className="grid">
            <header className="col-12 process__head">
              <p className="eyebrow">{process.eyebrow}</p>
              <h2 id="process-heading" className="section-title">
                {process.title}
              </h2>
              <p className="section-lead">{process.lead}</p>
            </header>

            {process.cards.map((card) => (
              <div key={card.title} className="col-12 col-6">
                <div className="intro-card">
                  <h3 className="intro-card__title">{card.title}</h3>
                  <p className="intro-card__text">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dot-grid-section" aria-hidden>
          <DotGrid />
          <video
            className="dot-grid-section__video"
            src="/images/renders/0001-0132-169.mp4"
            autoPlay
            muted
            playsInline
          />
        </section>

        <section className="gallery" aria-label="Galerie">
          <div className="grid">
            <div className="col-12">
              <Gallery images={galleryImages} alt={hero.title} />
            </div>
          </div>
        </section>

        <section
          id="technologie"
          className="features"
          aria-labelledby="technologie-heading"
        >
          <div className="grid">
            <header className="col-12 features__header">
              <p className="eyebrow">{technologie.eyebrow}</p>
              <h2 id="technologie-heading" className="section-title">
                {technologie.title}
              </h2>
              <p className="section-lead">{technologie.lead}</p>
            </header>

            {technologie.items.map((item) => (
              <article key={item.title} className="col-4">
                <div className="feature-card">
                  <div
                    className={`feature-card__icon feature-card__icon--${item.iconTone}`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="feature-card__title">{item.title}</h3>
                  <p className="feature-card__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="applications"
          className="features"
          aria-labelledby="applications-heading"
        >
          <div className="grid">
            <header className="col-12 features__header">
              <p className="eyebrow">{applications.eyebrow}</p>
              <h2 id="applications-heading" className="section-title">
                {applications.title}
              </h2>
              <p className="section-lead">{applications.lead}</p>
            </header>

            {applications.items.map((item) => (
              <article key={item.title} className="col-4">
                <div className="feature-card">
                  <h3 className="feature-card__title">{item.title}</h3>
                  <p className="feature-card__text">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>

      <div className="closing">
        <div className="closing__bg" aria-hidden>
          <DotGrid variant="closing" fieldStart={0} maxSize={7} spacing={12} />
        </div>

        <section
          id="contact"
          className="cta-band"
          aria-labelledby="cta-heading"
        >
          <div className="grid cta-band__inner">
            <div className="col-12 col-7">
              <img
                className="cta-band__star"
                src={motifs.icon}
                alt=""
                aria-hidden
                width={40}
                height={40}
              />
              <h2 id="cta-heading" className="cta-band__title">
                {cta.title}
              </h2>
              <p className="cta-band__text">{cta.text}</p>
            </div>
            <div className="col-12 col-5 cta-band__actions">
              <a className="btn btn--on-dark" href={cta.primaryCta.href}>
                {cta.primaryCta.label}
              </a>
              <a className="btn btn--outline-light" href={cta.secondaryCta.href}>
                {cta.secondaryCta.label}
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="grid site-footer__inner">
            <div className="col-6">
              <span className="site-footer__brand">{brand.name}</span>
              <p className="mono-label">© {year}</p>
            </div>
            <div className="col-6 site-footer__meta" />
          </div>
        </footer>
      </div>
    </div>
  );
}
