import { FC, createContext, useEffect, useMemo, useState } from "react";
import { AnimationStateContext, ContextProviderProps } from "./_types";
import { useAppContext } from "@hooks";
import { smallLogoShow } from "@animations";
import { useLocation } from "react-router-dom";

const defaultState: AnimationStateContext = {
    bigLogoPlayed: false,
    smallLogoPlayed: false,
    filterOpen: false,
    contentPageCross: false,
    fn: {
        setBigLogoPlayed: () => { throw new Error('Context does not have a matching provider!') },
        setSmallLogoPlayed: () => { throw new Error('Context does not have a matching provider!') },
        setFilterOpen: () => { throw new Error('Context does not have a matching provider!') },
        setContentPageCross: () => { throw new Error('Context does not have a matching provider!') }
    }
}
export const AnimationContext = createContext<AnimationStateContext>(defaultState)
AnimationContext.displayName = 'AnimationContext'

export const AnimationContextProvider: FC<ContextProviderProps> = (props) => {
    const [bigLogoPlayed, setBigLogoPlayed] = useState<boolean>(defaultState.bigLogoPlayed)
    const [smallLogoPlayed, setSmallLogoPlayed] = useState<boolean>(defaultState.smallLogoPlayed)
    const [filterOpen, setFilterOpen] = useState<boolean>(defaultState.filterOpen)
    const [contentPageCross, setContentPageCross] = useState<boolean>(defaultState.contentPageCross)
    const location = useLocation()
    const { children } = props

    useEffect(() => {
        if (location.pathname !== "/" && smallLogoPlayed === false) {
            setBigLogoPlayed(true);
            smallLogoShow();
            setSmallLogoPlayed(true);

        }
    }, [location, smallLogoPlayed])

    const animationState: AnimationStateContext = useMemo(() => ({
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
    }), [bigLogoPlayed, smallLogoPlayed, filterOpen, contentPageCross])

    return (
        <AnimationContext.Provider value={animationState}>
            {children}
        </AnimationContext.Provider>
    )
}