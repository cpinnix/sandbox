import React from "react";
import { render } from "react-dom";
import createObservable from "./lib/observable";
import createCounter from "./interactors/counter";
import createRenderer from "./interactors/renderer";

const bus = createObservable();

bus.subscribe(message => {
  console.log("[MESSAGE]", message.type, message.payload);
});

createCounter({ interactors: { bus } });
const renderer = createRenderer({ interactors: { bus } });

renderer.connect(state => {
  render(
    <div>
      <div>{renderer.selectors.count(state)}</div>
      <button onClick={renderer.actions.increment}>Increment</button>
    </div>,
    document.getElementById("root")
  );
});
