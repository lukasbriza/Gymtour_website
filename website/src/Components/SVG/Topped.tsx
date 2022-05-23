import * as React from "react"
import { SVGProps, Ref, forwardRef } from "react"

const Topped = forwardRef((
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={34}
        height={34}
        viewBox="-5 0 34 34"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <title>{"flame"}</title>
        <g fill="none" fillRule="evenodd">
            <path
                d="M23.555 25.1A11.979 11.979 0 0 1 0 21.857a7.933 7.933 0 0 1 .485-2.924C1.643 11.595 8.785 11.063 4.8 0c0 0 6.65 1.727 8 12.143 0 0 4.919-.163 1.6-7.286A21.311 21.311 0 0 1 24 20c.027 1.71-.122 3.42-.445 5.1Z"
                className="flamePath1"
            />
            <path
                d="M19 26.5a7.5 7.5 0 0 1-14.975.484L4 27s-.075-3.272 0-4c.684-6.611 2.6-9.563 5-14 .067-2.639-1.115 7.273 5 10a8.188 8.188 0 0 1 5 7.5Z"
                className="flamePath2"
            />
        </g>
    </svg>
))

export { Topped }
