import { FC } from "react";
import { ContactSectionProps, MappedCoachValues, MappedFitnessValues } from "../../_types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { StringInput } from "src/components/_index";

export const Contactsection: FC<ContactSectionProps> = () => {
    const { t } = useTranslation()
    const { register, formState: { errors } } = useFormContext<MappedCoachValues | MappedFitnessValues>()

    return (
        <section className={clsx(["modifySection", "contactSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.contactsSection.contactHeader")}</h2>
                <p>{t("modifyPage.contactsSection.contactContent")}</p>
            </div>
            <section className="contactInputs">
                <StringInput
                    className={clsx(["email", "contactInput"])}
                    name={"email"}
                    isError={errors.email !== undefined}
                    register={register}
                    label={t("common.email")}
                    requiredStar={true}
                />
                <StringInput
                    className="web"
                    name={"web"}
                    isError={errors.web !== undefined}
                    register={register}
                    label={t("common.web")}
                />
                <StringInput
                    className="tel"
                    name={"tel"}
                    isError={errors.tel !== undefined}
                    register={register}
                    label={t("common.telephone")}
                />
                <StringInput
                    className="mobile"
                    name={"mobile"}
                    isError={errors.mobile !== undefined}
                    register={register}
                    label={t("common.mobile")}
                />
            </section>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.contactsSection.socialHeader")}</h2>
                <p>{t("modifyPage.contactsSection.socialContent")}</p>
            </div>
            <section className="socialNetworks">
                <StringInput
                    className="facebook"
                    name={"facebook"}
                    isError={errors.facebook !== undefined}
                    register={register}
                    label={t("common.facebook")}
                />
                <StringInput
                    className="instagram"
                    name={"instagram"}
                    isError={errors.instagram !== undefined}
                    register={register}
                    label={t("common.instagram")}
                />
                <StringInput
                    className="youtube"
                    name={"youtube"}
                    isError={errors.youtube !== undefined}
                    register={register}
                    label={t("common.youtube")}
                />
                <StringInput
                    className="twitter"
                    name={"twitter"}
                    isError={errors.twitter !== undefined}
                    register={register}
                    label={t("common.twitter")}
                />
                <StringInput
                    className="google"
                    name={"google"}
                    isError={errors.google !== undefined}
                    register={register}
                    label={t("common.google")}
                />
            </section>

        </section>
    )
}