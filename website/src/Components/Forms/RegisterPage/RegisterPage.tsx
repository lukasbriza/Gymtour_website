import { FC } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { RegisterFormValues } from "./_types"
import clsx from "clsx"
import { formValidationSchema } from "./validation"
import { useModal, useServerdataLazy } from "src/hooks/_index"
import { addUser } from "src/fetcher/_index"
import { Checkbox, Layer, ModalHeader, StringInput, Underliner } from "src/components/_index"
import registerImg from "../../../assets/register.webp"
import { Link } from "react-router-dom"
import { routes } from "src/config/mainConfiguration"

export const RegisterPage: FC = () => {
    const { t } = useTranslation()
    const { showModal } = useModal()
    const { fetchCall: registerUser } = useServerdataLazy(addUser)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormValues>({
        defaultValues: {
            username: "",
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
        const { email, username, terms, dataProcessing, password } = values

        const result = await registerUser({
            email,
            password,
            username,
            agreement: {
                terms: { status: terms },
                dataProcessingForPropagation: { status: dataProcessing }
            }
        })

        if (result?.data) {
            //SUCCESS MODAL
            const header = <ModalHeader header={t("registerPage.modalHeader")} />
            const text: string = t("registerPage.modalText", { email: values.email })
            const button: string = t("registerPage.modalButton")
            showModal({
                headerComp: header,
                text: text,
                button: button,
                onClick: clearForm
            })
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
                    <h2>{t("registerPage.registerHeader")}</h2>
                    <Underliner width={"80%"} />
                </div>
                <div className={clsx(["registerParagraph", "relative", "centerX"])}>
                    {t("registerPage.registerParagraph")}
                </div>
                <div className={clsx(["registerFormWrapper", "centerX", "relative"])}>
                    <form action="#RegisterSection" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
                        <StringInput
                            register={register}
                            className={"input1"}
                            label={t("common.name")}
                            errorText={errors.username?.message}
                            isError={errors.username !== undefined}
                            name={"username"}
                        />
                        <StringInput
                            register={register}
                            className={"input2"}
                            label={t("common.password")}
                            errorText={errors.password?.message}
                            isError={errors.password !== undefined}
                            name={"password"}
                        />
                        <StringInput
                            register={register}
                            className={"input3"}
                            label={t("common.email")}
                            errorText={errors.email?.message}
                            isError={errors.email !== undefined}
                            name={"email"}
                        />
                        <div className={clsx(["formTerms relative centerX"])}>
                            <Checkbox
                                register={register}
                                className={"termsCheckbox"}
                                isError={errors.terms !== undefined}
                                errorText={errors.terms?.message}
                                label={t("common.businessTermsAgreement")}
                                name={"terms"}
                            />
                            <Checkbox
                                register={register}
                                className={"termsCheckbox"}
                                errorText={errors.dataProcessing?.message}
                                isError={errors.dataProcessing !== undefined}
                                label={t("common.dataProcessingAgreement")}
                                name={"dataProcessing"}
                            />
                        </div>
                        <button className={clsx(["submitButton", "registerFormButton"])} type="submit" >{t("registerPage.registerButton")}</button>
                        <div className="hadAccount">
                            {t("registerPage.hadAccount1")}
                            <Link to={routes.login.path}>
                                {t("registerPage.hadAccount2")}
                            </Link>
                        </div>
                    </form>
                </div>
            </Layer >
        </section >
    )
}