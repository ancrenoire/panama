"use client";

import { useState } from "react";

type Motif = {
  label: string;
  measure: string;
  image: string;
};

export default function MotifShowcase({
  eyebrow,
  title,
  icon,
  items,
}: {
  eyebrow: string;
  title: string;
  icon: string;
  items: Motif[];
}) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="motif">
      <div className="motif__visual">
        <div className="square-media motif__media">
          <img
            className="motif__image"
            src={current.image}
            alt={current.label}
          />
        </div>
      </div>

      <div className="motif__content">
        <img
          className="motif__star"
          src={icon}
          alt=""
          aria-hidden
          width={48}
          height={48}
        />
        <p className="motif__eyebrow">{eyebrow}</p>
        <h2 className="motif__title">{title}</h2>

        <ul className="motif-list">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <li key={item.label} className="motif-list__item">
                <button
                  type="button"
                  className={`motif-list__btn${
                    isActive ? " is-active" : ""
                  }`}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  aria-pressed={isActive}
                >
                  <span className="motif-list__label">{item.label}</span>
                  <span className="motif-list__line" aria-hidden />
                  <span className="motif-list__measure">{item.measure}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
