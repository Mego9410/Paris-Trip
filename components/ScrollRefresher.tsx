"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRefresher() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const debouncedRefresh = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    const observer = new ResizeObserver(debouncedRefresh);
    observer.observe(document.body);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return null;
}
