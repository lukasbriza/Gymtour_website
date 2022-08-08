import { useEffect, useContext, Suspense, useState } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { Loading } from "../Components/Loading"
import { Menu } from '../Components/Menu'
//TRANSITION//
import { CSSTransition, TransitionGroup } from 'react-transition-group'
//CONFIG//
import { config } from '../config/mainConfiguration'
//CONTEXT//
import { AppContext, UserContext } from './Context'



const PageRoutes = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [show, setShow] = useState<boolean>(true)
    //////////////////////////////////////////////////
    //VARIABLES//
    const appContext = useContext(AppContext)
    const userContext = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()

    //////////////////////////////////////////////////
    //LOCATION CHANGE SAVING//
    useEffect(() => {
        appContext?.fn.setActualLocation(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    //////////////////////////////////////////////////
    //LOGGED STATE CONTROL AND MENU SHOW LOGIC//
    useEffect(() => {
        if (location.pathname.startsWith("/dashboard")) {
            setShow(false)
            if (userContext?.logged === false || userContext?.userId === "") {
                history.push("/login")
            }
        } else {
            setShow(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <>
            <Menu show={show} />
            <TransitionGroup
                component={null}
            >
                <CSSTransition
                    timeout={config.transitionTimeout}
                    key={location.key}
                    classNames={"contextclasses"}
                >
                    <Suspense fallback={<Loading />}>
                        <Switch location={location}>
                            <Route exact path={config.routes.mainPage.path} component={config.routes.mainPage.component} />
                            <Route path={config.routes.crossroad.path} component={config.routes.crossroad.component} />
                            <Route path={config.routes.fitness.path} component={config.routes.fitness.component} />
                            <Route path={config.routes.coach.path} component={config.routes.coach.component} />
                            <Route path={config.routes.login.path} component={config.routes.login.component} />
                            <Route path={config.routes.dashboard.path} component={config.routes.dashboard.component} />
                            <Route path={config.routes.businessConditions.path} component={config.routes.businessConditions.component} />
                            <Route path={config.routes.dataProcessing.path} component={config.routes.dataProcessing.component} />
                            <Route path={config.routes.emailUpdate.path} component={config.routes.emailUpdate.component} />
                            <Route path={config.routes.notFound.path} component={config.routes.notFound.component} />
                        </Switch>
                    </Suspense>

                </CSSTransition>
            </TransitionGroup>
        </>
    )
}

export { PageRoutes }