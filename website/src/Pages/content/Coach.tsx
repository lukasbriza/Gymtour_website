import { FilterContexProvider } from "src/app/_index";
import { ContentHeader, FilteredContent } from "src/components";
import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "src/forms";

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
          "contentPage",
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
