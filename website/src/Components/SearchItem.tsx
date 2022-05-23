import { useRef, useEffect } from 'react'
import { Heart } from '../Components/SVG/Heart'
import { Topped } from '../Components/SVG/Topped'
import { gsap } from 'gsap'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const SearchItem = ({ data }: any) => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    const searchItemClasses = classListMaker(["searchItem", "relative"])
    const imgClasses = classListMaker(["searchImg", "relative", "stretchY"])
    const itemBar = classListMaker(["itemBar", "absolute", "left", "bottom", "stretchX"])
    const popularityCounterClasses = classListMaker(["popularityCounter", "absolute", "top", "left"])

    const hearthRef = useRef<SVGSVGElement>(null)
    const toppedRef = useRef<SVGSVGElement>(null)

    const toppedStyleOff = { display: "none" }
    const toppedStyleOn = { display: "initial" }
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        let flamePath1: any = toppedRef.current?.children[1].children[0]
        let flamePath2: any = toppedRef.current?.children[1].children[1]
        if (data.topped === true) {
            gsap.set(flamePath1, { fill: "rgb(255, 68, 0)" })
            gsap.set(flamePath2, { fill: "rgb(255, 208, 0)" })
        }
        if (data.topped === false) {
            gsap.set(flamePath1, { fill: "rgb(47, 47, 46)" })
            gsap.set(flamePath2, { fill: "rgb(104, 104, 104)" })
        }
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <section className={searchItemClasses}>
            <img src="" alt="" className={imgClasses} />
            <div
                className={popularityCounterClasses}
            >
                <Heart
                    className="popularityImgWrapper"
                    ref={hearthRef}
                />
                <p>
                    {data.popularityCount}
                </p>
            </div>
            <div className={itemBar}>
                <h3>{data.header}</h3>
                <Topped
                    className="toppedImgWrapper"
                    ref={toppedRef}
                />
            </div>
        </section>
    )
}

export { SearchItem }