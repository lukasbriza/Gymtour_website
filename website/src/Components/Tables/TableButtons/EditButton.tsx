import { FC } from "react";
import { EditButtonProps } from "./_types";
import clsx from "clsx";
import { Edit } from "src/components/SVG/_index";

export const EditButton: FC<EditButtonProps> = (props) => {
    const { onClick, type, className, ...otherProps } = props
    return (
        <button
            type={type ?? "button"}
            className={clsx(["editButton", className])}
            onClick={onClick}
            {...otherProps}
        >
            <Edit width={12} height={12} viewBox="0 0 24 24" className="editIcon" />
        </button>
    )
}