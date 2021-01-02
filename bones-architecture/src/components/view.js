import React from "react";

export const View = ({ state, actions }) => (
  <div className="p-6">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={actions.increment}
    >
      {state.count}
    </button>
  </div>
);
