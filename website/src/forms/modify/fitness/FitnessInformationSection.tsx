import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { MultipleSelectWithHelper, PriceLevel, SelectWithHelper, StringInput, TimeInput } from "src/components";
import { useField } from "src/hooks";
import { MappedFitnessValues } from "src/utils";
import { FitnessInformationSectionProps, ModifySubHeader, mapOnlyRegions, mapTownsAccordingToRegion, standardMapper } from "src/forms";

export const FitnessInformationSection: FC<FitnessInformationSectionProps> = (props) => {
    const { regionOptions, generalOptions, othersOptions, equipmentOptions } = props
    const { t, i18n } = useTranslation();
    const { buildField } = useField();
    const { watch, formState: { errors, defaultValues } } = useFormContext<MappedFitnessValues>();
    const { town, region, others, general, equipment, priceLevel, open } = defaultValues ?? {}
    const { region: watchedRegions } = watch();

    const mappedRegionOptions = mapOnlyRegions(regionOptions, i18n.language);
    const mappedOthersOptions = standardMapper(othersOptions);
    const mappedGeneralOptions = standardMapper(generalOptions)
    const mappedEquipmentOptions = standardMapper(equipmentOptions)
    const mappedTownOptions = mapTownsAccordingToRegion(
        String(watchedRegions),
        regionOptions,
        i18n.language
    );

    const defaultRegion = mappedRegionOptions.find(({ code }) => code === String(region));
    const defaultTown = mappedTownOptions.find(({ code }) => code === String(town));
    const defaultOthers = mappedOthersOptions.filter(({ code }) => Array.isArray(others) ? others.includes(code) : false)
    const defaultGenerals = mappedGeneralOptions.filter(({ code }) => Array.isArray(general) ? general.includes(code) : false)
    const defaultEquipment = mappedEquipmentOptions.filter(({ code }) => Array.isArray(equipment) ? equipment.includes(code) : false)

    const openInputProps = (day: string) => {
        const dayLabel = `common.days.${day}`
        return {
            name: `open.${day}`,
            label: `${t(dayLabel as any)} ${t("common.fromTo")}:`,
            checkboxLabel: t("common.closed"),
            requiredStar: true,
            defaultValue: open ? open[day as keyof typeof open] : undefined,
            isError: errors.open && errors.open[day as keyof typeof errors.open] !== undefined,
        }
    }

    return (
        <section
            className={clsx([
                "modifySection",
                "fitnessInformationSection",
                "glassMorphism",
            ])}
        >
            <ModifySubHeader
                headerClass="modifySectionHeader"
                headerText={t("modifyPage.informationSection.informationHeader")}
                paragraphText={t("modifyPage.informationSection.informationSection")}
            />
            <section className="fitnessInformationInputs">
                <StringInput
                    {...buildField("name")}
                    className="fitnessName"
                    label={t("common.name")}
                    requiredStar
                />
                <SelectWithHelper
                    {...buildField("region", defaultRegion)}
                    disabledClass="disabledModifySelect"
                    disabled={mappedRegionOptions.length === 0}
                    className={clsx(["regionSelect", "infoSelect"])}
                    label={t("common.region")}
                    options={mappedRegionOptions}
                    requiredStar
                />
                <SelectWithHelper
                    {...buildField("town", defaultTown)}
                    disabledClass="disabledModifySelect"
                    disabled={mappedTownOptions.length === 0}
                    className={clsx(["townSelect", "infoSelect"])}
                    label={t("common.town")}
                    options={watchedRegions ? mappedTownOptions : []}
                    requiredStar
                />
                <StringInput
                    {...buildField("street")}
                    className="street"
                    label={t("common.street")}
                    requiredStar
                />
                <StringInput
                    {...buildField("houseNumber")}
                    className="houseNumber"
                    label={t("common.houseNumber")}
                    requiredStar
                />
            </section>
            <section className={clsx(["priceLevelSection"])}>
                <ModifySubHeader
                    headerClass="modifySectionHeader"
                    headerText={t("modifyPage.informationSection.priceLevelHeader")}
                    paragraphText={t("modifyPage.informationSection.priceLevelContent")}
                />
                <PriceLevel
                    name="priceLevel"
                    enableUndefined={false}
                    defaultNumber={priceLevel}
                />
            </section>
            <section className="openingSection">
                <ModifySubHeader
                    headerClass="modifySectionHeader"
                    headerText={t("modifyPage.informationSection.openingHeader")}
                    paragraphText={t("modifyPage.informationSection.openingContent")}
                />
                <div className="openingInputWrappers">
                    <TimeInput errorText={errors.open?.mon?.from?.message || errors.open?.mon?.to?.message} {...openInputProps("mon")} />
                    <TimeInput errorText={errors.open?.tue?.from?.message || errors.open?.tue?.to?.message} {...openInputProps("tue")} />
                    <TimeInput errorText={errors.open?.wed?.from?.message || errors.open?.wed?.to?.message} {...openInputProps("wed")} />
                    <TimeInput errorText={errors.open?.thu?.from?.message || errors.open?.thu?.to?.message} {...openInputProps("thu")} />
                    <TimeInput errorText={errors.open?.fri?.from?.message || errors.open?.fri?.to?.message} {...openInputProps("fri")} />
                    <TimeInput errorText={errors.open?.sat?.from?.message || errors.open?.sat?.to?.message} {...openInputProps("sat")} />
                    <TimeInput errorText={errors.open?.sun?.from?.message || errors.open?.sun?.to?.message} {...openInputProps("sun")} />
                </div>
            </section>
            <section className={clsx(["filterSection"])}>
                <ModifySubHeader
                    headerClass="modifySectionHeader"
                    headerText={t("modifyPage.informationSection.filterHeader")}
                    paragraphText={t("modifyPage.informationSection.filterContent")}
                />
                <section className="filterInformationInputs">
                    <MultipleSelectWithHelper
                        {...buildField("general", defaultGenerals)}
                        label={t("common.general")}
                        className={clsx(["generalsSelect", "infoSelect"])}
                        options={mappedGeneralOptions}
                        requiredStar
                    />
                    <MultipleSelectWithHelper
                        {...buildField("equipment", defaultEquipment)}
                        label={t("common.equipment")}
                        className={clsx(["equipmentSelect", "infoSelect"])}
                        options={mappedEquipmentOptions}
                        requiredStar
                    />
                    <MultipleSelectWithHelper
                        {...buildField("others", defaultOthers)}
                        label={t("common.others")}
                        className={clsx(["othersSelect", "infoSelect"])}
                        options={mappedOthersOptions}
                        requiredStar
                    />
                </section>
            </section>
        </section>
    )
}