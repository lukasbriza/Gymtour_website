import { FC } from "react";

import clsx from "clsx";
import { CheckboxProps } from "./_types";
import { CheckboxSquared, HelperText } from "@lukasbriza/lbui-lib";

export const Checkbox: FC<CheckboxProps> = (props) => {
    const {
        register,
        className,
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
            className={clsx(["checkboxHelperRoot", className])}
            helperClass={clsx(["checkboxHelper", helperClass])}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            show={show}
            error={isError}
        >
            <CheckboxSquared
                labelClass={"checkboxLabel"}
                checkboxClass={"checkboxClass"}
                checkerClass={clsx(["checkerClass"])}
                label={label}
                {...register(name)}
            />
        </HelperText>
    )
}