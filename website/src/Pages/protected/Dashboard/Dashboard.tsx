import clsx from "clsx"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ProtectedRoute, Permissions } from "src/app/_index"
import { routes } from "src/config/mainConfiguration"
import { UserCard } from "./UserCard"
import { UserRecordList } from "./UserRecordList"
import { UserLikesList } from "./UserLikesList"

const Dashboard: FC = () => {
    const { t } = useTranslation()

    return (
        <ProtectedRoute expectedPermission={Permissions.AUTHORIZED} redirect={routes.login.path}>
            <section id={"Dashboard"} className={clsx(["relative", "stretch", "dashboard", "page"])}>
                <div className={clsx(["verticalText"])}>
                    {t("coachContentPage.verticalText")}
                </div>
                <UserCard />
                <UserRecordList />
                <UserLikesList />
            </section>
        </ProtectedRoute>
    )
}

export default Dashboard