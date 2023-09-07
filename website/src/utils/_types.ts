import { Coach, Fitness } from "src/fetcher";

export type TransformedProviderObject<T> = Omit<Partial<T>, "pictures"> & {
    pictures: { card: File; detail: { main: File; others: File[] } };
};

export type CustomErrorResponseObject<T> = {
    data: null | T;
    errorMap: unknown[];
};

export type MappedFitnessValues = {
    cardPicture?: File;
    mainPicture?: File;
    othersPictures?: File[];

    tel?: string;
    mobile?: string;
    email?: string;
    web?: string;
    facebook?: string;
    twitter?: string;
    google?: string;
    instagram?: string;
    youtube?: string;

    terms?: boolean;
    dataProcessingForPropagation?: boolean;

    equipment?: string[];
    general?: string[];
    others?: string[];

    open: {
        mon: { from?: string, to?: string },
        tue: { from?: string, to?: string },
        wed: { from?: string, to?: string },
        thu: { from?: string, to?: string },
        fri: { from?: string, to?: string },
        sat: { from?: string, to?: string },
        sun: { from?: string, to?: string }
    },

} & Partial<
    Omit<Fitness, "contact" | "filters" | "pictures" | "agreement" | "topped" | "approved" | "views" | "popularity" | "open" | "owner">
>;

export type MappedCoachValues = {
    coachName?: string;
    coachSurname?: string;
    houseNumber?: string;

    cardPicture?: File;
    mainPicture?: File;
    othersPictures?: File[];

    tel?: string;
    mobile?: string;
    email?: string;
    web?: string;
    facebook?: string;
    twitter?: string;
    google?: string;
    instagram?: string;
    youtube?: string;

    gender?: string;
    specialization?: string[];
    others?: string[];

    terms?: boolean;
    dataProcessingForPropagation?: boolean;
} & Partial<
    Omit<
        Coach,
        "name" | "contact" | "filters" | "pictures" | "agreement" | "topped" | "approved" | "views" | "popularity"
    >
>;