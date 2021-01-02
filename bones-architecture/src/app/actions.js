export const increment = ({ store }) => () => {
  store.setState({
    count: store.getState().count + 1
  });
};
