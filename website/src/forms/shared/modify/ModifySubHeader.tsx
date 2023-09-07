import clsx from "clsx";
import { FC } from "react"
import { ModifySubHeaderProps } from "src/forms/_types";

export const ModifySubHeader: FC<ModifySubHeaderProps> = (props) => {
    const { headerText, headerClass, paragraphClass, paragraphText } = props
    return (
        <div>
            <h2 className={clsx(["sectionHeader", headerClass])}>{headerText}</h2>
            {paragraphText && <p className={paragraphClass}>{paragraphText}</p>}
        </div>
    )
}