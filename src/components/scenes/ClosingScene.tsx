"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FloatingStars from "@/components/ui/FloatingStars";
import { useConfetti } from "@/components/ui/ConfettiEffect";
import { birthdayConfig } from "@/config/config";

export default function ClosingScene() {
  const { closing, recipient, sender } = birthdayConfig;
  const { rainConfetti } = useConfetti();
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      setTimeout(() => rainConfetti(), 400);
      setTimeout(() => rainConfetti(), 2000);
    }
  }, []);

  // Corner flower decorations
  const flowers = [
    { x: "3%",  y: "5%",  size: 42, rotate: -20, delay: 0.3, emoji: "🌸" },
    { x: "88%", y: "4%",  size: 38, rotate: 15,  delay: 0.6, emoji: "🌺" },
    { x: "1%",  y: "72%", size: 46, rotate: -10, delay: 0.9, emoji: "🌼" },
    { x: "87%", y: "68%", size: 40, rotate: 25,  delay: 1.2, emoji: "💮" },
    { x: "13%", y: "88%", size: 34, rotate: -30, delay: 0.4, emoji: "🌻" },
    { x: "78%", y: "85%", size: 44, rotate: 20,  delay: 0.7, emoji: "🌹" },
    { x: "45%", y: "2%",  size: 30, rotate: 5,   delay: 1.0, emoji: "🌸" },
    { x: "60%", y: "90%", size: 36, rotate: -15, delay: 0.5, emoji: "🌺" },
  ];

  // Floating star/sparkle positions
  const sparkles = [
    { x: "10%", y: "20%", delay: 0.2, dur: 2.1 },
    { x: "85%", y: "15%", delay: 0.9, dur: 2.7 },
    { x: "5%",  y: "50%", delay: 1.5, dur: 2.3 },
    { x: "92%", y: "45%", delay: 0.4, dur: 3.1 },
    { x: "25%", y: "85%", delay: 1.8, dur: 2.5 },
    { x: "72%", y: "80%", delay: 0.7, dur: 2.0 },
  ];

  return (
    <div
      className="page-container flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #5a0038 0%, #2d0a1e 55%, #120410 100%)",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 20% 30%, rgba(236,72,153,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.10) 0%, transparent 50%)",
        }} />
      </div>

      {/* Flower decorations */}
      {flowers.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{ left: f.x, top: f.y, fontSize: f.size }}
          initial={{ opacity: 0, scale: 0, rotate: f.rotate - 180 }}
          animate={{
            opacity: [0.5, 0.85, 0.5],
            scale: 1,
            rotate: f.rotate,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.8, delay: f.delay },
            rotate: { duration: 0.8, delay: f.delay },
            y: { duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
          }}
        >
          {f.emoji}
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map((sp, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-pink-300"
          style={{ left: sp.x, top: sp.y, fontSize: 18 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: sp.dur, repeat: Infinity, delay: sp.delay, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      ))}

      <FloatingStars count={20} />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">

        {/* Animated halo rings behind the title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          {[220, 320, 420].map((size, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                border: `${1.5 - i * 0.3}px solid rgba(249,168,212,${0.18 - i * 0.04})`,
              }}
              animate={{ rotate: [0, i % 2 === 0 ? 360 : -360] }}
              transition={{ duration: 15 + i * 8, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>

        {/* Big pulsing heart */}
        <motion.div
          className="text-5xl md:text-6xl mb-5 flex justify-center"
          animate={{ scale: [1, 1.25, 1], y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full" style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, transparent 70%)",
              filter: "blur(15px)", transform: "scale(2)",
            }} />
            <span className="relative">💕</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-3"
        >
          <h1 className="font-playfair font-bold leading-tight" style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)" }}>
            <span className="gradient-text">Happy</span>
            <br />
            <span className="gradient-text">Birthday!</span>
          </h1>
        </motion.div>

        {/* Recipient name with glow card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <div className="inline-block px-6 py-2 rounded-full" style={{
            background: "rgba(236,72,153,0.15)",
            border: "1px solid rgba(249,168,212,0.35)",
            backdropFilter: "blur(10px)",
          }}>
            <span
              className="font-dancing text-4xl md:text-5xl"
              style={{ color: "#f9a8d4", textShadow: "0 0 30px rgba(249,168,212,0.8)" }}
            >
              {recipient.fullName}
            </span>
          </div>
        </motion.div>

        {/* Separator */}
        <motion.div
          className="flex items-center gap-4 justify-center mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="h-px flex-1 max-w-28 bg-gradient-to-r from-transparent to-pink-400" />
          <span className="text-lg">🎂</span>
          <div className="h-px flex-1 max-w-28 bg-gradient-to-l from-transparent to-pink-400" />
        </motion.div>

        {/* Message in a glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-8 px-6 py-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(249,168,212,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="font-inter text-pink-100/90 text-sm md:text-base leading-relaxed">
            {closing.message}
          </p>
        </motion.div>

        {/* With Love */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="space-y-1"
        >
          <p className="font-inter text-pink-300/60 text-sm tracking-widest uppercase">
            {closing.withLoveText}
          </p>
          <p
            className="font-dancing text-4xl md:text-5xl"
            style={{ color: "#fbcfe8", textShadow: "0 0 25px rgba(251,207,232,0.6)" }}
          >
            {sender.name}
          </p>
          <motion.div
            className="flex justify-center gap-2 mt-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-2xl">❤️</span>
            <span className="text-2xl">💕</span>
            <span className="text-2xl">❤️</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
