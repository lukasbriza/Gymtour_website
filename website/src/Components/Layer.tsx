

const Layer = (props: any) => {
    let className = ""
    if (props.className !== undefined) { className = props.className }
    return (
        <div className={"layer " + className}>
            {props.children}
        </div>
    )
}

export { Layer }