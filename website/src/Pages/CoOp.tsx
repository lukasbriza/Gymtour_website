import { useEffect, useContext } from 'react'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, AnimationContext } from "../App/Context"
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const CoOp = () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="CoOp" className={config.basePageClassList}>

        </div>
    )
}

export default CoOp