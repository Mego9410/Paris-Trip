"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlaneElement from "@/components/PlaneElement";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FlightSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const partARef = useRef<HTMLDivElement | null>(null);
  const partBRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      gsap.to(partARef.current, {
        opacity: 0,
        y: -30,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "32% top",
          end: "48% top",
          scrub: true,
        },
      });

      gsap.fromTo(
        partBRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "32% top",
            end: "48% top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flight-section"
      ref={sectionRef}
      className="relative w-full"
      style={{ minHeight: "280vh" }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <p
          className="absolute font-sans-light uppercase text-readable"
          style={{
            top: "5vh",
            left: "8vw",
            fontSize: "10px",
            letterSpacing: "0.55em",
            opacity: 0.85,
            color: "var(--color-gold)",
            zIndex: 15,
          }}
        >
          Act III
        </p>

        <div
          className="relative h-full w-full flex items-center justify-center text-center px-6"
          style={{ zIndex: 15 }}
        >
          <div className="relative w-full max-w-5xl">
            <div
              ref={partARef}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ willChange: "opacity, transform", zIndex: 1 }}
            >
              <h2
                className="font-display italic text-readable-strong"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 8rem)",
                  color: "white",
                  lineHeight: 0.95,
                  letterSpacing: "0.01em",
                  margin: 0,
                }}
              >
                British Airways.
              </h2>
              <p
                className="font-sans-light uppercase mt-10 text-readable-strong"
                style={{
                  letterSpacing: "0.5em",
                  fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
                  color: "var(--color-gold)",
                  fontWeight: 400,
                }}
              >
                Club Europe &middot; Business Class
              </p>
            </div>

            <div
              ref={partBRef}
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ opacity: 0, willChange: "opacity, transform", zIndex: 2 }}
            >
              <h2
                className="font-display italic text-champagne text-readable-strong"
                style={{
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  lineHeight: 0.95,
                  letterSpacing: "0.02em",
                  margin: 0,
                }}
              >
                Your seat is waiting.
              </h2>

              <div
                className="font-sans-light uppercase mt-10 flex flex-col gap-3 items-center text-readable-strong"
                style={{
                  letterSpacing: "0.5em",
                  fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
                  color: "var(--color-gold)",
                  fontWeight: 400,
                  lineHeight: 1.8,
                }}
              >
                <span>Wide seat. Fine dining.</span>
                <span>London to the sky.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PlaneElement triggerRef={sectionRef} />
    </section>
  );
}
