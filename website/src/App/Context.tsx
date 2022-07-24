import React, { createContext, useState, useEffect } from 'react'
//FUNCTIONS//
import { setContextBreakpoint } from '../Functions/setContextBreakpoint'
import { handleSearchData } from '../Functions/handleSearchData'

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
    fitnessSearch: searchFitnessData,
    coachSearch: searchCoachData,
    filteredFitnessData: filteredData[] | [],
    filteredCoachData: filteredData[] | [],
    fn: {
        setActualLocation: React.Dispatch<React.SetStateAction<string>>,
        preloadCrossroadImg: (timeout: number) => Promise<void>,
        preloadHomeImg: (timeout: number) => Promise<void>,
        preloadMenuImg: (timeout: number) => Promise<void>,
        handleSearchData: (data: dataTypeSearch) => void,
        setFilteredFitnessData: React.Dispatch<React.SetStateAction<filteredData[]>>,
        setFilteredCoachData: React.Dispatch<React.SetStateAction<filteredData[]>>
    }
}
export interface AnStateContext {
    bigLogoPlayed: boolean,
    smallLogoPlayed: boolean,
    filterOpen: boolean,
    contentPageCross: boolean,
    fn: {
        setBigLogoPlayed: React.Dispatch<React.SetStateAction<boolean>>,
        setSmallLogoPlayed: React.Dispatch<React.SetStateAction<boolean>>,
        setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>,
        setContentPageCross: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface UserStateContext {
    logged: boolean,
    userId: string,
    userObject: userObjectType | undefined,
    fn: {
        setLogged: React.Dispatch<React.SetStateAction<boolean>>,
        setUserId: React.Dispatch<React.SetStateAction<string>>,
        setUserObject: React.Dispatch<React.SetStateAction<userObjectType | undefined>>
    }
}
//CONTEXTS//
const AppContext = createContext<AppStateContext | null>(null)
const AnimationContext = createContext<AnStateContext | null>(null)
const UserContext = createContext<UserStateContext | null>(null)
/////////////////////////////////////////////////////////////////////////////
//APP CONTEXT//
const AppContextProvider = (props: ContextProviderProps) => {
    //////////////////////////////////////////////////////////////////
    //CONTEXT STATE//
    const [width, setWidth] = useState<number>(1)
    const [actualLocation, setActualLocation] = useState<string>("/")
    const [breakPoint, setBreakPoint] = useState<"toMobile" | "fromMobile" | "fromTablet" | "fromDesktop" | "fromWide">("toMobile")
    const [fitnessSearch, setFitnessSearch] = useState<searchFitnessData>(
        {
            order: 1,
            equipment: [],
            general: [],
            others: [],
            regions: []
        }
    )
    const [coachSearch, setCoachSearch] = useState<searchCoachData>({
        order: 1,
        regions: [],
        others: [],
        specialization: [],
        gender: []
    })
    const [filteredFitnessData, setFilteredFitnessData] = useState<filteredData[] | []>([])
    const [filteredCoachData, setFilteredCoachData] = useState<filteredData[] | []>([])
    //////////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////
    //PRELOAD IMAGE FNUNCTION//
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
    //FUNCTIONS//
    const handleSearchDataSubstitution = (data: dataTypeSearch) => {
        handleSearchData(data, setFitnessSearch, fitnessSearch, setCoachSearch, coachSearch, actualLocation)
    }
    //////////////////////////////////////////////////////////////////
    //LISTENERS//
    useEffect(() => {
        setWidth(window.innerWidth)
        setContextBreakpoint(width, setBreakPoint)
    }, [])
    useEffect(() => { setContextBreakpoint(width, setBreakPoint) }, [width])

    window.addEventListener('resize', () => { setWidth(window.innerWidth) })
    //////////////////////////////////////////////////////////////////
    const appState: AppStateContext = {
        width: width,
        actualLocation: actualLocation,
        breakPoint: breakPoint,
        fitnessSearch: fitnessSearch,
        coachSearch: coachSearch,
        filteredFitnessData: filteredFitnessData,
        filteredCoachData: filteredCoachData,
        fn: {
            setActualLocation: setActualLocation,
            preloadCrossroadImg: preloadCrossroadImg,
            preloadHomeImg: preloadHomeImg,
            preloadMenuImg: preloadMenuImg,
            handleSearchData: handleSearchDataSubstitution,
            setFilteredFitnessData: setFilteredFitnessData,
            setFilteredCoachData: setFilteredCoachData
        }
    }

    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}
/////////////////////////////////////////////////////////////////////////////
//ANIMATION CONTEXT//
const AnimationContextProvider = (props: ContextProviderProps) => {
    const [bigLogoPlayed, setBigLogoPlayed] = useState<boolean>(false)
    const [smallLogoPlayed, setSmallLogoPlayed] = useState<boolean>(false)
    const [filterOpen, setFilterOpen] = useState<boolean>(false)
    const [contentPageCross, setContentPageCross] = useState<boolean>(false)

    const animationState: AnStateContext = {
        bigLogoPlayed: bigLogoPlayed,
        smallLogoPlayed: smallLogoPlayed,
        filterOpen: filterOpen,
        contentPageCross: contentPageCross,
        fn: {
            setBigLogoPlayed: setBigLogoPlayed,
            setSmallLogoPlayed: setSmallLogoPlayed,
            setFilterOpen: setFilterOpen,
            setContentPageCross: setContentPageCross
        }
    }

    return (
        <AnimationContext.Provider value={animationState}>
            {props.children}
        </AnimationContext.Provider>
    )
}

const UserContextProvider = (props: ContextProviderProps) => {
    const [logged, setLogged] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>("")
    const [userObject, setUserObject] = useState<userObjectType | undefined>()

    const userState: UserStateContext = {
        logged: logged,
        userId: userId,
        userObject: userObject,
        fn: {
            setLogged: setLogged,
            setUserId: setUserId,
            setUserObject: setUserObject
        }
    }

    return (
        <UserContext.Provider value={userState}>
            {props.children}
        </UserContext.Provider>
    )
}

export {
    AppContext,
    AnimationContext,
    UserContext,
    AppContextProvider,
    AnimationContextProvider,
    UserContextProvider
}