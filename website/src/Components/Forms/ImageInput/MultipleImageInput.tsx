import { FC, ReactElement, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ImperativeMultipleImageInput, MultipleImageInputProps } from "./_types";
import { ImageInput } from "./ImageInput";
import clsx from "clsx";

const toFileList = (list: File[]) => {
    const data = new DataTransfer()
    list.forEach((file) => {
        data.items.add(file)
    })
    return data.files
}

export const MultipleImageInput: FC<MultipleImageInputProps> = forwardRef<ImperativeMultipleImageInput, MultipleImageInputProps>((props, ref) => {
    const { className, onChange, value = [], onBlur, name } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const [components, setComponents] = useState<ReactElement[]>([])

    const handleChange = (file?: File) => {
        if (file && inputRef.current) {
            const newFile = file
            const id = Math.random()

            const fileList = (inputRef.current.files && Array.from(inputRef.current?.files)) ?? []
            fileList.push(newFile)
            inputRef.current.files = toFileList(fileList)

            onChange?.(fileList)

            setComponents((value) => [
                ...value,
                <ImageInput
                    id={`multipleInput-${id}`}
                    key={`multipleInput-${id}`}
                    name={`multipleInput-${id}`}
                    showPreview={true}
                    tooltipPlace="bottom"
                    onChange={handleChange}
                    onFileRemove={handleRemoveFile(`multipleInput-${id}`)}
                />
            ])
        }
    }

    const handleRemoveFile = (id: string) => (removingFile: File) => {
        if (inputRef.current && inputRef.current.files) {
            const filteredFiles = Array.from(inputRef.current.files).filter((file) => file.name !== removingFile.name)
            inputRef.current.files = toFileList(filteredFiles)

            onChange?.(filteredFiles)

            setComponents((comps) => [...comps.filter((comp) => comp.key !== id)])
        }
    }

    useEffect(() => {
        if (value.length > 0 && inputRef.current) {
            inputRef.current.files = toFileList(value)
            setComponents(
                [...value.map((file, index) => {
                    return (
                        <ImageInput
                            id={`multipleInput-${index}`}
                            key={`multipleInput-${index}`}
                            name={`multipleInput-${index}`}
                            showPreview={true}
                            value={file}
                            tooltipPlace="bottom"
                            onChange={handleChange}
                            onFileRemove={handleRemoveFile(`multipleInput-${index}`)}
                        />
                    )
                }),
                <ImageInput
                    id={`multipleInput-${value.length}`}
                    key={`multipleInput-${value.length}`}
                    name={`multipleInput-${value.length}`}
                    showPreview={true}
                    tooltipPlace="bottom"
                    onChange={handleChange}
                    onFileRemove={handleRemoveFile(`multipleInput-${value.length}`)}
                />
                ]
            )
            return
        }

        if (components.length === 0) {
            setComponents(
                [<ImageInput
                    id={`multipleInput-${0}`}
                    key={`multipleInput-${0}`}
                    name={`multipleInput-${0}`}
                    showPreview={true}

                    tooltipPlace="bottom"
                    onChange={handleChange}
                    onFileRemove={handleRemoveFile(`multipleInput-${0}`)}
                />]
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => {
        return {
            current: inputRef.current,
        }
    }, [])

    return (
        <section className={clsx(["multipleImageInput", className])} onBlur={onBlur}>
            {components.map((comp) => comp)}
            <input type="file" name={name} multiple ref={inputRef} style={{ display: "none" }} />
        </section>
    )
})

