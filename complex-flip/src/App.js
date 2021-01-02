import React, { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import Fade from "react-reveal/Fade";
import classes from "./index.module.css";

const AnimatedSquare = () => {
  const [square, setSquare] = useState(false);
  const [panel, setPanel] = useState(false);
  const [circleVisible, setCircleVisible] = useState(false);
  const [circle, setCircle] = useState(false);
  const activateSquare = () => setSquare(true);
  const activatePanel = () => setPanel(true);
  const activateCircle = () => setCircle(true);
  const showCircle = () => setCircleVisible(true);

  return (
    <>
      <Flipper flipKey={square} onComplete={activatePanel}>
        <Flipped flipId="square">
          <div
            className={square ? classes.end : classes.start}
            onClick={activateSquare}
          />
        </Flipped>
      </Flipper>
      <Flipper flipKey={panel} onComplete={showCircle}>
        <Flipped flipId="panel">
          <div
            className={
              panel ? `${classes.panel} ${classes.panelEnd}` : classes.panel
            }
          />
        </Flipped>
      </Flipper>
      <Fade when={circleVisible}>
        <div className={classes.circle} />
      </Fade>
      {circleVisible && (
        <Flipper flipKey={circle}>
          <Flipped flipId="circle" transformOrigin="48 48">
            <div
              className={circle ? classes.circleEnd : classes.circleStart}
              onClick={() => {
                activateCircle();
                setCircleVisible(false);
              }}
            />
          </Flipped>
        </Flipper>
      )}
    </>
  );
};

export default AnimatedSquare;
