import { ReactNode } from "react";
import { Coach, FilterObject, Fitness, Region } from "src/fetcher";
import { TransformedProviderObject } from "src/utils";

export type RegisterFormValues = {
    name: string;
    password: string;
    email: string;
    terms: boolean;
    dataProcessing: boolean;
};

export type LoginFormValues = {
    username: string;
    password: string;
};

export type ForgetPasswordFormValues = {};


export type RegistrationFormProps = {
    buttonText?: string;
    clearAfterSubmit?: boolean;
    formClassName?: string;
    onErrorModal?: () => void;
    onSuccessModal?: () => void;
};

export type SignUpFormProps = {
    toChange: () => void;
    toLogin: () => void;
}

export type LoginFormProps = {
    toChange: () => void;
    toRegister: () => void;
};

export type ChangeFormProps = {
    toLogin: () => void;
    toRegister: () => void;
};

export type HeaderSectionProps = {
    type: "create" | "modify"
}

type ModifyForProviderBase = {
    children: ReactNode;
    newRecord: boolean;
    owner?: string;
}

export type ModifyCoachFormProviderProps = ModifyForProviderBase & {
    defaultValues?: TransformedProviderObject<Coach>;
};
export type ModifyFitnessFormProviderProps = ModifyForProviderBase & {
    defaultValues?: TransformedProviderObject<Fitness>;
};

export type CoachInformationSectionProps = {
    regionOptions: Region[];
    othersOptions: FilterObject[];
    genderOptions: FilterObject[];
    specializationOptions: FilterObject[];
};

export type FitnessInformationSectionProps = {
    regionOptions: Region[];
    generalOptions: FilterObject[];
    othersOptions: FilterObject[];
    equipmentOptions: FilterObject[];
}

export type ModifyCoachFormProps = { type: "coach" } & CoachInformationSectionProps;

export type ModifyFitnessFrormProps = { type: "fitness" } & FitnessInformationSectionProps;

export type SubmitSectionProps = {
    onBackClick: () => void
    submitText: string
}

export type PictureSectionProps = {
    onPictureRemove: (id: string) => void
}

export type ModifySubHeaderProps = {
    headerClass?: string;
    headerText: string;
    paragraphClass?: string;
    paragraphText?: string;
}