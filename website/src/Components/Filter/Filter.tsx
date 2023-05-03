import { FC, useEffect } from "react";
import { CoachFilter, FilterProps, FitnessFilter, FormType } from "./_types";

import { FormProvider, useForm } from "react-hook-form";
import { FilterComponents } from "./FilterComponents";
import { useCoachFilterContext, useFitnessFilterContext, useServerData, useServerdataLazy } from "@hooks";
import { getCoaches, getFilter, getFitnesses } from "@fetchers";
import { coachFormToApi, fitnessFormToApi } from "./Filter.mapper";
import { FilterActiveBolts } from "./FilterActiveBolts";


export const Filter: FC<FilterProps> = (props) => {
  const { type } = props;
  const { limit: coachLimit, setLoading: setCoachLoading } = useCoachFilterContext()
  const { limit: fitnessLimit, setLoading: setFitnessLoading } = useFitnessFilterContext()
  const { data: rawFilter, loading: filterLoading } = useServerData(getFilter())
  const { fetchCall: getFitnessCall, loading: fitnessLoading, data: fitnessData } = useServerdataLazy(getFitnesses)
  const { fetchCall: getCoachCall, loading: coachLoading, data: coachData } = useServerdataLazy(getCoaches)

  const dataEffectDeps = type === "coach" ? coachData : fitnessData
  const loadingEffectDeps = type === "coach" ? [coachLoading, setCoachLoading] : [fitnessLoading, setFitnessLoading]

  useEffect(() => {
    type === "coach" ? setCoachLoading(coachLoading) : setFitnessLoading(fitnessLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...loadingEffectDeps])

  useEffect(() => {
    // type === "coach" ?
  }, [dataEffectDeps])

  const filterdefaults: FormType = type === "coach" ?
    {
      regions: [],
      specialization: [],
      others: [],
      gender: [],
      searchBar: "",
      order: undefined
    } : {
      general: [],
      regions: [],
      equipment: [],
      others: [],
      searchBar: "",
      order: undefined
    }

  const methods = useForm<FormType, any>({
    defaultValues: {
      ...filterdefaults
    },
  });

  const { handleSubmit } = methods


  const coachSubmit = async (values: FormType) => {
    if (rawFilter) {
      const apiQuery = coachFormToApi(values as unknown as CoachFilter, rawFilter)
      apiQuery.limit = coachLimit
      getCoachCall(apiQuery)
    }

  }

  const fitnessSubmit = async (values: FormType) => {
    if (rawFilter) {
      const apiQuery = fitnessFormToApi(values as unknown as FitnessFilter, rawFilter)
      apiQuery.limit = fitnessLimit
      getFitnessCall(apiQuery)
    }
  }

  return (
    <FormProvider {...methods}>
      <FilterActiveBolts type={type} />
      <form className={`filterWrapper-${type}`} onSubmit={handleSubmit(type === "coach" ? coachSubmit : fitnessSubmit)}>
        <FilterComponents type={type} rawFilter={rawFilter} loading={filterLoading} />
      </form>
    </FormProvider>
  );
};
