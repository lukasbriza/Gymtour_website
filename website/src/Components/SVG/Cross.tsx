import React, { useState, useEffect } from "react"

const Cross = React.forwardRef((
    props: any,
    ref: any
) => {
    let vievBox = "0 0 " + (45.422 * props.scale) + " " + (42.03 * props.scale)
    const [show, setShow] = useState("none")
    useEffect(() => {
        if (props.show === false) {
            setShow("none");
        }
        if (props.show === true) {
            setShow("initial");
        }
    }, [props.show])
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={45.422 * props.scale}
            height={42.03 * props.scale}
            viewBox={vievBox}
            className="svgCross absolute"
            ref={ref}
            style={{
                display: show
            }}
        >
            <line
                id="Line_1"
                data-name="Line 1"
                x2={44.744 * props.scale}
                y2={41.295 * props.scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={props.strokecolor}
                strokeWidth={props.strokewidth}
            />
            <line
                id="Line_2"
                data-name="Line 2"
                y1={41.295 * props.scale}
                x2={44.744 * props.scale}
                transform="translate(0.339 0.367)"
                fill="none"
                strokeLinecap="round"
                stroke={props.strokecolor}
                strokeWidth={props.strokewidth}
            />
        </svg>
    )
})

export { Cross }
