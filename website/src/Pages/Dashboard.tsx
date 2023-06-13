import { useState, useRef, useEffect, FC } from 'react'
import { Route, Link, Routes, useNavigate } from 'react-router-dom'
import { AddItem } from '../components/Dashboard/AddItem'
import { UpdateItem } from '../components/Dashboard/UpdateItem'
import { Overview } from '../components/Dashboard/Overview'
import { text } from '../config/textSource'
import { useAppContext, useUsercontext } from 'src/hooks/_index'
import { hamburgerOff, hamburgerOn, menuShiftOff, menuShiftOn } from '@animations'
import clsx from 'clsx'

const Dashboard: FC = () => {
    const [menu, setMenu] = useState<boolean>(false)

    //! => useRouteMatch equivalent
    const sideBarPaths = [
        { path: "", component: <Overview />, name: text.dahboard.Sidebar.routes[0].cz }, //summary účtu - přehled účtu
        { path: "/add", component: <AddItem />, name: text.dahboard.Sidebar.routes[1].cz }, //přidat fitness nebo coache
        { path: "/update", component: <UpdateItem />, name: text.dahboard.Sidebar.routes[2].cz }, // seznam všeho co uživatel má + proklik na update + možnost delete 

    ]

    const sideBarRef = useRef(null)
    const menuTriggerRef = useRef(null)
    const line1Ref = useRef<HTMLDivElement>(null)
    const line2Ref = useRef<HTMLDivElement>(null)
    const line3Ref = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const { breakPoint } = useAppContext()
    const userContext = useUsercontext()

    const logOut = () => {
        userContext?.fn.setLogged(false);
        userContext?.fn.setUserId("")

    }

    useEffect(() => {
        if (line1Ref.current && line2Ref.current && line3Ref.current && sideBarRef.current && menuTriggerRef.current) {
            if (menu === true && breakPoint !== "fromDesktop") {
                menuShiftOn(sideBarRef.current, menuTriggerRef.current, line1Ref.current, line2Ref.current, line3Ref.current)
                hamburgerOn(line1Ref.current, line2Ref.current, line3Ref.current)

            }
            if (menu === false && breakPoint !== "fromDesktop") {
                menuShiftOff(sideBarRef.current, menuTriggerRef.current, line1Ref.current, line2Ref.current, line3Ref.current)
                hamburgerOff(line1Ref.current, line2Ref.current, line3Ref.current)
            }
        }

    }, [menu, breakPoint])

    useEffect(() => {
        if (breakPoint === "fromDesktop" && menu === true) {
            setMenu(false)
        }
    }, [breakPoint, menu])


    type sideBarPathsType = { path: string, component: JSX.Element, name: string }
    return (
        <section className={clsx(["stretchX", "stretchY", "relative", "Dashboard"])}>
            <nav className="sideBar" ref={sideBarRef}>
                <div className="sideMenuTrigger" ref={menuTriggerRef} onClick={() => setMenu(!menu)}>
                    <div className="line" ref={line1Ref}></div>
                    <div className="line" ref={line2Ref}></div>
                    <div className="line" ref={line3Ref}></div>
                </div>
                {sideBarPaths.map((obj: sideBarPathsType, index: number) => {
                    return <Link to={`${"/"}${obj.path}`} key={index + "sideBar"} className="sideBarItem">{obj.name}</Link>
                })}
                <button
                    className="sideBarItem logoutButton"
                    onClick={logOut}
                >
                    {text.dahboard.Sidebar.routes[4].cz}
                </button>
            </nav>
            <Routes>
                {sideBarPaths.map((obj: sideBarPathsType, index: number) => {
                    if (index === 0) {
                        return <Route path={"/"} key="0mapRoute">{obj.component}</Route>
                    }
                    return <Route path={`${"/"}${obj.path}`} key={index + "mapRoute"}>{obj.component}</Route>
                })}
            </Routes>
        </section>
    )
}

export default Dashboard 