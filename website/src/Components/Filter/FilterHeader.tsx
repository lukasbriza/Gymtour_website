import React, { useEffect } from "react"
import { Underliner } from "../Underliner/Underliner"
//FUNCTUION//
import { classListMaker } from '../../utils/classListMaker'

const FilterHeader = React.memo(React.forwardRef((props: filterHeader, ref: any) => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    const headerWrapperClasses = classListMaker(["filterHeaderWrapper", "pointer"])
    const arrowWrapperClasses = classListMaker(["filterArrowWrapper"])
    const lineArrowClasses = classListMaker(["filterArrowLine", "relative"])
    //////////////////////////////////////////////////
    //ANIMATIONS//
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <div
            className={headerWrapperClasses}
            onClick={() => { props.onClick() }}
        >
            <h2>{props.title}</h2>
            <div
                ref={ref}
                className={arrowWrapperClasses}
            >
                <div className={lineArrowClasses}></div>
                <div className={lineArrowClasses}></div>
            </div>
            <Underliner width={"100%"} color={"black"} />
        </div>
    )
}))

export { FilterHeader }