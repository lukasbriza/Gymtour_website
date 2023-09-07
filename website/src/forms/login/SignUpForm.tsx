import { FC } from "react";

import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Underliner } from "src/components";
import { RegistrationForm } from "../shared/RegistrationForm";
import { SignUpFormProps } from "../_types";


export const SignUpForm: FC<SignUpFormProps> = ({ toChange, toLogin }) => {
    const { t } = useTranslation()

    return (
        <div className={"registerFormWrapper"}>
            <div className={"headerWrapper"}>
                <h1 className={"loginHeader"}>{t("loginPage.registerHeader")}</h1>
                <Underliner width={"80%"} />
            </div>
            <div className={"subtitle"}>{t("loginPage.registerSubtitle")}</div>
            <RegistrationForm formClassName={"loginRegisterForm"} />
            <p className={clsx(["loginLink", "loginRedirectLink"])} onClick={toLogin}>{t("loginPage.loginLink")}</p>
            <p className={clsx(["loginLink", "registerLink"])} onClick={toChange}>{t("loginPage.changeLink")}</p>
        </div>
    )
}