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

    const { agreement, contact, filters, pictures, _id, name, street, town, region, IN, priceLevel, open } =
        dataCopy ?? {};

    return {
        _id: _id ?? "",
        name: name ?? "",
        street: street ?? "",
        town: town ?? undefined,
        region: region ?? undefined,
        IN: IN ?? undefined,
        priceLevel: priceLevel ?? 1,

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

        terms: agreement?.terms.status ?? false,
        dataProcessingForPropagation: agreement?.dataProcessingForPropagation.status ?? false,
    };
};

const mapFitnessValuesToApi = (
    fitness: Omit<MappedFitnessValues, "cardPicture" | "mainPicture" | "othersPictures"> &
    { owner: string } &
    { pictures: Fitness["pictures"] }
): AddFitnessBody => {
    const {
        name,
        street,
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
        owner
    } = fitness

    return {
        name,
        street,
        town,
        region,
        IN,
        priceLevel,
        contact: {
            email: email ?? "",
            tel: Number(tel) ?? undefined,
            mobile: Number(mobile) ?? undefined,
            web,
            facebook,
            twitter,
            google,
            instagram,
            youtube
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
        owner: owner,
        approved: false,
    }
}

export const fitnessMapper = {
    apiToForm: mapDefaultFitnessValues,
    formToApiNew: mapFitnessValuesToApi
}