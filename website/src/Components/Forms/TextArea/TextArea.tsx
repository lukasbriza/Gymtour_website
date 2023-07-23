import { FC, useState } from "react";
import { TextAreaProps } from "./_types";
import clsx from "clsx";
import { HelperText } from "@lukasbriza/lbui-lib";
import { useFormContext } from "react-hook-form";

export const TextArea: FC<TextAreaProps> = (props) => {
    const {
        requiredStar = false,
        name,
        rows = 10,
        cols = 30,
        helperRootClass,
        helperClass,
        className,
        helperText = "",
        label,
        errorText,
        show = true,
        isError,
        resize = false,
        ...otherProps
    } = props
    const [focused, setFocused] = useState<boolean>()

    const { setValue } = useFormContext()
    const handleChange = (e: React.BaseSyntheticEvent) => setValue(name, e.target.value)


    return (
        <HelperText
            className={clsx(["stringInputHelperRoot", helperRootClass])}
            helperClass={clsx(["stringInputHelper", helperClass])}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            error={isError}
            show={show}
        >
            <textarea
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleChange}
                name={name}
                cols={cols}
                rows={rows}
                className={clsx(["textAreaInput", focused && "textAreaInputActive", !resize && "disableResize", className])}
                placeholder={label}
                {...otherProps}
            />
            {requiredStar && <div className="requiredStar">*</div>}
        </HelperText >
    )
}