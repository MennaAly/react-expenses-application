import { UseMutationResult } from "react-query"

export interface IExpense {
    id: string,
    title: string,
    amount: string,
    date: string
}

export interface IExpenseFormProps {
    action: {
        name: string, 
        mutationFn: UseMutationResult<void, unknown, IExpense, unknown> 
    }, 
    expense: IExpense,
    closeModal: () => void
}