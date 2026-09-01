"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface IntroSceneProps {
  onStart: () => void;
}

// Fixed ring sizes & speeds to avoid hydration mismatch
const RINGS = [
  { size: 260, dur: 12, opacity: 0.15, border: "2px solid rgba(249,168,212,0.4)", delay: 0 },
  { size: 360, dur: 18, opacity: 0.10, border: "1.5px solid rgba(236,72,153,0.3)", delay: 0.5 },
  { size: 470, dur: 25, opacity: 0.07, border: "1px solid rgba(219,39,119,0.25)", delay: 1 },
];

const SPARKLE_POS = [
  { top: "12%", left: "10%", size: 20, delay: 0.2 },
  { top: "8%",  left: "85%", size: 16, delay: 0.8 },
  { top: "78%", left: "6%",  size: 18, delay: 1.4 },
  { top: "82%", left: "88%", size: 22, delay: 0.5 },
  { top: "45%", left: "4%",  size: 14, delay: 1.9 },
  { top: "40%", left: "92%", size: 14, delay: 1.1 },
];

export default function IntroScene({ onStart }: IntroSceneProps) {
  const { intro, recipient } = birthdayConfig;

  return (
    <div
      className="page-container flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 40% 60%, #5a0038 0%, #2d0a1e 45%, #120410 100%)",
      }}
    >
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(168,85,247,0.12) 0%, transparent 50%)",
        }} />
      </div>

      <FloatingStars count={25} />

      {/* Rotating rings around center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RINGS.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: ring.size,
              height: ring.size,
              border: ring.border,
              opacity: ring.opacity,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: ring.dur, repeat: Infinity, ease: "linear", delay: ring.delay }}
          />
        ))}
        {/* Inner glow orb */}
        <div className="absolute w-48 h-48 rounded-full" style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)",
          filter: "blur(20px)",
        }} />
      </div>

      {/* Corner sparkles */}
      {SPARKLE_POS.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-pink-300/60"
          style={{ top: sp.top, left: sp.left, fontSize: sp.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8], rotate: [0, 180, 360] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: sp.delay, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-20 text-center px-4 max-w-md w-full mx-auto my-auto py-6"
      >
        {/* Glowing card */}
        <div className="relative mb-4 sm:mb-8">
          {/* Animated gradient border */}
          <motion.div
            className="absolute -inset-[2px] rounded-3xl"
            style={{ background: "linear-gradient(135deg, #f9a8d4, #ec4899, #9333ea, #ec4899, #f9a8d4)", backgroundSize: "300% 300%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div
            className="relative rounded-3xl px-5 sm:px-8 pt-6 sm:pt-8 pb-6 sm:pb-7"
            style={{ background: "rgba(26,5,24,0.88)", backdropFilter: "blur(20px)" }}
          >
            {/* Cake with halo */}
            <motion.div
              className="flex justify-center mb-4 sm:mb-5"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative">
                {/* Halo glow */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 65%)",
                  filter: "blur(12px)",
                  transform: "scale(1.8)",
                }} />
                <div className="text-5xl sm:text-7xl relative z-10">🎂</div>
                <motion.div
                  className="absolute -top-1 -right-1 z-20"
                  animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 drop-shadow-lg" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -left-2 z-20"
                  animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300 drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-playfair text-3xl sm:text-5xl font-bold gradient-text mb-2 leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {intro.title}
            </motion.h1>

            {/* Recipient name */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mb-3 sm:mb-4"
            >
              <span
                className="font-dancing text-3xl sm:text-4xl"
                style={{ color: "#f9a8d4", textShadow: "0 0 25px rgba(249,168,212,0.8), 0 0 50px rgba(236,72,153,0.4)" }}
              >
                {recipient.fullName}
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-pink-200/70 text-xs sm:text-base font-light mb-5 sm:mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              {intro.subtitle}
            </motion.p>

            {/* Divider */}
            <motion.div
              className="flex items-center gap-3 justify-center mb-5 sm:mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pink-400/60" />
              <span className="text-sm sm:text-base">💕</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pink-400/60" />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onStart}
              className="relative group w-full py-3 sm:py-3.5 rounded-2xl font-inter font-semibold text-sm sm:text-base text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #be185d, #ec4899, #f472b6)",
                boxShadow: "0 0 25px rgba(236,72,153,0.6), 0 4px 20px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 45px rgba(236,72,153,0.9), 0 4px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
              />
              <span className="relative z-10">✨ {intro.buttonText}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Rising hearts */}
      {([18, 14, 22, 16, 20, 12, 24] as const).map((size, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-pink-400/50"
          style={{ left: `${8 + i * 13}%`, bottom: "5%", fontSize: size }}
          animate={{ y: [0, -600], opacity: [0, 0.8, 0], x: [0, i % 2 === 0 ? 25 : -25] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 1.1, ease: "easeOut" }}
        >
          {["💕", "❤️", "💖", "💗", "💓", "🌸", "💝"][i]}
        </motion.div>
      ))}
    </div>
  );
}
