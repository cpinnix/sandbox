import React from "react";
import ReactDOM from "react-dom";

const View = ({ state, actions }) => (
  <div className="p-6">
    {state.options.map(({ name, label, targetPath }) => (
      <div key={name} onClick={() => actions.go(targetPath)}>
        {label}
      </div>
    ))}
  </div>
);
export const createView = () => {
  const render = (state, actions) => {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<View {...{ state, actions }} />, rootElement);
  };

  const destroy = () => {
    const rootElement = document.getElementById("root");
    ReactDOM.render(null, rootElement);
  };

  return {
    render,
    destroy
  };
};
