"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { renderPoster } from "../lib/canvasRender";

const BASE_WIDTH = 1080;
const BASE_HEIGHT = 1350; // 4:5 ratio

const PosterCanvas = forwardRef(function PosterCanvas({ data, scale = 0.6 }, ref) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(BASE_WIDTH * dpr);
    canvas.height = Math.floor(BASE_HEIGHT * dpr);
    canvas.style.width = `${Math.floor(BASE_WIDTH * scale)}px`;
    canvas.style.height = `${Math.floor(BASE_HEIGHT * scale)}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    renderPoster(ctx, BASE_WIDTH, BASE_HEIGHT, data);
  }, [data, scale]);

  return <canvas ref={(node) => { canvasRef.current = node; if (typeof ref === 'function') ref(node); else if (ref) ref.current = node; }} />;
});

export default PosterCanvas;
