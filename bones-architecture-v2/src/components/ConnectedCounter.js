import React from "react";
import useInteractors from "../hooks/useInteractors";
import Counter from "../apps/counter/components/Counter";
import createCounterInteractor from "../apps/counter";

export default function ConnectedCounter() {
  const interactors = useInteractors(() => ({
    counter: createCounterInteractor()
  }));

  return <Counter {...interactors.counter} />;
}
