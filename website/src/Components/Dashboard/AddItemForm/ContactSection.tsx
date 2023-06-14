import { useEffect, useState } from 'react'
import { FormStringInput } from '../../FormStringInput'
//FUNCTIONS//
import { classListMaker } from '../../../utils/classListMaker'
//TEXTS//
import { text } from '../../../config/textSource'

type ErrorObj = {
    Error?: {
        code: string | number;
        name: string;
        message: string;
        trace: string;
        date: Date | string;
    };
}

type inputType = {
    tel: canSubmitType | undefined,
    mobile: canSubmitType | undefined,
    email: canSubmitType | undefined,
    web: canSubmitType | undefined,
    facebook: canSubmitType | undefined,
    twitter: canSubmitType | undefined,
    google: canSubmitType | undefined,
    instagram: canSubmitType | undefined,
    youtube: canSubmitType | undefined
}
type canSubmitType = { canSubmit: boolean, value: string, name: string }

const ContactSection = ({ formId, onChange, onError }: { onError?: (err: ErrorObj[]) => void, formId: string, onChange: (data: inputType) => void }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [inputValue, setInputValue] = useState<inputType>({
        tel: undefined,
        mobile: undefined,
        email: undefined,
        web: undefined,
        facebook: undefined,
        twitter: undefined,
        google: undefined,
        instagram: undefined,
        youtube: undefined
    })
    //////////////////////////////////////////////////
    //VARIABLES//
    const contactSectionClasses = classListMaker(["contactSection"])

    const errorStyle = {
        borderColor: "red",
        borderWidth: "3px"
    }
    const sucessStyle = {
        borderColor: "rgb(0, 180, 0)",
        borderWidth: "3px"
    }

    //////////////////////////////////////////////////
    //INPUT PROPS//
    const telephoneProps = {
        className: 'telephoneInput',
        type: 'tel',
        name: 'telephoneInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder2.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, tel: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 9,
        maxLength: 9,
        required: false,
        pattern: '^[0-9]+$'
    }
    const mobilProps = {
        className: 'mobilInput',
        type: 'tel',
        name: 'mobilInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder3.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, mobile: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 9,
        maxLength: 9,
        required: false,
        pattern: '[^0-9]+$'
    }

    const emailProps = {
        className: 'emailInput',
        type: "email",
        name: "emailInput",
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder1.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, email: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: true
    }

    const webProps = {
        className: 'webInput',
        type: 'text',
        name: 'webInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder4.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, web: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }
    const facebookProps = {
        className: 'facebookInput',
        type: 'text',
        name: 'facebookInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder5.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, facebook: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }
    const twitterProps = {
        className: 'twitterInput',
        type: 'text',
        name: 'twitterInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder6.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, twitter: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }

    const googleProps = {
        className: 'googleInput',
        type: 'text',
        name: 'googleInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder7.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, google: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }

    const instagramProps = {
        className: 'instagramInput',
        type: 'text',
        name: 'instagramInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder8.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, instagram: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }
    const youtubeProps = {
        className: 'youtubeInput',
        type: 'text',
        name: 'youtubeInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.ContactSection.placeholder9.cz,
        onChange: (canSubmit: canSubmitType) => { setInputValue((value) => ({ ...value, youtube: canSubmit.value.length === 0 ? undefined : canSubmit })); onChange(inputValue) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false
    }

    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <section className={contactSectionClasses}>
            <div className="headerWrapper">
                <h2>{text.dahboard.AddItem.FitnessForm.ContactSection.header.cz}</h2>
            </div>
            <section className="contactSectionWrapper">
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p1.cz}</p>
                    <FormStringInput {...emailProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p2.cz}</p>
                    <FormStringInput {...telephoneProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p3.cz}</p>
                    <FormStringInput {...mobilProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p4.cz}</p>
                    <FormStringInput {...webProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p5.cz}</p>
                    <FormStringInput {...facebookProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p6.cz}</p>
                    <FormStringInput {...twitterProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p7.cz}</p>
                    <FormStringInput {...googleProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p8.cz}</p>
                    <FormStringInput {...instagramProps} />
                </div>
                <div className="contactInputWrapper">
                    <p>{text.dahboard.AddItem.FitnessForm.ContactSection.p9.cz}</p>
                    <FormStringInput {...youtubeProps} />
                </div>
            </section>
        </section>
    )
}

export { ContactSection }