import { FC } from "react"
import { ProtectedRouteProps } from "./_types"
import { useUserContext } from "src/hooks/useUserContext"
import { useNavigate } from "react-router"
import { routes } from "src/config/mainConfiguration"
import { useEffectOnce } from "@lukasbriza/lbui-lib"

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { children, expectedPermission, redirect: redirectRoute } = props
    const navigate = useNavigate()
    const { hasPermission } = useUserContext()

    useEffectOnce(() => {
        console.log("permission")
        const redirect = hasPermission(expectedPermission)
        if (!redirect) {
            navigate(redirectRoute ?? routes.login.path)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {children}
        </>
    )
}


