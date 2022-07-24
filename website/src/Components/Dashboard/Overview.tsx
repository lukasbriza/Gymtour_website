import { useEffect, useState, useContext, useRef } from 'react'
import { Underliner } from '../Underliner'
import { Button } from '../Button'
import { ErrorModal } from '../ErrorModal'
import { useHistory } from 'react-router-dom'
//FUNCTIONS//
import fetchAgent from '../../Functions/fetchAgent'
import { getToken } from '../../Functions/loginLogic'
import { classListMaker } from '../../Functions/classListMaker'
//CONFIG//
//CONTEXT//
import { UserContext } from '../../App/Context'

const Overview = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [userObject, setUserObject] = useState<userObjectType | null>(null)
    const [errorModal, setErrorModal] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [errorHeader, setErrorHeader] = useState<string>("")
    //////////////////////////////////////////////////
    //VARIABLES//
    const overviewClasses = classListMaker(["overview"])

    const userContext = useContext(UserContext)
    const history = useHistory()
    const userReqSended = useRef(false)
    //////////////////////////////////////////////////
    //FUNCTIONS//
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
                            setErrorHeader("Získání informací selhalo")
                            const message = (result.errorMap.map((error) => error.Error?.message) + " Kontaktujte administrátora na emailové adrese info@gymtour.cz")
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
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <>
            <section className={overviewClasses}>
                <div className="contentWrapper">
                    <div className="infoWrapper">
                        <div className="text">ID:</div>
                        <div className="id infoHolder">
                            {userContext?.userObject?._id}
                        </div>
                    </div>

                    <div className="headerWrapper">
                        <h1>Účet</h1>
                        <Underliner width={"80%"} id={"dashboardUnderliner"} color={"black"} />
                    </div>
                    <div className="infoWrapper">
                        <div className="text">Uživatelské jméno:</div>
                        <div className="username infoHolder">
                            {userContext?.userObject?.username}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">Email uživatele:</div>
                        <div className="email infoHolder">
                            {userContext?.userObject?.email}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">Počet fitness/welness záznamů:</div>
                        <div className="fitnessOwned infoHolder">
                            {userContext?.userObject?.fitnessOwned.length}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">Počet coach záznamů:</div>
                        <div className="coachOwned infoHolder">
                            {userContext?.userObject?.coachOwned.length}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">Souhlas s podmínkami přidán:</div>
                        <div className="termsAwarded infoHolder">
                            {new Date(String(userContext?.userObject?.agreement.terms.awarded)).toLocaleDateString("cs-CZ")}
                        </div>
                    </div>

                    <div className="infoWrapper">
                        <div className="text">GDPR souhlas přidán:</div>
                        <div className="dataprocessingAwarded infoHolder">
                            {new Date(String(userContext?.userObject?.agreement.dataProcessingForPropagation.awarded)).toLocaleDateString("cs-CZ")}
                        </div>
                    </div>
                    <Button
                        onClick={() => { history.push("/dashboard/settings") }}
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