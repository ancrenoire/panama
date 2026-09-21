import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import Gallery from "@/components/Gallery";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  const { brand, brandGuide, gallery } = content;
  const { identity, renders } = brandGuide;
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <SiteHeader
        brand={{ ...brand, logoSrc: "/images/Panama-icon.svg" }}
        nav={brandGuide.nav}
        centerLogo
      />

      <main id="top" className="slides">
        <section
          id="identity"
          className="slide slide--callout"
          aria-labelledby="identity-heading"
        >
          <a
            className="callout"
            href={identity.download.href}
            download="Panama-identity.zip"
          >
            <div className="callout__copy">
              <h2 id="identity-heading" className="callout__title">
                {identity.title}
              </h2>
              <p className="callout__lead">{identity.lead}</p>
            </div>
            <span className="btn btn--primary">{identity.download.label}</span>
          </a>
        </section>

        {identity.pages.map((src, index) => (
          <section
            key={src}
            className="slide slide--charte"
            aria-label={`${identity.title} — ${index + 1}`}
          >
            <img
              className="charte__image"
              src={src}
              alt={`${identity.title}, page ${index + 1}`}
            />
          </section>
        ))}

        <section
          id="renders"
          className="slide slide--reel"
          aria-label={renders.title}
        >
          <video
            className="reel__video"
            src="/images/renders/0001-0324.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </section>

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

        <section
          id="gallery"
          className="slide slide--renders"
          aria-label={renders.title}
        >
          <div className="slide__body">
            <Gallery images={gallery.images} alt={renders.title} />
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
          </div>
        </footer>
      </div>
    </div>
  );
}
