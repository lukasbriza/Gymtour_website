import clsx from "clsx"
import { FC } from "react"
import { Layer, Button } from "@components"
import fitness from '@assets/fitness.webp'
import { text } from '../../config/textSource'
import { routes } from "@config"

export const FitnessPage: FC = () => {
    return (
        <section
            id="FitnessSection"
            className={clsx(["stretchX", "stretchVH", "relative", "minHeightWidth", "FitnessSection"])}
        >
            <img src={fitness} alt="FitnesBckgImg" />
            <Layer className={clsx(["stretchY", "stretchX"])}>

                <h1 className={"fitnessSectionHeader"}>
                    {text.crossroad.FitnessPage.Header.cz}
                </h1>
                <div className={"fitnessSectionParagraph"}>
                    {text.crossroad.FitnessPage.Paragraph.cz}
                </div>
                <Button
                    path={routes.fitness.path}
                    onClick={() => { console.log("clicked") }}
                    modificationClass={"crossroadButton"}
                    initialClass={'buttonInitial'}
                    hoverClass={'buttonHover'}
                    text={text.crossroad.FitnessPage.Button.cz}
                />

            </Layer>
        </section>
    )
}