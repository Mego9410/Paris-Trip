"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE = "Paris.";

export default function ParisSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const dateRef = useRef<HTMLParagraphElement | null>(null);
  const lineARef = useRef<HTMLParagraphElement | null>(null);
  const lineBRef = useRef<HTMLParagraphElement | null>(null);

  const chars = useMemo(() => HEADLINE.split(""), []);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      const charSpans = headlineRef.current?.querySelectorAll<HTMLSpanElement>(
        "span[data-char]",
      );

      gsap.from(charSpans ?? [], {
        opacity: 0,
        y: 50,
        rotateX: -45,
        stagger: 0.07,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      gsap.from(
        [dateRef.current, lineARef.current, lineBRef.current],
        {
          opacity: 0,
          y: 30,
          stagger: 0.3,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 25%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="paris-section"
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: "200vh" }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <FleurDeLisWatermark />

        <div
          className="relative h-full w-full flex flex-col items-center justify-center text-center px-6"
          style={{ zIndex: 15 }}
        >
          <h2
            ref={headlineRef}
            className="font-display italic text-champagne"
            style={{
              fontSize: "clamp(6rem, 18vw, 16rem)",
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              margin: 0,
              perspective: "1000px",
              textShadow:
                "0 0 1px rgba(0,0,0,0.98), 0 0 6px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.92), 0 4px 18px rgba(0,0,0,0.9), 0 6px 36px rgba(0,0,0,0.85), 0 10px 70px rgba(0,0,0,0.7)",
            }}
          >
            {chars.map((c, i) => (
              <span
                key={i}
                data-char
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {c}
              </span>
            ))}
          </h2>

          <p
            ref={dateRef}
            className="font-sans-light uppercase mt-6 text-readable-strong"
            style={{
              letterSpacing: "0.5em",
              fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
              color: "var(--color-gold)",
              fontWeight: 400,
            }}
          >
            14 October &mdash; 15 October
          </p>

          <p
            ref={lineARef}
            className="font-sans-light uppercase mt-5 text-readable-strong"
            style={{
              letterSpacing: "0.35em",
              fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)",
              color: "var(--color-champagne)",
              fontWeight: 400,
            }}
          >
            You&rsquo;re going to Paris.
          </p>

          <p
            ref={lineBRef}
            className="font-sans-light uppercase mt-4 text-readable-strong"
            style={{
              letterSpacing: "0.35em",
              fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
              color: "var(--color-gold)",
              fontWeight: 400,
            }}
          >
            We&rsquo;ll handle everything else.
          </p>
        </div>
      </div>
    </section>
  );
}

function FleurDeLisWatermark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(70vw, 70vh)",
        height: "min(70vw, 70vh)",
        opacity: 0.03,
        color: "white",
        pointerEvents: "none",
      }}
      fill="currentColor"
    >
      <path d="M100 10 C 92 50, 60 70, 60 110 C 60 140, 80 155, 100 155 C 120 155, 140 140, 140 110 C 140 70, 108 50, 100 10 Z" />
      <path d="M100 70 C 70 110, 30 130, 30 170 C 30 210, 60 230, 100 230 C 140 230, 170 210, 170 170 C 170 130, 130 110, 100 70 Z" opacity="0.7" />
      <rect x="40" y="170" width="120" height="6" />
      <path d="M100 180 L 100 280" stroke="currentColor" strokeWidth="6" />
      <path d="M70 250 C 70 270, 130 270, 130 250" stroke="currentColor" strokeWidth="4" fill="none" />
    </svg>
  );
}
