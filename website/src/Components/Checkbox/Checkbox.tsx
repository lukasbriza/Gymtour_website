import { FC } from "react";
import { CheckboxSquaredHF, HelperText } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { CheckboxProps } from "./_types";

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