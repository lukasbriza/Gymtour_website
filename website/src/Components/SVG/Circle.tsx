import React from 'react'

const Circle = React.forwardRef((props: Circle, ref: any) => {


    return (
        <div className="circleContainer" style={{
            transform: "scale(" + props.scale + ")"
        }}>
            <span className="circle stretch" ref={ref} style={{
                border: props.strokewidth + "px solid transparent",
                borderTop: props.strokewidth + "px solid " + props.strokecolor
            }}></span>
        </div>
    )
})

export { Circle }