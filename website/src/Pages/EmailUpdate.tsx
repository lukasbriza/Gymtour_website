import { useEffect, useState } from 'react'
import { Layer } from '../components/Layer'
import { FormModal } from '../components/FormModal'
import { Button } from '../components/Button/Button'
import { Underliner } from '../components/Underliner/Underliner'
import { Footer } from '../components/Footer/Footer'
import fetchAgent from '../utils/fetchAgent'
import { classListMaker } from '../utils/classListMaker'
import { text } from '../config/textSource'
import register from '../assets/register.webp'
import { emailUpdateShow } from '@animations'
import { useNavigate } from 'react-router'

const EmailUpdate = () => {
    //////////////////////////////////////////////////
    //STATE//
    const [modal, showModal] = useState<modalType>({ loading: false, sucess: undefined, msg: undefined })
    const [content, showContent] = useState(<SucessComponent />)
    const [effect, setEffect] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const paramString = window.location.search
    const searchParams = new URLSearchParams(paramString)

    const emailUpdateClasses = classListMaker(["stretchX", "stretchVH", "relative", "emailUpdate"])
    const layerClasses = classListMaker(["stretchY", "stretchX"])

    const emailApproveSucess = (
        [<div className="modalSucessObj" key="1">
            <p className="modalSucessContent" key="2">{text.emailUpdate.modal.approveSucess.cz}</p>
        </div>]
    )

    const emailApprovedEarlierSucess = (
        [<div className="modalSucessObj" key="1">
            <p className="modalSucessContent" key="2">{text.emailUpdate.modal.approveEarlier.cz}</p>
        </div>]
    )

    const emailApproveErrorHtml = (
        <div className="modalErrorObj">
            <p className="modalErrorHeader">{text.emailUpdate.modal.approveError.header.cz}</p>
            <p className="modalErrorContent">{text.emailUpdate.modal.approveError.text.cz}</p>
        </div>
    )

    const emailApproval = async (_id: string) => {
        //START LOADING ANIMATION//
        showModal({ loading: true, sucess: undefined, msg: undefined })

        //FETCH CALL//
        const fetchResult = await fetchAgent.emailApprove({ token: _id })
        console.log(fetchResult)
        //HANDLE FETCH ERROR MAP ARRAY//
        if (fetchResult.errorMap.length > 0) {
            let msgText = fetchResult.errorMap.map((err, index: number) => {
                const errorHtml = (
                    <div className="modalErrorObj" key={index}>
                        <p className="modalErrorHeader" key={index + "a"}>{err.Error?.code + "- " + err.Error?.name}</p>
                        <p className="modalErrorContent" key={index + "b"}>{err.Error?.message}</p>
                    </div>
                )
                return errorHtml;
            })
            showModal({ loading: false, sucess: false, msg: msgText })
            showContent(<FailureComponent />)
            return
        }
        //HANDLE SUCESS APPROVE//
        if (fetchResult.data?.approved === true && fetchResult.data?.changeMade === true) {
            showModal({ loading: false, sucess: true, msg: emailApproveSucess })
            showContent(<SucessComponent />)
            return
        }
        //HANDLE FAILED APPROVE//
        if (fetchResult.data?.approved === false && fetchResult.data.changeMade === false) {
            showModal({ loading: false, sucess: false, msg: emailApproveErrorHtml })
            showContent(<FailureComponent />)
            return
        }
        //HANDLE DUPLICIT TRY FOR APPROVE//
        if (fetchResult.data?.approved === true && fetchResult.data.changeMade === false) {
            showModal({ loading: false, sucess: true, msg: emailApprovedEarlierSucess })
            showContent(<AlreadyApprovedComponent />)
            return
        }
    }
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        const _id = searchParams.get("_id")
        if (_id !== null) {
            emailApproval(_id)
        } else {
            setEffect(true)
            showContent(<MissinIdComponent />)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (effect === true) {
            emailUpdateShow()
        }
    }, [effect])

    return (
        <>
            <section
                id="EmailUpdate"
                className={emailUpdateClasses}
            >
                <img src={register} alt="EmailUpdateBckgImg" />
                <Layer className={layerClasses}>
                    {content}
                    <FormModal
                        loading={modal.loading}
                        sucess={modal.sucess}
                        msg={modal.msg}
                        buttonMsg={text.emailUpdate.formModal.button.cz}
                        callbackTiming={0}
                        callback={() => { setEffect(true) }}
                        clearForm={() => { console.log("Clear") }}
                    />
                </Layer>
            </section>
            <Footer />
        </>
    )
}

function SucessComponent() {
    const navigate = useNavigate()
    return (
        <div className="emailUpdateWrapper stretchX stretchY">
            <div className="headerWrapper">
                <h1>Email ověřen</h1>
                <Underliner width={"80%"} color={"white"} />
            </div>
            <p className="content">
                {text.emailUpdate.sucessComponent.content.pt1.cz}
                <br />{text.emailUpdate.sucessComponent.content.pt2.cz}
            </p>
            <Button
                onClick={() => { navigate("/") }}
                initialClass={"buttonInitial"}
                modificationClass={"emailUpdateBtnModification"}
                hoverClass={"emailUpdateBtnHover"}
                text={text.emailUpdate.sucessComponent.button.cz}
            />
        </div>
    )
}

function FailureComponent() {
    const navigate = useNavigate()
    return (
        <div className="emailUpdateWrapper stretchX stretchY">
            <div className="headerWrapper">
                <h1>{text.emailUpdate.failureComponent.header.cz}</h1>
                <Underliner width={"80%"} color={"white"} />
            </div>
            <p className="content">
                {text.emailUpdate.failureComponent.content.pt1.cz}
                <br />{text.emailUpdate.failureComponent.content.pt2.cz}
            </p>
            <Button
                onClick={() => { navigate("/") }}
                initialClass={"buttonInitial"}
                modificationClass={"emailUpdateBtnModification"}
                hoverClass={"emailUpdateBtnHover"}
                text={text.emailUpdate.failureComponent.button.cz}
            />
        </div>
    )
}

function AlreadyApprovedComponent() {
    const navigate = useNavigate()
    return (
        <div className="emailUpdateWrapper stretchX stretchY">
            <div className="headerWrapper">
                <h1>{text.emailUpdate.alreadyApprovedComponent.header.cz}</h1>
                <Underliner width={"80%"} color={"white"} />
            </div>
            <p className="content">
                {text.emailUpdate.alreadyApprovedComponent.content.pt1.cz}
                <br />{text.emailUpdate.alreadyApprovedComponent.content.pt2.cz}
            </p>
            <Button
                onClick={() => { navigate("/") }}
                initialClass={"buttonInitial"}
                modificationClass={"emailUpdateBtnModification"}
                hoverClass={"emailUpdateBtnHover"}
                text={text.emailUpdate.alreadyApprovedComponent.button.cz}
            />
        </div>
    )
}

function MissinIdComponent() {
    const navigate = useNavigate()
    return (
        <div className="emailUpdateWrapper stretchX stretchY">
            <div className="headerWrapper">
                <h1>{text.emailUpdate.missingIdComponent.header.cz}</h1>
                <Underliner width={"80%"} color={"white"} />
            </div>
            <p className="content">
                {text.emailUpdate.missingIdComponent.content.pt1.cz}
                <br />{text.emailUpdate.missingIdComponent.content.pt2.cz}
            </p>
            <Button
                onClick={() => { navigate("/") }}
                initialClass={"buttonInitial"}
                modificationClass={"emailUpdateBtnModification"}
                hoverClass={"emailUpdateBtnHover"}
                text={text.emailUpdate.missingIdComponent.button.cz}
            />
        </div>
    )
}

export default EmailUpdate 