import { useEffect, useContext } from 'react'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const About = () => {
    console.log("loaded")
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext);
    const anContext = useContext(AnimationContext);

    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        animationStore.menu.logo.logoIn();
        setTimeout(() => {
            animationStore.menu.logo.logoTextIn();
        }, 200);
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="About" className={config.basePageClassList}>

        </div>
    )
}

export default About 