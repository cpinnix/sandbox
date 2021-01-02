import { merge, cloneDeep } from "lodash";
import { createObservable } from "../observable";

export function createStore(initialState = {}) {
  const observable = createObservable();
  let state = initialState;

  function notify() {
    // Make sure to close at the edge here so
    // that observers can't accidentally modify
    // internal state.
    return observable.notify(cloneDeep(state));
  }

  function setState(newState) {
    state = newState;
    return notify();
  }

  function mergeState(newState) {
    state = merge({}, state, newState);
    return notify();
  }

  function getState() {
    // Make sure to close at the edge here so
    // that observers can't accidentally modify
    // internal state.
    return cloneDeep(state);
  }

  const store = {
    setState,
    mergeState,
    getState,
    subscribe: observable.subscribe,
    destroy: observable.destroy
  };

  return store;
}
