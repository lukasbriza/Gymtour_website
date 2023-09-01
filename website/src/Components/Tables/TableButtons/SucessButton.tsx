import clsx from "clsx";
import { FC } from "react";
import { SucessButtonProps } from "./_types";
import { Sucess } from "src/components/SVG/_index";

export const SucessButton: FC<SucessButtonProps> = (props) => {
    const { onClick, className, type, ...otherProps } = props
    return (
        <button
            type={type ?? "submit"}
            className={clsx(["succesButton", className])}
            onClick={onClick}
            {...otherProps}
        >
            <Sucess scale={0.3} stroke="green" strokeWidth={10} className="sucessButtonIcon" />
        </button>
    )
}