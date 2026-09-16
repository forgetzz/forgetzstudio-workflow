"use client";

export default function FlowLine({
  direction = "vertical",
  length = 32,
  color = "#9aa2ad",
  active = true,
}: {
  direction?: "vertical" | "horizontal";
  length?: number;
  color?: string;
  active?: boolean;
}) {
  const isVertical = direction === "vertical";
  return (
    <svg
      width={isVertical ? 2 : length}
      height={isVertical ? length : 2}
      className="mx-auto shrink-0"
      aria-hidden="true"
    >
      <line
        x1={isVertical ? 1 : 0}
        y1={isVertical ? 0 : 1}
        x2={isVertical ? 1 : length}
        y2={isVertical ? length : 1}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="5 5"
        className={active ? "animate-dash-flow" : ""}
        strokeLinecap="round"
        opacity={0.55}
      />
    </svg>
  );
}
