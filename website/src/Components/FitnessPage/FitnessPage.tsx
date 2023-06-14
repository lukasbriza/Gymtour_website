import clsx from "clsx";
import { FC } from "react";
import { Layer, Button } from "@components";
import fitness from "@assets/fitness.webp";
import { text } from "../../config/textSource";
import { routes } from "@config";
import { useTranslation } from "react-i18next";

export const FitnessPage: FC = () => {
  const { t } = useTranslation();
  return (
    <section
      id="FitnessSection"
      className={clsx([
        "stretchX",
        "stretchVH",
        "relative",
        "minHeightWidth",
        "FitnessSection",
      ])}
    >
      <img src={fitness} alt="FitnesBckgImg" />
      <Layer className={clsx(["stretchY", "stretchX"])}>
        <h1 className={"fitnessSectionHeader"}>
          {t("crossroad:fitness.header")}
        </h1>
        <div className={"fitnessSectionParagraph"}>
          {t("crossroad:fitness.paragraph")}
        </div>
        <Button
          path={routes.fitness.path}
          modificationClass={"crossroadButton"}
          initialClass={"buttonInitial"}
          hoverClass={"buttonHover"}
          text={t("crossroad:fitness.button")}
        />
      </Layer>
    </section>
  );
};
