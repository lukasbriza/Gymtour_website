import { FC, useEffect, useState } from "react";
import { AvoidedFilterType, FilterProps, FilterVariants } from "./_types";
import { FilterType, getFilter } from "@fetchers";
import { filter } from "@config";
import { FormProvider, useForm } from "react-hook-form";
import {
  Bullet,
  MultipleSelect,
  MultipleRegionSelectControled,
  Loading,
} from "@components";
import { regionMapper, standardMapper } from "./Filter.mapper";

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

const getFilterComponents = async (type: FilterVariants) => {
  const rawFilter = await getFilter();
  const filterCleared = rawFilter?.data
    ? filterAvoided(
        rawFilter?.data,
        type === "coach"
          ? (filter.avoidFilterTypes.coach as unknown as string[])
          : (filter.avoidFilterTypes.fitness as unknown as string[])
      )
    : null;

  const regions = filterCleared?.regions && (
    <div className={"regions"}>
      <MultipleRegionSelectControled
        name="regions"
        label="Regiony"
        options={regionMapper(filterCleared?.regions)}
      />
    </div>
  );

  const general = filterCleared?.general && (
    <div className={"general"}>
      <MultipleSelect
        name="general"
        label="Hlavní"
        options={standardMapper(filterCleared?.general)}
      />
    </div>
  );

  const others = filterCleared?.regions && (
    <div className={"others"}>
      <MultipleSelect
        name="others"
        label="Ostatní"
        options={standardMapper(filterCleared?.others)}
      />
    </div>
  );

  switch (type) {
    case "coach":
      const gender = filterCleared?.gender && (
        <div className={"gender"}>
          {standardMapper(filterCleared?.gender).map((gender) => {
            return (
              <Bullet
                name={gender.code === "1" ? "men" : "women"}
                value={gender.name}
              />
            );
          })}
        </div>
      );

      const specialization = filterCleared?.specialization && (
        <div className={"specialization"}>
          <MultipleSelect
            name="specialization"
            label="Specializace"
            options={standardMapper(filterCleared?.specialization)}
          />
        </div>
      );
      return (
        <>
          {regions}
          {general}
          {specialization}
          {others}
          {gender}
        </>
      );
    case "fitness":
      const equipment = filterCleared?.equipment && (
        <div className="equipment">
          <MultipleSelect
            name="equipment"
            label="Vybavení"
            options={standardMapper(filterCleared?.equipment)}
          />
        </div>
      );
      return (
        <>
          {regions}
          {general}
          {equipment}
          {others}
        </>
      );
  }
};

export const Filter: FC<FilterProps> = (props) => {
  const { type } = props;
  const methods = useForm({
    defaultValues: {
      regions: [],
      equipment: [],
      general: [],
      others: [],
      men: false,
      women: false,
      specialization: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [component, setComponent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setLoading(true);
    getFilterComponents(type).then((value) => {
      setComponent(value);
      setLoading(false);
    });
  }, [type]);

  return (
    <FormProvider {...methods}>
      <div className={"filterWrapper"}>{loading ? <Loading /> : component}</div>
    </FormProvider>
  );
};
