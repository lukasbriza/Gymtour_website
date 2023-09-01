import { BasicTextField, HelperText } from "@lukasbriza/lbui-lib";
import { FC } from "react";
import clsx from "clsx"
import { StringInputProps } from "./_types";

export const StringInput: FC<StringInputProps> = (props) => {
    const {
        register,
        defaultValue,
        errorText,
        isError,
        label,
        name,
        helperClass,
        labelFocusClass,
        labelFilleClass,
        labelClass,
        inputClass,
        className,
        password = false,
        autoComplete = "off",
        helperText = "",
        show = true,
        requiredStar = false
    } = props

    return (
        <HelperText
            styleClass={{
                root: clsx(["stringInputHelperRoot", className]),
                text: clsx(["stringInputHelper", helperClass])
            }}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            isError={isError}
            show={show}
        >
            <>
                <BasicTextField
                    defaultValue={defaultValue}
                    password={password}
                    label={label}
                    styleClass={{
                        label: clsx(["stringInputLabel", labelClass]),
                        fillLabel: labelFilleClass,
                        focusLabel: labelFocusClass,
                        errorLabel: "stringInputLabelError",
                        errorInput: "stringInputError",
                        root: clsx(["stringInputRoot", inputClass]),
                        focusRoot: clsx([!isError && "stringInputRootFocused", isError && "stringFocusRootError"])
                    }}
                    isError={isError}
                    autoComplete={autoComplete}
                    {...register(name)}
                />
                {requiredStar && <div className="requiredStar">*</div>}
            </>
        </HelperText>
    )
}