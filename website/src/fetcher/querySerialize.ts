export const querySerialize = (obj: object) => {
  const serialized = Object.entries(obj)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=[${value}]`;
      }
      return `${key}=${value}`;
    })
    .join("&");
  return serialized;
};
