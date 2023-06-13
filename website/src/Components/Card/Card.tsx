import { FC, forwardRef, useEffect, useRef, useState } from "react"
import { CardProps } from "./_types"
import { Heart, Topped, Viewed } from "@svg"
import { Props } from "@lukasbriza/lbui-lib"
import clsx from "clsx"
import { Loading } from "../Loading/Loading"
import { getImage, updateViews } from "@fetchers"
import { useImageStoreContext, usePopUpContext, useServerdataLazy, useUsercontext } from "@hooks"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { card } from "@config"
import { Tooltip } from "@components"


export const Card: FC<CardProps> = (props) => {
    const nameref = useRef<HTMLDivElement>(null)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { addToStore, getFromStore } = useImageStoreContext()
    const { fetchCall: updateViewsCall } = useServerdataLazy(updateViews)
    const { fetchCall: getImageCall, loading: getImageLoading } = useServerdataLazy(getImage)
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
    const [showFullName, setShowFullName] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const {
        _id,
        topped,
        name,
        views = 0,
        type,
        popularity,
        pictures,
    } = props

    const allowTooltip = nameref.current && (nameref.current.scrollWidth > nameref.current.clientWidth)

    const { userId, logged } = useUsercontext()
    const { warning } = usePopUpContext()
    const isLoading = loading || getImageLoading

    const handleClick = async () => {
        const updateProps = type === "coach" ? { coach: [_id || ""] } : { fitness: [_id || ""] }
        updateViewsCall(updateProps)
        navigate(`/detail/${_id}`)
    }

    const handleShowFullName = () => {
        if (allowTooltip) {
            setShowFullName(true)
        }
    }

    const handleHideFullName = () => setShowFullName(false)

    const handleHeartClick = () => {
        if (!logged) {
            warning({ header: t("contentPage:popUp.cantLikeHeader"), text: t("contentPage:popUp.cantLikeText") })
            return
        }
        //TODO
    }


    useEffect(() => {
        const getImage = async () => {
            setLoading(true)
            const result = await getImageCall({ id: pictures.card })
            if (result) {
                return addToStore(pictures.card, result)
            }
        }
        const storedImage = getFromStore(pictures.card)

        if (storedImage && !imageSrc) {
            setImageSrc(storedImage)
            return
        }
        getImage().then((src) => {
            setImageSrc(src)
            setLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="contentCard" id={_id} onClick={handleClick} style={{ width: card.width, height: card.height }}>
            <InfoElement className="viewed">
                <div className={clsx(["viewNumber", "infoNumber"])}>{views}x</div>
                <Viewed width={22} height={22} />
            </InfoElement>
            {topped?.value && <Topped className="topped" topped={true} width={20} height={20} />}
            <div className="imgSection">
                {
                    isLoading ?
                        <Loading className="loading" /> :
                        <img
                            src={imageSrc}
                            alt={name}
                            width={card.width}
                            height={card.height}
                        />
                }
            </div>
            <div className="infoSection">
                <Tooltip text={name}>
                    <InfoElement className="cardNameWrapper">
                        {/*name*/}123456789 123456789 123asdasda
                    </InfoElement>
                </Tooltip>
                <InfoElement className="heartWrapper">
                    <Heart
                        className={clsx(["heart", ((logged && popularity && popularity.includes(userId)) || !logged) && "filledHeart"])}
                        width={20}
                        height={18}
                        onClick={handleHeartClick}
                    />
                    <div className={clsx(["likeNumber", "infoNumber"])}>{popularity?.length}</div>
                </InfoElement>
            </div>
        </div>
    )
}

const InfoElement = forwardRef<HTMLDivElement, { children: React.ReactNode } & Props<HTMLDivElement>>((props, ref) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={clsx(["infoElement", className])} ref={ref} {...otherProps}>{children}</div>
    )
})

