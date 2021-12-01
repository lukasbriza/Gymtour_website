import { gsap, Sine, Power2, Power3 } from "gsap";

////////////////////////////////////////////////////////////////////////////
//REGISTER ANIMATIONS//
////////////////////////////////////////////////////////////////////////////
//STROKE//
gsap.registerEffect({
    name: "stroke",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            strokeDasharray: '250%',
            strokeDashoffset: '250%'
        },{
            strokeDashoffset: 0,
            ease: Sine.easeInOut,
            duration: 2.5
        })
    },
    extendTimeline: true
})

//FILL//
gsap.registerEffect({
    name: "fill",
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
            fill: 'transparent'
        },{
            fill: config.fill,
            duration: config.duration,
            ease: Power2.easeInOut
        })
    },
    defaults: {
        fill: 'white',
        duration: 1
    },
    extendTimeline: true
})

//FADE IN//
gsap.registerEffect({
    name: 'fadeIn',
    effect: (targets, config) => {
        return gsap.fromTo(targets, {
                display: config.displayInitial
            },{
                display: config.displayAfter,
                duration: 0.002,                                
                ease: 'none'
            }).then(()=>{
                gsap.fromTo(targets,{
                    opacity: 0,
                },{
                    opacity: 1,
                    duration: config.duration,
                    stagger: config.stagger,
                    ease:  Power3.easeIn
                })
            })  
    },
    defaults: {
        displayInitial:'none',
        displayAfter: 'initial',
        stagger: 0.2,
        duration: 0.5
    },
    extendTimeline: true
})
//FADE OFF//
gsap.registerEffect({
    name: 'fadeOff',
    effect: (targets,config) => {
        gsap.fromTo(targets,{
            opacity: 1
        },{
            opacity: 0,
            duration: config.duration,
            stagger: config.stagger,
            ease:  Power3.easeIn
        }).then(()=>{
            gsap.fromTo(targets,{
                display: config.displayInitial
            },{
                display: config.displayAfter,
                duration: 0.002,
                ease: 'none'
            })
        })
    },
    defaults:{
        displayInitial: 'initial',
        displayAfter: 'none',
        stagger: 0,
        duration: 0.2
    },
    extendTimeline: true
})
//HAMBURGER CROSS ON//
gsap.registerEffect({
    name: 'crossOn',
    effect: (slice1, slice2, slice3, config={}) => {
        gsap.to(slice1,{
            transformOrigin: 'left',
            transform: 'rotate(45deg) translateY(-1px)',
            duration: 0.3,
            ease: 'linear'
        })
        gsap.to(slice3,{
            transformOrigin: 'left',
            transform: 'rotate(-45deg) translateY(1px)',
            duration: 0.3,
            ease: 'linear'
        })
        gsap.to(slice2,{
            height: '0px',
            opacity: 0,
            duration: 0.3,
            ease: 'linear'
        })
    },
    extendTimeline: true
})
//HAMBURGER CROSS OFF//
gsap.registerEffect({
    name: 'crossOff',
    effect: (slice1, slice2, slice3, config={}) => {
        gsap.to(slice1,{
            transformOrigin: 'left',
            transform: 'rotate(0deg) translateY(0px)',
            duration: 0.3,
            ease: 'linear'
        })
        gsap.to(slice3,{
            transformOrigin: 'left',
            transform: 'rotate(0deg) translateY(0px)',
            duration: 0.3,
            ease: 'linear'
        })
        gsap.to(slice2,{
            height: '5px',
            opacity: 1,
            duration: 0.3,
            ease: 'linear'
        })
    } ,
    extendTimeline: true
})