import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
    onClick: (e: React.BaseSyntheticEvent) => void,
    modificationClass?: string,
    initialClass: string,
    hoverClass: string,
    transitionClass?: string,
    path?: string,
    text: string,
    disabled?: boolean
}

const Button = ({ onClick, initialClass, hoverClass, transitionClass, modificationClass, text, disabled = false, ...props }: ButtonProps) => {
    const [isActive, setActive] = useState(false)
    const [buttonClass, setClass] = useState<string>(initialClass)

    function handleTouchStart() {
        setActive(true)
    }
    function handleTouchEnd(e: React.BaseSyntheticEvent) {
        onClick(e)
        setActive(false)
    }
    function handleMouseEnter() {
        setActive(true)
    }
    function handleMouseLeave() {
        setActive(false)
    }
    function handleClick(e: React.BaseSyntheticEvent) {
        onClick(e)
    }

    useEffect(() => {
        if (isActive === true) {
            setClass(`${initialClass} ${hoverClass}`)
        }
        if (isActive === false) {
            setClass(initialClass)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])

    if (props.path !== undefined) {
        return (
            <Link
                to={props.path}
                onClick={handleClick}
                className={`${modificationClass ? modificationClass : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`${buttonClass} ${transitionClass ? transitionClass : ''}`}
                >
                    {text}
                </div>
            </Link>
        )
    } else {
        return (
            <button
                onClick={handleClick}
                className={`${modificationClass ? modificationClass : ''} pageButton`}
                disabled={disabled}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`${buttonClass} ${transitionClass ? transitionClass : ''}`}
                >
                    {text}
                </div>
            </button>
        )
    }
}

export { Button }