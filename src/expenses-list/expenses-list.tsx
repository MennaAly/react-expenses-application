import React, {JSX, useState} from 'react';
import ExpenseForm from "../expense-form/expense-form";
import useCloseContainerWhenClickOutside from '../hooks/useCloseContainerWhenClickOutside';
import { useExpenseCreation, useExpenseEdit, useExpenseRemoval, useExpensesListData } from "../hooks/useExpenseData";
import { IExpense } from '../interfaces/expenseInterface';
import { IDate } from '../interfaces/uiInterfaces';
import Filters from '../UI/filters/filters';
import "./expenses-list.css";

function ExpensesList() {
    const {data, isError, isLoading, error} = useExpensesListData(transformExpesnsesToJsx);
    const removeExpenseMutation = useExpenseRemoval();
    const createExpenseMutation = useExpenseCreation();
    const editExpenseMutation = useExpenseEdit();
    const createExpenseConfig = {showForm: true, expense: {id:'', title: '',amount: '', date:''}, action: {name: 'create' , mutationFn: createExpenseMutation}};
    const editExpenseConfig = {
        showForm: true,
        action: {
            name: 'edit',
            mutationFn: editExpenseMutation
        }
    }    
    const [expenseFormConfig, setExpenseFormConfig] = useState({...createExpenseConfig, showForm: false});
    const [isShowFilter, setIsShowFilter] = useState(false);
    const {containerRef} = useCloseContainerWhenClickOutside(setIsShowFilter)
    const [filterCoords, setFilterCoords] = useState<DOMRect>(() => new DOMRect(0, 0, 0, 0));
    const [expensesList, setExpensesList] = useState<JSX.Element[]>();
    function removeExpense(id: string) {
        removeExpenseMutation.mutate(id);
    }
    function viewEditExpense(expense: IExpense) {
        setExpenseFormConfig({expense, ...editExpenseConfig})
    }
    function closeExpenseFormModal() {
        setExpenseFormConfig((prev) => {
            return {
                ...prev,
                showForm: false
            }
        })
    }
    function openFilterDropdown(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(isShowFilter) {
            setIsShowFilter(false);
        } else { 
            setIsShowFilter(true);
            const button = event.target as HTMLButtonElement;
            const rect = button.getBoundingClientRect();
            setFilterCoords(rect);
        }
    }
    function viewCreateExpense() {
        setExpenseFormConfig(createExpenseConfig);
    }
    function formatDate(date: IDate) {
        const dateStr = `${date.Year}-${date.Month}-${date.Day}`;
        return new Date(dateStr);
    }
    function filter(from: IDate , to: IDate) {
        const fromDateFormat = formatDate(from);
        const toDateFormat = formatDate(to);
        if(data) {
            const filteredExpenses = data.filter((expense : IExpense) => {
                const date = new Date(expense.date);
                if(fromDateFormat <= date && date <= toDateFormat) {
                    return expense;
                }
            })
            transformExpesnsesToJsx(filteredExpenses);
        }
    }
    function transformExpesnsesToJsx(expenses : IExpense[]) {
        const expensesJSX =  expenses.map((expense) => {
            return (
            <td className="expenses-table__row" key={expense.id}>
                <p>{expense.title}</p>
                <button className='expenses-table__row-remove-button' onClick={() => removeExpense(expense.id)}>remove</button>
                <button className='expenses-table__row-edit-button' onClick={() => viewEditExpense(expense)}>edit</button>
            </td>
            )
        })
        setExpensesList(expensesJSX);
    }

    return(
        <div className="expenses-list">
            <header className="expenses-list__header">
                <button className="expenses-list__filter-button" onClick={(event) => openFilterDropdown(event)}>Filter</button>
                <button onClick={() => viewCreateExpense()}>Add new expense</button>
            </header>
            {isShowFilter && <Filters ref={containerRef} parentRect={filterCoords} filterDate={filter}/> }
            <table className="expenses-table">
                <thead>
                    <tr>
                        <th>Expense name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="expenses-table__data">
                        {expensesList ? expensesList : null}
                    </tr>
                </tbody>
            </table>
            {expenseFormConfig.showForm ? (<ExpenseForm action={expenseFormConfig.action} expense={expenseFormConfig.expense}  closeModal={closeExpenseFormModal}/>): null}
        </div>
    );
}

export default ExpensesList;