import { cloneDeep } from "lodash";

export async function persist({
  store,
  storage,
  key,
  // Trying to make things a bit more flexible by
  // allowing an `omitFn` to be called before writing
  // anything to storage.
  omitFn = state => state
}) {
  const storedState = await storage.get(key);

  if (storedState) {
    store.mergeState(storedState);
  }

  store.subscribe(state => {
    storage.set(omitFn(cloneDeep(state)));
  });
}

// Provide a whitelist function for usage inside
// or in place of the `omitFn`.
export const whiteList = list => state => {};

// Provide a blacklist function for usage inside
// or in place of the `omitFn`.
export const blackList = list => state => {};
