import { FC } from "react"
import { ModifyCoachFormProps } from "../../_types"
import { CoachInformationSection } from "./CoachInformationSection"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { HeaderSection, PictureSection, AboutSection, TermsSection, Contactsection } from "../shared"
import { useNavigate, useParams } from "react-router"
import { routes } from "src/config/mainConfiguration"

export const ModifyCoachForm: FC<ModifyCoachFormProps> = (props) => {
    const { type, regionOptions, othersOptions, genderOptions, specializationOptions } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();

    const handleBackClick = () => navigate(routes.dashboard.path)

    return (
        <section>
            <HeaderSection type={id ? "modify" : "create"} />
            <CoachInformationSection
                regionOptions={regionOptions}
                othersOptions={othersOptions}
                genderOptions={genderOptions}
                specializationOptions={specializationOptions}
            />
            <Contactsection />
            <AboutSection />
            <PictureSection />
            <TermsSection />
            <section className="submitSection">
                <button className={clsx(["submitButton", "modifyButton", "modifySubmitButton", "glassMorphism"])} type="submit" >{t(id ? "common.modify" : "common.send")}</button>
                <button className={clsx(["modifyButton", "modifyBackButton", "glassMorphism"])} onClick={handleBackClick}>{t("common.back")}</button>
            </section>
        </section>
    )
}