export type Storages = "localStorage";

export const storageAvailable = (type: Storages = "localStorage") => {
  try {
    const storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    new Error("Storage is not avaliable");
    return false;
  }
};
