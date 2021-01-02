import createStore from "../../bones/createStore";

export default function createInteractor() {
  const store = createStore({ count: 0 });

  return {
    ...store,
    destroy() {},
    actions: {
      increment() {
        store.mergeState({
          count: store.getState().count + 1
        });
      },
      decrement() {
        store.mergeState({
          count: store.getState().count - 1
        });
      }
    },
    selectors: {
      count(state) {
        return state.count;
      }
    }
  };
}
