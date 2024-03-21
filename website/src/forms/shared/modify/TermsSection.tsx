import { FC } from "react";
import { Checkbox } from "src/components"
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "src/config";
import { useField } from "src/hooks";

export const TermsSection: FC = () => {
    const { t } = useTranslation()
    const { buildField } = useField()

    return (
        <section className={clsx(["modifySection", "termsSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.termsSection.termsHeader")}</h2>
                <p>
                    {t("modifyPage.termsSection.termsContent")}
                </p>
                <p className="termsLinks">
                    <Link to={routes.dataProcessing.path}>{t("modifyPage.termsSection.termsLinkDataProcessing")}</Link>
                    <Link to={routes.businessConditions.path}>{t("modifyPage.termsSection.termsBusinessConditions")}</Link>
                </p>
            </div>
            <section className="termsInputs">
                <Checkbox
                    {...buildField("terms")}
                    label={t("common.businessTermsAgreement")}
                />
                <Checkbox
                    {...buildField("dataProcessingForPropagation")}
                    label={t("common.dataProcessingAgreement")}
                />
            </section>
        </section>
    )
}