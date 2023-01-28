import { useEffect, useState, FC } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { gsap } from 'gsap'
import { Layer } from '../Components/Layer'
import { Underliner } from '../Components/Underliner'
import { FormStringInput } from '../Components/FormStringInput'
import { FormModal } from '../Components/FormModal'
import { Footer } from '../Components/Footer'
import { Button } from '../Components/Button'
import { text } from '../config/textSource'
import fetchAgent from '../utils/fetchAgent'
import { isLogged, saveToken } from '../utils/loginLogic'
import register from '../assets/register.webp'
import { useAnimationContext, useUsercontext } from '@hooks'
import { smallLogoShow } from '@animations'
import clsx from 'clsx'

const errorStyle = {
    borderColor: "red",
    borderWidth: "3px"
}
const sucessStyle = {
    borderColor: "rgb(0, 180, 0)",
    borderWidth: "3px"
}

type canSubmitObj = { canSubmit: boolean, value: string }
const Login: FC = () => {

    const [modal, showModal] = useState<modalType>({ loading: false, sucess: undefined, msg: undefined })
    const [modalBtnText, setModalBtnText] = useState<string>(text.login.modal.buttonSucess.cz)
    const [password, setPassword] = useState<canSubmitObj>({ canSubmit: false, value: "" })
    const [name, setName] = useState<canSubmitObj>({ canSubmit: false, value: "" })

    const navigate = useNavigate()
    const userContext = useUsercontext()
    const anContext = useAnimationContext()
    const location = useLocation()

    const checkLogged = async () => {
        const logged = await isLogged()
        if (logged?.logged === true) {
            userContext?.fn.setLogged(true)
            userContext?.fn.setUserId(logged.userId)
            //REDIRECT TO DASHBOARD
            redirectToDashboard()
        }
    }
    const handleModalDefault = () => {
        showModal({ loading: false, sucess: undefined, msg: undefined })
    }
    const handleSubmit = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let sucessHtml = (
            <div className="modalSucessObj" >
                <p className="modalSucessContent" >{text.login.modal.sucessMsg.cz}</p>
            </div>
        );
        let failHtml = (
            <div className="modalErrorObj" >
                <p className="modalErrorContent" >{text.login.modal.invalidInputs.cz}</p>
            </div>
        )
        let dontMetConditionsHtml = (
            <div className="modalErrorObj" >
                <p className="modalErrorContent" >{text.login.modal.invalidInputs.cz}</p>
            </div>
        )
        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })
        setTimeout(async () => {
            //CHECK CONDITIONS
            if (
                name.canSubmit === true &&
                password.canSubmit === true
            ) {
                //SEND RQ TO SERVER
                const fetchResult: any = await fetchAgent.loginUser({ username: name.value, password: password.value })
                //SUCESS SCENARIO
                if (fetchResult.errorMap.length === 0 && fetchResult.data !== null) {
                    if (fetchResult.data.authenticated === true) {
                        //CHANGE STATE IN APP
                        userContext?.fn.setLogged(true)
                        //SAVE TOKEN TO BROWSER
                        await saveToken(fetchResult.data.token)
                        //SAVE USER ID TO CONTEXT
                        userContext?.fn.setUserId(fetchResult.data.userId)
                        //MODAL - SUCESS
                        setModalBtnText(text.login.modal.buttonSucess.cz)
                        showModal({ loading: false, sucess: true, msg: sucessHtml })
                    }
                    if (fetchResult.data.authenticated === false) {
                        userContext?.fn.setLogged(false)
                        //MODAL - FAIL
                        setModalBtnText(text.login.modal.buttonFail.cz)
                        showModal({ loading: false, sucess: false, msg: failHtml })
                    }

                } else {
                    //HANDLE UNEXPECTED SCENARIOS
                    let msgText = fetchResult.errorMap.map((obj: errorMapObj, index: number) => {
                        const errorHtml = (
                            <div className="modalErrorObj" key={index}>
                                <p className="modalErrorHeader" key={index + "a"}>{obj.Error.code + "- " + obj.Error.name}</p>
                                <p className="modalErrorContent" key={index + "b"}>{obj.Error.message}</p>
                            </div>
                        )
                        return errorHtml;
                    })
                    setModalBtnText(text.login.modal.buttonFail.cz)
                    showModal({ loading: false, sucess: false, msg: msgText })
                }
            } else {
                //NAME AND PASSWORD DONT MET CONDITIONS
                setModalBtnText(text.login.modal.buttonFail.cz)
                showModal({ loading: false, sucess: false, msg: dontMetConditionsHtml })
            }
        }, 500)
    }
    const handleChange = (canSubmit: { canSubmit: boolean, value: string, name: string }) => {
        switch (canSubmit.name) {
            case "nameInput":
                setName(canSubmit)
                break;
            case "passwordInput":
                setPassword(canSubmit)
                break;
        }
    }
    const redirectToDashboard = () => {
        navigate("/dashboard")
    }
    const clearForm = () => {
        gsap.set(".formInput", { value: "", border: "2px solid transparent" })
    }


    useEffect(() => {
        checkLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        smallLogoShow()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <section
                id="Login"
                className={clsx(["stretchX", "stretchVH", "relative", "Login"])}
            >
                <img src={register} alt="LoginBckgImg" />
                <Layer className={clsx(["stretchY", "stretchX"])}>
                    <Routes location={location}>
                        <Route path={"/login"}>
                            <div className={clsx(["stretchY", "stretchX", "loginContentWrapper"])}>
                                <div className={clsx(["relative", "loginHeaderWrapper"])}>
                                    <h2>{text.login.Form.header.cz}</h2>
                                    <Underliner width={"80%"} />
                                </div>
                                <div className={clsx(["loginFormWrapper", "relative"])}>
                                    <form action="#Login" id="loginForm" onSubmit={handleSubmit}>
                                        <FormStringInput
                                            className={"formInput"}
                                            type={"text"}
                                            name={"nameInput"}
                                            formId={"loginForm"}
                                            placeholder={text.login.Form.input1.placeholder.cz}
                                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                                            required={true}
                                            pattern={'[ |!()*ˇ^´˘°˛`˙´˝¨¸ß×¤÷]'}
                                            errorMessage={text.login.Form.input1.errorMessage.cz}
                                            errorStyle={errorStyle}
                                            sucessStyle={sucessStyle}
                                            minLength={1}
                                        />
                                        <FormStringInput
                                            className={"formInput"}
                                            type={"password"}
                                            name={"passwordInput"}
                                            formId={"registerForm"}
                                            placeholder={text.login.Form.input2.placeholder.cz}
                                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                                            required={true}
                                            errorMessage={text.login.Form.input2.errorMessage.cz}
                                            errorStyle={errorStyle}
                                            sucessStyle={sucessStyle}
                                            minLength={1}
                                        />
                                        <Link to="/login/forgetPassword" className={clsx(["link", "forgetPassword"])}>
                                            {text.login.Form.link1.cz}
                                        </Link>
                                        <Link to="/login/forgetName" className={clsx(["link", "forgetPassword"])}>
                                            {text.login.Form.link2.cz}
                                        </Link>
                                        <button
                                            className="registerFormButton loginFormButton"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            {text.login.Form.button.cz}
                                        </button>

                                    </form>
                                </div>
                                <FormModal
                                    loading={modal.loading}
                                    sucess={modal.sucess}
                                    msg={modal.msg}
                                    buttonMsg={modalBtnText}
                                    callbackTiming={0}
                                    callback={() => { if (userContext?.logged === true) { redirectToDashboard() }; handleModalDefault() }}
                                    clearForm={clearForm}
                                />
                            </div>
                        </Route>
                        <Route path={"/login/forgetPassword"}>
                            <ForgetPassword />
                        </Route>
                        <Route path={"/login/forgetName"}>
                            <ForgetName />
                        </Route>

                    </Routes>
                </Layer>
            </section>
            <Footer />
        </>
    )
}

const ForgetPassword: FC = () => {
    const handleChange = ({ canSubmit, value, name }: { canSubmit: boolean, value: string, name: string }) => {

    }
    const handleSubmit = () => { }

    return (
        <div className={clsx(["stretchX", "stretchY", "forgetPasswordFormWrapper"])}>
            <form action="#Login" id="forgetPasswordForm" className="stretchX stretchY" onSubmit={handleSubmit}>
                <div className={"forgetPasswordHeader"}>
                    <h2>{text.login.ForgetPasswordForm.header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <p className="forgetPasswordText">{text.login.ForgetPasswordForm.text.cz}</p>
                <h3 className="nameHeader">{text.login.ForgetPasswordForm.inputHeader1.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"text"}
                    name={"forgetPasswordNameInput"}
                    formId={"forgetPasswordForm"}
                    placeholder={text.login.ForgetPasswordForm.input1.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={false}
                    pattern={'[ |!()*ˇ^´˘°˛`˙´˝¨¸ß×¤÷]'}
                    errorMessage={text.login.ForgetPasswordForm.input1.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                    maxLength={30}
                    minLength={5}
                />
                <h3 className="emailHeader">{text.login.ForgetPasswordForm.inputHeader2.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"email"}
                    name={"forgetPasswordEmailInput"}
                    formId={"forgetPasswordForm"}
                    placeholder={text.login.ForgetPasswordForm.input2.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetPasswordForm.input2.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                />
                <Button
                    onClick={handleSubmit}
                    modificationClass={"modification"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={text.login.ForgetPasswordForm.button.cz}
                />
            </form>

        </div>
    )
}
const ForgetName: FC = () => {

    const handleChange = ({ canSubmit, value, name }: { canSubmit: boolean, value: string, name: string }) => {

    }
    const handleSubmit = () => { }

    return (
        <div className={clsx(["forgetNameWrapper", "stretchX", "stretchY"])}>
            <form action="#Login" id="forgetNameForm" className="stretchX stretchY" onSubmit={handleSubmit}>
                <div className={"forgetNameHeader"}>
                    <h2>{text.login.ForgetNameForm.header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <p className="forgetNameText">{text.login.ForgetNameForm.text.cz}</p>
                <h3 className="emailHeader">{text.login.ForgetNameForm.inputHeader1.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"email"}
                    name={"forgetNameEmailInput"}
                    formId={"forgetNameForm"}
                    placeholder={text.login.ForgetNameForm.input1.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetNameForm.input1.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                />
                <h3 className="passwordHeader">{text.login.ForgetNameForm.inputHeader2.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"password"}
                    name={"forgetNamePasswordInput"}
                    formId={"forgetNameForm"}
                    placeholder={text.login.ForgetNameForm.input2.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetNameForm.input2.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                    minLength={9}
                />
                <Button
                    onClick={handleSubmit}
                    modificationClass={"modification"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={text.login.ForgetNameForm.button.cz}
                />
            </form>
        </div>
    )
}

export default Login 