export default function present({ state, selectors }) {
  return {
    state: {
      villains: selectors.villains(state)
    }
  };
}
