import { Layer } from '../components/Layer'
import { Button } from '../components/Button/Button'
import { Underliner } from '../components/Underliner/Underliner'
import { Footer } from '../components/Footer/Footer'
import { text } from '../config/textSource'
import register from '../assets/register.webp'
import { emailUpdateShow } from 'src/animations/_index'
import { useNavigate } from 'react-router'

const EmailUpdate = () => {


    return (
        <>
            <section
                id="EmailUpdate"

            >
                <img src={register} alt="EmailUpdateBckgImg" />
                <Layer >

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