"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

type NavLink = {
  label: string;
  href: string;
};

type Brand = {
  name: string;
  homeLabel: string;
  logoSrc: string;
};

type Nav = {
  ariaLabel: string;
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
};

// Fraction of the hero the user must scroll through for the header background
// to fully appear.
const REVEAL_FRACTION = 0.7;

// Ease-out cubic so the background eases in and settles gently near the end.
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function SiteHeader({
  brand,
  nav,
}: {
  brand: Brand;
  nav: Nav;
}) {
  const headerRef = useRef<HTMLElement>(null);

  const update = useCallback((scroll: number) => {
    const header = headerRef.current;
    if (!header) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const heroHeight = hero?.offsetHeight ?? window.innerHeight;
    const distance = Math.max(1, heroHeight * REVEAL_FRACTION);
    const raw = Math.min(1, Math.max(0, scroll / distance));
    header.style.setProperty("--header-progress", easeOutCubic(raw).toFixed(4));
  }, []);

  // Driven by Lenis' animated scroll value so the background tracks the smooth
  // scroll position frame-by-frame.
  useLenis(({ scroll }) => update(scroll));

  useEffect(() => {
    update(window.scrollY);
    const onResize = () => update(window.scrollY);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update]);

  return (
    <header ref={headerRef} className="site-header">
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
  );
}
