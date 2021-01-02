import React from "react";

const DEFAULT = "DEFAULT";
const FULLSCREEN_LEFT = "FULLSCREEN_LEFT";
const FULLSCREEN_RIGHT = "FULLSCREEN_RIGHT";

export default function Layout({ left, right, footer, mode = DEFAULT }) {
  return (
    <div
      className="h-full"
      style={
        mode === FULLSCREEN_RIGHT
          ? {
              display: "grid",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr",
              gridTemplateAreas: `
                "right"
              `
            }
          : mode === FULLSCREEN_LEFT
          ? {
              display: "grid",
              gridTemplateRows: "1fr min-content",
              gridTemplateColumns: "1fr",
              gridTemplateAreas: `
                "left"
                "footer"
              `
            }
          : {
              display: "grid",
              gridTemplateRows: "1fr min-content",
              gridTemplateColumns: "280px 1fr",
              gridTemplateAreas: `
                "left right"
                "footer right"
              `
            }
      }
    >
      {(mode === DEFAULT || mode === FULLSCREEN_LEFT) && (
        <>
          <div style={{ gridArea: "left" }}>{left}</div>
          <div style={{ gridArea: "footer" }}>{footer}</div>
        </>
      )}
      {(mode === DEFAULT || mode === FULLSCREEN_RIGHT) && (
        <div style={{ gridArea: "right" }}>{right}</div>
      )}
    </div>
  );
}

Layout.modes = {
  FULLSCREEN_LEFT,
  FULLSCREEN_RIGHT,
  DEFAULT
};
