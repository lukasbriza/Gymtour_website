import React, { useState, useEffect, useRef } from 'react';
import { FilterHeader } from './FilterHeader'
import { FilterTypes } from './FilterTypes'
import { classListMaker } from '../../utils/classListMaker'
import { filter } from 'src/config/_index';
import { arrowDown, arrowUp } from '@animations';

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
        if (arrowRef.current && typesRef.current && heighRef.current) {
            if (arrow === true) {
                arrowUp(arrowRef.current, typesRef.current, heighRef.current)
            }
            if (arrow === false) {
                arrowDown(arrowRef.current, typesRef.current, heighRef.current)
            }
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
                    heighRef.current = filter.typesHeight.regions
                    break;
                case "equipment":
                    heighRef.current = filter.typesHeight.equipment
                    break;
                case "general":
                    heighRef.current = filter.typesHeight.general
                    break;
                case "specialization":
                    heighRef.current = filter.typesHeight.specialization
                    break;
                case "others":
                    heighRef.current = filter.typesHeight.others
                    break;
                case "gender":
                    heighRef.current = filter.typesHeight.gender
                    break;
            }
            setArrow(true)
        }
        if (props.filterType === "order") {
            heighRef.current = filter.typesHeight.order
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