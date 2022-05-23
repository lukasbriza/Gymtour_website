import React, { createContext, useState, useEffect } from 'react'
//FUNCTIONS//
import { setContextBreakpoint } from '../Functions/setContextBreakpoint'

//IMAGES//
import main from '../Images/main.webp'
import fitness from '../Images/fitness.webp'
import trainer from '../Images/trainer.webp'
import register from '../Images/register.webp'

//CONTEXT TYPES//
interface ContextProviderProps {
    children: React.ReactNode
}
export interface AppStateContext {
    width: number,
    actualLocation: string,
    breakPoint: "toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide",
    fitnessSearch: any,
    coachSearch: any,
    fn: {
        setActualLocation: React.Dispatch<React.SetStateAction<string>>,
        preloadCrossroadImg: (timeout: number) => Promise<void>,
        preloadHomeImg: (timeout: number) => Promise<void>,
        preloadMenuImg: (timeout: number) => Promise<void>,
        handleSearchData: (data: dataTypeSearch) => void
    }
}
export interface AnStateContext {
    bigLogoPlayed: boolean,
    smallLogoPlayed: boolean,
    filterOpen: boolean,
    fn: {
        setBigLogoPlayed: React.Dispatch<React.SetStateAction<boolean>>,
        setSmallLogoPlayed: React.Dispatch<React.SetStateAction<boolean>>,
        setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>
    }
}
//CONTEXTS//
const AppContext = createContext<AppStateContext | null>(null)
const AnimationContext = createContext<AnStateContext | null>(null)

//APP CONTEXT//
const AppContextProvider = (props: ContextProviderProps) => {
    const [width, setWidth] = useState<number>(1)
    const [actualLocation, setActualLocation] = useState<string>("/")
    const [breakPoint, setBreakPoint] = useState<"toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide">("toMobile")
    const [fitnessSearch, setFitnessSearch] = useState<searchData>(
        {
            order: 1,
            equipment: [],
            general: [],
            others: [],
            regions: []
        }
    )
    const [coachSearch, setCoachSearch] = useState<any>({
        order: 1,
        regions: []
    })

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
    //////////////////////////////////////////////////////////////////
    //LISTENERS//
    useEffect(() => {
        setWidth(window.innerWidth)
        setContextBreakpoint(width, setBreakPoint)
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
    const handleSearchData = (data: dataTypeSearch) => {
        console.log(data)
        /*
        switch (actualLocation) {
            ////////////////////////////////////////////////////////////////////////
            case "/fitness":
                if (data.type === "order") {
                    setFitnessSearch({
                        ...fitnessSearch,
                        [data.type]: data.code
                    })
                    break
                }
                if (data.type === "regions") {
                    let regionQuery: { regionCode?: string, townCode?: string }[] = fitnessSearch.regions
                    //IS LISTED//
                    let foundRegionIndex = regionQuery.findIndex(
                        (item: { regionCode?: string, townCode?: string }) => item.regionCode === data.region && item.townCode === data.town?.code
                    )
                    if (foundRegionIndex !== -1 && data.town?.checked === false) {
                        //REMOVE WHEN CHECKED PROP IS FALSE//
                        regionQuery.splice(foundRegionIndex, 1)
                    } else {
                        //ADD TO ARRAY//
                        regionQuery.push({ regionCode: data.region, townCode: data.town?.code })
                    }
                    //SET NEW STATE//
                    setFitnessSearch({
                        ...fitnessSearch,
                        regions: regionQuery
                    })
                    break
                }
                //OTHER INPUT TYPES//
                let typeArray: any = fitnessSearch[data.type]
                let removeItemIndex = typeArray.findIndex((item: string) => item === data.code)
                if (removeItemIndex !== -1 && data.checked === false) {
                    //REMOVE WHEN CHECKED PROP IS FALSE//
                    typeArray.splice(removeItemIndex, 1)
                } else {
                    //ADD TO ARRAY//
                    typeArray.push(data.code)
                }
                //SET NEW STATE//
                setFitnessSearch({
                    ...fitnessSearch,
                    [data.type]: typeArray
                })

                break;
            ////////////////////////////////////////////////////////////////////////
            case "/coach":

                break;
        }*/


    }
    //////////////////////////////////////////////////////////////////
    const appState: AppStateContext = {
        width: width,
        actualLocation: actualLocation,
        breakPoint: breakPoint,
        fitnessSearch: fitnessSearch,
        coachSearch: coachSearch,
        fn: {
            setActualLocation: setActualLocation,
            preloadCrossroadImg: preloadCrossroadImg,
            preloadHomeImg: preloadHomeImg,
            preloadMenuImg: preloadMenuImg,
            handleSearchData: handleSearchData
        }
    }

    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}

//ANIMATION CONTEXT//
const AnimationContextProvider = (props: ContextProviderProps) => {
    const [bigLogoPlayed, setBigLogoPlayed] = useState<boolean>(false)
    const [smallLogoPlayed, setSmallLogoPlayed] = useState<boolean>(false)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)

    const animationState: AnStateContext = {
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