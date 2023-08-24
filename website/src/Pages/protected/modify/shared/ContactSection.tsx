import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { StringInput } from "src/components/_index";
import { useField } from "src/hooks/_index";

export const Contactsection: FC = () => {
    const { t } = useTranslation()
    const { buildField } = useField()

    return (
        <section className={clsx(["modifySection", "contactSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.contactsSection.contactHeader")}</h2>
                <p>{t("modifyPage.contactsSection.contactContent")}</p>
            </div>
            <section className="contactInputs">
                <StringInput
                    {...buildField("email")}
                    className={clsx(["email", "contactInput"])}
                    label={t("common.email")}
                    requiredStar={true}
                />
                <StringInput
                    {...buildField("web")}
                    className="web"
                    label={t("common.web")}
                />
                <StringInput
                    {...buildField("tel")}
                    className="tel"
                    label={t("common.telephone")}
                />
                <StringInput
                    {...buildField("mobile")}
                    className="mobile"
                    label={t("common.mobile")}
                />
            </section>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.contactsSection.socialHeader")}</h2>
                <p>{t("modifyPage.contactsSection.socialContent")}</p>
            </div>
            <section className="socialNetworks">
                <StringInput
                    {...buildField("facebook")}
                    className="facebook"
                    label={t("common.facebook")}
                />
                <StringInput
                    {...buildField("instagram")}
                    className="instagram"
                    label={t("common.instagram")}
                />
                <StringInput
                    {...buildField("youtube")}
                    className="youtube"
                    label={t("common.youtube")}
                />
                <StringInput
                    {...buildField("twitter")}
                    className="twitter"
                    label={t("common.twitter")}
                />
                <StringInput
                    {...buildField("google")}
                    className="google"
                    label={t("common.google")}
                />
            </section>

        </section>
    )
}