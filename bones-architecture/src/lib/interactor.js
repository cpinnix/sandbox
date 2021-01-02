export const createInteractor = ({
  store,
  actions,
  selectors,
  dependencies
}) => {
  return {
    getState: store.getState,
    connect(cb) {
      cb(store.getState());
      return store.subscribe(() => cb(store.getState()));
    },
    actions: Object.keys(actions).reduce(
      (newActions, key) => ({
        ...newActions,
        [key]: actions[key]({ store, dependencies })
      }),
      {}
    ),
    selectors
  };
};
