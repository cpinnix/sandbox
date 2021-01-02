import { merge, cloneDeep } from "lodash";
import createObservable from "./observable";

export function createStore(initialState = {}) {
  const observable = createObservable();
  let state = initialState;

  function notify() {
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
    return cloneDeep(state);
  }

  const store = {
    setState,
    mergeState,
    getState,
    subscribe: observable.subscribe,
    connect: fn => {
      fn(cloneDeep(state));
      return observable.subscribe(fn);
    },
    destroy: observable.destroy
  };

  return store;
}

export default createStore;
