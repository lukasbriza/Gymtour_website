import { EditableTableProps } from "./_types";
import { FormProvider, useForm } from "react-hook-form";

export const EditableTable = <T extends {},>(props: EditableTableProps<T>) => {
    const { children, onDataChange } = props
    const methods = useForm<T>()

    const { handleSubmit, formState } = methods
    const submit = (data: T) => onDataChange?.(data, formState.dirtyFields)

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submit)}>
                <table>
                    {children}
                </table>
            </form>
        </FormProvider>
    )
}