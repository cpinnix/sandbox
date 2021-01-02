const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const create = (...plugins) => pipe(...plugins)({});
export default create;
