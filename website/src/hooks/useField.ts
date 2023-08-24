import { useFormContext } from "react-hook-form";

export const useField = () => {
  const {
    register,
    formState: { errors, defaultValues },
  } = useFormContext();
  const buildField = (name: string, customDefaults?: any) => {
    return {
      register: register,
      isError: errors[name] !== undefined,
      name: name,
      defaultValue: customDefaults ? customDefaults : defaultValues && defaultValues[name],
    };
  };
  return { buildField };
};
