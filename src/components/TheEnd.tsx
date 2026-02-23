"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixRain from "./MatrixRain";

const TERMINATED_TEXT = "CONNECTION TERMINATED";
// Deterministic pseudo-random rotations for each character
const CHAR_ROTATIONS = TERMINATED_TEXT.split("").map(
  (_, i) => ((i * 7 + 13) % 90) - 45
);

interface TheEndProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TheEnd({ isOpen, onClose }: TheEndProps) {
  const [phase, setPhase] = useState(0);
  // 0 = flash + glitch, 1 = CONNECTION TERMINATED, 2 = text collapse, 3 = THE END, 4 = show button

  const handleRetry = useCallback(() => {
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t0 = setTimeout(() => setPhase(0), 0);
      return () => clearTimeout(t0);
    }

    // Phase 0: flash + glitch (0-1s)
    const t1 = setTimeout(() => setPhase(1), 800);
    // Phase 2: collapse text after 2s
    const t2 = setTimeout(() => setPhase(2), 3000);
    // Phase 3: THE END
    const t3 = setTimeout(() => setPhase(3), 4000);
    // Phase 4: show button
    const t4 = setTimeout(() => setPhase(4), 6000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10003] flex items-center justify-center overflow-hidden"
          style={{ background: "black" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Red flash */}
          {phase === 0 && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{ background: "var(--red)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Glitch overlay */}
          {phase === 0 && (
            <div className="absolute inset-0 z-10 heavy-glitch">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,64,0.1) 2px, rgba(255,0,64,0.1) 4px)",
                }}
              />
            </div>
          )}

          {/* Matrix rain background */}
          <div className="absolute inset-0 z-0">
            <MatrixRain opacity={0.5} density={1.5} />
          </div>

          {/* Content */}
          <div className="relative z-30 text-center px-4">
            {/* CONNECTION TERMINATED */}
            <AnimatePresence>
              {(phase === 1 || phase === 2) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1 },
                  }}
                >
                  <motion.h2
                    className="text-2xl md:text-5xl tracking-wider uppercase"
                    style={{
                      fontFamily: "var(--font-orbitron), monospace",
                      color: "var(--red)",
                    }}
                  >
                    {TERMINATED_TEXT.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        style={{ display: "inline-block" }}
                        animate={
                          phase === 2
                            ? {
                                y: [0, -20, 100],
                                opacity: [1, 1, 0],
                                rotate: [0, 0, CHAR_ROTATIONS[i]],
                              }
                            : {}
                        }
                        transition={
                          phase === 2
                            ? { duration: 0.8, delay: i * 0.05 }
                            : {}
                        }
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.h2>
                  <p
                    className="mt-3"
                    style={{
                      fontSize: "1rem",
                      color: "rgba(255,0,64,0.6)",
                      fontFamily: "var(--font-noto), sans-serif",
                    }}
                  >
                    接続が切断されました
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE END. */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <h2
                    className="text-3xl md:text-6xl tracking-wider"
                    style={{
                      fontFamily: "var(--font-orbitron), monospace",
                      color: "white",
                    }}
                  >
                    THE END.
                  </h2>
                  <p
                    className="mt-4"
                    style={{
                      fontFamily: "var(--font-noto), sans-serif",
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  >
                    終幕
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Retry button */}
            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-12"
                >
                  <button
                    onClick={handleRetry}
                    className="text-sm tracking-wider px-6 py-3 border transition-all"
                    style={{
                      fontFamily: "var(--font-noto), sans-serif",
                      color: "var(--green)",
                      borderColor: "var(--green)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--green)";
                      e.currentTarget.style.color = "black";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--green)";
                    }}
                  >
                    もう一度？ // Try Again?
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
