"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "snow" | "star";
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (initial = false): Particle => {
      const isSnow = Math.random() > 0.5;
      return {
        x: Math.random() * window.innerWidth,
        y: initial ? Math.random() * window.innerHeight : -10,
        size: isSnow
          ? Math.random() * 3 + 1
          : Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: isSnow ? Math.random() * 0.8 + 0.3 : Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        type: isSnow ? "snow" : "star",
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    };

    const init = () => {
      particles = Array.from({ length: 120 }, () => createParticle(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      particles.forEach((p, i) => {
        p.x += p.speedX + Math.sin(time * 0.5 + i * 0.1) * 0.2;
        p.y += p.speedY;

        const twinkle =
          Math.sin(time * p.twinkleSpeed * 60 + p.twinkleOffset) * 0.3 + 0.7;

        if (p.type === "snow") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * twinkle})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(165, 180, 252, 0.6)";
          ctx.fill();
        } else {
          // Draw star
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          for (let k = 0; k < 5; k++) {
            const angle = (k * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * p.size * 2;
            const y = Math.sin(angle) * p.size * 2;
            k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(165, 180, 252, ${p.opacity * twinkle})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(165, 180, 252, 0.8)";
          ctx.fill();
          ctx.restore();
        }

        // Reset particle if out of bounds
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[i] = createParticle();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
