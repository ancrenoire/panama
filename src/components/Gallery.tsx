"use client";

import { useCallback, useEffect, useState } from "react";

export default function Gallery({
  images,
  alt = "",
}: {
  images: string[];
  alt?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <>
      <div className="bento">
        {images.map((src) => (
          <button
            key={src}
            type="button"
            className="bento__button"
            onClick={() => setActive(src)}
            aria-label="Agrandir l’image"
          >
            <img className="bento__item" src={src} alt={alt} />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={close}
            aria-label="Fermer"
          >
            ×
          </button>
          <img
            className="lightbox__image"
            src={active}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
