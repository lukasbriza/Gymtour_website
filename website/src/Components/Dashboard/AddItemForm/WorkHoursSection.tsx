/* eslint-disable no-loop-func */
import React, { useEffect, useState, FC, CSSProperties, useCallback } from 'react'
//FUNCTIONS//
import { classListMaker } from '../../../utils/classListMaker'
//TEXTS//
import { text } from '../../../config/textSource'


type days = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type daysType = {
    [key in days]: { from: number; to: number; canSubmit: boolean; code: string; };
}
type WorkHoursSectionProps = {
    setDays: React.Dispatch<React.SetStateAction<any>>
}

const week: any = {
    mon: { name: { cz: "Pondělí", eng: "" }, code: "1" },
    tue: { name: { cz: "Útery", eng: "" }, code: "2" },
    wed: { name: { cz: "Středa", eng: "" }, code: "3" },
    thu: { name: { cz: "Čtvrtek", eng: "" }, code: "4" },
    fri: { name: { cz: "Pátek", eng: "" }, code: "5" },
    sat: { name: { cz: "Sobota", eng: "" }, code: "6" },
    sun: { name: { cz: "Neděle", eng: "" }, code: "7" }
}


const errorStyle = {
    borderColor: "red",
    borderWidth: "3px"
}
const sucessStyle = {
    borderColor: "rgb(0, 180, 0)",
    borderWidth: "3px"
}
const WorkHoursSection: FC<WorkHoursSectionProps> = (props) => {
    //VARIABLES//
    const workHoursSectionclasses = classListMaker(["workHoursSection"])
    //SETUP//
    let workDays: JSX.Element[] = []
    for (const key in week) {
        workDays.push(
            <div className="dayWrapper" key={week[key].code}>
                <p className="day">{week[key].name.cz}</p>
                <FromToInput onChange={(data) => {
                    switch (key) {
                        case 'mon':
                            props.setDays((days: daysType) => { return { ...days, mon: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "1" } } })
                            break
                        case 'tue':
                            props.setDays((days: daysType) => { return { ...days, tue: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "2" } } })
                            break
                        case 'wed':
                            props.setDays((days: daysType) => { return { ...days, wed: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "3" } } })
                            break
                        case 'thu':
                            props.setDays((days: daysType) => { return { ...days, thu: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "4" } } })
                            break
                        case 'fri':
                            props.setDays((days: daysType) => { return { ...days, fri: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "5" } } })
                            break
                        case 'sat':
                            props.setDays((days: daysType) => { return { ...days, sat: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "6" } } })
                            break
                        case 'sun':
                            props.setDays((days: daysType) => { return { ...days, sun: { from: data.from, to: data.to, canSubmit: data.canSubmit, code: "7" } } })
                            break
                    }
                }} />
            </div>
        )
    }
    return (
        <section className={workHoursSectionclasses}>
            <div className="headerWrapper">
                <h2>{text.dahboard.AddItem.FitnessForm.WorkHoursSection.header.cz}</h2>
            </div>
            <section className="daysWrapper">
                {workDays}
            </section>
        </section>
    )
}

type FromToInputProps = {
    onChange: (data: { from: number, to: number, canSubmit: boolean }) => void

}
const FromToInput: FC<FromToInputProps> = (props) => {
    const [from, setFrom] = useState<number>(0)
    const [to, setTo] = useState<number>(0)
    const [fromStyle, setFromStyle] = useState<CSSProperties | undefined>(undefined)
    const [toStyle, setToStyle] = useState<CSSProperties | undefined>(undefined)
    const [fromSucess, setFromSucess] = useState<boolean>(false)
    const [toSucess, setToSucess] = useState<boolean>(false)

    const styleResolver = () => {
        if (from > to) {
            setFromSucess(false)
            setFromStyle(errorStyle)
        }
        if (to < from) {
            setToSucess(false)
            setToStyle(errorStyle)
        }
        if (from < to) {
            setFromSucess(true)
            setFromStyle(sucessStyle)
        }
        if (to > from) {
            setToSucess(true)
            setToStyle(sucessStyle)
        }
        if (to === from && to !== 0 && from !== 0) {
            setToSucess(false)
            setToStyle(errorStyle)
            setFromSucess(false)
            setFromStyle(errorStyle)
        }
    }

    const fromVerification = (number: number) => {
        if (number === 0) {
            setFromStyle(undefined);
        }
        if (number < 0) {
            return
        }
        setFrom(number)
        styleResolver()
    }
    const toVerification = (number: number) => {
        if (number === 0) { setToStyle(undefined); }
        if (number < 0) {
            return
        }
        setTo(number)
        styleResolver()
    }

    const onChangeTrigger = useCallback(() => {
        let canSubmit = undefined
        if (fromSucess === false || toSucess === false) {
            canSubmit = false
        } else {
            canSubmit = true
        }
        props.onChange({ from: from, to: to, canSubmit: canSubmit })
    }, [from, fromSucess, props, to, toSucess])


    //SET STYLE LOGIC

    useEffect(() => {
        onChangeTrigger()
    }, [from, to])

    return (
        <>
            <div className="inputWrapper fromInput">
                <p className="from">{text.dahboard.AddItem.FitnessForm.WorkHoursSection.from.cz}</p>
                <input
                    style={fromStyle}
                    type="number"
                    value={from}
                    onChange={(e: React.BaseSyntheticEvent) => fromVerification(e.target.value)}
                />
            </div>
            <div className="inputWrapper toInput">
                <p className="from">{text.dahboard.AddItem.FitnessForm.WorkHoursSection.to.cz}</p>
                <input
                    style={toStyle}
                    type="number"
                    value={to}
                    onChange={(e: React.BaseSyntheticEvent) => toVerification(e.target.value)}
                />
            </div>
        </>
    )
}

export { WorkHoursSection }