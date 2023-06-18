import { FC, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { SearchIcon } from "../../SVG/_index"
import { SearchBarProps } from "./_types"
import clsx from "clsx"
import { useClickOutside } from "@lukasbriza/lbui-lib"
import { useTranslation } from "react-i18next"

export const SearchBar: FC<SearchBarProps> = (props) => {
    const { t } = useTranslation()
    const { name, className } = props
    const ref = useRef<HTMLDivElement>(null)
    const { outside } = useClickOutside(ref);
    const [filled, setFilled] = useState<boolean>(false)
    const { setValue } = useFormContext()

    const handleChange = (e: React.BaseSyntheticEvent) => {
        setValue(name, e.target.value)
        String(e.target.value).length > 0 ? setFilled(true) : setFilled(false)
    }

    return (
        <div
            className={clsx([
                "searchBar",
                filled && "searchBarFilled",
                !outside && "searchBarActive",
                className
            ])}
            ref={ref}
        >
            <input
                type="text"
                placeholder={t("contentPage.search")}
                onChange={handleChange}
            />
            <button className={clsx(["submitButton", "searchIconWrapper"])} type="submit">
                <SearchIcon className={"searchIcon"} />
            </button>
        </div>
    )
}