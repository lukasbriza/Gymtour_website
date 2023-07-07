import clsx from "clsx";
import { BaseSyntheticEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { coachLiked, fitnessLiked } from "./dummydata";
import { useServerData } from "src/hooks/useServerData";
import { getFilter } from "src/fetcher/_index";
import { CancelButton, QuestionHeader } from "src/components/_index";
import { useModal } from "src/hooks/_index";

export const UserLikesList: FC = () => {
    const { data: filterData, loading: filterLoading } = useServerData(getFilter)
    const { t, i18n } = useTranslation()
    const { showModal, closeModal, isActive } = useModal()

    const transalteRegion = (region: number) => {
        if (filterData) {
            const regionObject = filterData.data?.regions.find((item) => Number(item.code) === region)
            return (i18n.language === "cs" ? regionObject?.name.cz : regionObject?.name.eng) ?? ""
        }
        return ""
    }

    const translateTown = (region: number, town: number) => {
        if (filterData) {
            const regionObject = filterData.data?.regions.find((item) => Number(item.code) === region)
            const townObject = regionObject?.towns.find((item) => Number(item.code) === town)
            return (i18n.language === "cs" ? townObject?.name.cz : regionObject?.name.eng) ?? ""
        }
        return ""
    }

    const handleRecordCancel = (id: string, type: "fitness" | "coach") => () => {
        showModal({
            headerComp: <QuestionHeader header={t("dashboardPage.userLikesList.modal.questionHeader")} />,
            backButton: true,
            backText: t("common.back"),
            text: t("dashboardPage.userLikesList.modal.questionContent"),
            button: t("common.remove"),
            onClick: () => console.log("clicked") //REMOVE CALL
        })
    }
    return (
        <section className={clsx(["userLikesList", "dashBoardTable", "dashBoardSection", "glassMorphism"])}>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={4}><h2>{t("dashboardPage.userLikesList.favoriteFitnessHeader")}</h2></td>
                    </tr>
                    <tr className="rowHeader">
                        <td>{t("common.name")}</td>
                        <td>{t("common.town")}</td>
                        <td>{t("common.region")}</td>
                    </tr>
                    {!filterLoading && fitnessLiked.map((item, index) => {
                        return (
                            <tr className="record" key={index}>
                                <td>{item.name}</td>
                                <td>{translateTown(item.region, item.town)}</td>
                                <td>{transalteRegion(item.region)}</td>
                                <td className="actionData">
                                    <CancelButton onClick={handleRecordCancel(item._id, "fitness")} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tbody>
                    <tr>
                        <td colSpan={4}><h2>{t("dashboardPage.userLikesList.favoriteCoachesHeader")}</h2></td>
                    </tr>
                    <tr className="rowHeader">
                        <td>{t("common.name")}</td>
                        <td>{t("common.town")}</td>
                        <td>{t("common.region")}</td>

                    </tr>
                    {!filterLoading && coachLiked.map((item, index) => {
                        return (
                            <tr className="record" key={index}>
                                <td>{item.name}</td>
                                <td>{translateTown(item.region, item.town)}</td>
                                <td>{transalteRegion(item.region)}</td>
                                <td className="actionData">
                                    <CancelButton onClick={handleRecordCancel(item._id, "coach")} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}