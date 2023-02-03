import { useEffect, useState, useContext, useRef } from 'react'
import { Underliner } from '../Underliner/Underliner'
import { Button } from '../Button/Button'
import { ErrorModal } from '../ErrorModal'
import fetchAgent from '../../utils/fetchAgent'
import { getToken } from '../../utils/loginLogic'
import { classListMaker } from '../../utils/classListMaker'
import { text } from '../../config/textSource'

import { useNavigate } from 'react-router'
import { useUsercontext } from 'src/hooks/_index'

const Overview = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [userObject, setUserObject] = useState<userObjectType | null>(null)
    const [errorModal, setErrorModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [errorHeader, setErrorHeader] = useState<string>("")
    //////////////////////////////////////////////////
    //VARIABLES//
    const overviewClasses = classListMaker(["overview", "dashboardSection"])

    const userContext = useUsercontext()
    const navigate = useNavigate()
    const userReqSended = useRef(false)
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        //FETCH USER INFORMATION
        if (
            userContext?.userId !== undefined &&
            userContext?.userId !== "" &&
            userContext?.logged === true &&
            userReqSended.current === false &&
            userContext.userObject === undefined
        ) {

            const token = getToken()
            token.then(token => {
                if (token !== null) {
                    const fetchResult = fetchAgent.getUserInformation({ id: userContext?.userId, token: token })
                    fetchResult.then((result) => {
                        userReqSended.current = true
                        if (result.errorMap.length === 0 && result.data !== null) {
                            setUserObject(result.data)
                        } else {
                            //ERROR MODAL
                            setErrorHeader(text.errorModal.headers.overview.cz)
                            const message = (result.errorMap.map((error) => error.Error?.message) + text.errorModal.contactMessage.cz)
                            setErrorMessage(message)
                            setErrorModal(true)
                        }
                    })
                }
            })
        }
    }, [userContext?.userId, userContext?.logged, userContext?.userObject])
    useEffect(() => {
        if (userObject !== null) {
            userContext?.fn.setUserObject(userObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userObject])

    return (
        <>
            <section className={overviewClasses}>
                <div className="contentWrapper">
                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section1.text.cz}</div>
                        <div className="id infoHolder">
                            {userContext?.userObject?._id}
                        </div>
                    </div>

                    <div className="headerWrapper">
                        <h1>{text.dahboard.Overview.section2.header.cz}</h1>
                        <Underliner width={"80%"} id={"dashboardUnderliner"} color={"black"} />
                    </div>
                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section3.text.cz}</div>
                        <div className="username infoHolder">
                            {userContext?.userObject?.username}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section4.text.cz}</div>
                        <div className="email infoHolder">
                            {userContext?.userObject?.email}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section5.text.cz}</div>
                        <div className="fitnessOwned infoHolder">
                            {userContext?.userObject?.fitnessOwned.length}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section6.text.cz}</div>
                        <div className="coachOwned infoHolder">
                            {userContext?.userObject?.coachOwned.length}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section7.text.cz}</div>
                        <div className="termsAwarded infoHolder">
                            {new Date(String(userContext?.userObject?.agreement.terms.awarded)).toLocaleDateString("cs-CZ")}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">{text.dahboard.Overview.section8.text.cz}</div>
                        <div className="dataprocessingAwarded infoHolder">
                            {new Date(String(userContext?.userObject?.agreement.dataProcessingForPropagation.awarded)).toLocaleDateString("cs-CZ")}
                        </div>
                    </div>
                    <Button
                        onClick={() => { navigate("/dashboard/settings") }}
                        modificationClass={"overviewButton"}
                        initialClass={"buttonInitial"}
                        hoverClass={"buttonHover"}
                        text={"Upravit"}
                    />
                </div>
                <ErrorModal
                    show={errorModal}
                    message={errorMessage}
                    errorHeader={errorHeader}
                    callback={() => { setErrorModal(false) }}
                />
            </section >
        </>
    )
}

export { Overview }