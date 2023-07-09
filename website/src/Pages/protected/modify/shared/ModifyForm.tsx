import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { mapDefaultCoachValues } from "./mapDefaultValues";
import {
  CoachFormProps,
  FitnessFormProps,
  MappedCoachValues,
  ModifyCoachFormProps,
  ModifyFitnessFormProps,
} from "../../_types";

export const ModifyCoachForm: FC<ModifyCoachFormProps> = (props) => {
  const { children, ...defaultProps } = props;
  const methods = useForm<MappedCoachValues>({
    defaultValues: { ...mapDefaultCoachValues(defaultProps) },
  });
  const { handleSubmit } = methods;

  const submit = (data: CoachFormProps) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}></form>
    </FormProvider>
  );
};

export const ModifyFitnessForm: FC<ModifyFitnessFormProps> = (props) => {
  const { children, ...defaultProps } = props;
  const methods = useForm<FitnessFormProps>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const submit = (data: FitnessFormProps) => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};
