import { Loading } from '../Loading'


const IsLoading = (Component: any) => ({ ...props }) => {
    if (props.loading === true) {
        return <Loading size={"10px"} distance={"3px"} y={"20px"} duration={0.7} />
    } else {
        return <Component {...props} />
    }
}

export { IsLoading }