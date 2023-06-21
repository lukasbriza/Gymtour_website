import { FC, useEffect, useRef } from "react";
import { ContentHeaderProps } from "./_types";
import { fadeIn } from "src/animations/_index";
import { BigLogo } from "../SVG/_index";

export const ContentHeader: FC<ContentHeaderProps> = (props) => {
    const { text, ...other } = props
    const header1 = useRef<HTMLHeadingElement>(null)
    const header2 = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        fadeIn(header1.current, { stagger: 0, duration: 0.5 })
        fadeIn(header2.current, { stagger: 0, duration: 0.5, delay: 0.2 })
    }, [])

    return (
        <div className={"contentHeader"} {...other}>
            <BigLogo scale={0.9} strokeWidth={6} className={"bigLogoContentHeader"} />
            <div className={"contentHeaderWrapper"}>
                <h1 ref={header1}>{text}</h1>
                <h1 ref={header2}>{text}</h1>
            </div>
        </div>
    )
}