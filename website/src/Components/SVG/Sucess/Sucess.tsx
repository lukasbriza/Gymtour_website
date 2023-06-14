import React from 'react';
import { SucessProps } from './_types';

const Sucess = React.forwardRef<SVGPathElement, SucessProps>((props, ref) => {

    return (
        <svg
            width={63.216 * props.scale + "px"}
            height={51.493 * props.scale + "px"}
            viewBox={"-20 -25 100 100"}
            className="successContainer"
        >
            <path
                id="Path_17"
                data-name="Path 17"
                d="M2945.488,1379.547l17,23,42-47"
                transform="translate(-2943.39 -1353.429)"
                fill="none"
                stroke={props.stroke}
                strokeLinecap="round"
                strokeWidth={props.strokeWidth}
                ref={ref}
            />
        </svg>
    )
})

export { Sucess }

