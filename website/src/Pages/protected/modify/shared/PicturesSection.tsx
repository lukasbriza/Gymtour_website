import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageInput, MultipleImageInput } from "src/components/_index";
import { MappedCoachValues, MappedFitnessValues } from "../../_types";

export const PictureSection: FC = () => {
    const { t } = useTranslation()
    const { control, formState: { defaultValues } } = useFormContext<MappedFitnessValues | MappedCoachValues>()

    return (
        <section className={clsx(["modifySection", "picturesSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.picturesSection.picturesHeader")}</h2>
                <p>{t("modifyPage.picturesSection.picturesContent")}</p>
            </div>
            <section className={"pictureInputs"}>
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.cardPictureHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.cardPuctureContent")}</p>
                </div>
                <Controller
                    control={control}
                    name={"cardPicture"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <ImageInput
                                value={value}
                                onChange={onChange}
                                className="cardInput"
                                showPreview={true}
                                {...field}
                            />
                        )
                    }}
                />
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.mainPictureHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.mainPictureContent")}</p>
                </div>
                <Controller
                    control={control}
                    name={"mainPicture"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <ImageInput
                                value={value}
                                onChange={onChange}
                                className="cardInput"
                                showPreview={true}
                                {...field}
                            />
                        )
                    }}
                />
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.othersPicturesHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.othersPictureContent")}</p>
                </div>
                <Controller
                    control={control}
                    name={"othersPictures"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <MultipleImageInput onChange={onChange} value={value} className="otherInput" {...field} />
                        )
                    }}

                />
            </section>
        </section>
    )
}