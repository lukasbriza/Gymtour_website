import { Route, Routes, useLocation } from 'react-router-dom'
import { routes } from '../config/mainConfiguration'
import { FC } from 'react'
import { routeArrayType, routeType } from './_types'



export const PageRoutes: FC = () => {
    const location = useLocation()
    const routeArr: routeArrayType = []
    for (const route in routes) {
        routeArr.push(route as unknown as routeType)
    }
    return (
        <Routes location={location}>
            {routeArr.map((route) => {
                return <Route path={route.path} element={route.component} />
            })}
        </Routes>
    )
}