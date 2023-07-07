import { FC } from "react"
import { InfoProps } from "./_types"

export const Info: FC<InfoProps> = (props) => {
    const { width, height, viewBox, ...otherProps } = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width ?? 16}
            height={height ?? 16}
            viewBox={viewBox ?? "0 0 24 24"}
            {...otherProps}
        >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15a1 1 0 0 1-2 0v-6a1 1 0 0 1 2 0Zm-1-9a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 8Z" />
        </svg>
    )
}
