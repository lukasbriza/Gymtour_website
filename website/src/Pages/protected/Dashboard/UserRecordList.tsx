import clsx from "clsx"
import { BaseSyntheticEvent, FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, CancelButton, EditButton, LoadingWrapper, QuestionHeader } from "src/components"
import { useModal, usePopUpContext, useServerdataLazy, useUserContext } from "src/hooks"
import { removeCoaches, removeFitnesses } from "src/fetcher"
import { useNavigate } from "react-router"
import { routes } from "src/config"
import { UserRecordListProps } from "./_types"

export const UserRecordList: FC<UserRecordListProps> = (props) => {
    const { loading, fitnesses, coaches } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { showModal } = useModal()
    const { success, error } = usePopUpContext()
    const { userId } = useUserContext()
    const { fetchCall: removeCoach } = useServerdataLazy(removeCoaches)
    const { fetchCall: removeFitness } = useServerdataLazy(removeFitnesses)

    const handleRecordClick = (id: string, type: "fitness" | "coach") => () => {
        navigate(routes.modify.makeDynamicPath(type, id))
    }

    const handleRecordCancel = (id: string, type: "fitness" | "coach") => () => {
        showModal({
            headerComp: <QuestionHeader header={t("dashboardPage.recordList.modal.questionHeader")} />,
            backButton: true,
            backText: t("common.back"),
            text: t("dashboardPage.recordList.modal.questionContent"),
            button: t("common.remove"),
            onClick: async () => {
                const request = type === "coach" ? removeCoach : removeFitness
                const response = await request({ id: { id: id, owner: userId } })
                if (response?.errorMap.length === 0) {
                    success({
                        header: t("common.sucess"),
                        text: t(type === "coach" ?
                            "dashboardPage.recordList.popup.removeCoach" :
                            "dashboardPage.recordList.popup.removeFitness", { id: id })
                    })
                    return
                }
                error({
                    header: t("common.failure"),
                    text: t(type === "coach" ?
                        "dashboardPage.recordList.popup.removeCoachFailure" :
                        "dashboardPage.recordList.popup.removeFitnessFailure")
                })
            }
        })
    }

    const handleAddButton = (type: "fitness" | "coach") => (e: BaseSyntheticEvent) => {
        e.preventDefault()
        navigate(routes.modify.makeDynamicPath(type))
    }

    const noCoaches = coaches.length === 0
    const noFitnesses = fitnesses.length === 0
    const showAddCoachButton = coaches.length < 1

    if (noCoaches && noFitnesses) {
        return null
    }

    return (
        <>
            {
                !noFitnesses &&
                <section className={clsx(["userRecordList", "dashBoardTable", "dashBoardSection", "glassMorphism"])}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={5}><h2>{t("common.fitness")}</h2></td>
                            </tr>
                            <LoadingWrapper loading={loading} scale={1.5} className="loading">
                                <tr className="rowHeader">
                                    <td>{t("common.name")}</td>
                                    <td>ID</td>
                                    <td className="numberData">{t("common.watched")}</td>
                                    <td className="numberData">{t("common.popularity")}</td>

                                </tr>
                                {
                                    fitnesses.map((item, index) => {
                                        return (
                                            <tr className="record" key={index}>
                                                <td>{item.name}</td>
                                                <td>{item._id}</td>
                                                <td className="numberData">{item.views}</td>
                                                <td className="numberData">{item.popularity?.length}</td>
                                                <td className="actionData">
                                                    <EditButton onClick={handleRecordClick(item._id ?? "", "fitness")} />
                                                    <CancelButton onClick={handleRecordCancel(item._id ?? "", "fitness")} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </LoadingWrapper>
                            <tr>
                                <td colSpan={5} className={"addButtonRow"} align="center">
                                    <Button
                                        modificationClass={"dashBoardTableFitness"}
                                        initialClass={"buttonInitial"}
                                        hoverClass={"buttonHover"}
                                        text={t("common.add")}
                                        onClick={handleAddButton("fitness")}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            }

            {
                !noCoaches &&
                <section className={clsx(["userRecordList", "dashBoardTable", "dashBoardSection", "glassMorphism"])}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan={5}><h2>{t("common.coach")}</h2></td>
                            </tr>
                            <LoadingWrapper loading={loading} scale={1.5} className="loading">
                                <tr className="rowHeader">
                                    <td>{t("common.name")}</td>
                                    <td>ID</td>
                                    <td className="numberData">{t("common.watched")}</td>
                                    <td className="numberData">{t("common.popularity")}</td>
                                </tr>
                                {
                                    coaches.map((item, index) => {
                                        return (
                                            <tr className="record" key={index}>
                                                <td>{item.name}</td>
                                                <td>{item._id}</td>
                                                <td className="numberData">{item.views}</td>
                                                <td className="numberData">{item.popularity?.length}</td>
                                                <td className="actionData">
                                                    <EditButton onClick={handleRecordClick(item._id ?? "", "coach")} />
                                                    <CancelButton onClick={handleRecordCancel(item._id ?? "", "coach")} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </LoadingWrapper>
                            {showAddCoachButton &&
                                <tr>
                                    <td colSpan={5} className={"addButtonRow"} align="center">
                                        <Button
                                            modificationClass={"dashBoardTablecoach"}
                                            initialClass={"buttonInitial"}
                                            hoverClass={"buttonHover"}
                                            text={t("common.add")}
                                            onClick={handleAddButton("coach")}
                                        />
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </section >
            }
        </>
    )
}