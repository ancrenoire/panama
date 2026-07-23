import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import Gallery from "@/components/Gallery";

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
  const { brand, nav, hero, intro, technologie, applications, cta, footer } =
    content;
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <header className="site-header">
        <div className="grid site-header__inner">
          <div className="col-6">
            <a className="logo" href="#top" aria-label={brand.homeLabel}>
              <img
                className="logo__image"
                src={brand.logoSrc}
                alt={brand.name}
                width={140}
                height={32}
              />
            </a>
          </div>
          <div className="col-6 site-header__aside">
            <nav className="site-nav" aria-label={nav.ariaLabel}>
              {nav.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
            <a className="btn btn--primary btn--sm" href={nav.cta.href}>
              {nav.cta.label}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="grid">
            <div className="col-7">
              <h1 id="hero-heading" className="hero__title">
                {hero.title}
              </h1>
              <p className="hero__lead">{hero.lead}</p>
              <div className="hero__actions">
                <a className="btn btn--primary" href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </a>
                <a className="btn btn--ghost" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <div className="col-5 hero__visual">
              <div className="square-media">
                <video
                  className="square-media__video"
                  src="/images/renders/0001-0252.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </section>

        <section className="intro" aria-labelledby="intro-heading">
          <div className="grid">
            <div className="col-12 intro__head">
              <img
                className="intro__icon"
                src={intro.icon}
                alt=""
                width={64}
                height={64}
              />
              <h2 id="intro-heading" className="section-title intro__title">
                {intro.title}
              </h2>
            </div>

            {intro.cards.map((card) => (
              <div key={card.title} className="col-12 col-6">
                <div className="intro-card">
                  <h3 className="intro-card__title">{card.title}</h3>
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
            loop
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

        <section
          id="contact"
          className="cta-band"
          aria-labelledby="cta-heading"
        >
          <div className="grid cta-band__inner">
            <div className="col-12 col-7">
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
      </main>

      <footer className="site-footer">
        <div className="grid site-footer__inner">
          <div className="col-6">
            <span className="site-footer__brand">{brand.name}</span>
            <p className="mono-label">© {year}</p>
          </div>
          <div className="col-6 site-footer__meta">
            <p className="mono-label">{footer.note}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
