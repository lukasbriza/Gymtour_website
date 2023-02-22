import { FC, createContext, useMemo, useState } from "react"
import { ContextProviderProps, FilterStateContext } from "./_types"

const initialstate = {}

export const FilterContext = createContext<FilterStateContext>(initialstate)
FilterContext.displayName = 'FilterContext'

export const FilterContexProvider: FC<ContextProviderProps> = (props) => {

    const filterState = useMemo(() => ({

    }), [])

    return (
        <FilterContext.Provider value={filterState}>{props.children}</FilterContext.Provider>
    )
}