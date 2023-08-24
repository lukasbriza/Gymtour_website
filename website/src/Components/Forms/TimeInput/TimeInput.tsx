import { BasicInput, } from "@lukasbriza/lbui-lib";
import { FC, useEffect, useState } from "react";
import { TimeInputProps } from "./_types";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

export const TimeInput: FC<TimeInputProps> = (props) => {
    const { label, name } = props

    const nameFrom = `${name}.from`
    const nameTo = `${name}.to`

    const { watch, register } = useFormContext()
    const maskRegister = useHookFormMask(register)
    const { name: maskname, onBlur, onChange, ref } = maskRegister("x", ["99"])

    const val = watch()

    useEffect(() => {
        console.log(val)
    }, [val])

    return (
        <div className={clsx([])}>
            <BasicInput name={maskname} onBlur={onBlur} onChange={onChange} ref={ref} />
        </div>
    )
}