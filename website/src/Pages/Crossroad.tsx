import { useEffect, useContext, useState } from 'react'
import { Button } from '../Components/Button'
import { Layer } from '../Components/Layer'
import { Underliner } from '../Components/Underliner'
import { FormStringInput } from '../Components/FormStringInput'
import { Footer } from '../Components/Footer'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'
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
    return (
        <section
            id="FitnessSection"
            style={{ backgroundImage: `url(${fitness})` }}
            className={fitnessPageClasses}
        >
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
    return (
        <section
            id="CoachSection"
            style={{ backgroundImage: `url(${trainer})` }}
            className={coachPageClasses}
        >
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
    //////////////////////////////////////////////////
    //VARIABLES//
    const contactPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "RegisterSection"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])
    const registerHeaderWrapper = classListMaker(["centerX", "relative", "registerHeaderWrapper"])
    const registerParagraphClasses = classListMaker(["registerParagraph", "relative", "centerX"])
    const registerFormWrapperClasses = classListMaker(["registerFormWrapper", "centerX", "relative"])
    const formInputClassName = classListMaker(["formInput"])

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
    const handleSubmit = (e: any) => {
        e.preventDefault();
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
    //////////////////////////////////////////////////
    return (
        <section id="RegisterSection" className={contactPageClasses} style={{ backgroundImage: `url(${register})` }}>
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
                            className={formInputClassName}
                            type={"text"}
                            name={"nameInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input1.placeholder.cz}
                            onChange={(canSubmit: any) => { handleChange(canSubmit) }}
                            required={true}
                            pattern={'[@+-<>$#"|%!()*]'}
                            errorMessage={text.crossroad.RegisterPage.Form.input1.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            maxLength={30}
                            minLength={5}
                        />
                        <FormStringInput
                            className={formInputClassName}
                            type={"password"}
                            name={"passwordInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input2.placeholder.cz}
                            onChange={(canSubmit: any) => { handleChange(canSubmit) }}
                            required={true}
                            errorMessage={text.crossroad.RegisterPage.Form.input2.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                            minLength={9}
                        />
                        <FormStringInput
                            className={formInputClassName}
                            type={"email"}
                            name={"emailInput"}
                            formId={"registerForm"}
                            placeholder={text.crossroad.RegisterPage.Form.input3.placeholder.cz}
                            onChange={(canSubmit: any) => { handleChange(canSubmit) }}
                            required={true}
                            errorMessage={text.crossroad.RegisterPage.Form.input3.errorMessage.cz}
                            errorStyle={errorStyle}
                            sucessStyle={sucessStyle}
                        />
                        <button className="registerFormButton" type="submit">{text.crossroad.RegisterPage.Form.button.cz}</button>
                    </form>
                </div>
            </Layer>
        </section>
    )
    //jméno heslo email
}
export { Crossroad }