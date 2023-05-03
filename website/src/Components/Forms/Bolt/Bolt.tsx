import { FC, useEffect, useRef, useState } from "react";
import { BoltProps } from "./_types";
import clsx from "clsx";
import { fadeInBolt, fadeOffBolt, hideBoltCross, showBoltCross } from "@animations";

export const Bolt: FC<BoltProps> = (props) => {
    const { text, remove, code, fieldName } = props
    const [removed, setRemoved] = useState<boolean>(false)
    const bolt = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const line1 = useRef<HTMLDivElement>(null)
    const line2 = useRef<HTMLDivElement>(null)

    const handleAnimationOn = () => showBoltCross(line1.current, line2.current, wrapper.current, bolt.current)
    const handleAnimationOff = () => hideBoltCross(line1.current, line2.current, wrapper.current, bolt.current)
    const handleRemove = () => {
        fadeOffBolt(bolt.current).then(() => {
            code && fieldName && remove?.(code, fieldName)
            setRemoved(true)
        })
    }

    useEffect(() => {
        fadeInBolt(bolt.current)
    }, [])

    if (removed) {
        return null
    }
    return (
        <div className={clsx(["bolt"])} ref={bolt} onMouseEnter={handleAnimationOn} onMouseLeave={handleAnimationOff}>
            {text}
            <div className={"boltCrossWrapper"} ref={wrapper} onClick={handleRemove}>
                <div className={clsx(["boltCrossLine", "boltLine1"])} ref={line1}></div>
                <div className={clsx(["boltCrossLine", "boltLine2"])} ref={line2}></div>
            </div>
        </div>

    )
}