import { FC } from "react";
import { FilteredContentProps } from "./_types";
import clsx from "clsx";
import { useCoachFilterContext, useFitnessFilterContext } from "src/hooks/_index";
import { Card, Loading } from "../_index";
import { Coach, Fitness } from "src/fetcher/_index";


export const FilteredContent: FC<FilteredContentProps> = ({ type }) => {
    const { contentLoading: fitnessLoading, filteredContent: fitnessFilteredContent } = useFitnessFilterContext()
    const { contentLoading: coachesLoading, filteredContent: coachFilteredContent } = useCoachFilterContext()
    const loading = type === "coach" ? coachesLoading : fitnessLoading



    return (
        <section className={clsx(["filteredContent", "loadingFilteredContent"])}>
            {
                loading ?
                    <Loading scale={2} /> :
                    type === "coach" ?
                        <CoachCards contentArray={coachFilteredContent} /> :
                        <FitnessCards contentArray={fitnessFilteredContent} />
            }
        </section>
    )
}

const FitnessCards: FC<{ contentArray: Fitness[] }> = ({ contentArray }) => {
    return (
        <>
            {
                contentArray.map((fitness, i) => {
                    return <Card  {...fitness} key={`${i}-fitness`} type="fitness" />
                })
            }
        </>
    )
}

const CoachCards: FC<{ contentArray: Coach[] }> = ({ contentArray }) => {
    return (
        <>
            {
                contentArray.map((coach, i) => {
                    return <Card {...coach} key={`${i}-coach`} type="coach" />
                })
            }
        </>)
}