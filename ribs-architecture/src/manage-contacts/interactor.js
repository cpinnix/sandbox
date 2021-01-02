import { createStore } from "redux";

export const createInteractor = parent => {
  const parentInteractor = parent.interactor;

  const initialState = {};

  function reducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }

  const store = createStore(reducer);

  const subscribe = store.subscribe;

  const selectors = {
    getState: store.getState
  };

  const actions = {
    go: parentInteractor.actions.go
  };

  const destroy = () => {};

  return {
    subscribe,
    selectors,
    actions,
    destroy
  };
};
