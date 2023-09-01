import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { changePwdOrNameFormValidationSchema } from "./_validations"
import { StringInput, Underliner } from "src/components/_index";
import { ChangeFormProps, ForgetPasswordFormValues } from "./_types";
import { usePopUpContext } from "src/hooks/_index";

export const ChangeForm: FC<ChangeFormProps> = ({ toLogin, toRegister }) => {
    const { t } = useTranslation()
    const { } = usePopUpContext()

    const changePwdOrNameMethods = useForm({
        defaultValues: {
            email: ""
        },
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: changePwdOrNameFormValidationSchema(t)
    })

    const { register, reset: changeReset, handleSubmit: changeHandleSubmit, formState: { errors: changeErrors } } = changePwdOrNameMethods

    const changePasswordOrNameSubmit = (values: ForgetPasswordFormValues) => {
        //TODO call
        changeReset()
        //popup
    }

    return (
        <form onSubmit={changeHandleSubmit(changePasswordOrNameSubmit)}>
            <div className={"headerWrapper"}>
                <h1 className={"changeHeader"}>{t("loginPage.header2")}</h1>
                <Underliner width={"80%"} />
            </div>
            <div className={"subtitle"}>{t("loginPage.changeSubtitle")}</div>
            <StringInput
                register={register}
                className={"changeInput"}
                label={t("common.email")}
                errorText={changeErrors.email?.message}
                isError={changeErrors.email !== undefined}
                name={"email"}
            />
            <button className={clsx(["submitButton", "changeSubmitFormButton"])} type="submit" >{t("loginPage.changeButton")}</button>
            <p className={clsx(["loginLink", "loginRedirectLink"])} onClick={toLogin}>{t("loginPage.loginLink")}</p>
            <p className={clsx(["loginLink", "registerLink"])} onClick={toRegister}>{t("loginPage.registerLink")}</p>
        </form>
    )
}