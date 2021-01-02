import React, { useRef } from "react";
import anime from "animejs";
import "./styles.css";

export default function App() {
  const buttonRef = useRef();
  const backgroundRef = useRef();
  const footerRef = useRef();
  const circleRef = useRef();

  const onClick = () => {
    const sourceDimensions = buttonRef.current.getBoundingClientRect();

    const background = backgroundRef.current;
    const footer = footerRef.current;
    const circle = circleRef.current;

    background.style.width = `${sourceDimensions.width}px`;
    background.style.height = `${sourceDimensions.height}px`;
    background.style.position = "fixed";
    background.style.left = `${sourceDimensions.left}px`;
    background.style.top = `${sourceDimensions.top}px`;

    footer.style.backgroundColor = "#FFF";
    footer.style.width = "100%";
    footer.style.height = "0";
    footer.style.bottom = "0";
    footer.style.position = "absolute";

    circle.style.backgroundColor = "#bdbdbd";
    circle.style.opacity = 0;
    circle.style.width = "48px";
    circle.style.height = "48px";
    circle.style.position = "absolute";
    circle.style.right = "48px";
    circle.style.bottom = "72px";
    circle.style.borderRadius = "9999px";

    anime
      .timeline({
        easing: "easeInOutQuint",
        complete: () => {
          console.log("done");
        }
      })
      .add({
        duration: 250,
        targets: background,
        backgroundColor: "#000"
      })
      .add({
        duration: 600,
        targets: background,
        top: "0",
        left: "0",
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
        backgroundColor: "#6c87fe"
      })
      .add({
        duration: 250,
        targets: footer,
        height: `96px`
      })
      .add({
        duration: 250,
        targets: circle,
        opacity: 1
      });
  };

  const openCircle = () => {
    const circle = circleRef.current;

    anime({
      duration: 250,
      easing: "easeInOutQuint",
      targets: circle,
      borderRadius: "0",
      left: "0",
      bottom: "0",
      width: "100%",
      height: "96px"
    });
  };

  return (
    <div style={{ padding: 48 }}>
      <button ref={buttonRef} onClick={onClick}>
        Open
      </button>
      <div ref={backgroundRef}>
        <div ref={footerRef} />
        <div ref={circleRef} onClick={openCircle} />
      </div>
    </div>
  );
}
