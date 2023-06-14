import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
//FUNCTIONS//
import { classListMaker } from '../../../utils/classListMaker'

const PriceLevelSection = ({ onChange }: { onChange: (x: number) => void }) => {
    //////////////////////////////////////////////////
    //STATE//
    //////////////////////////////////////////////////
    //VARIABLES//
    const price1 = useRef(null)
    const price2 = useRef(null)
    const price3 = useRef(null)

    const tooltipClasses = classListMaker(["tooltiptext", "tooltip-top"])
    const priceLevelSectionclasses = classListMaker(["priceLevelSection", "relative", "centerX"])
    const priceClasses = classListMaker(["price"])
    //////////////////////////////////////////////////
    //FUNCTIONS//
    const handleClick = (level: 1 | 2 | 3, ref: React.MutableRefObject<null>) => {
        onChange(level)
        gsap.to(ref.current, { backgroundColor: '#707070' })
    }
    //////////////////////////////////////////////////
    //EFFECTS//
    useEffect(() => {
        gsap.to(price1.current, { backgroundColor: '#707070' })
    }, [])
    //////////////////////////////////////////////////
    //SETUP//
    return (
        <section className={priceLevelSectionclasses}>
            <div className={priceClasses} ref={price1} onClick={() => {
                handleClick(1, price1);
                gsap.to(price2.current, { backgroundColor: '#0f0f0f' });
                gsap.to(price3.current, { backgroundColor: '#0f0f0f' });
            }}>
                <div className={'svgDollar'}>$</div>
                <span className={tooltipClasses}>
                    Tooltip text
                </span>
            </div>
            <div className={priceClasses} ref={price2} onClick={() => {
                handleClick(2, price2);
                gsap.to(price1.current, { backgroundColor: '#0f0f0f' });
                gsap.to(price3.current, { backgroundColor: '#0f0f0f' });
            }}>
                <div className={'svgDollar'}>$$</div>
                <span className={tooltipClasses}>
                    Tooltip text
                </span>
            </div>
            <div className={priceClasses} ref={price3} onClick={() => {
                handleClick(3, price3);
                gsap.to(price1.current, { backgroundColor: '#0f0f0f' });
                gsap.to(price2.current, { backgroundColor: '#0f0f0f' });
            }}>
                <div className={'svgDollar'}>$$$</div>
                <span className={tooltipClasses}>
                    Tooltip text
                </span>
            </div>
        </section>
    )
}

export { PriceLevelSection }