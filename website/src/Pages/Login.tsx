import { FC } from 'react'

import { Layer } from '../components/Layer'
import { Underliner } from '../components/Underliner/Underliner'
import { Footer } from '../components/Footer/Footer'
import { text } from '../config/textSource'

import register from '../assets/register.webp'
import clsx from 'clsx'



type canSubmitObj = { canSubmit: boolean, value: string }
const Login: FC = () => {


    return (
        <>
            <section
                id="Login"
                className={clsx(["stretchX", "stretchVH", "relative", "Login"])}
            >
                <img src={register} alt="LoginBckgImg" />
                <Layer className={clsx(["stretchY", "stretchX"])}>
                    <div className={clsx(["stretchY", "stretchX", "loginContentWrapper"])}>
                        <div className={clsx(["relative", "loginHeaderWrapper"])}>
                            <h2>{text.login.Form.header.cz}</h2>
                            <Underliner width={"80%"} />
                        </div>
                        <div className={clsx(["loginFormWrapper", "relative"])}>
                            <form action="#Login" id="loginForm" onSubmit={() => { }}>

                            </form>
                        </div>
                    </div>
                </Layer>
            </section>
            <Footer />
        </>
    )
}

/*
const ForgetPassword: FC = () => {
    const handleChange = ({ canSubmit, value, name }: { canSubmit: boolean, value: string, name: string }) => {

    }
    const handleSubmit = () => { }

    return (
        <div className={clsx(["stretchX", "stretchY", "forgetPasswordFormWrapper"])}>
            <form action="#Login" id="forgetPasswordForm" className="stretchX stretchY" onSubmit={handleSubmit}>
                <div className={"forgetPasswordHeader"}>
                    <h2>{text.login.ForgetPasswordForm.header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <p className="forgetPasswordText">{text.login.ForgetPasswordForm.text.cz}</p>
                <h3 className="nameHeader">{text.login.ForgetPasswordForm.inputHeader1.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"text"}
                    name={"forgetPasswordNameInput"}
                    formId={"forgetPasswordForm"}
                    placeholder={text.login.ForgetPasswordForm.input1.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={false}
                    pattern={'[ |!()*ˇ^´˘°˛`˙´˝¨¸ß×¤÷]'}
                    errorMessage={text.login.ForgetPasswordForm.input1.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                    maxLength={30}
                    minLength={5}
                />
                <h3 className="emailHeader">{text.login.ForgetPasswordForm.inputHeader2.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"email"}
                    name={"forgetPasswordEmailInput"}
                    formId={"forgetPasswordForm"}
                    placeholder={text.login.ForgetPasswordForm.input2.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetPasswordForm.input2.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                />
                <Button
                    onClick={handleSubmit}
                    modificationClass={"modification"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={text.login.ForgetPasswordForm.button.cz}
                />
            </form>

        </div>
    )
}
const ForgetName: FC = () => {

    const handleChange = ({ canSubmit, value, name }: { canSubmit: boolean, value: string, name: string }) => {

    }
    const handleSubmit = () => { }

    return (
        <div className={clsx(["forgetNameWrapper", "stretchX", "stretchY"])}>
            <form action="#Login" id="forgetNameForm" className="stretchX stretchY" onSubmit={handleSubmit}>
                <div className={"forgetNameHeader"}>
                    <h2>{text.login.ForgetNameForm.header.cz}</h2>
                    <Underliner width={"80%"} />
                </div>
                <p className="forgetNameText">{text.login.ForgetNameForm.text.cz}</p>
                <h3 className="emailHeader">{text.login.ForgetNameForm.inputHeader1.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"email"}
                    name={"forgetNameEmailInput"}
                    formId={"forgetNameForm"}
                    placeholder={text.login.ForgetNameForm.input1.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetNameForm.input1.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                />
                <h3 className="passwordHeader">{text.login.ForgetNameForm.inputHeader2.cz}</h3>
                <FormStringInput
                    className={"formInput"}
                    type={"password"}
                    name={"forgetNamePasswordInput"}
                    formId={"forgetNameForm"}
                    placeholder={text.login.ForgetNameForm.input2.placeholder.cz}
                    onChange={(canSubmit) => { handleChange(canSubmit) }}
                    required={true}
                    errorMessage={text.login.ForgetNameForm.input2.errorMessage.cz}
                    errorStyle={errorStyle}
                    sucessStyle={sucessStyle}
                    minLength={9}
                />
                <Button
                    onClick={handleSubmit}
                    modificationClass={"modification"}
                    initialClass={"buttonInitial"}
                    hoverClass={"buttonHover"}
                    text={text.login.ForgetNameForm.button.cz}
                />
            </form>
        </div>
    )
}
*/
export default Login 