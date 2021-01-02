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
