import type { Metadata } from "next";
import content from "@/data/content.json";
import DotGrid from "@/components/DotGrid";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: `Éditorial — ${content.meta.title}`,
  description: content.editorial.lead,
  robots: { index: false, follow: false },
};

type EditorialItem = string | { label: string; items: string[] };

function isGroup(item: EditorialItem): item is { label: string; items: string[] } {
  return typeof item !== "string";
}

export default function EditorialPage() {
  const { brand, editorial } = content;
  const year = new Date().getFullYear();

  return (
    <div className="site editorial-page">
      <SiteHeader brand={brand} nav={editorial.nav} />

      <main id="top" className="editorial">
        <div className="grid">
          <header className="col-12 editorial__head">
            <p className="eyebrow">{editorial.eyebrow}</p>
            <h1 className="section-title">{editorial.title}</h1>
            <p className="section-lead">{editorial.lead}</p>
          </header>

          <div className="col-12">
            <ol className="editorial-list">
              {editorial.sections.map((section) => (
                <li key={section.name} className="editorial-section">
                  <h2 className="editorial-section__name">{section.name}</h2>
                  <ul>
                    <li>
                      <span className="editorial-label">Objectif</span>
                      {section.goal}
                    </li>
                    <li>
                      <span className="editorial-label">Contenu</span>
                      <ul>
                        {section.content.map((item) =>
                          isGroup(item) ? (
                            <li key={item.label}>
                              {item.label}
                              <ul>
                                {item.items.map((sub) => (
                                  <li key={sub}>{sub}</li>
                                ))}
                              </ul>
                            </li>
                          ) : (
                            <li key={item}>{item}</li>
                          ),
                        )}
                      </ul>
                    </li>
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
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
