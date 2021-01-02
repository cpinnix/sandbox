import create from "../../utils/create";
import component from "../../utils/component/web";
import render from "../../utils/render/html";
import lifecycle from "../../utils/lifecycle/stateful";
import classes from "./index.css";

create(
  render(
    ({ time }, { counter }) =>
      `<div class="${classes.time}">${counter}, ${time}</div>`
  ),
  lifecycle({
    initialProps() {
      return { time: Date.now() };
    },
    initialState() {
      return { counter: 0 };
    },
    mounted({ setState }) {
      setState(state => {
        return Object.assign({}, state, { counter: 1 });
      });
    }
  }),
  component("ui-time")
);
