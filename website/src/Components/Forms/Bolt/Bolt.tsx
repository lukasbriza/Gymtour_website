import { FC, useLayoutEffect, useRef } from "react";
import { BoltProps } from "./_types";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { gsap } from "gsap";
import { useCoachFilterContext, useFitnessFilterContext } from "src/hooks";
import { fadeInBolt, fadeOffBolt, hideBoltCross, showBoltCross } from "src/animations/_index";

export const Bolt: FC<BoltProps> = (props) => {
    const { text, code, fieldName, type, id, ...otherProps } = props
    const bolt = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const line1 = useRef<HTMLDivElement>(null)
    const line2 = useRef<HTMLDivElement>(null)
    const { getValues, setValue } = useFormContext()
    const { removeBolt: removeCoachBolt } = useCoachFilterContext()
    const { removeBolt: removeFitnessBolt } = useFitnessFilterContext()
    let ctx = gsap.context((self) => {
        self.add("fadeIn", () => {
            fadeInBolt(bolt.current)
        })
        self.add("fadeOff", () => {
            fadeOffBolt(bolt.current)
        })
    })


    const handleAnimationOn = () => showBoltCross(line1.current, line2.current, wrapper.current, bolt.current)
    const handleAnimationOff = () => hideBoltCross(line1.current, line2.current, wrapper.current, bolt.current)
    const handleRemove = () => {
        if (code && fieldName) {
            const target = code.split("-")[0]
            let value: string[] = getValues(fieldName)
            const index = value.indexOf(target)
            if (index !== -1) {
                value.splice(index, 1)
                setValue(fieldName, value)
            }
            ctx.fadeOff()
            ctx.revert()
            type === "coach" ? removeCoachBolt(code) : removeFitnessBolt(code)
        }
    }

    useLayoutEffect(() => {
        ctx.fadeIn()
        return () => {
            ctx.revert()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            id={id}
            className={clsx(["bolt"])}
            ref={bolt}
            onMouseEnter={handleAnimationOn}
            onMouseLeave={handleAnimationOff}
            {...otherProps}
        >
            {text}
            <div className={"boltCrossWrapper"} ref={wrapper} onClick={handleRemove}>
                <div className={clsx(["boltCrossLine", "boltLine1"])} ref={line1}></div>
                <div className={clsx(["boltCrossLine", "boltLine2"])} ref={line2}></div>
            </div>
        </div>
    )
}