import React, { useState, useRef, useEffect, useContext } from 'react'
import { gsap, Power2, Power1, Power3 } from 'gsap'
import { classListMaker } from '../utils/classListMaker'
import { useAnimationContext } from 'src/hooks/_index'

const FilterIcon = React.memo((props: { onClick: () => void, crossed: boolean | undefined }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [active, setActive] = useState(false)
    const [crossed, setCrossed] = useState(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const filterIconWrapperClasses = classListMaker(["filterIconWrapper"])
    const lineClasses = classListMaker(["filterLine"])

    const ref1 = useRef<HTMLDivElement>(null)
    const ref2 = useRef<HTMLDivElement>(null)
    const ref3 = useRef<HTMLDivElement>(null)

    const anContext = useAnimationContext()
    //////////////////////////////////////////////////
    //ANIMATIONS//
    const hoverInAnimation = () => {
        if (active === false && crossed === false) {
            gsap.to([ref1.current, ref2.current, ref3.current], {
                width: "100%",
                duration: 0.5,
                ease: Power2.easeOut
            })
        }
    }
    const hoverOffAnimation = () => {
        if (active === false && crossed === false) {
            gsap.to(ref1.current, {
                width: "100%",
                duration: 0.3,
                ease: Power1.easeOut
            })
            gsap.to(ref2.current, {
                width: "70%",
                duration: 0.3,
                ease: Power1.easeOut
            })
            gsap.to(ref3.current, {
                width: "50%",
                duration: 0.3,
                ease: Power1.easeOut
            })
        }
    }
    const clickHandler = (bool: boolean) => {
        if (bool === true) {
            setCrossed(true)
            let tl = gsap.timeline()
            tl.addLabel('start')
                .to([ref1.current, ref2.current, ref3.current], {
                    top: "50%",
                    left: '50%',
                    margin: '0px 0px',
                    transform: 'translate(-50%,-50%)',
                    duration: 0.5,
                    ease: Power2.easeOut,
                })
                .to([ref1.current, ref2.current, ref3.current], {
                    width: '8px',
                    duration: 0.2,
                    ease: Power2.easeOut
                })
                .addLabel('cross')
                .to(ref1.current, {
                    height: '5px',
                    transform: 'translate(-50%,-50%) rotate(-45deg)',
                    duration: 0.002,
                    ease: 'none'
                }, 'cross')
                .to(ref3.current, {
                    height: '5px',
                    transform: 'translate(-50%,-50%) rotate(45deg)',
                    duration: 0.002,
                    ease: 'none'
                }, 'cross')
                .to([ref1.current, ref3.current], {
                    width: '100%',
                    duration: 1.5,
                    ease: Power2.easeOut,
                })
            setActive(bool)

            return
        }
        if (bool === false) {
            let tl = gsap.timeline()
            tl.addLabel('start')
                .to([ref1.current, ref3.current], {
                    width: '8px',
                    duration: 1,
                    ease: Power3.easeOut
                })
                .addLabel('crossEnd')
                .to(ref1.current, {
                    height: '5px',
                    transform: 'translate(-50%,-50%)',
                    duration: 0.002,
                    ease: 'none'
                }, 'crossEnd')
                .to(ref3.current, {
                    height: '5px',
                    transform: 'translate(-50%,-50%)',
                    duration: 0.002,
                    ease: 'none'
                }, 'crossEnd')
                .addLabel('widthChange')
                .to(ref1.current, {
                    width: '100%',
                    duration: 0.2,
                    ease: Power2.easeOut
                }, 'widthChange')
                .to(ref2.current, {
                    width: '70%',
                    duration: 0.2,
                    ease: Power2.easeOut
                }, 'widthChange')
                .to(ref3.current, {
                    width: '50%',
                    duration: 0.2,
                    ease: Power2.easeOut
                }, 'widthChange')
                .addLabel('finalPosition')
                .to(ref1.current, {
                    top: '3px',
                    duration: 0.5,
                    ease: Power2.easeOut
                }, 'finalPosition')
                .to(ref2.current, {
                    top: '12px',
                    duration: 0.5,
                    ease: Power2.easeOut
                }, 'finalPosition')
                .to(ref3.current, {
                    top: '21px',
                    duration: 0.5,
                    ease: Power2.easeOut
                }, 'finalPosition')
            setActive(bool)
            setCrossed(false)
            return
        }
    }

    useEffect(() => {
        if (props.crossed === true) {
            clickHandler(!active)
            anContext?.fn.setContentPageCross(false)
        }
    }, [props.crossed, active, anContext?.fn])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            className={filterIconWrapperClasses}
            onMouseEnter={hoverInAnimation}
            onMouseLeave={hoverOffAnimation}
            onClick={() => { clickHandler(!active); props.onClick() }}
        >
            <div
                className={lineClasses}
                ref={ref1}
            >
            </div>
            <div
                className={lineClasses}
                ref={ref2}
            >
            </div>
            <div
                className={lineClasses}
                ref={ref3}
            >
            </div>

        </div>
    )
})


export { FilterIcon }