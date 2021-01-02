import merge from "../merge";

const timeout = ({ callback, duration }) => base => {
  setTimeout(
    () => base.setProps(props => merge(props, { timeoutProvider: callback() })),
    duration
  );
  return base;
};

export default timeout;
