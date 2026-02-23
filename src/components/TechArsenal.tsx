"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skills } from "@/data/skills";
import SkillBar from "./SkillBar";

gsap.registerPlugin(ScrollTrigger);

export default function TechArsenal() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const terminal = terminalRef.current;
      if (!terminal) return;

      gsap.from(terminal, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: terminal,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(terminal, { clearProps: "all" });
        },
      });
    },
    { scope: sectionRef }
  );

  let skillIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Terminal window */}
        <div
          ref={terminalRef}
          className="border overflow-hidden"
          style={{
            background: "var(--bg-primary)",
            borderColor: "#333",
            borderRadius: "8px",
          }}
        >
          {/* Window bar */}
          <div
            className="flex items-center gap-2 px-4 py-3 border-b"
            style={{ borderColor: "#333", background: "#1a1a1a" }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span
              className="flex-1 text-center text-xs"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              capabilities.sh
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-8">
            <p
              className="text-sm mb-8"
              style={{
                color: "var(--green)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              $ scanning capabilities... // 能力スキャン中...
            </p>

            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category} className="mb-8 last:mb-0">
                <div
                  className="text-xs mb-4 tracking-wider"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  ┌─ {category} ─────────────────────┐
                </div>
                {categorySkills.map((skill) => {
                  const idx = skillIndex++;
                  return <SkillBar key={skill.name} skill={skill} index={idx} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
