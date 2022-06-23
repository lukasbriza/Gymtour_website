import React, { useState, useEffect, useRef } from 'react';
import { FilterHeader } from './FilterHeader'
import { FilterTypes } from './FilterTypes'
import { AppContext } from '../../App/Context';
//CONFIG//
import { config, animationStore } from '../../config/mainConfiguration'
//FUNCTUION//
import { classListMaker } from '../../Functions/classListMaker'

const FilterSection = React.memo((props: filterSection) => {
    //////////////////////////////////////////////////
    //STATE//
    const [arrow, setArrow] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const filterSectionClasses = classListMaker(["filterSection", "relative"])

    const typesRef = useRef<HTMLDivElement>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    const heighRef = useRef<number>()
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        if (arrow === true) {
            animationStore.fitness.filter.arrowUp(arrowRef.current, typesRef.current, heighRef.current)
        }
        if (arrow === false) {
            animationStore.fitness.filter.arrowDown(arrowRef.current, typesRef.current, heighRef.current)
        }
    }, [arrow, props.filterType])
    useEffect(() => {
        if (
            props.filterType === "regions" ||
            props.filterType === "equipment" ||
            props.filterType === "general" ||
            props.filterType === "specialization" ||
            props.filterType === "others" ||
            props.filterType === "gender"
        ) {
            switch (props.filterType) {
                case "regions":
                    heighRef.current = config.filter.typesHeight.regions
                    break;
                case "equipment":
                    heighRef.current = config.filter.typesHeight.equipment
                    break;
                case "general":
                    heighRef.current = config.filter.typesHeight.general
                    break;
                case "specialization":
                    heighRef.current = config.filter.typesHeight.specialization
                    break;
                case "others":
                    heighRef.current = config.filter.typesHeight.others
                    break;
                case "gender":
                    heighRef.current = config.filter.typesHeight.gender
                    break;
            }
            setArrow(true)
        }
        if (props.filterType === "order") {
            heighRef.current = config.filter.typesHeight.order
        }
    }, [props.filterType])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            className={filterSectionClasses}
        >
            <FilterHeader
                title={props.header}
                onClick={() => { setArrow(!arrow) }}
                ref={arrowRef}
            />
            <FilterTypes
                type={props.filterType}
                data={props.data}
                ref={typesRef}
            />
        </div>
    )
})

export { FilterSection }