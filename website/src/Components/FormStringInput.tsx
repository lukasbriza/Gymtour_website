import React, { useEffect, useState, useRef } from 'react';

const FormStringInput = ({ formId, type, errorMessage, errorStyle, sucessStyle, pattern, onChange, ...props }: formStringInputProps) => {
    //////////////////////////////////////////////////
    //STATE//
    const [style, setStyle] = useState(undefined)
    const [correctValue, setCorrectValue] = useState<boolean>(true)
    const [showError, setShowError] = useState<boolean>(false)
    const [errorOpacity, setErrorOpacity] = useState<number>(0)

    //////////////////////////////////////////////////
    //VARIBLES//
    const inputRef = useRef<HTMLInputElement>(null)
    const globalRegExp = new RegExp(pattern, 'gi',);
    const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/gi
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const verification = (e: React.BaseSyntheticEvent) => {
        let value = e.target.value
        let result = globalRegExp.test(value)
        let emailResult = emailRegexp.test(value)

        if (props.minLength !== undefined && value.length < props.minLength && value.length > 0) {
            setCorrectValue(false)
            setShowError(true)
            return
        } else if (props.minLength !== undefined && value.length === 0) {
            setShowError(false)
            setStyle(undefined)
        }

        //email type?
        if (type === "email" && emailResult === true) {
            setShowError(false)
            setCorrectValue(true)
            onChange!({ canSubmit: true, value: value, name: props.name })
            return
        } else if (type === "email" && emailResult === false) {
            if (value.length === 0) {
                setShowError(false)
                return
            }
            setShowError(true)
            setCorrectValue(false)
            onChange!({ canSubmit: false, value: value, name: props.name })
            return
        }

        //has pattern setup?
        if (pattern !== undefined) {
            if (result === false) {
                setShowError(false)
                setCorrectValue(true)
                onChange!({ canSubmit: true, value: value, name: props.name })
                return
            } else {
                setShowError(true)
                setCorrectValue(false)
                onChange!({ canSubmit: false, value: value, name: props.name })
                return
            }
        } else {
            onChange!({ canSubmit: true, value: value, name: props.name })
            setCorrectValue(true)
            setShowError(false)
            return
        }
    }

    useEffect(() => {
        if (correctValue === true && inputRef.current!.value.length > 0) {
            setStyle(sucessStyle)
            setShowError(false)
        } else if (correctValue === true && inputRef.current!.value.length === 0) {
            setStyle(undefined)
        }
        if (correctValue === false && inputRef.current!.value.length > 0) {
            setStyle(errorStyle)
            setShowError(true)
        } else if (correctValue === false && inputRef.current!.value.length === 0) {
            setStyle(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctValue])
    useEffect(() => {
        if (showError === true) {
            setErrorOpacity(1)
        }
        if (showError === false) {
            setErrorOpacity(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showError])
    //////////////////////////////////////////////////
    return (
        <div className="inputWrapper">
            <input
                ref={inputRef}
                type={type}
                autoComplete="on"
                form={formId}
                onChange={verification}
                style={style}
                {...props}
            />
            <p className="errorMessage" style={{ opacity: errorOpacity }}>{errorMessage}</p>
        </div>
    )
}

export { FormStringInput }