import { FC, ReactNode, useEffect, useState } from "react";
import { TimeInputProps, Option } from "./_types";
import { useFormContext } from "react-hook-form";
import { BasicSelect, CheckboxSquared, HelperText } from "@lukasbriza/lbui-lib";
import { Arrow } from "../Select/Select";
import clsx from "clsx";


const generateHours = () => {
    const options = Array(23).fill({ value: "", key: "" });
    return options.map((_, index) => ({ value: formateOnMinTwoDigits(index + 1), key: `${String(index + 1)}hour` })
    )
}

const getMinutes = () => {
    const options = Array(60).fill({ value: "", key: "" })
    return options.map((_, index) => ({ value: formateOnMinTwoDigits(index), key: `${String(index)}minute` }))
}

const formateOnMinTwoDigits = (number: number): string => {
    if (String(number).length >= 2) {
        return String(number)
    }
    return `0${number}`
}

const maskValue = (value: Option | (Option | undefined)[] | undefined) => {
    if (value && Array.isArray(value)) {
        const innerValue: (Option | undefined)[] = value
        const transformedValue: (string | null)[] = Array(2).fill(null)

        if (innerValue[0]?.value !== null) {
            transformedValue[0] = innerValue[0]?.value ?? ""
        }
        if (innerValue[1]?.value !== null) {
            transformedValue[1] = innerValue[1]?.value ?? ""
        }

        if (innerValue[0] === undefined || innerValue[0].value === null) {
            transformedValue[0] = null//"01"
        }
        if (innerValue[1] === undefined || innerValue[1].value === null) {
            transformedValue[1] = null//"00"
        }
        if (innerValue[0]?.value?.length === 1) {
            transformedValue[0] = `0${innerValue[0].value}`
        }
        if (innerValue[1]?.value?.length === 1) {
            transformedValue[1] = `0${innerValue[1].value}`
        }

        if (transformedValue.filter((val) => val === null).length === 2) {
            return ""
        }
        return transformedValue.join(":")
    }
    return ""
}

const transformValue = (maskeDvalue: string | null, disable?: boolean): ReactNode => {
    return <div className="timeInputValue">{(disable || maskeDvalue === "") ? "--:--" : maskeDvalue}</div>
}

const optionsFromDefaultValue = (options: Option[][], defaultValue: string | null | undefined) => {
    if (!defaultValue) {
        return [undefined, undefined]
    }

    const value = defaultValue.split(":")

    const hoursOption = options[0].filter((option) => String(option.value) === value[0])
    const minutesOption = options[1].filter((option) => String(option.value) === value[1])
    hoursOption[0].key = hoursOption[0].key + "-0"
    minutesOption[0].key = minutesOption[0].key + "-1"
    return [hoursOption[0], minutesOption[0]]
}

export const TimeInput: FC<TimeInputProps> = (props) => {
    const {
        name,
        label,
        helperText = "",
        errorText,
        isError,
        requiredStar,
        disableCheckbox = true,
        checkboxLabel,
        defaultValue
    } = props
    const [disable, setDisabled] = useState<boolean>(false)

    const nameFrom = `${name}.from`
    const nameTo = `${name}.to`
    const hourOptions = generateHours()
    const minutesOptions = getMinutes()
    const { register, setValue } = useFormContext()

    const handleDisable = () => {
        const newValue = !disable
        setDisabled(newValue)
        if (newValue) {
            setValue(nameFrom, "")
            setValue(nameTo, "")
        }
    }

    const selectOptions = {
        icon: () => {
            return (
                <div className="timeInputIcon">
                    <div className={"selectLine"}></div>
                    <Arrow className={"timeInputArrow"} />
                </div>
            )
        },
        option: {
            onChangeValueTransform: maskValue,
            closeOnSelect: false,
            clearable: false
        },
        valueTransform: (value: Option | (Option | undefined)[] | undefined) => transformValue(maskValue(value), disable),
        styleClass: {
            root: clsx(["timeInputRoot", disable && "timeInputRootDisabled"]),
            focusRoot: "arrowActiveState",
            select: "timeInputSelect",
            focusSelect: "timeInputActive",
            option: "timeInputOption",
            focusOptions: "timeInputOptionsFocused",
            options: "timeInputOptions",
            icon: "icon"
        },
        disable: disable
    }

    useEffect(() => {
        if (defaultValue?.from === null && defaultValue?.to === null) {
            setDisabled(true)
        }
    }, [defaultValue?.from, defaultValue?.to])

    return (
        <div className={"timeInputWrapper"}>
            <div className={"timeInputLabel"}>
                {label}
                {requiredStar && <div className={clsx("requiredStar", "timeInputRequiredStar")}>*</div>}
            </div>
            <HelperText
                position={"bottom"}
                text={helperText}
                errorText={errorText}
                isError={isError}
                show={true}
            >
                <div className={"timeInputInputsWrapper"}>
                    <BasicSelect
                        defaultValue={defaultValue?.from ? optionsFromDefaultValue([hourOptions, minutesOptions], defaultValue.from) : undefined}
                        {...selectOptions}
                        {...register(nameFrom)}
                        options={[hourOptions, minutesOptions]}
                    />
                    <BasicSelect
                        defaultValue={defaultValue?.to ? optionsFromDefaultValue([hourOptions, minutesOptions], defaultValue.to) : undefined}
                        {...selectOptions}
                        {...register(nameTo)}
                        options={[hourOptions, minutesOptions]}
                    />
                </div>
            </HelperText>
            {disableCheckbox &&
                <CheckboxSquared
                    checked={disable}
                    styleClass={{
                        text: "checkboxLabel",
                        checkBox: "checkboxClass",
                        checker: "checkerClass",
                    }}
                    onClick={handleDisable}
                    label={checkboxLabel ?? ""}
                    name={`${name}-disable`}
                />
            }
        </div>
    )
}
