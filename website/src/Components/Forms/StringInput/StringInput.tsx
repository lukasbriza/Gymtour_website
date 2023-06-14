import { BasicTextFieldHF, HelperText } from "@lukasbriza/lbui-lib";
import { FC, useState } from "react";
import clsx from "clsx"
import { StringInputProps } from "./_types";

export const StringInput: FC<StringInputProps> = (props) => {
    const {
        errorText,
        isError,
        label,
        name,
        helperClass,
        labelFocusClass,
        labelFilleClass,
        labelClass,
        inputClass,
        control,
        className,
        password = false,
        autoComplete = "off",
        helperText = "",
        show = true
    } = props
    const [focused, setFocused] = useState<boolean>(false)

    const focusOut = () => setFocused(false)
    const focusIn = () => setFocused(true)
    return (
        <HelperText
            className={clsx(["stringInputHelperRoot", className])}
            helperClass={clsx(["stringInputHelper", helperClass])}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            error={isError}
            show={show}
        >
            <BasicTextFieldHF
                password={password}
                label={label}
                name={name}
                control={control}
                errorLabelClass={"stringInputLabelError"}
                error={isError}
                errorInputClass={"stringInputError"}
                autoComplete={autoComplete}
                focusIn={focusIn}
                focusOut={focusOut}
                rootClass={clsx([
                    "stringInputRoot",
                    inputClass,
                    focused && !isError && "stringInputRootFocused",
                    isError && focused && "stringFocusRootError"
                ])}
                labelClass={clsx(["stringInputLabel", labelClass])}
                labelFocusClass={clsx([labelFocusClass])}
                labelFilledClass={clsx([labelFilleClass])}
            />
        </HelperText>
    )
}