import React, { useEffect, useState } from "react";

function TransitionContainer({ children, name }) {
  const [state, setState] = useState(null);

  function leave() {
    setState(TransitionContainer.EXIT);
  }

  useEffect(() => {
    setState(null);
    setTimeout(() => {
      setState(TransitionContainer.ENTER);
    });
  }, [name]);

  return <div>{children(state, leave)}</div>;
}

TransitionContainer.ENTER = "ENTER";
TransitionContainer.EXIT = "EXIT";

export default TransitionContainer;

export function useTransition({ classes }) {
  const [state, setState] = useState(null);

  function leave() {
    setState(TransitionContainer.EXIT);
  }

  useEffect(() => {
    setState(null);
    setTimeout(() => {
      setState(TransitionContainer.ENTER);
    });
  }, []);

  const transitionClass =
    state === TransitionContainer.ENTER ? classes.enter : classes.exit;
  return [transitionClass, leave];
}
