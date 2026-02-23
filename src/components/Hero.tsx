"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  booted?: boolean;
}

export default function Hero({ booted }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Background parallax + blur
      gsap.fromTo(
        bgRef.current,
        { scale: 1.15, filter: "blur(0px)" },
        {
          scale: 1.0,
          filter: "blur(8px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // Title chars scatter
      const titleEl = titleRef.current;
      if (titleEl) {
        const chars = Array.from(titleEl.querySelectorAll<HTMLSpanElement>("span[data-char]"));
        chars.forEach((span) => {
          span.style.display = "inline-block";
          span.style.willChange = "transform, opacity";
        });

        gsap.to(chars, {
          opacity: 0,
          y: () => gsap.utils.random(-200, 200),
          x: () => gsap.utils.random(-200, 200),
          rotation: () => gsap.utils.random(-90, 90),
          stagger: 0.05,
          ease: "power2.in",
          scrollTrigger: {
            trigger: section,
            start: "10% top",
            end: "60% top",
            scrub: 1,
          },
          onComplete: () => {
            chars.forEach((c) =>
              gsap.set(c, { clearProps: "all" })
            );
          },
        });
      }

      // Subtitle fade
      gsap.to(subRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "40% top",
          scrub: 1,
        },
      });

      // Note delayed fade in
      gsap.fromTo(
        noteRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 1, delay: 2, ease: "power2.out" }
      );

      // Note fade on scroll
      gsap.to(noteRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "30% top",
          scrub: 1,
        },
      });

    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0 scale-[1.15]">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Bottom gradient fade to #0a0a0a */}
        <div
          className="absolute inset-0 z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(10,10,10,0.8) 70%, #0a0a0a 100%)",
          }}
        />
        {/* License plate blur */}
        <div
          className="absolute z-10"
          style={{
            position: "absolute",
            bottom: "2%",
            left: "1%",
            width: "20%",
            height: "7%",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            background: "rgba(0,0,0,0.3)",
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          ref={titleRef}
          className="glitch-text-container font-bold text-white"
          style={{
            fontFamily: "var(--font-orbitron), var(--font-noto), sans-serif",
            fontSize: "clamp(2rem, 8vw, 10rem)",
            textShadow: "0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.3)",
            lineHeight: 1.1,
            position: "relative",
            whiteSpace: "nowrap",
          }}
        >
          {/* Red glitch layer */}
          <span aria-hidden className="glitch-layer glitch-red">
            <span style={{ fontSize: "1em" }}>詐</span>
            <span style={{ fontSize: "1em" }}>欺</span>
            <span style={{ fontSize: "1em" }}>師</span>
            <span style={{ fontSize: "0.7em" }}>が</span>
            <span style={{ fontSize: "0.7em" }}>よ</span>
            <span style={{ fontSize: "0.7em" }}>く</span>
            <span style={{ fontSize: "1em" }}>載</span>
            <span style={{ fontSize: "0.7em" }}>せ</span>
            <span style={{ fontSize: "0.7em" }}>る</span>
            <span style={{ fontSize: "1em" }}>写</span>
            <span style={{ fontSize: "1em" }}>真</span>
          </span>
          {/* Blue glitch layer */}
          <span aria-hidden className="glitch-layer glitch-blue">
            <span style={{ fontSize: "1em" }}>詐</span>
            <span style={{ fontSize: "1em" }}>欺</span>
            <span style={{ fontSize: "1em" }}>師</span>
            <span style={{ fontSize: "0.7em" }}>が</span>
            <span style={{ fontSize: "0.7em" }}>よ</span>
            <span style={{ fontSize: "0.7em" }}>く</span>
            <span style={{ fontSize: "1em" }}>載</span>
            <span style={{ fontSize: "0.7em" }}>せ</span>
            <span style={{ fontSize: "0.7em" }}>る</span>
            <span style={{ fontSize: "1em" }}>写</span>
            <span style={{ fontSize: "1em" }}>真</span>
          </span>
          {/* Main text layer */}
          <span data-char style={{ fontSize: "1em" }}>詐</span>
          <span data-char style={{ fontSize: "1em" }}>欺</span>
          <span data-char style={{ fontSize: "1em" }}>師</span>
          <span data-char style={{ fontSize: "0.7em" }}>が</span>
          <span data-char style={{ fontSize: "0.7em" }}>よ</span>
          <span data-char style={{ fontSize: "0.7em" }}>く</span>
          <span data-char style={{ fontSize: "1em" }}>載</span>
          <span data-char style={{ fontSize: "0.7em" }}>せ</span>
          <span data-char style={{ fontSize: "0.7em" }}>る</span>
          <span data-char style={{ fontSize: "1em" }}>写</span>
          <span data-char style={{ fontSize: "1em" }}>真</span>
        </h1>
        <p
          ref={subRef}
          className="mt-6"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "clamp(0.8rem, 2vw, 1.5rem)",
            color: "var(--green)",
            letterSpacing: "0.3em",
          }}
        >
          Photos Scammers Love to Post
        </p>
        <div
          ref={noteRef}
          className="mt-4"
          style={{
            textAlign: "center",
            opacity: 0,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-noto), sans-serif",
              fontSize: "clamp(0.7rem, 1.2vw, 0.95rem)",
              color: "rgba(255, 255, 255, 0.75)",
              letterSpacing: "0.1em",
            }}
          >
            ※ジョークだよ。
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.8em",
              color: "rgba(255, 255, 255, 0.5)",
              marginTop: "0.3rem",
            }}
          >
            * It&apos;s a joke.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 scroll-indicator">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--green)"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
