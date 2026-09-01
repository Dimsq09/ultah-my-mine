"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronRight, Music } from "lucide-react";
import FloatingStars from "@/components/ui/FloatingStars";
import { birthdayConfig } from "@/config/config";

interface MusicSceneProps {
  onNext: () => void;
}

export default function MusicScene({ onNext }: MusicSceneProps) {
  const { music } = birthdayConfig;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      // Audio file not found — just toggle state for demo
      setIsPlaying((prev) => !prev);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const time = (parseFloat(e.target.value) / 100) * audio.duration;
    audio.currentTime = time;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="page-container flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 20%, #1a1a6d 0%, #0f1e35 50%, #080f1e 100%)",
      }}
    >
      <audio ref={audioRef} src={music.src} preload="auto" />
      <FloatingStars count={20} />

      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-sm">
        {/* Title */}
        <motion.h2
          className="font-playfair text-3xl md:text-4xl font-bold gradient-text mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎵 Lagu Untukmu
        </motion.h2>

        {/* Player card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-3xl p-6 w-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          {/* Album cover */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="relative w-44 h-44 md:w-52 md:h-52"
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 20,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
              }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden border-4 border-indigo-400/40"
                style={{
                  boxShadow: isPlaying
                    ? "0 0 40px rgba(99, 102, 241, 0.8), 0 0 80px rgba(99, 102, 241, 0.3)"
                    : "0 0 20px rgba(99, 102, 241, 0.3)",
                }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${music.coverGradient} flex items-center justify-center`}
                >
                  <Music className="w-16 h-16 text-indigo-300/60" />
                </div>
              </div>
              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-indigo-400/30" />
              </div>
              {/* Glow pulse when playing */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-indigo-400"
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>

          {/* Song info */}
          <div className="text-center mb-6">
            <motion.h3
              className="font-playfair text-2xl font-bold text-white mb-1"
              animate={isPlaying ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {music.title}
            </motion.h3>
            <p className="text-indigo-300 text-sm">{music.artist}</p>
            <p className="text-indigo-400/60 text-xs mt-1">{music.album}</p>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={handleSeek}
              className="progress-bar w-full"
              style={{
                background: `linear-gradient(to right, #a5b4fc ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
              }}
            />
            <div className="flex justify-between text-xs text-indigo-300/60 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              className="text-indigo-300/60 hover:text-indigo-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (audioRef.current) audioRef.current.currentTime = 0;
              }}
            >
              <SkipBack className="w-6 h-6" />
            </motion.button>

            {/* Play/Pause */}
            <motion.button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #818cf8)",
                boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)",
              }}
              whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(99, 102, 241, 0.9)" }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause className="w-7 h-7" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Play className="w-7 h-7 ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              className="text-indigo-300/60 hover:text-indigo-300 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SkipForward className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mt-5">
            <Volume2 className="w-4 h-4 text-indigo-400/60" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume * 100}
              onChange={(e) => {
                const v = parseFloat(e.target.value) / 100;
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v;
              }}
              className="progress-bar flex-1"
              style={{
                background: `linear-gradient(to right, #a5b4fc ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
              }}
            />
          </div>

          {/* Audio note */}
          {!isPlaying && (
            <p className="text-center text-indigo-400/50 text-xs mt-4">
              ♪ Tekan play untuk memutar lagu
            </p>
          )}
        </motion.div>

        {/* Next button */}
        <motion.button
          onClick={onNext}
          className="mt-6 flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.5)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Penutup
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
