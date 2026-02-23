"use client";

import { useState, useEffect, useCallback } from "react";

const BOOT_LINES = [
  "> ESTABLISHING SECURE CONNECTION... [OK]",
  "> VERIFYING CLEARANCE LEVEL... [OK]",
  "> DECRYPTING DOSSIER... [OK]",
  "> IDENTITY: [REDACTED]",
  "> ACCESS LEVEL: ██████████ GRANTED",
];

const TOTAL_DURATION = 3000;
const LINE_DELAY = TOTAL_DURATION / BOOT_LINES.length;

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const skip = useCallback(() => {
    setIsComplete(true);
    setIsFlashing(true);
    setTimeout(() => onComplete(), 300);
  }, [onComplete]);

  useEffect(() => {
    if (isComplete) return;

    if (currentLineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setIsFlashing(true);
        setTimeout(() => onComplete(), 500);
      }, 0);
      return () => clearTimeout(t);
    }

    const fullLine = BOOT_LINES[currentLineIndex];
    let charIndex = 0;
    const charsPerTick = Math.ceil(fullLine.length / (LINE_DELAY / 30));

    const interval = setInterval(() => {
      charIndex += charsPerTick;
      if (charIndex >= fullLine.length) {
        setCurrentLineText("");
        setLines((prev) => [...prev, fullLine]);
        setCurrentLineIndex((prev) => prev + 1);
        clearInterval(interval);
      } else {
        setCurrentLineText(fullLine.slice(0, charIndex));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentLineIndex, isComplete, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center boot-scanline"
      style={{ background: "#0a0a0a" }}
    >
      {/* Static scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)",
          zIndex: 1,
        }}
      />

      {isFlashing && (
        <div
          className="absolute inset-0 bg-white z-10"
          style={{ animation: "flash-white 0.5s ease-out forwards" }}
        />
      )}

      <div
        className="relative z-[2] max-w-2xl w-full px-8"
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="text-sm md:text-base mb-2"
            style={{ color: "#00ff41" }}
          >
            {line}
          </div>
        ))}
        {currentLineText && (
          <div
            className="text-sm md:text-base mb-2 typewriter-cursor"
            style={{ color: "#00ff41" }}
          >
            {currentLineText}
          </div>
        )}
      </div>

      <button
        onClick={skip}
        className="absolute bottom-8 right-8 text-sm px-4 py-2 border transition-colors z-[2]"
        style={{
          color: "var(--muted)",
          borderColor: "var(--muted)",
          fontFamily: "var(--font-jetbrains), monospace",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#00ff41";
          e.currentTarget.style.borderColor = "#00ff41";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.borderColor = "var(--muted)";
        }}
      >
        SKIP &gt;&gt;
      </button>
    </div>
  );
}
