import { FC } from "react"
import { EditProps } from "./_type"
export const Edit: FC<EditProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <path d="M19.172 2c-.724 0-1.448.276-2 .828L16 4l4 4 1.172-1.172a2.83 2.83 0 0 0-2-4.828zM14.5 5.5 3 17v4h4L18.5 9.5l-4-4z" />
    </svg>
)
