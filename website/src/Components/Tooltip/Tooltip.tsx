import { FC, useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap"
import { TooltipProps } from "./_types";
import clsx from "clsx";
import { hideTooltip, showTooltip } from "@animations";
import React from "react";


export const Tooltip: FC<TooltipProps> = (props) => {
    const { children, text, position = "left", show } = props
    const tooltip = useRef<HTMLDivElement>(null)
    const childrenRef = useRef<any>(null)

    useEffect(() => {
        if (show !== undefined) {
            show ? showTooltip(tooltip.current) : hideTooltip(tooltip.current)
        }
    }, [show])

    const onMouseEnter = () => {
        children.props.onMouseEnter && children.props.onMouseEnter()
        // show === undefined && showTooltip(tooltip.current)
    }

    const onMouseLeave = () => {
        children.props.onMouseLeave && children.props.onMouseLeave()
        //show === undefined && hideTooltip(tooltip.current)
    }

    const computeStyle = useCallback(() => {
        if (childrenRef.current && tooltip.current) {
            const client = childrenRef.current.getBoundingClientRect() as DOMRect
            const tooltipRect = tooltip.current.getBoundingClientRect()
            const tooltipHeight = tooltip.current.clientHeight
            const tooltipWidth = tooltip.current.clientWidth


            switch (position) {
                case "top":
                    const offsetYTop = client.y - tooltipHeight
                    const offsetXTop = client.width > tooltipWidth ? client.x + ((client.width - tooltipWidth) / 2) : client.x - ((tooltipWidth - client.width) / 2)
                    return [offsetXTop, offsetYTop]
                case "bottom":
                    const offsetXBottom = client.width > tooltipWidth ? client.x + ((client.width - tooltipWidth) / 2) : client.x - ((tooltipWidth - client.width) / 2)
                    const offsetYBottom = client.y + client.height / 2 + tooltipHeight
                    return [offsetXBottom, offsetYBottom]
                case "left":
                    const offsetXLeft = - tooltipWidth - (client.height / 3)
                    const offsetYLeft = client.top
                    return [offsetXLeft, offsetYLeft]
                default:
                    return [0, 0]
            }
        }
    }, [position])

    const created = React.createElement(children.type, {
        ...children.props,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        ref: (node: any) => { childrenRef.current = node }
    })


    useEffect(() => {
        if (childrenRef.current && tooltip.current) {
            const values = computeStyle()
            values && gsap.set(tooltip.current, { left: values[0], top: values[1], transform: "none" })
        }
    }, [childrenRef, computeStyle])
    return (
        <>
            {created}
            <div className={clsx(["tooltip", `tooltipPosition-${position}`])} ref={tooltip}>
                {text}
                <div className="tooltipTriangle"></div>
            </div>

        </>
    )
}