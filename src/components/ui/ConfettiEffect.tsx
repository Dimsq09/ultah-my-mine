"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger?: boolean;
  type?: "burst" | "rain" | "sides";
}

export function useConfetti() {
  const burstConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#a5b4fc", "#ffffff", "#818cf8", "#c7d2fe", "#6366f1", "#fbbf24"],
      zIndex: 9999,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7, x: 0.25 },
        colors: ["#a5b4fc", "#ffffff", "#fbbf24"],
        zIndex: 9999,
      });
    }, 300);

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7, x: 0.75 },
        colors: ["#818cf8", "#c7d2fe", "#ffffff"],
        zIndex: 9999,
      });
    }, 500);
  };

  const rainConfetti = () => {
    let frame = 0;
    const maxFrames = 200;

    const interval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0 },
        colors: ["#a5b4fc", "#ffffff", "#818cf8", "#c7d2fe"],
        zIndex: 9999,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0 },
        colors: ["#6366f1", "#fbbf24", "#ffffff"],
        zIndex: 9999,
      });

      frame++;
      if (frame > maxFrames) clearInterval(interval);
    }, 30);
  };

  return { burstConfetti, rainConfetti };
}

export default function ConfettiEffect({ trigger, type = "burst" }: ConfettiEffectProps) {
  const { burstConfetti, rainConfetti } = useConfetti();
  const triggered = useRef(false);

  useEffect(() => {
    if (trigger && !triggered.current) {
      triggered.current = true;
      if (type === "burst") burstConfetti();
      else if (type === "rain") rainConfetti();
    }
  }, [trigger]);

  return null;
}
