import { Button, Layer } from "@components"
import { routes } from "@config"
import trainer from '@assets/trainer.webp'
import clsx from "clsx"
import { FC } from "react"
import { text } from "src/config/textSource"

export const CoachPage: FC = () => {
    return (
        <section
            id="CoachSection"
            className={clsx(["stretchX", "stretchVH", "relative", "minHeightWidth", "CoachSection"])}
        >
            <img src={trainer} alt="TrainerBckgImg" />
            <Layer className={clsx(["stretchY", "stretchX"])}>
                <h1 className={"coachSectionHeader"}>{text.crossroad.CoachPage.Header.cz}</h1>
                <div className={"coachSectionParagraph"}>
                    {text.crossroad.CoachPage.Paragraph.cz}
                </div>
                <Button
                    path={routes.coach.path}
                    onClick={() => { console.log("clicked") }}
                    modificationClass={"crossroadButton"}
                    initialClass={'buttonInitial'}
                    hoverClass={'buttonHover'}
                    text={text.crossroad.CoachPage.Button.cz}
                />
            </Layer>
        </section>
    )
}