import React, { useContext } from "react";
import Switch from "./Switch";
import RootContext from "../contexts/root";

export default function Preferences() {
  const { state, actions } = useContext(RootContext);

  return (
    <div className={`px-6 py-6`}>
      <div
        className={`
          font-bold
          text-black
        `}
      >
        Preferences
      </div>
      <div className="h-4" />
      <div>
        {state.preferences.map(({ name, label, type, value }) => {
          switch (type) {
            case "toggle":
              return (
                <div
                  key={name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "max-content min-content",
                    gap: ".5rem",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div className="text-black">{label}</div>
                  <Switch
                    on={value}
                    onToggle={() => actions.onChangePreference(name, !value)}
                  />
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
