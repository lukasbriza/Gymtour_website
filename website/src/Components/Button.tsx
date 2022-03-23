import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
    onClick: (e: any) => void,
    modificationClass?: string,
    initialClass: string,
    hoverClass: string,
    transitionClass?: string,
    path?: string,
    text: string
}

const Button = ({ onClick, initialClass, hoverClass, transitionClass, modificationClass, text, ...props }: ButtonProps) => {
    const [isActive, setActive] = useState(false)
    const [buttonClass, setClass] = useState<string>(initialClass)

    function handleTouchStart() {
        setActive(true)
    }
    function handleTouchEnd(e: any) {
        onClick(e)
        setActive(false)
    }
    function handleMouseEnter() {
        setActive(true)
    }
    function handleMouseLeave() {
        setActive(false)
    }
    function handleClick(e: any) {
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
            <div
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
            </div>
        )
    }
}

export { Button }