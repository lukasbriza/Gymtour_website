import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ControlledSelectProps } from "./_types";
import { MultipleRegionSelect } from "src/components/_index";

export const MultipleRegionSelectControled: FC<ControlledSelectProps> = (
  props
) => {
  const { name, ...otherProps } = props;
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={() => {
        return <MultipleRegionSelect name={name} {...otherProps} />;
      }}
    />
  );
};
