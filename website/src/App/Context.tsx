import { createContext, useState, useEffect } from 'react'
//FUNCTIONS//
import { setContextBreakpoint } from '../Functions/setContextBreakpoint'

//CONTEXTS//
const AppContext = createContext({})
const AnimationContext = createContext({})

//APP CONTEXT//
const AppContextProvider = (props: any) => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    const [actualLocation, setActualLocation] = useState<string>("/")
    const [breakPoint, setBreakPoint] = useState<"toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide">("toMobile")

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

    let appState = {
        width: width,
        actualLocation: actualLocation,
        breakPoint: breakPoint,
        fn: {
            setActualLocation: setActualLocation,
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


    let animationState = {
        bigLogoPlayed: bigLogoPlayed,
        smallLogoPlayed: smallLogoPlayed,
        fn: {
            setBigLogoPlayed: setBigLogoPlayed,
            setSmallLogoPlayed: setSmallLogoPlayed
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