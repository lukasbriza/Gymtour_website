import { FC } from "react";
import { CheckboxSquaredHF, HelperText } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { Control } from "react-hook-form";

type CheckboxProps = {
    className?: string;
    helperClass?: string;
    helperText?: string;
    errorText?: string;
    show?: boolean;
    isError: boolean;
    control: Control<any, any>;
    name: string;
    label: string
}
export const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        className,
        helperClass,
        helperText = "",
        errorText,
        show = true,
        isError,
        control,
        name,
        label
    } = props;
    return (
        <HelperText
            className={clsx(["checkboxHelperRoot", className])}
            helperClass={clsx(["checkboxHelper", helperClass])}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            show={show}
            error={isError}
        >
            <CheckboxSquaredHF
                control={control}
                name={name}
                label={label}
            />
        </HelperText>
    )
}