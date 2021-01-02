import React from "react";

export default function Counter({ state, actions }) {
  return (
    <div className="p-8">
      <div
        className="
          p-16
          bg-gray-100
          border
          border-gray-300
          rounded
          mb-8
          text-center
          text-3xl
        "
      >
        {state.count}
      </div>
      <div className="grid grid-cols-2 gap-8">
        <button
          className="
            bg-red-500
            border
            border-red-600
            py-3
            px-6
            text-white
            rounded-full
          "
          onClick={() => actions.decrement()}
        >
          decrement
        </button>
        <button
          className="
            bg-green-500
            border
            border-green-600
            py-3
            px-6
            text-white
            rounded-full
          "
          onClick={() => actions.increment()}
        >
          increment
        </button>
      </div>
    </div>
  );
}
