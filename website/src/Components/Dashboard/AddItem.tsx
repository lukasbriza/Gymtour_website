import { useEffect, useState, useContext } from 'react'
import { FitnessForm } from './FitnessForm'
import { CoachForm } from './CoachForm'
import { Underliner } from '../Underliner'
import { ErrorModal } from '../ErrorModal'
//FUNCTIONS//
import fetchAgent from '../../Functions/fetchAgent'
import { getToken } from '../../Functions/loginLogic'
import { classListMaker } from '../../Functions/classListMaker'
//CONFIG//
import { text } from '../../config/textSource'
//CONTEXT//
import { UserContext } from '../../App/Context'

const AddItem = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [btn, setBtn] = useState<boolean>(true)
    //////////////////////////////////////////////////
    //VARIABLES//
    const addItemClasses = classListMaker(["addItem", "dashboardSection"])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    //////////////////////////////////////////////////
    //EFFECTS//
    //////////////////////////////////////////////////
    //SETUP//
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