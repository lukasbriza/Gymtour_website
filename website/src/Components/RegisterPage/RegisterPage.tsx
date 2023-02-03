import { Layer, Underliner, StringInput } from "@components"
import clsx from "clsx"
import { FC } from "react"
import { text } from "src/config/textSource"
import fetchAgent from "src/utils/fetchAgent"
import { FormStringInput } from "../FormStringInput"
import { Link } from "react-router-dom"
import { routes } from "@config"
import { FormModal } from "../FormModal"
import registerImg from '@assets/register.webp'
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { formValidationSchema } from "./RegisterPage.validation"
import { RegisterFormValues } from "./_types"

export const RegisterPage: FC = () => {
    const { t } = useTranslation()
    const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            password: "",
            email: "",
            terms: false,
            dataProcessing: false
        },
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: formValidationSchema(t)
    })

    const errorStyle = {
        borderColor: "red",
        borderWidth: "3px"
    }
    const sucessStyle = {
        borderColor: "rgb(0, 180, 0)",
        borderWidth: "3px"
    }

    const onSubmit = (values: RegisterFormValues) => { }
    /*
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        let inputErrorHtml = (
            <div className="modalErrorObj">
                <p className="modalErrorHeader">{"409- InputError"}</p>
                <p className="modalErrorContent">{text.crossroad.RegisterPage.Form.modal.invalidInputs.cz}</p>
            </div>
        )
        let termErrorHtml = (
            <div className="modalErrorObj">
                <p className="modalErrorHeader">{"409- InputError"}</p>
                <p className="modalErrorContent">{text.crossroad.RegisterPage.Form.modal.invalidTerms.cz}</p>
            </div>
        )

        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })

        //CONTROL IF INPUTS ARE VALID//
        if (
            name.canSubmit === false ||
            password.canSubmit === false ||
            email.canSubmit === false
        ) {
            //SHOW MODAL, STOP LOADING ANIMATION, SHOW MESSAGES//
            showModal({ loading: false, sucess: false, msg: inputErrorHtml })
            console.log(modal)
            return
        }
        if (terms === false || dataProcessing === false) {
            //SHOW MODAL, STOP LOADING ANIMATION, SHOW MESSAGES//
            showModal({ loading: false, sucess: false, msg: termErrorHtml })
            console.log(modal)
            return
        }
        //FETCH DATA AND WAIT FOR RESULT//
        const fetchResult: any = await fetchAgent.registerUser({
            username: name.value,
            password: password.value,
            email: email.value,
            terms: terms,
            dataProcessing: dataProcessing
        })
        //HANDLE FETCH ERROR MAP ARRAY//
        if (fetchResult.errorMap.length > 0) {
            let msgText = fetchResult.errorMap.map((obj: errorMapObj, index: number) => {
                const errorHtml = (
                    <div className="modalErrorObj" key={index}>
                        <p className="modalErrorHeader" key={index + "a"}>{obj.Error.code + "- " + obj.Error.name}</p>
                        <p className="modalErrorContent" key={index + "b"}>{obj.Error.message}</p>
                    </div>
                )
                return errorHtml;
            })
            showModal({ loading: false, sucess: false, msg: msgText })
            return
        }
        //HANDLE FETCH DATA//
        if (fetchResult.errorMap.length === 0 && fetchResult.data !== null) {
            const msgHtml = (
                [<div className="modalSucessObj" key="1">
                    <p className="modalSucessContent" key="2">{text.crossroad.RegisterPage.Form.modal.sucessMsg.cz}</p>
                </div>]
            )
            showModal({ loading: false, sucess: true, msg: msgHtml })
            return
        }

    }
    const handleChange = (input: { canSubmit: boolean, value: string, name: string }) => {
        switch (input.name) {
            case 'nameInput':
                setName({ canSubmit: input.canSubmit, value: input.value })
                break
            case 'passwordInput':
                setPassword({ canSubmit: input.canSubmit, value: input.value })
                break
            case 'emailInput':
                setEmail({ canSubmit: input.canSubmit, value: input.value })
                break
        }

    }
    const handleModalDefault = () => {
        showModal({ loading: false, sucess: undefined, msg: undefined })
    }*/
    const clearForm = () => reset()

    return (
        <section
            id="RegisterSection"
            className={clsx(["stretchX", "stretchVH", "relative", "RegisterSection"])}
        >
            <img src={registerImg} alt="RegisterBckgImg" />
            <Layer className={clsx(["stretchY", "stretchX"])}>
                <div className={clsx(["centerX", "relative", "registerHeaderWrapper"])}>
                    <h2>{text.crossroad.RegisterPage.Header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <div className={clsx(["registerParagraph", "relative", "centerX"])}>
                    {text.crossroad.RegisterPage.Paragraph.cz}
                </div>
                <div className={clsx(["registerFormWrapper", "centerX", "relative"])}>
                    <form action="#RegisterSection" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                        <StringInput
                            className={"input1"}
                            label={t("common.name")}
                            control={control}
                            isError={errors.name !== undefined}
                            name={"name"}
                        />
                        <StringInput
                            className={"input2"}
                            label={t("common.password")}
                            control={control}
                            isError={errors.password !== undefined}
                            name={"password"}
                        />
                        <StringInput
                            className={"input3"}
                            label={t("common.email")}
                            control={control}
                            isError={errors.email !== undefined}
                            name={"email"}
                        />
                        <div className={clsx(["formTerms relative centerX"])}>
                            {/*<div>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    id="termsRegistration"
                                    name="termsRegistration"
                                    onClick={() => setTerms(!terms)}
                                />
                                <label htmlFor="termsRegistration">
                                    <Link to={routes.businessConditions.path} className={"link"}>
                                        {text.crossroad.RegisterPage.Form.checkbox1.label.cz}
                                    </Link>
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    id="dataprocessingRegistration"
                                    name="dataprocessingRegistration"
                                    onClick={() => setDataProcessing(!dataProcessing)}
                                />
                                <label htmlFor="dataprocessingRegistration">
                                    <Link to={routes.dataProcessing.path} className={"link"}>
                                        {text.crossroad.RegisterPage.Form.checkbox2.label.cz}
                                    </Link>
                                </label>
                            </div>*/}
                        </div>
                        <button className="registerFormButton" type="submit" >{text.crossroad.RegisterPage.Form.button.cz}</button>
                    </form>
                </div>
                {/*<FormModal
                    loading={modal.loading}
                    sucess={modal.sucess}
                    msg={modal.msg}
                    callback={handleModalDefault}
                    clearForm={clearForm}
/>*/}
            </Layer >
        </section >
    )
}