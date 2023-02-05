//GLOBAL TYPES//

type SmallLogo = {
  className: string;
  scale: number;
};

type SmallText = {
  className: string;
  scale: number;
};

type BigText = {
  id: string;
  className?: string;
  scale: number;
  ref: any;
};

type Underliner = {
  id?: string;
  width: string;
  color?: string;
};

type registerUserData = {
  username: string;
  password: string;
  email: string;
  terms: boolean;
  dataProcessing: boolean;
};

type modalType = {
  loading: boolean;
  sucess: boolean | undefined;
  msg: ReactElement<any, any> | undefined;
};

type registerFetchResult = {
  data: object | null;
  errorMap: object[] | [];
};

type errorMapObj = {
  Error: {
    code: number;
    name: string;
    message: string;
    trace: string;
    date: string;
  };
};

type contentFilter = {
  open: boolean;
  avoidFilterType?: string["regions" | "equipment" | "general" | "others" | "gender" | "specialization" | "order"];
};
type filterHeader = {
  title: string;
  onClick: () => void;
};
type filterType = {
  type: "regions" | "equipment" | "general" | "others" | "gender" | "specialization" | "order";
  data: any;
};

type filterSection = {
  filterType: "regions" | "equipment" | "general" | "others" | "gender" | "specialization" | "order";
  header: string;
  data: any;
  key?: number;
};

type dataTypeSearch = {
  type: "regions" | "equipment" | "general" | "others" | "gender" | "specialization" | "order";
  region?: string;
  code?: string;
  town?: { code: string; checked: boolean };
  checked?: boolean;
};
type searchFitnessData = {
  order: number;
  general: any[];
  equipment: any[];
  others: any[];
  regions: any[];
};

type searchCoachData = {
  order: number;
  others: any[];
  regions: any[];
  specialization: any[];
  gender: any[];
};

type formModalProps = {
  loading: boolean;
  sucess: boolean | undefined;
  msg: undefined | SetStateAction<Element>;
  buttonMsg?: string;
  callbackTiming?: number;
  callback: () => void;
  clearForm: () => void;
};

type formStringInputProps = {
  className: string;
  type: string;
  name: string;
  formId: string;
  placeholder: string;
  onChange: (canSubmit: { canSubmit: boolean; value: string; name: string }) => void;
  required: boolean;
  pattern?: any;
  errorMessage: string;
  errorStyle: React.StyleProperties;
  sucessStyle: React.StyleProperties;
  maxLength?: number;
  minLength?: number;
};

type getImgData = {
  id: string;
};

type updateViewsData = {
  updateViews: {
    type: "/coach" | "/fitness";
    _id: string;
  };
};

interface filteredData {
  _id: string;
  name: string;
  pictures: {
    detail: {
      main: string;
      others: string[];
    };
    card: string;
  };
  owner: string;
  views: number;
  topped: { value: boolean; toDate: null | Date };
  popularity: any[];
}

interface filterFetchQuery {
  get: {
    query: any;
    projection: string[];
    options: {
      skip: number;
    };
    limit: number;
    order: number;
  };
}

interface feResponseObj<T> {
  data: T | null;
  errorMap: {
    Error?: {
      code: string | number;
      name: string;
      message: string;
      trace: string;
      date: Date | string;
    };
  }[];
}

interface checkAuthOfUser {
  token: string;
}
interface loginUser {
  username: string;
  password: string;
}
interface userInformation extends checkAuthOfUser {
  id: string;
}

interface getFilterData_FetchCall {
  _id: string;
  regions: {
    name: { cz: string; eng: string };
    code: string;
    towns?: { code: string; name: { cz: string; eng: string } }[];
  }[];
  equipment: {
    name: { cz: string; eng: string };
    code: string;
  }[];
  gender: {
    name: { cz: string; eng: string };
    code: string;
  }[];
  general: {
    name: { cz: string; eng: string };
    code: string;
  }[];
  others: {
    name: { cz: string; eng: string };
    code: string;
  }[];
  specialization: {
    name: { cz: string; eng: string };
    code: string;
  }[];
}

interface registerUser_FetchCall {
  registered: boolean;
  email: string;
}

interface checkAuthOfUser_FetchCall {
  authenticated: boolean;
  tokenExpired: boolean;
  userData: {
    username: string;
    isAdmin: boolean;
    userId: string;
    iat: number;
    exp: number;
  };
}

interface loginUser_FetchCall {
  authenticated: boolean;
  token: string;
  userId: string;
}
interface getUserInformation_FetchCall {
  agreement: {
    terms: { awarded: string; status: boolean };
    dataProcessingForPropagation: { awarded: string; status: boolean };
  };
  _id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  fitnessOwned: string[] | [];
  coachOwned: string[] | [];
}

interface getViews_FetchCall {
  _id: string;
  views: number;
}

interface updateViews_FetchCall {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null | string;
  upsertedCount: number;
  matchedCount: number;
}

interface changeUserInformation_FetchCall {
  updated: boolean;
}

interface emailApprove_FetchCall {
  approved: boolean;
  changeMade: boolean;
}

interface userObjectType {
  _id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  fitnessOwned: string[];
  coachOwned: string[];
  agreement: {
    terms: {
      awarded: string | Date;
      status: boolean;
    };
    dataProcessingForPropagation: {
      awarded: string | Date;
      status: boolean;
    };
  };
}

interface changeInformation {
  type: "password" | "username" | "email";
  _id: string;
  value: string;
  token: string;
}

interface emailApprove {
  token: string;
}
