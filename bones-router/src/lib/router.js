import { merge, cloneDeep } from "lodash";
import { createObservable } from "./observable";

export function createRouterCore(resolvePath = targetPath => targetPath) {
  const observable = createObservable();
  let state = {
    currentPath: null,
    prevPath: null
  };

  function notify() {
    observable.notify(state);
  }

  function getState() {
    return cloneDeep(state);
  }

  function setState(newState) {
    state = newState;
  }

  function mergeState(newState) {
    state = merge({}, state, newState);
  }

  function setPrevPath(path) {
    mergeState({ prevPath: path });
  }

  function getPrevPath() {
    return state?.prevPath;
  }

  const setCurrentPath = path => {
    mergeState({ currentPath: path });
  };

  function getCurrentPath() {
    return state?.currentPath;
  }

  function go(targetPath) {
    const currentPath = getCurrentPath();
    if (targetPath !== currentPath) {
      return new Promise(res => {
        Promise.resolve(resolvePath(targetPath)).then(newPath => {
          setPrevPath(currentPath);
          setCurrentPath(newPath);

          if (currentPath !== newPath) {
            notify();
          }

          return res(cloneDeep(getState()));
        });
      });
    }

    return Promise.resolve(cloneDeep(getState()));
  }

  return {
    go,
    notify,
    getState,
    setState,
    mergeState,
    getCurrentPath,
    setCurrentPath,
    setPrevPath,
    getPrevPath,
    subscribe: observable.subscribe,
    destroy: observable.destroy
  };
}
