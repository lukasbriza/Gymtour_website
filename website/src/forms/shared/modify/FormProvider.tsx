import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { MappedCoachValues, MappedFitnessValues } from "src/utils";
import { modifyCoachFormValidationSchema, modifyFitnessFormValidationSchema } from "src/validations";
import { useTranslation } from "react-i18next";
import { ModifyCoachFormProviderProps, ModifyFitnessFormProviderProps } from "src/forms";
import { useServerdataLazy } from "src/hooks";
import { Fitness, addFitness, postImage, updateFitness } from "src/fetcher";
import { coachMapper, fitnessMapper } from "src/mappers";

export const ModifyCoachFormProvider: FC<ModifyCoachFormProviderProps> = (props) => {
  const { children, defaultValues } = props;
  const { t } = useTranslation()

  const methods = useForm<MappedCoachValues>({
    defaultValues: { ...coachMapper.apiToForm(defaultValues) },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: modifyCoachFormValidationSchema(t)
  });
  const { handleSubmit, watch } = methods;
  const val = watch()
  console.log({ val })


  const submit = (data: MappedCoachValues) => {
    console.log(data)

  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export const ModifyFitnessFormProvider: FC<ModifyFitnessFormProviderProps> = (props) => {
  const { children, defaultValues, newRecord } = props;

  const { fetchCall: addFitnessCall, loading: addFitnessLoading } = useServerdataLazy(addFitness)
  const { fetchCall: updateFitnessCall, loading: updateFitnessLoading } = useServerdataLazy(updateFitness)
  const { } = useServerdataLazy(postImage)
  const { t } = useTranslation()

  const methods = useForm<MappedFitnessValues>({
    defaultValues: { ...fitnessMapper.apiToForm(defaultValues) },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: modifyFitnessFormValidationSchema(t)
  });
  const { handleSubmit, watch } = methods;

  const val = watch()
  console.log({ val })

  const submit = (data: MappedFitnessValues) => {
    const card = ""
    const main = ""
    const others = ""


    console.log("submit")
    console.log(data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};
