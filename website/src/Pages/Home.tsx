import { useEffect, useContext, useState, useRef, createRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { BigLogo } from '../Components/SVG/BigLogo'
import { BigText } from '../Components/SVG/BigText'
import main from '../Images/main.webp'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

///////////////////////////////////////////////////////////////////////////////////////
const Home = ({ history, location }: any) => {
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext: any = useContext(AppContext);
    const anContext: any = useContext(AnimationContext);

    const buttonClasses = classListMaker(["link", "absolute", "centerX"])
    //////////////////////////////////////////////////
    //ANIMATIONS//

    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            id="Home"
            className={config.basePageClassList}
            style={{ backgroundImage: `url(${main})` }}
        >
            <PageHeader />
            <MainSection />
            <Link
                to={config.routes.crossroad.path}
                id="homeButton"
                className={buttonClasses}
            >
                {text.home.Button.cz}
            </Link>

        </div>
    )
}
///////////////////////////////////////////////////////////////////////////////////////
const PageHeader = () => {
    const PageHeaderClassList = classListMaker(["stretchX", "relative", "minorColor1Text"])
    return (
        <div
            className={PageHeaderClassList}
            id="pageHeader"
        >
            {text.home.PageHeader.cz}
        </div>
    )
}

const MainSection = (props: any) => {
    //////////////////////////////////////////////////
    //STATE//
    const [showHeader, setShowHeader] = useState<boolean>(false)
    const [showLogo, setShowLogo] = useState<boolean>(true)
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext: any = useContext(AppContext);
    const anContext: any = useContext(AnimationContext);

    const bigLogoWrapperClass = classListMaker(["relative", "stretchX"])
    const bigLogoClasses = classListMaker(["relative"])
    const bigTextClasses = classListMaker(["relative"])
    const headerClasses = classListMaker(["relative", "minorColor1Text"])

    const bigLogoWrapper: any = useRef()
    const pathRef: any = createRef()
    const gRef: any = useRef()
    const yRef: any = useRef()
    const mRef: any = useRef()
    const tRef: any = useRef()
    const oRef: any = useRef()
    const uRef: any = useRef()
    const rRef: any = useRef()
    const textRef: any = useRef({ gRef, yRef, mRef, tRef, oRef, uRef, rRef })
    const header: any = useRef()
    //////////////////////////////////////////////////
    //ANIMATIONS//
    //////////////////////////////////////////////////
    //BIG LOGO ANIMATION LOGIC//
    useEffect(() => {
        if (anContext.bigLogoPlayed === undefined) {
            //play animation logo
            animationStore.home.logo.show(
                pathRef.current,
                [
                    gRef.current,
                    yRef.current,
                    mRef.current,
                    tRef.current,
                    oRef.current,
                    uRef.current,
                    rRef.current
                ],
                setShowHeader
            )
            //show small logo
        }
        if (anContext.bigLogoPlayed === true) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showLogo])
    //////////////////////////////////////////////////
    //MAIN HEADER ANIMATION LOGIC//
    useEffect(() => {
        if (showHeader === true) {
            //show naimation of header
        }
        if (showHeader === false) {
            //hide animation of header
        }
    }, [showHeader])
    //////////////////////////////////////////////////
    return (
        <>
            <div
                id="bigLogoWrapper"
                className={bigLogoWrapperClass}
                ref={bigLogoWrapper}
            >
                <div className={bigLogoClasses}>
                    <BigLogo
                        id="bigLogo"
                        scale={0.7}
                        ref={pathRef}
                    />
                </div>
                <div className={bigTextClasses}>
                    <BigText
                        id="bigText"
                        scale={0.5}
                        ref={textRef}
                    />
                </div>
            </div>
            <div
                className={headerClasses}
                id="homeHeader"
                ref={header}
            >
                <div>
                    <div id="part1">{text.home.Header.part1.cz}</div>
                    <div id="part2">{text.home.Header.part2.cz}</div>
                    <div id="part3">{text.home.Header.part3.cz}</div>
                </div>
            </div>
        </>
    )

}

export { Home }
