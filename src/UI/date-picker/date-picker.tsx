import React, { JSX, useState, useEffect, forwardRef } from 'react';
import { IDate } from '../../interfaces/uiInterfaces';
import { datePickerHeaderOptions, timeUnitValues } from './constants';
import { timeUnit } from './types';
import "./date-picker.css"

interface IDatePickerProps {
    onChangeDate: (date: IDate) => void
}

const DatePicker = forwardRef<HTMLDivElement,IDatePickerProps >(({onChangeDate}, ref) => {
    const [selectedTimeUnit , setTimeUnit] = useState<timeUnit>('Year');
    const [gridData, setGridData] =  useState<JSX.Element[]>();
    const [selectedDate, setSelectedDate] = useState<IDate>({Year: '2025', Month: 'January', Day: '1'});
    const yearGridData = timeUnitValues['Year'].map((year) => {
        return getGridItem(year.toString());
    })
    const monthGridData = Object.keys(timeUnitValues['Month']).map((month) => {
        return getGridItem(month.toString());
    })
    const renderHeaderOption = (option: timeUnit) => (
        <li key={option} className={`date-picker__header-button ${selectedTimeUnit === option ? 'date-picker__header-button--selected' : ''}`}>
            <button onClick={() => setTimeUnit(option)}>{option}</button>
        </li>
    );
    const headerOptions = datePickerHeaderOptions.map(renderHeaderOption);
    function getGridItem(time: string) {
        return <div key={time} className="date-picker__data-grid-item" onClick={() => changeDate(time)}>{time}</div>
    }
    function getDayGridData() {
        const daysCount = timeUnitValues['Month'][selectedDate.Month];
        return Array.from({ length: daysCount }, (_, index) => {
            const day: number = index + 1;
            return getGridItem(day.toString());
        });
    }

    function changeDate(time: string) {
        switch(selectedTimeUnit) {
            case 'Year':
                setSelectedDate((prevDate) => {
                    return {...prevDate, Year: time}
                })
              break;
            case 'Month':
                setSelectedDate((prevDate) => {
                    return {...prevDate, Month: time, Day: '1'}
                })                
                break;
            case 'Day':
                setSelectedDate((prevDate) => {
                    return {...prevDate, Day: time}
                })               
                break;
            default: 
                setSelectedDate((prevDate) => {
                    return {...prevDate, Year: '2025'}
                })
        }
    }
   
    useEffect(() => {
        switch(selectedTimeUnit) {
            case 'Year':
              setGridData(yearGridData)
              break;
            case 'Month':
                setGridData(monthGridData)
                break;
            case 'Day':
                setGridData(getDayGridData())
                break;
            default: 
                setGridData(yearGridData)
        }

    }, [selectedTimeUnit]);

    return(
        <section ref={ref} className="date-picker">
            <nav>
                <ul className="date-picker__header">
                    {headerOptions}
                </ul>
            </nav>
            <div className="date-picker__selected-data">
                <span>{selectedDate.Year}</span>
                <span>{selectedDate.Month}</span>
                <span>{selectedDate.Day}</span>
            </div>
            <div className="date-picker__data-grid-container">
                {gridData && gridData}
            </div>
            <button onClick={() => onChangeDate(selectedDate)}>submit</button>
        </section>
    )
});

export default DatePicker;