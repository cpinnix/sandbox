import { createView } from "./view";
import { createInteractor } from "./interactor";
import { createPresenter } from "./presenter";

export const createBuilder = parent => {
  let view;
  let interactor;
  let presenter;

  const build = () => {
    view = createView();
    interactor = createInteractor(parent);
    presenter = createPresenter(interactor, view);
    presenter.present();
  };

  const destroy = () => {
    view.destroy();
    interactor.destroy();
    presenter.destroy();
  };

  return {
    build,
    destroy
  };
};
