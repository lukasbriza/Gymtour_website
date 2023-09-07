import { FC } from "react";
import { LoadingWrapperProps } from "./_types";
import { Loading } from "./Loading";

export const LoadingWrapper: FC<LoadingWrapperProps> = (props) => {
    const { loading, children, ...otherProps } = props
    return (
        <>
            {
                loading ? <Loading {...otherProps} /> : children
            }
        </>
    )
}