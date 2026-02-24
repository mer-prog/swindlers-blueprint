"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "your-email@example.com";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [headerText, setHeaderText] = useState("");
  const fullHeader = "SECURE CHANNEL ESTABLISHED";

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      setHeaderText("");
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setHeaderText(fullHeader.slice(0, idx));
      if (idx >= fullHeader.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[10003] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Blue flash */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "var(--blue)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="relative max-w-lg w-full mx-4 border p-8"
            style={{
              background: "var(--bg-primary)",
              borderColor: "var(--green)",
              fontFamily: "var(--font-jetbrains), monospace",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--green)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--muted)")
              }
            >
              [X]
            </button>

            {/* Header */}
            <div className="mb-8">
              <span
                className="text-sm typewriter-cursor"
                style={{ color: "var(--green)" }}
              >
                {headerText}
              </span>
              <p
                className="mt-2"
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  fontFamily: "var(--font-noto), sans-serif",
                }}
              >
                安全な通信回線が確立されました
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-4 text-sm">
              <div>
                <span style={{ color: "var(--muted)" }}>EMAIL: </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors"
                  style={{ color: "var(--green)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textShadow =
                      "0 0 10px rgba(0,255,65,0.5)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textShadow = "none")
                  }
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Footer message */}
            <p
              className="mt-8 text-sm"
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-noto), sans-serif",
              }}
            >
              お仕事のご相談、お待ちしています。
            </p>
            <p
              className="mt-1 text-sm"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              Ready to build something extraordinary.
            </p>

            {/* Close channel button */}
            <button
              onClick={onClose}
              className="mt-6 text-xs tracking-wider px-4 py-2 border transition-all"
              style={{
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
              CLOSE CHANNEL [X]
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
