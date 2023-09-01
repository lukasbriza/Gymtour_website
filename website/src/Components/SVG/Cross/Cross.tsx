import React from "react"
import { CrossProps } from "./_types"
import clsx from "clsx"

export const Cross = React.forwardRef<SVGSVGElement, CrossProps>((
    props,
    ref
) => {
    const { scale, strokeWidth, stroke, className, ...otherProps } = props
    const viewBox = "0 0 " + (45.422 * scale) + " " + (42.03 * scale)

    return (
        <svg
            width={45.422 * scale}
            height={42.03 * scale}
            viewBox={viewBox}
            className={clsx(["errorCrossContainer", className])}
            ref={ref}
            {...otherProps}
        >
            <line
                id="Line_1"
                data-name="Line 1"
                x2={44.744 * scale}
                y2={41.295 * scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <line
                id="Line_2"
                data-name="Line 2"
                y1={41.295 * scale}
                x2={44.744 * scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    )
})
