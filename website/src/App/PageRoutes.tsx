import { Route, Routes, useLocation } from 'react-router-dom'
import { routes } from '../config/mainConfiguration'
import { FC } from 'react'

export const PageRoutes: FC = () => {
    const location = useLocation()
    return (
        <Routes location={location}>
            <Route path={routes.mainPage.path} element={<routes.mainPage.component />} />
            <Route path={routes.crossroad.path} element={<routes.crossroad.component />} />
            <Route path={routes.fitness.path} element={<routes.fitness.component />} />
            <Route path={routes.coach.path} element={<routes.coach.component />} />
            <Route path={routes.businessConditions.path} element={<routes.businessConditions.component />} />
            <Route path={routes.dataProcessing.path} element={<routes.dataProcessing.component />} />
            <Route path={routes.detail.path} element={<routes.detail.component />} />
            <Route path={routes.notFound.path} element={<routes.notFound.component />} />
            <Route path={routes.login.path} element={<routes.login.component />} />
            {/*PROTECTED ROUTES*/}
            <Route path={routes.dashboard.path} element={<routes.dashboard.component />} />
            <Route path={routes.modify.path} element={<routes.modify.component />} />
        </Routes>
    )
}