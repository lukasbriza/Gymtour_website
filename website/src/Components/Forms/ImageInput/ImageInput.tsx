import { createPortal } from "react-dom";
import { ChangeEvent, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { ImageInputProps, ImperativeImageInput } from "./_types";
import clsx from "clsx";
import { fadeIn, fadeOff, hasLoaded, hasUnloaded } from "src/animations/_index";
import { SearchIcon } from "src/components/SVG/_index";
import { ImagePreview } from "./ImagePreview";
import { Tooltip } from "src/components";


export const ImageInput = forwardRef<ImperativeImageInput, ImageInputProps>((props, ref) => {
    const {
        onChange,
        onFileRemove,
        onBlur,
        onStart,
        onUnsupportedFileType,
        onSuccess,
        onNoFile,
        id,
        tooltipPlace = "right",
        className,
        name,
        value,
        allowedFileTypes,
        showPreview = false,
        ...otherProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const line1 = useRef<HTMLDivElement>(null)
    const line2 = useRef<HTMLDivElement>(null)
    const tooltipId = `${name}-tooltip`

    const reader = useMemo(() => new FileReader(), [])

    const [actualFile, setActualFile] = useState<File | null>(value ?? null)
    const [url, setUrl] = useState<string | null | ArrayBuffer>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [hasFiles, setHasFiles] = useState<boolean | undefined | null>()

    //const hasFiles = inputRef.current?.files && inputRef.current?.files.length > 0

    const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
        onStart?.()
        const target = event.target as HTMLInputElement
        const file = target.files && target.files[0]
        const fileType = file?.type
        if (file) {
            if (allowedFileTypes && !allowedFileTypes.includes(fileType ?? "")) {
                onUnsupportedFileType?.()
                return
            }
            setActualFile(file)
            onSuccess?.(file)
            onChange?.(file)
            hasLoaded(line1.current, line2.current)
            showPreview && fadeIn(searchRef.current)
            return
        }
        onNoFile?.()
    }

    const handleFileRemove = useCallback(() => {
        if (inputRef.current?.files) {
            hasUnloaded(line1.current, line2.current)
            if (showPreview) {
                fadeOff(searchRef.current).set(searchRef.current, { clearProps: "all" }).then(() => {
                    setTimeout(() => {
                        setActualFile(null)
                    }, 500)
                })
            }
            onFileRemove?.(inputRef.current?.files[0])
            inputRef.current.value = ""
        }
    }, [onFileRemove, showPreview])

    const handleButtonClick = () => inputRef.current && inputRef.current.click()

    const handleShowPreview = () => {
        if (actualFile) {
            reader.readAsDataURL(actualFile)
        }
        setOpen((value) => !value)
    }

    useImperativeHandle(ref, () => {
        return {
            current: inputRef.current,
            file: actualFile,
            removeFile: handleFileRemove
        }
    }, [actualFile, handleFileRemove])

    useEffect(() => {
        setHasFiles(inputRef.current?.files && inputRef.current?.files.length > 0)
    }, [inputRef])

    useEffect(() => {
        reader.addEventListener("load", () => setUrl(reader.result))
        return () => {
            reader.removeEventListener("load", () => setUrl(reader.result))
        }
    }, [reader])

    useEffect(() => {
        if (inputRef.current && value) {
            const list = new DataTransfer()
            list.items.add(value)
            inputRef.current.files = list.files
        }
    }, [value])

    useEffect(() => {
        if (value) {
            hasLoaded(line1.current, line2.current)
            showPreview && fadeIn(searchRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={clsx(["imageBtnWrapper", className])} {...otherProps} id={id}>
                <button
                    data-tooltip-id={tooltipId}
                    onClick={() => hasFiles ? handleFileRemove() : handleButtonClick()}
                    type="button"
                    className={clsx(["imageInput", "glassMorphism"])}
                >
                    <div ref={line1} className={clsx("imgLine")}></div>
                    <div ref={line2} className={clsx("imgLine")}></div>
                </button>
                {
                    showPreview &&
                    (<div
                        data-button={false}
                        ref={searchRef}
                        className={clsx(["preview", "glassMorphism", showPreview && actualFile === null && "hidden"])}
                        onClick={handleShowPreview}
                    >
                        <SearchIcon className="search" />
                    </div>)
                }

                <input
                    onBlur={onBlur}
                    onChange={handleFileSelect}
                    type="file"
                    name={name}
                    style={{ display: "none" }}
                    ref={inputRef}
                />
            </div>
            {showPreview && open && createPortal(<ImagePreview url={url} open={open} handleClose={() => setOpen(false)} />, document.body)}
            <Tooltip id={tooltipId} content={actualFile?.name ?? ""} place={tooltipPlace} />
        </>
    )
})