import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { routes } from "src/config"
import { AboutSection, Contactsection, HeaderSection, PictureSection, SubmitSection, TermsSection } from "../shared/modify"
import { FitnessInformationSection } from "./fitness/FitnessInformationSection"
import { ModifyFitnessFrormProps } from "../_types"

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
            <SubmitSection onBackClick={handleBackClick} submitText={t(id ? "common.modify" : "common.send")} />
        </section>
    )
}