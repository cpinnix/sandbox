import React from "react";
import useInteractors from "../hooks/useInteractors";
import Arena from "../apps/arena/components/Arena";
import createArenaInteractors from "../apps/arena";

function present(interactors) {
  const presentation = {
    state: {
      villains: interactors.arena.state.villains
    }
  };

  return presentation;
}

export default function ConnectedArena() {
  const interactors = useInteractors(createArenaInteractors);
  const presentation = present(interactors);
  return <Arena {...presentation} />;
}
