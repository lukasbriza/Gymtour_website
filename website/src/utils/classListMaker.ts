const classListMaker = (classList:string[]) => {
    let classes=""
    for (let i = 0; i < classList.length; i++) {
        if(i===0){
            classes += classList[i]
        } else {
            classes += " "+classList[i]
        }
    }
    return(classes)
}

export {classListMaker}