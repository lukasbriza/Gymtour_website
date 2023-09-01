import clsx from "clsx";
import { FC, useRef, useState } from "react";
import { EditableTableRowProps } from "./_types";
import { CancelButton } from "../TableButtons/CancelButton";
import { SucessButton } from "../TableButtons/SucessButton";
import { EditButton } from "../TableButtons/EditButton";

export const EditableTableRow: FC<EditableTableRowProps> = (props) => {
    const { className, children, showOnHover = true, onButtonClick, ...otherProps } = props
    const [editable, setEditable] = useState<boolean>(false)
    const row = useRef<HTMLTableRowElement>(null)

    const handleTrueAttr = (item: HTMLTableCellElement | null) => {
        const attr = item?.getAttribute("data-editable")
        if (attr === "true") {
            item?.setAttribute("data-editable", "false")
            item?.dispatchEvent(new Event("data-editable-changed"))
            setEditable(false)
        }

    }

    const handleFalseAttr = (item: HTMLTableCellElement | null) => {
        const attr = item?.getAttribute("data-editable")
        if (attr === "false") {
            item?.setAttribute("data-editable", "true")
            item?.dispatchEvent(new Event("data-editable-changed"))
            setEditable(true)
        }
    }

    const handleEditButtonClick = () => {
        if (row.current) {
            for (let i = 0; i < row.current.cells.length; i++) {
                const item = row.current.cells.item(i)
                handleFalseAttr(item)
            }
        }
    }

    const handleSucessButtonClick = () => {
        if (row.current) {
            for (let i = 0; i < row.current.cells.length; i++) {
                const item = row.current.cells.item(i)
                handleTrueAttr(item)
            }
        }
    }

    const handleCancel = () => {
        if (row.current) {
            for (let i = 0; i < row.current.cells.length; i++) {
                const item = row.current.cells.item(i)
                const attr = item?.getAttribute("data-editable")
                if (attr !== "noedit" && attr) {
                    item?.setAttribute("data-editable", "canceled")
                    item?.dispatchEvent(new Event("data-editable-changed"))
                    setEditable(false)
                }
            }
        }
    }

    return (
        <tr
            className={clsx([className, showOnHover && "hoverableEditableTableRow"])}
            {...otherProps}
            ref={row}
        >
            {children}
            <td className={"buttonTableData"} data-editable={"noedit"}>
                <SucessButton onClick={handleSucessButtonClick} className={clsx([!editable && "hide"])} />
                <EditButton onClick={handleEditButtonClick} className={clsx([editable && "hide"])} />
                <CancelButton onClick={handleCancel} className={clsx([!editable && "hide"])} />
            </td>
        </tr>
    )
}