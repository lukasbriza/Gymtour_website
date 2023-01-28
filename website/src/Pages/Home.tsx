import { useEffect, useState, useRef, FC } from 'react'
import { Link } from 'react-router-dom'
import { BigLogo } from "@components"
import { BigText } from '../Components/SVG/BigText/BigText'
import clsx from 'clsx'
import main from '../assets/main.webp'
import { text } from '../config/textSource'
import { useAnimationContext } from '@hooks'
import { bigLogoAnimation, showHeader, smallLogoShow } from '@animations'
import { routes } from '@config'

const Home: FC = () => {
    return (
        <div
            id="Home"
            className={clsx(["relative", "stretch", "minorColor2", "stretchVH", "minHeightWidth"])}
        >
            <img src={main} alt="homepageImage" />
            <PageHeader />
            <MainSection />
            <Link
                to={routes.crossroad.path}
                id="homeButton"
                className={clsx(["link", "absolute", "centerX"])}
            >
                {text.home.Button.cz}
            </Link>

        </div>
    )
}

const PageHeader: FC = () => {
    return (
        <div
            className={clsx(["stretchX", "relative", "minorColor1Text"])}
            id="pageHeader"
        >
            {text.home.PageHeader.cz}
        </div>
    )
}

const MainSection: FC = () => {
    const [showLogo, setShowLogo] = useState<boolean>(false)
    const { bigLogoPlayed, smallLogoPlayed, fn } = useAnimationContext()
    const { setBigLogoPlayed, setSmallLogoPlayed } = fn

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

    const bigLogoIsCurrent = bigLogoWrapper.current &&
        pathRef.current &&
        gRef.current &&
        yRef.current &&
        mRef.current &&
        tRef.current &&
        oRef.current &&
        uRef.current &&
        rRef.current

    useEffect(() => {
        //INITIAL LOGIC
        if (bigLogoPlayed === false && bigLogoIsCurrent) {
            bigLogoAnimation(
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
                setBigLogoPlayed
            )
            return
        }
        if (bigLogoPlayed === true && smallLogoPlayed === false) {
            smallLogoShow()
            showHeader()
            setSmallLogoPlayed(true)
            return
        }
        if (bigLogoPlayed === true && smallLogoPlayed === true) {
            showHeader()
            setSmallLogoPlayed(true)
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //MAIN HEADER AND SMALL LOGO LOGIC//
    useEffect(() => {
        if (showLogo && !smallLogoPlayed) {
            smallLogoShow()
            setSmallLogoPlayed(true)
        }
        showLogo && showHeader()
    }, [setSmallLogoPlayed, showLogo, smallLogoPlayed])

    return (
        <>
            <div
                id="bigLogoWrapper"
                className={clsx(["relative", "stretchX"])}
                ref={bigLogoWrapper}
            >
                <div className={"relative"}>
                    <BigLogo
                        id="bigLogo"
                        ref={pathRef}
                    />
                </div>
                <div className={"relative"}>
                    <BigText
                        id="bigText"
                        ref={textRef}
                    />
                </div>
            </div>
            <div
                className={clsx(["relative", "minorColor1Text"])}
                id="homeHeader"
                ref={header}
            >
                <div>
                    <div className={"headerWrapper"}>
                        <h1 className={"homeHeader"}>{text.home.Header.part1.cz}</h1>
                    </div>
                    <div className={"headerWrapper"}>
                        <h1 className={"homeHeader"}>{text.home.Header.part2.cz}</h1>
                    </div>
                    <div className={"headerWrapper"}>
                        <h1 className={"homeHeader"}>{text.home.Header.part3.cz}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
