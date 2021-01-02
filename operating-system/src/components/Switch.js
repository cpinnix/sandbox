import React, { useContext } from "react";
import RootContext from "../contexts/root";

export default function Switch({ on = true, onToggle }) {
  const { selectors } = useContext(RootContext);

  const darkMode = selectors.preference("dark_mode");

  return (
    <div
      onClick={onToggle}
      className={`
        cursor-pointer
        p-1
        border-2
        ${
          darkMode
            ? `
              border-gray-500
              hover:border-white
            `
            : `
              border-gray-500
              hover:border-black
            `
        }
        inline-block
        rounded-full
        ${on ? "pl-6" : "pr-6"}
      `}
    >
      <div
        className={`
          w-6
          h-6
          rounded-full
          ${on ? "bg-green-500" : "bg-gray-500"}
        `}
      ></div>
    </div>
  );
}
