import { HelperText } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageInput, MultipleImageInput } from "src/components";
import { MappedCoachValues, MappedFitnessValues } from "src/utils";
import { ModifySubHeader } from "./ModifySubHeader";
import { PictureSectionProps } from "../../_types";

export const PictureSection: FC<PictureSectionProps> = (props) => {
    const { t } = useTranslation()
    const { control, formState: { defaultValues, errors } } = useFormContext<MappedFitnessValues | MappedCoachValues>()
    const otherPictures = defaultValues?.othersPictures && (defaultValues?.othersPictures?.length > 0 ? defaultValues?.othersPictures as File[] : [])
    console.log(defaultValues)

    return (
        <section className={clsx(["modifySection", "picturesSection", "glassMorphism"])}>
            <ModifySubHeader
                headerText={t("modifyPage.picturesSection.picturesHeader")}
                paragraphText={t("modifyPage.picturesSection.picturesContent")}
                headerClass="modifySectionHeader"
            />
            <section className={"pictureInputs"}>
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.cardPictureHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.cardPuctureContent")}</p>
                </div>
                <HelperText
                    show
                    text=""
                    position={"bottom"}
                    errorText={errors.cardPicture?.message}
                    isError={errors.cardPicture?.message !== undefined}
                    styleClass={{ errorText: "pictureError", root: "cardInput" }}
                >
                    <Controller
                        defaultValue={defaultValues?.cardPicture}
                        control={control}
                        name={"cardPicture"}
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <ImageInput
                                    value={value}
                                    onChange={onChange}
                                    showPreview={true}
                                    {...field}
                                />
                            )
                        }}
                    />
                </HelperText>
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.mainPictureHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.mainPictureContent")}</p>
                </div>
                <HelperText
                    show
                    text=""
                    position={"bottom"}
                    errorText={errors.mainPicture?.message}
                    isError={errors.mainPicture?.message !== undefined}
                    styleClass={{ errorText: "pictureError", root: "cardInput" }}
                >
                    <Controller
                        defaultValue={defaultValues?.mainPicture}
                        control={control}
                        name={"mainPicture"}
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <ImageInput
                                    value={value}
                                    onChange={onChange}
                                    showPreview={true}
                                    {...field}
                                />
                            )
                        }}
                    />
                </HelperText>
                <div>
                    <h3 className={clsx(["modifySectionHeader", "sectionSubHeader"])}>{t("modifyPage.picturesSection.othersPicturesHeader")}</h3>
                    <p>{t("modifyPage.picturesSection.othersPictureContent")}</p>
                </div>
                <HelperText
                    show
                    text=""
                    position={"bottom"}
                    errorText={errors.othersPictures?.message}
                    isError={errors.othersPictures?.message !== undefined}
                    styleClass={{ errorText: "pictureError", root: "otherInput" }}
                >
                    <Controller
                        defaultValue={otherPictures}
                        control={control}
                        name={"othersPictures"}
                        render={({ field: { value, onChange, ...field } }) => {
                            return (
                                <MultipleImageInput onChange={onChange} value={value} {...field} />
                            )
                        }}
                    />
                </HelperText>
            </section>
        </section>
    )
}