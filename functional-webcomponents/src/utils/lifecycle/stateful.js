import merge from "../merge";

const lifecycle = (hooks = {}) => base => {
  let props = hooks.initialProps ? hooks.initialProps() : {};
  let state = hooks.initialState ? hooks.initialState() : {};

  const update = element => {
    base.render(element, props, state);
  };

  const getProps = () => props;
  const setProps = (element, fn) => {
    props = fn(props);
    update(element, props, state);
  };

  const getState = () => state;
  const setState = (element, fn) => {
    state = fn(state, props);
    update(element, props, state);
  };

  const mounted = element => {
    hooks.mounted && hooks.mounted({ setState: fn => setState(element, fn) });
    update(element, props, state);
  };

  const unmounted = element => {
    hooks.unmounted && hooks.unmounted();
  };

  return merge(base, {
    getProps,
    setProps,
    getState,
    mounted,
    unmounted
  });
};

export default lifecycle;
