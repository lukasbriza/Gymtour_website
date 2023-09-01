import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ModifyCoachFormProviderProps,
  ModifyFitnessFormProviderProps,
} from "../../_types";
import { MappedCoachValues, MappedFitnessValues, mapDefaultCoachValues, mapDefaultFitnessValues } from "src/utils/_index";

export const ModifyCoachFormProvider: FC<ModifyCoachFormProviderProps> = (props) => {
  const { children, defaultValues } = props;
  const methods = useForm<MappedCoachValues>({
    defaultValues: { ...mapDefaultCoachValues(defaultValues) },
  });
  const { handleSubmit } = methods;

  const submit = (data: MappedCoachValues) => { console.log(data) };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export const ModifyFitnessFormProvider: FC<ModifyFitnessFormProviderProps> = (props) => {
  const { children, defaultValues } = props;
  const methods = useForm<MappedFitnessValues>({
    defaultValues: { ...mapDefaultFitnessValues(defaultValues) },
  });
  const { handleSubmit } = methods;

  const submit = (data: MappedFitnessValues) => {
    console.log("submit")
    console.log(data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};
