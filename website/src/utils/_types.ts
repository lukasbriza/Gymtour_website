import { Coach, Fitness } from "src/fetcher/_index";

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

    tel?: number;
    mobile?: number;
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

} & Partial<
    Omit<Fitness, "contact" | "filters" | "pictures" | "agreement" | "topped" | "approved" | "views" | "popularity">
>;

export type MappedCoachValues = {
    coachName?: string;
    coachSurname?: string;
    houseNumber?: string;

    cardPicture?: File;
    mainPicture?: File;
    othersPictures?: File[];

    tel?: number;
    mobile?: number;
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