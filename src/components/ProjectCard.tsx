"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative border transition-all duration-300"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "#222",
        borderRadius: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "var(--green)";
        el.style.boxShadow = "0 0 30px rgba(0,255,65,0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "#222";
        el.style.boxShadow = "none";
      }}
    >
      {/* Scan effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 overflow-hidden z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-0 w-full h-[60px]"
          style={{
            background:
              "linear-gradient(transparent, rgba(0,255,65,0.03), transparent)",
            animation: "card-scan 2s linear infinite",
            top: "-100%",
          }}
        />
      </div>

      <div className="p-6" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span
            className="text-xs tracking-wider"
            style={{ color: "var(--muted)" }}
          >
            CASE FILE #{project.id}
          </span>
          <span
            className="text-xs font-bold tracking-wider px-2 py-1 border"
            style={{
              color: "var(--classified-red)",
              borderColor: "var(--classified-red)",
            }}
          >
            CLASSIFIED
          </span>
        </div>

        <div
          className="w-full h-px mb-4"
          style={{ background: "#333" }}
        />

        {/* Image / Placeholder */}
        <div
          className="relative w-full mb-4 overflow-hidden"
          style={{ aspectRatio: "16/9" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: "#1a1a1a",
                backgroundImage: `
                  linear-gradient(var(--green) 1px, transparent 1px),
                  linear-gradient(90deg, var(--green) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                backgroundPosition: "center",
              }}
            >
              <span
                className="text-sm tracking-widest px-3 py-1 border"
                style={{
                  color: "var(--muted)",
                  borderColor: "var(--muted)",
                  background: "rgba(26,26,26,0.9)",
                }}
              >
                [CLASSIFIED]
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div>
            <span style={{ color: "var(--muted)" }}>PROJECT: </span>
            <span style={{ color: "var(--text)" }}>{project.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--muted)" }}>STATUS: </span>
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background:
                  project.status === "DEPLOYED"
                    ? "var(--green)"
                    : "var(--red)",
              }}
            />
            <span
              style={{
                color:
                  project.status === "DEPLOYED"
                    ? "var(--green)"
                    : "var(--red)",
              }}
            >
              {project.status}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span style={{ color: "var(--muted)" }}>STACK: </span>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 border"
                style={{
                  color: "var(--green)",
                  borderColor: "rgba(0,255,65,0.3)",
                  background: "rgba(0,255,65,0.05)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div>
            <span style={{ color: "var(--muted)" }}>DESC: </span>
            <span
              style={{
                color: "var(--text)",
                fontFamily: "var(--font-noto), sans-serif",
              }}
            >
              {project.description}
            </span>
          </div>
        </div>

        {/* Link */}
        <a
          href={project.demoUrl}
          className="inline-block mt-4 text-sm tracking-wider transition-colors"
          style={{ color: "var(--green)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textShadow =
              "0 0 10px rgba(0,255,65,0.5)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.textShadow = "none")
          }
        >
          [VIEW DOSSIER →]
        </a>
      </div>
    </div>
  );
}
