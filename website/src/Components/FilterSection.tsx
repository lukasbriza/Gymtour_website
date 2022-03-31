import React, { useState } from 'react';
import { FilterHeader } from '../Components/FilterHeader'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
import { text } from '../config/textSource'
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

const FilterSection = React.memo((props: any) => {
    const filterSectionClasses = classListMaker(["filterSection"])
    return (
        <div
            className={filterSectionClasses}
        >
            <FilterHeader title={"Title Test"} />
        </div>
    )
})

export { FilterSection }