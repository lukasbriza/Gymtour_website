import clsx from "clsx"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { SubmitSectionProps } from "src/forms"

export const SubmitSection: FC<SubmitSectionProps> = (props) => {
    const { onBackClick, submitText } = props
    const { t } = useTranslation()
    return (
        <section className="submitSection">
            <button
                className={clsx(["submitButton", "modifyButton", "modifySubmitButton", "glassMorphism"])}
                type="submit" >
                {submitText}
            </button>
            <button
                className={clsx(["modifyButton", "modifyBackButton", "glassMorphism"])}
                onClick={onBackClick}>
                {t("common.back")}
            </button>
        </section>
    )
}