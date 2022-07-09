import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterIcon } from '../Components/FilterIcon'
import { ContentFilter } from '../Components/Filter/ContentFilter'
import { SearchItem } from '../Components/SearchItem'
import { Button } from '../Components/Button'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Coach = () => {
    const gap = 10;
    //////////////////////////////////////////////////
    //STATE//
    const [linkStyle, setLinkStyle] = useState({})
    const [endIndex, setEndIndex] = useState<number>(gap)
    const [fetchTriggerAmount, setFetchTriggerAmount] = useState<number>(20)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [fetchSpan, setfetchSpan] = useState<{ skip: number, limit: number }>({ skip: 0, limit: 20 })
    const [initAn, setInitAn] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext);
    const anContext = useContext(AnimationContext);

    const coachClasses = classListMaker(["contentPage", "relative"])
    const headerSectionClasses = classListMaker(["headerSection", "minorColor1"])
    const searchContentWrapperClasses = classListMaker(["searchContentWrapper", "absolute", "stretch", "top"])
    const searchContentClasses = classListMaker(["searchContent", "relative", "centerX"])
    const linkClasses = classListMaker(["mainColorText"])
    const contentPageButtonClasses = classListMaker(["contentPageButton"])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        animationStore.menu.logo.logoIn();
        setTimeout(() => {
            animationStore.menu.logo.logoTextIn();
        }, 200);
    }, [])

    useEffect(() => {
        if (initAn === false && appContext?.filteredCoachData.length !== 0) {
            console.log(appContext?.filteredCoachData)
            console.log("here")
            setInitAn(true)
            const tl = animationStore.coach.card.init(document.getElementsByClassName("searchItem"))
            tl.eventCallback('onComplete', () => { setInitAn(false) })
        }
    }, [appContext?.filteredCoachData])

    //DISABLE BUTTON//
    useEffect(() => {
        if (appContext!.filteredCoachData.length <= endIndex) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [appContext, endIndex])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="Coach" className={config.basePageClassList + " " + coachClasses}>
            <section className={headerSectionClasses}>
                <FilterIcon
                    onClick={() => { anContext?.fn.setFilterOpen(!anContext.filterOpen) }}
                    crossed={anContext?.contentPageCross}
                />
                <h1>{text.coach.PageHeader.cz}</h1>
                <Link
                    style={linkStyle}
                    to={config.routes.crossroad.path}
                    className={linkClasses}
                    onTouchStart={() => setLinkStyle({ textDecoration: 'none' })}
                    onTouchEnd={() => setLinkStyle({ textDecoration: 'underline' })}
                    onClick={() => setLinkStyle({ textDecoration: 'underline' })}
                >
                    <div>
                        {text.coach.HeaderBackButton.cz}
                    </div>
                </Link>
            </section>
            <ContentFilter open={anContext!.filterOpen} setFilteredData={appContext!.fn.setFilteredCoachData} fetch={fetchSpan} /> {/** */}
            <div className={searchContentWrapperClasses}>
                <div

                    className={searchContentClasses}
                >
                    {

                        appContext?.filteredCoachData.map((data: filteredData, index: number) => {
                            //DISABLED BUTTON LOGIC//
                            if (index >= 0 && index <= endIndex - 1) {
                                //RETURN FITNESS ITEMS//
                                return <SearchItem data={data} key={data._id} />
                            }

                        })

                    }
                </div>
                <Button
                    disabled={disabled}
                    modificationClass={contentPageButtonClasses}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={text.coach.Content.nextButton.cz}
                    onClick={() => {
                        //TRIGGERED FETCH FROM DB --- 10- 20//
                        if (endIndex === fetchTriggerAmount) {
                            //FETCH NEW ITEMS FROM DB//
                            setfetchSpan({ skip: fetchTriggerAmount, limit: 20 })
                            setFetchTriggerAmount(fetchTriggerAmount + 20);
                            setEndIndex(gap + endIndex);
                            //NOT TRIGGERED FETCH FROM DB//
                        } else {
                            setEndIndex(endIndex + gap);
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Coach