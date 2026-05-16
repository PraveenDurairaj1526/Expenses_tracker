import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryItem, fetchAllCategoryData, fetchCategoryItem } from '../features/category/categoryThunks';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import CategoryForm from '../features/category/components/CategoryForm';
import { handleCategoryModalOpen, handleCategoryModalClose, setCategorySearch } from '../features/category/categorySlice';
import { useForm } from 'react-hook-form';
import { categoryFilteredData } from '../features/category/categorySelector';
import CustomPagination from '../components/pagination/CustomPagination';
import CustomTable from '../components/customTable/CustomTable';

const TABLE_HEAD = ["No", "Category name", "Status", "Edit", "Delete"];

const ManageCategory = () => {
    const dispatch = useDispatch();
    const { register, watch } = useForm();
    const searchValue = watch('search')
    const { error, loading, pagination } = useSelector((state) => state.category)
    const { totalItem, totalPage, limit } = pagination

    const filterData = useSelector(categoryFilteredData)


    // pagination 
    const [activePage, setActivePage] = useState(1)

    const handlePageChange = (page) => {
        if (page > totalPage || activePage > totalPage) return;
        setActivePage(page)
    }

    useEffect(() => {
        dispatch(fetchAllCategoryData(activePage))
    }, [dispatch, activePage])

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

            dispatch(setCategorySearch(searchValue?.trim() || ''))
        }, 300)
        return () => clearTimeout(timer);
    }, [searchValue, dispatch])
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
        <div className="p-5">
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
                data={filterData}
            />
            {!loading && totalItem > limit && <CustomPagination
                handlePageChange={handlePageChange}
                activePage={activePage}
                totalPages={totalPage}
            />}

        </div>
    )
}

export default ManageCategory