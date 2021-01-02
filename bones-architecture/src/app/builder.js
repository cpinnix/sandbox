import { createStore } from "../lib/store";
import { createInteractor } from "../lib/interactor";
import { createPresenter } from "../lib/presenter";
import { createReactView } from "../lib/view.react";
import { present } from "./present";
import { View } from "../components/view";
import * as actions from "./actions";
import * as selectors from "./selectors";

export const build = ({ container }) => {
  const store = createStore({
    count: 0
  });
  const interactor = createInteractor({
    store,
    actions,
    selectors
  });
  const view = createReactView({ container, component: View });
  const presenter = createPresenter({
    interactor,
    view,
    present
  });

  return {
    actions: interactor.actions,
    destroy: () => {
      presenter.destroy();
      view.destroy();
      interactor.destroy();
    }
  };
};
