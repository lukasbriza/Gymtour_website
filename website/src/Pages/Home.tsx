import { useEffect, useState, useRef, FC } from 'react'
import { Link } from 'react-router-dom'
import { BigLogo } from "src/components/_index"
import { BigText } from '../components/SVG/BigText/BigText'
import clsx from 'clsx'
import main from '../assets/main.webp'
import { text } from '../config/textSource'
import { useAnimationContext } from 'src/hooks/_index'
import { bigLogoAnimation, showHeader, smallLogoShow } from '@animations'
import { routes } from 'src/config/_index'

//TODO! - change linf for button
const Home: FC = () => {
    const { bigLogoPlayed } = useAnimationContext()
    return (
        <div
            id="Home"
            className={clsx(["relative", "stretch", "minorColor2", "stretchVH", "minHeightWidth"])}
        >
            <img src={main} alt="homepageImage" />
            <PageHeader />
            <MainSection />
            {
                bigLogoPlayed &&
                <Link
                    to={routes.crossroad.path}
                    id="homeButton"
                    className={clsx(["link", "absolute", "centerX"])}
                >
                    {text.home.Button.cz}
                </Link>
            }

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

    useEffect(() => {
        if (bigLogoPlayed === false) {
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
            showHeader()
            return
        }
        if (bigLogoPlayed === true && smallLogoPlayed === true) {
            showHeader()
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
