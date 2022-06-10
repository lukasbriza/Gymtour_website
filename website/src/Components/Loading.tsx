import { classListMaker } from '../Functions/classListMaker'
import { useRef, useEffect } from 'react'
import { gsap, Power1 } from 'gsap'

const Loading = ({ size, distance, duration, stagger, y }: { size?: string, distance?: string, duration?: number, stagger?: number, y?: string }) => {
    const loadingPageWrapper = classListMaker(["loadingWrapper"])
    const loadingCircleClasses = classListMaker(["loadingCircle"])

    const c1 = useRef(null)
    const c2 = useRef(null)
    const c3 = useRef(null)

    const circleStyle = {
        width: size,
        height: size,
        margin: distance
    }

    const STAGGER = stagger ? stagger : 350;
    const DURATION = duration ? duration : 0.7;
    const Y = y ? y : "30px"

    useEffect(() => {
        const refArr = [c1.current, c2.current, c3.current]


        refArr.forEach((comp, index) => {
            setTimeout(() => {
                let tl = gsap.timeline()
                tl.to(comp, {
                    marginBottom: Y,
                    duration: DURATION,
                    ease: 'linear',
                }).to(comp, {
                    marginBottom: '5px',
                    duration: DURATION,
                    ease: Power1.easeIn
                })
                tl.repeat(-1)
            }, STAGGER * index)
        })
    }, [])

    return (
        <div className={loadingPageWrapper}>
            <div className={loadingCircleClasses} ref={c1} style={circleStyle}></div>
            <div className={loadingCircleClasses} ref={c2} style={circleStyle}></div>
            <div className={loadingCircleClasses} ref={c3} style={circleStyle}></div>
        </div>
    )
}

export { Loading }