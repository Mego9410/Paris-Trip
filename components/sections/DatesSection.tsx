"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DatesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const numbersRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const monthRef = useRef<HTMLParagraphElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        numbersRef.current,
        { yPercent: 0 },
        {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.from([monthRef.current, taglineRef.current], {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 25%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dates-section"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >

      <p
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
        Act I
      </p>

      <div className="relative h-full w-full flex items-center justify-center">
        <div
          ref={numbersRef}
          className="relative flex flex-col items-center"
          style={{ willChange: "transform" }}
        >
          <span
            className="font-display italic leading-none text-champagne text-readable-strong"
            style={{
              fontSize: "clamp(8rem, 20vw, 18rem)",
              opacity: 0.95,
              lineHeight: 0.95,
              display: "inline-block",
              transform: "translateY(-4.2rem)",
            }}
          >
            14
          </span>
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) translateY(1.1rem)",
              width: "clamp(90px, 14vw, 160px)",
              height: "2px",
              background: "var(--color-gold)",
              opacity: 0.75,
              borderRadius: "999px",
              boxShadow: "0 0 6px rgba(0,0,0,0.35)",
              zIndex: 15,
            }}
          />
          <span
            className="font-display italic leading-none text-champagne text-readable-strong"
            style={{
              fontSize: "clamp(8rem, 20vw, 18rem)",
              opacity: 0.95,
              lineHeight: 0.95,
            }}
          >
            15
          </span>

          <p
            ref={monthRef}
            className="absolute font-sans-light uppercase text-readable-strong"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) translateY(-0.7rem)",
              fontSize: "clamp(0.85rem, 2.2vw, 1.15rem)",
              letterSpacing: "0.6em",
              color: "var(--color-gold)",
              fontWeight: 300,
              opacity: 1,
            }}
          >
            October
          </p>
        </div>
      </div>

      <p
        ref={taglineRef}
        className="absolute font-display italic text-champagne text-center text-readable-strong"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "14vh",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          letterSpacing: "0.05em",
          zIndex: 15,
        }}
      >
        Mark the dates.
      </p>
    </section>
  );
}
