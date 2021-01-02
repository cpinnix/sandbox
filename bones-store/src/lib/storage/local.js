export function createStorage(key) {
  function set(value) {
    // `localStorage` calls are technically synchronous but
    // other storage solutions may be asynchronous, so provide
    // an asynchronous interface to `localStorage` to match.
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (e) {
        console.error(`Failed to set ${key} to ${value}`);
        console.error(e);
        reject(e);
      }
    });
  }

  function get() {
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(localStorage.getItem(key)));
      } catch (e) {
        console.error(`Failed to get ${key}`);
        console.error(e);
        reject(e);
      }
    });
  }

  function remove() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(key);
        resolve();
      } catch (e) {
        console.error(`Failed to remove ${key}`);
        console.error(e);
        reject(e);
      }
    });
  }

  return {
    set,
    get,
    remove
  };
}
