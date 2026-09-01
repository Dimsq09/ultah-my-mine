"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useConfetti } from "@/components/ui/ConfettiEffect";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface GiftSceneProps {
  onNext: () => void;
}

export default function GiftScene({ onNext }: GiftSceneProps) {
  const { gift } = birthdayConfig;
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { burstConfetti } = useConfetti();

  const handleOpenGift = () => {
    if (isAnimating || isOpened) return;
    setIsAnimating(true);

    setTimeout(() => {
      setIsOpened(true);
      burstConfetti();
      setTimeout(() => burstConfetti(), 600);
      setTimeout(() => burstConfetti(), 1200);
    }, 800);
  };

  return (
    <div
      className="page-container flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #4a0030 0%, #2d0a1e 55%, #1a0518 100%)",
      }}
    >
      <FloatingStars count={25} />

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Title */}
        <motion.h2
          className="font-playfair text-4xl md:text-5xl font-bold gradient-text mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ada Hadiah Untukmu 🎁
        </motion.h2>

        {/* Gift Box 3D */}
        <div className="relative" style={{ perspective: "800px" }}>
          {/* Glow base */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(236,72,153,0.6) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
            animate={{ scaleX: isOpened ? 1.5 : 1, opacity: isOpened ? 1 : 0.6 }}
          />

          {/* Box wrapper */}
          <motion.div
            className="relative"
            animate={isAnimating && !isOpened ? { y: [0, -8, 0, -5, 0] } : {}}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Box lid */}
            <motion.div
              className="relative z-10"
              animate={isOpened ? { rotateX: -130, y: -20, opacity: 0 } : { rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
            >
              {/* Lid top */}
              <div
                className="w-48 h-12 rounded-t-lg mx-auto flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #db2777, #ec4899)",
                  boxShadow: "0 -4px 20px rgba(236,72,153,0.4)",
                }}
              >
                {/* Ribbon cross on lid */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-full bg-pink-300/40 absolute" />
                </div>
                {/* Bow */}
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                    <motion.div
                      className="w-8 h-6 rounded-full"
                      style={{ background: "linear-gradient(135deg, #f472b6, #fbcfe8)" }}
                      animate={isOpened ? {} : { rotate: [-3, 3, -3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-8 h-6 rounded-full"
                      style={{ background: "linear-gradient(135deg, #f472b6, #fbcfe8)" }}
                      animate={isOpened ? {} : { rotate: [3, -3, 3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box body */}
            <motion.div
              className="relative"
              animate={isOpened ? { scaleY: [1, 0.95, 1] } : {}}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div
                className="w-48 h-40 rounded-b-lg relative overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #9d174d, #db2777)",
                  boxShadow: "0 10px 40px rgba(236,72,153,0.5), 0 20px 60px rgba(0,0,0,0.4)",
                }}
              >
                {/* Ribbon vertical */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex justify-center">
                  <div className="w-6 bg-pink-300/30 h-full" />
                </div>
                {/* Polka dots */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-white/10"
                    style={{
                      left: `${(i % 3) * 35 + 8}%`,
                      top: `${Math.floor(i / 3) * 35 + 10}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Gift content that rises when opened */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.5 }}
                  animate={{ opacity: 1, y: -60, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="absolute inset-x-0 bottom-0 flex justify-center"
                >
                  <div className="text-6xl filter drop-shadow-lg">💝</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Message after opening */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-16 text-center max-w-md"
            >
              {/* Light burst */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5 }}
                style={{
                  background: "radial-gradient(circle at center, rgba(249, 168, 212, 0.3) 0%, transparent 60%)",
                }}
              />

              <p className="font-playfair text-2xl md:text-3xl text-white font-bold leading-relaxed mb-3">
                {gift.message}
              </p>
              <p className="font-dancing text-xl text-pink-300">{gift.subMessage}</p>

              <motion.button
                onClick={onNext}
                className="mt-8 flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white mx-auto"
                style={{
                  background: "linear-gradient(135deg, #db2777, #ec4899)",
                  boxShadow: "0 4px 20px rgba(236, 72, 153, 0.5)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open button */}
        <AnimatePresence>
          {!isOpened && (
            <motion.button
              onClick={handleOpenGift}
              className="mt-12 relative group px-10 py-4 rounded-full font-semibold text-white text-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #db2777, #be185d)",
                boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(236, 72, 153, 0.8)" }}
              whileTap={{ scale: 0.97 }}
              exit={{ opacity: 0, scale: 0.8 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(236,72,153,0.4)",
                  "0 0 50px rgba(236,72,153,0.8)",
                  "0 0 20px rgba(236,72,153,0.4)",
                ],
              }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10">{gift.buttonText}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating stars around box */}
        {!isOpened &&
          [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-300/60 pointer-events-none"
              style={{
                left: `${30 + Math.cos((i * Math.PI * 2) / 6) * 15}%`,
                top: `${40 + Math.sin((i * Math.PI * 2) / 6) * 20}%`,
                fontSize: "14px",
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              ✦
            </motion.div>
          ))}
      </div>
    </div>
  );
}
