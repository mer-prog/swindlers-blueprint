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
              className="text-sm mb-2"
              style={{
                color: "var(--green)",
                fontFamily: "var(--font-jetbrains), monospace",
              }}
            >
              $ scanning capabilities... // 能力スキャン中...
            </p>
            <div className="mb-8">
              <p
                className="text-sm"
                style={{
                  color: "rgba(0,255,65,0.5)",
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "0.8rem",
                }}
              >
                &gt; OPERATIVE SKILL ASSESSMENT
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-noto), sans-serif",
                  fontSize: "0.8rem",
                }}
              >
                &gt; 工作員スキル評価レポート
              </p>
            </div>

            {Object.entries(skills).map(([category, categorySkills]) => (
              <div key={category} className="mb-8 last:mb-0">
                <div
                  className="text-xs mb-1 tracking-wider"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-jetbrains), monospace",
                  }}
                >
                  ┌─ {category} ─────────────────────┐
                </div>
                <div className="mb-4">
                  <p
                    style={{
                      fontFamily: "var(--font-noto), sans-serif",
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                    }}
                  >
                    {category === "FRONTEND" && "ユーザーが触れるすべてを設計・構築する"}
                    {category === "BACKEND" && "データとロジックの基盤を構築する"}
                    {category === "TOOLS" && "開発を加速させる武器"}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "0.75rem",
                      color: "rgba(102,102,102,0.6)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {category === "FRONTEND" && "Design & build everything the user touches"}
                    {category === "BACKEND" && "Build the foundation of data & logic"}
                    {category === "TOOLS" && "Weapons that accelerate development"}
                  </p>
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
