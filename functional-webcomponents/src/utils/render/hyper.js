import merge from "../merge";
import { bind, wire } from "hyperhtml";

const render = fn => base => {
  const render = (element, props, state) => {
    bind(element)`${fn(wire, props, state)}`;
  };

  return merge(base, { render });
};

export default render;
