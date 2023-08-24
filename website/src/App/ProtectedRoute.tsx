import { FC } from "react"
import { ProtectedRouteProps } from "./_types"
import { useUserContext } from "src/hooks/useUserContext"
import { useNavigate } from "react-router"
import { routes } from "src/config/mainConfiguration"

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { children, expectedPermission, redirect: redirectRoute } = props
    const navigate = useNavigate()
    const { hasPermission } = useUserContext()

    const redirect = hasPermission(expectedPermission)
    if (!redirect) {
        navigate(redirectRoute ?? routes.login.path)
        return null
    }

    return (
        <>
            {children}
        </>
    )
}


