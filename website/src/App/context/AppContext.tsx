import { FC, createContext, useMemo, useState } from "react";
import { AppStateContext, BreakPoints, ContextProviderProps } from "./_types";
import { getBreakPoint, preloadImg } from 'src/utils/_index'

//IMAGES//
import main from '@assets/main.webp'
import fitness from '@assets/fitness.webp'
import trainer from '@assets/trainer.webp'
import register from '@assets/register.webp'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultState: AppStateContext = {
    width: undefined,
    actualLocation: undefined,
    breakPoint: undefined,
    fn: {
        setActualLocation: () => { throw new Error('Context does not have a matching provider!') },
        preloadCrossroadImg: () => { throw new Error('Context does not have a matching provider!') },
        preloadHomeImg: () => { throw new Error('Context does not have a matching provider!') },
        preloadMenuImg: () => { throw new Error('Context does not have a matching provider!') },
    }
}

//IMAGES//
const crossroadArr = [
    { name: "fitness", img: fitness },
    { name: "trainer", img: trainer },
    { name: "register", img: register }
]
const homeArr = [
    { name: "home", img: main }
]
const menuArr = [
    { name: "home", img: main },
    //about , coop, contact
]

export const AppContext = createContext<AppStateContext>(defaultState)
AppContext.displayName = 'AppContext'

export const AppContextProvider: FC<ContextProviderProps> = (props) => {
    const [width, setWidth] = useState<number>(window.innerWidth)
    const [actualLocation, setActualLocation] = useState<string>("/")
    const [breakPoint, setBreakPoint] = useState<BreakPoints>(getBreakPoint(window.innerWidth))
    const location = useLocation()
    const { children } = props

    useEffect(() => {
        setWidth(window.innerWidth)
        setBreakPoint(getBreakPoint(window.innerWidth))
    }, [])

    useEffect(() => {
        const handler = () => {
            setWidth(window.innerWidth)
            const compute = getBreakPoint(window.innerWidth)
            if (compute !== breakPoint) {
                setBreakPoint(compute)
            }
        }

        window.addEventListener('resize', handler)
        return () => {
            window.removeEventListener('resize', handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (location.pathname !== actualLocation) {
            setActualLocation(location.pathname)
        }
    }, [actualLocation, location])

    const context = useMemo<AppStateContext>(() => ({
        width: width,
        actualLocation: actualLocation,
        breakPoint: breakPoint,
        fn: {
            setActualLocation: setActualLocation,
            preloadCrossroadImg: preloadImg(crossroadArr),
            preloadHomeImg: preloadImg(homeArr),
            preloadMenuImg: preloadImg(menuArr),
        }
    }), [width, actualLocation, breakPoint])

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}