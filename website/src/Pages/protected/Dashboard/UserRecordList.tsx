import clsx from "clsx"
import { BaseSyntheticEvent, FC } from "react"
import { useTranslation } from "react-i18next"
import { Button, CancelButton, EditButton, QuestionHeader } from "src/components/_index"
import { useModal } from "src/hooks/_index"
import { coaches, fitness } from "./dummydata"

export const UserRecordList: FC = () => {
    const { t } = useTranslation()
    const { showModal, closeModal, isActive } = useModal()

    const handleRecordClick = (id: string, type: "fitness" | "coach") => () => {

    }

    const handleRecordCancel = (id: string, type: "fitness" | "coach") => () => {
        showModal({
            headerComp: <QuestionHeader header={t("dashboardPage.recordList.modal.questionHeader")} />,
            backButton: true,
            backText: t("common.back"),
            text: t("dashboardPage.recordList.modal.questionContent"),
            button: t("common.remove"),
            onClick: () => console.log("clicked") //REMOVE CALL
        })
    }

    const handleAddButton = (type: "fitness" | "coach") => (e: BaseSyntheticEvent) => {

    }



    return (
        <>
            <section className={clsx(["userRecordList", "dashBoardTable", "dashBoardSection", "glassMorphism"])}>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={5}><h2>{t("common.fitness")}</h2></td>
                        </tr>
                        <tr className="rowHeader">
                            <td>{t("common.name")}</td>
                            <td>ID</td>
                            <td className="numberData">{t("common.watched")}</td>
                            <td className="numberData">{t("common.popularity")}</td>

                        </tr>
                        {fitness.map((item, index) => {
                            return (
                                <tr className="record" key={index}>
                                    <td>{item.name}</td>
                                    <td>{item._id.$oid}</td>
                                    <td className="numberData">{item.views}</td>
                                    <td className="numberData">{item.popularity.length}</td>
                                    <td className="actionData">
                                        <EditButton onClick={handleRecordClick(item._id.$oid, "fitness")} />
                                        <CancelButton onClick={handleRecordCancel(item._id.$oid, "fitness")} />
                                    </td>
                                </tr>
                            )
                        })}
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

            <section className={clsx(["userRecordList", "dashBoardTable", "dashBoardSection", "glassMorphism"])}>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan={5}><h2>{t("common.coach")}</h2></td>
                        </tr>
                        <tr className="rowHeader">
                            <td>{t("common.name")}</td>
                            <td>ID</td>
                            <td className="numberData">{t("common.watched")}</td>
                            <td className="numberData">{t("common.popularity")}</td>
                        </tr>
                        {coaches.map((item, index) => {
                            return (
                                <tr className="record" key={index}>
                                    <td>{item.name}</td>
                                    <td>{item._id.$oid}</td>
                                    <td className="numberData">{item.views}</td>
                                    <td className="numberData">{item.popularity.length}</td>
                                    <td className="actionData">
                                        <EditButton onClick={handleRecordClick(item._id.$oid, "coach")} />
                                        <CancelButton onClick={handleRecordCancel(item._id.$oid, "coach")} />
                                    </td>
                                </tr>
                            )
                        })}
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
                    </tbody>
                </table>
            </section >
        </>
    )
}