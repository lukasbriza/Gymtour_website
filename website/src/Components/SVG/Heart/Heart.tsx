import { Ref, forwardRef } from "react"
import { HeartProps } from "./_types"

const Heart = forwardRef((
    props: HeartProps,
    ref: Ref<SVGSVGElement>
) => {
    const { width = 34, height = 34, ...otherProps } = props
    return (
        <svg
            height={width}
            viewBox="1 0 20 29"
            width={height}
            xmlns="http://www.w3.org/2000/svg"
            ref={ref}
            {...otherProps}
        >
            <path
                d="M11.466 22.776a.746.746 0 0 0 1.068 0l9.594-9.721C26.129 9.002 23.286 2 17.596 2 14.179 2 12.611 4.511 12 4.98 11.386 4.509 9.828 2 6.404 2 .732 2-2.146 8.984 1.873 13.055z"
                className="heart"
            />
        </svg>
    )
})


export { Heart }