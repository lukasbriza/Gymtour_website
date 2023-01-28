import { useEffect, FC } from 'react'
import { text } from '../config/textSource'
import { useAnimationContext, useAppContext } from '@hooks'
import { smallLogoShow } from '@animations'
import clsx from 'clsx'

const CoOp: FC = () => {
    console.log("loaded")

    const appContext = useAppContext()
    const anContext = useAnimationContext()

    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        anContext?.fn.setBigLogoPlayed(true)
        smallLogoShow()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div id="CoOp" className={clsx(["relative", "stretch", "minorColor2"])}>

        </div>
    )
}

export default CoOp