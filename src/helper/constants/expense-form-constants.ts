import { IExpenseFormState } from "../../interfaces/expenseInterface";

export const formInputs: {name: keyof IExpenseFormState, inputType: string}[] = [
    {
        name: "title",
        inputType: "text",
    },
    {
        name: "amount",
        inputType: "number",
    },
    {
        name: "date",
        inputType: "date",
    }
]