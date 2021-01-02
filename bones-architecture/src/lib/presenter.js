export const createPresenter = ({ interactor, view, present }) => {
  const disconnectInteractor = interactor.connect(state => {
    view.render(present({ state, actions: interactor.actions }));
  });

  return {
    destroy() {
      disconnectInteractor();
    }
  };
};
