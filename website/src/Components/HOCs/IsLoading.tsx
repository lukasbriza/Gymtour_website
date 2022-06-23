import React from 'react'
import { Loading } from '../Loading'


const IsLoading = (Component: any) => ({ ...props }) => {

    if (props.loading === true) {
        return (
            <React.Fragment>
                <Loading size={"10px"} distance={"3px"} y={"20px"} duration={0.7} />
                <Component {...props} style={{ opacity: 0, position: "absolute", top: "0px" }} />
            </React.Fragment>
        )
    } else {
        return <Component {...props} />
    }
}

export { IsLoading }