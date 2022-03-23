import { useEffect, useState, useRef } from 'react'
import { Button } from './Button'
import { Circle } from './SVG/Circle'
import { Cross } from './SVG/Cross'
//CONFIG//
import { animationStore } from '../config/mainConfiguration'
//CONTEXT//
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const FormModal = (props: any) => {
    //////////////////////////////////////////////////
    //STATE//
    const [show, setShow] = useState("none")
    const [showCross, setShowCross] = useState("none")

    const [msg, setMsg] = useState(<></>)
    //////////////////////////////////////////////////
    //VARIABLES//
    const modalWrapperClasses = classListMaker(["modalWrapper", "absolute", "stretchVH", "stretchX", "top", "left"]);
    const animationSectionClasses = classListMaker(["animaitonWrapper", "relative"])
    const msgSectionClasses = classListMaker(["msgWrapper"])
    const buttonClasses = classListMaker(["modalButton"])

    const circleRef: any = useRef();
    const crossRef = useRef();

    let basicColor = "rgb(38,62,105)"
    let colorEndError = "red"
    let colorEndSucess = "green"
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        //SHOW MODAL AND START LOADING ANIMATION//
        if (props.loading === true) {
            //SHOW MODAL//
            setShow("grid")
            //START ANIMATION//
            animationStore.crossroad.modal.infiniteRotation(circleRef.current)
        }
    }, [props.loading])
    useEffect(() => {
        if (props.sucess === true) {
            //SUCESS ANIMATION//
        }
        if (props.sucess === false) {
            //ERROR ANIMAITON//
            setShowCross("initial")
            animationStore.crossroad.modal.loadingCompleteError(
                circleRef.current,
                basicColor,
                colorEndError,
                crossRef.current
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sucess])

    useEffect(() => {
        setMsg(props.msg)
        animationStore.crossroad.modal.showMsg()
    }, [props.msg])

    //////////////////////////////////////////////////
    return (
        <section className={modalWrapperClasses} style={{ display: show }}>
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
                    strokecolor="red"
                    strokewidth={5}
                    ref={crossRef}
                />
            </div>
            <div className={msgSectionClasses}>
                {msg}
            </div>
            <Button
                modificationClass={buttonClasses}
                initialClass={"buttonInitial"}
                hoverClass={"buttonHover"}
                text="Test"
                onClick={() => { }}
            />
        </section>
    )
}

export { FormModal }