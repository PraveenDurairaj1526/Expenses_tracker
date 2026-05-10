import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryItem, fetchAllCategoryData, fetchCategoryItem } from '../features/category/categoryThunks';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import CategoryForm from '../features/category/components/CategoryForm';
import { handleCategoryModalOpen,handleCategoryModalClose, setCategorySearch } from '../features/category/categorySlice';
import { useForm } from 'react-hook-form';
import { categoryFilteredData } from '../features/category/categorySelector';

const TABLE_HEAD = ["No", "Category name", "Status", "Edit", "Delete"];

const ManageCategory = () => {
    const dispatch = useDispatch();
    const { register, watch } = useForm();
    const searchValue = watch('search')
    const { error, loading } = useSelector((state) => state.category)

    const filterData = useSelector(categoryFilteredData)

    useEffect(() => {
        dispatch(fetchAllCategoryData()).unwrap()
            .then(() => toast.success("category List fetched"))
            .catch(() => toast.error("fetch failed"))
    }, [dispatch])

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
            <div className="h-full w-full overflow-y-auto max-h-[500px] border border-gray-400 rounded-md">
                <table className="w-full min-w-max table-auto text-left rounded-md">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="leading-none font-medium text-black text-sm border-b border-gray-400  p-3 bg-amber-50 border-inherit">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filterData?.length > 0 ?
                            <>
                                {filterData?.map(({ categoryName, id, categoryStatus }, index) => (
                                    <tr key={id} className="border-b border-gray-400 last:border-0">
                                        <td className="p-4 text-sm">{index + 1}</td>
                                        <td className="p-4 text-sm">{categoryName}</td>
                                        <td className="p-4 text-sm">{categoryStatus}</td>
                                        <td className="p-4">
                                            <Button onClick={() => handleEdit(id)} size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize">Edit</Button>
                                        </td>
                                        <td className="p-4">
                                            <Button onClick={() => handleDelete(id)} size='sm' className="bg-brand hover:bg-brand-dark text-white capitalize">Delete</Button>
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
    )
}

export default ManageCategory