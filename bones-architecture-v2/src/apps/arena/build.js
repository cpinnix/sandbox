import React from "react";
import { render } from "react-dom";
import * as gateway from "./gateway";
import createInteractor from "./interactor";
import present from "./present";
import Arena from "./components/Arena";

export default function build({ container }) {
  const interactor = createInteractor({ gateways: { gateway } });

  interactor.actions.initiate();

  interactor.connect((state) => {
    const presentation = present({
      state,
      actions: interactor.actions,
      selectors: interactor.selectors
    });

    render(<Arena {...presentation} />, container);
  });
}
