export default function Home() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="grid site-header__inner">
          <div className="col-6">
            <a className="logo" href="#top" aria-label="Panama home">
              <span className="logo__mark" aria-hidden />
              Panama
            </a>
          </div>
          <div className="col-6 site-header__aside">
            <nav className="site-nav" aria-label="Primary">
              <a href="#features">Features</a>
              <a href="#contact">Contact</a>
            </nav>
            <a className="btn btn--primary btn--sm" href="#contact">
              Get started
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="grid">
            <div className="col-5">
              <p className="eyebrow">Welcome</p>
              <h1 id="hero-heading" className="hero__title">
                Build with clarity on Panama.
              </h1>
              <p className="hero__lead">
                A responsive one-page foundation on a 12-column grid—ready for
                GitHub and a one-click deploy to Vercel.
              </p>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#contact">
                  Start a project
                </a>
                <a className="btn btn--ghost" href="#features">
                  See features
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
                  <code>{`// panama.config.ts
export default {
  name: "Panama",
  grid: { columns: 12, gutter: "20px" },
  theme: {
    action: "var(--persian-blue)",
    surface: "var(--platinum)",
  },
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="features"
          aria-labelledby="features-heading"
        >
          <div className="grid">
            <header className="col-12 features__header">
              <p className="eyebrow">Features</p>
              <h2 id="features-heading" className="section-title">
                Everything in one scroll
              </h2>
              <p className="section-lead">
                Typography, color, and layout live in a single stylesheet—no
                utility classes, just semantic HTML and CSS.
              </p>
            </header>

            <article className="col-4">
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--blue">
                  12
                </div>
                <h3 className="feature-card__title">Grid system</h3>
                <p className="feature-card__text">
                  Twelve columns with a 20px gutter, stacking cleanly on small
                  screens and opening up on tablet and desktop.
                </p>
              </div>
            </article>

            <article className="col-4">
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--pink">
                  Aa
                </div>
                <h3 className="feature-card__title">Geist type</h3>
                <p className="feature-card__text">
                  Primary Geist and Geist Mono from Fontsource, self-hosted with
                  your app for consistent performance.
                </p>
              </div>
            </article>

            <article className="col-4">
              <div className="feature-card">
                <div className="feature-card__icon feature-card__icon--green">
                  ▲
                </div>
                <h3 className="feature-card__title">Deploy ready</h3>
                <p className="feature-card__text">
                  Push to GitHub and connect the repo on Vercel—no extra config
                  required for a standard Next.js build.
                </p>
              </div>
            </article>
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
                  Ready when you are
                </h2>
                <p className="cta-band__text">
                  Replace this section with your signup form, waitlist, or
                  contact link. The structure stays the same.
                </p>
              </div>
              <div className="col-12 col-5 cta-band__actions">
                <a className="btn btn--on-dark" href="mailto:hello@example.com">
                  Email us
                </a>
                <a className="btn btn--outline-light" href="#top">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="grid site-footer__inner">
          <div className="col-6">
            <span className="site-footer__brand">Panama</span>
            <p className="mono-label">© {new Date().getFullYear()}</p>
          </div>
          <div className="col-6 site-footer__meta">
            <p className="mono-label">Not indexed by search engines</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
