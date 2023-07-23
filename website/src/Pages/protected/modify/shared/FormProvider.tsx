import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mapDefaultCoachValues, mapDefaultFitnessValues } from "./mapDefaultValues";
import {
  MappedCoachValues,
  MappedFitnessValues,
  ModifyCoachFormProviderProps,
  ModifyFitnessFormProviderProps,
} from "../../_types";

export const ModifyCoachFormProvider: FC<ModifyCoachFormProviderProps> = (props) => {
  const { children, ...defaultProps } = props;
  const methods = useForm<MappedCoachValues>({
    defaultValues: { ...mapDefaultCoachValues(defaultProps) },
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
  const { children, ...defaultProps } = props;
  const methods = useForm<MappedFitnessValues>({
    defaultValues: { ...mapDefaultFitnessValues(defaultProps) },
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
