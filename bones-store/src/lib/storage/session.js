export function createStorage(key) {
  function set(value) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(value));
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
        resolve(JSON.parse(sessionStorage.getItem(key)));
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
        sessionStorage.removeItem(key);
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
