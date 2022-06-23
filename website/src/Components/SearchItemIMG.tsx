//FUNCTUION//
import React, { ImgHTMLAttributes } from 'react'
import { classListMaker } from '../Functions/classListMaker'

const SearchItemIMG = ({ loading, setImgLoaded, alt, ...props }: {
    loading: boolean,
    setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    alt: string,
    props: ImgHTMLAttributes<any>
}) => {
    //////////////////////////////////////////////////
    //VARIABLES//
    const imgClasses = classListMaker(["searchImg", "absolute"])

    //////////////////////////////////////////////////
    //SETUP//
    return <img alt={alt} className={imgClasses} onLoad={() => { setImgLoaded(true) }} {...props} />
}

export { SearchItemIMG }