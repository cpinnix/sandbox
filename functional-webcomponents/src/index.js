import "./components/layout";
import "./components/clock";
import merge from "./utils/merge";

document.getElementById("app").innerHTML = `
  <ui-layout></ui-layout>
  <ui-clock></ui-clock>
`;

const clock = document.querySelector("ui-clock");
clock.props = props =>
  merge(props, {
    handleClick: () => console.log("clicked clock")
  });

const layout = document.querySelector("ui-layout");
layout.props = props => merge(props, { left: () => `<ui-clock></ui-clock>` });
