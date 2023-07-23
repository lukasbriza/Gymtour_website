import { FC } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { RegisterFormValues, RegistrationFormProps } from "./_types"
import clsx from "clsx"
import { formValidationSchema } from "./RegistrationForm.validation"
import { useModal, useServerdataLazy } from "src/hooks/_index"
import { addUser } from "src/fetcher/_index"
import { Checkbox, ErrorModalHeader, ModalHeader, StringInput } from "src/components/_index"



export const RegistrationForm: FC<RegistrationFormProps> = (props) => {
    const { formClassName, onErrorModal, onSuccessModal, clearAfterSubmit, buttonText } = props
    const { t } = useTranslation()
    const { showModal } = useModal()
    const { fetchCall: registerUser } = useServerdataLazy(addUser)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({
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

    const onSubmit = async (values: RegisterFormValues) => {
        const register = await registerUser({
            username: values.name,
            password: values.password,
            email: values.email,
            agreement: {
                terms: { status: values.terms },
                dataProcessingForPropagation: { status: values.dataProcessing }
            }
        })

        //SUCCESS MODAL
        if (register?.data) {
            if (!onSuccessModal) {
                const header = <ModalHeader header={t("registerPage.modalHeader")} />
                const text = t("registerPage.modalText", { email: values.email })
                const button = t("registerPage.modalButton")
                showModal({
                    headerComp: header,
                    text: text,
                    button: button,
                    onClick: clearForm
                })
                return
            }
            onSuccessModal?.()
            clearAfterSubmit && clearForm()
        } else {
            //ERROR MODAL
            if (!onErrorModal) {
                const errorHeader = <ErrorModalHeader header={t("registerPage.modalErrorHeader")} />
                const errorText = t("registerPage.modalErrorText")
                const button = t("registerPage.modalButton")
                showModal({
                    headerComp: errorHeader,
                    text: errorText,
                    button: button,
                    onClick: clearForm
                })
                return
            }
            onErrorModal?.()
            clearAfterSubmit && clearForm()
        }
    }

    const clearForm = () => reset()

    return (

        <div className={clsx(["registerFormWrapper", "centerX", "relative", formClassName])}>
            <form action="#RegisterSection" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                <StringInput
                    className={"input1"}
                    label={t("common.name")}
                    register={register}
                    errorText={errors.name?.message}
                    isError={errors.name !== undefined}
                    name={"name"}
                />
                <StringInput
                    className={"input2"}
                    label={t("common.password")}
                    register={register}
                    errorText={errors.password?.message}
                    isError={errors.password !== undefined}
                    name={"password"}
                />
                <StringInput
                    className={"input3"}
                    label={t("common.email")}
                    register={register}
                    errorText={errors.email?.message}
                    isError={errors.email !== undefined}
                    name={"email"}
                />
                <div className={clsx(["formTerms relative centerX"])}>
                    <Checkbox
                        className={"termsCheckbox"}
                        register={register}
                        isError={errors.terms !== undefined}
                        errorText={errors.terms?.message}
                        label={t("common.businessTermsAgreement")}
                        name={"terms"}
                    />
                    <Checkbox
                        className={"termsCheckbox"}
                        errorText={errors.dataProcessing?.message}
                        register={register}
                        isError={errors.dataProcessing !== undefined}
                        label={t("common.dataProcessingAgreement")}
                        name={"dataProcessing"}
                    />
                </div>
                <button className={clsx(["submitButton", "registerFormButton"])} type="submit" >{buttonText ? buttonText : t("common.register")}</button>
            </form>
        </div>
    )
}