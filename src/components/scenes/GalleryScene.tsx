"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import Image from "next/image";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface GallerySceneProps {
  onNext: () => void;
}

// 12 stiker dibagi merata, 2 per bingkai
const STICKERS = [
  // bingkai 1
  [
    { src: "/stiker/419c02e863954adc877b95f9b1a8f77c.webp", pos: "top-0 right-0 -translate-y-1/3 translate-x-1/3", rot: "rotate-12" },
    { src: "/stiker/4b6d511db9ba6857f0a9cfd9c1e5903f.webp", pos: "bottom-6 left-0 -translate-x-1/3",              rot: "-rotate-12" },
  ],
  // bingkai 2
  [
    { src: "/stiker/6012e93987a0e5f07cb79c1ddf65b98d.webp", pos: "top-0 left-0 -translate-y-1/3 -translate-x-1/3", rot: "-rotate-6" },
    { src: "/stiker/7c72d07a1f2595c7e4da25b16b1997ee.webp", pos: "bottom-6 right-0 translate-x-1/3",              rot: "rotate-6" },
  ],
  // bingkai 3
  [
    { src: "/stiker/a0ce38ff735bb538ee4d48a1d99c9e52.webp", pos: "top-0 right-0 -translate-y-1/3 translate-x-1/3", rot: "rotate-10" },
    { src: "/stiker/b33cc9e1fff3c535dd83b987f0a66147.webp", pos: "bottom-6 left-0 -translate-x-1/3",              rot: "-rotate-10" },
  ],
  // bingkai 4
  [
    { src: "/stiker/d5165c31e02ca0d255bd8631f3143fdf.webp", pos: "top-0 left-0 -translate-y-1/3 -translate-x-1/3", rot: "-rotate-8" },
    { src: "/stiker/dbd38248bdec3c7fdc65118bcb8a5009.webp", pos: "bottom-6 right-0 translate-x-1/3",              rot: "rotate-8" },
  ],
  // bingkai 5
  [
    { src: "/stiker/e306a380f0faa06199c7275091ee7f13.webp", pos: "top-0 right-0 -translate-y-1/3 translate-x-1/3", rot: "rotate-15" },
    { src: "/stiker/ed6fb9b3eed7c2f6a8d5f95f0b8d51e5.webp", pos: "bottom-6 left-0 -translate-x-1/3",              rot: "-rotate-15" },
  ],
  // bingkai 6
  [
    { src: "/stiker/f36e156b11382fbfad10ad7cff561389.webp", pos: "top-0 left-0 -translate-y-1/3 -translate-x-1/3", rot: "-rotate-12" },
    { src: "/stiker/fa37f63307ae534a911b7ab3542437fc.webp", pos: "bottom-6 right-0 translate-x-1/3",              rot: "rotate-12" },
  ],
];

export default function GalleryScene({ onNext }: GallerySceneProps) {
  const { gallery } = birthdayConfig;
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const floatDelays = [0, 0.5, 1.2, 0.3, 0.8, 1.5];
  const floatDurations = [3, 3.5, 4, 3.2, 3.8, 4.2];

  return (
    <div
      className="page-container flex flex-col items-center justify-center overflow-auto"
      style={{
        background:
          "radial-gradient(ellipse at 20% 80%, #4a0030 0%, #2d0a1e 50%, #1a0518 100%)",
      }}
    >
      <FloatingStars count={30} />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Title */}
        <motion.div
          className="text-center mb-5 sm:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-playfair text-3xl sm:text-5xl font-bold gradient-text mb-1 sm:mb-2">
            {gallery.title}
          </h2>
          <p className="text-pink-300/70 text-xs sm:text-sm">{gallery.subtitle}</p>
        </motion.div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-8">
          {gallery.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40, rotate: photo.rotation }}
              animate={{
                opacity: 1,
                y: [0, -6, 0],
                rotate: photo.rotation,
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.12 },
                y: {
                  duration: floatDurations[index],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelays[index],
                },
                rotate: { duration: 0.5, delay: index * 0.12 },
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhoto(index)}
              className="polaroid cursor-pointer transition-all relative"
              style={{ rotate: `${photo.rotation}deg` }}
            >
              {/* Photo */}
              <div className="w-full aspect-square overflow-hidden bg-gray-100">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${photo.gradient} flex items-center justify-center`}
                  >
                    <span className="text-3xl sm:text-4xl">
                      {["😄", "💑", "🌸", "😂", "✨", "💫"][index]}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <p className="text-center mt-1.5 sm:mt-2 text-gray-600 text-[10px] sm:text-xs font-inter leading-tight">
                {photo.caption}
              </p>

              {/* Stickers — 2 per polaroid */}
              {STICKERS[index]?.map((sticker, si) => (
                <motion.div
                  key={si}
                  className={`absolute ${sticker.pos} w-7 h-7 sm:w-10 sm:h-10 pointer-events-none z-20`}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                  transition={{
                    scale: { delay: index * 0.12 + si * 0.15 + 0.4, duration: 0.4, type: "spring" },
                    rotate: { duration: 3 + si, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <Image
                    src={sticker.src}
                    alt="stiker"
                    width={40}
                    height={40}
                    className={`w-full h-full object-contain drop-shadow-lg ${sticker.rot}`}
                    unoptimized
                  />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Next button */}
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={onNext}
            className="flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white text-sm sm:text-base"
            style={{
              background: "linear-gradient(135deg, #db2777, #ec4899)",
              boxShadow: "0 4px 20px rgba(236, 72, 153, 0.5)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="polaroid max-w-xs w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-square overflow-hidden bg-gray-100">
                {gallery.photos[selectedPhoto].src ? (
                  <Image
                    src={gallery.photos[selectedPhoto].src!}
                    alt={gallery.photos[selectedPhoto].caption}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gallery.photos[selectedPhoto].gradient} flex items-center justify-center`}
                  >
                    <span className="text-6xl">
                      {["😄", "💑", "🌸", "😂", "✨", "💫"][selectedPhoto]}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-center mt-3 text-gray-600 font-inter text-sm leading-snug">
                {gallery.photos[selectedPhoto].caption}
              </p>

              {/* Stickers on lightbox too */}
              {STICKERS[selectedPhoto]?.map((sticker, si) => (
                <div
                  key={si}
                  className={`absolute ${sticker.pos} w-12 h-12 pointer-events-none z-20`}
                >
                  <Image
                    src={sticker.src}
                    alt="stiker"
                    width={52}
                    height={52}
                    className={`w-full h-full object-contain drop-shadow-lg ${sticker.rot}`}
                    unoptimized
                  />
                </div>
              ))}
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 glass rounded-full p-2 text-white"
              onClick={() => setSelectedPhoto(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
