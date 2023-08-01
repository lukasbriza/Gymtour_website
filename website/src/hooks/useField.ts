import { useFormContext } from "react-hook-form";

export const useField = () => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext();
  const buildField = (name: string) => {
    return {
      register: register,
      isError: errors[name] !== undefined,
      name: name,
      defaultValue: defaultValues && defaultValues[name],
    };
  };
  return { buildField };
};
