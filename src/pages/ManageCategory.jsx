import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryItem, fetchCategoryItem, fetchTableCategoryData } from '../features/category/categoryThunks';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import CategoryForm from '../features/category/components/CategoryForm';
import { handleCategoryModalOpen, handleCategoryModalClose } from '../features/category/categorySlice';
import { useForm } from 'react-hook-form';
import CustomPagination from '../components/pagination/CustomPagination';
import CustomTable from '../components/customTable/CustomTable';
import Layout from "../components/Layout/Layout";

const ManageCategory = () => {
    const dispatch = useDispatch();
    const { register, watch } = useForm();
    const searchValue = watch('search')
    const { error, loading, pagination, data } = useSelector((state) => state.category)
    const { totalItem, totalPage, limit } = pagination

    // pagination 
    const [activePage, setActivePage] = useState(1)

    const handlePageChange = (page) => {
        if (page > totalPage || activePage > totalPage) return;
        setActivePage(page)
    }

    const handleDelete = (id) => {
        dispatch(deleteCategoryItem(id)).unwrap()
            .then(() => toast.success('category deleted'))
            .catch(() => toast.error('category delete failed'))
    }
    const handleCategoryAdd = () => {
        dispatch(handleCategoryModalOpen("ADD"))
    }
    const handleEdit = async (id) => {
        await dispatch(fetchCategoryItem(id)).unwrap()
            .then(() => dispatch(handleCategoryModalOpen("EDIT")))
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchTableCategoryData({ page: activePage, search: searchValue }))
        }, 300)
        return () => clearTimeout(timer);
    }, [searchValue, dispatch, activePage])

    const columns = [
        {
            header: 'ID',
            accessor: 'id'
        },
        {
            header: 'Category Name',
            accessor: 'categoryName'
        },
        {
            header: 'Status',
            accessor: 'categoryStatus'
        },
        {
            header: 'Edit',
            render: (row) => (
                <Button onClick={() => handleEdit(row.id)} size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize">Edit</Button>
            )
        },
        {
            header: 'Delete',
            render: (row) => (
                <Button onClick={() => handleDelete(row.id)} size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize">Delete</Button>
            )
        },

    ]

    return (
        <Layout>
            <div>
                <CategoryForm />
                <h1 className="text-xl mb-5 font-semibold">Manage Category</h1>
                <div className="flex justify-between mb-3 flex-wrap gap-5">
                    <input
                        {...register('search')}
                        placeholder="Search by title"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-[250px] text-sm"
                    />
                    <Button className="bg-brand hover:bg-brand-dark text-white capitalize ms-auto" onClick={() => handleCategoryAdd()}>Add</Button>
                </div>
                <CustomTable
                    columns={columns}
                    loading={loading}
                    data={data}
                />

                {!loading && totalItem > limit && <CustomPagination
                    handlePageChange={handlePageChange}
                    activePage={activePage}
                    totalPages={totalPage}
                />}

            </div>
        </Layout>

    )
}

export default ManageCategory