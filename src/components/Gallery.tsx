"use client";

import { useCallback, useEffect, useState } from "react";

const isVideo = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

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
            aria-label={isVideo(src) ? "Agrandir la vidéo" : "Agrandir l’image"}
          >
            {isVideo(src) ? (
              <video
                className="bento__item"
                src={src}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img className="bento__item" src={src} alt={alt} />
            )}
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
          {isVideo(active) ? (
            <video
              className="lightbox__image"
              src={active}
              autoPlay
              muted
              loop
              controls
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              className="lightbox__image"
              src={active}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
