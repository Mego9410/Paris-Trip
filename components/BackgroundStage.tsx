"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Layer = {
  id: string;
  src: string;
  sectionId: string;
  start: string;
  end: string;
  priority?: boolean;
  objectPosition?: string;
};

const LAYERS: Layer[] = [
  {
    id: "bg-dates",
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=85&auto=format&bri=-35",
    sectionId: "dates-section",
    start: "top 95%",
    end: "bottom 5%",
    priority: true,
  },
  {
    id: "bg-lounge",
    src: "https://images.unsplash.com/photo-1770541025973-dfc3c4c23fad?w=1920&q=85&auto=format&bri=-35",
    sectionId: "lounge-section",
    start: "top 95%",
    end: "bottom 5%",
  },
  {
    id: "bg-sky",
    src: "https://images.unsplash.com/photo-1584135401326-17d2b702b9fa?w=1920&q=85&auto=format&bri=-35",
    sectionId: "flight-section",
    start: "top 95%",
    // Hand off to cabin before the “business class” copy should read fully (see FlightSection).
    end: "38% top",
  },
  {
    id: "bg-cabin",
    src: "https://images.unsplash.com/photo-1700811476977-256055428221?w=1920&q=85&auto=format&bri=-35",
    sectionId: "flight-section",
    // Slightly earlier than sky end so the bar shot is up while copy swaps.
    start: "32% top",
    end: "bottom 5%",
  },
  {
    id: "bg-paris",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85&auto=format&bri=-35",
    sectionId: "paris-section",
    start: "top 95%",
    end: "bottom 5%",
  },
  {
    id: "bg-finale",
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=85&auto=format&bri=-35",
    sectionId: "finale-section",
    start: "top 95%",
    end: "bottom 5%",
  },
];

export default function BackgroundStage() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!stageRef.current) return;

    const setUp = () => {
      const ctx = gsap.context(() => {
        LAYERS.forEach((layer) => {
          const sectionEl = document.getElementById(layer.sectionId);
          const wrapEl = document.getElementById(`${layer.id}-wrap`);
          const imgEl = document.getElementById(layer.id);
          if (!sectionEl || !wrapEl || !imgEl) return;

          gsap.set(imgEl, { opacity: 0 });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionEl,
              start: layer.start,
              end: layer.end,
              scrub: true,
            },
          });

          tl.to(imgEl, { opacity: 1, duration: 0.22 }, 0)
            .to(imgEl, { opacity: 1, duration: 0.56 }, 0.22)
            .to(imgEl, { opacity: 0, duration: 0.22 }, 0.78);
        });
      }, stageRef);

      return ctx;
    };

    const ctx = setUp();
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="bg-stage"
      style={{ background: "var(--color-void)" }}
    >
      {LAYERS.map((layer) => (
        <div
          key={layer.id}
          id={`${layer.id}-wrap`}
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        >
          <div
            id={layer.id}
            className="absolute inset-0"
            style={{
              opacity: 0,
              willChange: "opacity",
            }}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              priority={layer.priority}
              loading={layer.priority ? "eager" : "lazy"}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: layer.objectPosition ?? "center",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
