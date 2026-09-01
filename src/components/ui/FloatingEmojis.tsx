"use client";

import { motion } from "framer-motion";

const EMOJIS = ["💕", "❤️", "💖", "💗", "💓", "💝", "🎂", "🎉", "🎈", "🥳", "🌸", "✨", "💘", "🎀", "💞", "🎁"];

// Fixed positions & sizes to avoid hydration mismatch
const EMOJI_DATA = [
  { id:  0, emoji: "💕", x:  5.2, size: 22, dur: 7.1, delay: 0.0  },
  { id:  1, emoji: "❤️", x: 12.8, size: 18, dur: 8.4, delay: 1.3  },
  { id:  2, emoji: "🎂", x: 21.4, size: 26, dur: 6.8, delay: 0.7  },
  { id:  3, emoji: "💖", x: 30.1, size: 20, dur: 9.2, delay: 2.1  },
  { id:  4, emoji: "🎉", x: 38.7, size: 24, dur: 7.5, delay: 0.4  },
  { id:  5, emoji: "💗", x: 47.3, size: 16, dur: 8.0, delay: 1.8  },
  { id:  6, emoji: "🎈", x: 55.9, size: 28, dur: 6.5, delay: 0.9  },
  { id:  7, emoji: "💓", x: 64.5, size: 19, dur: 9.8, delay: 2.5  },
  { id:  8, emoji: "🥳", x: 73.1, size: 22, dur: 7.3, delay: 0.2  },
  { id:  9, emoji: "💝", x: 81.7, size: 25, dur: 8.6, delay: 1.5  },
  { id: 10, emoji: "🌸", x: 90.3, size: 17, dur: 7.9, delay: 0.6  },
  { id: 11, emoji: "✨", x:  8.6, size: 21, dur: 6.2, delay: 3.1  },
  { id: 12, emoji: "💘", x: 17.2, size: 23, dur: 8.3, delay: 1.9  },
  { id: 13, emoji: "🎀", x: 25.8, size: 27, dur: 7.7, delay: 0.3  },
  { id: 14, emoji: "💞", x: 34.4, size: 15, dur: 9.1, delay: 2.7  },
  { id: 15, emoji: "🎁", x: 43.0, size: 20, dur: 6.9, delay: 0.8  },
  { id: 16, emoji: "💕", x: 51.6, size: 24, dur: 8.5, delay: 1.4  },
  { id: 17, emoji: "❤️", x: 60.2, size: 18, dur: 7.2, delay: 3.5  },
  { id: 18, emoji: "🎂", x: 68.8, size: 22, dur: 8.8, delay: 0.1  },
  { id: 19, emoji: "💖", x: 77.4, size: 26, dur: 6.6, delay: 2.2  },
  { id: 20, emoji: "🎉", x: 86.0, size: 19, dur: 9.4, delay: 1.1  },
  { id: 21, emoji: "💗", x: 94.6, size: 21, dur: 7.6, delay: 0.5  },
  { id: 22, emoji: "🌸", x:  2.8, size: 28, dur: 8.1, delay: 2.9  },
  { id: 23, emoji: "🥳", x: 96.2, size: 16, dur: 7.4, delay: 1.7  },
];

export default function FloatingEmojis({ count = 24 }: { count?: number }) {
  const items = EMOJI_DATA.slice(0, Math.min(count, EMOJI_DATA.length));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute select-none"
          style={{
            left: `${item.x}%`,
            bottom: "-5%",
            fontSize: item.size,
            opacity: 0,
          }}
          animate={{
            y: [0, -1000],
            opacity: [0, 0.85, 0.85, 0],
            x: [0, item.id % 2 === 0 ? 30 : -30, 0],
          }}
          transition={{
            duration: item.dur,
            delay: item.delay,
            repeat: Infinity,
            repeatDelay: item.delay * 0.8,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
