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
