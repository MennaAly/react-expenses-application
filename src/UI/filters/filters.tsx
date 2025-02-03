import React from "react";
import "./filters.css"
import { forwardRef, useMemo } from "react";
import DateFilter from "../date-filter/date-filter";
import { IDate } from "../../interfaces/uiInterfaces";

interface IFiltersProps {
    parentRect: DOMRect,
    filterDate: (from: IDate, to:IDate) => void
}

const Filters = forwardRef<HTMLDivElement, IFiltersProps>(({parentRect, filterDate}, ref) => {
    const top = useMemo(() => parentRect.top + 24, [parentRect.top]);
    return(
        <div ref={ref} className="filters" style={{top, left: parentRect.left /4}}>
            <span className="filters__title">Filter</span>
            <DateFilter filterDate={filterDate}/>
        </div>
    )
})
export default Filters;