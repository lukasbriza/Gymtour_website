import React from 'react'
import { CircleProps } from './_types'

const Circle = React.forwardRef<SVGCircleElement, CircleProps>((props, ref) => {


    return (
        <svg width={props.size} height={props.size} className={"circleContainer"}>
            <circle ref={ref} cx={`${props.size / 2}`} cy={`${props.size / 2}`} r={props.size / 2 - props.strokeWidth} fill="none" stroke={props.stroke} strokeWidth={props.strokeWidth} />
        </svg>
    )
})

export { Circle }