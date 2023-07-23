import { FC } from "react"
import { useParams } from "react-router"
import { ProtectedRoute, Permissions } from "src/app/_index";
import { ModifyCoachFormProvider, ModifyFitnessFormProvider } from "./shared/FormProvider"
import { ModifyCoachForm } from "./coach/ModifyCoachForm"
import { ModifyFitnessForm } from "./fitness/ModifyFitnessForm"
import { Loading, filterAvoided } from "src/components/_index"
import { filter, routes } from "src/config/_index";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useServerData } from "src/hooks/_index";
import { getFilter } from "src/fetcher/_index";

const Modify: FC = () => {
    const { type } = useParams<{ type: "coach" | "fitness" }>()
    const { data: filterResponse, loading } = useServerData(getFilter)
    const { t } = useTranslation()

    const filterCleared = filterResponse && filterResponse?.data
        ? filterAvoided(
            filterResponse.data,
            type === "coach"
                ? (filter.avoidFilterTypes.coach as unknown as string[])
                : (filter.avoidFilterTypes.fitness as unknown as string[])
        )
        : null;


    const Form = type === "coach" ?
        (
            <ModifyCoachFormProvider>
                <ModifyCoachForm
                    type={type}
                    loading={true}
                    regionOptions={filterCleared?.regions ?? []}
                    othersOptions={filterCleared?.others ?? []}
                    genderOptions={filterCleared?.gender ?? []}
                    specializationOptions={filterCleared?.specialization ?? []}
                />
            </ModifyCoachFormProvider>
        ) : type === "fitness" ?
            (
                <ModifyFitnessFormProvider>
                    <ModifyFitnessForm type={type} />
                </ModifyFitnessFormProvider>
            ) :
            <Loading />

    return (
        <ProtectedRoute
            expectedPermission={Permissions.AUTHORIZED}
            redirect={routes.login.path}
        >
            <section
                id="Modify"
                className={clsx(["relative", "stretch", "modify", "page"])}
            >
                <div className={clsx(["verticalText"])}>
                    {t("coachContentPage.verticalText")}
                </div>
                {Form}
            </section>
        </ProtectedRoute>
    )
}

export default Modify

