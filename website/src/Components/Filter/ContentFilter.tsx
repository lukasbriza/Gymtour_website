import React, { useEffect, useContext, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { FilterSection } from './FilterSection'
import { Button } from '../Button'
import { gsap } from 'gsap'
//CONTEXT//
import { AppContext } from '../../App/Context'
//CONFIG//
import { config, animationStore } from '../../config/mainConfiguration'
import { text } from '../../config/textSource'
//FUNCTUION//
import { classListMaker } from '../../Functions/classListMaker'
import { makeFilterFetchQuerry } from '../../Functions/makeFilterFetchQuerry'
import fetchAgent from '../../Functions/fetchAgent'



//under construction//
const ContentFilter = (props: { open: boolean, setFilteredData: React.Dispatch<React.SetStateAction<filteredData[] | []>>, fetch: { skip: number, limit: number } }) => {
    //////////////////////////////////////////////////
    //TYPES//
    type dataState = {
        _id: string;
        regions: {
            name: { cz: string, eng: string },
            code: string,
            towns: { code?: string, name?: { cz: string, eng: string } }[]
        }[];
        equipment: { name: { cz: string, eng: string }, code: string }[];
        general: { code: string; name: { cz: string, eng: string } }[];
        others: { name: { cz: string, eng: string }, code: string }[];
        gender: { name: { cz: string, eng: string }, code: string }[];
        specialization: { name: { cz: string, eng: string }, code: string }[];

    }
    //////////////////////////////////////////////////
    //STATE//
    const [data, setData] = useState<dataState>()
    const [showContent, setShowContent] = useState<boolean>(false)
    const location = useLocation()
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext)

    const filterSecctionWrapperClasses = classListMaker(["filterSectionWrapper", "relative"])
    const buttonInitialClasses = classListMaker(["buttonInitial contentFilterButton pointer relative centerX"])
    const buttonHoverClasses = classListMaker(["buttonHover"])

    const wrapperRef = useRef(null)


    //HANDLE FILTER DATA//
    const fetchFilterData = async (filterOrigin = false, skip = 0, limit = 20) => {
        let querryCommand: filterFetchQuery | undefined = undefined;
        const actualLocation = location.pathname === "/fitness" ? "fitness" : "coach"

        if (location.pathname === "/fitness") {
            querryCommand = makeFilterFetchQuerry(appContext!.fitnessSearch, skip, limit) //TODO - change dinamically (see after i came back)
        }
        else if (location.pathname === "/coach") {
            querryCommand = makeFilterFetchQuerry(appContext!.coachSearch, skip, limit) //TODO - change dinamically (change limits / skips)
        }
        //MAKE FETCH CALL BASED ON FILTER QUERRY//
        //console.log(querryCommand)
        if (querryCommand !== undefined) {
            const getData: any = await fetchAgent.getContentBasedOnFilter(querryCommand, actualLocation)
            // console.log(getData)
            if ((await getData).errorMap.length === 0) {
                if (location.pathname === "/fitness") {
                    filterOrigin === true ? props.setFilteredData(getData.data) : props.setFilteredData(appContext!.filteredFitnessData.concat(getData.data))
                } else if (location.pathname === "/coach") {
                    filterOrigin === true ? props.setFilteredData(getData.data) : props.setFilteredData(appContext!.filteredCoachData.concat(getData.data))
                }
            }
        }
    }
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
    useEffect(() => {
        setTimeout(() => {
            gsap.set(wrapperRef.current, { opacity: 0, display: "none" })
        }, 100)
    }, [])
    //////////////////////////////////////////////////
    //FETCHING//
    useEffect(() => {
        //GET FILTER DATA
        const filterData = fetchAgent.getFilterData()
        filterData.then((data: any) => {
            //CATCH ERROR//
            if (data.errorMap.length > 0) {
                //THROW ERROR MODAL//
                alert('Filter data error modal. ' + data.errorMap)
            }
            if (data.errorMap.length === 0) {
                setData(data.data[0])
                setShowContent(true)
            }
        }).then(() => {
            //INITIAL FETCH//
            fetchFilterData()
        })
    }, [])
    //TRIGGERED FETCH BY NEXT BUTTON//
    useEffect(() => {
        fetchFilterData(false, props.fetch.skip, props.fetch.limit)
    }, [props.fetch])
    //////////////////////////////////////////////////
    //SETUP//
    if (showContent === true) {
        let array = []

        //PREPARE DATA FOR FILTER CONSTRUCTION//
        for (const key in data) {
            if (key !== '_id') {
                switch (appContext?.actualLocation) {
                    case "/fitness":
                        if (!config.filter.avoidFilterTypes.fitness.includes(key)) {
                            array.push({ filterType: key, data: data[key as keyof typeof data] })
                        }
                        break;
                    case "/coach":
                        if (!config.filter.avoidFilterTypes.coach.includes(key)) {
                            array.push({ filterType: key, data: data[key as keyof typeof data] })
                        }
                        break;
                }
            }
        }
        return (
            <section
                className={filterSecctionWrapperClasses}
                ref={wrapperRef}
            >
                <FilterSection
                    header={text.fitness.Filter.sortHeader.cz}
                    filterType={"order"}
                    data={undefined}
                />
                {array.map((obj: any, index: number) => {
                    return (
                        <FilterSection
                            header={text.fitness.Filter.headers[index].cz}
                            filterType={obj.filterType}
                            data={obj.data}
                            key={index}
                        />
                    )
                })}
                <Button
                    /* FETCH DATA AND CLEAR ARRAY */
                    onClick={() => {
                        fetchFilterData(true)
                    }}
                    initialClass={buttonInitialClasses}
                    hoverClass={buttonHoverClasses}
                    text={text.fitness.Filter.filterButton.cz}
                />
            </section>
        )
    } else {
        return <div></div>
    }
}

export { ContentFilter }