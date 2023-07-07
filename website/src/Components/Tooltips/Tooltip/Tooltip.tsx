import { FC } from "react";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { TooltipProps } from "./_types";


/* Must set data-tooltip-id on another element same as id to tooltip to make it work */
export const Tooltip: FC<TooltipProps> = (props) => {
    const { id, hidden = false, place = "top", content, variant = "light", ...otherProps } = props
    return (
        <ReactTooltip
            id={id}
            hidden={hidden}
            place={place}
            content={content}
            variant={variant}
            {...otherProps}
        />
    )
}