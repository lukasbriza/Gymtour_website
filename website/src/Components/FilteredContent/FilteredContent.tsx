import { FC } from "react";
import { FilteredContentProps } from "./_types";
import { useFilterContext } from "@hooks";

export const FilteredContent: FC<FilteredContentProps> = () => {
    const context = useFilterContext()
    return <></>

}