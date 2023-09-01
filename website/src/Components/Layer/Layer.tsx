import React, { FC } from "react"
import { LayerProps } from "./_types"
import clsx from "clsx"


export const Layer: FC<LayerProps> = (props) => {
    const { children, className, ...otherProps } = props

    return (
        <div className={clsx(["layer", className])} {...otherProps}>
            {children}
        </div>
    )
}

