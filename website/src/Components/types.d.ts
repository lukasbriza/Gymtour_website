//GLOBAL TYPES//
type MenuOffer = {
  className: string;
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

type Hamburger = {
  className: string;
  isActive: () => void;
  show: boolean;
  hamburger: boolean | undefined;
};

type SmallLogo = {
  className: string;
  scale: number;
};

type SmallText = {
  className: string;
  scale: number;
};

type MenuLayer = {
  offer: { name: string; path: string; component: any }[];
  show: boolean | undefined;
};

type BigLogo = {
  id: string;
  className?: string;
  scale: number;
  ref: any;
};

type BigText = {
  id: string;
  className?: string;
  scale: number;
  ref: any;
};

type Circle = {
  scale: number;
  strokecolor: string;
  strokewidth: number;
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
  avoidFilterType?: string[
    | "regions"
    | "equipment"
    | "general"
    | "others"
    | "gender"
    | "specialization"
    | "order"];
};
type filterHeader = {
  title: string;
  onClick: () => void;
};
type filterType = {
  type:
    | "regions"
    | "equipment"
    | "general"
    | "others"
    | "gender"
    | "specialization"
    | "order";
  data: any;
};

type filterSection = {
  filterType:
    | "regions"
    | "equipment"
    | "general"
    | "others"
    | "gender"
    | "specialization"
    | "order";
  header: string;
  data: any;
  key?: number;
};

type dataTypeSearch = {
  type:
    | "regions"
    | "equipment"
    | "general"
    | "others"
    | "gender"
    | "specialization"
    | "order";
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
  callback: () => void;
  clearForm: () => void;
};

type formStringInputProps = {
  className: string;
  type: string;
  name: string;
  formId: string;
  placeholder: string;
  onChange?: (canSubmit: {
    canSubmit: boolean;
    value: string;
    name: string;
  }) => void;
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
    type: "coach" | "fitness";
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

interface feResponseObj {
  data: any;
  errorMap: {
    Error: {
      code: string | number;
      name: string;
      message: string;
      trace: string;
      date: Date | string;
    };
  }[];
}
