import { FC } from "react";
import { FitnessInformationSectionProps, MappedFitnessValues } from "../../_types";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { MultipleSelectWithHelper, PriceLevel, SelectWithHelper, StringInput, TimeInput, mapOnlyRegions, mapTownsAccordingToRegion, standardMapper } from "src/components/_index";
import clsx from "clsx";
import { useField } from "src/hooks/_index";

export const FitnessInformationSection: FC<FitnessInformationSectionProps> = (props) => {
    const { regionOptions, generalOptions, othersOptions, equipmentOptions } = props
    const { t, i18n } = useTranslation();
    const { buildField } = useField();
    const { watch, formState: { errors, defaultValues } } = useFormContext<MappedFitnessValues>();
    const formvalues = watch();

    const regionsOptions = mapOnlyRegions(regionOptions, i18n.language);
    const defaultRegion = regionsOptions.find(
        (value) => value.code === String(defaultValues?.region)
    );
    const townOptions = mapTownsAccordingToRegion(
        String(formvalues.region),
        regionOptions,
        i18n.language
    );
    const defaultTown = townOptions.find(
        (value) => value.code === String(defaultValues?.town)
    );
    const mappedOthersOptions = standardMapper(othersOptions);
    const defaultOthers = mappedOthersOptions.filter((value) => {
        if (Array.isArray(defaultValues?.others)) {
            return defaultValues?.others.includes(value.code);
        }
        return false;
    });
    const mappedGeneralOptions = standardMapper(generalOptions)
    const defaultGenerals = mappedGeneralOptions.filter((value) => {
        if (Array.isArray(defaultValues?.general)) {
            return defaultValues?.general.includes(value.code)
        }
        return false
    })
    const mappedEquipmentOptions = standardMapper(equipmentOptions)
    const defaultEquipment = mappedEquipmentOptions.filter((value) => {
        if (Array.isArray(defaultValues?.equipment)) {
            return defaultValues?.equipment.includes(value.code)
        }
        return false
    })

    console.log({ defaultValues })

    return (
        <section
            className={clsx([
                "modifySection",
                "fitnessInformationSection",
                "glassMorphism",
            ])}
        >
            <div>
                <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>
                    {t("modifyPage.informationSection.informationHeader")}
                </h2>
                <p>{t("modifyPage.informationSection.informationSection")}</p>
            </div>
            <section className="fitnessInformationInputs">
                <StringInput
                    {...buildField("fitnessName")}
                    className="fitnessName"
                    label={t("common.name")}
                    requiredStar={true}
                />
                <SelectWithHelper
                    {...buildField("region", defaultRegion)}
                    disabledClass="disabledModifySelect"
                    disabled={regionsOptions.length === 0}
                    className={clsx(["regionSelect", "infoSelect"])}
                    label={t("common.region")}
                    options={regionsOptions}
                    requiredStar={true}
                />
                <SelectWithHelper
                    {...buildField("town", defaultTown)}
                    disabledClass="disabledModifySelect"
                    disabled={townOptions.length === 0}
                    className={clsx(["townSelect", "infoSelect"])}
                    label={t("common.town")}
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
                <div>

                </div>
            </section>
            <section className={clsx(["priceLevelSection"])}>
                <div>
                    <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>
                        {t("modifyPage.informationSection.priceLevelHeader")}
                    </h2>
                    <p>{t("modifyPage.informationSection.priceLevelContent")}</p>
                </div>
                <PriceLevel
                    name={"priceLevel"}
                    enableUndefined={false}
                    defaultNumber={defaultValues?.priceLevel}
                />
            </section>
            <section className="openingSection">
                <div>
                    <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>
                        {t("modifyPage.informationSection.openingHeader")}
                    </h2>
                    <p>{t("modifyPage.informationSection.openingContent")}</p>
                </div>
                <TimeInput label={"test"} name={"x"} />
            </section>
            <section className={clsx(["filterSection"])}>
                <div>
                    <h2 className={clsx(["modifySectionHeader", "sectionHeader"])}>
                        {t("modifyPage.informationSection.filterHeader")}
                    </h2>
                    <p>{t("modifyPage.informationSection.filterContent")}</p>
                </div>
                <section className="filterInformationInputs">
                    <MultipleSelectWithHelper
                        {...buildField("general", defaultGenerals)}
                        label={t("common.general")}
                        className={clsx(["generalsSelect", "infoSelect"])}
                        options={mappedGeneralOptions}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        {...buildField("equipment", defaultEquipment)}
                        label={t("common.equipment")}
                        className={clsx(["equipmentSelect", "infoSelect"])}
                        options={mappedEquipmentOptions}
                        requiredStar={true}
                    />
                    <MultipleSelectWithHelper
                        {...buildField("others", defaultOthers)}
                        label={t("common.others")}
                        className={clsx(["othersSelect", "infoSelect"])}
                        options={mappedOthersOptions}
                        requiredStar={true}
                    />
                </section>
            </section>
        </section>
    )
}