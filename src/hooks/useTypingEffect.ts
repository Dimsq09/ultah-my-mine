"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTypingEffectOptions {
  messages: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  pauseAfterDeleting?: number;
  loop?: boolean;
  onComplete?: () => void;
}

export function useTypingEffect({
  messages,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseAfterTyping = 1500,
  pauseAfterDeleting = 300,
  loop = false,
  onComplete,
}: UseTypingEffectOptions) {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) return;

    if (currentMessageIndex >= messages.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const targetMessage = messages[currentMessageIndex];

    if (isTyping) {
      if (currentText.length < targetMessage.length) {
        const timeout = setTimeout(() => {
          setCurrentText(targetMessage.slice(0, currentText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing current message — add to displayed list and move to next
        const timeout = setTimeout(() => {
          setDisplayedMessages((prev) => [...prev, targetMessage]);
          setCurrentText("");
          setCurrentMessageIndex((prev) => prev + 1);
        }, pauseAfterTyping);
        return () => clearTimeout(timeout);
      }
    }
  }, [
    currentText,
    currentMessageIndex,
    isTyping,
    isComplete,
    messages,
    typingSpeed,
    pauseAfterTyping,
  ]);

  return {
    displayedMessages,
    currentText,
    cursorVisible,
    isComplete,
    currentMessageIndex,
  };
}
