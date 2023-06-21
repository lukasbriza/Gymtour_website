import { FilterContexProvider } from "src/app/_index";
import { ContentHeader, Filter, FilteredContent } from "src/components/_index";
import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Coach: FC = () => {
  const { t } = useTranslation();
  const type = "coach"

  return (
    <FilterContexProvider type={type}>
      <div
        id="Coach"
        className={clsx([
          "relative",
          "stretch",
          "minorColor2",
          "contentPage",
          "relative",
        ])}
      >
        <ContentHeader text={t("coachContentPage.header1")} />
        <div className={clsx(["verticalText"])}>
          {t("coachContentPage.verticalText")}
        </div>
        <Filter type={type} />
        <FilteredContent type={type} />
      </div>
    </FilterContexProvider>
  );
};

export default Coach;
