import React from "react";

const FULLSCREEN = "FULLSCREEN";
const DEFAULT = "DEFAULT";

export default function Application({
  children,
  mode = DEFAULT,
  toggleFullScreen
}) {
  const theme = {
    headerColor: "bg-gray-300"
  };

  return (
    <div className="h-full">
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
          onClick={toggleFullScreen}
        >
          {mode === FULLSCREEN ? "chevron_right" : "chevron_left"}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

Application.modes = {
  DEFAULT,
  FULLSCREEN
};
