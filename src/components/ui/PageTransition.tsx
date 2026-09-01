"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  id: string | number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "zoom";
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  up: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  down: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
  },
  left: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },
  right: {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 80 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.08 },
  },
};

export default function PageTransition({
  children,
  id,
  direction = "fade",
}: PageTransitionProps) {
  const v = variants[direction];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="page-container"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
