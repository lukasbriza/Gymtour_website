export const constructUpdatePath = (obj: object) => {
  const returnValue = {};
  return recursiveCall(obj, "", returnValue);
};

const recursiveCall = (src, path: string, returnValue: object) => {
  const modifyObj = returnValue;
  for (const key in src) {
    let recursivePath = path;
    recursivePath += key;
    if (typeof src[key] === "object" && !Array.isArray(src[key])) {
      recursivePath += ".";
      recursiveCall(src[key], recursivePath, returnValue);
      continue;
    }
    modifyObj[recursivePath] = src[key];
  }
  return modifyObj;
};
