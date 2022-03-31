import { createContext, useState, useEffect } from 'react'
//FUNCTIONS//
import { setContextBreakpoint } from '../Functions/setContextBreakpoint'

//IMAGES//
import main from '../Images/main.webp'
import fitness from '../Images/fitness.webp'
import trainer from '../Images/trainer.webp'
import register from '../Images/register.webp'

//CONTEXTS//
const AppContext = createContext({})
const AnimationContext = createContext({})

//APP CONTEXT//
const AppContextProvider = (props: any) => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    const [actualLocation, setActualLocation] = useState<string>("/")
    const [breakPoint, setBreakPoint] = useState<"toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide">("toMobile")

    let crossroadArr = [
        { name: "fitness", img: fitness },
        { name: "trainer", img: trainer },
        { name: "register", img: register }
    ]
    let homeArr = [
        { name: "home", img: main }
    ]
    let menuArr = [
        { name: "home", img: main },
        //about , coop, contact
    ]
    //////////////////////////////////////////////////////////////////
    //LISTENERS//
    useEffect(() => {
        setWidth(window.innerWidth)
        setContextBreakpoint(width, setBreakPoint)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => { setContextBreakpoint(width, setBreakPoint) }, [width])

    window.addEventListener('resize', () => { setWidth(window.innerWidth) })
    //////////////////////////////////////////////////////////////////
    const cacheImg = (arr: any) => {
        arr.forEach(async (obj: any) => {
            let img = new Image()
            img.src = obj.img
            img.onload = () => { console.log("Img: " + obj.name + " loaded...") }
        })
    }
    const preloadCrossroadImg = async (timeout: number) => {
        setTimeout(() => {
            cacheImg(crossroadArr)
        }, timeout)
    }
    const preloadHomeImg = async (timeout: number) => {
        setTimeout(() => {
            cacheImg(homeArr)
        }, timeout)
    }
    const preloadMenuImg = async (timeout: number) => {
        setTimeout(() => {
            cacheImg(menuArr)
        }, timeout)
    }
    //////////////////////////////////////////////////////////////////

    let appState = {
        width: width,
        actualLocation: actualLocation,
        breakPoint: breakPoint,
        fn: {
            setActualLocation: setActualLocation,
            preloadCrossroadImg: preloadCrossroadImg,
            preloadHomeImg: preloadHomeImg,
            preloadMenuImg: preloadMenuImg
        }
    }

    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}

//ANIMATION CONTEXT//
const AnimationContextProvider = (props: any) => {
    const [bigLogoPlayed, setBigLogoPlayed] = useState<boolean>(false)
    const [smallLogoPlayed, setSmallLogoPlayed] = useState<boolean>(false)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    let animationState = {
        bigLogoPlayed: bigLogoPlayed,
        smallLogoPlayed: smallLogoPlayed,
        filterOpen: filterOpen,
        fn: {
            setBigLogoPlayed: setBigLogoPlayed,
            setSmallLogoPlayed: setSmallLogoPlayed,
            setFilterOpen: setFilterOpen
        }
    }

    return (
        <AnimationContext.Provider value={animationState}>
            {props.children}
        </AnimationContext.Provider>
    )
}

export {
    AppContext,
    AnimationContext,
    AppContextProvider,
    AnimationContextProvider
}