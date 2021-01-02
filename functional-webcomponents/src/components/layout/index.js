import create from "../../utils/create";
import component from "../../utils/component/web";
import render from "../../utils/render/html";
import lifecycle from "../../utils/lifecycle/stateful";
import timeout from "../../utils/provider/timeout";

create(
  render((props, state) => {
    return `<div>${props.left()}${props.right()}</div>`;
  }),
  lifecycle({
    initialProps() {
      return { left: () => `<div>Left</div>`, right: () => `<div>Right</div>` };
    },
    initialState() {
      return {};
    },
    mounted() {}
  }),
  component("ui-layout")
);
