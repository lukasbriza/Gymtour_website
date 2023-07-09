import { Coach, Fitness } from "src/fetcher/_index";
import { MappedCoachValues } from "../../_types";

export const mapDefaultFitnessValues = (data: Partial<Fitness>) => {};

export const mapDefaultCoachValues = (
  data: Partial<Coach>
): MappedCoachValues => {
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
    name,
    alias,
    workPlace,
    town,
    region,
    street,
    priceLevel,
    descriptionBasic,
    descriptionFull,

    cardPicture: pictures?.card,
    mainPicture: pictures?.detail.main,
    othersPictures: pictures?.detail.others,

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
    dataProcessingForPropagation:
      agreement?.dataProcessingForPropagation.status ?? false,
  };
};
