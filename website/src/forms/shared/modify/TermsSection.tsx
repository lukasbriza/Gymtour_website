import { FC } from "react";
import { Checkbox } from "src/components"
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "src/config";
import { useField } from "src/hooks";
import { MappedCoachValues, MappedFitnessValues } from "src/utils";

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