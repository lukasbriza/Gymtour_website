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
