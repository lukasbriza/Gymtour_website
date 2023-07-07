import React from 'react';
import { SucessProps } from './_types';
import clsx from 'clsx';

const Sucess = React.forwardRef<SVGPathElement, SucessProps>((props, ref) => {
    const { stroke, strokeWidth, scale, className, ...otherProps } = props

    return (
        <svg
            width={63.216 * scale + "px"}
            height={51.493 * scale + "px"}
            viewBox={"-20 -25 100 100"}
            className={clsx(["successContainer", className])}
            {...otherProps}
        >
            <path
                id="Path_17"
                data-name="Path 17"
                d="M2945.488,1379.547l17,23,42-47"
                transform="translate(-2943.39 -1353.429)"
                fill="none"
                stroke={stroke}
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                ref={ref}
            />
        </svg>
    )
})

export { Sucess }

