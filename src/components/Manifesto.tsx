"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import MatrixRain from "./MatrixRain";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["私のことは覚えなくていい。", "", "何ができるかだけ知ってくれ。"];

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
        if (line === "") {
          const br = document.createElement("div");
          br.style.height = "1.5em";
          container.appendChild(br);
          return;
        }

        const lineDiv = document.createElement("div");
        lineDiv.style.overflow = "hidden";

        line.split("").forEach((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          span.style.transform = "translateY(20px)";
          span.style.willChange = "opacity, transform";
          lineDiv.appendChild(span);
          allChars.push(span);
        });

        container.appendChild(lineDiv);

        if (lineIdx < LINES.length - 1 && LINES[lineIdx + 1] !== "") {
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
      style={{ background: "var(--bg-primary)" }}
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
