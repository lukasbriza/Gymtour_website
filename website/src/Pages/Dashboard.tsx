import { useState, useRef, useEffect, useContext } from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'
import { AddItem } from '../Components/Dashboard/AddItem'
import { UpdateItem } from '../Components/Dashboard/UpdateItem'
import { Settings } from '../Components/Dashboard/Settings'
import { Overview } from '../Components/Dashboard/Overview'
import { gsap } from 'gsap'
//FUNCTIONS//
import { classListMaker } from '../Functions/classListMaker'
import { removeToken } from '../Functions/loginLogic'
//CONFIG//
import { animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//CONTEXT//
import { AppContext, UserContext } from '../App/Context'

const Dashboard = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [menu, setMenu] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const { path, url } = useRouteMatch()
    const sideBarPaths = [
        { path: "", component: <Overview />, name: text.dahboard.Sidebar.routes[0].cz }, //summary účtu - přehled účtu
        { path: "/add", component: <AddItem />, name: text.dahboard.Sidebar.routes[1].cz }, //přidat fitness nebo coache
        { path: "/update", component: <UpdateItem />, name: text.dahboard.Sidebar.routes[2].cz }, // seznam všeho co uživatel má + proklik na update + možnost delete 
        { path: "/settings", component: <Settings />, name: text.dahboard.Sidebar.routes[3].cz } //změna hesla, změna emailu kontaktního
    ]

    const dashboardPageClasses = classListMaker(["stretchX", "stretchY", "relative", "Dashboard"])

    const sideBarRef = useRef(null)
    const menuTriggerRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)

    const history = useHistory()

    const appContext = useContext(AppContext)
    const userContext = useContext(UserContext)
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const logOut = () => {
        userContext?.fn.setLogged(false);
        userContext?.fn.setUserId("")
        removeToken().then(() => {
            history.push("/login")
        })
    }
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
        const hmbSlices = [line1Ref.current, line2Ref.current, line3Ref.current]
        if (menu === true && appContext?.breakPoint !== "fromDesktop") {
            animationStore.dashboard.menuShift.on(sideBarRef.current, menuTriggerRef.current, hmbSlices, ".sideBarItem")
            animationStore.dashboard.sidebarHamburger.crossOn(hmbSlices)

        }
        if (menu === false && appContext?.breakPoint !== "fromDesktop") {
            let arr = gsap.utils.toArray(".sideBarItem").reverse()
            animationStore.dashboard.menuShift.off(sideBarRef.current, menuTriggerRef.current, hmbSlices, arr)
            animationStore.dashboard.sidebarHamburger.crossOff(hmbSlices)
        }
    }, [menu, appContext?.breakPoint])

    useEffect(() => {
        if (appContext?.breakPoint === "fromDesktop" && menu === true) {
            setMenu(false)
        }
    }, [appContext?.breakPoint, menu])

    //////////////////////////////////////////////////
    //SETUP//
    type sideBarPathsType = { path: string, component: JSX.Element, name: string }
    return (
        <section className={dashboardPageClasses}>
            <nav className="sideBar" ref={sideBarRef}>
                <div className="sideMenuTrigger" ref={menuTriggerRef} onClick={() => setMenu(!menu)}>
                    <div className="line" ref={line1Ref}></div>
                    <div className="line" ref={line2Ref}></div>
                    <div className="line" ref={line3Ref}></div>
                </div>
                {sideBarPaths.map((obj: sideBarPathsType, index: number) => {
                    return <Link to={`${url}${obj.path}`} key={index + "sideBar"} className="sideBarItem">{obj.name}</Link>
                })}
                <button
                    className="sideBarItem logoutButton"
                    onClick={logOut}
                >
                    {text.dahboard.Sidebar.routes[4].cz}
                </button>
            </nav>
            <Switch>
                {sideBarPaths.map((obj: sideBarPathsType, index: number) => {
                    if (index === 0) {
                        return <Route exact path={path} key="0mapRoute">{obj.component}</Route>
                    }
                    return <Route path={`${path}${obj.path}`} key={index + "mapRoute"}>{obj.component}</Route>
                })}
            </Switch>
        </section>
    )
}

export default Dashboard 