import { createStore } from "redux";

export const createInteractor = parent => {
  const parentInteractor = parent.interactor;

  const initialState = {
    options: [
      {
        name: "manage_contacts",
        label: "Manage Contacts",
        targetPath: "manage_contacts",
        selected: false
      }
    ]
  };

  function counter(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }

  const store = createStore(counter);

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
