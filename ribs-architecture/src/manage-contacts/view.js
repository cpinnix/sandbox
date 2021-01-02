import React from "react";
import ReactDOM from "react-dom";

const View = () => <div className="p-6">Managing Contacts</div>;

export const createView = () => {
  const render = () => {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<View />, rootElement);
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
