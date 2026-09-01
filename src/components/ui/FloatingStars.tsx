"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

// Generate stable stars using a seeded approach — fixed values, not random at render
const STAR_DATA = [
  { id: 0, x: 8.4, y: 12.3, size: 2.1, delay: 0.2, duration: 2.8 },
  { id: 1, x: 23.7, y: 34.1, size: 1.5, delay: 1.1, duration: 3.2 },
  { id: 2, x: 41.2, y: 7.8, size: 2.8, delay: 0.5, duration: 2.5 },
  { id: 3, x: 67.5, y: 45.6, size: 1.2, delay: 1.8, duration: 3.8 },
  { id: 4, x: 82.1, y: 18.9, size: 2.4, delay: 0.8, duration: 2.2 },
  { id: 5, x: 15.6, y: 67.2, size: 1.8, delay: 2.1, duration: 4.1 },
  { id: 6, x: 55.3, y: 82.4, size: 1.3, delay: 0.3, duration: 3.5 },
  { id: 7, x: 91.8, y: 56.7, size: 2.6, delay: 1.5, duration: 2.9 },
  { id: 8, x: 34.9, y: 91.3, size: 1.7, delay: 2.7, duration: 3.1 },
  { id: 9, x: 73.4, y: 73.8, size: 2.2, delay: 0.9, duration: 2.6 },
  { id: 10, x: 6.2, y: 48.5, size: 1.4, delay: 1.4, duration: 3.7 },
  { id: 11, x: 48.7, y: 23.6, size: 2.9, delay: 2.3, duration: 4.3 },
  { id: 12, x: 27.3, y: 58.9, size: 1.6, delay: 0.6, duration: 2.4 },
  { id: 13, x: 86.5, y: 37.2, size: 2.0, delay: 1.7, duration: 3.3 },
  { id: 14, x: 62.8, y: 5.4, size: 1.1, delay: 2.9, duration: 4.0 },
  { id: 15, x: 19.4, y: 79.1, size: 2.7, delay: 0.4, duration: 2.7 },
  { id: 16, x: 44.6, y: 44.7, size: 1.9, delay: 1.2, duration: 3.6 },
  { id: 17, x: 77.9, y: 62.3, size: 1.3, delay: 2.5, duration: 2.3 },
  { id: 18, x: 33.1, y: 14.8, size: 2.5, delay: 0.7, duration: 4.2 },
  { id: 19, x: 58.4, y: 88.6, size: 1.8, delay: 1.9, duration: 3.0 },
  { id: 20, x: 12.7, y: 30.2, size: 2.3, delay: 2.2, duration: 2.1 },
  { id: 21, x: 96.1, y: 22.9, size: 1.0, delay: 0.1, duration: 3.4 },
  { id: 22, x: 38.5, y: 68.4, size: 2.1, delay: 1.6, duration: 2.8 },
  { id: 23, x: 71.2, y: 9.7, size: 1.6, delay: 2.8, duration: 3.9 },
  { id: 24, x: 52.9, y: 51.5, size: 2.4, delay: 0.0, duration: 2.5 },
  { id: 25, x: 25.8, y: 95.3, size: 1.2, delay: 1.3, duration: 4.4 },
  { id: 26, x: 89.3, y: 76.1, size: 1.7, delay: 2.0, duration: 3.2 },
  { id: 27, x: 4.5, y: 40.8, size: 2.8, delay: 0.9, duration: 2.6 },
  { id: 28, x: 64.7, y: 28.3, size: 1.4, delay: 1.8, duration: 3.7 },
  { id: 29, x: 47.3, y: 72.9, size: 2.0, delay: 2.6, duration: 2.9 },
];

const OPACITY_VALUES = [0.55, 0.72, 0.48, 0.81, 0.63, 0.70, 0.52, 0.65, 0.78, 0.44,
  0.59, 0.86, 0.67, 0.41, 0.74, 0.53, 0.69, 0.82, 0.46, 0.77,
  0.60, 0.88, 0.57, 0.43, 0.75, 0.66, 0.49, 0.84, 0.62, 0.71];

export default function FloatingStars({ count = 30 }: { count?: number }) {
  const stars = STAR_DATA.slice(0, Math.min(count, STAR_DATA.length));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: `rgba(249, 168, 212, ${OPACITY_VALUES[i] ?? 0.6})`,
            boxShadow: `0 0 ${star.size * 3}px rgba(249, 168, 212, 0.8)`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.3, 0.8],
            y: [0, -8, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
