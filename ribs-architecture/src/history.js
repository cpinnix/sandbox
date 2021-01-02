export const history = {
  pushState: path => {
    localStorage.setItem("history.current_path", path);
  }
};
