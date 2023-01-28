import { useEffect } from 'react'
import { text } from '../config/textSource'
import { useAnimationContext } from '@hooks'
import { smallLogoShow } from '@animations'
import clsx from 'clsx'


const About = () => {
    const anContext = useAnimationContext()

    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        smallLogoShow();
    }, [anContext?.fn])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="About" className={clsx(["relative", "stretch", "minorColor2"])}>

        </div>
    )
}

export default About 