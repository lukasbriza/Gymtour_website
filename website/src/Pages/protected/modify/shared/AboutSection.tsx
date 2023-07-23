import { FC } from "react";
import { AboutSectionProps, MappedCoachValues, MappedFitnessValues } from "../../_types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { TextArea } from "src/components/_index";

export const AboutSection: FC<AboutSectionProps> = (props) => {
    const { t } = useTranslation()
    const { formState: { errors } } = useFormContext<MappedCoachValues | MappedFitnessValues>()

    return (
        <section className={clsx(["modifySection", "aboutSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.aboutSection.aboutHeader")}</h2>
                <p>{t("modifyPage.aboutSection.aboutContent")}</p>
            </div>
            <TextArea
                name="descriptionFull"
                isError={errors.descriptionFull !== undefined}
                errorText={errors.descriptionFull?.message}
                label={t("common.about")}
                helperRootClass="aboutWrapperClass"
                requiredStar={true}
            />
        </section>
    )
}