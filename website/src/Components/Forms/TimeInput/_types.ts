
export type TimeInputProps = {
    name: string;
    label?: string;
    checkboxLabel?: string;
    requiredStar?: boolean;
    errorText?: string;
    helperText?: string;
    isError?: boolean;
    disableCheckbox?: boolean;
    defaultValue?: {
        from?: string | null;
        to?: string | null;
    };
}

export type Option = { value: string | null, key: string }