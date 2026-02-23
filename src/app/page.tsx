"use client";

import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Dossier from "@/components/Dossier";
import TechArsenal from "@/components/TechArsenal";
import TheChoice from "@/components/TheChoice";
import CustomCursor from "@/components/CustomCursor";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [booted, setBooted] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Prevent scroll during boot
  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <main>
        <Hero />
        <Manifesto />
        <Dossier />
        <TechArsenal />
        <TheChoice />
      </main>

      <CustomCursor />
    </>
  );
}
