export const createPresenter = (interactor, view) => {
  let unsubscribe;

  const present = () => {
    const handler = () => {
      const state = interactor.selectors.getState();
      const actions = interactor.actions;
      view.render(state, actions);
    };
    handler();
    unsubscribe = interactor.subscribe(handler);
  };

  const destroy = () => {
    if (unsubscribe) unsubscribe();
  };

  return {
    present,
    destroy
  };
};
