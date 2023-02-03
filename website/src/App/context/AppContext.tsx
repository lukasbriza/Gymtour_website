import { FC, createContext, useMemo, useState } from "react";
import { AppStateContext, BreakPoints, ContextProviderProps } from "./_types";
import { getBreakPoint, handleSearchData, preloadImg } from 'src/utils/_index'

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
    fitnessSearch: {
        order: 1,
        equipment: [],
        general: [],
        others: [],
        regions: []
    },
    coachSearch: {
        order: 1,
        regions: [],
        others: [],
        specialization: [],
        gender: []
    },
    filteredFitnessData: [],
    filteredCoachData: [],
    fn: {
        setActualLocation: () => { throw new Error('Context does not have a matching provider!') },
        preloadCrossroadImg: () => { throw new Error('Context does not have a matching provider!') },
        preloadHomeImg: () => { throw new Error('Context does not have a matching provider!') },
        preloadMenuImg: () => { throw new Error('Context does not have a matching provider!') },
        handleSearchData: () => { throw new Error('Context does not have a matching provider!') },
        setFilteredCoachData: () => { throw new Error('Context does not have a matching provider!') },
        setFilteredFitnessData: () => { throw new Error('Context does not have a matching provider!') }
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
    const [fitnessSearch, setFitnessSearch] = useState<searchFitnessData>(defaultState.fitnessSearch)
    const [coachSearch, setCoachSearch] = useState<searchCoachData>(defaultState.coachSearch)
    const [filteredFitnessData, setFilteredFitnessData] = useState<filteredData[] | []>([])
    const [filteredCoachData, setFilteredCoachData] = useState<filteredData[] | []>([])
    const location = useLocation()
    const { children } = props

    const handleSearchDataSubstitution = (data: dataTypeSearch) => {
        handleSearchData(data, setFitnessSearch, fitnessSearch, setCoachSearch, coachSearch, actualLocation)
    }

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
        fitnessSearch: fitnessSearch,
        coachSearch: coachSearch,
        filteredFitnessData: filteredFitnessData,
        filteredCoachData: filteredCoachData,
        fn: {
            setActualLocation: setActualLocation,
            preloadCrossroadImg: preloadImg(crossroadArr),
            preloadHomeImg: preloadImg(homeArr),
            preloadMenuImg: preloadImg(menuArr),
            handleSearchData: handleSearchDataSubstitution,
            setFilteredFitnessData: setFilteredFitnessData,
            setFilteredCoachData: setFilteredCoachData
        }
    }), [width, actualLocation, breakPoint, fitnessSearch, coachSearch, filteredFitnessData, filteredCoachData])

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}