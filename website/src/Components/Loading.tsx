import { classListMaker } from '../Functions/classListMaker'
import { useRef, useEffect } from 'react'
import { gsap, Power1 } from 'gsap'

const Loading = () => {
    const loadingPageWrapper = classListMaker(["loadingWrapper"])
    const loadingCircleClasses = classListMaker(["loadingCircle"])

    const c1 = useRef(null)
    const c2 = useRef(null)
    const c3 = useRef(null)

    useEffect(() => {
        let refArr = [c1.current, c2.current, c3.current]
        let stagger = 300
        let duration = 1
        refArr.forEach((comp, index) => {
            setTimeout(() => {
                let tl = gsap.timeline()
                tl.to(comp, {
                    marginBottom: '30px',
                    duration: duration,
                    ease: Power1.easeIn,
                }).to(comp, {
                    marginBottom: '5px',
                    duration: duration,
                    ease: Power1.easeIn
                })
                tl.repeat(-1)
            }, stagger * index)
        })
    }, [])

    return (
        <div className={loadingPageWrapper}>
            <div className={loadingCircleClasses} ref={c1}></div>
            <div className={loadingCircleClasses} ref={c2}></div>
            <div className={loadingCircleClasses} ref={c3}></div>
        </div>
    )
}

export { Loading }