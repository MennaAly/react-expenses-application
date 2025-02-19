import React from "react";
import { FormInputProps } from "../../interfaces/uiInterfaces";
import "./form-input.css";

function FormInput({label, inputType, value, actionFn, isInputEmpty} : FormInputProps) {
    return(
        <div className="form-input">
            <label className="form-input__label">{label}</label>
            <input className={`form-input__field ${isInputEmpty ? "form-input__field--error" : ""}`} type={inputType} value={value} onChange={(event) => actionFn(event.target.value)}/>
        </div>
    )
}

export default FormInput;