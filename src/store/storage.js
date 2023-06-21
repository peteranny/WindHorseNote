const key = "@@State";

export const loadData = () => localStorage.getItem(key);

export const loadState = () => {
  const data = loadData();
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveState = (state) => {
  const data = JSON.stringify(state);
  localStorage.setItem(key, data);
};

export const stateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  saveState(state);
  return result;
};
