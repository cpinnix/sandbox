import create from "../../utils/create";
import component from "../../utils/component/web";
import render from "../../utils/render/hyper";
import lifecycle from "../../utils/lifecycle/stateless";

create(
  render((wire, props) => {
    return wire()`
      <div onclick=${() => props.handleClick()}>${props.message}</div>
    `;
  }),
  lifecycle({ message: "world", handleClick: () => console.log("clicked") }),
  component("ui-message")
);
