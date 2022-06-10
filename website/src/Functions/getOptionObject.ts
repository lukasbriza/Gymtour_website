class getOptionObject {
  static returnObj: RequestInit = {
    mode: "cors",
    headers: { Accept: "application/json" },
  };

  setMethod(method: "GET" | "POST" | "PUT" | "DELETE") {
    if (getOptionObject.returnObj.method === undefined) {
      getOptionObject.returnObj.method = method;
      return this;
    } else {
      throw new Error("Method is already assigned!");
    }
  }

  addBody(data: object) {
    if (getOptionObject.returnObj.method !== undefined) {
      getOptionObject.returnObj.body = JSON.stringify(data);
      return this;
    } else {
      throw new Error("Define method first!");
    }
  }

  get() {
    return getOptionObject.returnObj;
  }
}

export { getOptionObject };
