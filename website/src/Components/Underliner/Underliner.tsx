import { Props } from "@lukasbriza/lbui-lib";
import { FC } from "react";

type UnderlinerProps = {
    width: string;
    color?: string;
} & Props<HTMLDivElement>
export const Underliner: FC<UnderlinerProps> = (props) => {
    const { width, color, id, ...otherProps } = props

    return (
        <div className="underliner" id={id} style={{ width: width, background: color ? color : "white" }} {...otherProps}></div>
    )
}