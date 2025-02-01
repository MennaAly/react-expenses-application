import React, { useState } from "react";
import { IDate } from "../../interfaces/uiInterfaces";
import { monthNumberNameMap } from "../data-picker/constants";
import DateFilterDropdown from "./date-filter-dropdown/date-filter-dropdown";
import "./date-filter.css";

function DateFilter({filterDate} : { filterDate: (from: IDate, to:IDate) => void}) {
    const defaultStartDate = {Year: '2016', Month: 'January', Day: '1'};
    const defaultEndDate = getDefaultEndDate();
    const [fromDate, setFromDate] = useState<IDate>(defaultStartDate);
    const [toDate, setToDate] = useState<IDate>(defaultEndDate);
    function getDefaultEndDate(): IDate {
        const today = new Date();
        return {Year: today.getFullYear().toString(), Month: monthNumberNameMap[(today.getMonth() + 1)], Day: today.getDate().toString()};
    }
    function resetDateToDefault() {
        setFromDate(defaultStartDate);
        setToDate(defaultEndDate);
        filterDate(defaultStartDate, defaultEndDate)
    }
    return (
        <section className="date-filter">
            <header className="date-filter__header">
                <span>Date range</span>
                <button onClick={resetDateToDefault}>Reset</button>
            </header>
            <div className="date-filter__ranges">
                <DateFilterDropdown title="From" selectedDate={fromDate} setDate={setFromDate}/>
                <DateFilterDropdown title="To" selectedDate={toDate} setDate={setToDate} />
            </div>
            <button onClick={() => filterDate(fromDate, toDate)}>filter</button>
        </section>
    )
}

export default DateFilter;