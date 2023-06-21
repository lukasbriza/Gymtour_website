import { FC, useState, useRef, useEffect } from 'react'
import { Layer, Footer, StringInput, Underliner } from "../../components/_index"
import { handleSecondState, handleFirstState } from "../../animations/_index"
import { useForm } from "react-hook-form"
import register from '../../assets/register.webp'
import clsx from 'clsx'
import { loginFormValidationSchema, changePwdOrNameFormValidationSchema } from "./login.validation"
import { LoginFormValues, ForgetPasswordFormValues } from "./_types"
import { t } from 'i18next'

const Login: FC = () => {
    const login = useRef<HTMLElement>(null)
    const changePwdOrName = useRef<HTMLElement>(null)
    const [formType, setFormType] = useState<1 | 2>(1)

    const loginMethods = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: loginFormValidationSchema(t)
    })
    const changePwdOrNameMethods = useForm({
        defaultValues: {
            email: ""
        },
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: changePwdOrNameFormValidationSchema(t)
    })

    const { control: loginControl, reset: loginReset, handleSubmit: loginHandleSubmit, formState: { errors: loginErrors } } = loginMethods
    const { control: changeControl, reset: changeReset, handleSubmit: changeHandleSubmit, formState: { errors: changeErrors } } = changePwdOrNameMethods

    const loginSubmit = (values: LoginFormValues) => {
        //loginReset
        //popup
    }

    const changePasswordOrNameSubmit = (values: ForgetPasswordFormValues) => {
        //changeReset
        //popup
    }

    const handleBack = () => setFormType(1)
    const handleForward = () => setFormType(2)

    useEffect(() => {
        switch (formType) {
            case 1:
                login.current && changePwdOrName.current && handleFirstState(login.current, changePwdOrName.current)
                return
            case 2:
                login.current && changePwdOrName.current && handleSecondState(login.current, changePwdOrName.current)
                return
        }
    }, [formType])


    return (
        <>
            <section className={clsx(["stretchX", "stretchVH", "Login"])}>
                <img src={register} alt="LoginBckgImg" />
                <Layer className={clsx(["stretchY", "stretchX"])}>
                    <section ref={login} className={"loginFormWrapper"}>
                        <form onSubmit={loginHandleSubmit(loginSubmit)}>
                            <div className={"headerWrapper"}>
                                <h1 className={"loginHeader"}>{t("loginPage.header")}</h1>
                                <Underliner width={"80%"} />
                            </div>
                            <StringInput
                                className={"usernameInput"}
                                label={t("common.username")}
                                control={loginControl}
                                errorText={loginErrors.username?.message}
                                isError={loginErrors.username !== undefined}
                                name={"username"}
                            />
                            <StringInput
                                className={"passwordInput"}
                                label={t("common.password")}
                                control={loginControl}
                                errorText={loginErrors.password?.message}
                                isError={loginErrors.password !== undefined}
                                name={"password"}
                            />
                            <button className={clsx(["submitButton", "loginFormButton"])} type="submit" >{t("loginPage.loginButton")}</button>
                            <p className='changeLink' onClick={handleForward}>{t("loginPage.changeLink")}</p>
                        </form>
                    </section>
                    <section ref={changePwdOrName} className={"changeFormWrapper"}>
                        <form onSubmit={changeHandleSubmit(changePasswordOrNameSubmit)}>
                            <div className={"headerWrapper"}>
                                <h1 className={"changeHeader"}>{t("loginPage.header2")}</h1>
                                <Underliner width={"80%"} />
                            </div>
                            <StringInput
                                className={"changeInput"}
                                label={t("common.email")}
                                control={changeControl}
                                errorText={changeErrors.email?.message}
                                isError={changeErrors.email !== undefined}
                                name={"email"}
                            />

                            <button className={clsx(["submitButton", "changeSubmitFormButton"])} type="submit" >{t("loginPage.changeButton")}</button>
                            <button className={clsx(["submitButton", "changeBackFormButton"])} type="button" onClick={handleBack} >{t("loginPage.changeBackButton")}</button>
                        </form>
                    </section>
                </Layer>
            </section>
            <Footer />
        </>
    )
}


export default Login 