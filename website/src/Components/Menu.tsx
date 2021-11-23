import {useContext} from 'react'
//COMPONENTS//
import {SmallLogo} from './SVG/SmallLogo'
import {SmallText} from './SVG/SmallText'
//FUNCTUION//
import {classListMaker} from '../Functions/classListMaker'
//CONFIG//
import {config} from '../config/mainConfiguration'
//CONTEXT//
import {AppContext, AnimationContext} from '../App/Context'

const Menu = () => {
    const appContext:any = useContext(AppContext)
    const anContext:any = useContext(AnimationContext)
    
    if(appContext.width <= config.breakpoints.tablet){
        const menuMobileClassList = classListMaker(["test","test2"])

        return(
            <nav id="menu-mob" className={menuMobileClassList}>
                <SmallLogo/>
                <SmallText/>
                <Hamburger/>
                <MenuLayer/>
            </nav>
        )
    } else {
        const menuPcClassList = classListMaker(["test","test"])

        return(
            <nav id="menu-pc" className={menuPcClassList}>
                <SmallLogo/>
                <SmallText/>
                <MenuOffer/>
            </nav>
        )
    }
}

const MenuOffer = () => {
    return(
        <div id="menuOffer">

        </div>
    )
}

const MenuLayer = () => {

    return(
        <div id="menuLayer">

        </div>
    )
}

const Hamburger = () => {
    return(
        <div id="hamburger-wrapper">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export {Menu}