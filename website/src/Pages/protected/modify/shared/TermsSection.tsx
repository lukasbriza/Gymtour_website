import { FC } from "react";
import { MappedCoachValues, MappedFitnessValues } from "../../_types";
import { Checkbox } from "src/components/_index"
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "src/config/_index";
import { useField } from "src/hooks/_index";

export const TermsSection: FC = () => {
    const { t } = useTranslation()
    const { buildField } = useField()
    const { formState: { errors, defaultValues } } = useFormContext<MappedCoachValues | MappedFitnessValues>()

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
                    defaultValue={defaultValues?.terms}
                    className={""}
                    errorText={errors.terms?.message}
                    label={t("common.businessTermsAgreement")}
                />
                <Checkbox
                    {...buildField("dataProcessingForPropagation")}
                    defaultValue={defaultValues?.dataProcessingForPropagation}
                    className={""}
                    errorText={errors.dataProcessingForPropagation?.message}
                    label={t("common.dataProcessingAgreement")}
                />
            </section>
        </section>
    )
}