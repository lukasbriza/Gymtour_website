import React, { useState, useEffect } from 'react';

const Sucess = React.forwardRef((props: any, ref: any) => {
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
            width={63.216 * props.scale}
            height={51.493 * props.scale}
            viewBox={"-20 -25 100 100"}
            className="svgSucess absolute"
            style={{
                display: show
            }}
        >
            <path
                id="Path_17"
                data-name="Path 17"
                d="M2945.488,1379.547l17,23,42-47"
                transform="translate(-2943.39 -1353.429)"
                fill="none"
                stroke={props.strokecolor}
                strokeLinecap="round"
                strokeWidth={props.strokewidth}
                ref={ref}
            />
        </svg>
    )
})

export { Sucess }

