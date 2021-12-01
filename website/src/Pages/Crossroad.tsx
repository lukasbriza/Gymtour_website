import {Link, useHistory} from 'react-router-dom'
//CONFIG//
import {config} from '../config/mainConfiguration'
//FUNCTUION//
import {classListMaker} from '../Functions/classListMaker'
//HISTORY//


const Crossroad = () => {
    return (
        <div id="Crossroad" className={config.basePageClassList}>
            <Link to="/" style={{position: "absolute", top:"50%"}}>TEST</Link>
        </div>
    )
}

export {Crossroad}