import React, { Dispatch, SetStateAction, useState } from "react";
import useCloseContainerWhenClickOutside from "../../../hooks/useCloseContainerWhenClickOutside";
import { IDate } from "../../../interfaces/uiInterfaces";
import DatePicker from "../../date-picker/date-picker";

function DateFilterDropdown({title , selectedDate, setDate} : {title: string , selectedDate: IDate, setDate : Dispatch<SetStateAction<IDate>>}) {
    const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
    const {containerRef} = useCloseContainerWhenClickOutside<boolean, HTMLDivElement>({setState: setIsShowDatePicker});
    function renderDatePicker() {
        setIsShowDatePicker(true);
    }

    function toggleDatePickerView() {
        if(isShowDatePicker) {
            setIsShowDatePicker(false)
        }
        else {
            renderDatePicker();
        }
    }
    function onChangeDate(date: IDate) {
        setDate(date);
        setIsShowDatePicker(false);
    }
    
    return(
        <div className="date-filter__dropdown-container">
            <span>{title}</span>
            <button className="date-filter__dropdown" onClick={toggleDatePickerView}>
                <span>{selectedDate.Year}</span>
                <span>{selectedDate.Month}</span>
                <span>{selectedDate.Day}</span>
            </button>
            {isShowDatePicker && <DatePicker ref={containerRef} onChangeDate={onChangeDate}/>}
        </div>
    )
}

export default DateFilterDropdown;