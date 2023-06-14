import { useEffect, useState } from 'react'
//FUNCTIONS//
import { classListMaker } from '../../../utils/classListMaker'
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
const RegionSection = ({ onChange, onError }: { onChange: (data: { regionCode: string | undefined, townCode: string | undefined }) => void, onError: (err: ErrorObj[]) => void }) => {
    //////////////////////////////////////////////////
    //STATE//
    const [filterData, setFilterData] = useState<getFilterData_FetchCall>()

    const [regionDropDown, setRegionDropDown] = useState<({ name: { cz: string, eng: string }, code: string })[]>()

    const [townDropDown, setTownDropDown] = useState<{ name: { cz: string, eng: string }, code: string }[]>()

    const [regionSelected, setRegionSelected] = useState<string | undefined>(undefined)
    const [townSelected, setTownSelected] = useState<string | undefined>(undefined)
    //////////////////////////////////////////////////
    //VARIABLES//
    const regionSectionclasses = classListMaker(["regionSection"])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const fetchDataFn = async () => {

    }
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        fetchDataFn()
    }, [])

    //SET TOWN DROPDOWN
    useEffect(() => {
        if (regionSelected === 'default') {
            setTownDropDown(undefined)
            setTownSelected('default')
        }
        filterData?.regions.map((value) => {
            if (value.code === regionSelected) {
                setTownDropDown(value.towns)
            }
            return null
        })
    }, [filterData?.regions, regionSelected])

    //SET CALLBACK VALUES
    useEffect(() => {
        onChange({ regionCode: regionSelected, townCode: townSelected })
    }, [regionSelected, townSelected])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <section className={regionSectionclasses}>
            <div className="headerWrapper">
                <h2>{text.dahboard.AddItem.FitnessForm.RegionSection.header1.cz}</h2>
            </div>
            <section className="regionSelectWrapper">
                <div className="regionSectionWrapper">
                    <p className="regionSectionLabel">{text.dahboard.AddItem.FitnessForm.RegionSection.p1.cz}</p>
                    <DropDownMenu
                        name={"dropdown"}
                        id={"regionDropDown"}
                        options={regionDropDown}
                        onChange={(e) => { setRegionSelected(e.target.value) }}
                    />
                </div>
                <div className="townSectionWrapper">
                    <p className="townSectionLabel">{text.dahboard.AddItem.FitnessForm.RegionSection.p2.cz}</p>
                    <DropDownMenu
                        name={"dropdown"}
                        id={"townDropDown"}
                        options={townDropDown}
                        onChange={(e) => { setTownSelected(e.target.value) }}
                    />
                </div>
            </section>
        </section>
    )
}

const DropDownMenu = ({ name, id, options, onChange, ...props }:
    { name: string, id: string, options: ({ name: { cz: string, eng: string }, code: string } | undefined)[] | undefined, onChange: (e: any) => void }) => {
    return (
        <select name={name} id={id} {...props} onChange={onChange}>
            <option value={"default"} key={"default"} selected>-</option>
            {options?.map((value) => {
                return <option value={value?.code} key={value?.code}>{value?.name.cz}</option>
            })}
        </select>
    )
}

export { RegionSection }