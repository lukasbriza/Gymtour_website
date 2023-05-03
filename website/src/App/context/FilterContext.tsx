import { FC, createContext, useCallback, useEffect, useMemo, useState } from "react"
import { CoachFilterContext, ContextProviderProps, FitnessFilterContext } from "./_types"
import { filter } from "@config"
import { BoltProps, FilterVariants } from "@components"
import { Coach, Fitness } from "@fetchers"

const fitnessInitialState: FitnessFilterContext = {
    limit: filter.defaultLimit,
    filteredContent: [],
    contentLoading: false,
    bolts: [],
    setContent: () => { throw new Error('Context does not have a matching provider!') },
    setLimit: () => { throw new Error('Context does not have a matching provider!') },
    setLoading: () => { },
    register: () => { throw new Error('Context does not have a matching provider!') },
    addBolt: () => { throw new Error('Context does not have a matching provider!') },
    removeBolt: () => { throw new Error('Context does not have a matching provider!') },
}

const coachInitialState: CoachFilterContext = {
    limit: filter.defaultLimit,
    filteredContent: [],
    contentLoading: false,
    bolts: [],
    setContent: () => { throw new Error('Context does not have a matching provider!') },
    setLimit: () => { throw new Error('Context does not have a matching provider!') },
    setLoading: () => { },
    register: () => { throw new Error('Context does not have a matching provider!') },
    addBolt: () => { throw new Error('Context does not have a matching provider!') },
    removeBolt: () => { throw new Error('Context does not have a matching provider!') },
}

export const CoachContext = createContext<CoachFilterContext>(coachInitialState)
CoachContext.displayName = "CoachFilterContext"

export const FitnessContext = createContext<FitnessFilterContext>(fitnessInitialState)
FitnessContext.displayName = "FitnessFilterContext"

export const FilterContexProvider: FC<ContextProviderProps & { type: "coach" | "fitness" }> = ({ type, children }) => {
    const [fitnessLimit, setFitnessLimit] = useState<number>(filter.defaultLimit)
    const [fitnessLoading, setFitnessLoading] = useState(false)
    const [fitnessBolts, setFitnessBolts] = useState<BoltProps[]>([])
    const [filteredFitnesses, setFilteredFitnesses] = useState<Fitness[]>([])

    const [coachLimit, setCoachLimit] = useState<number>(filter.defaultLimit)
    const [coachLoading, setCoachLoading] = useState(false)
    const [coachBolts, setCoachBolts] = useState<BoltProps[]>([])
    const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([])


    const addBolt = useCallback((text: string, code: string, fieldName?: string,) => {
        type === "coach" ? setCoachBolts((value) => [...value, { code, text, fieldName }]) : setFitnessBolts((value) => [...value, { code, text, fieldName }])
    }, [type])

    const removeBolt = useCallback((code: string) => {
        const boltArr = type === "coach" ? coachBolts : fitnessBolts
        const index = boltArr.findIndex((value) => value.code === code)
        if (index !== -1) {
            boltArr.splice(index, 1)
            type === "coach" ? setCoachBolts(boltArr) : setFitnessBolts(boltArr)
            return
        }

    }, [coachBolts, fitnessBolts, type])

    const registerBoltsFilter = useCallback((type: FilterVariants) => (state: boolean, code: string, text: string, fieldName: string) => {
        const boltArr = type === "coach" ? coachBolts : fitnessBolts
        if (state) {
            const index = boltArr.findIndex((value) => value.code === code)
            if (index !== -1 && boltArr[index].text !== text) {
                boltArr[index] = { text, code }
                return
            }
            if (index === -1) {
                addBolt(text, code, fieldName)
            }
            return
        }
        removeBolt(code)
    }, [addBolt, coachBolts, fitnessBolts, removeBolt])

    const coachFilterContext: CoachFilterContext = useMemo(() => ({
        limit: coachLimit,
        filteredContent: filteredCoaches,
        contentLoading: coachLoading,
        bolts: coachBolts,
        setContent: setFilteredCoaches,
        setLimit: setCoachLimit,
        setLoading: setCoachLoading,
        addBolt: addBolt,
        removeBolt: removeBolt,
        register: registerBoltsFilter(type)
    }), [addBolt, coachBolts, coachLimit, coachLoading, filteredCoaches, registerBoltsFilter, removeBolt, type])

    const fitnessFiterContext: FitnessFilterContext = useMemo(() => ({
        limit: fitnessLimit,
        filteredContent: filteredFitnesses,
        contentLoading: fitnessLoading,
        bolts: fitnessBolts,
        setContent: setFilteredFitnesses,
        setLimit: setFitnessLimit,
        setLoading: setFitnessLoading,
        addBolt: addBolt,
        removeBolt: removeBolt,
        register: registerBoltsFilter(type)
    }), [addBolt, filteredFitnesses, fitnessBolts, fitnessLimit, fitnessLoading, registerBoltsFilter, removeBolt, type])

    return type === "coach" ?
        (
            <CoachContext.Provider value={coachFilterContext}>
                {children}
            </CoachContext.Provider>
        ) : (
            <FitnessContext.Provider value={fitnessFiterContext}>
                {children}
            </FitnessContext.Provider>
        )

}