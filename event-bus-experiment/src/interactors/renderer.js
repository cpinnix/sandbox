import createStore from "../lib/store";
import * as messages from "../messages";
import { switchTypes } from "../utils";

function createRenderer({ interactors: { bus } }) {
  const store = createStore();

  function update({ payload }) {
    store.setState(payload);
  }

  const handle = switchTypes([messages.counter.updated.type, update]);

  const unsubscribes = [bus.subscribe(handle)];

  return {
    ...store,
    actions: {
      increment: function increment() {
        bus.notify(messages.counter.increment());
        bus.notify(
          messages.tracker.track({
            domain: "app",
            object: "increment_button",
            verb: "clicked"
          })
        );
      }
    },
    selectors: {
      count: state => state.count
    },
    destroy: function destroy() {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    }
  };
}

export default createRenderer;
