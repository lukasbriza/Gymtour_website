import { FC, useEffect, useRef } from "react"
import { ImagePreviewProps } from "./_types"
import { Cross } from "src/components/SVG/_index"
import { fadeOff, fadeIn } from "src/animations/effects"
import { gsap } from "gsap"

export const ImagePreview: FC<ImagePreviewProps> = (props) => {
    const { url, open, handleClose } = props
    const preview = useRef<HTMLElement>(null)
    const display = open === false ? { display: "none" } : {}

    useEffect(() => {
        fadeIn(preview.current, { duration: 0.45 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, preview])

    const handleCancel = () => {
        fadeOff(preview.current, { duration: 0.45 }).then(() => {
            gsap.set(preview.current, { clearProps: "all" })
            handleClose()
        })
    }

    return (
        <section className="imagePreview" ref={preview} style={display}>
            <div className="previewCancel" onClick={handleCancel}>
                <Cross scale={0.4} stroke={"white"} strokeWidth={3} />
            </div>
            <img src={String(url)} alt="preview" className="image" />
        </section>
    )
}