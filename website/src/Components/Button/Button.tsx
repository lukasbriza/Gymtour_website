import { Props } from '@lukasbriza/lbui-lib'
import clsx from 'clsx'
import React, { useState, FC } from 'react'
import { useNavigate } from 'react-router'


type ButtonProps = {
    onClick?: (e: React.BaseSyntheticEvent) => void,
    modificationClass?: string,
    initialClass: string,
    hoverClass: string,
    transitionClass?: string,
    path?: string,
    text: string,
    disabled?: boolean,
    icon?: React.ReactNode,
    iconClass?: string
} & Props<HTMLButtonElement>

export const Button: FC<ButtonProps> = (props) => {
    const { onClick, initialClass, hoverClass, transitionClass, modificationClass, text, icon, iconClass, disabled = false, path, ...otherProps } = props
    const [isActive, setActive] = useState(false)
    const navigate = useNavigate()

    const handleRedirect = () => {
        if (path) {
            navigate(path)
        }
    }

    const handleTouchStart = () => setActive(true)
    const handleTouchEnd = (e: React.BaseSyntheticEvent) => {
        handleRedirect()
        onClick?.(e)
        setActive(false)
    }
    const handleMouseEnter = () => setActive(true)
    const handleMouseLeave = () => setActive(false)
    const handleClick = (e: React.BaseSyntheticEvent) => {
        handleRedirect()
        onClick?.(e)
    }

    return (
        <button
            onClick={handleClick}
            className={clsx([modificationClass, "pageButton"])}
            disabled={disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            {...otherProps}
        >
            <div
                className={clsx([initialClass, isActive && hoverClass, transitionClass])}
            >
                {icon && <div className={clsx(['buttonIcon', iconClass])}>{icon}</div>}
                {text}
            </div>
        </button>
    )
}
