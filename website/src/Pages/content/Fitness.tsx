import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ContentHeader, FilteredContent } from "src/components";
import { FilterContexProvider } from "src/app/_index";
import { Filter } from "src/forms";

const Fitness: FC = () => {
  const { t } = useTranslation();
  const type = "fitness"


  return (
    <FilterContexProvider type={type}>
      <div
        id="Fitness"
        className={clsx([
          "relative",
          "stretch",
          "minorColor2",
          "contentPage",
          "relative",
        ])}
      >
        <ContentHeader text={t("fitnessContentPage.header1")} />
        <div className={clsx(["verticalText"])}>
          {t("fitnessContentPage.verticalText")}
        </div>
        <Filter type={type} />
        <FilteredContent type={type} />
      </div>
    </FilterContexProvider>
  );
};

export default Fitness;
