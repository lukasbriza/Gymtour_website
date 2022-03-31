import React, { useEffect, useContext, useRef } from 'react'
import { FilterSection } from '../Components/FilterSection'
//CONTEXT//
import { AppContext, AnimationContext } from '../App/Context'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const ContentFilter = React.memo((props: { open: boolean }) => {
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const anContext = useContext(AnimationContext)
    const filterSecctionWrapperClasses = classListMaker(["filterSectionWrapper"])

    const wrapperRef = useRef(null)
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        if (props.open === true) {
            animationStore.fitness.filter.show(wrapperRef.current)
        }
        if (props.open === false) {
            animationStore.fitness.filter.hide(wrapperRef.current)
        }
    }, [props.open])
    //////////////////////////////////////////////////
    //FETCHING//
    useEffect(() => {
        //fetching filter data
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <section
            className={filterSecctionWrapperClasses}
            ref={wrapperRef}
        >
            <FilterSection />
        </section>
    )
})

export { ContentFilter }