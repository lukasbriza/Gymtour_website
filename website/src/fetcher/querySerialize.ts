export const querySerialize = (obj: object) => {
  let query = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      query = query.length === 0 ? `${key}=${toStringArray(value)}` : query + `&${key}=${toStringArray(value)}`;
      return;
    } else {
      query = query.length === 0 ? `${key}=${value}` : query + `&${key}=${value}`;
      return;
    }
  });
  return query;
};

const toStringArray = (arr: any[]): any => {
  return arr.map((value) => {
    if (Array.isArray(value)) {
      return `[${toStringArray(value)}]`;
    }
    return `${String(value)}`;
  });
};
