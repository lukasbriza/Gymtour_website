import { FC, useEffect, useRef } from "react";
import { CoachFilter, FilterProps, FitnessFilter, FormType } from "./_types";

import { FormProvider, useForm } from "react-hook-form";
import { FilterComponents } from "./FilterComponents";
import { useCoachFilterContext, useFitnessFilterContext, useServerData, useServerdataLazy } from "@hooks";
import { GetFilterResponse, getCoaches, getFilter, getFitnesses } from "@fetchers";
import { coachFormToApi, fitnessFormToApi } from "./Filter.mapper";
import { FilterActiveBolts } from "./FilterActiveBolts";


export const Filter: FC<FilterProps> = (props) => {
  const { type } = props;
  const filterRef = useRef<GetFilterResponse | undefined>(undefined)
  const { limit: coachLimit, setLoading: setCoachLoading, setContent: setCoaches } = useCoachFilterContext()
  const { limit: fitnessLimit, setLoading: setFitnessLoading, setContent: setFitnesses } = useFitnessFilterContext()
  const { data: rawFilter, loading: filterLoading } = useServerData(getFilter())
  const { fetchCall: getFitnessCall, loading: fitnessFetchLoading } = useServerdataLazy(getFitnesses)
  const { fetchCall: getCoachCall, loading: coachFetchLoading } = useServerdataLazy(getCoaches)


  const loadingEffectDeps = type === "coach" ? [coachFetchLoading, setCoachLoading] : [fitnessFetchLoading, setFitnessLoading]

  useEffect(() => {
    type === "coach" ? setCoachLoading(coachFetchLoading) : setFitnessLoading(fitnessFetchLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...loadingEffectDeps])

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
      const result = await getCoachCall(apiQuery)

      if (result?.data) {
        setCoaches(result.data)
      }
    }
  }

  const fitnessSubmit = async (values: FormType) => {
    if (rawFilter) {
      const apiQuery = fitnessFormToApi(values as unknown as FitnessFilter, rawFilter)
      apiQuery.limit = fitnessLimit
      const result = await getFitnessCall(apiQuery)

      if (result?.data) {
        setFitnesses(result.data)
      }
    }
  }




  useEffect(() => {
    if (rawFilter && !filterRef.current) {
      handleSubmit(type === "coach" ? coachSubmit : fitnessSubmit)()
    }

    return () => {
      filterRef.current = undefined
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawFilter])

  return (
    <FormProvider {...methods}>
      <FilterActiveBolts type={type} />
      <form className={`filterWrapper-${type}`} onSubmit={handleSubmit(type === "coach" ? coachSubmit : fitnessSubmit)}>
        <FilterComponents type={type} rawFilter={rawFilter} loading={filterLoading} />
      </form>
    </FormProvider>
  );
};
