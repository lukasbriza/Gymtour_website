import { useEffect, useState, useCallback } from 'react'
import fetchAgent from '../../../Functions/fetchAgent'
//FUNCTIONS//
import { classListMaker } from '../../../Functions/classListMaker'
//TEXTS//
import { text } from '../../../config/textSource'

type ErrorObj = {
    Error?: {
        code: string | number;
        name: string;
        message: string;
        trace: string;
        date: Date | string;
    };
}

const ServiceSection = ({ service, onChange, onError }: { service: "fitness" | "couch", onError: (err: ErrorObj[]) => void, onChange: (data: { gender?: "1" | "2", equipment?: string[], general?: string[], others?: string[], specialization?: string[] }) => void }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [filterData, setFilterData] = useState<getFilterData_FetchCall>()
    const [genderChecked, setGenderChecked] = useState<{ men: boolean, woman: boolean }>({ men: true, woman: false })

    const [equipment, setEquipment] = useState<string[]>([])
    const [gender, setGender] = useState<"1" | "2">("1")
    const [general, setGeneral] = useState<string[]>([])
    const [others, setOthers] = useState<string[]>([])
    const [specialization, setSpecialization] = useState<string[]>([])
    //////////////////////////////////////////////////
    //VARIABLES//
    const serviceSectionclasses = classListMaker(["serviceSection"])

    const EquipmentComp = (
        <div className="serviceCheckboxesWrapper">
            <p className="serviceLabel">{text.dahboard.AddItem.FitnessForm.ServiceSection.service.cz}</p>
            <div className="serviceCheckboxes">{getInputs("checkbox", filterData?.equipment, equipment, setEquipment, "equipmentInput")}</div>
        </div>
    )
    const GenderComp = (
        <div className="serviceCheckboxesWrapper">
            <p className="serviceLabel">{text.dahboard.AddItem.FitnessForm.ServiceSection.gender.cz}</p>
            <div className="genderRadio">
                <div
                    className={"inputRadipWrapper genderInput"}
                    onClick={() => { setGenderChecked({ men: true, woman: false }); setGender("1") }}
                >
                    <input
                        type={"radio"}
                        name={filterData?.gender[0].name.cz}
                        value={filterData?.gender[0].code}
                        checked={genderChecked.men}
                    />
                    <label >{filterData?.gender[0].name.cz}</label>
                </div>
                <div
                    className={"inputRadipWrapper genderInput"}
                    onClick={() => { setGenderChecked({ men: false, woman: true }); setGender("2") }}
                >
                    <input
                        type={"radio"}
                        name={filterData?.gender[1].name.cz}
                        value={filterData?.gender[1].code}
                        checked={genderChecked.woman}

                    />
                    <label >{filterData?.gender[1].name.cz}</label>
                </div>
            </div>
        </div>
    )
    const GeneralComp = (
        <div className="serviceCheckboxesWrapper">
            <p className="serviceLabel">{text.dahboard.AddItem.FitnessForm.ServiceSection.general.cz}</p>
            <div className="serviceCheckboxes">{getInputs("checkbox", filterData?.general, general, setGeneral, "generalInput")}</div>
        </div>
    )
    const OthersComp = (
        <div className="serviceCheckboxesWrapper">
            <p className="serviceLabel">{text.dahboard.AddItem.FitnessForm.ServiceSection.others.cz}</p>
            <div>{getInputs("checkbox", filterData?.others, others, setOthers, "othersInput")}</div>
        </div>
    )
    const SpecializationComp = (
        <div className="serviceCheckboxesWrapper">
            <p className="serviceLabel">{text.dahboard.AddItem.FitnessForm.ServiceSection.specialization.cz}</p>
            <div>{getInputs("checkbox", filterData?.specialization, specialization, setSpecialization, "specializationInput")}</div>
        </div>
    )
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const fetchDataFn = async () => {
        const fetchData = await fetchAgent.getFilterData()
        if (fetchData.errorMap.length > 0) {
            onError(fetchData.errorMap)
            return
        }
        if (fetchData.data) {
            setFilterData(fetchData.data[0])
        }
    }
    function getInputs(
        type: "radio" | "checkbox",
        data: { name: { cz: string, eng: string }, code: string }[] | undefined,
        state: string[],
        setState: React.Dispatch<React.SetStateAction<string[]>>,
        className?: string,
    ) {
        if (data) {
            return data.map((value, index) => {
                return (
                    <div className={"checkBoxWrapper " + className} key={index}>
                        <input type={type} name={value.name.cz} value={value.code} onClick={(e: React.BaseSyntheticEvent) => {
                            if (e.target.checked) {
                                setState((value) => [...value, e.target.value])
                            } else {
                                let newArray = state.filter(value => value !== e.target.value.toString())
                                setState(newArray)
                            }
                        }} />
                        <label >{value.name.cz}</label>
                    </div>)
            })
        } else {
            return <></>
        }

    }
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        fetchDataFn()
    }, [])

    useEffect(() => {
        if (service === "fitness") {
            onChange({ equipment: equipment, general: general, others: others, })
        }
        if (service === "couch") {
            onChange({ gender: gender, others: others, specialization: specialization })
        }
    }, [gender, equipment, general, others, specialization, service])
    //////////////////////////////////////////////////
    //SETUP//
    if (service === "fitness") {
        return (
            <section className={serviceSectionclasses}>
                <div className="headerWrapper">
                    <h2>{text.dahboard.AddItem.FitnessForm.ServiceSection.header.cz}</h2>
                </div>
                <div className="serviceSectionWrapper">
                    {GeneralComp}
                    {OthersComp}
                    {EquipmentComp}
                </div>

            </section>
        )
    }
    if (service === "couch") {
        return (
            <section className={serviceSectionclasses}>
                <div className="headerWrapper">
                    <h2>{text.dahboard.AddItem.FitnessForm.ServiceSection.header.cz}</h2>
                </div>
                <div className="serviceSectionWrapper">
                    {GenderComp}
                    {OthersComp}
                    {SpecializationComp}
                </div>
            </section>
        )
    }
    return (
        <></>
    )
}

export { ServiceSection }