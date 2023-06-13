import { FC } from "react";
import { FilterActiveBoltsProps } from "./_types";
import clsx from "clsx";
import { Bolt } from "@components";
import { useCoachFilterContext, useFitnessFilterContext } from "@hooks";

export const FilterActiveBolts: FC<FilterActiveBoltsProps> = (props) => {
    const { type } = props
    const { bolts: fitnessBolts } = useFitnessFilterContext()
    const { bolts: coachBolts } = useCoachFilterContext()
    const bolts = type === "coach" ? coachBolts : fitnessBolts

    return (
        <section id={"boltSection"} className={clsx(["filterActiveBoltsSection"])}>
            {bolts.map((bolt, i) => {
                return (
                    <Bolt
                        id={bolt.code || ""}
                        text={bolt.text}
                        code={bolt.code}
                        key={`${i}-bolt`}
                        type={type}
                        fieldName={bolt.fieldName}
                    />
                )
            })
            }
        </section>
    )
}