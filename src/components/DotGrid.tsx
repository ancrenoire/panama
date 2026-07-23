"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const SPACING = 30;
const GAP = 4;
const MIN_SIZE = 3;
const MAX_SIZE = 24;
// Macro "rectangle" grid: every block of MACRO_COLS x MACRO_ROWS cells shares
// one uniform dot size, producing the blocky rectangular regions in the ref.
const MACRO_COLS = 4;
const MACRO_ROWS = 3;
const SIZE_LEVELS = 6;
const MIN_OPACITY = 0.26;
// The dot field is contained to the right portion of the section; the left
// remains empty prussian-blue background (matching the reference).
const FIELD_START = 0.5;
// Pointer reacts to whole macro zones, not individual dots: a broad, soft
// falloff measured from each dot's *block centre* so entire rectangles swell
// and brighten together.
const INFLUENCE_RADIUS = 300;
const GROWTH = 0.5;
const OPACITY_LIFT = 0.5;
const OFFSCREEN = -99999;

type DotData = {
  key: string;
  cx: number;
  cy: number;
  bcx: number;
  bcy: number;
  size: number;
  opacity: number;
};

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function valueNoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const tl = hash(xi, yi);
  const tr = hash(xi + 1, yi);
  const bl = hash(xi, yi + 1);
  const br = hash(xi + 1, yi + 1);

  const u = smoothstep(xf);
  const v = smoothstep(yf);

  const top = tl + (tr - tl) * u;
  const bottom = bl + (br - bl) * u;
  return top + (bottom - top) * v;
}

// One quantized value per macro rectangle. Sampling low-frequency noise at the
// block coordinates keeps neighbouring blocks related (large regions), while
// quantizing to discrete levels keeps each block a crisp uniform rectangle.
function blockValue(col: number, row: number) {
  const bx = Math.floor(col / MACRO_COLS);
  const by = Math.floor(row / MACRO_ROWS);
  const v = smoothstep(valueNoise(bx / 2.4, by / 2.4));
  return Math.round(v * (SIZE_LEVELS - 1)) / (SIZE_LEVELS - 1);
}

function Dot({
  cx,
  cy,
  bcx,
  bcy,
  size,
  opacity,
  maxDiameter,
  pointerX,
  pointerY,
}: {
  cx: number;
  cy: number;
  bcx: number;
  bcy: number;
  size: number;
  opacity: number;
  maxDiameter: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const maxScale = maxDiameter / size;

  // Influence is measured from the block centre, so every dot in a macro zone
  // shares the same value and the whole rectangle reacts as a unit.
  const influence = useTransform<number, number>(
    [pointerX, pointerY],
    ([mx, my]) => {
      if (mx < -9000) return 0;
      const distance = Math.hypot(mx - bcx, my - bcy);
      return smoothstep(Math.max(0, 1 - distance / INFLUENCE_RADIUS));
    }
  );

  const scale = useTransform(influence, (i) =>
    Math.min(maxScale, 1 + i * GROWTH)
  );
  const dotOpacity = useTransform(influence, (i) =>
    Math.min(1, opacity + i * (1 - opacity) * OPACITY_LIFT)
  );

  return (
    <motion.span
      className="dot"
      style={{
        left: cx - size / 2,
        top: cy - size / 2,
        width: size,
        height: size,
        opacity: dotOpacity,
        scale,
      }}
    />
  );
}

export default function DotGrid({
  variant,
  fieldStart = FIELD_START,
  maxSize = MAX_SIZE,
  spacing = SPACING,
}: {
  variant?: string;
  fieldStart?: number;
  maxSize?: number;
  spacing?: number;
} = {}) {
  // A dot's rendered diameter is never allowed to exceed this, so dots on the
  // grid (spacing apart) can never overlap, even at full pointer magnification.
  const maxDiameter = spacing - GAP;
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(OFFSCREEN);
  const pointerY = useMotionValue(OFFSCREEN);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 26, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 26, mass: 0.6 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dots = useMemo<DotData[]>(() => {
    const { width, height } = size;
    if (width === 0 || height === 0) return [];

    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);
    const offsetX = (width - (cols - 1) * spacing) / 2;
    const offsetY = (height - (rows - 1) * spacing) / 2;

    const fieldLeft = width * fieldStart;

    const result: DotData[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = offsetX + col * spacing;
        if (cx < fieldLeft) continue;
        const v = blockValue(col, row);
        const blockCol =
          Math.floor(col / MACRO_COLS) * MACRO_COLS + (MACRO_COLS - 1) / 2;
        const blockRow =
          Math.floor(row / MACRO_ROWS) * MACRO_ROWS + (MACRO_ROWS - 1) / 2;
        result.push({
          key: `${col}-${row}`,
          cx,
          cy: offsetY + row * spacing,
          bcx: offsetX + blockCol * spacing,
          bcy: offsetY + blockRow * spacing,
          size: MIN_SIZE + v * (maxSize - MIN_SIZE),
          opacity: MIN_OPACITY + v * (1 - MIN_OPACITY),
        });
      }
    }
    return result;
  }, [size, fieldStart, maxSize, spacing]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  const handlePointerLeave = () => {
    pointerX.set(OFFSCREEN);
    pointerY.set(OFFSCREEN);
  };

  return (
    <div
      ref={containerRef}
      className={variant ? `dot-grid dot-grid--${variant}` : "dot-grid"}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {reduceMotion
        ? dots.map((dot) => (
            <span
              key={dot.key}
              className="dot"
              style={{
                left: dot.cx - dot.size / 2,
                top: dot.cy - dot.size / 2,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity,
              }}
            />
          ))
        : dots.map((dot) => (
            <Dot
              key={dot.key}
              cx={dot.cx}
              cy={dot.cy}
              bcx={dot.bcx}
              bcy={dot.bcy}
              size={dot.size}
              opacity={dot.opacity}
              maxDiameter={maxDiameter}
              pointerX={springX}
              pointerY={springY}
            />
          ))}
    </div>
  );
}
