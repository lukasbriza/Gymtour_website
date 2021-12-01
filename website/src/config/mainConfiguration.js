import {Home} from '../Pages/Home'
import {Crossroad} from '../Pages/Crossroad'
import {Fitness} from '../Pages/Fitness'
import {Coach} from '../Pages/Coach'
import {NotFound} from '../Pages/NotFound'
import {About} from '../Pages/About'
import {CoOp} from '../Pages/CoOp'
import {Contact} from '../Pages/Contact'
import {classListMaker} from '../Functions/classListMaker'

const config = {
    transitionTimeout: 2000,
    breakpoints:{
        mobile: 360,
        tablet: 760,
        pc: 980,
        wide: 1300
    },
    routes:{
        mainPage: {name:"Hlavní stránka", path: "/", component: Home},
        crossroad: {name:"Rozcestí", path: "/crossroad", component: Crossroad},
        fitness: {name:"Fitness", path: "/fitness", component: Fitness},
        coach: {name:"Trenéři", path: "/coach", component: Coach},
        aboutUs: {name:"O nás", path: "/about", component: About},
        coOp: {name:"Spolupráce", path: "/coop", component: CoOp},
        contact: {name:"Kontakt", path: "/contact", component: Contact},
        notFound: {name:"404", path: "*", component: NotFound}
    },
    menuItems:{
        mainPage: {name:"Hlavní stránka", path: "/", component: Home},
        aboutUs: {name:"O nás", path: "/about", component: About},
        coOp: {name:"Spolupráce", path: "/coop", component: CoOp},
        contact: {name:"Kontakt", path: "/contact", component: Contact}
    },
    basePageClassList: classListMaker(["absolute","stretch","minorColor2"])
}

export {config}