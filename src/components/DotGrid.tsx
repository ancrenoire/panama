"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

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
// How quickly the smoothed pointer/presence catch up to their targets each
// frame. Higher = snappier, lower = more trailing. Replaces the per-dot springs.
const EASE = 0.18;

type DotData = {
  cx: number;
  cy: number;
  bcx: number;
  bcy: number;
  size: number;
  opacity: number;
  maxScale: number;
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

function buildDots(
  width: number,
  height: number,
  spacing: number,
  fieldStart: number,
  maxSize: number,
  maxDiameter: number
): DotData[] {
  if (width === 0 || height === 0) return [];

  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);
  const offsetX = (width - (cols - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;
  const fieldLeft = width * fieldStart;

  const result: DotData[] = [];
  for (let row = 0; row < rows; row++) {
    const blockRow =
      Math.floor(row / MACRO_ROWS) * MACRO_ROWS + (MACRO_ROWS - 1) / 2;
    const cy = offsetY + row * spacing;
    const bcy = offsetY + blockRow * spacing;
    for (let col = 0; col < cols; col++) {
      const cx = offsetX + col * spacing;
      if (cx < fieldLeft) continue;
      const v = blockValue(col, row);
      const blockCol =
        Math.floor(col / MACRO_COLS) * MACRO_COLS + (MACRO_COLS - 1) / 2;
      const size = MIN_SIZE + v * (maxSize - MIN_SIZE);
      result.push({
        cx,
        cy,
        bcx: offsetX + blockCol * spacing,
        bcy,
        size,
        opacity: MIN_OPACITY + v * (1 - MIN_OPACITY),
        maxScale: maxDiameter / size,
      });
    }
  }
  return result;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // A dot's rendered diameter is never allowed to exceed this, so dots on the
    // grid (spacing apart) can never overlap, even at full pointer magnification.
    const maxDiameter = spacing - GAP;

    const rootStyles = getComputedStyle(document.documentElement);
    const persian =
      rootStyles.getPropertyValue("--persian-blue").trim() || "#072ac8";
    const white = rootStyles.getPropertyValue("--white").trim() || "#ffffff";
    // Light dots read against the dark "closing" backdrop; everywhere else the
    // brand persian blue reads against the light page background.
    const color = variant === "closing" ? white : persian;

    let dots: DotData[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smoothed pointer state + its targets. `presence` fades interaction
    // in/out so leaving the field is a soft fade rather than a hard cut.
    const pointer = { x: 0, y: 0, presence: 0 };
    const target = { x: 0, y: 0, presence: 0 };
    let rafId = 0;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const active = pointer.presence > 0.001;
      const px = pointer.x;
      const py = pointer.y;
      const pres = pointer.presence;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let influence = 0;
        if (active) {
          const dist = Math.hypot(px - d.bcx, py - d.bcy);
          influence = pres * smoothstep(Math.max(0, 1 - dist / INFLUENCE_RADIUS));
        }
        const scale =
          influence > 0 ? Math.min(d.maxScale, 1 + influence * GROWTH) : 1;
        const radius = (d.size * scale) / 2;
        ctx.globalAlpha =
          influence > 0
            ? Math.min(1, d.opacity + influence * (1 - d.opacity) * OPACITY_LIFT)
            : d.opacity;
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = () => {
      pointer.x += (target.x - pointer.x) * EASE;
      pointer.y += (target.y - pointer.y) * EASE;
      pointer.presence += (target.presence - pointer.presence) * EASE;
      draw();

      const settled =
        Math.abs(target.x - pointer.x) < 0.25 &&
        Math.abs(target.y - pointer.y) < 0.25 &&
        Math.abs(target.presence - pointer.presence) < 0.004;

      if (settled) {
        pointer.x = target.x;
        pointer.y = target.y;
        pointer.presence = target.presence;
        draw();
        running = false;
        return;
      }
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };

    const resize = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      const nextDpr = window.devicePixelRatio || 1;
      if (
        nextWidth === width &&
        nextHeight === height &&
        nextDpr === dpr &&
        dots.length
      ) {
        return;
      }
      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildDots(width, height, spacing, fieldStart, maxSize, maxDiameter);
      draw();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let onPointerMove: ((e: PointerEvent) => void) | undefined;
    let onPointerLeave: (() => void) | undefined;

    if (!reduceMotion) {
      // Listen on the window rather than the container: content stacked above
      // the grid (e.g. the CTA band and footer over the closing backdrop) would
      // otherwise intercept the pointer before it reached the container. We
      // derive presence from whether the pointer sits within the grid's bounds.
      onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const inside =
          x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
        target.x = x;
        target.y = y;
        target.presence = inside ? 1 : 0;
        start();
      };
      onPointerLeave = () => {
        target.presence = 0;
        start();
      };
      window.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onPointerLeave)
        document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [variant, fieldStart, maxSize, spacing, reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={variant ? `dot-grid dot-grid--${variant}` : "dot-grid"}
    >
      <canvas ref={canvasRef} className="dot-grid__canvas" />
    </div>
  );
}
