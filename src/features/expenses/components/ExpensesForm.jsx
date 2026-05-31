import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button, Input, Dialog,
    DialogHeader,
    DialogBody
} from '@material-tailwind/react';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExpensesData, postExpensesItem, updateExpensesItem } from '../expensesThunks';
import z from 'zod';
import { handleExpensesModalClose } from '../expensesSlice';
import toast from 'react-hot-toast';
import { fetchAllCategoryData } from '../../category/categoryThunks';
import { getTotalIncomeAmount } from '../../income/totalIncomeSelector';
import { getTotalExpensesAmount } from '../totalExpensesSelector';
import { fetchAllIncomeData } from '../../income/incomeThunks';

const ExpensesForm = () => {
    const dispatch = useDispatch()
    const { show, mode } = useSelector((state) => state.expenses.modalHandlers);
    const { expensesItem } = useSelector((state) => state.expenses);
    const { categoryOptionData } = useSelector((state) => state.category)
    const TotalIncomeAmount = useSelector(getTotalIncomeAmount)
    const TotalExpenses = useSelector(getTotalExpensesAmount)
    let balance = TotalIncomeAmount - TotalExpenses

    const schema = z.object({
        title: z.string().min(1, 'Title is required'),
        price: z.coerce.number().min(1, 'Price must be greater than 0'),
        category: z.string().min(1, 'Category is required'),
        date: z.string().min(1, 'Date is required')
    })

    const { register, handleSubmit, formState: { errors }, reset, control } =
        useForm({ resolver: zodResolver(schema) });

    const handleForm = async (data) => {
        const [category, categoryColor] = data.category.split('+')
        if (mode === 'EDIT') {
            const updatedData = { ...data, category, categoryColor }
            if ((expensesItem.price + balance) > data.price) {
                await dispatch(updateExpensesItem({ id: expensesItem?.id, data:updatedData })).unwrap()
                    .then(() => toast.success('Expenses updated'))
                    .catch(() => toast.error('Expenses update failed'))
                reset(expensesItem)
                dispatch(handleExpensesModalClose())
            } else {
                toast.error('no balance')
            }

        } else {
            if (balance >= data?.price) {


                await dispatch(postExpensesItem({ ...data, categoryColor, category })).unwrap()
                    .then(() => toast('expenses added'))
                    .catch(() => toast('expenses added failed'))
                reset()
                dispatch(handleExpensesModalClose())
            } else {
                toast.error('no balance')
            }


        }

    }

    useEffect(() => {
        if (mode == "EDIT" && expensesItem) {
            console.log(expensesItem?.category + expensesItem?.categoryColor);

            reset({
                title: expensesItem?.title || '',
                price: expensesItem?.price || '',
                category: `${expensesItem?.category}+${expensesItem?.categoryColor}` || 'select',
                date: expensesItem?.date || ''
            })
        } else {
            reset({
                title: '',
                price: '',
                category: 'select',
                date: ''
            })
        }
        dispatch(fetchAllCategoryData())
        dispatch(fetchAllIncomeData())
        dispatch(fetchAllExpensesData())
    }, [mode])


    return (
        <Dialog open={show} handler={() => dispatch(handleExpensesModalClose())} className='z-100'>
            <DialogHeader className="justify-between">
                {mode === "EDIT" ? 'Edit expenses' : 'Add expenses'}
                <Button className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => dispatch(handleExpensesModalClose())}>Close</Button>
            </DialogHeader>
            <DialogBody>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleForm)}>
                    <div>
                        balance: {balance}
                    </div>
                    <div>
                        <label>Title</label>
                        <Input
                            name='title'
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            error={!!errors?.title}
                            {...register('title')}
                        />
                        {errors?.title?.message && <span className='text-red-600 text-xs'>{errors?.title?.message}</span>}
                    </div>
                    <div>
                        <label>Price</label>
                        <Input
                            name='price'
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            error={!!errors?.price}
                            {...register('price')}
                            type='number'
                        />
                        {errors?.price?.message && <span className='text-red-600 text-xs'>{errors?.price?.message}</span>}
                    </div>
                    <div>
                        <label>Category</label>
                        <Controller
                            name='category'
                            control={control}
                            defaultValue={'select'}
                            render={({ field }) => (
                                <select value={field.value} onChange={field.onChange}>
                                    <option value={'select'}>select</option>
                                    {categoryOptionData?.map(({ categoryName, categoryStatus, categoryColor }, key) => categoryStatus == 'Active' && <option key={key} value={`${categoryName}+${categoryColor}`}><span className='w-5 h-5 bg-transparent' style={{ background: categoryColor }} />{categoryName}</option>)}
                                </select>
                            )}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <Input
                            name='date'
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            error={!!errors?.date}
                            {...register('date')}
                            type='date'
                        />
                        {errors?.date?.message && <span className='text-red-600 text-xs'>{errors?.date?.message}</span>}
                    </div>

                    <Button className="bg-brand hover:bg-brand-dark text-white capitalize" fullWidth type='submit'>
                        {mode === "EDIT" ? 'Update' : 'ADD'}
                    </Button>
                </form>
            </DialogBody>
        </Dialog>
    )
}

export default ExpensesForm