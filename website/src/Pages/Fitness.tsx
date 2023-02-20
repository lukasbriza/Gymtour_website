import { FC } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ContentHeader, Filter } from "@components";

const Fitness: FC = () => {
  const { t } = useTranslation();

  return (
    <>
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
        <ContentHeader text={t("fitnessContentPage:header1")} />
        <div className={clsx(["verticalText"])}>
          {t("fitnessContentPage:verticalText")}
        </div>

        <Filter type="fitness" />
      </div>
    </>
  );
};

export default Fitness;
