import React, { useState, useEffect } from "react";

export default function EnterAnimation({ index, children }) {
  const [status, updateStatus] = useState("START");

  useEffect(() => {
    updateStatus("ENTER");
  }, []);

  return (
    <div
      style={{
        opacity: status === "START" ? 0 : 1,
        transform: status === "START" ? "translateY(-16px)" : "translateY(0)",
        transition:
          "opacity 1s cubic-bezier(0.0, 0.0, 0.2, 1), transform 150ms cubic-bezier(0.0, 0.0, 0.2, 1)",
        transitionDelay: `${index * 100 + 400}ms`
      }}
    >
      {children}
    </div>
  );
}
