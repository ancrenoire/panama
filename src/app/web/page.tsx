import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import MotifShowcase from "@/components/MotifShowcase";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  const {
    brand,
    nav,
    hero,
    technologie,
    motifs,
    process,
    chimie,
    comparison,
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
          <div className="grid hero__overlay">
            <div className="col-12 hero__content">
              <h1 id="hero-heading" className="hero__title">
                {hero.title}
              </h1>
              <p className="hero__lead">{hero.lead}</p>
            </div>
          </div>
          <div className="hero__actions">
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
        </section>

        {/* 1 — Technologie */}
        <section
          id="technologie"
          className="tech-intro"
          aria-labelledby="technologie-heading"
        >
          <div className="grid">
            <header className="col-12 tech-intro__head">
              <p className="eyebrow">{technologie.eyebrow}</p>
              <h2 id="technologie-heading" className="section-title">
                {technologie.title}
              </h2>
              <p className="section-lead">{technologie.lead}</p>
            </header>
          </div>
        </section>

        {/* Temporarily hidden
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
        */}

        <section className="motifs" aria-label="Démonstration motifs complexes">
          <div className="grid">
            <div className="col-12">
              <div className="placeholder">
                <p className="eyebrow">Placeholder</p>
                <p className="placeholder__label">
                  Démonstration motifs complexes
                </p>
              </div>
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

        <section className="chimie" aria-labelledby="chimie-heading">
          <div className="chimie__bg" aria-hidden>
            <DotGrid variant="closing" fieldStart={0} maxSize={7} spacing={12} />
          </div>
          <div className="grid chimie__inner">
            <header className="col-12 chimie__head">
              <p className="eyebrow eyebrow--light">{chimie.eyebrow}</p>
              <h2 id="chimie-heading" className="section-title chimie__title">
                {chimie.title}
              </h2>
              <p className="section-lead chimie__lead">{chimie.lead}</p>
            </header>

            {chimie.points.map((point) => (
              <article key={point.title} className="col-12 col-4">
                <div className="chimie-card">
                  <h3 className="chimie-card__title">{point.title}</h3>
                  <p className="chimie-card__text">{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="comparison" aria-labelledby="comparison-heading">
          <div className="grid">
            <header className="col-12 comparison__head">
              <p className="eyebrow">{comparison.eyebrow}</p>
              <h2 id="comparison-heading" className="section-title">
                {comparison.title}
              </h2>
              <p className="section-lead">{comparison.lead}</p>
            </header>

            {comparison.columns.map((column) => (
              <div key={column.name} className="col-12 col-6">
                <div className={`compare-card compare-card--${column.tone}`}>
                  <h3 className="compare-card__title">{column.name}</h3>
                  <ul className="compare-list">
                    {column.points.map((point) => (
                      <li key={point} className="compare-list__item">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2 — Applications */}
        <section
          id="applications"
          className="applications"
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
              <article key={item.title} className="col-12 col-4">
                <div className="use-case">
                  {item.image ? (
                    <div className="use-case__media">
                      <img src={item.image} alt="" aria-hidden />
                    </div>
                  ) : null}
                  <h3 className="use-case__title">{item.title}</h3>
                  <p className="use-case__text">{item.text}</p>
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
            <div className="col-6 site-footer__meta">
              <a className="site-footer__link" href="/home">
                Home
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
