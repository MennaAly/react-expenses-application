import React, { useReducer } from "react";
import { createPortal } from 'react-dom';
import { IExpense, IExpenseFormProps } from "../interfaces/expenseInterface";
import FormInput from "../UI/form-input/form-input";
import "./expense-form.css";
import { ReactSVG } from "react-svg";
import crossIcon from "../assets/cross.svg";

function formReducer(state : IExpense, action : {type: string, payload: string}) {
    switch(action.type) {
        case 'SET_TITLE':
            return {...state, title: action.payload}
        case 'SET_AMOUNT':
            return {...state, amount: action.payload}
        case 'SET_DATE':
            return {...state, date: action.payload}
        default: 
            return state;
    }
}

function ExpenseForm({action, expense: {id = '', title = '', amount = '', date = ''}, closeModal} : IExpenseFormProps) {
    const [state, dispatch] = useReducer(formReducer, {id, title, amount, date});
    function validateForm() {
        return state.title.trim() !== '' && state.amount.trim() !== '' && state.date.trim() !== '';
    }
    function submitExpense(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(validateForm()) {
            event?.stopPropagation();
            event?.preventDefault();
            action.mutationFn.mutate(state);
            closeModal();
        }
    }
    

    return createPortal((
        <>
            <div className="overlay"></div>
            <form className="expense-form modal">
                <header className="expense-form__header">
                    <ReactSVG src={crossIcon} className="expense-form__close-icon" onClick={() => closeModal()}/>
                </header>
                <div className="expense-form___inputs-container">
                    <FormInput label="Title" inputType="text" value={state.title} actionFn={(value) => {dispatch({type: 'SET_TITLE', payload: value})}}/>
                    <FormInput label="Amount" inputType="number" value={state.amount} actionFn={(value) => {dispatch({type: 'SET_AMOUNT', payload: value})}}/>
                    <FormInput label="Date" inputType="date" value={state.date} actionFn={(value) => {dispatch({type: 'SET_DATE', payload: value})}}/>
                </div>
                <button className="expense-form__call-to-action" onClick={(event) => submitExpense(event)}>{action.name}</button>
            </form>
        </>
    ), document.getElementById('modal-root') as HTMLElement);
    
}

export default ExpenseForm;