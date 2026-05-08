"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinaleSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLParagraphElement | null>(null);
  const sigRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ruleRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      gsap.from(sigRef.current?.querySelectorAll("span") ?? [], {
        opacity: 0,
        y: 20,
        stagger: 0.25,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 50%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="finale-section"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >

      <div
        className="absolute flex flex-col"
        style={{
          left: "8vw",
          bottom: "8vw",
          maxWidth: "60ch",
          zIndex: 15,
        }}
      >
        <div
          ref={ruleRef}
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-gold)",
            opacity: 1,
            marginBottom: "2rem",
            boxShadow: "0 0 6px rgba(0,0,0,0.85)",
          }}
        />

        <p
          ref={headingRef}
          className="font-display italic text-champagne"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
            margin: 0,
            textShadow:
              "0 0 1px rgba(0,0,0,0.98), 0 0 6px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.92), 0 4px 18px rgba(0,0,0,0.9), 0 6px 36px rgba(0,0,0,0.85), 0 10px 70px rgba(0,0,0,0.7)",
          }}
        >
          See you there.
        </p>

        <div
          ref={sigRef}
          className="font-sans-light uppercase mt-10 flex flex-col gap-3 text-readable-strong"
          style={{
            letterSpacing: "0.45em",
            fontSize: "0.75rem",
            color: "var(--color-gold)",
            opacity: 1,
            fontWeight: 400,
          }}
        >
          <span>Frank Taylor &amp; Associates</span>
          <span>October 2026</span>
        </div>
      </div>
    </section>
  );
}
