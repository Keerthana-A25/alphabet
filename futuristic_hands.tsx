import React from "react";

interface FuturisticHandsProps {
  highlightedFinger?: string | null;
}

// Updated finger layout with finger names for easier identification
const FINGER_LAYOUT = [
  // Left Hand: Pinky to Thumb
  {
    name: "pinky",
    segments: [

      { x: 60, y: 90, color: "#fca5a5" },
    ]
  },
  {
    name: "ring", 
    segments: [
      { x: 95, y: 90, color: "#fdba74" },
    ]
  },
  {
    name: "middle",
    segments: [
      { x: 140, y: 90, color: "#fde047" },
    ]
  },
  {
    name: "index",
    segments: [
      { x: 185, y: 100, color: "#a7f3d0" },
    ]
  },
  {
    name: "thumb",
    segments: [
      { x: 220, y: 180, color: "#a5b4fc" },
    ]
  },

  // Right Hand: Thumb to Pinky
  {
    name: "thumb",
    segments: [
      { x: 320, y: 180, color: "#a5b4fc" },
    ]
  },
  {
    name: "index",
    segments: [
      { x: 360, y: 100, color: "#a7f3d0" },
    ]
  },
  {
    name: "middle",
    segments: [
      { x: 410, y: 90, color: "#fde047" },
    ]
  },
  {
    name: "ring",
    segments: [
      { x: 450, y: 90, color: "#fdba74" },
    ]
  },
  {
    name: "pinky",
    segments: [
      { x: 485, y: 90, color: "#fca5a5" },
    ]
  },
];

const FuturisticHands: React.FC<FuturisticHandsProps> = ({ highlightedFinger }) => {
  return (
    <div>
    <svg
      width="540"
      height="220"
      viewBox="0 0 540 220"
      style={{ display: "block", margin: "5px auto", position: "relative" }}
    >
       {/* SVG image element */}
      <image
        href={require("./assets/keyboard-hands-short.png")}
        x="0"
        y="0"
        width="540"
        height="220"
        style={{ opacity: 0.8 }}
      />

      {FINGER_LAYOUT.map((fingerGroup, groupIdx) =>
        fingerGroup.segments.map((segment, segIdx) => {
          const isHighlighted = highlightedFinger === fingerGroup.name;
          return (
            <circle
              key={`${groupIdx}-${segIdx}`}
              cx={segment.x}
              cy={segment.y}
              r={8}
              fill={segment.color}
              stroke={isHighlighted ? segment.color : "#1e293b"}
              strokeWidth={isHighlighted ? 3 : 1.5}
              style={{
                filter: isHighlighted ? `drop-shadow(0 0 8px ${segment.color}aa)` : "none",
                transform: isHighlighted ? "scale(1.05)" : "scale(1)",
                transformOrigin: "center",
                transition: "stroke 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease, transform 0.3s ease",
              }}
            />
          );
        })
      )}

      {/* Add finger labels */}
      {highlightedFinger && (
        <text
          x="270"
          y="210"
          textAnchor="middle"
          fill="#ffffffff"
          fontSize="16"
          fontWeight="bold"
          style={{
            textTransform: "capitalize",
            fontFamily: "Lexend, Noto Sans, sans-serif",
          }}
        >
          {highlightedFinger} Finger
        </text>
      )}
    </svg>
    </div>
  );
};

export default FuturisticHands;
