import {createContext, useState} from 'react'

//CONTEXTS//
const AppContext = createContext({})
const AnimationContext = createContext({})

const AppContextProvider = (props:any) => {
    
    let appState = {}

    return(
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}

const AnimationContextProvider = (props:any) => {
    
    let animationState = {}

    return(
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