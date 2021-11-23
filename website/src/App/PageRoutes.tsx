import {Switch, Route, useLocation} from 'react-router-dom'
//TRANSITION//
import {CSSTransition, TransitionGroup} from 'react-transition-group'
//CONFIG//
import {config} from '../config/mainConfiguration'

const PageRoutes = () => {
    const location = useLocation()

    return(
        <TransitionGroup>
            <CSSTransition
                timeout={config.transitionTimeout}
                key={location.key}
                classNames={"contextclasses"}
            >
                <Switch location={location}>
                    <Route exact path={config.routes.mainPage.path} component={config.routes.mainPage.component}/>
                    <Route path={config.routes.crossroad.path} component={config.routes.crossroad.component}/>
                    <Route path={config.routes.fitness.path} component={config.routes.fitness.component}/>
                    <Route path={config.routes.coach.path} component={config.routes.coach.component}/>
                    <Route path={config.routes.notFound.path} component={config.routes.notFound.component}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export {PageRoutes}