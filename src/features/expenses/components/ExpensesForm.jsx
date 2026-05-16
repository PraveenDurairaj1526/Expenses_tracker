import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button, Input, Dialog,
    DialogHeader,
    DialogBody
} from '@material-tailwind/react';
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { postExpensesItem, updateExpensesItem } from '../expensesThunks';
import z from 'zod';
import { handleExpensesModalClose } from '../expensesSlice';
import toast from 'react-hot-toast';

const ExpensesForm = () => {
    const dispatch = useDispatch()
    const { show, mode } = useSelector((state) => state.expenses.modalHandlers);
    const { expensesItem } = useSelector((state) => state.expenses);
    const schema = z.object({
        title: z.string().min(1, 'Title is required'),
        price: z.coerce.number().min(1, 'Price must be greater than 0'),
        category: z.string().min(1, 'Category is required'),
        date: z.string().min(1, 'Date is required')
    })

    const { register, handleSubmit, formState: { errors }, reset } =
        useForm({ resolver: zodResolver(schema) });

    const handleForm = async (data) => {
        if (mode === 'EDIT') {
            await dispatch(updateExpensesItem({ id: expensesItem?.id, data })).unwrap()
                .then(() => toast.success('Expenses updated'))
                .catch(() => toast.error('Expenses update failed'))
            reset(expensesItem)
        } else {
            await dispatch(postExpensesItem(data)).unwrap()
                .then(() => toast('expenses added'))
                .catch(() => toast('expenses added failed'))
            reset()
        }
        dispatch(handleExpensesModalClose())
    }

    useEffect(() => {
        if (mode == "EDIT" && expensesItem) {
            reset({
                title:expensesItem?.title || '',
                price:expensesItem?.price || '',
                category:expensesItem?.category || '',
                date:expensesItem?.date || ''
            })
        }else{
            reset({
                title:'',
                price:'',
                category: '',
                date:''
            })
        }
    }, [mode])
    return (
        <Dialog open={show} handler={() => dispatch(handleExpensesModalClose())}>
            <DialogHeader className="justify-between">
                {mode === "EDIT" ? 'Edit expenses' : 'Add expenses'}
                <Button className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => dispatch(handleExpensesModalClose())}>Close</Button>
            </DialogHeader>
            <DialogBody>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleForm)}>
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
                        <Input
                            name='category'
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            error={!!errors?.category}
                            {...register('category')}
                        />
                        {errors?.category?.message && <span className='text-red-600 text-xs'>{errors?.category?.message}</span>}
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