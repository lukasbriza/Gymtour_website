import { FC, useRef } from 'react'
import { Layer, Footer } from "../../components/_index"
import { slideFromLeft, slideFromRight } from "../../animations/_index"
import register from '../../assets/register.webp'
import clsx from 'clsx'
import { LoginForm } from './LoginForm'
import { ChangeForm } from './ChangeForm'
import { RegisterForm } from './RegisterForm'

const Login: FC = () => {
    const login = useRef<HTMLElement>(null)
    const changePwdOrName = useRef<HTMLElement>(null)
    const registration = useRef<HTMLElement>(null)



    const toLogin = (from: 2 | 3) => {
        if (from === 2 && changePwdOrName.current && login.current) {
            slideFromLeft(login.current, changePwdOrName.current)
        }
        if (from === 3 && registration.current && login.current) {
            slideFromLeft(login.current, registration.current)
        }
    }
    const toChange = (from: 1 | 3) => {
        if (from === 1 && login.current && changePwdOrName.current) {
            slideFromRight(login.current, changePwdOrName.current)
        }
        if (from === 3 && registration.current && changePwdOrName.current) {
            slideFromLeft(changePwdOrName.current, registration.current)
        }
    }
    const toRegister = (from: 1 | 2) => {
        if (from === 1 && login.current && registration.current) {
            slideFromRight(login.current, registration.current)
        }
        if (from === 2 && changePwdOrName.current && registration.current) {
            slideFromRight(changePwdOrName.current, registration.current)
        }
    }

    return (
        <>
            <section className={clsx(["stretchX", "stretchVH", "Login"])}>
                <img src={register} alt="LoginBckgImg" />
                <Layer className={clsx(["stretchY", "stretchX"])}>
                    <section ref={login} className={"loginFormWrapper"}>
                        <LoginForm toChange={() => toChange(1)} toRegister={() => toRegister(1)} />
                    </section>
                    <section ref={changePwdOrName} className={"changeFormWrapper"}>
                        <ChangeForm toLogin={() => toLogin(2)} toRegister={() => toRegister(2)} />
                    </section>
                    <section ref={registration} className={"registrationFormWrapper"}>
                        <RegisterForm toLogin={() => toLogin(3)} toChange={() => toChange(3)} />
                    </section>
                </Layer>
            </section>
            <Footer />
        </>
    )
}


export default Login 