import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterIcon } from '../Components/FilterIcon'
import { ContentFilter } from '../Components/Filter/ContentFilter'
import { SearchItem } from '../Components/SearchItem'
import { ErrorModal } from '../Components/ErrorModal'
import { Button } from '../Components/Button'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Fitness = () => {
    const gap = 10;
    //////////////////////////////////////////////////
    //STATE//
    const [linkStyle, setLinkStyle] = useState({})
    const [endIndex, setEndIndex] = useState<number>(gap)
    const [fetchTriggerAmount, setFetchTriggerAmount] = useState<number>(20)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [fetchSpan, setfetchSpan] = useState<{ skip: number, limit: number }>({ skip: 0, limit: 20 })
    const [initAn, setInitAn] = useState<boolean>(false)

    const [errorModal, setErrorModal] = useState<boolean>(false)
    const [errorHeader, setErrorHeader] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext);
    const anContext = useContext(AnimationContext);

    const fitnessClasses = classListMaker(["contentPage", "relative"])
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (initAn === false && appContext?.filteredFitnessData.length !== 0) {
            console.log(appContext?.filteredFitnessData)
            console.log("here")
            setInitAn(true)
            const tl = animationStore.fitness.card.init(document.getElementsByClassName("searchItem"))
            tl.eventCallback('onComplete', () => { setInitAn(false) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appContext?.filteredFitnessData])

    //DISABLE BUTTON//
    useEffect(() => {
        if (appContext!.filteredFitnessData.length <= endIndex) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [appContext, endIndex])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <>
            <div id="Fitness" className={config.basePageClassList + " " + fitnessClasses}>
                <section className={headerSectionClasses}>
                    <FilterIcon
                        onClick={() => { anContext?.fn.setFilterOpen(!anContext.filterOpen) }}
                        crossed={anContext?.contentPageCross}
                    />
                    <h1>{text.fitness.PageHeader.cz}</h1>
                    <Link
                        style={linkStyle}
                        to={config.routes.crossroad.path}
                        className={linkClasses}
                        onTouchStart={() => setLinkStyle({ textDecoration: 'none' })}
                        onTouchEnd={() => setLinkStyle({ textDecoration: 'underline' })}
                        onClick={() => setLinkStyle({ textDecoration: 'underline' })}
                    >
                        <div>
                            {text.fitness.HeaderBackButton.cz}
                        </div>
                    </Link>
                </section>
                <ContentFilter open={anContext!.filterOpen} setFilteredData={appContext!.fn.setFilteredFitnessData} fetch={fetchSpan} />
                <div className={searchContentWrapperClasses}>
                    <div

                        className={searchContentClasses}
                    >
                        {
                            appContext?.filteredFitnessData.map((data: filteredData, index: number) => {
                                //DISABLED BUTTON LOGIC//
                                if (index >= 0 && index <= endIndex - 1) {
                                    //RETURN FITNESS ITEMS//
                                    return (<SearchItem data={data} key={data._id} callback={(e) => {
                                        //ERROR MODAL SHOW
                                        setErrorHeader(text.errorModal.headers.fitness.searchItem.cz)
                                        const message = (e.errorMap.map((error) => { return error.Error?.message }) + text.errorModal.contactMessage.cz)
                                        setErrorMessage(message)
                                        setErrorModal(true)
                                    }} />)
                                }
                            })
                        }
                    </div>
                    <Button
                        disabled={disabled}
                        modificationClass={contentPageButtonClasses}
                        initialClass={"buttonInitial"}
                        hoverClass={"buttonHover"}
                        text={text.fitness.Content.nextButton.cz}
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
            <ErrorModal show={errorModal} message={errorMessage} errorHeader={errorHeader} callback={() => { setErrorModal(false) }} />
        </>
    )
}

export default Fitness