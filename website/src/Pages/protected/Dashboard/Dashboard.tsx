import clsx from "clsx";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProtectedRoute, Permissions } from "src/app/_index";
import { routes } from "src/config/mainConfiguration";
import { UserCard } from "./UserCard";
import { UserRecordList } from "./UserRecordList";
import { UserLikesList } from "./UserLikesList";
import { useUserContext } from "src/hooks/useUserContext";
import { useServerData, useServerdataLazy } from "src/hooks/useServerData";
import { getCoaches, getFilter, getFitnesses } from "src/fetcher/_index";
import { LikedObject } from "../_types";
import { useEffectOnce } from "@lukasbriza/lbui-lib";

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const { userId, userObject } = useUserContext();
  const { data: filterData, loading: filterLoading } = useServerData(getFilter);
  const { data: coaches, loading: coachesLoading } = useServerData(getCoaches, { owner: "64288f2967746143ec840e34", });
  const { data: fitnesses, loading: fitnessesLoading } = useServerData(getFitnesses, { owner: "64288f2967746143ec840e34" });
  const { fetchCall: getLikedCoaches, data: likedCoaches } =
    useServerdataLazy(getCoaches);
  const { fetchCall: getLikedFitnesses, data: likedFitnessess } =
    useServerdataLazy(getFitnesses);

  const isLoading = coachesLoading || fitnessesLoading || filterLoading;

  useEffectOnce(() => {
    if (userObject?.coachOwned.length && userObject?.coachOwned.length > 0) {
      getLikedCoaches({
        id: userObject?.coachOwned,
        projection: "name region town",
      });
    }
    if (
      userObject?.fitnessOwned.length &&
      userObject?.fitnessOwned.length > 0
    ) {
      getLikedFitnesses({
        id: userObject?.fitnessOwned,
        projection: "name region town",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <ProtectedRoute
      expectedPermission={Permissions.AUTHORIZED}
      redirect={routes.login.path}
    >
      <section
        id={"Dashboard"}
        className={clsx(["relative", "stretch", "dashboard", "page"])}
      >
        <div className={clsx(["verticalText"])}>
          {t("coachContentPage.verticalText")}
        </div>
        <UserCard />
        <UserRecordList
          fitnesses={fitnesses?.data ?? []}
          coaches={coaches?.data ?? []}
          loading={isLoading}
        />
        <UserLikesList
          filter={filterData?.data ?? undefined}
          fitnessLiked={(likedFitnessess?.data as LikedObject[]) ?? []}
          coachLiked={(likedCoaches?.data as LikedObject[]) ?? []}
          loading={isLoading}
        />
      </section>
    </ProtectedRoute>
  );
};

export default Dashboard;
