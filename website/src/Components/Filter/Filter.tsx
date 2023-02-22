import { FC, useEffect, useState } from "react";
import { AvoidedFilterType, FilterProps, FilterVariants, FormType } from "./_types";
import { FilterType, GetFilterResponse, getFilter } from "@fetchers";
import { filter } from "@config";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  Bullet,
  MultipleSelect,
  MultipleRegionSelectControled,
  Loading,
  SearchBar,
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

const GetFilterComponents: FC<{ type: FilterVariants }> = (props) => {
  const { type } = props
  const [rawFilter, setFilterData] = useState<GetFilterResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    getFilter().then(value => { setFilterData(value); setLoading(false) })
  }, [])

  const filterCleared = rawFilter && rawFilter?.data
    ? filterAvoided(
      rawFilter.data[0],
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
  const equipment = filterCleared?.equipment && (
    <div className="equipment">
      <MultipleSelect
        name="equipment"
        label="Vybavení"
        options={standardMapper(filterCleared?.equipment)}
      />
    </div>
  );

  switch (type) {
    case "coach":
      return (
        <>
          {loading ?
            <Loading /> :
            <>
              {regions}
              {general}
              {specialization}
              {others}
              {gender}
              <SearchBar name="searchBar" />
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
                <SearchBar name="searchBar" />
              </>
          }
        </>
      );
  }
};

export const Filter: FC<FilterProps> = (props) => {
  const { type } = props;

  const filterdefaults = type === "coach" ?
    {
      general: [],
      regions: [],
      specialization: [],
      others: [],
      man: false,
      woman: false,
      searchBar: ""
    } : {
      general: [],
      regions: [],
      equipment: [],
      others: [],
      searchBar: ""
    }

  const methods = useForm<FormType, any>({
    defaultValues: {
      ...filterdefaults
    },
    reValidateMode: "onChange"
  });



  const handleChange = () => {
    const values = methods.getValues()
    console.log(values)
  }

  return (
    <FormProvider {...methods}>
      <form className={`filterWrapper-${type}`} onChange={handleChange}><GetFilterComponents type={type} /></form>
    </FormProvider>
  );
};
