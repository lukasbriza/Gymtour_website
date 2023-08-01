import { useEffect } from 'react'
import { useAnimationContext } from 'src/hooks/_index'
import { smallLogoShow } from 'src/animations/_index'
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
        <div id="About" className={clsx(["relative", "stretch", "minorColor2", "page"])}>

        </div>
    )
}

export default About 