import { FC } from 'react'
import clsx from 'clsx'
import { Layer, Button, Footer, RegistrationForm, Underliner } from "src/components/_index";
import { useTranslation } from 'react-i18next'
import { routes } from 'src/config/_index';
import fitness from "../assets/fitness.webp";
import trainer from "../assets/trainer.webp";
import registerImg from '../assets/register.webp'


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


export const RegisterPage: FC = () => {
    const { t } = useTranslation();
    return (
        <section
            id="RegisterSection"
            className={clsx(["stretchX", "stretchVH", "relative", "RegisterSection"])}
        >
            <img src={registerImg} alt="RegisterBckgImg" />
            <Layer className={clsx(["stretchY", "stretchX"])}>
                <div className={clsx(["centerX", "relative", "registerHeaderWrapper"])}>
                    <h2>{t("registerPage.registerHeader")}</h2>
                    <Underliner width={"80%"} />
                </div>
                <div className={clsx(["registerParagraph", "relative", "centerX"])}>
                    {t("registerPage.registerParagraph")}
                </div>
                <RegistrationForm />
            </Layer >
        </section >
    )
}

export default Crossroad