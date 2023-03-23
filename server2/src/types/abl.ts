import { ObjectId } from "mongodb";

export type GetFilterType = undefined;
export type Filter = { [x: string]: unknown };

export type GetCoachType = {
  limit?: string;
  order?: string;
  regions?: string;
  gender?: string;
  specialization?: string;
  projection?: string;
};

export type FilterQueryParsed = {
  [key: string]: number[] | [number, number[]][];
};

export type AddCoachType = Coach;

export type RemoveCoachType = {
  id: string | string[];
};

export type Contact = {
  tel: number | null;
  mobile: number | null;
  email: string;
  web: string | null;
  facebook: string | null;
  twitter: string | null;
  google: string | null;
  instagram: string | null;
  youtube: string | null;
};

export type CoachFilter = {
  gender: string;
  specialization: string[];
  others: string[] | [];
};

export type CoachPictures = {
  card: string;
  detail: { main: string; others: string[] | [] };
};

export type Coach = {
  _id?: ObjectId;
  name: string;
  alias: string | null;
  workPlace: string;
  town: number;
  region: number;
  street: string;
  priceLevel: number;
  contact: Contact;
  filters: CoachFilter;
  descriptionBasic: string | "No description.";
  descriptionFull: string | null;
  pictures: CoachPictures;
  agreement: {
    terms: { status: boolean; awarded: Date };
    dataProcessingForPropagation: { status: boolean; awarded: Date };
  };
  owner: string;
  topped: {
    vlaue: boolean;
    toDate: Date | null;
  };
  approved: boolean;
  views: number;
  popularity: string[] | [];
};

export type User = {
  _id?: ObjectId;
  username: string;
  password: string;
  email: string;
  emailUpdate: {
    value: string | null;
    validTo: Date;
  };
  fitnessOwned: { fitnessId: string }[] | [];
  coachOwned: { coachId: string }[] | [];
  isAdmin: boolean;
  agreement: {
    terms: { status: boolean; awarded: Date };
    dataProcessingForPropagation: { status: boolean; awarded: Date };
  };
};

export type GetFitnessType = {
  limit?: string;
  order?: string;
  regions?: string;
  equipment?: string;
  general?: string;
  others?: string;
  projection?: string;
};

export type FitnessFilter = {
  equipment: string[];
  general: string[] | [];
  others: string[] | [];
};

type OpenHours = {
  mon: { from: number | null; to: number | null };
  tue: { from: number | null; to: number | null };
  wed: { from: number | null; to: number | null };
  thu: { from: number | null; to: number | null };
  fri: { from: number | null; to: number | null };
  sat: { from: number | null; to: number | null };
  sun: { from: number | null; to: number | null };
};

export type Fitness = {
  _id?: ObjectId;
  name: string;
  street: string;
  town: number;
  region: number;
  IN: number;
  priceLevel: number;
  contact: Contact;
  filters: FitnessFilter;
  open: OpenHours;
  descriptionBasic: string;
  descriptionFull: string | null;
  pictures: {
    card: string;
    detail: {
      main: string;
      others: string[] | [];
    };
  };
  agreement: {
    terms: { status: boolean; awarded: Date };
    dataProcessingForPropagation: { status: boolean; awarded: Date };
  };
  owner: string;
  topped: {
    value: boolean;
    toDate: Date | null;
  };
  approved: boolean;
  views: number;
  popularity: string[] | [];
};

export type AddFitnessType = Fitness;

export type RemoveFitnessType = {
  id: string[] | string;
};

export type ImageObject = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  id: ObjectId;
  filename: string;
  metadata: null | string;
  bucketName: string;
  chunkSize: number;
  size: number;
  md5?: string;
  uploadDate: Date;
  contentType: string;
};

export type ImageFieldsObject = {
  card: ImageObject[] | [];
  main: ImageObject[] | [];
  others: ImageObject[] | [];
};

export type RemoveImageType = {
  ids: string[];
};

export type GetImageType = {
  id: string;
};

export type GetUserType = {
  id: string;
};
