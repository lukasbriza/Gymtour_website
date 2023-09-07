import { FC, forwardRef, useEffect, useRef, useState } from "react"
import { CardProps } from "./_types"
import { Props } from "@lukasbriza/lbui-lib"
import clsx from "clsx"
import { Loading } from "../Loading/Loading"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useCoachFilterContext, useFitnessFilterContext, useImageStoreContext, usePopUpContext, useServerdataLazy, useUserContext } from "src/hooks"
import { Coach, Fitness, addCoachLike, addFitnessLike, getCoaches, getFitnesses, getImage, updateViews } from "src/fetcher"
import { Heart, Topped, Viewed } from "../SVG/_index"
import { card } from "src/config"
import { OverflowTextTooltip } from ".."

export const Card: FC<CardProps> = (props) => {
    const heart = useRef<SVGSVGElement>(null)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { addToStore, getFromStore } = useImageStoreContext()

    const { fetchCall: updateViewsCall } = useServerdataLazy(updateViews)
    const { fetchCall: getImageCall, loading: getImageLoading } = useServerdataLazy(getImage)
    const { fetchCall: fitnessLike } = useServerdataLazy(addFitnessLike)
    const { fetchCall: coachLike } = useServerdataLazy(addCoachLike)
    const { fetchCall: fetchCoach } = useServerdataLazy(getCoaches)
    const { fetchCall: fetchFitness } = useServerdataLazy(getFitnesses)

    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    const { updateFitness } = useFitnessFilterContext()
    const { updateCoach } = useCoachFilterContext()
    const { userId, logged } = useUserContext()
    const { warning } = usePopUpContext()

    const {
        _id,
        topped,
        name,
        views = 0,
        type,
        popularity,
        pictures,
    } = props

    const isLoading = loading || getImageLoading

    const handleClick = async (e: React.BaseSyntheticEvent) => {
        if (!heart.current?.contains(e.target)) {
            const updateProps = type === "coach" ? { coach: [_id || ""] } : { fitness: [_id || ""] }
            updateViewsCall(updateProps)
            navigate(`/detail/${_id}`)
        }
    }

    const handleHeartClick = async () => {
        if (!logged) {
            warning({ header: t("contentPage.popUp.cantLikeHeader"), text: t("contentPage.popUp.cantLikeText") })
            return
        }
        if (_id) {
            const callQuery = { id: userId, target: _id }
            const likeResponse = type === "coach" ? await coachLike(callQuery) : await fitnessLike(callQuery)

            if (likeResponse?.data) {
                const query = { id: _id }
                const cardDataresult = type === "coach" ? await fetchCoach(query) : await fetchFitness(query)

                if (cardDataresult?.data && type === "coach") {
                    const coach = cardDataresult.data[0] as Coach
                    updateCoach(coach)
                    return
                }
                if (cardDataresult?.data && type === "fitness") {
                    const fitness = cardDataresult.data[0] as Fitness
                    updateFitness(fitness)
                    return
                }
            }
        }
    }


    useEffect(() => {
        const getImage = async () => {
            setLoading(true)
            const result = await getImageCall({ id: pictures.card })
            if (result) {
                return addToStore(pictures.card, result.blob)
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

    useEffect(() => {
        console.log(popularity?.length)
    }, [popularity])

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
                <OverflowTextTooltip tooltipId="nameTooltip" className="cardNameWrapper" content={name}>
                    {name}
                </OverflowTextTooltip>
                <InfoElement className="heartWrapper">
                    <Heart
                        ref={heart}
                        className={clsx(["heart", ((logged && popularity && popularity.includes(userId)) || !logged) && "filledHeart"])}
                        width={20}
                        height={18}
                        onClick={handleHeartClick}
                    />
                    <div className={clsx(["likeNumber", "infoNumber"])}>{popularity?.length}</div>
                </InfoElement>
            </div >
        </div >
    )
}

const InfoElement = forwardRef<HTMLDivElement, { children: React.ReactNode } & Props<HTMLDivElement>>((props, ref) => {
    const { children, className, ...otherProps } = props
    return (
        <div className={clsx(["infoElement", className])} ref={ref} {...otherProps}>{children}</div>
    )
})

