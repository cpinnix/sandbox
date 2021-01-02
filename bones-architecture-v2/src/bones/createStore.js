import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import createObservable from "./createObservable";

export default function createStore(initialState = null) {
  let state = initialState;
  const observable = createObservable();

  async function setState(newState) {
    state = newState;
    return observable.update(state);
  }

  async function mergeState(partialState) {
    let newState = cloneDeep(state);
    merge(newState, partialState);
    state = newState;
    return observable.update(newState);
  }

  function getState() {
    return cloneDeep(state);
  }

  function subscribe(fn) {
    return observable.subscribe(() => fn(cloneDeep(state)));
  }

  function connect(fn) {
    fn(state);
    return observable.subscribe(() => fn(cloneDeep(state)));
  }

  return {
    setState,
    mergeState,
    getState,
    subscribe,
    connect
  };
}
