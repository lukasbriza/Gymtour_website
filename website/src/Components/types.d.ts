//GLOBAL TYPES//
type MenuOffer = {
    className: string
    offer: {name: string, path: string, component: any}[],
    show: boolean
}

type Hamburger = {
    className: string,
    isActive: ()=> void,
    hamburger: boolean
}

type SmallLogo = {
    className: string,
    scale: number
}

type SmallText = {
    className: string,
    scale: number
}

type MenuLayer = {
    offer: {name: string, path: string, component: any}[],
    show: boolean
}