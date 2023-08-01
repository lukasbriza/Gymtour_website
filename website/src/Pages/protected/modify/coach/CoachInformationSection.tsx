import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { CoachInformationSectionProps, MappedCoachValues } from "../../_types";
import { MultipleSelectWithHelper, PriceLevel, SelectWithHelper, StringInput, mapOnlyRegions, mapTownsAccordingToRegion, standardMapper } from "src/components/_index";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useField } from "src/hooks/_index";

export const CoachInformationSection: FC<CoachInformationSectionProps> = (props) => {
    const { regionOptions, othersOptions, genderOptions, specializationOptions } = props

    const { t, i18n } = useTranslation()
    const { buildField } = useField()
    const { watch, formState: { errors, defaultValues } } = useFormContext<MappedCoachValues>()
    const formvalues = watch()
    const regionsOptions = mapOnlyRegions(regionOptions, i18n.language)
    const defaultRegion = regionsOptions.find((value) => value.code === String(defaultValues?.region))
    const townOptions = mapTownsAccordingToRegion(String(formvalues.region), regionOptions, i18n.language)
    const defaultTown = townOptions.find((value) => value.code === String(defaultValues?.town))
    const mappedGenderOptions = standardMapper(genderOptions)
    const defaultGender = mappedGenderOptions.find((value) => value.code === defaultValues?.gender)
    const mappedSpecializationOptions = standardMapper(specializationOptions)
    const defaultSpecialization = mappedSpecializationOptions.filter((value) => {
        if (Array.isArray(defaultValues?.specialization)) {
            return defaultValues?.specialization.includes(value.code)
        }
        return false
    })
    const mappedOthersOptions = standardMapper(othersOptions)
    const defaultOthers = mappedOthersOptions.filter((value) => {
        if (Array.isArray(defaultValues?.others)) {
            return defaultValues?.others.includes(value.code)
        }
        return false
    })

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
                    {...buildField("coachName")}
                    className="coachName"
                    label={t("common.name")}
                    requiredStar={true}
                />
                <StringInput
                    {...buildField("coachSurname")}
                    className="coachSurname"
                    label={t("common.surname")}
                    requiredStar={true}
                />
                <StringInput
                    {...buildField("alias")}
                    className="alias"
                    label={t("common.alias")}
                />
                <div className={clsx(["workPlace", "inputWithText"])}>
                    <p>{t("modifyPage.informationSection.workplaceInfo")}</p>
                    <StringInput
                        {...buildField("workplace")}
                        label={t("common.workPlace")}
                        requiredStar={true}
                    />
                </div>
                <SelectWithHelper
                    defaultValue={defaultRegion}
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
                    defaultValue={defaultTown}
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
                    {...buildField("street")}
                    className="street"
                    label={t("common.street")}
                    requiredStar={true}
                />
                <StringInput
                    {...buildField("houseNumber")}
                    className="houseNumber"
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
                <PriceLevel name={"priceLevel"} enableUndefined={false} defaultNumber={defaultValues?.priceLevel} />
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
                        defaultValue={defaultGender}
                        className={clsx(["genderSelect", "infoSelect"])}
                        name={"gender"}
                        label={t("common.gender")}
                        isError={errors.gender !== undefined}
                        options={mappedGenderOptions}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        defaultValue={defaultSpecialization}
                        name="specialization"
                        label={t("common.specialization")}
                        className={clsx(["regionSelect", "infoSelect"])}
                        isError={errors.specialization !== undefined}
                        options={mappedSpecializationOptions}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        defaultValue={defaultOthers}
                        name="others"
                        label={t("contentPage.filter.others")}
                        className={clsx(["regionSelect", "infoSelect"])}
                        isError={errors.others !== undefined}
                        options={mappedOthersOptions}
                        requiredStar={true}
                    />
                </section>
            </section>
        </section>
    )
}