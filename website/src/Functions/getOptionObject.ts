class getOptionObject {
  returnObj: RequestInit;
  constructor() {
    this.returnObj = {
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    };
  }
  setMethod(method: "GET" | "POST" | "PUT" | "DELETE") {
    if (this.returnObj.method === undefined) {
      this.returnObj.method = method;
      return this;
    } else {
      throw new Error("Method is already assigned!");
    }
  }

  addBody(data: object) {
    if (this.returnObj.method !== undefined) {
      this.returnObj.body = JSON.stringify(data);
      return this;
    } else {
      throw new Error("Define method first!");
    }
  }

  get() {
    return this.returnObj;
  }
}

export { getOptionObject };
