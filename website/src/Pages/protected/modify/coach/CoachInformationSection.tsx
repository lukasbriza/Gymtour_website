import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { CoachInformationSectionProps, MappedCoachValues } from "../../_types";
import { MultipleSelectWithHelper, PriceLevel, SelectWithHelper, StringInput, mapOnlyRegions, mapTownsAccordingToRegion, standardMapper } from "src/components/_index";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export const CoachInformationSection: FC<CoachInformationSectionProps> = (props) => {
    const { loading, regionOptions, othersOptions, genderOptions, specializationOptions } = props

    const { t, i18n } = useTranslation()
    const { register, watch, formState: { errors } } = useFormContext<MappedCoachValues>()
    const formvalues = watch()
    const regionsOptions = mapOnlyRegions(regionOptions, i18n.language)
    const townOptions = mapTownsAccordingToRegion(String(formvalues.region), regionOptions, i18n.language)


    return (
        <section className={clsx(["modifySection", "coachInformationSection", "glassMorphism"])}>
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.informationSection.informationHeader")}</h2>
                <p>
                    {t("modifyPage.informationSection.informationSection")}
                </p>
            </div>
            <section className={"coachInformationInputs"}>
                <StringInput
                    className="coachName"
                    name={"coachName"}
                    isError={errors.coachName !== undefined}
                    register={register}
                    label={t("common.name")}
                    requiredStar={true}
                />
                <StringInput
                    className="coachSurname"
                    name={"coachSurname"}
                    isError={errors.coachSurname !== undefined}
                    register={register}
                    label={t("common.surname")}
                    requiredStar={true}
                />
                <StringInput
                    className="alias"
                    name={"alias"}
                    isError={errors.alias !== undefined}
                    register={register}
                    label={t("common.alias")}
                />
                <div className={clsx(["workPlace", "inputWithText"])}>
                    <p>{t("modifyPage.informationSection.workplaceInfo")}</p>
                    <StringInput
                        name={"workplace"}
                        isError={errors.workPlace !== undefined}
                        register={register}
                        label={t("common.workPlace")}
                        requiredStar={true}
                    />
                </div>
                <SelectWithHelper
                    disabledClass="disabledModifySelect"
                    disabled={regionsOptions.length === 0}
                    className={clsx(["regionSelect", "infoSelect"])}
                    name={"region"}
                    label={t("common.region")}
                    isError={errors.region !== undefined}
                    options={regionsOptions}
                    requiredStar={true}
                />
                <SelectWithHelper
                    disabledClass="disabledModifySelect"
                    disabled={townOptions.length === 0}
                    className={clsx(["townSelect", "infoSelect"])}
                    name={"town"}
                    label={t("common.town")}
                    isError={errors.town !== undefined}
                    options={formvalues.region ? townOptions : []}
                    requiredStar={true}
                />
                <StringInput
                    className="street"
                    name={"street"}
                    isError={errors.street !== undefined}
                    register={register}
                    label={t("common.street")}
                    requiredStar={true}
                />
                <StringInput
                    className="houseNumber"
                    name={"houseNumber"}
                    isError={errors.houseNumber !== undefined}
                    register={register}
                    label={t("common.houseNumber")}
                    requiredStar={true}
                />
            </section>
            <section className={clsx(["priceLevelSection"])}>
                <div>
                    <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.informationSection.priceLevelHeader")}</h2>
                    <p>
                        {t("modifyPage.informationSection.priceLevelContent")}
                    </p>
                </div>
                <PriceLevel name={"priceLevel"} enableUndefined={false} defaultNumber={1} />
            </section>
            <section className={clsx(["filterSection"])}>
                <div>
                    <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>{t("modifyPage.informationSection.filterHeader")}</h2>
                    <p>
                        {t("modifyPage.informationSection.filterContent")}
                    </p>
                </div>
                <section className="filterInformationInputs">
                    <SelectWithHelper
                        disabledClass="disabledModifySelect"
                        disabled={genderOptions.length === 0}
                        className={clsx(["genderSelect", "infoSelect"])}
                        name={"gender"}
                        label={t("common.gender")}
                        isError={errors.gender !== undefined}
                        options={standardMapper(genderOptions)}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        name="specialization"
                        label={t("common.specialization")}
                        className={clsx(["regionSelect", "infoSelect"])}
                        isError={errors.specialization !== undefined}
                        options={standardMapper(specializationOptions)}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        name="others"
                        label={t("contentPage.filter.others")}
                        className={clsx(["regionSelect", "infoSelect"])}
                        isError={errors.others !== undefined}
                        options={standardMapper(othersOptions)}
                        requiredStar={true}
                    />
                </section>
            </section>
        </section>
    )
}