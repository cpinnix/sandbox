import React from "react";

export default function Arena({ state }) {
  const { villains } = state;
  return (
    <div className="p-8 grid gap-8">
      {villains &&
        villains.map((villain, index) => (
          <div key={index} className="grid gap-2">
            <div className="relative w-full bg-gray-100 h-4">
              <div
                className="h-full bg-yellow-300"
                style={{ width: `${villain.attributes.earth}%` }}
              />
            </div>
            <div className="relative w-full bg-gray-100 h-4">
              <div
                className="h-full bg-blue-300"
                style={{ width: `${villain.attributes.wind}%` }}
              />
            </div>
            <div className="relative w-full bg-gray-100 h-4">
              <div
                className="h-full bg-red-300"
                style={{ width: `${villain.attributes.fire}%` }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
