import createStore from "../../bones/createStore";

const DEFAULT_STATE = {
  villains: []
};

export default function createInteractor({ gateways: { gateway } }) {
  const store = createStore(DEFAULT_STATE);

  return {
    ...store,
    destroy() {},
    actions: {
      async initiate() {
        const villains = await gateway.fetchVillains();

        store.mergeState({
          villains
        });
      }
    },
    selectors: {
      villains(state) {
        return state.villains;
      }
    }
  };
}
