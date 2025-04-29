"use client";
// AuroraBackground.tsx
// 动态极光渐变背景组件
import React, { useRef, useEffect } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // 极光带参数
    const auroraColors = [
      ["#7FCAFF", "#8F7CFF", "#B9FFEE", "#FFB6E6"],
      ["#00FFD0", "#3C50FF", "#A259FF", "#FF6EC7"]
    ];
    const colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 1 : 0;
    const colors = auroraColors[colorMode];

    function drawAurora() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.globalAlpha = 0.22 + 0.12 * i;
        ctx.beginPath();
        const yBase = height * (0.3 + 0.2 * i);
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 10) {
          const y = yBase + Math.sin((x / width) * Math.PI * 2 + Date.now() / (3000 + i * 1500)) * (40 + 20 * i);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, yBase, width, yBase + 80);
        grad.addColorStop(0, colors[0]);
        grad.addColorStop(0.3, colors[1]);
        grad.addColorStop(0.7, colors[2]);
        grad.addColorStop(1, colors[3]);
        ctx.fillStyle = grad;
        ctx.filter = `blur(${14 + 6 * i}px)`;
        ctx.fill();
        ctx.restore();
      }
    }

    function animate() {
      drawAurora();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.95,
        transition: "background 0.5s"
      }}
      aria-hidden="true"
    />
  );
}
