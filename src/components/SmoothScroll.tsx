"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

// Header height (see --header-height in globals.css). Anchor targets are offset
// by this so section headings land below the fixed header rather than beneath it.
const HEADER_OFFSET = 72;

// Gentle ease-out (expo-ish) so momentum decays smoothly to a stop.
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  const options: LenisOptions = {
    duration: 1.2,
    easing: easeOutExpo,
    smoothWheel: !reduceMotion,
    syncTouch: false,
    anchors: { offset: -HEADER_OFFSET },
  };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
