import { Link } from "react-router-dom"
import { FC } from "react"
import clsx from "clsx"
import { useTranslation } from "react-i18next"
import { footerLinks } from "src/config/_index"
import { Underliner } from "../_index"
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
                <div className="headerWrapper">
                    <h3>{t("footer.followUs")}</h3>
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
                    <h3>{t("footer.other")}</h3>
                    <Underliner width={"80%"} />
                </div>
                {otherLinks}
            </section>
            <section className={clsx(["gymtour", "linkCol", "centerX", "relative"])}>
                <div className="headerWrapper">
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