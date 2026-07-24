"use client";

import { useEffect, useState } from "react";

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

export default function SiteHeader({
  brand,
  nav,
}: {
  brand: Brand;
  nav: Nav;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
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
