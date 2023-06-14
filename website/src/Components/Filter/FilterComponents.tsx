import {
    AvoidedFilterType,
    Bullet,
    Button,
    FilterComponentsProps,
    Loading,
    MultipleRegionSelectControled,
    MultipleSelect,
    OrderTypes,
    SearchBar,
    Select
} from "@components";
import { filter } from "@config";
import { FilterType } from "@fetchers";
import { useTranslation } from "react-i18next";
import { regionMapper, standardMapper } from "./Filter.mapper";
import { FC } from "react";
import { useCoachFilterContext, useFitnessFilterContext } from "@hooks";

const filterAvoided = (
    rawFilter: FilterType,
    avoid: string[]
): AvoidedFilterType => {
    const returnObject = rawFilter;
    for (const key in rawFilter) {
        if (avoid.indexOf(key) !== -1) {
            delete returnObject[key];
        }
    }
    delete returnObject._id;
    return returnObject;
};

export const FilterComponents: FC<FilterComponentsProps> = (props) => {
    const { type, rawFilter, loading } = props
    const { register: fitnessRegister } = useFitnessFilterContext()
    const { register: coachRegister } = useCoachFilterContext()
    const registerFn = type === "coach" ? coachRegister : fitnessRegister
    const { t } = useTranslation()



    const filterCleared = rawFilter && rawFilter?.data
        ? filterAvoided(
            rawFilter.data,
            type === "coach"
                ? (filter.avoidFilterTypes.coach as unknown as string[])
                : (filter.avoidFilterTypes.fitness as unknown as string[])
        )
        : null;

    const regions = filterCleared?.regions && (
        <div className={"regions"}>
            <MultipleRegionSelectControled
                syncWithWatch={true}
                checkboxClick={registerFn}
                name="regions"
                label={t("contentPage:filter.regions")}
                options={regionMapper(filterCleared?.regions)}
            />
        </div>
    );

    const general = filterCleared?.general && (
        <div className={"general"}>
            <MultipleSelect
                syncWithWatch={true}
                checkboxClick={registerFn}
                name="general"
                label={t("contentPage:filter.general")}
                options={standardMapper(filterCleared?.general)}
            />
        </div>
    );

    const others = filterCleared?.regions && (
        <div className={"others"}>
            <MultipleSelect
                syncWithWatch={true}
                checkboxClick={registerFn}
                name="others"
                label={t("contentPage:filter.others")}
                options={standardMapper(filterCleared?.others)}
            />
        </div>
    );
    const gender = filterCleared?.gender && (
        <div className={"gender"}>
            {standardMapper(filterCleared?.gender).map((gender, i) => {
                return (
                    <Bullet
                        key={i}
                        name={gender.code === "1" ? "men" : "women"}
                        value={gender.code === "1" ? t("contentPage:filter.mens") : t("contentPage:filter.womens")}
                    />
                );
            })}
        </div>
    );
    const specialization = filterCleared?.specialization && (
        <div className={"specialization"}>
            <MultipleSelect
                syncWithWatch={true}
                checkboxClick={registerFn}
                name="specialization"
                label={t("contentPage:filter.specialization")}
                options={standardMapper(filterCleared?.specialization)}
            />
        </div>
    );
    const equipment = filterCleared?.equipment && (
        <div className="equipment">
            <MultipleSelect
                syncWithWatch={true}
                checkboxClick={registerFn}
                name="equipment"
                label={t("contentPage:filter.equipment")}
                options={standardMapper(filterCleared?.equipment)}
            />
        </div>
    );
    const order = (
        <div className="order">
            <Select
                name="order"
                label={t("contentPage:filter.order")}
                options={[
                    { name: t("contentPage:filter.orderSelect.popularity"), code: OrderTypes.Popularity },
                    { name: t("contentPage:filter.orderSelect.views"), code: OrderTypes.Views },
                    { name: t("contentPage:filter.orderSelect.name"), code: OrderTypes.Name }
                ]} />
        </div>
    )

    switch (type) {
        case "coach":
            return (
                <>
                    {
                        loading ?
                            <Loading /> :
                            <>
                                {regions}
                                {specialization}
                                {gender}
                                {others}
                                {order}
                                <SearchBar name="searchBar" />
                                <Button className="filterButton" initialClass={"buttonInitial"} hoverClass={"buttonHover"} text={"Filter"} />
                            </>
                    }

                </>
            );
        case "fitness":
            return (
                <>
                    {
                        loading ?
                            <Loading /> :
                            <>
                                {regions}
                                {general}
                                {equipment}
                                {others}
                                {order}
                                <SearchBar name="searchBar" />
                                <Button className="filterButton" initialClass={"buttonInitial"} hoverClass={"buttonHover"} text={"Filter"} />
                            </>
                    }
                </>
            );
    }
};