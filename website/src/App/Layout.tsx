import { FC, useEffect } from "react";
import { LayoutProps } from "./_types";
import { Menu } from "@components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";
import { transitionSetup } from "@config";
import { useUsercontext } from "@hooks";

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
                    {children}
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}