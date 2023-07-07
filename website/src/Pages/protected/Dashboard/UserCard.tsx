import { LoginIcon } from "src/components/SVG/_index"
import { EditableTable, EditableTableData, EditableTableRow, HelperTooltip } from "src/components/_index"
import { UserSectionEditableData } from "../_types"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { FC } from "react"
import { user } from "./dummydata"

export const UserCard: FC = () => {
    const { t } = useTranslation()

    const handleUserSectionChange = (data: UserSectionEditableData) => {
        console.log(data)
        //SERVER USER CHANGE CALL
    }

    const dataProcessingDate = new Date(user.agreement.dataProcessingForPropagation.awarded.$date).toLocaleString()
    const termsDate = new Date(user.agreement.terms.awarded.$date).toLocaleString()

    return (
        <section className={clsx(["userInfoSection", "dashBoardSection", "glassMorphism"])}>
            <EditableTable<UserSectionEditableData> onDataChange={handleUserSectionChange}>
                <tbody>
                    <tr className={"rowHeader"}>
                        <td colSpan={3}>
                            <h1>
                                {t("dashboardPage.userSection.general")}
                            </h1>
                        </td>
                    </tr>
                    <EditableTableRow className={"rowData"}>
                        <td>{t("dashboardPage.userSection.username")}</td>
                        <EditableTableData name="username">{user.username}</EditableTableData>
                    </EditableTableRow>
                    <EditableTableRow className={"rowData"}>
                        <td>{t("dashboardPage.userSection.email")}</td>
                        <EditableTableData name="email">
                            {user.email}
                        </EditableTableData>
                    </EditableTableRow>
                    <tr className={"rowData"}>
                        <td>{t("dashboardPage.userSection.role")}</td>
                        <td>{user.isAdmin ?
                            t("dashboardPage.userSection.roleTypes.admin") :
                            t("dashboardPage.userSection.roleTypes.user")}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className={"rowHeader"}>
                        <td colSpan={3}>
                            <h1>
                                {t("dashboardPage.userSection.agreements")}
                            </h1>
                        </td>
                    </tr>
                    <tr className={"rowData"}>
                        <td>{t("dashboardPage.userSection.agreementsTypes.dataProcessing")}</td>
                        <td>
                            <HelperTooltip tooltipName="dataProcessing" content={dataProcessingDate}>
                                {user.agreement.dataProcessingForPropagation.status ?
                                    t("dashboardPage.userSection.agreementState.granted") :
                                    t("dashboardPage.userSection.agreementState.notGranted")}
                            </HelperTooltip>
                        </td>
                    </tr>
                    <tr className={"rowData"}>
                        <td>{t("dashboardPage.userSection.agreementsTypes.terms")}</td>
                        <td>
                            <HelperTooltip tooltipName="terms" content={termsDate}>
                                {user.agreement.terms.status ?
                                    t("dashboardPage.userSection.agreementState.granted") :
                                    t("dashboardPage.userSection.agreementState.notGranted")}
                            </HelperTooltip>
                        </td>
                    </tr>
                </tbody>
            </EditableTable>
            <LoginIcon viewBox={"0 0 24 24"} width={150} height={150} className="userImage" />
        </section>
    )

}