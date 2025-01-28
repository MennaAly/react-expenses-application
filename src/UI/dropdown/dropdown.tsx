import React from 'react';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import { DropdownComponentProps, DropdownProps } from "../../interfaces/task";
import "./dropdown.css";

const Dropdown = forwardRef(({options} : DropdownComponentProps, ref) => {
    const [selectedValue, setSelectedValue] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownTop, setDropdownTop] = useState<number>(0);
    const [dropdownWidth, setDropdownWidth] = useState<number>(0);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Expose `getSelectedValue` to parent via useImperativeHandle
    useImperativeHandle(ref, () => ({
        getSelectedValue: () => selectedValue,
    }));

    const handleChange = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(e.currentTarget.textContent) {
            setSelectedValue(e.currentTarget.textContent)
        }
        setIsOpen(false);
    };

    const renderedOptions = options.map((option: DropdownProps, index) => {
        const addBorderBottom = index < options.length -1;
        return <li aria-selected={option.label === selectedValue} className={`drop-down__element ${addBorderBottom ? "border-bottom" : ""}`} value={option.value} onClick={handleChange}>{option.label}</li>
    })

    function toggleDropdown(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();
        if(!isOpen && buttonRef.current) {
            const {top, width} = buttonRef.current.getBoundingClientRect()
            const gapArea = 17; // this's the gap area for the padding 8 + gap 8 and border 1
            setDropdownTop(top - gapArea);
            setDropdownWidth(width);
        }
        setIsOpen(!isOpen);
    }

    return(
        <>
        <button ref={buttonRef} className="input-field" onClick={toggleDropdown}>
            {selectedValue ? selectedValue : 'Choose priority'}
        </button>
        {
            isOpen ? 
            <ul aria-expanded={isOpen} className="drop-down" style={{top: dropdownTop + "px", width: dropdownWidth + "px"}}>
                {renderedOptions}
            </ul>
            : null
        }
        </>
    )
});

export default Dropdown;