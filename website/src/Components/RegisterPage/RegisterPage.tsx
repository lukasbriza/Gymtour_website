import { Layer, Underliner, StringInput, Checkbox, ModalHeader, ErrorModalHeader } from "@components"
import clsx from "clsx"
import { FC } from "react"
import registerImg from '@assets/register.webp'
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { formValidationSchema } from "./RegisterPage.validation"
import { RegisterFormValues } from "./_types"
import { useModal } from "@hooks"

export const RegisterPage: FC = () => {
    const { t } = useTranslation()
    const { showModal } = useModal()
    const { control, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            password: "",
            email: "",
            terms: false,
            dataProcessing: false
        },
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: formValidationSchema(t)
    })

    const onSubmit = (values: RegisterFormValues) => {
        //sucess ?? error
        /*const fetchResult: any = await fetchAgent.registerUser({
            username: name.value,
            password: password.value,
            email: email.value,
            terms: terms,
            dataProcessing: dataProcessing
        })*/

        const register = false //call
        //SUCCESS MODAL
        if (register) {
            const header = <ModalHeader header={t("registerPage:modalHeader")} />
            const text = t("registerPage:modalText", { email: values.email })
            const button = t("registerPage:modalButton")
            showModal(header, text, button, clearForm)
        } else {
            const errorHeader = <ErrorModalHeader header={t("registerPage:modalErrorHeader")} />
            const errorText = t("registerPage:modalErrorText")
            const button = t("registerPage:modalButton")
            showModal(errorHeader, errorText, button, clearForm)
        }
    }

    const clearForm = () => reset()

    return (
        <section
            id="RegisterSection"
            className={clsx(["stretchX", "stretchVH", "relative", "RegisterSection"])}
        >
            <img src={registerImg} alt="RegisterBckgImg" />
            <Layer className={clsx(["stretchY", "stretchX"])}>
                <div className={clsx(["centerX", "relative", "registerHeaderWrapper"])}>
                    <h2>{t("registerPage:registerHeader")}</h2>
                    <Underliner width={"80%"} />
                </div>
                <div className={clsx(["registerParagraph", "relative", "centerX"])}>
                    {t("registerPage:registerParagraph")}
                </div>
                <div className={clsx(["registerFormWrapper", "centerX", "relative"])}>
                    <form action="#RegisterSection" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                        <StringInput
                            className={"input1"}
                            label={t("common:name")}
                            control={control}
                            errorText={errors.name?.message}
                            isError={errors.name !== undefined}
                            name={"name"}
                        />
                        <StringInput
                            className={"input2"}
                            label={t("common:password")}
                            control={control}
                            errorText={errors.password?.message}
                            isError={errors.password !== undefined}
                            name={"password"}
                        />
                        <StringInput
                            className={"input3"}
                            label={t("common:email")}
                            control={control}
                            errorText={errors.email?.message}
                            isError={errors.email !== undefined}
                            name={"email"}
                        />
                        <div className={clsx(["formTerms relative centerX"])}>
                            <Checkbox
                                className={"termsCheckbox"}
                                control={control}
                                isError={errors.terms !== undefined}
                                errorText={errors.terms?.message}
                                label={t("common:businessTermsAgreement")}
                                name={"terms"}
                            />
                            <Checkbox
                                className={"termsCheckbox"}
                                errorText={errors.dataProcessing?.message}
                                control={control}
                                isError={errors.dataProcessing !== undefined}
                                label={t("common:dataProcessingAgreement")}
                                name={"dataProcessing"}
                            />
                        </div>
                        <button className="registerFormButton" type="submit" >{t("registerPage:registerButton")}</button>
                    </form>
                </div>
            </Layer >
        </section >
    )
}