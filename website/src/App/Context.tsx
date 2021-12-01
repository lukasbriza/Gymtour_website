import {createContext, useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

//CONTEXTS//
const AppContext = createContext({})
const AnimationContext = createContext({})

const AppContextProvider = (props: any) => {
    const [width, setWidth] = useState<number|undefined>(undefined)
    const [actualLocation, setActualLocation] = useState<string>("/")
    
    //LISTENERS//
    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])
    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    let appState = {
        width: width,
        actualLocation: actualLocation,
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