import { useEffect, useContext, useState, FC } from 'react'
import { Link } from 'react-router-dom'
import { FilterIcon } from '../Components/FilterIcon'
import { ContentFilter } from '../Components/Filter/ContentFilter'
import { SearchItem } from '../Components/SearchItem'
import { ErrorModal } from '../Components/ErrorModal'
import { Button } from '../Components/Button'
import { text } from '../config/textSource'
import { useAnimationContext, useAppContext } from '@hooks'
import clsx from 'clsx'
import { showcards, smallLogoShow } from '@animations'
import { routes } from '@config'

const Coach: FC = () => {
    const gap = 10;
    const [linkStyle, setLinkStyle] = useState({})
    const [endIndex, setEndIndex] = useState<number>(gap)
    const [fetchTriggerAmount, setFetchTriggerAmount] = useState<number>(20)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [fetchSpan, setfetchSpan] = useState<{ skip: number, limit: number }>({ skip: 0, limit: 20 })
    const [initAn, setInitAn] = useState<boolean>(false)
    const [errorModal, setErrorModal] = useState<boolean>(false)
    const [errorHeader, setErrorHeader] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { filteredCoachData, fn } = useAppContext()
    const anContext = useAnimationContext()


    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        smallLogoShow()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (initAn === false && filteredCoachData.length !== 0) {
            console.log(filteredCoachData)
            setInitAn(true)
            showcards().eventCallback('onComplete', () => { setInitAn(false) })
        }
    }, [filteredCoachData, initAn])

    //DISABLE BUTTON//
    useEffect(() => {
        if (filteredCoachData.length <= endIndex) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [endIndex, filteredCoachData.length])

    return (
        <>
            <div id="Coach" className={clsx(["relative", "stretch", "minorColor2", "contentPage", "relative"])}>
                <section className={clsx(["headerSection", "minorColor1"])}>
                    <FilterIcon
                        onClick={() => { anContext?.fn.setFilterOpen(!anContext.filterOpen) }}
                        crossed={anContext?.contentPageCross}
                    />
                    <h1>{text.coach.PageHeader.cz}</h1>
                    <Link
                        style={linkStyle}
                        to={routes.crossroad.path}
                        className={clsx(["mainColorText"])}
                        onTouchStart={() => setLinkStyle({ textDecoration: 'none' })}
                        onTouchEnd={() => setLinkStyle({ textDecoration: 'underline' })}
                        onClick={() => setLinkStyle({ textDecoration: 'underline' })}
                    >
                        <div>
                            {text.coach.HeaderBackButton.cz}
                        </div>
                    </Link>
                </section>
                <ContentFilter open={anContext!.filterOpen} setFilteredData={fn.setFilteredCoachData} fetch={fetchSpan} /> {/** */}
                <div className={clsx(["searchContentWrapper", "absolute", "stretch", "top"])}>
                    <div

                        className={clsx(["searchContent", "relative", "centerX"])}
                    >
                        {

                            filteredCoachData.map((data: filteredData, index: number) => {
                                //DISABLED BUTTON LOGIC//
                                if (index >= 0 && index <= endIndex - 1) {
                                    //RETURN FITNESS ITEMS//
                                    return (<SearchItem data={data} key={data._id} callback={(e) => {
                                        //ERROR MODAL SHOW
                                        setErrorHeader(text.errorModal.headers.coach.searchItem.cz)
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
                        modificationClass={clsx(["contentPageButton"])}
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
            <ErrorModal show={errorModal} message={errorMessage} errorHeader={errorHeader} callback={() => { setErrorModal(false) }} /></>
    )
}

export default Coach