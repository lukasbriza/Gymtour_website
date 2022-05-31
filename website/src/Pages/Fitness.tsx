import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterIcon } from '../Components/FilterIcon'
import { ContentFilter } from '../Components/Filter/ContentFilter'
import { SearchItem } from '../Components/SearchItem'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Fitness = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [linkStyle, setLinkStyle] = useState({})
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext);
    const anContext = useContext(AnimationContext);

    const fitnessClasses = classListMaker(["contentPage", "relative"])
    const headerSectionClasses = classListMaker(["headerSection", "minorColor1"])
    const searchContentClasses = classListMaker(["searchContent", "absolute", "stretch", "top"])
    const linkClasses = classListMaker(["mainColorText"])
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
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="Fitness" className={config.basePageClassList + " " + fitnessClasses}>
            <section className={headerSectionClasses}>
                <FilterIcon onClick={() => { anContext?.fn.setFilterOpen(!anContext.filterOpen) }} />
                <h1>{text.fitness.PageHeader.cz}</h1>
                <Link
                    style={linkStyle}
                    to={config.routes.crossroad.path}
                    className={linkClasses}
                    onTouchStart={() => setLinkStyle({ textDecoration: 'underline' })}
                    onTouchEnd={() => setLinkStyle({ textDecoration: 'none' })}
                    onClick={() => setLinkStyle({ textDecoration: 'none' })}
                >
                    {text.fitness.HeaderBackButton.cz}
                </Link>
            </section>
            <ContentFilter open={anContext!.filterOpen} />
            <section
                className={searchContentClasses}
            >
                <SearchItem data={{
                    header: "Header",
                    popularityCount: "1",
                    topped: false,
                }} />
            </section>
        </div>
    )
}

export default Fitness