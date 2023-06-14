import { useEffect, useState, useRef } from 'react'
import { Exclamation } from './SVG/Exclamation'
import { Button } from './Button/Button'
import { text } from '../config/textSource'
import { classListMaker } from '../utils/classListMaker'

const ErrorModal = ({ show, message, errorHeader, callback }: { show: boolean, message: string, errorHeader: string, callback: () => void }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [animationState, setAnimationState] = useState<"errorModalAnimationOff" | "errorModalAnimationOn" | "">("")
    //////////////////////////////////////////////////
    //VARIABLES//
    const errorModalClasses = classListMaker(["errorModal", "absolute", "top", "centerX"])
    const initial = useRef(true)
    //////////////////////////////////////////////////
    //ANIMATION//
    useEffect(() => {
        if (initial.current === false) {
            show ? setAnimationState("errorModalAnimationOn") : setAnimationState("errorModalAnimationOff")
        } else {
            initial.current = false
        }

    }, [show])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div className={errorModalClasses + " " + animationState}>
            <Exclamation className="exclamationSVG" />
            <h4 className="errorModalHeader">{errorHeader}</h4>
            <p className="errorModalMessage">{message}</p>
            <Button
                onClick={callback}
                initialClass={"buttonInitial errorModalButton"}
                hoverClass={"errorModalButtonHover"}
                text={text.errorModal.button.cz}
            />
        </div>
    )
}

export { ErrorModal }