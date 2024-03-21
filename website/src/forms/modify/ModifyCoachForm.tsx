import { FC } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router"
import { routes } from "src/config/mainConfiguration"
import { ModifyCoachFormProps } from "../_types"
import { AboutSection, Contactsection, HeaderSection, PictureSection, SubmitSection, TermsSection } from "../shared/modify"
import { CoachInformationSection } from "./coach/CoachInformationSection"
import { onPictureRemove } from "../shared/modify/utils"

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
            <PictureSection onPictureRemove={onPictureRemove} />
            <TermsSection />
            <SubmitSection onBackClick={handleBackClick} submitText={t(id ? "common.modify" : "common.send")} />
        </section>
    )
}