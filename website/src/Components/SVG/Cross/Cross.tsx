import React from "react"
import { CrossProps } from "./_types"

export const Cross = React.forwardRef<SVGSVGElement, CrossProps>((
    props,
    ref
) => {
    const viewBox = "0 0 " + (45.422 * props.scale) + " " + (42.03 * props.scale)

    return (
        <svg
            width={45.422 * props.scale}
            height={42.03 * props.scale}
            viewBox={viewBox}
            className="errorCrossContainer"
            ref={ref}
        >
            <line
                id="Line_1"
                data-name="Line 1"
                x2={44.744 * props.scale}
                y2={41.295 * props.scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
            <line
                id="Line_2"
                data-name="Line 2"
                y1={41.295 * props.scale}
                x2={44.744 * props.scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={props.stroke}
                strokeWidth={props.strokeWidth}
            />
        </svg>
    )
})
