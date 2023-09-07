import { FC } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
  MultipleSelectWithHelper,
  PriceLevel,
  SelectWithHelper,
  StringInput
} from "src/components";
import { useField } from "src/hooks";
import { MappedCoachValues } from "src/utils";
import { CoachInformationSectionProps, ModifySubHeader, mapOnlyRegions, mapTownsAccordingToRegion, standardMapper } from "src/forms";

export const CoachInformationSection: FC<CoachInformationSectionProps> = (props) => {
  const { regionOptions, othersOptions, genderOptions, specializationOptions } = props;

  const { t, i18n } = useTranslation();
  const { buildField } = useField();
  const { watch, formState: { defaultValues } } = useFormContext<MappedCoachValues>();
  const { region, town, gender, specialization, others } = defaultValues ?? {}
  const { region: watchedRegions } = watch();

  const mappedSpecializationOptions = standardMapper(specializationOptions);
  const mappedOthersOptions = standardMapper(othersOptions);
  const mappedRegionOptions = mapOnlyRegions(regionOptions, i18n.language);
  const mappedGenderOptions = standardMapper(genderOptions);
  const mappedTownOptions = mapTownsAccordingToRegion(
    String(watchedRegions),
    regionOptions,
    i18n.language
  );

  const defaultRegion = mappedRegionOptions.find(({ code }) => code === String(region));
  const defaultTown = mappedTownOptions.find(({ code }) => code === String(town));
  const defaultGender = mappedGenderOptions.find(({ code }) => code === gender);
  const defaultSpecialization = mappedSpecializationOptions.filter(({ code }) => Array.isArray(specialization) ? specialization.includes(code) : false)
  const defaultOthers = mappedOthersOptions.filter(({ code }) => Array.isArray(others) ? others.includes(code) : false)

  return (
    <section
      className={clsx([
        "modifySection",
        "coachInformationSection",
        "glassMorphism",
      ])}
    >
      <ModifySubHeader
        headerClass="modifySectionHeader"
        headerText={t("modifyPage.informationSection.informationHeader")}
        paragraphText={t("modifyPage.informationSection.informationSection")}
      />
      <section className={"coachInformationInputs"}>
        <StringInput
          {...buildField("coachName")}
          className="coachName"
          label={t("common.name")}
          requiredStar
        />
        <StringInput
          {...buildField("coachSurname")}
          className="coachSurname"
          label={t("common.surname")}
          requiredStar
        />
        <StringInput
          {...buildField("alias")}
          className="alias"
          label={t("common.alias")}
        />
        <div className={clsx(["workPlace", "inputWithText"])}>
          <p>{t("modifyPage.informationSection.workplaceInfo")}</p>
          <StringInput
            {...buildField("workPlace")}
            label={t("common.workPlace")}
            requiredStar
          />
        </div>
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
          options={region ? mappedTownOptions : []}
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
          name={"priceLevel"}
          enableUndefined={false}
          defaultNumber={defaultValues?.priceLevel}
        />
      </section>
      <section className={clsx(["filterSection"])}>
        <ModifySubHeader
          headerClass="modifySectionHeader"
          headerText={t("modifyPage.informationSection.filterHeader")}
          paragraphText={t("modifyPage.informationSection.filterContent")}
        />
        <section className="filterInformationInputs">
          <SelectWithHelper
            {...buildField("gender", defaultGender)}
            disabledClass="disabledModifySelect"
            disabled={genderOptions.length === 0}
            className={clsx(["genderSelect", "infoSelect"])}
            label={t("common.gender")}
            options={mappedGenderOptions}
            requiredStar
          />
          <MultipleSelectWithHelper
            {...buildField("specialization", defaultSpecialization)}
            label={t("common.specialization")}
            className={clsx(["specializationSelect", "infoSelect"])}
            options={mappedSpecializationOptions}
            requiredStar
          />
          <MultipleSelectWithHelper
            {...buildField("others", defaultOthers)}
            label={t("contentPage.filter.others")}
            className={clsx(["othersSelect", "infoSelect"])}
            options={mappedOthersOptions}
            requiredStar
          />
        </section>
      </section>
    </section>
  );
};
