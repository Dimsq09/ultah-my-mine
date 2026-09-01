"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScene from "@/components/scenes/IntroScene";
import MessageScene from "@/components/scenes/MessageScene";
import GalleryScene from "@/components/scenes/GalleryScene";
import GiftScene from "@/components/scenes/GiftScene";
import ClosingScene from "@/components/scenes/ClosingScene";
import FloatingEmojis from "@/components/ui/FloatingEmojis";

const YT_VIDEO_ID = "FEJEEIMRXug";

type Scene = "intro" | "message" | "gallery" | "gift" | "closing";

const sceneOrder: Scene[] = ["intro", "message", "gallery", "gift", "closing"];

const sceneLabels: Record<Scene, string> = {
  intro: "Intro",
  message: "Pesan",
  gallery: "Gallery",
  gift: "Hadiah",
  closing: "Penutup",
};

const pageVariants = {
  initial: (direction: number) => ({ opacity: 0, y: direction > 0 ? 60 : -60, scale: 0.96 }),
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, y: direction > 0 ? -60 : 60, scale: 0.96 }),
};

function YoutubeBgMusic({ started }: { started: boolean }) {
  const [muted, setMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if ((window as any).YT) { initPlayer(); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    (window as any).onYouTubeIframeAPIReady = () => initPlayer();
  }, []);

  const initPlayer = () => {
    playerRef.current = new (window as any).YT.Player("yt-bg-player", {
      videoId: YT_VIDEO_ID,
      playerVars: { autoplay: 0, loop: 1, playlist: YT_VIDEO_ID, controls: 0, modestbranding: 1, rel: 0 },
      events: { onReady: () => setPlayerReady(true) },
    });
  };

  useEffect(() => {
    if (started && playerReady && playerRef.current) {
      playerRef.current.playVideo();
    }
  }, [started, playerReady]);

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (muted) { playerRef.current.unMute(); playerRef.current.setVolume(80); }
    else playerRef.current.mute();
    setMuted(!muted);
  };

  return (
    <>
      <div className="fixed" style={{ width: 1, height: 1, opacity: 0, pointerEvents: "none", top: -100 }}>
        <div id="yt-bg-player" />
      </div>
      {started && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          onClick={toggleMute}
          title={muted ? "Nyalakan musik" : "Matikan musik"}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
          style={{
            background: "rgba(236,72,153,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(249,168,212,0.5)",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {muted ? "🔇" : "🎵"}
        </motion.button>
      )}
    </>
  );
}

export default function BirthdayApp() {
  const [currentScene, setCurrentScene] = useState<Scene>("intro");
  const [direction, setDirection] = useState(1);
  const [musicStarted, setMusicStarted] = useState(false);

  const navigateToScene = (scene: Scene) => {
    const ci = sceneOrder.indexOf(currentScene);
    const ni = sceneOrder.indexOf(scene);
    setDirection(ni > ci ? 1 : -1);
    setCurrentScene(scene);
  };

  const goToNext = () => {
    const ci = sceneOrder.indexOf(currentScene);
    if (ci < sceneOrder.length - 1) navigateToScene(sceneOrder[ci + 1]);
  };

  const handleStart = () => { setMusicStarted(true); goToNext(); };
  const currentIndex = sceneOrder.indexOf(currentScene);

  return (
    <div className="relative w-full h-dvh overflow-hidden" style={{ background: "#1a0518" }}>
      {/* Floating emoji background */}
      <FloatingEmojis count={24} />

      {/* YouTube Background Music */}
      <YoutubeBgMusic started={musicStarted} />

      {/* Navigation dots */}
      {currentScene !== "intro" && (
        <motion.div
          className="fixed top-6 right-6 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          {sceneOrder.slice(1).map((scene, i) => {
            const sceneIdx = i + 1;
            const isActive = currentScene === scene;
            const isCompleted = currentIndex > sceneIdx;
            return (
              <motion.button
                key={scene}
                onClick={() => navigateToScene(scene)}
                className="group relative w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: isActive ? "#f472b6" : isCompleted ? "rgba(244,114,182,0.5)" : "rgba(255,255,255,0.2)",
                  boxShadow: isActive ? "0 0 10px rgba(244,114,182,0.9)" : "none",
                }}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                title={sceneLabels[scene]}
              >
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-pink-200/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {sceneLabels[scene]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Scene renderer */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {currentScene === "intro"   && <IntroScene   onStart={handleStart} />}
          {currentScene === "message" && <MessageScene onNext={goToNext} />}
          {currentScene === "gallery" && <GalleryScene onNext={goToNext} />}
          {currentScene === "gift"    && <GiftScene    onNext={goToNext} />}
          {currentScene === "closing" && <ClosingScene />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
