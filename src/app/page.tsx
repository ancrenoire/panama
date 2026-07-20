import content from "@/data/content.json";

export default function Home() {
  const { brand, nav, hero, technologie, applications, cta, footer } = content;
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
            <div className="col-5">
              <p className="eyebrow">{hero.eyebrow}</p>
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
            <div className="col-7 hero__visual">
              <div className="hero-card">
                <div className="hero-card__bar" aria-hidden>
                  <span className="hero-card__dot hero-card__dot--pink" />
                  <span className="hero-card__dot hero-card__dot--saffron" />
                  <span className="hero-card__dot hero-card__dot--malachite" />
                </div>
                <pre className="hero-card__code">
                  <code>{hero.codeSnippet}</code>
                </pre>
              </div>
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
          <div className="grid">
            <div className="col-12 cta-band__inner grid">
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
                <a
                  className="btn btn--outline-light"
                  href={cta.secondaryCta.href}
                >
                  {cta.secondaryCta.label}
                </a>
              </div>
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
