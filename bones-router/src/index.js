import React from "react";
import { render } from "react-dom";
import { createRouterCore } from "./lib/router";
import PropTypes from "prop-types";

const renderHome = ({ router }) => {
  const root = document.getElementById("app");
  render(
    <div>
      <div>Home</div>
      <button onClick={() => router.go("/?param=foo")}>
        Go Home with Param
      </button>
      <button onClick={() => router.go("/dashboard")}>Go to Dashboard</button>
    </div>,
    root
  );
};

const renderDashboard = ({ router }) => {
  const root = document.getElementById("app");
  render(
    <div>
      <div>Dashboard</div>
      <button onClick={() => router.go("/")}>Go Home</button>
      <button onClick={() => router.go("/not-allowed")}>Not Allowed</button>
    </div>,
    root
  );
};

const resolvePath = targetPath => {
  if (targetPath.includes("not-allowed")) {
    return "/";
  }

  return targetPath;
};

const createRouteConfig = props => {
  PropTypes.checkPropTypes(
    createRouteConfig.propTypes,
    props,
    "prop",
    "createRouteConfig"
  );
  return props;
};

createRouteConfig.propTypes = {
  name: PropTypes.string.isRequired,
  build: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(RegExp).isRequired
};

// Order matters.
const routes = [
  createRouteConfig({
    name: "dashboard",
    build: renderDashboard,
    match: /\/dashboard/
  }),
  createRouteConfig({
    name: "home",
    build: renderHome,
    match: /\//
  })
];

const createRouter = props => {
  const { resolvePath, routes } = props;

  PropTypes.checkPropTypes(
    createRouter.propTypes,
    props,
    "prop",
    "createRouter"
  );

  const router = createRouterCore(resolvePath);

  router.subscribe(state => {
    console.log("[ROUTER] state change", state);
  });

  const routeDependencies = {
    router
  };

  router.subscribe(({ currentPath }) => {
    const routeConfig = routes.find(route => {
      return route.match.test(currentPath);
    });

    routeConfig.build(routeDependencies);
  });

  return {
    currentPath: router.currentPath,
    go: router.go
  };
};

createRouter.propTypes = {
  resolvePath: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape(createRouteConfig.propTypes))
    .isRequired,
  dependencies: PropTypes.any
};

const dependencies = {};

const router = createRouter({
  resolvePath,
  routes,
  dependencies
});

router.go("/");
