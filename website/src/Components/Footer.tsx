import FacebookLogo from "../Components/SVG/FacebookLogo"
import YoutubeLogo from "../Components/SVG/YoutubeLogo"
import InstagramLogo from "../Components/SVG/InstagramLogo"
import { Underliner } from "./Underliner"
import { Link } from "react-router-dom"
//CONFIG//
import { text } from '../config/textSource'
import { config } from '../config/mainConfiguration'
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const Footer = () => {
    //////////////////////////////////////////////////
    //STATE//

    //////////////////////////////////////////////////
    //VARIABLES//
    const footerClasses = classListMaker(["footer", "stretchX", "relative", "minorColor1Text", "mainColor"])
    const followUsClasses = classListMaker(["followUs"])
    const gymtourClasses = classListMaker(["gymtour"])
    const copyRightClasses = classListMaker(["copyRight"])
    const logoWrapperClasses = classListMaker(["logoWrapper"])

    const gymtourLinks = config.footerLinks.map((obj, index) => {
        return (
            <div
                className="footerLinkWrapper"
                key={index}
            >
                <Link to={obj.path} className="link">{obj.name}</Link>
                <Underliner width={"0%"} />
            </div>)
    })
    //////////////////////////////////////////////////
    //FUNCTIONS//
    //////////////////////////////////////////////////
    return (
        <footer className={footerClasses}>
            <section className={followUsClasses}>
                <div className="headerWrapper">
                    <h3>{text.footer.Section1.header.cz}</h3>
                    <Underliner width={"80%"} />
                </div>
                <div className={logoWrapperClasses}>
                    <FacebookLogo id="fb" className="icon" fill={"white"} scale={1} />
                    <YoutubeLogo id="yb" className="icon" fill={"white"} scale={1.32} />
                    <InstagramLogo id="ig" className="icon" fill={"white"} scale={1} />
                </div>
            </section>
            <section className={gymtourClasses}>
                <div className="headerWrapper">
                    <h3>{text.footer.Section2.header.cz}</h3>
                    <Underliner width={"80%"} />
                </div>
                {gymtourLinks}
            </section>
            <section className={copyRightClasses}><a href="https://github.com/lukasbriza" rel="noreferrer" target="_blank">© {new Date().getFullYear()} Lukáš Bříza</a></section>
        </footer>
    )
}

export { Footer }