import { useEffect, useContext, useState, useRef, createRef } from 'react'
import { Link } from 'react-router-dom'
import { BigLogo } from '../Components/SVG/BigLogo'
import { BigText } from '../Components/SVG/BigText'

import main from '../Images/main.webp'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AnimationContext, AppContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

///////////////////////////////////////////////////////////////////////////////////////
const Home = () => {
    const appContext = useContext(AppContext)
    //////////////////////////////////////////////////
    //VARIABLES//
    const buttonClasses = classListMaker(["link", "absolute", "centerX"])
    const homeClasses = classListMaker(["stretchVH", "minHeightWidth"])
    //////////////////////////////////////////////////
    //FUNCTION//
    const fetchPages = async () => {
        config.routes.crossroad.component.preload()
    }
    //////////////////////////////////////////////////
    //PRELOAD - FETCH//
    useEffect(() => {
        fetchPages().then(() => {
            console.log('Crossroad preloaded...')
        })
        appContext?.fn.preloadCrossroadImg(1000)
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            id="Home"
            className={config.basePageClassList + " " + homeClasses}
        >
            <img src={main} alt="homepageImage" />
            <PageHeader />
            <MainSection />
            <Link
                to={config.routes.crossroad.path}
                id="homeButton"
                className={buttonClasses}
                onMouseEnter={() => { config.routes.crossroad.component.preload() }}
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
    const [logoScale, setLogoScale] = useState<number>(0.7)
    const [textScale, setTextScale] = useState<number>(0.5)
    //////////////////////////////////////////////////
    //VARIABLES//
    const anContext = useContext(AnimationContext);
    const appContext = useContext(AppContext)

    const bigLogoWrapperClass = classListMaker(["relative", "stretchX"])
    const bigLogoClasses = classListMaker(["relative"])
    const bigTextClasses = classListMaker(["relative"])
    const headerClasses = classListMaker(["relative", "minorColor1Text"])
    const homeHeaderClasses = classListMaker(["homeHeader"])
    const homeHeaderWrapperClasses = classListMaker(["headerWrapper"])

    const bigLogoWrapper = useRef<HTMLDivElement>(null)
    const pathRef = useRef<SVGPathElement>(null)
    const gRef = useRef<SVGPathElement>(null)
    const yRef = useRef<SVGPathElement>(null)
    const mRef = useRef<SVGPathElement>(null)
    const tRef = useRef<SVGPathElement>(null)
    const oRef = useRef<SVGPathElement>(null)
    const uRef = useRef<SVGPathElement>(null)
    const rRef = useRef<SVGPathElement>(null)
    const textRef: any = useRef({ gRef, yRef, mRef, tRef, oRef, uRef, rRef })

    const header = useRef<HTMLDivElement>(null)

    //////////////////////////////////////////////////
    //ANIMATIONS//
    //////////////////////////////////////////////////
    //BIG LOGO ANIMATION LOGIC//
    //MAIN HEADER ANIMATION LOGIC//
    //SMALL LOGO ANIMATION LOGIC//
    useEffect(() => {
        if (anContext?.bigLogoPlayed === false) {

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
        else if (anContext?.bigLogoPlayed === true && anContext.smallLogoPlayed === false) {
            animationStore.menu.logo.logoIn();
            setTimeout(() => {
                animationStore.menu.logo.logoTextIn();
            }, 200);
            animationStore.home.mainHeader.show()
            anContext.fn.setSmallLogoPlayed(true)
        }
        else if (anContext?.bigLogoPlayed === true && anContext.smallLogoPlayed === true) {
            animationStore.home.mainHeader.show()
            anContext.fn.setSmallLogoPlayed(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //MAIN HEADER AND SMALL LOGO LOGIC//
    useEffect(() => {
        if (showLogo === false) {
            if (anContext?.smallLogoPlayed === false) {
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
    //LOGO SCALE LOGIC//
    useEffect(() => {
        switch (appContext?.breakPoint) {
            case "fromMobile":
                setLogoScale(0.5)
                setTextScale(0.3)
                break;
            default:
                setLogoScale(0.7)
                setTextScale(0.5)
        }
    }, [appContext?.breakPoint])
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
                        scale={logoScale}
                        ref={pathRef}
                    />
                </div>
                <div className={bigTextClasses}>
                    <BigText
                        id="bigText"
                        scale={textScale}
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

export default Home
