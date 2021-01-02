// Start History Code

const history = {
  _currentPath: "/tv-internet",
  _callbacks: [],
  currentPath: function() {
    return this._currentPath;
  },
  pushState: function(path) {
    this._currentPath = path;
    this._callbacks.forEach(callback => callback(this._currentPath));
  },
  replaceState: function(path) {
    this._currentPath = path;
    this._callbacks.forEach(callback => callback(this._currentPath));
  },
  subscribe: function(fn) {
    this._callbacks.push(fn);
  },
  unsubscribe: function(fn) {
    this._callbacks = this._callbacks.filter(val => val !== fn);
  }
};

// End History Code

// Start Router Code

const router = {
  _currentPath: null,
  _callbacks: [],
  currentPath: function() {
    return this._currentPath;
  },
  go: function(targetPath) {
    // The `resolve` function should be customizable, so we can decide what the
    // new path should be based on external state or whatever.
    return this.resolve(targetPath).then(newPath => {
      const prevPath = this._currentPath;
      this._currentPath = targetPath;
      this._callbacks.forEach(callback =>
        callback(this._currentPath, prevPath)
      );
      return [this._currentPath, prevPath];
    });
  },
  subscribe: function(fn) {
    this._callbacks.push(fn);
  },
  unsubscribe: function(fn) {
    this._callbacks = this._callbacks.filter(val => val !== fn);
  }
};

// End Router Code

// Start Test Code

const log = document.getElementById("app");

const print = message => {
  const el = document.createElement("div");
  el.textContent = message;
  log.appendChild(el);
};

const onRouteChange = (newPath, prevPath) =>
  print(`Route Changed ${prevPath} -> ${newPath}`);

// Setup custom resolve function.
router.resolve = targetPath =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(targetPath);
    }, 1000);
  });

// Subscribe to the router so we can do things when the route changes.
router.subscribe(onRouteChange);

// When a router path changes, we want to push the new path onto history
// if it is different.
router.subscribe(newPath => {
  if (newPath !== history.currentPath()) {
    history.pushState(newPath);
  }
});

// when a history path changes, we want to push the new path onto
// the router if it is different.
history.subscribe(newPath => {
  if (newPath !== router.currentPath()) {
    router.go(newPath);
  }
});

const test = async () => {
  print(`Test: ${history.currentPath() === "/tv-internet"}`);
  print(`Test: ${router.currentPath() === "/tv-internet"}`);

  await router.go("/tv-internet/service-details");

  print(`Test: ${history.currentPath() === "/tv-internet/service-details"}`);
  print(`Test: ${router.currentPath() === "/tv-internet/service-details"}`);

  history.pushState("/tv-internet/service-details/tv");
};

// Grab the currentPath from history and push it onto the router. Then run tests.
router.go(history.currentPath()).then(() => {
  test();
});

// End Test Code
