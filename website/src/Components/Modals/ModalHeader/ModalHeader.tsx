import { FC, useEffect, useRef } from "react";
import { ModalHeaderProps } from "./_types";
import { Circle, Cross, QuestionMark, Sucess } from "src/components/SVG/_index";
import { errorAnimation, questionAnimation, successAnimation } from "src/animations/_index";

export const ModalHeader: FC<ModalHeaderProps> = (props) => {
    const success = useRef<SVGPathElement>(null)
    const circle = useRef<SVGCircleElement>(null)
    useEffect(() => {
        if (success.current && circle.current) {
            successAnimation(success.current, circle.current, [".buttonClass", ".modalTextClass", ".successHeader"])
        }
    }, [])
    return (
        <>
            <div className={"modalHeader"}>
                <Circle size={70} strokeWidth={3} stroke={"rgb(0, 171, 17) "} ref={circle} />
                <Sucess scale={0.8} stroke={"rgb(0, 171, 17) "} strokeWidth={8} ref={success} />
            </div>
            <h3 className={"successHeader"}>{props.header}</h3>
        </>
    )
}

export const ErrorModalHeader: FC<ModalHeaderProps> = (props) => {
    const error = useRef<SVGSVGElement>(null)
    const circle = useRef<SVGCircleElement>(null)
    useEffect(() => {
        if (error.current && circle.current) {
            errorAnimation(error.current, circle.current, [".buttonClass", ".modalTextClass", ".errorHeader"])
        }
    }, [])

    return (
        <>
            <div className={"modalHeader"}>
                <Circle size={70} strokeWidth={3} stroke={"red"} ref={circle} />
                <Cross scale={0.6} ref={error} stroke={"red"} strokeWidth={3} />
            </div>
            <h3 className={"errorHeader"}>{props.header}</h3>
        </>
    )
}


export const QuestionHeader: FC<ModalHeaderProps> = (props) => {
    useEffect(() => {
        questionAnimation(".modalCircle", [".buttonClass", ".modalTextClass", ".questionHeader"])
    }, [])
    return (
        <>
            <div className={"modalHeader"}>
                <QuestionMark pathOneClass="modalCircle" pathTwoClass="modalQuestionMark" />
            </div>
            <h3 className={"questionHeader"}>{props.header}</h3>
        </>
    )
}