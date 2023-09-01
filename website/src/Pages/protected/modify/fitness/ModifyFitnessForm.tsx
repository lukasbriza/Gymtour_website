import { FC } from "react"
import { ModifyFitnessFrormProps } from "../../_types"
import { useTranslation } from "react-i18next"
import { FitnessInformationSection } from "./FitnessInformationSection"
import { AboutSection, Contactsection, HeaderSection, PictureSection, TermsSection } from "../shared"
import { useNavigate, useParams } from "react-router"
import clsx from "clsx"
import { routes } from "src/config/_index"

export const ModifyFitnessForm: FC<ModifyFitnessFrormProps> = (props) => {
    const { generalOptions, othersOptions, regionOptions, equipmentOptions } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();

    const handleBackClick = () => navigate(routes.dashboard.path)

    return (
        <section>
            <HeaderSection type={id ? "modify" : "create"} />
            <FitnessInformationSection
                equipmentOptions={equipmentOptions}
                generalOptions={generalOptions}
                othersOptions={othersOptions}
                regionOptions={regionOptions}
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