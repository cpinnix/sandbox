import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

export const createObservable = () => {
  let callbacks = [];

  const update = (...args) => {
    callbacks.forEach(callback => callback(...args));
  };

  const subscribe = fn => {
    callbacks.push(fn);

    return () => {
      callbacks = callbacks.filter(val => val !== fn);
    };
  };

  const observable = {
    update,
    subscribe
  };

  return observable;
};

export const createStore = (initialState = {}) => {
  let state = initialState;
  const observable = createObservable();

  const setState = payload => {
    state = {
      ...state,
      ...payload
    };
    observable.update(payload);
  };

  const getState = () => state;

  const clearState = () => {
    state = null;
    observable.update(state);
  };

  const store = {
    setState,
    getState,
    clearState,
    subscribe: observable.subscribe,
    connect(fn) {
      fn(state);
      return observable.subscribe(() => fn(state));
    }
  };

  return store;
};

const withTracing = ({ name, actions, store, dependencies }) =>
  Object.keys(actions).reduce(
    (newActions, key) => ({
      ...newActions,
      [key]: (...args) => {
        const measureName = `interactor.${name}.action.${key}`;
        const startMarkName = `interactor.${name}.action.${key}.start`;
        const endMarkName = `interactor.${name}.action.${key}.end`;
        performance.mark(startMarkName);
        actions[key]({ store, dependencies })(...args);
        performance.mark(endMarkName);
        performance.measure(measureName, startMarkName, endMarkName);
      }
    }),
    {}
  );

export const createInteractor = ({
  name,
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
    actions: withTracing({ name, store, dependencies, actions }),
    selectors
  };
};

const counterStore = createStore({
  count: 0
});

const counterInteractor = createInteractor({
  name: "counter",
  store: counterStore,
  actions: {
    increment: ({ store }) => () => {
      store.setState({
        count: store.getState().count + 1
      });
    }
  }
});

counterInteractor.actions.increment();

console.log(counterInteractor.getState());
