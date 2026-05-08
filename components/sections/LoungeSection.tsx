"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LoungeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(ruleRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });

      gsap.from(headingRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      gsap.from(bodyRef.current?.querySelectorAll("span") ?? [], {
        opacity: 0,
        y: 24,
        stagger: 0.18,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lounge-section"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >

      <p
        ref={labelRef}
        className="absolute font-sans-light uppercase text-readable"
        style={{
          top: "5vh",
          left: "8vw",
          fontSize: "10px",
          letterSpacing: "0.55em",
          opacity: 0.85,
          color: "var(--color-gold)",
        }}
      >
        Act II
      </p>

      <div
        className="absolute flex flex-col"
        style={{
          left: "8vw",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: "60ch",
        }}
      >
        <div
          ref={ruleRef}
          style={{
            width: "60px",
            height: "1px",
            background: "var(--color-gold)",
            opacity: 1,
            marginBottom: "2.5rem",
            boxShadow: "0 0 6px rgba(0,0,0,0.85)",
          }}
        />

        <h2
          ref={headingRef}
          className="font-display italic text-champagne text-readable-strong"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            margin: 0,
          }}
        >
          The Lounge
        </h2>

        <div
          ref={bodyRef}
          className="font-sans-light uppercase mt-10 flex flex-col gap-3 text-readable-strong"
          style={{
            fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
            letterSpacing: "0.45em",
            color: "var(--color-champagne)",
            opacity: 1,
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          <span>Champagne on arrival.</span>
          <span>The journey begins before you board.</span>
        </div>
      </div>
    </section>
  );
}
