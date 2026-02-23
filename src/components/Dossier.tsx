"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Dossier() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = cardsRef.current;
      if (!cards) return;

      const cardEls = cards.querySelectorAll(".project-card");
      gsap.from(cardEls, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          gsap.set(cardEls, { clearProps: "all" });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            className="inline-block text-lg md:text-2xl tracking-widest uppercase px-6 py-3"
            style={{
              fontFamily: "var(--font-orbitron), monospace",
              color: "var(--classified-red)",
              border: "3px solid var(--classified-red)",
              transform: "rotate(-2deg)",
            }}
          >
            CLASSIFIED DOSSIER — PROJECT FILES
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-noto), sans-serif",
              fontSize: "0.8rem",
              color: "var(--muted)",
            }}
          >
            機密文書 — プロジェクトファイル
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
