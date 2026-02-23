"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MatrixRain from "./MatrixRain";

gsap.registerPlugin(ScrollTrigger);

interface ManifestoLine {
  ja: string;
  en: string;
}

const LINES: (ManifestoLine | null)[] = [
  { ja: "私のことは覚えなくていい。", en: "You don't need to remember me." },
  null, // spacer
  { ja: "何ができるかだけ知ってくれ。", en: "Just know what I can do." },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = textContainerRef.current;
      if (!section || !container) return;

      // Build character spans
      const allChars: HTMLSpanElement[] = [];
      container.innerHTML = "";

      LINES.forEach((line, lineIdx) => {
        if (line === null) {
          const br = document.createElement("div");
          br.style.height = "1.5em";
          container.appendChild(br);
          return;
        }

        // Japanese line
        const jaDiv = document.createElement("div");
        jaDiv.style.overflow = "hidden";

        line.ja.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.whiteSpace = "pre";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px)";
          span.style.willChange = "opacity, transform";
          jaDiv.appendChild(span);
          allChars.push(span);
        });

        container.appendChild(jaDiv);

        // English line
        const enDiv = document.createElement("div");
        enDiv.style.overflow = "hidden";
        enDiv.style.marginTop = "0.5rem";

        line.en.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.whiteSpace = "pre";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px)";
          span.style.willChange = "opacity, transform";
          span.style.fontFamily = "var(--font-jetbrains), monospace";
          span.style.fontSize = "clamp(0.8rem, 1.5vw, 1.2rem)";
          span.style.color = "var(--muted)";
          span.style.fontWeight = "400";
          enDiv.appendChild(span);
          allChars.push(span);
        });

        container.appendChild(enDiv);

        if (lineIdx < LINES.length - 1 && LINES[lineIdx + 1] !== null) {
          const spacer = document.createElement("div");
          spacer.style.height = "0.5em";
          container.appendChild(spacer);
        }
      });

      // Pin section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
      });

      // Animate chars with scrub
      gsap.to(allChars, {
        opacity: 1,
        y: 0,
        textShadow: "0 0 10px rgba(0,255,65,0.3)",
        stagger: 0.03,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          scrub: 1,
        },
      });

      // Glitch flash at end
      const glitchOverlay = document.createElement("div");
      glitchOverlay.style.cssText =
        "position:absolute;inset:0;pointer-events:none;opacity:0;z-index:10;";
      section.appendChild(glitchOverlay);

      ScrollTrigger.create({
        trigger: section,
        start: "+=280%",
        end: "+=290%",
        onEnter: () => {
          glitchOverlay.classList.add("heavy-glitch");
          glitchOverlay.style.opacity = "1";
          glitchOverlay.style.background =
            "linear-gradient(transparent, rgba(0,255,65,0.05), transparent)";
          setTimeout(() => {
            glitchOverlay.classList.remove("heavy-glitch");
            glitchOverlay.style.opacity = "0";
          }, 300);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)", paddingTop: 0 }}
    >
      <MatrixRain opacity={0.1} />

      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div
          ref={textContainerRef}
          className="text-center"
          style={{
            fontFamily: "var(--font-noto), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            color: "var(--text)",
          }}
        />
      </div>
    </section>
  );
}
