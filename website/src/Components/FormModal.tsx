import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from './Button/Button'
import { Circle } from './SVG/Circle/Circle'
import { Cross } from './SVG/Cross/Cross'
import { Sucess } from './SVG/Sucess/Sucess'
import { text } from '../config/textSource'
//CONTEXT//
//FUNCTUION//
import { classListMaker } from '../utils/classListMaker'
import { hideFormModal, infiniteRotation, loadingError, showFormModal, showMessageButton } from 'src/animations/_index'

const FormModal = (props: formModalProps) => {
    //////////////////////////////////////////////////
    //STATE//
    const [showCross, setShowCross] = useState(false)
    const [showSucess, setShowSucess] = useState(false)

    const [msg, setMsg] = useState(<></>)
    const [btnText, setBtnText] = useState<string>(text.crossroad.RegisterPage.Form.modal.button.cz)
    //////////////////////////////////////////////////
    //VARIABLES//
    const modalWrapperClasses = classListMaker(["modalWrapper", "absolute", "stretchVH", "stretchX", "top", "left"]);
    const animationSectionClasses = classListMaker(["animaitonWrapper", "relative"])
    const msgSectionClasses = classListMaker(["msgWrapper"])
    const buttonClasses = classListMaker(["modalButton"])

    const circleRef = useRef<HTMLSpanElement>(null);
    const crossRef = useRef<SVGSVGElement>(null);
    const sucessRef = useRef<SVGPathElement>(null);
    const modalRef = useRef<HTMLElement>(null);
    const msgSectionRef = useRef<HTMLDivElement>(null);

    let basicColor = "#263e69"
    let colorEndError = "#ff2c2c"
    let colorEndSucess = "rgb(3, 117, 3)"


    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        if (props.buttonMsg !== undefined) {
            setBtnText(props.buttonMsg)
        }
    }, [props.buttonMsg])
    useEffect(() => {
        //SHOW MODAL AND START LOADING ANIMATION//
        if (props.loading === true && modalRef.current && circleRef.current) {
            //DISABLE SCROLL//
            disableScroll()
            //SHOW MODAL//
            showFormModal(modalRef.current)
            //START ANIMATION//
            infiniteRotation(circleRef.current)
        }
    }, [props.loading])
    useEffect(() => {
        if (props.sucess === true && circleRef.current && sucessRef.current) {
            //SUCESS ANIMATION//
            setShowSucess(true)
            /* loadingSuccess(
                 circleRef.current,
                 sucessRef.current,
                 showMsgBtn
             )*/
        }
        if (props.sucess === false && circleRef.current) {
            //ERROR ANIMAITON//
            setShowCross(true)
            loadingError(
                circleRef.current,
                showMsgBtn
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sucess])

    //SHOW MESSAGE AND BUTTON ANIMAITON//
    const showMsgBtn = () => {
        setMsg(props.msg)
        msgSectionRef.current && showMessageButton(msgSectionRef.current)
    }

    const handleModalHide = () => {
        const delay = props.callbackTiming !== undefined ? props.callbackTiming : 1500
        //ENABLE SCROLL//
        enableScroll()
        //HIDE MODAL//
        modalRef.current && hideFormModal(modalRef.current);
        //CLEAR FORM//
        if (props.sucess === true) {
            props.clearForm()
        }
        //SET DEFAULT STATE OF COMPONENTS//
        setTimeout(() => { props.callback() }, delay)
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
            gsap.set(msgSectionRef.current!.children, {
                opacity: 0
            })
            //MODAL BUTTON DEFAULT//
            gsap.set(".modalButton", {
                opacity: 0
            })
        }, 500)
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
                text={btnText}
                onClick={() => {
                    handleModalHide();
                    setDefaultAnimationState();

                }}
            />
        </section>
    )
}

export { FormModal }