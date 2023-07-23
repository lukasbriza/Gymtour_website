import { FC, useState } from "react";
import { PriceLevelProps } from "./_types";
import { useFormContext } from "react-hook-form";
import { Dollar } from "src/components/SVG/_index";
import clsx from "clsx";

export const PriceLevel: FC<PriceLevelProps> = (props) => {
    const { setValue } = useFormContext();
    const { name, defaultNumber, enableUndefined = true, ...otherProps } = props
    const [priceState, setPriceState] = useState<number | undefined>(defaultNumber ? defaultNumber : undefined)

    const handleDollarClick = (dollarNumber: number) => () => {
        if (dollarNumber === priceState) {
            if ((dollarNumber - 1) === 0) {
                setValue(name, enableUndefined ? undefined : dollarNumber)
                setPriceState(enableUndefined ? undefined : dollarNumber)
                return
            }
            setValue(name, dollarNumber - 1)
            setPriceState(dollarNumber - 1)
            return
        }
        setValue(name, dollarNumber)
        setPriceState(dollarNumber)
    }

    return (
        <div {...otherProps} className={clsx(["priceLevelWrapper"])}>
            <div>
                <Dollar
                    onClick={handleDollarClick(1)}
                    className={clsx(["dollar", priceState && priceState >= 1 && "dollarActive"])}
                    width={30}
                    height={30}
                />
            </div>
            <div>
                <Dollar
                    onClick={handleDollarClick(2)}
                    className={clsx(["dollar", priceState && priceState >= 2 && "dollarActive"])}
                    width={30}
                    height={30}
                />
            </div>
            <div>
                <Dollar
                    onClick={handleDollarClick(3)}
                    className={clsx(["dollar", priceState && priceState >= 3 && "dollarActive"])}
                    width={30}
                    height={30}
                />
            </div>
        </div>
    )
}
