import { createObservable } from "./observable";

export const createStore = (initialState = {}) => {
  let state = initialState;
  const observable = createObservable();

  const setState = payload => {
    state = {
      ...state,
      ...payload
    };
    observable.update(payload);
  };

  const getState = () => state;

  const clearState = () => {
    state = null;
    observable.update(state);
  };

  const store = {
    setState,
    getState,
    clearState,
    subscribe: observable.subscribe,
    connect(fn) {
      fn(state);
      return observable.subscribe(() => fn(state));
    }
  };

  return store;
};
