import merge from "../merge";

const render = fn => base => {
  const render = (element, props, state) => {
    element.innerHTML = fn(props, state);
  };

  return merge(base, { render });
};

export default render;
