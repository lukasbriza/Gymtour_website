import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HeaderSectionProps } from "src/forms";

export const HeaderSection: FC<HeaderSectionProps> = (props) => {
    const { type } = props
    const { t } = useTranslation()

    return (
        <section className="headerSection">
            <h1>{t(type === "create" ? "modifyPage.headerSection.headerCreate" : "modifyPage.headerSection.headerModify")}</h1>
            <p>{t("modifyPage.headerSection.text")}</p>
            {type === "create" && <p>{t("modifyPage.headerSection.taxtApprove")}</p>}
        </section>
    )
}