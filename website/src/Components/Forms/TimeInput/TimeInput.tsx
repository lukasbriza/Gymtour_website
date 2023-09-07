import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { TimeInputProps, Option } from "./_types";
import { useFormContext, useWatch } from "react-hook-form";
import { BasicSelect, CheckboxSquared, HelperText } from "@lukasbriza/lbui-lib";
import { Arrow } from "../Select/Select";
import clsx from "clsx";


const generateHours = () => {
    const options = Array(23).fill({ value: "", key: "" });
    return options.map((_, index) => ({ value: formateOnMinTwoDigits(index + 1), key: `${String(index + 1)}hour` })
    )
}

const generateMinutes = () => {
    const options = Array(60).fill({ value: "", key: "" })
    return options.map((_, index) => ({ value: formateOnMinTwoDigits(index), key: `${String(index)}minute` }))
}

const formateOnMinTwoDigits = (number: number): string => {
    if (String(number).length >= 2) {
        return String(number)
    }
    return `0${number}`
}

const getMinutesHoursOption = (value: string, options: Option[], type: "minutes" | "hours"): Option | undefined => {
    if (value === "") {
        return undefined
    }
    const targetValue = value.split(":")[type === "minutes" ? 1 : 0]
    const option = options.find(({ value }) => value === targetValue)
    return option
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
            transformedValue[0] = null
        }
        if (innerValue[1] === undefined || innerValue[1].value === null) {
            transformedValue[1] = null
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

const transformValue = (maskedValue: string | null, disable?: boolean): ReactNode => {
    return <div className="timeInputValue">{(disable || maskedValue === "") ? "--:--" : maskedValue}</div>
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
    const hourOptions = useMemo(() => generateHours(), [])
    const minutesOptions = useMemo(() => generateMinutes(), [])
    const { register, setValue } = useFormContext()

    const handleDisable = () => {
        const newValue = !disable
        setDisabled(newValue)
        if (!newValue) {
            setValue(nameFrom, "08:00")
            setValue(nameTo, "16:00")
        }
    }

    const selectOptions = (path: "from" | "to") => ({
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
        valueTransform: (value: Option | (Option | undefined)[] | undefined) => {

            if (Array.isArray(value) && value.filter((val) => val === undefined).length === 2) {
                const vlaueToMask = path === "from" ?
                    [getMinutesHoursOption("08:00", hourOptions, "hours"), getMinutesHoursOption("08:00", minutesOptions, "minutes")] :
                    [getMinutesHoursOption("16:00", hourOptions, "hours"), getMinutesHoursOption("16:00", minutesOptions, "minutes")]
                return transformValue(maskValue(vlaueToMask), disable)
            }
            return transformValue(maskValue(value), disable)
        },
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
    })

    useEffect(() => {
        if (defaultValue?.from === undefined && defaultValue?.to === undefined) {
            setDisabled(true)
        }
    }, [defaultValue?.from, defaultValue?.to])

    return (
        <div className={"timeInputWrapper"}>
            <div className={"timeInputLabel"}>
                {label}
                {requiredStar && <div className={clsx(["requiredStar", "timeInputRequiredStar"])}>*</div>}
            </div>
            <HelperText
                position={"bottom"}
                text={helperText}
                errorText={errorText}
                isError={isError}
                show
                styleClass={{
                    text: "timeInputErrorText"
                }}
            >
                <div className={"timeInputInputsWrapper"}>
                    <BasicSelect
                        defaultValue={defaultValue?.from ? optionsFromDefaultValue([hourOptions, minutesOptions], defaultValue.from) : undefined}
                        {...selectOptions("from")}
                        {...register(nameFrom)}

                        options={[hourOptions, minutesOptions]}
                    />
                    <BasicSelect
                        defaultValue={defaultValue?.to ? optionsFromDefaultValue([hourOptions, minutesOptions], defaultValue.to) : undefined}
                        {...selectOptions("to")}
                        {...register(nameTo)}

                        options={[hourOptions, minutesOptions]}
                    />
                </div>
            </HelperText>
            {disableCheckbox &&
                <CheckboxSquared
                    checked={disable}
                    styleClass={{
                        root: "checkBoxRoot",
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
