import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StringInput, Underliner } from "src/components";
import clsx from "clsx";
import { usePopUpContext } from "src/hooks";
import { loginFormValidationSchema } from "src/validations";
import { LoginFormProps, LoginFormValues } from "../_types";

export const LoginForm: FC<LoginFormProps> = ({ toChange, toRegister }) => {
    const { t } = useTranslation()
    const { } = usePopUpContext()

    const loginMethods = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: loginFormValidationSchema(t)
    })
    const { register, reset: loginReset, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors } } = loginMethods

    const loginSubmit = (values: LoginFormValues) => {
        //TODO call
        loginReset()
        //popup
    }

    return (
        <form onSubmit={loginHandleSubmit(loginSubmit)}>
            <div className={"headerWrapper"}>
                <h1 className={"loginHeader"}>{t("loginPage.header")}</h1>
                <Underliner width={"80%"} />
            </div>
            <div className={"subtitle"}>{t("loginPage.loginSubtitle")}</div>
            <StringInput
                register={register}
                className={"usernameInput"}
                label={t("common.username")}
                errorText={loginErrors.username?.message}
                isError={loginErrors.username !== undefined}
                name={"username"}
            />
            <StringInput
                register={register}
                className={"passwordInput"}
                label={t("common.password")}
                errorText={loginErrors.password?.message}
                isError={loginErrors.password !== undefined}
                password={true}
                name={"password"}
            />
            <button className={clsx(["submitButton", "loginFormButton"])} type="submit" >{t("loginPage.loginButton")}</button>
            <p className={clsx(["loginLink", "changeLink"])} onClick={toChange}>{t("loginPage.changeLink")}</p>
            <p className={clsx(["loginLink", "registerLink"])} onClick={toRegister}>{t("loginPage.registerLink")}</p>
        </form>
    )
}