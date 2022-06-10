import { useRef, useEffect, useState } from 'react'
import { Heart } from '../Components/SVG/Heart'
import { Topped } from '../Components/SVG/Topped'
import { Tilt } from '../Components/Tilt'
import { IsLoading } from './HOCs/IsLoading'
import { SearchItemIMG } from '../Components/SearchItemIMG'
//CONFIG//
import { config, animationStore } from '../config/mainConfiguration'
//CONTEXT//
//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

interface SearchItemTypeFitness {
    data: {
        pictures: {
            detail: {
                main: string,
                others: string[]
            },
            card: string
        },
        topped: boolean,
        views: number,
        likedBy: string[],
        name: string,
        street: string,
        town: number,
        region: number,
        IN: number,
        priceLevel: number,
        contact: {
            tel?: number,
            mobile?: number,
            email: string,
            web?: string,
            facebook?: string,
            twitter?: string,
            google?: string,
            instagram?: string,
            youtube?: string,
        },
        filters: {
            equipment: number[],
            general?: number[],
            others?: number[]
        }
        open: {
            mon: { from: number, to: number },
            tue: { from: number, to: number },
            wed: { from: number, to: number },
            thu: { from: number, to: number },
            fri: { from: number, to: number },
            sat: { from: number, to: number },
            sun: { from: number, to: number }
        }
        descriptionBasic: string,
        descriptionFull: string,
    }
}
const SearchItemFitness = ({ data }: SearchItemTypeFitness) => {
    //////////////////////////////////////////////////
    //STATE//
    const [imgLoaded, setImgLoaded] = useState<boolean>(false)
    //////////////////////////////////////////////////
    //VARIABLES//
    const searchItemClasses = classListMaker(["searchItem", "relative"])
    const itemBar = classListMaker(["itemBar", "absolute", "left", "bottom", "stretchX"])
    const popularityCounterClasses = classListMaker(["popularityCounter", "absolute", "top", "left"])
    const viewsCounterClasses = classListMaker(["viewsCounter", "absolute", "top", "right"])

    const hearthRef = useRef<SVGSVGElement>(null)
    const toppedRef = useRef<SVGSVGElement>(null)

    const tiltOptions = {
        reverse: true,
        max: 9,
        perspective: 1500,
        glare: true,
        "max-glare": 0.2,
        "glare-prerender": false
    }
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {
    }, [])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const handleClick = () => {
        console.log("handleClick")
    }
    //////////////////////////////////////////////////
    //SETUP//
    const WithLoadingImg = IsLoading(SearchItemIMG)

    return (

        <Tilt
            className={searchItemClasses}
            options={tiltOptions}
            onClick={() => { handleClick() }}
        >
            <WithLoadingImg
                alt={data.name + " cardImg"}
                loading={!imgLoaded}
                onLoad={() => { setImgLoaded(true) }}
            />

            <div
                className={popularityCounterClasses}
            >
                <Heart
                    className="popularityImgWrapper"
                    ref={hearthRef}
                />
                <p>
                    {data.likedBy.length}
                </p>
            </div>
            <div
                className={viewsCounterClasses}
            >
                x{data.views}
            </div>
            <div className={itemBar}>
                <h3>{data.name}</h3>
                <Topped
                    className="toppedImgWrapper"
                    ref={toppedRef}
                    topped={data.topped}
                />
            </div>
        </Tilt>

    )
}


const SearchItemCoach = ({ data }: any) => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    //////////////////////////////////////////////////
    //ANIMATIONS//
    useEffect(() => {

    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <></>
    )
}

//HOC SUBSCRIBTION//

export { SearchItemFitness, SearchItemCoach }

