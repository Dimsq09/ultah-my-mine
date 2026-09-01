"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface MessageSceneProps {
  onNext: () => void;
}

const CORNER_DECOR = [
  { emoji: "💕", top: "3%",  left: "3%",  size: 28, delay: 0,   dur: 3.2 },
  { emoji: "🌸", top: "5%",  left: "88%", size: 24, delay: 0.8, dur: 3.8 },
  { emoji: "✨", top: "90%", left: "5%",  size: 22, delay: 1.3, dur: 2.9 },
  { emoji: "💖", top: "88%", left: "86%", size: 26, delay: 0.4, dur: 4.1 },
];

export default function MessageScene({ onNext }: MessageSceneProps) {
  const { message } = birthdayConfig;
  const [showButton, setShowButton] = useState(false);

  const { displayedMessages, currentText, cursorVisible, isComplete } =
    useTypingEffect({
      messages: message.typingMessages,
      typingSpeed: 45,
      pauseAfterTyping: 1000,
      onComplete: () => {
        setTimeout(() => setShowButton(true), 600);
      },
    });

  return (
    <div
      className="page-container flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #4a0030 0%, #2d0a1e 55%, #120410 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <FloatingStars count={20} />

      {/* Corner decorations */}
      {CORNER_DECOR.map((d, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none z-20"
          style={{ top: d.top, left: d.left, fontSize: d.size }}
          animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        >
          {d.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        {/* Animated gradient border wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Rotating gradient border */}
          <motion.div
            className="absolute -inset-[2px] rounded-3xl z-0"
            style={{ background: "linear-gradient(135deg, #f9a8d4, #ec4899, #9333ea, #f472b6, #f9a8d4)", backgroundSize: "300% 300%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Card inner */}
          <div
            className="relative z-10 rounded-3xl px-7 pt-7 pb-6"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow: "0 20px 60px rgba(236,72,153,0.2), 0 8px 24px rgba(0,0,0,0.15)",
            }}
          >
            {/* Hearts top */}
            <motion.div
              className="text-3xl mb-4 text-center"
              animate={{ scale: [1, 1.15, 1], y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              💕💕💕💕
            </motion.div>

            {/* Title */}
            <h2
              className="font-playfair text-2xl md:text-3xl font-bold text-center mb-2 leading-snug"
              style={{ color: "#881337" }}
            >
              {message.title}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-3 justify-center mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-300 to-pink-400" />
              <span className="text-sm">🌸</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-pink-300 to-pink-400" />
            </div>

            {/* Messages */}
            <div className="space-y-3 min-h-[180px]">
              {displayedMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-lg mt-0.5 flex-shrink-0">💗</span>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed font-inter">
                    {msg}
                  </p>
                </motion.div>
              ))}

              {!isComplete && (
                <div className="flex items-start gap-2.5">
                  <span className="text-lg mt-0.5 flex-shrink-0">💗</span>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed font-inter">
                    {currentText}
                    <span
                      className="inline-block w-0.5 h-4 bg-pink-500 ml-0.5 align-middle rounded-full"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    />
                  </p>
                </div>
              )}
            </div>

            {/* Next button */}
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-end mt-6"
                >
                  <motion.button
                    onClick={onNext}
                    className="relative flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-white text-sm overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #be185d, #ec4899, #f472b6)",
                      boxShadow: "0 4px 20px rgba(236,72,153,0.55)",
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 6px 30px rgba(236,72,153,0.75)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    />
                    <span className="relative z-10">Next</span>
                    <ChevronRight className="w-4 h-4 relative z-10" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
