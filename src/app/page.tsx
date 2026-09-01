"use client";

import { useEffect, useState } from "react";
import BirthdayApp from "@/components/BirthdayApp";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full h-dvh flex flex-col items-center justify-center gap-4"
        style={{ background: "#1a0518" }}
      >
        <div className="text-5xl animate-bounce">🎂</div>
        <p className="text-pink-300 font-inter text-sm tracking-widest">
          Memuat...
        </p>
      </div>
    );
  }

  return <BirthdayApp />;
}
