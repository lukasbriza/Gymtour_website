type modalType = {
  loading: boolean;
  sucess: boolean | undefined;
  msg: ReactElement<any, any> | undefined;
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

interface checkAuthOfUser {
  token: string;
}
interface checkAuthOfUser {
  username: string;
  password: string;
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
