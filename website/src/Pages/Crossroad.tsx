import { FC } from 'react'
import { CoachPage, FitnessPage, Footer, RegisterPage } from 'src/components/_index'

import clsx from 'clsx'


const Crossroad: FC = () => {
    return (
        <div id="Crossroad" className={clsx(["relative", "stretch", "minorColor2"])}>
            <div id="crossroadSectionWrapper">
                <FitnessPage />
                <div id="divider" className="divider"></div>
                <CoachPage />
            </div>
            <RegisterPage />
            <Footer />
        </div>
    )
}

export default Crossroad