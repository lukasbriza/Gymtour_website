import React, { useState, useEffect, useRef, useContext } from 'react';
import { FilterHeader } from './FilterHeader'
import { AppContext } from '../../App/Context';
//CONFIG//
import { config, animationStore } from '../../config/mainConfiguration'
import { text } from '../../config/textSource'
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

const FilterTypes = React.memo(React.forwardRef((props: filterType, ref: any) => {
    //////////////////////////////////////////////////
    //STATE//
    //STATE FOR ORDER INPUT//
    const [popularity, setPopularity] = useState<boolean>(true)
    const [name, setName] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const filterTypesClasses = classListMaker(["filterType"])
    const inputWrapperClasses = classListMaker(["filterInputWrapper"])

    let component;

    const appContext = useContext(AppContext)
    //////////////////////////////////////////////////
    //FUNCTIONS//
    //////////////////////////////////////////////////
    //SETUP//
    //REGIONS//
    if (props.type === "regions") {
        component = props.data.map(
            (region:
                {
                    name: { cz: string, eng: string },
                    code: string,
                    towns: {
                        name: { cz: string, eng: string },
                        code: string
                    }[]
                }
            ) => {
                let header;
                let townBoxes;
                //ALLOW ONLY PRAGUE - FILTER OTHER CONTENT//
                if (region.name.cz === "Hlavní město Praha") {
                    header = <p className={"regionHeader"}>{region.name.cz}</p>
                    townBoxes = region.towns.map((town: { name: { cz: string, eng: string }, code: string }) => {
                        return (
                            <div
                                className={inputWrapperClasses + " townWrapper"}
                                key={town.code}
                            >
                                <input
                                    type="checkbox"
                                    name={town.name.cz}
                                    id={town.name.cz}
                                    value={town.name.cz}
                                    onChange={(e: any) => {
                                        appContext?.fn.handleSearchData({
                                            type: props.type,
                                            region: region.code,
                                            town: { code: town.code, checked: e.target.checked }
                                        })
                                    }}
                                />
                                <label htmlFor={town.name.cz}>{town.name.cz}</label>
                            </div>
                        )
                    })

                    return (
                        <div
                            className={"regionWrapper"}
                            key={region.code}
                        >
                            {header}
                            {townBoxes}
                        </div>
                    )
                } else {
                    return null
                }
            }
        )
        //REGIONS RETURN//
        return (
            <div
                className={filterTypesClasses}
                ref={ref}
            >
                {component}
            </div>
        )
    }
    //////////////////////////////////////////////////
    //EQUIPMENT, GENERAL, GENDER, SPECIALIZATION, OTHERS//
    else if (
        props.type === "equipment" ||
        props.type === "general" ||
        props.type === "others" ||
        props.type === "gender" ||
        props.type === "specialization"
    ) {
        component = props.data.map((equipment: { name: { cz: string, eng: string }, code: string }) => {
            return (
                <div
                    className={inputWrapperClasses + " basicCheckboxWrapper"}
                    key={equipment.code}
                >
                    <input
                        type="checkbox"
                        name={equipment.name.cz}
                        id={equipment.name.cz}
                        value={equipment.name.cz}
                        onChange={
                            (e: any) => {
                                appContext?.fn.handleSearchData({
                                    type: props.type,
                                    code: equipment.code,
                                    checked: e.target.checked
                                })
                            }}
                    />
                    <label htmlFor={equipment.name.cz}>{equipment.name.cz}</label>
                </div>
            )
        })
        //EQUIPMENT, GENERAL, OTHERS RETURN//
        return (
            <div
                className={filterTypesClasses}
                ref={ref}
            >
                {component}
            </div>
        )
    }
    //////////////////////////////////////////////////
    //ORDER//
    else if (props.type === "order") {
        component = (
            <>
                <div
                    className={inputWrapperClasses + " orderInput"}
                >
                    <input
                        type="radio"
                        name="popularity"
                        id="inputPopularity"
                        value={text.fitness.Filter.sort[0].cz}
                        onChange={(e: any) => {
                            if (e.target.checked) {
                                appContext?.fn.handleSearchData({
                                    type: props.type,
                                    code: String(1),
                                    checked: e.target.checked
                                })
                            }
                            e.target.checked ? setPopularity(true) : setPopularity(false);
                            e.target.checked ? setName(false) : setName(true);
                        }}
                        checked={popularity}
                    />
                    <label htmlFor="inputPopularity">{text.fitness.Filter.sort[0].cz}</label>
                </div>
                <div
                    className={inputWrapperClasses + " orderInput"}
                >
                    <input
                        type="radio"
                        name="name"
                        id="inputName"
                        value={text.fitness.Filter.sort[1].cz}
                        onChange={(e: any) => {
                            if (e.target.checked) {
                                appContext?.fn.handleSearchData({
                                    type: props.type,
                                    code: String(2),
                                    checked: e.target.checked
                                })
                            }
                            e.target.checked ? setName(true) : setName(false);
                            e.target.checked ? setPopularity(false) : setPopularity(true);
                        }}
                        checked={name}
                    />
                    <label htmlFor="inputName">{text.fitness.Filter.sort[1].cz}</label>
                </div>
            </>
        )
        return (
            <div
                className={filterTypesClasses}
                ref={ref}
            >
                {component}
            </div>
        )
    }
    //LOADING//
    else {
        return <div className={filterTypesClasses}>Loading...</div>
    }
}))
export { FilterSection }