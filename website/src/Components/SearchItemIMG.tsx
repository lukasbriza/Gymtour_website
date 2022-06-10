//FUNCTUION//
import { ImgHTMLAttributes } from 'react'
import { classListMaker } from '../Functions/classListMaker'

const SearchItemIMG = (props: ImgHTMLAttributes<any>) => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    const imgClasses = classListMaker(["searchImg", "relative", "stretchY"])

    //////////////////////////////////////////////////
    //SETUP//
    return <img alt={props.alt} className={imgClasses} {...props} />
}

export { SearchItemIMG }