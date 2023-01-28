import { useEffect, useState, useContext } from 'react'
import { FitnessForm } from './FitnessForm'
import { CoachForm } from './CoachForm'
import { Underliner } from '../Underliner'
import { ErrorModal } from '../ErrorModal'
//FUNCTIONS//
import fetchAgent from '../../utils/fetchAgent'
import { getToken } from '../../utils/loginLogic'
import { classListMaker } from '../../utils/classListMaker'
//CONFIG//
import { text } from '../../config/textSource'


const AddItem = () => {

    const [btn, setBtn] = useState<boolean>(true)

    const addItemClasses = classListMaker(["addItem", "dashboardSection"])

    return (
        <section className={addItemClasses}>
            <nav>
                <button className="addFitness" onClick={() => { setBtn(true) }}>Fitness</button>
                <button className="addCoach" onClick={() => { setBtn(false) }}>Coach</button>
            </nav>
            {btn ? <FitnessForm /> : <CoachForm />}
        </section>
    )
}

export { AddItem }