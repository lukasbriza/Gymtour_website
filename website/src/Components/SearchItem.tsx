import { useRef, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Heart } from '../Components/SVG/Heart'
import { Topped } from '../Components/SVG/Topped'
import { Tilt } from '../Components/Tilt'
import { IsLoading } from './HOCs/IsLoading'
import { SearchItemIMG } from '../Components/SearchItemIMG'
import fetchAgent from '../Functions/fetchAgent'

//FUNCTUION//
import { classListMaker } from '../Functions/classListMaker'

interface SearchItemType {
    data: {
        _id: string,
        pictures: {
            detail: {
                main: string,
                others: string[]
            },
            card: string
        },
        topped: { value: boolean, toDate: null | Date },
        views: number,
        popularity: string[],
        name: string,
    }
}

const tiltOptions = {
    reverse: true,
    max: 9,
    perspective: 1500,
    glare: true,
    "max-glare": 0.2,
    "glare-prerender": false
}

const SearchItem = ({ data }: SearchItemType) => {
    //////////////////////////////////////////////////
    //STATE//
    const [imgLoaded, setImgLoaded] = useState<boolean>(false)
    const [imgData, setImgData] = useState<string>()
    //////////////////////////////////////////////////
    //VARIABLES//
    const searchItemClasses = classListMaker(["searchItem", "relative"])
    const itemBar = classListMaker(["itemBar", "absolute", "left", "bottom", "stretchX"])
    const popularityCounterClasses = classListMaker(["popularityCounter", "absolute", "top", "left"])
    const viewsCounterClasses = classListMaker(["viewsCounter", "relative"])

    const location = useLocation()
    const hearthRef = useRef<SVGSVGElement>(null)
    const toppedRef = useRef<SVGSVGElement>(null)
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        //FETCH CARD IMG//
        getCardImg(data.pictures.card)
    }, [data.pictures.card])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const handleClick = () => {
        //SET VIEW +1//
        fetchAgent.updateViews({
            updateViews: {
                type: location.pathname === "/fitness" ? "/fitness" : "/coach",
                _id: data._id
            }
        }).then(result => {
            //VERIFY CALL RESULT//
            console.log(result)
        })
        //REDIRECT
        //history.push("/fitness/" + data._id)
    }
    const getCardImg = async (id: string) => {
        await fetchAgent.getImg({ id: id }, setImgData)
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
                setImgLoaded={setImgLoaded}
                loading={!imgLoaded}
                src={imgData}

            />
            <div
                className={popularityCounterClasses}
            >
                <Heart
                    className="popularityImgWrapper"
                    ref={hearthRef}
                />
                <p>
                    {data.popularity.length}
                </p>
            </div>
            <Topped
                className="toppedImgWrapper"
                ref={toppedRef}
                topped={data.topped.value}
            />
            <div className={itemBar}>
                <h3>{data.name}</h3>
                <div
                    className={viewsCounterClasses}
                >
                    x{data.views}
                </div>
            </div>
        </Tilt>
    )
}

export { SearchItem }

