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

  addHeader(key: any, value: string) {
    const obj = { [key]: "Bearer " + value };
    const headerObj: any = this.returnObj.headers;
    const newHeaderObj = Object.assign(headerObj, obj);
    this.returnObj.headers = newHeaderObj;
    console.log(this.returnObj);
    return this;
  }

  get() {
    return this.returnObj;
  }
}

export { getOptionObject };
