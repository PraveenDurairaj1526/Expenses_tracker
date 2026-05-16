import { useEffect, useState } from "react";
import { Button, Card, Input, Typography, IconButton, ButtonGroup } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpensesItem, fetchAllExpenses, getExpensesItem } from "../features/expenses/expensesThunks";
import { useForm } from "react-hook-form";
import { handleExpensesModalOpen } from "../features/expenses/expensesSlice";
import ExpensesForm from "../features/expenses/components/ExpensesForm";
import toast from "react-hot-toast";
import axios from "axios";
import TableSkeleton from "../components/skeleton/TableSkeleton";
import CustomPagination from "../components/pagination/CustomPagination";
import CustomTable from "../components/customTable/CustomTable";
import Layout from "../components/Layout/Layout";


export default function ManageExpenses() {
    const { loading, error, pagination, data } = useSelector((state) => state.expenses)
    const { totalItem, totalPages, limit } = pagination
    const dispatch = useDispatch()
    const { register, watch } = useForm()
    const searchValue = watch('search')

    // pagination
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setActivePage(page)
    }
    // table curd
    const handleEdit = async (id) => {
        await dispatch(getExpensesItem(id)).unwrap()
        dispatch(handleExpensesModalOpen('EDIT'))
    }
    const handleAdd = () => {
        dispatch(handleExpensesModalOpen('ADD'))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchAllExpenses({ page: activePage, search: searchValue }));
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue, dispatch, activePage])

    const columns = [
        {
            header: 'ID',
            accessor: 'id'
        },
        {
            header: 'Date',
            accessor: 'date'
        },
        {
            header: 'Title',
            accessor: 'title'
        },
        {
            header: 'Price',
            accessor: 'price'
        },

        {
            header: 'Category',
            accessor: 'category'
        },
        {
            header: 'Edit',
            render: (row) => (
                <Button size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => handleEdit(row.id)}>Edit</Button>
            )
        },
        {
            header: 'Delete',
            render: (row) => (
                <Button size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => dispatch(deleteExpensesItem(row.id))}>Delete</Button>
            )
        }
    ]

    if (error) return <div>{error}</div>
    return (
        <Layout>
            <div>
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
                <CustomTable
                    loading={loading}
                    columns={columns}
                    data={data}
                />
                {!loading && totalItem > limit &&
                    <CustomPagination
                        handlePageChange={handlePageChange}
                        totalPages={totalPages}
                        activePage={activePage}
                    />
                }
            </div>
        </Layout>
    );
}
