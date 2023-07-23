import { FC } from "react"
import { MappedCoachValues, ModifyFitnessFrormProps } from "../../_types"
import { useTranslation } from "react-i18next"
import { StringInput } from "src/components/_index"
import { useFormContext } from "react-hook-form"

export const ModifyFitnessForm: FC<ModifyFitnessFrormProps> = (props) => {
    const { t } = useTranslation()
    const { control, formState: { errors } } = useFormContext<MappedCoachValues>()
    return (
        <section>

        </section>
    )
}