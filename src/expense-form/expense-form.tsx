import React, { useReducer } from "react";
import { createPortal } from 'react-dom';
import { IExpense, IExpenseFormProps, IExpenseFormState } from "../interfaces/expenseInterface";
import FormInput from "../UI/form-input/form-input";
import "./expense-form.css";
import { ReactSVG } from "react-svg";
import crossIcon from "../assets/cross.svg";

function formReducer(state : IExpenseFormState, action : {type: string, payload: string | boolean}) {
    switch(action.type) {
        case 'SET_TITLE':
            return {...state, title: action.payload as string}
        case 'SET_AMOUNT':
            return {...state, amount: action.payload as string}
        case 'SET_DATE':
            return {...state, date: action.payload as string}
        case 'SET_TITLE_ERROR':
            return {...state, isTitleEmpty: action.payload as boolean}
        case 'SET_AMOUNT_ERROR':
            return {...state, isAmountEmpty: action.payload as boolean} 
        case 'SET_DATE_ERROR':
            return {...state, isDateEmpty: action.payload as boolean}
        default: 
            return state;
    }
}

function ExpenseForm({action, expense: {id = '', title = '', amount = '', date = ''}, closeModal} : IExpenseFormProps) {
    const initialExpenseState: IExpenseFormState = {
        id,
        title,
        amount,
        date,
        isTitleEmpty: false,
        isAmountEmpty: false,
        isDateEmpty: false,
    };
    const [state, dispatch] = useReducer(formReducer, initialExpenseState);
    function validateForm() {
        dispatch({type: 'SET_TITLE_ERROR', payload: state.title.trim() == ''});
        dispatch({type: 'SET_AMOUNT_ERROR', payload: state.amount.trim() == ''});
        dispatch({type: 'SET_DATE_ERROR', payload: state.date.trim() == ''});
        return state.title.trim() !== '' && state.amount.trim() !== '' && state.date.trim() !== '';
    }
    function submitExpense(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.stopPropagation();
        event?.preventDefault();
        if(validateForm()) {
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
                    <FormInput label="Title" inputType="text" value={state.title} actionFn={(value) => {dispatch({type: 'SET_TITLE', payload: value})}} isInputEmpty={state.isTitleEmpty}/>
                    <FormInput label="Amount" inputType="number" value={state.amount} actionFn={(value) => {dispatch({type: 'SET_AMOUNT', payload: value})}} isInputEmpty={state.isAmountEmpty}/>
                    <FormInput label="Date" inputType="date" value={state.date} actionFn={(value) => {dispatch({type: 'SET_DATE', payload: value})}} isInputEmpty={state.isDateEmpty}/>
                </div>
                <button className="expense-form__call-to-action" onClick={(event) => submitExpense(event)}>{action.name}</button>
            </form>
        </>
    ), document.getElementById('modal-root') as HTMLElement);
    
}

export default ExpenseForm;