import { createBuilder as createRootBuilder } from "./root";
import { history } from "./history";
import { location } from "./location";

createRootBuilder({
  history,
  location
});
