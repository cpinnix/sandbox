import React, { useState } from "react";
import TransitionContainer, { useTransition } from "./TransitionContainer";
import "./styles.css";
import classes from "./App.module.css";

function Page1({ onNext }) {
  return (
    <TransitionContainer name={1}>
      {(status, leave) => (
        <div
          className={`
            App
            ${
              status === TransitionContainer.ENTER
                ? classes.enter
                : classes.exit
            }
          `}
        >
          <h1>Hello World</h1>
          <h2>Start editing to see some magic happen!</h2>
          <button
            onClick={() => {
              leave();
              setTimeout(onNext, 400);
            }}
          >
            Leave
          </button>
        </div>
      )}
    </TransitionContainer>
  );
}

function Page2({ onNext }) {
  return (
    <TransitionContainer name={2}>
      {(status, leave) => (
        <div
          className={`
          App
          ${status === TransitionContainer.ENTER ? classes.enter : classes.exit}
        `}
        >
          <h1>Hello Second</h1>
          <h2>Start editing to see some magic happen!</h2>
          <button
            onClick={() => {
              leave();
              setTimeout(onNext, 400);
            }}
          >
            Leave
          </button>
        </div>
      )}
    </TransitionContainer>
  );
}

function Page3({ onNext }) {
  return (
    <div className="App">
      <h1>Hello Three</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={onNext}>Leave</button>
    </div>
  );
}

function Page4({ onNext }) {
  const [transitionClass, leave] = useTransition({
    classes: {
      enter: classes.enter,
      exit: classes.exit
    }
  });

  return (
    <div
      className={`
        App
        ${transitionClass}
      `}
    >
      <h1>Hello Fourth</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={() => {
          leave();
          setTimeout(onNext, 400);
        }}
      >
        Leave
      </button>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  return current === 0 ? (
    <Page1 onNext={() => setCurrent(1)} />
  ) : current === 1 ? (
    <Page2 onNext={() => setCurrent(2)} />
  ) : current === 2 ? (
    <Page3 onNext={() => setCurrent(3)} />
  ) : (
    <Page4 />
  );
}
