import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from './Button'
import { Circle } from './SVG/Circle'
import { Cross } from './SVG/Cross'
import { Sucess } from './SVG/Sucess'
//CONFIG//
import { animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const FormModal = (props: any) => {
    //////////////////////////////////////////////////
    //STATE//
    const [showCross, setShowCross] = useState(false)
    const [showSucess, setShowSucess] = useState(false)

    const [msg, setMsg] = useState(<></>)
    //////////////////////////////////////////////////
    //VARIABLES//
    const modalWrapperClasses = classListMaker(["modalWrapper", "absolute", "stretchVH", "stretchX", "top", "left"]);
    const animationSectionClasses = classListMaker(["animaitonWrapper", "relative"])
    const msgSectionClasses = classListMaker(["msgWrapper"])
    const buttonClasses = classListMaker(["modalButton"])

    const circleRef: any = useRef();
    const crossRef = useRef();
    const sucessRef: any = useRef();
    const modalRef: any = useRef();
    const msgSectionRef: any = useRef();

    let basicColor = "#263e69"
    let colorEndError = "#ff2c2c"
    let colorEndSucess = "rgb(3, 117, 3)"


    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        //SHOW MODAL AND START LOADING ANIMATION//
        if (props.loading === true) {
            //DISABLE SCROLL//
            disableScroll()
            //SHOW MODAL//
            animationStore.crossroad.modal.show(modalRef.current)
            //START ANIMATION//
            animationStore.crossroad.modal.infiniteRotation(circleRef.current)
        }
    }, [props.loading])
    useEffect(() => {
        if (props.sucess === true) {
            //SUCESS ANIMATION//
            setShowSucess(true)
            animationStore.crossroad.modal.loadingCompleteSucess(
                circleRef.current,
                basicColor,
                colorEndSucess,
                sucessRef.current,
                showMsgBtn
            )
        }
        if (props.sucess === false) {
            //ERROR ANIMAITON//
            setShowCross(true)
            animationStore.crossroad.modal.loadingCompleteError(
                circleRef.current,
                basicColor,
                colorEndError,
                showMsgBtn
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sucess])

    //SHOW MESSAGE AND BUTTON ANIMAITON//
    const showMsgBtn = () => {
        setMsg(props.msg)
        animationStore.crossroad.modal.showMsgBtn(msgSectionRef.current, ".modalButton")
    }

    const handleModalHide = () => {
        //ENABLE SCROLL//
        enableScroll()
        //HIDE MODAL//
        animationStore.crossroad.modal.hide(modalRef.current);
        //CLEAR FORM//
        if (props.sucess === true) {
            props.clearForm()
        }
        //SET DEFAULT STATE OF COMPONENTS//
        setTimeout(() => { props.callback() }, 1500)
    }

    const setDefaultAnimationState = () => {
        setTimeout(() => {
            //LOADING CIRCLE DEFAULT//
            gsap.set(circleRef.current, {
                borderTopColor: basicColor,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
            })
            //SUCESS DEFAULT//
            gsap.set(sucessRef.current, {
                strokeDashoffset: 92
            })
            //ERROR DEFAULT//
            gsap.set("#Line_1", {
                strokeDashoffset: 55
            })
            gsap.set("#Line_2", {
                strokeDashoffset: -55
            })
            //MSG DEFAULT//
            gsap.set(msgSectionRef.current.children, {
                opacity: 0
            })
            //MODAL BUTTON DEFAULT//
            gsap.set(".modalButton", {
                opacity: 0
            })
        }, 1000)
    }
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const disableScroll = () => {
        //HIDE SCROLL BAR//
        document.documentElement.classList.add("hideScrollBar::-webkit-scrollbar", "hideScrollBar")
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    }
    const enableScroll = () => {
        //SHOW SCROLL BAR//
        document.documentElement.classList.remove("hideScrollBar::-webkit-scrollbar", "hideScrollBar")
        window.onscroll = function () { };
    }
    //////////////////////////////////////////////////
    return (
        <section className={modalWrapperClasses} ref={modalRef}>
            <div className={animationSectionClasses}>
                <Circle
                    scale={0.8}
                    strokecolor={basicColor}
                    strokewidth={5}
                    ref={circleRef}
                />
                <Cross
                    show={showCross}
                    scale={0.9}
                    strokecolor={colorEndError}
                    strokewidth={5}
                    ref={crossRef}
                />
                <Sucess
                    show={showSucess}
                    scale={1.5}
                    strokecolor={colorEndSucess}
                    strokewidth={5}
                    ref={sucessRef}
                />
            </div>
            <div
                className={msgSectionClasses}
                ref={msgSectionRef}
            >
                {msg}
            </div>
            <Button
                modificationClass={buttonClasses}
                initialClass={"buttonInitial"}
                hoverClass={"buttonHover"}
                text={text.crossroad.RegisterPage.Form.modal.button.cz}
                onClick={() => { handleModalHide(); setDefaultAnimationState() }}
            />
        </section>
    )
}

export { FormModal }