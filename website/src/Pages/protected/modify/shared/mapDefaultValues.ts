import { Coach, Fitness } from "src/fetcher/_index";
import { MappedCoachValues, MappedFitnessValues } from "../../_types";

export const mapDefaultFitnessValues = (data: Partial<Fitness>): MappedFitnessValues => {
  const dataCopy = data;

  delete dataCopy.approved;
  delete dataCopy.views;
  delete dataCopy.popularity;
  delete dataCopy.topped;

  const { agreement, contact, filters, pictures, _id, name, street, town, region, IN, priceLevel, open } = dataCopy;

  return {
    _id,
    name,
    street,
    town,
    region,
    IN,
    priceLevel,

    cardPicture: undefined, //pictures?.card,
    mainPicture: undefined, //pictures?.detail.main,
    othersPictures: undefined, //pictures?.detail.others,

    tel: contact?.tel ?? undefined,
    mobile: contact?.mobile ?? undefined,
    email: contact?.email ?? undefined,
    web: contact?.web ?? undefined,
    facebook: contact?.facebook ?? undefined,
    twitter: contact?.twitter ?? undefined,
    google: contact?.google ?? undefined,
    instagram: contact?.instagram ?? undefined,
    youtube: contact?.youtube ?? undefined,

    ...filters,

    terms: agreement?.terms.status ?? false,
    dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
  };
};

export const mapDefaultCoachValues = (data: Partial<Coach>): MappedCoachValues => {
  const dataCopy = data;

  delete dataCopy.approved;
  delete dataCopy.views;
  delete dataCopy.popularity;
  delete dataCopy.topped;

  const {
    agreement,
    contact,
    filters,
    pictures,
    _id,
    name,
    alias,
    workPlace,
    town,
    region,
    street,
    priceLevel,
    descriptionBasic,
    descriptionFull,
  } = dataCopy;

  return {
    _id,
    alias,
    workPlace,
    town,
    region,
    priceLevel,
    descriptionBasic,
    descriptionFull,
    street: street?.split(" ")[0],
    houseNumber: street?.split(" ")[1],
    coachName: name?.split(" ")[0],
    coachSurname: name?.split(" ")[1],
    cardPicture: undefined, //pictures?.card,
    mainPicture: undefined, //pictures?.detail.main,
    othersPictures: undefined, //pictures?.detail.others,

    tel: contact?.tel ?? undefined,
    mobile: contact?.mobile ?? undefined,
    email: contact?.email ?? undefined,
    web: contact?.web ?? undefined,
    facebook: contact?.facebook ?? undefined,
    twitter: contact?.twitter ?? undefined,
    google: contact?.google ?? undefined,
    instagram: contact?.instagram ?? undefined,
    youtube: contact?.youtube ?? undefined,

    ...filters,

    terms: agreement?.terms.status ?? false,
    dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
  };
};
