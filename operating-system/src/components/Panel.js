import React from "react";

export default function Panel({ children, onBack }) {
  const theme = {
    headerColor: "bg-gray-200"
  };

  return (
    <div
      className="h-full"
      style={{ display: "grid", gridTemplateRows: "min-content 1fr" }}
    >
      <div className={`p-2 ${theme.headerColor}`}>
        <span
          className={`
            material-icons 
            p-3
            text-lg
            text-gray-500 
            hover:text-black
            cursor-pointer
          `}
          onClick={onBack}
        >
          arrow_back
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
