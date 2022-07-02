import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Tilt = (props: any) => {
    const { options, ...rest } = props
    const tilt = useRef<any>(null)

    useEffect(() => {
        VanillaTilt.init(tilt.current, options)
    }, [options])


    return (
        <section ref={tilt} {...rest}>
            {props.children}
        </section>
    )
}

export { Tilt }