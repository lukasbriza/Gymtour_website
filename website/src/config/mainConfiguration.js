import {Home} from '../Pages/Home'
import {Crossroad} from '../Pages/Crossroad'
import {Fitness} from '../Pages/Fitness'
import {Coach} from '../Pages/Coach'
import {NotFound} from '../Pages/NotFound'

const config = {
    transitionTimeout: 2000,
    breakpoints:{
        mobile: 480,
        tablet: 768,
        pc: 1024
    },
    routes:{
        mainPage: {path: "/", component: Home},
        crossroad: {path: "/crossroad", component: Crossroad},
        fitness: {path: "/fitness", component: Fitness},
        coach: {path: "/coach", component: Coach},
        notFound: {path: "*", component: NotFound}
    }
}

export {config}