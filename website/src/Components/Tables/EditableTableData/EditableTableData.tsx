import { FC, useEffect, useRef, useState } from "react";
import { EditableTableDataProps } from "./_types";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import { OverflowTextTooltip } from "src/components/_index";

export const EditableTableData: FC<EditableTableDataProps> = (props) => {
    const { children, name, editInputClass, ...otherProps } = props
    const { register, watch, setValue } = useFormContext()
    const td = useRef<HTMLTableCellElement>(null)
    const beforeEditValue = useRef<string>(children)
    const [editable, setEditable] = useState<boolean>(false)
    const content = watch(name)

    useEffect(() => {
        const { current } = td
        const handleEvent = () => {
            if (current) {
                const attr = current.getAttribute("data-editable")
                if (attr === "false") {
                    setEditable(false)
                }
                if (attr === "true") {
                    setEditable(true)
                }
                if (attr === "canceled") {
                    setValue(name, beforeEditValue.current)
                    current.setAttribute("data-editable", "false")
                    setEditable(false)
                }
            }
        }
        current && current.addEventListener("data-editable-changed", handleEvent)
        return () => {
            current && current.removeEventListener("data-editable-changed", handleEvent)
        }
    }, [])

    return (
        <td data-editable={"false"} data-name={name} ref={td} className="editableTableData" {...otherProps}>
            <input type="text" defaultValue={children} className={clsx(["editableTableDataInput", !editable && "hideEditableTableDataInput", editInputClass])} {...register(name)} />
            {!editable && (
                <OverflowTextTooltip content={content} tooltipId={name}>
                    {content ?? children}
                </OverflowTextTooltip>
            )}
        </td>
    )
}