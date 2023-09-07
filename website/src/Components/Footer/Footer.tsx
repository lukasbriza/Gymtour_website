import { Link } from "react-router-dom"
import { FC } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { footerLinks, links } from "src/config"
import { Underliner } from ".."
import { FacebookLogo, InstagramLogo, YoutubeLogo } from "../SVG/_index"

const Footer: FC = () => {
    const { t } = useTranslation()

    const gymtourLinks = footerLinks.footerLinks2.map((obj, index) => {
        return (
            <div
                className="footerLinkWrapper"
                key={index}
            >
                <Link to={obj.path} className="link">{t(obj.name)}</Link>
                <Underliner width={"0%"} />
            </div>)
    })

    const otherLinks = footerLinks.footerLinks1.map((obj, index) => {
        return (
            <div
                className="footerLinkWrapper"
                key={index}
            >
                <Link to={obj.path} className="link">{t(obj.name)}</Link>
                <Underliner width={"0"} />
            </div>
        )
    })

    return (
        <footer className={clsx(["footer", "stretchX", "relative", "minorColor1Text", "mainColor"])}>
            <section className={clsx(["followUs", "relative", "centerX"])}>
                <div className="loginHeader">
                    <h3>{t("footer.followUs")}</h3>
                    <Underliner width={"80%"} />
                </div>
                <div className={"logoWrapper"}>
                    <a className="icon" href={links.fb} target="_blank" rel="noreferrer">
                        <div></div>
                        <FacebookLogo id="fb" scale={1} />
                    </a>
                    <a className="icon" href={links.yb} target="_blank" rel="noreferrer">
                        <div></div>
                        <YoutubeLogo id="yb" scale={1.32} />
                    </a>
                    <a className="icon" href={links.ig} target="_blank" rel="noreferrer">
                        <div></div>
                        <InstagramLogo fill={"url(#rg)"} id="ig" scale={1} />
                    </a>
                </div>
            </section>
            <section className={clsx(["other", "linkCol", "centerX", "relative"])}>
                <div className="loginHeader">
                    <h3>{t("footer.other")}</h3>
                    <Underliner width={"80%"} />
                </div>
                {otherLinks}
            </section>
            <section className={clsx(["gymtour", "linkCol", "centerX", "relative"])}>
                <div className="loginHeader">
                    <h3>{t("footer.gymtour")}</h3>
                    <Underliner width={"80%"} />
                </div>
                {gymtourLinks}
            </section>
            <section className={"copyRight"}><a href="https://github.com/lukasbriza" rel="noreferrer" target="_blank">© {new Date().getFullYear()} Lukáš Bříza Web Development</a></section>
        </footer>
    )
}

export { Footer }