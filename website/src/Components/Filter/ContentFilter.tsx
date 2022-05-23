import React, { useEffect, useContext, useRef, useState } from 'react'
import { FilterSection } from './FilterSection'
import { Button } from '../Button'
import { gsap } from 'gsap'
//CONTEXT//
import { AppContext, AnimationContext, AppStateContext } from '../../App/Context'
//CONFIG//
import { config, animationStore } from '../../config/mainConfiguration'
import { text } from '../../config/textSource'
//FUNCTUION//
import { classListMaker } from '../../Functions/classListMaker'
import { makeFilterFetchQuerry } from '../../Functions/makeFilterFetchQuerry'
import fetchAgent from '../../Functions/fetchAgent'


//under construction//
const ContentFilter = React.memo((props: { open: boolean }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [data, setData] = useState<any>(undefined)
    const [showContent, setShowContent] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const anContext = useContext(AnimationContext)
    const appContext = useContext(AppContext)

    const filterSecctionWrapperClasses = classListMaker(["filterSectionWrapper", "relative"])

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
    useEffect(() => {
        setTimeout(() => {
            gsap.set(wrapperRef.current, { opacity: 0, display: "none" })
        }, 100)
    }, [])
    //////////////////////////////////////////////////
    //FETCHING//
    useEffect(() => {
        const filterData = fetchAgent.getFilterData()
        filterData.then((data: any) => {
            //CATCH ERROR//
            if (data.errorMap.length > 0) {
                //THROW ERROR MODAL//
                alert('Error modal')
            }
            if (data.errorMap.length === 0) {
                console.log(data.data[0])
                setData(data.data[0])
                setShowContent(true)
            }
        })
    }, [])

    //HANDLE FILTER DATA//
    const fetchFilterData = async (data: any) => {
        let querryCommand;
        if (appContext?.actualLocation === "/fitness") {
            querryCommand = makeFilterFetchQuerry(appContext.fitnessSearch)
        }
        else if (appContext?.actualLocation === "/coach") {
            querryCommand = makeFilterFetchQuerry(appContext.coachSearch)
        }
        console.log(querryCommand)
    }
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
                            array.push({ filterType: key, data: data[key] })
                        }
                        break;
                    case "/coach":
                        if (!config.filter.avoidFilterTypes.coach.includes(key)) {
                            array.push({ filterType: key, data: data[key] })
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
                    header={"Seřadit"}
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
                    onClick={fetchFilterData}
                    initialClass={"buttonInitial contentFilterButton pointer relative centerX"}
                    hoverClass={"buttonHover"}
                    text={"Filtrovat"}
                />
            </section>
        )
    } else {
        return <>Loading...</>
    }
})

export { ContentFilter }