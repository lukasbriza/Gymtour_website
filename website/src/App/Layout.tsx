import { FC, Suspense, useEffect } from "react";
import { LayoutProps } from "./_types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { Menu } from "src/components/_index";
import { transitionSetup } from "src/config/_index";


export const Layout: FC<LayoutProps> = (props) => {
    const location = useLocation()
    const { children } = props

    return (
        <div id="App">
            <Menu />
            <TransitionGroup
                component={null}
            >
                <CSSTransition
                    timeout={transitionSetup.transitionTimeout}
                    key={location.key}
                    classNames={"contextclasses"}
                >
                    <Suspense>
                        {children}
                    </Suspense>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}