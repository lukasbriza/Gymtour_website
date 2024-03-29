import { FC, Suspense, useEffect } from "react";
import { LayoutProps } from "./_types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@components";
import { useUsercontext } from "@hooks";
import { transitionSetup } from "@config";

export const Layout: FC<LayoutProps> = (props) => {
    const { logged, userId } = useUsercontext()
    const location = useLocation()
    const navigate = useNavigate()
    const { children } = props

    //LOGGED STATE CONTROL AND MENU SHOW LOGIC//
    useEffect(() => {
        if (location.pathname.startsWith("/dashboard")) {
            if (logged === false || userId === "") {
                navigate("/login")
            }
        } else {
        }
    }, [location, logged, navigate, userId])

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