import { FC, useRef, useState } from "react";
import { OverflowTextTooltipProps } from "./_types";
import { Tooltip } from "../Tooltip/Tooltip";

export const OverflowTextTooltip: FC<OverflowTextTooltipProps> = (props) => {
    const { children, tooltipId, content, ...otherProps } = props
    const wrapper = useRef<HTMLDivElement>(null)
    const [hidden, setHidden] = useState<boolean>(true)

    const handleMouseEnter = () => {

        const { current } = wrapper
        const allowTooltip = (current && current.scrollWidth > current.clientWidth) ?? false
        if (current && allowTooltip) {
            setHidden(false)
        }
    }

    const handleMouseLeave = () => {
        const { current } = wrapper
        const allowTooltip = (current && current.scrollWidth > current.clientWidth) ?? false
        if (current && allowTooltip) {
            setHidden(true)
        }
    }

    return (
        <>
            <div data-tooltip-id={tooltipId} {...otherProps} ref={wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
            <Tooltip id={tooltipId} content={content} hidden={hidden} />
        </>
    )
}