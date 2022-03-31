const Underliner = ({ id, width, color }: Underliner) => {

    return (
        <div className="underliner" id={id} style={{ width: width, background: color ? color : "white" }}></div>
    )
}

export { Underliner }