import { createContext, useState } from 'react'


//CONTEXTS//
const AppContext = createContext({})
const AnimationContext = createContext({})

const AppContextProvider = (props: any) => {
    const [width, setWidth] = useState<number|undefined>(undefined)
    
    //LISTENERS//
        window.addEventListener('load', () => {
            setWidth(window.innerWidth)
        })
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth)
        })



    let appState = {
        width: width,

        fn: {

        }
    }

    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}

const AnimationContextProvider = (props: any) => {


    let animationState = {

        fn: {

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