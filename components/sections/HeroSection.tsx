"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLParagraphElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1.8 } });
      tl.from(lineRef.current, { opacity: 0, y: 20 })
        .from(ruleRef.current, { opacity: 0, scaleX: 0, transformOrigin: "center" }, "-=1.2")
        .from(labelRef.current, { opacity: 0, y: 20 }, "-=1.0");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "var(--color-void)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, rgba(8,8,8,0) 60%)",
        }}
      />

      <div className="relative h-full w-full flex flex-col items-center justify-center px-6 text-center">
        <p
          ref={lineRef}
          className="font-display italic text-champagne tracking-extreme"
          style={{
            fontSize: "clamp(1rem, 3vw, 1.6rem)",
            letterSpacing: "0.35em",
          }}
        >
          We&rsquo;ve got a surprise for you.
        </p>

        <div
          ref={ruleRef}
          className="my-10"
          style={{
            width: "120px",
            height: "1px",
            background: "rgba(201,168,76,0.25)",
          }}
        />

        <p
          ref={labelRef}
          className="font-sans-light uppercase text-gold/70"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.55em",
            fontWeight: 300,
          }}
        >
          October 2025
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pulse-line"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "2px",
          height: "60px",
          background: "var(--color-gold)",
          opacity: 0.3,
        }}
      />
    </section>
  );
}
