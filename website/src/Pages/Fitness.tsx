import { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FilterIcon } from '../Components/FilterIcon'
import { ContentFilter } from '../Components/ContentFilter'
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
    const appContext: any = useContext(AppContext);
    const anContext: any = useContext(AnimationContext);

    const fitnessClasses = classListMaker(["contentPage"])
    const headerSectionClasses = classListMaker(["headerSection", "minorColor1"])
    const searchContentClasses = classListMaker(["searchContent"])
    const linkClasses = classListMaker(["mainColorText"])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext.fn.setBigLogoPlayed(true)
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
                <FilterIcon onClick={() => { anContext.fn.setFilterOpen(!anContext.filterOpen) }} />
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
            <ContentFilter open={anContext.filterOpen} />
            <section
                className={searchContentClasses}
            >

            </section>
        </div>
    )
}

export default Fitness