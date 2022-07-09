import { useEffect, useContext, Suspense } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Loading } from "../Components/Loading"
//TRANSITION//
import { CSSTransition, TransitionGroup } from 'react-transition-group'
//CONFIG//
import { config } from '../config/mainConfiguration'
//CONTEXT//
import { AppContext } from './Context'



const PageRoutes = () => {

    const appContext = useContext(AppContext)
    const location = useLocation()


    useEffect(() => {
        appContext?.fn.setActualLocation(location.pathname)
    }, [appContext?.fn, location])

    return (
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
                        <Route path={config.routes.notFound.path} component={config.routes.notFound.component} />
                    </Switch>
                </Suspense>

            </CSSTransition>
        </TransitionGroup>
    )
}

export { PageRoutes }