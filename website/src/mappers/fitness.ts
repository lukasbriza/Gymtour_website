import { AddFitnessBody, Fitness } from "src/fetcher";
import { MappedFitnessValues, TransformedProviderObject, emptyStringToNull } from "src/utils";

const mapDefaultFitnessValues = (data?: TransformedProviderObject<Fitness>): MappedFitnessValues => {
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

    const { agreement, contact, filters, pictures, _id, name, street, town, region, IN, priceLevel, open, descriptionFull, pictureIds } =
        dataCopy ?? {};

    return {
        _id: _id ?? "",
        name: name ?? "",
        street: street?.split(" ")[0] ?? "",
        houseNumber: street?.split(" ")[1] ?? "",
        town: town ?? undefined,
        region: region ?? undefined,
        IN: IN ?? undefined,
        priceLevel: priceLevel ?? 1,

        cardPicture: pictures?.card ? pictures?.card : undefined,
        mainPicture: pictures?.detail.main ? pictures?.detail.main : undefined,
        othersPictures: pictures?.detail.others ? pictures?.detail.others : [],
        pictureIds,

        tel: contact?.tel ? String(contact?.tel) : "",
        mobile: contact?.mobile ? String(contact?.mobile) : "",
        email: contact?.email ?? "",
        web: contact?.web ?? "",
        facebook: contact?.facebook ?? "",
        twitter: contact?.twitter ?? "",
        google: contact?.google ?? "",
        instagram: contact?.instagram ?? "",
        youtube: contact?.youtube ?? "",

        open: {
            mon: { from: open?.mon.from ?? undefined, to: open?.mon.to ?? undefined },
            tue: { from: open?.tue.from ?? undefined, to: open?.tue.to ?? undefined },
            wed: { from: open?.wed.from ?? undefined, to: open?.wed.to ?? undefined },
            thu: { from: open?.thu.from ?? undefined, to: open?.thu.to ?? undefined },
            fri: { from: open?.fri.from ?? undefined, to: open?.fri.to ?? undefined },
            sat: { from: open?.sat.from ?? undefined, to: open?.sat.to ?? undefined },
            sun: { from: open?.sun.from ?? undefined, to: open?.sun.to ?? undefined }
        },

        equipment: filters?.equipment ?? [],
        general: filters?.general ?? [],
        others: filters?.others ?? [],

        descriptionFull,

        terms: agreement?.terms.status ?? false,
        dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
    };
};

const mapFitnessValuesToApi = (
    fitness: Omit<MappedFitnessValues, "cardPicture" | "mainPicture" | "othersPictures"> &
    { pictures: Fitness["pictures"] }
): AddFitnessBody => {
    const {
        name,
        street,
        houseNumber,
        town,
        region,
        IN,
        priceLevel,
        email,
        tel,
        mobile,
        web,
        facebook,
        twitter,
        google,
        instagram,
        youtube,
        equipment,
        general,
        others,
        open,
        descriptionFull,
        terms,
        dataProcessingForPropagation,
        pictures,
        owner,
        _id
    } = fitness
    return {
        _id: emptyStringToNull(_id) ?? undefined,
        owner: emptyStringToNull(owner) ?? undefined,
        name,
        street: houseNumber && street ? `${street} ${houseNumber}` : street,
        town,
        region,
        IN: emptyStringToNull(IN) ?? undefined,
        priceLevel,
        pictures,
        contact: {
            email: email ?? "",
            tel: typeof emptyStringToNull(tel) === "string" ? Number(tel) : null,
            mobile: typeof emptyStringToNull(mobile) === "string" ? Number(tel) : null,
            web: emptyStringToNull(web),
            facebook: emptyStringToNull(facebook),
            twitter: emptyStringToNull(twitter),
            google: emptyStringToNull(google),
            instagram: emptyStringToNull(instagram),
            youtube: emptyStringToNull(youtube)
        },
        filters: {
            equipment: equipment ?? [],
            general: general ?? [],
            others: others ?? []
        },
        open: {
            mon: { from: emptyStringToNull(open.mon.from), to: emptyStringToNull(open.mon.to) },
            tue: { from: emptyStringToNull(open.tue.from), to: emptyStringToNull(open.tue.to) },
            wed: { from: emptyStringToNull(open.wed.from), to: emptyStringToNull(open.wed.to) },
            thu: { from: emptyStringToNull(open.thu.from), to: emptyStringToNull(open.thu.to) },
            fri: { from: emptyStringToNull(open.fri.from), to: emptyStringToNull(open.fri.to) },
            sat: { from: emptyStringToNull(open.sat.from), to: emptyStringToNull(open.sat.to) },
            sun: { from: emptyStringToNull(open.sun.from), to: emptyStringToNull(open.sun.to) }
        },
        descriptionFull,
        agreement: {
            terms: { status: terms ?? false, awarded: new Date() },
            dataProcessingForPropagation: { status: dataProcessingForPropagation ?? false, awarded: new Date() }
        },
    }
}

export const fitnessMapper = {
    apiToForm: mapDefaultFitnessValues,
    formToApi: mapFitnessValuesToApi
}