import React, { useEffect, useState } from "react"
import { Underliner } from "./Underliner"
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const FilterHeader = React.memo((props: any) => {
    //////////////////////////////////////////////////
    //STATE//
    const [open, setOpen] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const headerWrapperClasses = classListMaker(["filterHeaderWrapper"])
    const arrowWrapperClasses = classListMaker(["filterArrowWrapper"])
    const lineArrowClasses = classListMaker(["filterArrowLine"])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => { }, [open])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            className={headerWrapperClasses}
        >
            <h2>{props.title}</h2>
            <div
                className={arrowWrapperClasses}
                onClick={() => { setOpen(!open) }}
                onTouchEnd={() => { setOpen(!open) }}
                onTouchCancel={() => { setOpen(open) }}
            >
                <div className={lineArrowClasses}></div>
                <div className={lineArrowClasses}></div>
            </div>
            <Underliner width={"100%"} color={"black"} />
        </div>
    )
})

export { FilterHeader }