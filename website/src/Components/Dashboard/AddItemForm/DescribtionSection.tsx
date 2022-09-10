import React, { FC, useEffect, useState } from 'react'
//FUNCTIONS//
import { classListMaker } from '../../../Functions/classListMaker'

type DescribtionSectionProps = { describtionText: string, describtionHeader: string, onChange: (data: { canSubmit: boolean, value: string }) => void }

const DescribtionSection: FC<DescribtionSectionProps> = (props) => {
    //////////////////////////////////////////////////
    //STATE//
    const [describtion, setDescribtion] = useState<{ canSubmit: boolean, value: string }>({ canSubmit: false, value: '' })
    //////////////////////////////////////////////////
    //VARIABLES//
    const describtionSectionWrapperClasses = classListMaker(["describtionWrapper"])
    const describtionTextClasses = classListMaker(["describtionText"])
    const describtionHeaderClasses = classListMaker(["describtionHeader"])
    const describtionTextAreaClasses = classListMaker(["describtionTextArea"])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const handleChange = (e: React.BaseSyntheticEvent) => {
        let canSubmit = true
        //VALIDATION
        if (typeof e.target.value !== "string") {
            canSubmit = false
        }
        setDescribtion({ value: String(e.target.value), canSubmit: canSubmit })
    }

    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        props.onChange(describtion)
    }, [describtion])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div className={describtionSectionWrapperClasses}>
            <div className="headerWrapper">
                <h2 className={describtionHeaderClasses}>{props.describtionHeader}</h2>
            </div>
            <div className={describtionTextClasses}>{props.describtionText}</div>
            <textarea name="Describtion" className={describtionTextAreaClasses} onChange={handleChange}></textarea>
        </div>

    )
}

export { DescribtionSection }