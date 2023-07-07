import React, { FC, useEffect } from "react"
import { ProtectedRouteProps } from "./_types"
import { useUsercontext } from "src/hooks/useUserContext"
import { useNavigate } from "react-router"
import { routes } from "src/config/mainConfiguration"

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
    const { children, expectedPermission, redirect: redirectRoute } = props
    const navigate = useNavigate()
    const { hasPermission } = useUsercontext()

    useEffect(() => {
        const redirect = hasPermission(expectedPermission)
        if (!redirect) {
            navigate(redirectRoute ?? routes.login.path)
        }
    }, [expectedPermission, hasPermission, navigate, redirectRoute])

    return (
        <>
            {children}
        </>
    )
}


