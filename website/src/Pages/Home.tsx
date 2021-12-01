import { useEffect } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
//CONFIG//
import { config } from '../config/mainConfiguration'
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Home = ({history,location}:any) => {
    useEffect(() =>{
        console.log("Home")
        console.log(history)
       // console.log(location)
    },[])
    return(
        <div id="Home" className={config.basePageClassList}>
            <Link to="/crossroad" style={{position: "absolute", top:"50%"}}>TEST</Link>
            
        </div>
    )
}

export {Home}
