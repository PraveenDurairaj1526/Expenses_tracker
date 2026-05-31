import React from 'react';
import clsx from 'clsx';

const Input = ({ label, type = 'text', name, register, placeholder, labelStyle, inputStyle, containerStyle,error }) => {
    return (
        <div className={clsx('grid gap-1 ',containerStyle)}>
            {label && <label htmlFor={name} className={clsx('text-sm font-semibold text-primary', labelStyle)}>{label}</label>}
            <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                className={clsx('border border-gray-500 p-[8px_12px] rounded-md bg-white', inputStyle)}
            />
            {error && <span className='text-sm font-medium'>{error}</span>}
        </div>
    )
}

export default Input