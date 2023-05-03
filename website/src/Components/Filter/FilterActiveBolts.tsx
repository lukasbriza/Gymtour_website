import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FilterActiveBoltsProps } from "./_types";
import clsx from "clsx";
import { Bolt, BoltProps } from "@components";
import { useCoachFilterContext, useFitnessFilterContext } from "@hooks";
import { useFormContext } from "react-hook-form";


export const FilterActiveBolts: FC<FilterActiveBoltsProps> = (props) => {
    const { type } = props
    const [boltsArray, setBoltsArray] = useState<BoltProps[]>([])
    const { bolts: fitnessBolts, removeBolt: removeFitnessBolt } = useFitnessFilterContext()
    const { bolts: coachBolts, removeBolt: removeCoachBolt } = useCoachFilterContext()
    const { getValues, setValue } = useFormContext()

    const handleRemove = useCallback((code: string, fieldName: string) => {
        const target = code.split("-")[0]
        let value: string[] = getValues(fieldName)
        const index = value.indexOf(target)
        if (index !== -1) {
            value.splice(index, 1)
            setValue(fieldName, value)
        }

        type === "coach" ? removeCoachBolt(code) : removeFitnessBolt(code)
    }, [getValues, removeCoachBolt, removeFitnessBolt, setValue, type])

    useEffect(() => {
        const bolts = type === "coach" ? coachBolts : fitnessBolts
        setBoltsArray(bolts)
    }, [coachBolts, fitnessBolts, type])

    return (
        <section className={clsx(["filterActiveBoltsSection"])}>
            {boltsArray.map((bolt, i) => {
                return (
                    <Bolt
                        text={bolt.text}
                        code={bolt.code}
                        key={i}
                        type={type}
                        fieldName={bolt.fieldName}
                        remove={handleRemove}
                    />
                )
            })}
        </section>
    )
}