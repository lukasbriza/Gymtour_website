import { FC } from 'react'
import { Layer, Button, Footer, RegisterPage } from "src/components/_index";
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { routes } from 'src/config/_index';
import fitness from "../assets/fitness.webp";
import trainer from "../assets/trainer.webp";


const Crossroad: FC = () => {
    return (
        <div id="Crossroad" className={clsx(["relative", "stretch", "minorColor2"])}>
            <div id="crossroadSectionWrapper">
                <FitnessPage />
                <div id="crossroadDivider" className="divider"></div>
                <CoachPage />
            </div>
            <RegisterPage />
            <Footer />
        </div>
    )
}

const CoachPage: FC = () => {
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
                <h1 className={"coachSectionHeader"}>{t("crossroad.coach.header")}</h1>
                <div className={"coachSectionParagraph"}>
                    {t("crossroad.coach.paragraph")}
                </div>
                <Button
                    path={routes.coach.path}
                    modificationClass={"crossroadButton"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={t("crossroad.coach.button")}
                />
            </Layer>
        </section>
    );
};

const FitnessPage: FC = () => {
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
                    {t("crossroad.fitness.header")}
                </h1>
                <div className={"fitnessSectionParagraph"}>
                    {t("crossroad.fitness.paragraph")}
                </div>
                <Button
                    path={routes.fitness.path}
                    modificationClass={"crossroadButton"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={t("crossroad.fitness.button")}
                />
            </Layer>
        </section>
    );
};

export default Crossroad