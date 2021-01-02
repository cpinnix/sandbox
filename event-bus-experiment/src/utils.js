import { cond, matchesProperty } from "lodash";

export function switchTypes(...cases) {
  return cond(cases.map(([type, fn]) => [matchesProperty("type", type), fn]));
}

export function createMessage(type) {
  function messageFn(payload) {
    return {
      type,
      payload
    };
  }

  messageFn.type = type;

  return messageFn;
}
