import React, { forwardRef, useReducer } from "react";
import { createPortal } from 'react-dom';
import { IExpenseFormField, IExpenseFormProps, IExpenseFormState } from "../interfaces/expenseInterface";
import FormInput from "../UI/form-input/form-input";
import "./expense-form.css";
import { ReactSVG } from "react-svg";
import crossIcon from "../assets/cross.svg";
import { formInputs } from "../helper/constants/expense-form-constants";
import { isValueEmpty, validateForm } from "../helper/utils/expense-form";

function formReducer(state : IExpenseFormState, action : {type: string, payload: string}) {
    switch(action.type) {
        case 'SET_TITLE':
            return {...state, title: {value: action.payload, touched: true}, isFormValid: validateForm(action.payload, state.amount.value, state.date.value)}
        case 'SET_AMOUNT':
            return {...state, amount: {value: action.payload, touched: true} , isFormValid: validateForm(state.title.value, action.payload, state.date.value)}
        case 'SET_DATE':
            return {...state, date: {value: action.payload, touched: true}, isFormValid: validateForm(state.title.value, state.amount.value, action.payload)}
        default: 
            return state;
    }
}

const ExpenseForm = forwardRef<HTMLFormElement,IExpenseFormProps >(({action, expense: {id = '', title = '', amount = '', date = ''}, closeModal}, ref) =>{
    const initialExpenseState: IExpenseFormState = {
        id,
        title : {
            value: title,
            touched: false
        },
        amount : {
            value: amount,
            touched: false
        },
        date: {
            value: date,
            touched: false
        },
        isFormValid: false
    };
    const [state, dispatch] = useReducer(formReducer, initialExpenseState);

    function submitExpense(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.stopPropagation();
        event?.preventDefault();
        action.mutationFn.mutate({id: state.id, title: state.title.value, amount: state.amount.value, date: state.date.value });
        closeModal();
    }

    function changeFormFieldValue(field: string, value: string) {
        dispatch({type: `SET_${field.toUpperCase()}`, payload: value});
    }
    
    return createPortal((
        <>
            <div className="overlay"></div>
            <form ref={ref} className="expense-form modal">
                <header className="expense-form__header">
                    <ReactSVG src={crossIcon} className="expense-form__close-icon" onClick={() => closeModal()}/>
                </header>
                <div className="expense-form___inputs-container">
                    {formInputs.map((fields) => {
                        const {value , touched} = state[fields.name] as IExpenseFormField;
                        return  <FormInput label={fields.name} inputType={fields.inputType} value={value} actionFn={(value) => {changeFormFieldValue(fields.name, value)}} isInputEmpty={touched && isValueEmpty(value)}/>
                    })}
                </div>
                <button className={`expense-form__call-to-action ${!state.isFormValid ? 'expense-form__call-to-action--disabled' : null}`} disabled={state.isFormValid} onClick={(event) => submitExpense(event)}>{action.name}</button>
            </form>
        </>
    ), document.getElementById('modal-root') as HTMLElement);});
export default ExpenseForm;