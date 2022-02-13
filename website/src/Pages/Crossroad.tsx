import { useEffect, useContext, useRef } from 'react'
import { Button } from '../Components/Button'
import { Layer } from '../Components/Layer'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'
//IMAGES//
import fitness from '../Images/fitness.webp'
import trainer from '../Images/trainer.webp'


const Crossroad = () => {
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext: any = useContext(AppContext);
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
            <ContactPage />
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

const ContactPage = () => {
    //////////////////////////////////////////////////
    //VARIABLES//
    const contactPageClasses = classListMaker(["stretchX", "stretchVH", "relative", "ContactSection"])
    //////////////////////////////////////////////////
    return (
        <section id="ContactSection" className={contactPageClasses}>

        </section>
    )
}
export { Crossroad }