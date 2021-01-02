import createArenaInteractor from "./interactor";
import * as gateway from "./gateway";

export default function createInteractors() {
  const arena = createArenaInteractor({ gateways: { gateway } });

  arena.actions.initiate();

  return {
    arena
  };
}
