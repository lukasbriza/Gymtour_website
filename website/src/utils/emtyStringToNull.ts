export const emptyStringToNull = (value?: string) => {
    return (value === "" || value === undefined) ? null : value
}