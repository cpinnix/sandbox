// Main Ideas
// Existing problems
//
// 1. Middleware solution is hard to teach and learn.
// 2. State is exposed and vulnerable to outside mutation.
// 3. Persistance methods have been explored, but remain
// unresolved. (And we need persistence.)
// 4. Need a clear solution to asynchronous reads and writes
// to storage.
// 5. It's unclear what `setState` actually does to the state.
// Does it merge or not merge? How does clearing properties work?
//
// Main Ideas
//
// 1. Separate observable logic out into a lower level primitive.
// Thought here was that it would be easy to teach and reuse as
// a separate piece. Others could built alternative store solutions
// with it, etc.
// 2. Protect the edges of the store by exposing only cloned versions
// of the state. This will prevent any weird side-effects if an observer
// accidentally changes the state.
// 3. Remove middleware functionality. This has been pretty hard to teach
// and understand. We were only using it state persistence and logging; both
// features can be tackled in better ways (I think).
// 4. Implement asynchronous local and session storage factories. This
// was done to work through how persistence would work, especially with
// asynchronous remove persistence methods.
// 5. Provide whitelist or blacklist functionality via an `omitFn` parameter
// on the `persist` function. This keeps things simple and flexible as the
// whitelist/blacklist functionality is not built into the persistence function
// but came be added with some helper functions.
// 6. Implemented `setState` and `mergeState`. `setState` replaces the state
// with what you pass in, `mergeState` deep merges what you pass in with the
// existing state.
import { createStore, persist } from "./lib/store";
import { createStorage } from "./lib/storage/session";

// Asynchronous function because setting up persistance is async.
async function main() {
  const counterStore = createStore({
    count: 0,
    // Create a dangerous property here to show
    // how storage omitting works.
    password: "foo"
  });

  const storage = createStorage("counter_store.state");

  // Wait for persistance to initialize before doing anything else.
  await persist({
    store: counterStore,
    storage,
    // Omit `password` from storage here.
    omitFn: state => {
      delete state.password;
      return state;
    }
  });

  console.log(counterStore.getState().count);

  counterStore.mergeState({ count: counterStore.getState().count + 1 });

  console.log(counterStore.getState().count);
}

main();
