import merge from "../merge";

const functional = (initialProps = {}) => base => {
  let props = initialProps;

  const mounted = element => base.render(element, props);
  const getProps = () => props;
  const setProps = (element, fn) => {
    props = fn(props);
    mounted(element);
  };

  const newBase = merge(base, {
    getProps,
    setProps,
    mounted
  });

  return newBase;
};

export default functional;
