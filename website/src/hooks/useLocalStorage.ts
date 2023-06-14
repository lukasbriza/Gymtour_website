export const useLocalStorage = () => {
  const setLocal = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  const getLocal = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? value : undefined;
  };
  const removeLocal = (key: string) => {
    localStorage.removeItem(key);
  };

  return { getLocal, setLocal, removeLocal };
};
