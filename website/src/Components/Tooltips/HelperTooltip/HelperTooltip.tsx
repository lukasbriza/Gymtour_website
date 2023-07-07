import { FC } from "react";
import { HelperTooltipProps } from "./_types";
import clsx from "clsx";
import { Tooltip } from "../../_index";
import { Info } from "../../SVG/_index";

export const HelperTooltip: FC<HelperTooltipProps> = (props) => {
    const { children, tooltipName, content } = props
    return (
        <div className={clsx(["helperTooltip"])}>
            {children}
            <Info data-tooltip-id={tooltipName} className="infoIcon" />
            <Tooltip id={tooltipName} content={content} />
        </div>
    )
}