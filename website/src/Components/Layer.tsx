import React from "react"


const Layer = (props: { className?: string, children: React.ReactNode }) => {
    let className = ""
    if (props.className !== undefined) { className = props.className }
    return (
        <div className={"layer " + className}>
            {props.children}
        </div>
    )
}

export { Layer }