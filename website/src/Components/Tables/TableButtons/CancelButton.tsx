import { FC } from "react";
import { Cross } from "src/components/SVG/_index";
import { CancelButtonProps } from "./_types";
import clsx from "clsx";

export const CancelButton: FC<CancelButtonProps> = (props) => {
    const { onClick, className, type, ...otherProps } = props
    return (
        <button
            type="button"
            className={clsx(["editCrossButton", className])}
            onClick={onClick}
            {...otherProps}
        >
            <Cross scale={0.22} stroke="red" strokeWidth={2} className="cancelButtonIcon" />
        </button>
    )
}