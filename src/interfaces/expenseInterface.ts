import { UseMutationResult } from "react-query"

export interface IExpenseFormField {
    value: string,
    touched: boolean
}
export interface IExpense {
    id: string,
    title: string,
    amount: string,
    date: string;
}
export interface IExpenseFormState {
    id: string,
    title: IExpenseFormField,
    amount: IExpenseFormField,
    date: IExpenseFormField;
    isFormValid: boolean;
}

export interface IExpenseFormProps {
    action: {
        name: string, 
        mutationFn: UseMutationResult<void, unknown, IExpense, unknown> 
    }, 
    expense: IExpense,
    closeModal: () => void
}