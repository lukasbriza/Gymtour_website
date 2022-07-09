import React, { useEffect, useContext, useState } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { Button } from '../Components/Button'
import { Layer } from '../Components/Layer'
import { Underliner } from '../Components/Underliner'
import { FormStringInput } from '../Components/FormStringInput'
import { FormModal } from '../Components/FormModal'
import { Footer } from '../Components/Footer'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'
import fetchAgent from '../Functions/fetchAgent'
//IMAGES//
import fitness from '../Images/fitness.webp'
import trainer from '../Images/trainer.webp'
import register from '../Images/register.webp'


const Crossroad = () => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    const anContext: any = useContext(AnimationContext);

    const crossroadClasses = classListMaker([])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext.fn.setBigLogoPlayed(true)
        if (anContext.smallLogoPlayed === false) {
            animationStore.menu.logo.logoIn();
            setTimeout(() => {
                animationStore.menu.logo.logoTextIn();
            }, 200);
            anContext.fn.setSmallLogoPlayed(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="Crossroad" className={config.basePageClassList + crossroadClasses}>
            <div id="crossroadSectionWrapper">
                <FitnessPage />
                <div id="divider" className="divider"></div>
                <CoachPage />
            </div>
            <RegisterPage />
            <Footer />
        </div>
    )
}

const FitnessPage = () => {
    //////////////////////////////////////////////////
    //VARIABLES//
    const fitnessPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "minHeightWidth", "FitnessSection"])
    const fitnessHeaderClasses = classListMaker(["fitnessSectionHeader"])
    const fitnessParagraphClasses = classListMaker(["fitnessSectionParagraph"])
    const buttonClasses = classListMaker(["crossroadButton"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])
    //////////////////////////////////////////////////
    //PRELOAD-FETCH//
    const fetchFitness = async () => {
        config.routes.fitness.component.preload()
    }
    //////////////////////////////////////////////////
    return (
        <section
            id="FitnessSection"
            className={fitnessPageClasses}
            onMouseEnter={() => { fetchFitness() }}
            onTouchStart={() => { fetchFitness() }}
        >
            <img src={fitness} alt="FitnesBckgImg" />
            <Layer className={layerClasses}>

                <h1 className={fitnessHeaderClasses}>
                    {text.crossroad.FitnessPage.Header.cz}
                </h1>
                <div className={fitnessParagraphClasses}>
                    {text.crossroad.FitnessPage.Paragraph.cz}
                </div>
                <Button
                    path={config.routes.fitness.path}
                    onClick={() => { console.log("clicked") }}
                    modificationClass={buttonClasses}
                    initialClass={'buttonInitial'}
                    hoverClass={'buttonHover'}
                    text={text.crossroad.FitnessPage.Button.cz}
                />

            </Layer>
        </section>
    )
}

const CoachPage = () => {
    //////////////////////////////////////////////////
    //VARIABLES//
    const coachPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "minHeightWidth", "CoachSection"])
    const coachHeaderClasses = classListMaker(["coachSectionHeader"])
    const coachParagraphClasses = classListMaker(["coachSectionParagraph"])
    const buttonClasses = classListMaker(["crossroadButton"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])
    //////////////////////////////////////////////////
    //PRELOAD-FETCH//
    const fetchCoach = async () => {
        config.routes.coach.component.preload()
    }
    //////////////////////////////////////////////////
    return (
        <section
            id="CoachSection"
            className={coachPageClasses}
            onMouseEnter={() => { fetchCoach() }}
            onTouchStart={() => { fetchCoach() }}
        >
            <img src={trainer} alt="TrainerBckgImg" />
            <Layer className={layerClasses}>
                <h1 className={coachHeaderClasses}>{text.crossroad.CoachPage.Header.cz}</h1>
                <div className={coachParagraphClasses}>
                    {text.crossroad.CoachPage.Paragraph.cz}
                </div>
                <Button
                    path={config.routes.coach.path}
                    onClick={() => { console.log("clicked") }}
                    modificationClass={buttonClasses}
                    initialClass={'buttonInitial'}
                    hoverClass={'buttonHover'}
                    text={text.crossroad.CoachPage.Button.cz}
                />
            </Layer>

        </section>
    )
}

const RegisterPage = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [name, setName] = useState({ canSubmit: false, value: "" })
    const [password, setPassword] = useState({ canSubmit: false, value: "" })
    const [email, setEmail] = useState({ canSubmit: false, value: "" })
    const [terms, setTerms] = useState(false)
    const [dataProcessing, setDataProcessing] = useState(false)

    const [modal, showModal] = useState<modalType>({ loading: false, sucess: undefined, msg: undefined })
    //////////////////////////////////////////////////
    //VARIABLES//
    const contactPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "RegisterSection"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])
    const registerHeaderWrapper = classListMaker(["centerX", "relative", "registerHeaderWrapper"])
    const registerParagraphClasses = classListMaker(["registerParagraph", "relative", "centerX"])
    const registerFormWrapperClasses = classListMaker(["registerFormWrapper", "centerX", "relative"])
    const formInputClasses = classListMaker(["formInput"])
    const formTermsClasses = classListMaker(["formTerms relative centerX"])
    const formCheckboxLinkClasses = classListMaker(["link"])

    const errorStyle = {
        borderColor: "red",
        borderWidth: "3px"
    }
    const sucessStyle = {
        borderColor: "rgb(0, 180, 0)",
        borderWidth: "3px"
    }

    //////////////////////////////////////////////////
    //FUNCTIONS//
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
    }
    const clearForm = () => {
        gsap.set(".formInput", { value: "", border: "2px solid transparent" })
        gsap.set(".checkbox", { checked: false })
    }
    //////////////////////////////////////////////////
    return (
        <section
            id="RegisterSection"
            className={contactPageClasses}
        >
            <img src={register} alt="RegisterBckgImg" />
            <Layer className={layerClasses}>
                <div className={registerHeaderWrapper}>
                    <h2>{text.crossroad.RegisterPage.Header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <div className={registerParagraphClasses}>
                    {text.crossroad.RegisterPage.Paragraph.cz}
                </div>
                <div className={registerFormWrapperClasses}>
                    <form action="#RegisterSection" id="registerForm" onSubmit={handleSubmit}>
                        <FormStringInput
                            className={formInputClasses}
                            type={"text"}
                            name={"nameInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input1.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={true}
                            pattern={'[ |!()*ˇ^´˘°˛`˙´˝¨¸ß×¤÷]'}
                            errorMessage={text.crossroad.RegisterPage.Form.input1.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            maxLength={30}
                            minLength={5}
                        />
                        <FormStringInput
                            className={formInputClasses}
                            type={"password"}
                            name={"passwordInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input2.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={true}
                            errorMessage={text.crossroad.RegisterPage.Form.input2.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            minLength={9}
                        />
                        <FormStringInput
                            className={formInputClasses}
                            type={"email"}
                            name={"emailInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input3.placeholder.cz}
                            onChange={(canSubmit) => { handleChange(canSubmit) }}
                            required={true}
                            errorMessage={text.crossroad.RegisterPage.Form.input3.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                        />
                        <div className={formTermsClasses}>
                            <div>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    id="termsRegistration"
                                    name="termsRegistration"
                                    onClick={() => setTerms(!terms)}
                                />
                                <label htmlFor="termsRegistration">
                                    <Link to={config.routes.businessConditions.path} className={formCheckboxLinkClasses}>
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
                                    <Link to={config.routes.dataProcessing.path} className={formCheckboxLinkClasses}>
                                        {text.crossroad.RegisterPage.Form.checkbox2.label.cz}
                                    </Link>
                                </label>
                            </div>
                        </div>
                        <button className="registerFormButton" type="submit" onClick={handleSubmit}>{text.crossroad.RegisterPage.Form.button.cz}</button>
                    </form>
                </div>
                <FormModal
                    loading={modal.loading}
                    sucess={modal.sucess}
                    msg={modal.msg}
                    callback={handleModalDefault}
                    clearForm={clearForm}
                />
            </Layer >
        </section >
    )
}

export default Crossroad