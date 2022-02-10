import { useEffect, useContext, useState, useRef, createRef } from 'react'
import { Link } from 'react-router-dom'
import { BigLogo } from '../Components/SVG/BigLogo'
import { BigText } from '../Components/SVG/BigText'
import main from '../Images/main.webp'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

///////////////////////////////////////////////////////////////////////////////////////
const Home = ({ history, location }: any) => {
    //////////////////////////////////////////////////
    //VARIABLES//
    const buttonClasses = classListMaker(["link", "absolute", "centerX"])
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

const MainSection = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [showLogo, setShowLogo] = useState<boolean>(true)
    //////////////////////////////////////////////////
    //VARIABLES//
    const anContext: any = useContext(AnimationContext);

    const bigLogoWrapperClass = classListMaker(["relative", "stretchX"])
    const bigLogoClasses = classListMaker(["relative"])
    const bigTextClasses = classListMaker(["relative"])
    const headerClasses = classListMaker(["relative", "minorColor1Text"])
    const homeHeaderClasses = classListMaker(["homeHeader"])
    const homeHeaderWrapperClasses = classListMaker(["headerWrapper"])

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
    //MAIN HEADER ANIMATION LOGIC//
    //SMALL LOGO ANIMATION LOGIC//
    useEffect(() => {
        if (anContext.bigLogoPlayed === false) {

            animationStore.home.logo.show(
                bigLogoWrapper.current,
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
                setShowLogo,
                anContext.fn.setBigLogoPlayed
            )
        }
        else if (anContext.bigLogoPlayed === true && anContext.smallLogoPlayed === false) {
            animationStore.menu.logo.logoIn();
            setTimeout(() => {
                animationStore.menu.logo.logoTextIn();
            }, 200);
            animationStore.home.mainHeader.show()
            anContext.fn.setSmallLogoPlayed(true)
        }
        else if (anContext.bigLogoPlayed === true && anContext.smallLogoPlayed === true) {
            animationStore.home.mainHeader.show()
            anContext.fn.setSmallLogoPlayed(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //MAIN HEADER AND SMALL LOGO LOGIC//
    useEffect(() => {
        if (showLogo === false) {
            if (anContext.smallLogoPlayed === false) {
                animationStore.menu.logo.logoIn();
                setTimeout(() => {
                    animationStore.menu.logo.logoTextIn();
                }, 200);
                anContext.fn.setSmallLogoPlayed(true)
            }
            animationStore.home.mainHeader.show()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showLogo])
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
                    <div className={homeHeaderWrapperClasses}>
                        <h1 className={homeHeaderClasses}>{text.home.Header.part1.cz}</h1>
                    </div>
                    <div className={homeHeaderWrapperClasses}>
                        <h1 className={homeHeaderClasses}>{text.home.Header.part2.cz}</h1>
                    </div>
                    <div className={homeHeaderWrapperClasses}>
                        <h1 className={homeHeaderClasses}>{text.home.Header.part3.cz}</h1>
                    </div>
                </div>
            </div>
        </>
    )

}

export { Home }
