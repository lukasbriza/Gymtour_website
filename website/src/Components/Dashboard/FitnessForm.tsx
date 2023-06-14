import { useEffect, useState, useContext, useRef } from 'react'
import { ErrorModal } from '../ErrorModal'

import { FormStringInput } from '../FormStringInput'
import { PriceLevelSection } from './AddItemForm/PriceLevelSection'
import { RegionSection } from './AddItemForm/RegionSection'
import { ContactSection } from './AddItemForm/ContactSection'
import { ServiceSection } from './AddItemForm/ServiceSection'
import { WorkHoursSection } from './AddItemForm/WorkHoursSection'
import { DescribtionSection } from './AddItemForm/DescribtionSection'
//CONFIG//
import { text } from '../../config/textSource'
//FUNCTIONS//
import { classListMaker } from '../../utils/classListMaker'

type canSubmitType = { canSubmit: boolean, value: string, name: string }
const errorStyle = {
    borderColor: "red",
    borderWidth: "3px"
}
const sucessStyle = {
    borderColor: "rgb(0, 180, 0)",
    borderWidth: "3px"
}
const formId = 'addFitnessForm'

const FitnessForm = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [name, setName] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'fitnessNameInput' })
    const [ICO, setICO] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'icoInput' })
    const [priceLevel, setPriceLevel] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'priceLevelInput' })
    const [region, setRegion] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'regionInput' })
    const [town, setTown] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'townInput' })
    const [street, setStreet] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'streetInput' })
    const [houseNumber, setHouseNumber] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'houseNumberInput' })
    const [days, setDays] = useState<any>({
        mon: { from: 0, to: 0, canSubmit: false, code: "1" },
        tue: { from: 0, to: 0, canSubmit: false, code: "2" },
        wed: { from: 0, to: 0, canSubmit: false, code: "3" },
        thu: { from: 0, to: 0, canSubmit: false, code: "4" },
        fri: { from: 0, to: 0, canSubmit: false, code: "5" },
        sat: { from: 0, to: 0, canSubmit: false, code: "6" },
        sun: { from: 0, to: 0, canSubmit: false, code: "7" }
    })
    //////////////////////////////////////////////////
    //VARIABLES//
    const addFitnessFormClasses = classListMaker(["addFitnessForm"])
    const generalSectionClasses = classListMaker(["generalSection"])

    const fitnessNameProps = {
        className: '',
        type: 'text',
        name: 'fitnessNameInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.GeneralSection.placeholder1.cz,
        onChange: (canSubmit: canSubmitType) => { setName(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
    }
    const icoProps = {
        className: '',
        type: 'text',
        name: 'icoInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.GeneralSection.placeholder2.cz,
        onChange: (canSubmit: canSubmitType) => { setICO(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 8,
        required: true,
        pattern: '^[0-9]'
    }
    const streetProps = {
        className: '',
        type: 'text',
        name: 'streetInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.StreetSection.placeholder1.cz,
        onChange: (canSubmit: canSubmitType) => { setStreet(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
    }
    const houseNumberProps = {
        className: '',
        type: 'text',
        name: 'houseNumberInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.FitnessForm.StreetSection.placeholder2.cz,
        onChange: (canSubmit: canSubmitType) => { setHouseNumber(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[0-9/0-9]+$'
    }
    //////////////////////////////////////////////////
    //FUNCTIONS//
    //////////////////////////////////////////////////
    //EFFECTS//
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <form className={addFitnessFormClasses} action="#addFitnessForm" id={formId}>
            <div className={generalSectionClasses}>
                <div className="headerWrapper">
                    <h2>{text.dahboard.AddItem.FitnessForm.header1.cz}</h2>
                </div>
                <section className={"generalSectionWrapper"}>
                    <PriceLevelSection
                        onChange={(level) => { setPriceLevel({ canSubmit: true, value: String(level), name: "priceLevelInput" }) }}
                    />
                    <div className="generalInputWrapper">
                        <p>{text.dahboard.AddItem.FitnessForm.GeneralSection.p1.cz}</p>
                        <FormStringInput {...fitnessNameProps} />
                    </div>
                    <div className="generalInputWrapper">
                        <p>{text.dahboard.AddItem.FitnessForm.GeneralSection.p2.cz}</p>
                        <FormStringInput {...icoProps} />
                    </div>
                </section>
            </div>
            <RegionSection
                onChange={(data) => {
                    if (data.regionCode !== undefined && data.townCode !== undefined) {
                        setRegion({ canSubmit: true, value: data.regionCode, name: "regionInput" })
                        setTown({ canSubmit: true, value: data.townCode, name: "townInput" })
                    }
                }}
                onError={(err) => { console.log(err) }}
            />
            <section className="streetSection">
                <div className="streetInputWrapper">
                    <p className="streetLabel">{text.dahboard.AddItem.FitnessForm.StreetSection.p1.cz}</p>
                    <FormStringInput {...streetProps} />
                </div>
                <div className="houseNumberInputWrapper">
                    <p className="houseNumberLabel">{text.dahboard.AddItem.FitnessForm.StreetSection.p2.cz}</p>
                    <FormStringInput {...houseNumberProps} />
                </div>
            </section>
            <ContactSection
                formId={formId}
                onChange={(data) => { console.log(data) }}
                onError={(err) => { console.log(err) }}
            />
            <ServiceSection
                service="fitness"
                onChange={(data) => { console.log(data) }}
                onError={(err) => { console.log(err) }}
            />
            <WorkHoursSection
                setDays={setDays}
            />
            <DescribtionSection
                onChange={(data) => { console.log(data) }}
                describtionText={text.dahboard.AddItem.FitnessForm.DescribtionSection.describtionText.cz}
                describtionHeader={text.dahboard.AddItem.FitnessForm.DescribtionSection.header.cz}
            />
        </form>
    )
}
export { FitnessForm }