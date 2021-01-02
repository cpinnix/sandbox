import React from "react";
import { render } from "react-dom";

export const createReactView = ({ container, component }) => {
  return {
    render: ({ state, actions }) =>
      render(React.createElement(component, { state, actions }), container),
    destroy: () => {
      render(null, container);
    }
  };
};
