import { useEffect, useContext } from 'react'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Contact = () => {
    console.log("loaded")
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext: any = useContext(AppContext);
    const anContext: any = useContext(AnimationContext);
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
        <div id="Contact" className={config.basePageClassList}>

        </div>
    )
}

export default Contact