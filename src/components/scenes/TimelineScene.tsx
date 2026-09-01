"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface TimelineSceneProps {
  onNext: () => void;
}

export default function TimelineScene({ onNext }: TimelineSceneProps) {
  const { timeline } = birthdayConfig;
  const [activeItem, setActiveItem] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveItem((prev) => {
        const next = prev < timeline.items.length - 1 ? prev + 1 : prev;
        if (next !== prev) {
          setVisibleItems((items) =>
            items.includes(next) ? items : [...items, next]
          );
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (activeItem < timeline.items.length - 1) {
      const next = activeItem + 1;
      setActiveItem(next);
      setVisibleItems((items) =>
        items.includes(next) ? items : [...items, next]
      );
    } else {
      onNext();
    }
  };

  return (
    <div
      className="page-container flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a2b6d 0%, #0f1e35 50%, #080f1e 100%)",
      }}
    >
      <FloatingStars count={20} />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold gradient-text">
            {timeline.title}
          </h2>
        </motion.div>

        {/* Timeline path */}
        <div className="relative">
          {/* SVG Winding path */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 500"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              <motion.path
                d="M 200 30 C 320 80, 80 150, 200 220 C 320 290, 80 360, 200 430 C 260 470, 200 490, 200 500"
                fill="none"
                stroke="rgba(99, 102, 241, 0.3)"
                strokeWidth="3"
                strokeDasharray="8 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M 200 30 C 320 80, 80 150, 200 220 C 320 290, 80 360, 200 430 C 260 470, 200 490, 200 500"
                fill="none"
                stroke="rgba(165, 180, 252, 0.15)"
                strokeWidth="30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (activeItem + 1) / timeline.items.length }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* Timeline items */}
          <div className="relative space-y-8" style={{ zIndex: 1 }}>
            {timeline.items.map((item, index) => {
              const isVisible = visibleItems.includes(index);
              const isActive = index === activeItem;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-center gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Photo circle */}
                  <motion.div
                    className="flex-shrink-0 relative"
                    whileHover={{ scale: 1.1 }}
                    animate={isActive ? { scale: [1, 1.08, 1] } : {}}
                    transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4"
                      style={{
                        borderColor: isActive
                          ? "#a5b4fc"
                          : "rgba(99,102,241,0.4)",
                        boxShadow: isActive
                          ? "0 0 25px rgba(165, 180, 252, 0.8)"
                          : "0 4px 15px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.caption}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
                        >
                          <span className="text-2xl">
                            {index === 4 ? "🎉" : ["💫", "🌸", "🌊", "🕯️"][index]}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Pulse ring */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-indigo-300"
                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Content bubble */}
                  <motion.div
                    className="glass rounded-2xl p-4 flex-1 max-w-xs"
                    style={{
                      background: isActive
                        ? "rgba(99, 102, 241, 0.15)"
                        : "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <p className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      {item.date}
                    </p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {item.caption}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              boxShadow: "0 4px 20px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {activeItem < timeline.items.length - 1 ? "Next Stop" : "Continue Journey"}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
