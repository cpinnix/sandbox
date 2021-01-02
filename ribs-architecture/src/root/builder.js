import { createInteractor } from "./interactor";
import { createRouter } from "./router";

export const createBuilder = args => {
  const interactor = createInteractor(args);
  const router = createRouter({ interactor });

  router.init();
  interactor.init();
};
