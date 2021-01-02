export const location = {
  get pathname() {
    return localStorage.getItem("history.current_path");
  }
};
