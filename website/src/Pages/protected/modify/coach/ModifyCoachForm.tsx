import { FC } from "react"
import { ModifyCoachFormProps } from "../../_types"
import { Contactsection } from "../shared/ContactSection"
import { TermsSection } from "../shared/TermsSection"
import { CoachInformationSection } from "./CoachInformationSection"
import { AboutSection } from "../shared/AboutSection"
import { PictureSection } from "../shared/PicturesSection"

export const ModifyCoachForm: FC<ModifyCoachFormProps> = (props) => {
    const { type, regionOptions, othersOptions, genderOptions, specializationOptions } = props


    return (
        <section style={{ marginTop: "80px" }}>
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

            <button type="submit" style={{
                zIndex: +100,
                position: "relative"
            }}>submit</button>
        </section>
    )
}