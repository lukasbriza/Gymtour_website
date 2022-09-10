import { useEffect, useState, useContext, useRef } from 'react'

import { PriceLevelSection } from './AddItemForm/PriceLevelSection'
import { FormStringInput } from '../FormStringInput'
import { RegionSection } from './AddItemForm/RegionSection'
import { ContactSection } from './AddItemForm/ContactSection'
import { ServiceSection } from './AddItemForm/ServiceSection'
import { DescribtionSection } from './AddItemForm/DescribtionSection'
//CONFIG//
import { text } from '../../config/textSource'
//FUNCTIONS//
import { classListMaker } from '../../Functions/classListMaker'

type canSubmitType = { canSubmit: boolean, value: string, name: string }
const errorStyle = {
    borderColor: "red",
    borderWidth: "3px"
}
const sucessStyle = {
    borderColor: "rgb(0, 180, 0)",
    borderWidth: "3px"
}
const formId = 'addCoachForm'

const CoachForm = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [name, setName] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'coachNameInput' })
    const [surname, setSurname] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'coachNameInput' })
    const [alias, setAlias] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'coachAliasInput' })
    const [workplace, setWorkplace] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'coachWorkplaceInput' })
    const [priceLevel, setPriceLevel] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'priceLevelInput' })

    const [region, setRegion] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'regionInput' })
    const [town, setTown] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'townInput' })
    const [street, setStreet] = useState<canSubmitType>({ canSubmit: false, value: '', name: 'regionInput' })

    //////////////////////////////////////////////////
    //VARIABLES//
    const addCoachFormClasses = classListMaker(["addCoachForm"])
    const generalSectionClasses = classListMaker(["generalSection"])
    const workplaceSectionClasses = classListMaker(["workplaceSection"])

    const coachNameProps = {
        className: '',
        type: 'text',
        name: 'coachNameInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.CoachForm.GeneralSection.placeholder1.cz,
        onChange: (canSubmit: canSubmitType) => { setName(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
    }
    const coachSurnameProps = {
        className: '',
        type: 'text',
        name: 'coachSurnameInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.CoachForm.GeneralSection.placeholder2.cz,
        onChange: (canSubmit: canSubmitType) => { setSurname(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
    }
    const coachAliasProps = {
        className: '',
        type: 'text',
        name: 'coachAliasInput',
        formId: formId,
        placeholder: text.dahboard.AddItem.CoachForm.GeneralSection.placeholder3.cz,
        onChange: (canSubmit: canSubmitType) => { setAlias(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        required: false,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
    }
    const coachWorkplaceProps = {
        className: '',
        type: 'text',
        name: 'coachWorkplaceInput',
        formId: formId,
        placeholder: "Jméno fitness",
        onChange: (canSubmit: canSubmitType) => { setWorkplace(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[a-zA-Z0-9@+-<>$#|%$ěščřžýáíéůúĚŠČŘŽÝÁÍÉ]+$'
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
        onChange: (canSubmit: canSubmitType) => { setStreet(canSubmit) },
        errorStyle: errorStyle,
        errorMessage: 'errorMessage',
        sucessStyle: sucessStyle,
        minLength: 2,
        required: true,
        pattern: '^[0-9/0-9]+$'
    }

    //////////////////////////////////////////////////
    //SETUP//
    return (
        <form className={addCoachFormClasses} action="#addCoachForm" id={formId}>
            <div className={generalSectionClasses}>
                <div className="headerWrapper">
                    <h2>{"Obecné informace"}</h2>
                </div>
                <section className={"generalSectionWrapper"}>
                    <PriceLevelSection
                        onChange={(level) => { setPriceLevel({ canSubmit: true, value: String(level), name: "priceLevelInput" }) }}
                    />
                    <div className="generalInputWrapper">
                        <p>{text.dahboard.AddItem.CoachForm.GeneralSection.p1.cz}</p>
                        <FormStringInput {...coachNameProps} />
                    </div>
                    <div className="generalInputWrapper">
                        <p>{text.dahboard.AddItem.CoachForm.GeneralSection.p2.cz}</p>
                        <FormStringInput {...coachSurnameProps} />
                    </div>
                    <div className="generalInputWrapper">
                        <p>{text.dahboard.AddItem.CoachForm.GeneralSection.p3.cz}</p>
                        <FormStringInput {...coachAliasProps} />
                    </div>
                </section>
            </div>
            <div className={workplaceSectionClasses}>
                <RegionSection
                    onChange={(data) => {
                        if (data.regionCode !== undefined && data.townCode !== undefined) {
                            setRegion({ canSubmit: true, value: data.regionCode, name: "regionInput" })
                            setTown({ canSubmit: true, value: data.townCode, name: "townInput" })
                        }
                    }}
                    onError={(err) => { console.log(err) }}
                />
                <section className="positionWrapper">
                    <div className="generalInputWrapper">
                        <p>{"Jméno fitness kde trénujete*"}</p>
                        <FormStringInput {...coachWorkplaceProps} />
                    </div>
                    <section className="streetSection">
                        <div className="streetInputWrapper">
                            <p className="streetLabel">{"Ulice"}</p>
                            <FormStringInput {...streetProps} />
                        </div>
                        <div className="houseNumberInputWrapper">
                            <p className="houseNumberLabel">{"Čp"}</p>
                            <FormStringInput {...houseNumberProps} />
                        </div>
                    </section>
                </section>
            </div>
            <ContactSection
                formId={formId}
                onChange={(data) => { console.log(data) }}
                onError={(err) => { console.log(err) }}
            />
            <ServiceSection
                service="couch"
                onChange={(data) => { console.log(data) }}
                onError={(err) => { console.log(err) }}
            />
            <DescribtionSection
                onChange={(data) => { console.log(data) }}
                describtionText={text.dahboard.AddItem.CoachForm.DescribtionSection.describtionText.cz}
                describtionHeader={text.dahboard.AddItem.CoachForm.DescribtionSection.header.cz}
            />
        </form>
    )
}

export { CoachForm }