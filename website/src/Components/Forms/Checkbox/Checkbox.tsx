import { FC } from "react";

import clsx from "clsx";
import { CheckboxProps } from "./_types";
import { CheckboxSquared, HelperText } from "@lukasbriza/lbui-lib";

export const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        register,
        className,
        defaultValue,
        helperClass,
        helperText = "",
        errorText,
        show = true,
        isError,
        name,
        label
    } = props;
    return (
        <HelperText
            styleClass={{
                root: clsx(["checkboxHelperRoot", className]),
                text: clsx(["checkboxHelper", helperClass])
            }}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            show={show}
            isError={isError}
        >
            <CheckboxSquared
                defaultChecked={defaultValue}
                styleClass={{
                    text: "checkboxLabel",
                    checkBox: "checkboxClass",
                    checker: "checkerClass",
                }}
                label={label}
                {...register(name)} />
        </HelperText>
    )
}