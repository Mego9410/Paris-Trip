"use client";

type CloudLayerProps = {
  speed?: string;
  opacity?: number;
  top?: string;
  blur?: number;
  scale?: number;
};

export default function CloudLayer({
  speed = "60s",
  opacity = 0.06,
  top = "20%",
  blur = 14,
  scale = 1,
}: CloudLayerProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 pointer-events-none overflow-hidden"
      style={{ top, height: `${180 * scale}px`, opacity }}
    >
      <div
        className="flex"
        style={{
          width: "200%",
          animation: `moveCloud ${speed} linear infinite`,
          willChange: "transform",
          // CSS blur on large moving layers causes visible horizontal banding during scroll.
          filter: "none",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
        }}
      >
        <CloudGroup />
        <CloudGroup />
      </div>
    </div>
  );
}

function CloudGroup() {
  return (
    <svg
      viewBox="0 0 1600 200"
      width="50%"
      height="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flex: "0 0 50%" }}
    >
      <g fill="rgba(255,255,255,0.28)">
        <ellipse cx="120" cy="110" rx="220" ry="36" />
        <ellipse cx="220" cy="92" rx="160" ry="28" />
        <ellipse cx="520" cy="120" rx="280" ry="40" />
        <ellipse cx="640" cy="100" rx="180" ry="30" />
        <ellipse cx="940" cy="116" rx="240" ry="36" />
        <ellipse cx="1080" cy="96" rx="170" ry="26" />
        <ellipse cx="1340" cy="124" rx="260" ry="38" />
        <ellipse cx="1480" cy="100" rx="160" ry="28" />
      </g>
    </svg>
  );
}
