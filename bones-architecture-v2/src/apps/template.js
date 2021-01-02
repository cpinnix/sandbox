// ...

export default function createInteractor() {
  // ...

  return {
    getState() {},
    subscribe(callback) {},
    connect(callback) {},
    destroy() {},
    actions: {
      example() {}
    },
    selectors: {
      example(state) {}
    }
  };
}
