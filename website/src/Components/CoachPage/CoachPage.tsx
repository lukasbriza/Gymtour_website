import { Button, Layer } from "@components";
import { routes } from "@config";
import trainer from "@assets/trainer.webp";
import clsx from "clsx";
import { FC } from "react";
import { text } from "src/config/textSource";
import { useTranslation } from "react-i18next";

export const CoachPage: FC = () => {
  const { t } = useTranslation();
  return (
    <section
      id="CoachSection"
      className={clsx([
        "stretchX",
        "stretchVH",
        "relative",
        "minHeightWidth",
        "CoachSection",
      ])}
    >
      <img src={trainer} alt="TrainerBckgImg" />
      <Layer className={clsx(["stretchY", "stretchX"])}>
        <h1 className={"coachSectionHeader"}>{t("crossroad:coach.header")}</h1>
        <div className={"coachSectionParagraph"}>
          {t("crossroad:coach.paragraph")}
        </div>
        <Button
          path={routes.coach.path}
          onClick={() => {
            console.log("clicked");
          }}
          modificationClass={"crossroadButton"}
          initialClass={"buttonInitial"}
          hoverClass={"buttonHover"}
          text={t("crossroad:coach.button")}
        />
      </Layer>
    </section>
  );
};
