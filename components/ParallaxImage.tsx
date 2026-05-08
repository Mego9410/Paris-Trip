"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ParallaxImageProps = {
  src: string;
  alt: string;
  parallaxSpeed?: number;
  overlay?: string;
  priority?: boolean;
  triggerEl?: HTMLElement | null;
  objectPosition?: string;
};

export default function ParallaxImage({
  src,
  alt,
  parallaxSpeed = 0.4,
  overlay,
  priority = false,
  triggerEl,
  objectPosition = "center",
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!imageWrapRef.current) return;
    const trigger = triggerEl ?? wrapperRef.current?.parentElement ?? wrapperRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageWrapRef.current,
        { yPercent: 0 },
        {
          yPercent: -parallaxSpeed * 25,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, [parallaxSpeed, triggerEl]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={imageWrapRef}
        className="absolute -inset-y-[15%] inset-x-0"
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition }}
        />
      </div>
      {overlay ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlay }}
        />
      ) : null}
    </div>
  );
}
