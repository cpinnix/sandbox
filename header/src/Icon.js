import React from "react";

export default function Close({ open = false, theme = { color: "black" } }) {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        position: "relative"
      }}
    >
      <div
        style={{
          width: 24,
          height: 2,
          position: "absolute",
          top: 8,
          transform: open ? "rotateZ(135deg) translate(2px, -2px)" : "none",
          transition: "transform 300ms linear",
          backgroundColor: theme.color
        }}
      />
      <div
        style={{
          width: 24,
          height: 2,
          position: "absolute",
          top: 14,
          transform: open ? "rotateZ(45deg) translate(-2px, -2px)" : "none",
          transition: "transform 150ms linear",
          backgroundColor: theme.color
        }}
      />
    </div>
  );
}
