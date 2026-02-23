"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(ring, {
        width: 50,
        height: 50,
        x: "-=10",
        y: "-=10",
        opacity: 0.5,
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        width: 30,
        height: 30,
        x: "+=10",
        y: "+=10",
        opacity: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999]"
        style={{ backgroundColor: "var(--green)" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] rounded-full pointer-events-none z-[99998]"
        style={{ border: "1px solid var(--green)" }}
      />
    </>
  );
}
