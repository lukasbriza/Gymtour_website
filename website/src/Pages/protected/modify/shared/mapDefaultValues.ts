import { Coach, Fitness } from "src/fetcher/_index";
import { MappedCoachValues, MappedFitnessValues, TransformedProviderObject } from "../../_types";

export const mapDefaultFitnessValues = (data?: TransformedProviderObject<Fitness>): MappedFitnessValues => {
  const dataCopy = data;

  if (dataCopy?.approved) {
    delete dataCopy.approved;
  }
  if (dataCopy?.views) {
    delete dataCopy.views;
  }
  if (dataCopy?.popularity) {
    delete dataCopy.popularity;
  }
  if (dataCopy?.topped) {
    delete dataCopy.topped;
  }

  const { agreement, contact, filters, pictures, _id, name, street, town, region, IN, priceLevel, open } =
    dataCopy ?? {};

  return {
    _id: _id ?? undefined,
    name: name ?? undefined,
    street: street ?? undefined,
    town: town ?? undefined,
    region: region ?? undefined,
    IN: IN ?? undefined,
    priceLevel: priceLevel ?? undefined,

    cardPicture: pictures ? pictures?.card : undefined,
    mainPicture: pictures ? pictures?.detail.main : undefined,
    othersPictures: pictures ? pictures?.detail.others : undefined,

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
    ...open,

    terms: agreement?.terms.status ?? false,
    dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
  };
};

export const mapDefaultCoachValues = (data?: TransformedProviderObject<Coach>): MappedCoachValues => {
  const dataCopy = data;

  if (dataCopy?.approved) {
    delete dataCopy.approved;
  }
  if (dataCopy?.views) {
    delete dataCopy.views;
  }
  if (dataCopy?.popularity) {
    delete dataCopy.popularity;
  }
  if (dataCopy?.topped) {
    delete dataCopy.topped;
  }

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
  } = dataCopy ?? {};

  return {
    _id: _id ?? undefined,
    alias: alias ?? undefined,
    workPlace: workPlace ?? undefined,
    town: town ?? undefined,
    region: region ?? undefined,
    priceLevel: priceLevel ?? undefined,
    descriptionBasic: descriptionBasic ?? undefined,
    descriptionFull: descriptionFull ?? undefined,
    street: street ? street?.split(" ")[0] : undefined,
    houseNumber: street ? street?.split(" ")[1] : undefined,
    coachName: name ? name?.split(" ")[0] : undefined,
    coachSurname: name ? name?.split(" ")[1] : undefined,
    cardPicture: pictures ? pictures?.card : undefined,
    mainPicture: pictures ? pictures?.detail.main : undefined,
    othersPictures: pictures ? pictures?.detail.others : undefined,

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
