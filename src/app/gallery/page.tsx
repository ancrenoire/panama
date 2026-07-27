import content from "@/data/content.json";
import Gallery from "@/components/Gallery";
import SiteHeader from "@/components/SiteHeader";

export default function GalleryPage() {
  const { brand, nav, gallery } = content;
  const year = new Date().getFullYear();
  const media = [...gallery.videos, ...gallery.images];

  return (
    <div className="site">
      <SiteHeader brand={brand} nav={nav} />

      <main id="top" className="gallery-page">
        <section className="gallery" aria-labelledby="gallery-heading">
          <div className="grid">
            <header className="col-12 gallery-page__head">
              <p className="eyebrow">{gallery.eyebrow}</p>
              <h1 id="gallery-heading" className="section-title">
                {gallery.title}
              </h1>
              <p className="section-lead">{gallery.lead}</p>
            </header>
            <div className="col-12">
              <Gallery images={media} alt={gallery.title} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer site-footer--solid">
        <div className="grid site-footer__inner">
          <div className="col-6">
            <span className="site-footer__brand">{brand.name}</span>
            <p className="mono-label">© {year}</p>
          </div>
          <div className="col-6 site-footer__meta">
            <a className="site-footer__link" href="/">
              Accueil
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
