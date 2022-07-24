import { useEffect, useState, useContext, useRef } from 'react'
import { Link, useHistory } from "react-router-dom"
import { gsap } from 'gsap'
import { UserContext, AnimationContext } from '../App/Context'
import { Layer } from '../Components/Layer'
import { Underliner } from '../Components/Underliner'
import { FormStringInput } from '../Components/FormStringInput'
import { FormModal } from '../Components/FormModal'
import { Footer } from '../Components/Footer'
//CONFIG//
import { animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//FUNCTIONS//
import fetchAgent from '../Functions/fetchAgent'
import { isLogged, saveToken } from '../Functions/loginLogic'
import { classListMaker } from '../Functions/classListMaker'
//IMAGES//
import register from '../Images/register.webp'

const errorStyle = {
    borderColor: "red",
    borderWidth: "3px"
}
const sucessStyle = {
    borderColor: "rgb(0, 180, 0)",
    borderWidth: "3px"
}

type canSubmitObj = { canSubmit: boolean, value: string }
const Login = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [modal, showModal] = useState<modalType>({ loading: false, sucess: undefined, msg: undefined })
    const [modalBtnText, setModalBtnText] = useState<string>(text.login.modal.buttonSucess.cz)
    const [password, setPassword] = useState<canSubmitObj>({ canSubmit: false, value: "" })
    const [name, setName] = useState<canSubmitObj>({ canSubmit: false, value: "" })
    //////////////////////////////////////////////////
    //VARIABLES//
    const loginPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "Login"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])
    const loginHeaderWrapper = classListMaker(["relative", "loginHeaderWrapper"])
    const loginFormWrapperClasses = classListMaker(["loginFormWrapper", "relative"])
    const formInputClasses = classListMaker(["formInput"])
    const forgetPasswordClasses = classListMaker(["link forgetPassword"])

    const history = useHistory()
    const userContext = useContext(UserContext)
    const anContext = useContext(AnimationContext);

    //////////////////////////////////////////////////
    //FUNCTIONS//
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
        history.push("/dashboard")
    }
    const clearForm = () => {
        gsap.set(".formInput", { value: "", border: "2px solid transparent" })
    }

    //SUBMIT ON ENTER//
    useEffect(() => {
        const enterPressSubmit = (event: any) => {
            if (event.key === "Enter" && modal.loading === false) {
                handleSubmit(event)
            }
        }
        window.addEventListener("keydown", enterPressSubmit)

        return () => {
            window.removeEventListener("keydown", enterPressSubmit)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //CHECK IF TOKEN IS AVALIABLE ON LOAD//
    useEffect(() => {
        checkLogged()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        animationStore.menu.logo.logoIn();
        setTimeout(() => {
            animationStore.menu.logo.logoTextIn();
        }, 200);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //////////////////////////////////////////////////
    //SETUP//
    return (
        <>
            <section
                id="Login"
                className={loginPageClasses}
            >
                <img src={register} alt="RegisterBckgImg" />
                <Layer className={layerClasses}>
                    <div className={loginHeaderWrapper}>
                        <h2>{"Přihlásit"}</h2>
                        <Underliner width={"80%"} />
                    </div>
                    <div className={loginFormWrapperClasses}>
                        <form action="#Login" id="loginForm" onSubmit={handleSubmit}>
                            <FormStringInput
                                className={formInputClasses}
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
                                className={formInputClasses}
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
                            <Link to="/login/forgetPassword" className={forgetPasswordClasses}>
                                {text.login.Form.link1.cz}
                            </Link>
                            <Link to="/login/forgetName" className={forgetPasswordClasses}>
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
                </Layer>
            </section>
            <Footer />
        </>
    )
}

export default Login 