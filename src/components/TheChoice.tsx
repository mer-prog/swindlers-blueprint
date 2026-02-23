"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ContactModal from "./ContactModal";
import TheEnd from "./TheEnd";

gsap.registerPlugin(ScrollTrigger);

export default function TheChoice() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showContact, setShowContact] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Build char spans for the question text
      const questionEl = section.querySelector(".choice-question");
      if (questionEl) {
        const text = questionEl.textContent || "";
        questionEl.innerHTML = "";
        const chars = text.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px)";
          questionEl.appendChild(span);
          return span;
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      // Fade in pills
      gsap.from(".pill-container", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-4"
        style={{ background: "black" }}
      >
        {/* Question text */}
        <p
          className="choice-question text-center mb-16 md:mb-24"
          style={{
            fontFamily: "var(--font-noto), sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "var(--text)",
          }}
        >
          あなたはどちらを選ぶ？
        </p>

        {/* Pills */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32">
          {/* Red pill */}
          <motion.div
            className="pill-container flex flex-col items-center gap-6 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowEnd(true)}
          >
            <div className="animate-float">
              <Image
                src="/images/pill-red.png"
                alt="Red Pill"
                width={250}
                height={250}
                className="max-w-[200px] md:max-w-[250px]"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(255,0,64,0.4))",
                }}
              />
            </div>
            <span
              className="text-lg tracking-widest"
              style={{
                fontFamily: "var(--font-orbitron), monospace",
                color: "var(--red)",
              }}
            >
              THE END
            </span>
          </motion.div>

          {/* Blue pill */}
          <motion.div
            className="pill-container flex flex-col items-center gap-6 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowContact(true)}
          >
            <div className="animate-float" style={{ animationDelay: "1.5s" }}>
              <Image
                src="/images/pill-blue.png"
                alt="Blue Pill"
                width={250}
                height={250}
                className="max-w-[200px] md:max-w-[250px]"
                style={{
                  filter:
                    "drop-shadow(0 0 20px rgba(0,168,255,0.4))",
                }}
              />
            </div>
            <span
              className="text-lg tracking-widest"
              style={{
                fontFamily: "var(--font-orbitron), monospace",
                color: "var(--blue)",
              }}
            >
              CONTACT
            </span>
          </motion.div>
        </div>
      </section>

      <ContactModal
        isOpen={showContact}
        onClose={() => setShowContact(false)}
      />
      <TheEnd isOpen={showEnd} onClose={() => setShowEnd(false)} />
    </>
  );
}
