const createObservable = () => {
  let callbacks = [];

  function notify(...args) {
    return Promise.all(callbacks.map(callback => callback(...args)));
  }

  function subscribe(fn) {
    callbacks.push(fn);

    return () => {
      callbacks = callbacks.filter(val => val !== fn);
    };
  }

  function destroy() {
    callbacks = [];
  }

  const observable = {
    notify,
    subscribe,
    destroy
  };

  return observable;
};

export default createObservable;
