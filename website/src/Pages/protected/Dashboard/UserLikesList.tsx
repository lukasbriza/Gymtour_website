import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CancelButton, LoadingWrapper, QuestionHeader } from "src/components";
import { useModal } from "src/hooks";
import { UserLikesListProps } from "./_types";

export const UserLikesList: FC<UserLikesListProps> = (props) => {
  const { loading, coachLiked, fitnessLiked, filter } = props
  const { t, i18n } = useTranslation();
  const { showModal } = useModal();

  const transalteRegion = (region: number) => {
    if (filter) {
      const regionObject = filter?.regions.find(
        (item) => Number(item.code) === region
      );
      return (
        (i18n.language === "cs"
          ? regionObject?.name.cz
          : regionObject?.name.eng) ?? ""
      );
    }
    return "";
  };

  const translateTown = (region: number, town: number) => {
    if (filter) {
      const regionObject = filter?.regions.find(
        (item) => Number(item.code) === region
      );
      const townObject = regionObject?.towns.find(
        (item) => Number(item.code) === town
      );
      return (
        (i18n.language === "cs"
          ? townObject?.name.cz
          : regionObject?.name.eng) ?? ""
      );
    }
    return "";
  };

  const handleRecordCancel = (id: string, type: "fitness" | "coach") => () => {
    showModal({
      headerComp: (
        <QuestionHeader
          header={t("dashboardPage.userLikesList.modal.questionHeader")}
        />
      ),
      backButton: true,
      backText: t("common.back"),
      text: t("dashboardPage.userLikesList.modal.questionContent"),
      button: t("common.remove"),
      onClick: () => console.log("clicked"),
      //REMOVE CALL
      //TODO: implement call
    });
  };

  const noFitness = fitnessLiked.length === 0
  const noCoaches = coachLiked.length === 0

  if (noFitness && noCoaches) {
    return null
  }

  return (
    <section
      className={clsx([
        "userLikesList",
        "dashBoardTable",
        "dashBoardSection",
        "glassMorphism",
      ])}
    >
      <table>
        {
          !noFitness &&
          <tbody>
            <tr>
              <td colSpan={4}>
                <h2>{t("dashboardPage.userLikesList.favoriteFitnessHeader")}</h2>
              </td>
            </tr>
            <LoadingWrapper loading={loading} scale={1.5} className="loading">
              <tr className="rowHeader">
                <td>{t("common.name")}</td>
                <td>{t("common.town")}</td>
                <td>{t("common.region")}</td>
              </tr>
              {
                fitnessLiked.map((item, index) => {
                  return (
                    <tr className="record" key={index}>
                      <td>{item.name}</td>
                      <td>{translateTown(item.region, item.town)}</td>
                      <td>{transalteRegion(item.region)}</td>
                      <td className="actionData">
                        <CancelButton
                          onClick={handleRecordCancel(item._id, "fitness")}
                        />
                      </td>
                    </tr>
                  );
                })
              }
            </LoadingWrapper>
          </tbody>
        }
        {
          !noCoaches &&
          <tbody>
            <tr>
              <td colSpan={4}>
                <h2>{t("dashboardPage.userLikesList.favoriteCoachesHeader")}</h2>
              </td>
            </tr>
            <LoadingWrapper loading={loading} scale={1.5} className="loading">
              <tr className="rowHeader">
                <td>{t("common.name")}</td>
                <td>{t("common.town")}</td>
                <td>{t("common.region")}</td>
              </tr>
              {
                coachLiked.map((item, index) => {
                  return (
                    <tr className="record" key={index}>
                      <td>{item.name}</td>
                      <td>{translateTown(item.region, item.town)}</td>
                      <td>{transalteRegion(item.region)}</td>
                      <td className="actionData">
                        <CancelButton
                          onClick={handleRecordCancel(item._id, "coach")}
                        />
                      </td>
                    </tr>
                  );
                })
              }
            </LoadingWrapper>
          </tbody>
        }
      </table>
    </section>
  );
};
