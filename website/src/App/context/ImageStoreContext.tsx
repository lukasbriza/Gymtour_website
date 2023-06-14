import { FC, createContext, useCallback, useMemo, useState } from "react"
import { ContextProviderProps, ImageStoreContextType } from "./_types"

const imageStoreInitialState: ImageStoreContextType = {
    images: [],
    addToStore: () => { throw new Error('Context does not have a matching provider!') },
    removeFromStore: () => { throw new Error('Context does not have a matching provider') },
    getFromStore: () => { throw new Error('Context does not have a matching provider') },
}

export const ImageStoreContext = createContext<ImageStoreContextType>(imageStoreInitialState)
ImageStoreContext.displayName = "ImageStoreContext"

export const ImageStoreProvider: FC<ContextProviderProps> = ({ children }) => {
    const [imagesStore, setImagesStore] = useState<{ [key: string]: string }[]>([])

    const addToStore = useCallback((id: string, data: Blob) => {
        const isInStore = imagesStore.find((value) => value.id === id)
        if (isInStore === undefined) {
            const url = URL.createObjectURL(data)
            setImagesStore([...imagesStore, { [id]: url }])
            return url
        }
    }, [imagesStore])

    const removeFromStore = useCallback((id: string) => {
        const isInStoreIndex = imagesStore.findIndex((value) => value.id === id)
        if (isInStoreIndex !== -1) {
            URL.revokeObjectURL(imagesStore[isInStoreIndex][id])
            const cleanedStore = imagesStore.filter((value) => value.id !== id)
            setImagesStore(cleanedStore)
        }
    }, [imagesStore])

    const getFromStore = useCallback((id: string) => {
        const item = imagesStore.find((value) => value[id] === id)
        return item ? item[id] : undefined
    }, [imagesStore])

    const imgageStoreContext: ImageStoreContextType = useMemo(() => ({
        images: imagesStore,
        addToStore: addToStore,
        removeFromStore: removeFromStore,
        getFromStore: getFromStore
    }), [addToStore, getFromStore, imagesStore, removeFromStore])

    return (
        <ImageStoreContext.Provider value={imgageStoreContext}>
            {children}
        </ImageStoreContext.Provider>
    )
}