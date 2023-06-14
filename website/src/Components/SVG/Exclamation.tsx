import { SVGProps } from "react"

const Exclamation = (props: SVGProps<SVGSVGElement>) => (
    <svg
        clipRule="evenodd"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit={2}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        {...props}
    >
        <path
            d="M12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497S20.5 6.846 20.5 11.536s-3.808 8.498-8.498 8.498zm0-6.5a.75.75 0 0 1-.75-.75v-5.5a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-.75.75zm-.002 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            fillRule="nonzero"
        />
    </svg>
)

export { Exclamation }