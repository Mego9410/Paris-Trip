"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type PlaneElementProps = {
  triggerRef: RefObject<HTMLElement>;
};

export default function PlaneElement({ triggerRef }: PlaneElementProps) {
  const planeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!planeRef.current || !triggerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(planeRef.current, { autoAlpha: 0, x: "120vw" });

      gsap.to(planeRef.current, {
        x: "-20vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onEnter: () => gsap.to(planeRef.current, { autoAlpha: 1, duration: 0.6 }),
          onEnterBack: () => gsap.to(planeRef.current, { autoAlpha: 1, duration: 0.6 }),
          onLeave: () => gsap.to(planeRef.current, { autoAlpha: 0, duration: 0.4 }),
          onLeaveBack: () => gsap.to(planeRef.current, { autoAlpha: 0, duration: 0.4 }),
        },
      });
    });

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        position: "fixed",
        top: "42vh",
        left: 0,
        width: "140px",
        zIndex: 30,
        willChange: "transform, opacity",
        opacity: 0,
      }}
    >
      <svg
        viewBox="0 0 220 70"
        width="140"
        height="44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeLinejoin="round"
      >
        <g
          fill="rgba(255,255,255,0.24)"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="0.8"
        >
          <path d="M75 36 L48 64 L92 60 L130 44 L130 34 Z" />
          <path d="M168 28 L194 6 L204 6 L198 28 Z" />
          <path
            d="M5 35
               Q5 30, 13 28
               L30 27
               L165 26
               L200 28
               L212 32
               L215 35
               L212 38
               L200 42
               L165 44
               L30 43
               L13 42
               Q5 40, 5 35 Z"
          />
          <path
            d="M196 32 L214 28 L220 32 L214 36 L196 38 Z"
            fill="rgba(255,255,255,0.2)"
          />
        </g>
        <ellipse
          cx="22"
          cy="34"
          rx="4"
          ry="1.4"
          fill="rgba(255,255,255,0.55)"
        />
      </svg>
    </div>
  );
}
