import {
    Button, Select, Option, Dialog,
    DialogHeader,
    DialogBody
} from '@material-tailwind/react';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { handleCategoryModalClose } from '../categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { postCategoryItem, updateCategoryItem } from '../categoryThunks';
import Input from '../../../components/Form/Input';
import toast from 'react-hot-toast';

const CategoryForm = () => {
    const show = useSelector((state) => state.category.modalHandlers.show)
    const mode = useSelector((state) => state.category.modalHandlers.mode)
    const updateCategoryData = useSelector((state) => state.category.categoryItemData)
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const handleForm = async (data) => {
        if (mode === "ADD") {
            await dispatch(postCategoryItem(data)).unwrap()
                .then(() => toast.success('Category is added'))
                .catch(() => toast.error('category added failed'))
        } else {
            await dispatch(updateCategoryItem({ id: updateCategoryData?.id, data })).unwrap()
                .then(() => toast.success('category updated'))
                .catch(() => toast.error('category updated failed'))
        }
        dispatch(handleCategoryModalClose())
        reset()
    }

    useEffect(() => {
        if (mode === "EDIT" && updateCategoryData) {
            reset({
                categoryName: updateCategoryData.categoryName || '',
                categoryStatus: updateCategoryData.categoryStatus || 'Active'
            });
        } else {
            reset({
                categoryName: '',
                categoryStatus: 'Active'
            });
        }
    }, [mode, updateCategoryData, reset]);


    return (
        <Dialog size='sm' open={show} handler={() => dispatch(handleCategoryModalClose())}>
            <DialogHeader className="justify-between">
                {mode === "EDIT" ? 'Edit category' : 'Add category'}
                <Button className="bg-brand hover:bg-brand-dark text-white capitalize" onClick={() => dispatch(handleCategoryModalClose())}>Close</Button>
            </DialogHeader>
            <DialogBody>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(handleForm)}>
                    <div>
                        <Input
                            label={'Category name'}
                            name={'categoryName'}
                            register={register}
                            placeholder={'Category name'}
                            error={errors?.categoryName?.message}
                        />
                    </div>
                    <Controller
                        name='categoryStatus'
                        control={control}
                        defaultValue={'Active'}
                        render={({ field }) => (
                            <>
                                <Select
                                    label='categoryStatus'
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <Option value={'Active'}>Active</Option>
                                    <Option value={'Inactive'}>Inactive</Option>
                                </Select>
                                {errors.category && (
                                    <span className="text-red-500 text-sm">
                                        {errors.categoryStatus.message}
                                    </span>
                                )}
                            </>
                        )}
                    />
                    <div className='grid gap-1'>
                        <label className={'text-sm font-semibold text-primary'}>Category color</label>
                        <input
                            type='color'
                            name={'categoryColor'}
                            {...register('categoryColor')}
                            label={'Category color'}
                            className=" w-8 h-8 p-0 border-0 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-md"
                        />
                    </div>

                    <Button type='submit' className="bg-brand hover:bg-brand-dark text-white capitalize" fullWidth>{mode === "EDIT" ? 'Update' : 'Add'}</Button>
                </form>
            </DialogBody>
        </Dialog>

    )
}

export default CategoryForm