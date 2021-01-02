import create from "../../utils/create";
import component from "../../utils/component/web";
import render from "../../utils/render/hyper";
import lifecycle from "../../utils/lifecycle/stateless";
import "../time";
import "../message";

create(
  render((wire, props) => {
    return wire()`
      <div>
        <ui-message props=${() => ({
          message: props.message,
          handleClick: props.handleClick
        })}></ui-message>
        <ui-time></ui-time>
      </div>
    `;
  }),
  lifecycle({ message: "Default Message", handleClick: () => {} }),
  component("ui-clock")
);
