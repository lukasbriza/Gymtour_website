import { FC, useCallback, useEffect, useRef, useState } from "react";
import { ArrowProps, SelectProps, SelectTypes, SelectWithHelperProps } from "./_types";
import { HelperText, useClickOutside } from "@lukasbriza/lbui-lib";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectShowAnimation } from "../../../animations/_index"



export const Select: FC<SelectProps> = (props) => {
    const { label, options, name, selectClick, disabled = false, disabledClass, defaultValue, ...otherProps } = props;
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState<string | undefined>(defaultValue?.name ?? undefined)
    const { outside } = useClickOutside(ref);
    const { t } = useTranslation()
    const methods = useFormContext();

    const clearTranslation = t("contentPage.filter.orderSelect.clear")

    const handleMouseLeave = () => !disabled && !open && setHovered(false);
    const handleMouseEnter = () => !disabled && !open && setHovered(true);
    const handleClick = () => {
        !disabled && setOpen(!open);
    };

    const handleSelect = useCallback((nameValue: string, code: string) => () => {
        setOpen(false)
        if (code === SelectTypes.Clear) {
            selectClick?.(false, `${code}-${name}`, nameValue, name)
            methods.setValue(name, undefined)
            setSelected(undefined)
            return
        }

        if (nameValue !== selected) {
            selectClick?.(true, `${code}-${name}`, nameValue, name)
        }
        methods.setValue(name, code)
        setSelected(nameValue)

    }, [methods, name, selectClick, selected])

    useEffect(() => {
        open && setHovered(true);
        ref.current && open && selectShowAnimation(ref.current);
    }, [open]);

    useEffect(() => {
        outside && setOpen(false);
        outside && setHovered(false);
    }, [outside]);

    useEffect(() => {
        defaultValue && handleSelect(defaultValue?.name, defaultValue?.code)
    }, [defaultValue, handleSelect])


    return (
        <div
            {...otherProps}
            className={clsx(["selectAllWrapper", disabled && disabledClass])}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={clsx([
                    "selectWrapper",
                    open && "selectCornerSharp",
                    hovered && "selectWrapperHovered",
                ])}
                onClick={handleClick}
            >
                <div className={"selectLabel"}>
                    <p>{selected ? selected : label}</p>
                    <div className={"selectLine"}></div>
                    <Arrow className={clsx([hovered && "arrowWrapperHover"])} />
                </div>
            </div>
            <div className={clsx(["optionsWrapper", open && "show"])}>
                {
                    options.map((option, i) => {
                        if (selected !== option.name) {
                            return (
                                <div className={clsx(["optionWrapper", "selectOption"])} key={i + "t"} onClick={handleSelect(option.name, option.code)}>
                                    {option.name}
                                </div>
                            )
                        }
                        return <></>
                    })
                }
                {
                    selected && (<div className={clsx(["optionWrapper", "selectOption"])} key={Math.random()} onClick={handleSelect(clearTranslation, SelectTypes.Clear)}>
                        {clearTranslation}
                    </div>)
                }
            </div>

        </div>);
}

const Arrow: FC<ArrowProps> = (props) => {
    const { className } = props;
    return (
        <div className={clsx(["arrowWrapper", className])}>
            <div className={"line1"}></div>
            <div className={"line2"}></div>
        </div>
    );
};

export const SelectWithHelper: FC<SelectWithHelperProps> = (props) => {
    const { requiredStar = false, helperText = "", isError, errorText, className, helperClass, ...otherProps } = props
    return (
        <HelperText
            className={clsx(["stringInputHelperRoot", className])}
            helperClass={clsx(["stringInputHelper", helperClass])}
            position={"bottom"}
            text={helperText}
            errorText={errorText}
            error={isError}
            show={true}
        >
            <Select {...otherProps} />
            {requiredStar && <div className="requiredStar">*</div>}
        </HelperText>
    )
}