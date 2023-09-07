import { Coach } from "src/fetcher";
import { MappedCoachValues, TransformedProviderObject } from "src/utils";

const mapDefaultCoachValues = (data?: TransformedProviderObject<Coach>): MappedCoachValues => {
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
        descriptionFull,
    } = dataCopy ?? {};

    return {
        _id: _id ?? "",
        alias: alias ?? "",
        workPlace: workPlace ?? "",
        town: town ?? undefined,
        region: region ?? undefined,
        priceLevel: priceLevel ?? 1,
        descriptionFull: descriptionFull ?? "",
        street: street ? street?.split(" ")[0] : "",
        houseNumber: street ? street?.split(" ")[1] : "",
        coachName: name ? name?.split(" ")[0] : "",
        coachSurname: name ? name?.split(" ")[1] : "",
        cardPicture: pictures?.card ? pictures?.card : undefined,
        mainPicture: pictures?.detail.main ? pictures?.detail.main : undefined,
        othersPictures: pictures?.detail.others ? pictures?.detail.others : [],

        tel: contact?.tel ? String(contact?.tel) : "",
        mobile: contact?.mobile ? String(contact?.mobile) : "",
        email: contact?.email ?? "",
        web: contact?.web ?? "",
        facebook: contact?.facebook ?? "",
        twitter: contact?.twitter ?? "",
        google: contact?.google ?? "",
        instagram: contact?.instagram ?? "",
        youtube: contact?.youtube ?? "",

        gender: filters?.gender ?? "",
        specialization: filters?.specialization ?? [],
        others: filters?.others ?? [],

        terms: agreement?.terms.status ?? false,
        dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
    };
};

const mapCoachvaluesToApi = () => { }

export const coachMapper = {
    apiToForm: mapDefaultCoachValues,
    formToApi: mapCoachvaluesToApi
}