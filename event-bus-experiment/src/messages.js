import { createMessage } from "./utils";

export const counter = {
  increment: createMessage("cmd.counter.increment"),
  decrement: createMessage("cmd.counter.decrement"),
  updated: createMessage("evt.counter.updated")
};

export const tracker = {
  track: createMessage("cmd.tracker.track")
};
