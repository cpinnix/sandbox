import { createStore } from "redux";

export const createInteractor = ({ history, location }) => {
  function counter(state = "home", action) {
    switch (action.type) {
      case "cmd.go":
        return action.payload;
      default:
        return state;
    }
  }

  const store = createStore(counter);

  const init = () => {
    store.dispatch({
      type: "cmd.go",
      payload: location.pathname
    });
  };

  const subscribe = store.subscribe;

  const selectors = {
    getState: store.getState
  };

  const actions = {
    go: path => {
      store.dispatch({
        type: "cmd.go",
        payload: path
      });
      history.pushState(path);
    }
  };

  const destroy = () => {};

  return {
    init,
    subscribe,
    selectors,
    actions,
    destroy
  };
};
