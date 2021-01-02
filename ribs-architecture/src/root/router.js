import { createBuilder as createHomeBuilder } from "../home";
import { createBuilder as createManageContactsBuilder } from "../manage-contacts";

export const createRouter = args => {
  let unsubscribe;
  let builder;
  let currentPath;

  const init = () => {
    const { interactor } = args;
    unsubscribe = interactor.subscribe(() => {
      const state = interactor.selectors.getState();
      if (currentPath !== state) {
        if (builder) builder.destroy();
        switch (state) {
          case "home":
            builder = createHomeBuilder(args);
            builder.build();
            return;
          case "manage_contacts":
            builder = createManageContactsBuilder(args);
            builder.build();
            return;
          default:
            return;
        }
      }
    });
  };

  const destroy = () => {
    unsubscribe();
  };

  return {
    init,
    destroy
  };
};
