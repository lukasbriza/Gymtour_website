const setLocal = (key: string, value: string) => {
  localStorage.setItem(key, value);
  return localStorage.getItem(key);
};
const getLocal = (key: string) => {
  return localStorage.getItem(key);
};

const removeLocal = (key: string) => {
  localStorage.removeItem(key);
};

export { setLocal, getLocal, removeLocal };
