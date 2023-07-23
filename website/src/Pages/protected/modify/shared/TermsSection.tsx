import { FC } from "react";
import { MappedCoachValues, MappedFitnessValues, TermsSectionProps } from "../../_types";
import { Checkbox } from "src/components/_index"
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "src/config/_index";

export const TermsSection: FC<TermsSectionProps> = () => {
    const { t } = useTranslation()
    const { register, formState: { errors } } = useFormContext<MappedCoachValues | MappedFitnessValues>()

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
                    register={register}
                    className={""}
                    isError={errors.terms !== undefined}
                    errorText={errors.terms?.message}
                    label={t("common.businessTermsAgreement")}
                    name={"terms"}
                />
                <Checkbox
                    register={register}
                    className={""}
                    isError={errors.dataProcessingForPropagation !== undefined}
                    errorText={errors.dataProcessingForPropagation?.message}
                    label={t("common.dataProcessingAgreement")}
                    name={"dataProcessingForPropagation"}
                />
            </section>
        </section>
    )
}