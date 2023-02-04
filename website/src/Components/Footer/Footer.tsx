import { Link } from "react-router-dom"
import { text } from '../../config/textSource'
import { FC } from "react"
import clsx from "clsx"
import { Underliner } from "@components"
import { footerLinks } from "@config"
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "@svg"

const Footer: FC = () => {
    const gymtourLinks = footerLinks.footerLinks2.map((obj, index) => {
        return (
            <div
                className="footerLinkWrapper"
                key={index}
            >
                <Link to={obj.path} className="link">{obj.name}</Link>
                <Underliner width={"0%"} />
            </div>)
    })

    const otherLinks = footerLinks.footerLinks1.map((obj, index) => {
        return (
            <div
                className="footerLinkWrapper"
                key={index}
            >
                <Link to={obj.path} className="link">{obj.name}</Link>
                <Underliner width={"0"} />
            </div>
        )
    })

    return (
        <footer className={clsx(["footer", "stretchX", "relative", "minorColor1Text", "mainColor"])}>
            <section className={clsx(["followUs", "relative", "centerX"])}>
                <div className="headerWrapper">
                    <h3>{text.footer.Section1.header.cz}</h3>
                    <Underliner width={"80%"} />
                </div>
                <div className={"logoWrapper"}>
                    <FacebookLogo id="fb" className="icon" fill={"white"} scale={1} />
                    <YoutubeLogo id="yb" className="icon" fill={"white"} scale={1.32} />
                    <InstagramLogo id="ig" className="icon" fill={"white"} scale={1} />
                </div>
            </section>
            <section className={clsx(["other", "linkCol", "centerX", "relative"])}>
                <div className="headerWrapper">
                    <h3>{text.footer.Section2.header.cz}</h3>
                    <Underliner width={"80%"} />
                </div>
                {otherLinks}
            </section>
            <section className={clsx(["gymtour", "linkCol", "centerX", "relative"])}>
                <div className="headerWrapper">
                    <h3>{text.footer.Section3.header.cz}</h3>
                    <Underliner width={"80%"} />
                </div>
                {gymtourLinks}
            </section>
            <section className={"copyRight"}><a href="https://github.com/lukasbriza" rel="noreferrer" target="_blank">© {new Date().getFullYear()} Lukáš Bříza Web Development</a></section>
        </footer>
    )
}

export { Footer }