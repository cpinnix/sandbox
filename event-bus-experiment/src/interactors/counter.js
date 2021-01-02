import createStore from "../lib/store";
import * as messages from "../messages";
import { switchTypes } from "../utils";

function createCounter({ interactors: { bus } }) {
  const store = createStore({ count: 0 });

  function increment() {
    store.setState({ count: store.getState().count + 1 }).then(() => {
      bus.notify(messages.counter.updated(store.getState()));
    });
  }

  function decrement() {
    store.setState({ count: store.getState().count - 1 }).then(() => {
      bus.notify(messages.counter.updated(store.getState()));
    });
  }

  const handle = switchTypes(
    [messages.counter.increment.type, increment],
    [messages.counter.decrement.type, decrement]
  );

  const unsubscribes = [bus.subscribe(handle)];

  return {
    destroy: function destroy() {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    }
  };
}

export default createCounter;
