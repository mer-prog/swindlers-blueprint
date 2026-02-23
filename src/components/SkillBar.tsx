"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Skill } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const fill = fillRef.current;
      const num = numRef.current;
      if (!fill || !num) return;

      gsap.from(fill, {
        width: 0,
        duration: 1.2,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(fill, { clearProps: "will-change" });
        },
      });

      gsap.from(num, {
        textContent: 0,
        duration: 1.2,
        delay: index * 0.1,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: barRef }
  );

  const totalBlocks = 30;
  const filledBlocks = Math.round((skill.level / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;

  return (
    <div
      ref={barRef}
      className="flex items-center gap-3 text-sm mb-2"
      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
    >
      <span
        className="w-32 shrink-0 text-right"
        style={{ color: "var(--text)" }}
      >
        {skill.name}
      </span>
      <div className="flex-1 relative h-5 overflow-hidden">
        <div
          ref={fillRef}
          className="h-full flex items-center"
          style={{ width: `${skill.level}%` }}
        >
          <span style={{ color: "var(--green)", letterSpacing: "1px" }}>
            {"█".repeat(filledBlocks)}
          </span>
        </div>
        <span
          className="absolute top-0 h-full flex items-center"
          style={{
            left: `${skill.level}%`,
            color: "var(--muted)",
            letterSpacing: "1px",
          }}
        >
          {"░".repeat(emptyBlocks)}
        </span>
      </div>
      <span
        ref={numRef}
        className="w-10 text-right shrink-0"
        style={{ color: "var(--green)" }}
      >
        {skill.level}
      </span>
      <span style={{ color: "var(--muted)" }}>%</span>
    </div>
  );
}
