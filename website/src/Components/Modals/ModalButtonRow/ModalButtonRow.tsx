import { FC } from "react"
import { ModalButtonRowProps } from "./_types"
import clsx from "clsx"

export const ModalButtonRow: FC<ModalButtonRowProps> = (props) => {
    const { onBack, onClick, submitText, backText, submitClass, backClass } = props
    return (
        <div className="modalButtonRow">
            <button type="button" onClick={onClick} className={clsx(["modalSubmitButton", submitClass])}>{submitText}</button>
            <button type="button" onClick={onBack} className={clsx(["modalBackButton", backClass])}>{backText}</button>
        </div>
    )
}