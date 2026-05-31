import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Button } from '@material-tailwind/react'
import CustomTable from '../components/customTable/CustomTable';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllIncomeData, fetchIncomeData } from '../features/income/incomeThunks';
import AddIncomeForm from '../features/income/component/AddIncomeForm';
import CustomPagination from '../components/pagination/CustomPagination';
import { useForm } from 'react-hook-form';
import Input from '../components/Form/Input';

const ManageIncome = () => {
    const dispatch = useDispatch()
    const { data, loading, pagination } = useSelector((state) => state.income)
    const { totalItem, totalPages, limit } = pagination
    const [activePage, setActivePage] = useState(1);
    const {register,watch}  = useForm()
    const searchValue = watch('search')

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setActivePage(page)
    }

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
            header: 'Amount',
            accessor: 'amount'
        },
        {
            header: 'source',
            accessor: 'source'
        },
    ]


    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchIncomeData({ page: activePage,search:searchValue }));
        }, 300);
        return () => clearTimeout(timer);
    }, [dispatch, activePage,searchValue])

    return (
        <Layout>
            <h1 className="text-xl mb-5 font-semibold">Manage Income</h1>
            <div className="flex justify-between mb-3 flex-wrap gap-5">
                <Input
                   name={'search'}
                    register={register}
                    placeholder="Search"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-[250px] text-sm"
                />
            </div>
            <div className='flex gap-6 flex-col lg:flex-row items-start'>
                <AddIncomeForm />
                <div className='grow min-w-0 w-full'>
                    <CustomTable
                        columns={columns}
                        loading={loading}
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

            </div>
        </Layout>
    )
}

export default ManageIncome