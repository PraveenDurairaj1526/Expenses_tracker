import { Button } from '@material-tailwind/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../components/Form/Input'
import { useDispatch } from 'react-redux'
import { addIncomeData } from '../incomeThunks'

const AddIncomeForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit,reset } = useForm()
    const handleIncome = (data) => {
        if (data) {
            dispatch(addIncomeData({data}))
            reset()
        }
    }
    return (
        <form onSubmit={handleSubmit(handleIncome)} className='grid gap-4 p-4 md:p-6 w-full md:max-w-[300px] bg-white rounded-lg'>
            <Input
                name='date'
                type='date'
                register={register}
                label={'Date'}
            />
            <Input
                name='amount'
                type='number'
                register={register}
                label={'Amount'}
            />
            <Input
                name='source'
                register={register}
                label={'Source'}
            />
            <Button className="bg-brand hover:bg-brand-dark text-white capitalize w-full" type='submit'>Add</Button>
        </form>
    )
}

export default AddIncomeForm