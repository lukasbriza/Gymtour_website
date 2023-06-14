import { FC } from "react";
import { UnderlinerProps } from "./_types";


export const Underliner: FC<UnderlinerProps> = (props) => {
    const { width, color, id, ...otherProps } = props

    return (
        <div className="underliner" id={id} style={{ width: width, background: color ? color : "white" }} {...otherProps}></div>
    )
}