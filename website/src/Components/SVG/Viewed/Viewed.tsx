import { FC } from "react"
import { ViewedProps } from "./_types"

export const Viewed: FC<ViewedProps> = (props) => {
    const { width, height, ...otherProps } = props
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={width} height={height} {...otherProps}>
            <path d="M31.299 15.25C28.15 9.8 22.289 6.414 16 6.414S3.85 9.8.701 15.25a1.5 1.5 0 0 0 0 1.5C3.85 22.2 9.711 25.586 16 25.586S28.15 22.2 31.299 16.75a1.5 1.5 0 0 0 0-1.5zM16 22.586A14.714 14.714 0 0 1 3.763 16c2.7-4.084 7.311-6.586 12.237-6.586S25.537 11.916 28.237 16A14.714 14.714 0 0 1 16 22.586z" />
            <path d="M16 10.446c-3.063 0-5.554 2.491-5.554 5.554s2.492 5.554 5.554 5.554 5.554-2.491 5.554-5.554-2.491-5.554-5.554-5.554zm0 8.108c-1.408 0-2.554-1.146-2.554-2.554s1.146-2.554 2.554-2.554 2.554 1.146 2.554 2.554-1.146 2.554-2.554 2.554z" />
        </svg>
    )
}
