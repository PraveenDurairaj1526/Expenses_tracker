import { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpensesItem, fetchAllExpenses, getExpensesItem } from "../features/expenses/expensesThunks";
import { useForm } from "react-hook-form";
import { selectFilteredExpenses } from "../features/expenses/expensesSelectors";
import { handleExpensesModalOpen, setSearch } from "../features/expenses/expensesSlice";
import ExpensesForm from "../features/expenses/components/ExpensesForm";
import toast from "react-hot-toast";

const TABLE_HEAD = ["No", "Date", "Title", "Price", "Category", "Edit", "Delete"];



export default function ManageExpenses() {
    const { loading, error } = useSelector((state) => state.expenses)
    const filteredData = useSelector(selectFilteredExpenses)
    const dispatch = useDispatch()
    const { register, watch } = useForm()
    const searchValue = watch('search')

    const handleEdit = async (id) => {
        await dispatch(getExpensesItem(id))
        dispatch(handleExpensesModalOpen('EDIT'))
    }
    const handleAdd = () => {
        dispatch(handleExpensesModalOpen('ADD'))
    }

    useEffect(() => {
        dispatch(fetchAllExpenses()).unwrap()
            .then(() => toast.success('Expenses fetched'))
            .catch(() => toast.error('Expenses fetch failed'))
    }, [dispatch])

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSearch(searchValue?.trim() || ""));
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue, dispatch])

    if (error) return <div>{error}</div>
    return (
        <div className="p-5">
            <ExpensesForm />
            <h1 className="text-xl mb-5 font-semibold">Manage Expenses</h1>
            <div className="flex justify-between mb-3 flex-wrap gap-5">
                <input
                    {...register("search")}
                    placeholder="Search by title"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-[250px] text-sm"
                />
                <Button onClick={handleAdd} className="bg-brand hover:bg-brand-dark text-white capitalize ms-auto">Add</Button>
            </div>
            <div className="h-full w-full overflow-y-auto max-h-[500px] border border-gray-400 rounded-md">
                <table className="w-full min-w-max table-auto text-left rounded-md">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="leading-none font-medium text-black text-sm border-b border-gray-400  p-3 bg-amber-50 border-inherit">{head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.length > 0 ?
                            <>
                                {filteredData?.map(({ date, title, price, category, id }, index) => (
                                    <tr key={id} className="border-b border-gray-400 last:border-0">
                                        <td className="p-4 text-sm">{index + 1}</td>
                                        <td className="p-4 text-sm">{date}</td>
                                        <td className="p-4 text-sm">{title}</td>
                                        <td className="p-4 text-sm">{price}</td>
                                        <td className="p-4 text-sm">{category}</td>
                                        <td className="p-4">
                                            <Button size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => handleEdit(id)}>Edit</Button>
                                        </td>
                                        <td className="p-4">
                                            <Button size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => dispatch(deleteExpensesItem(id))}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </> :
                            <tr><td colSpan={12} className="text-center text-black text-2xl p-5">No Data</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}