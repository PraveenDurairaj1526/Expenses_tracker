import React from 'react'
import { Button } from '@material-tailwind/react'
import { PlusIcon } from '../../assets/CustomSvgIcons'

const Header = () => {
    return (
        <header className='flex gap-3 items-center justify-end flex-row-reverse md:justify-between  md:flex-row mb-4'>
            <div>
                <div className='text-xl font-bold leading-7 mb-[2px]'>SpentView</div>
                <p className='text-xs font-medium text-secondary'>Finance Management</p>
            </div>
            <div className='md:flex md:gap-3 md:items-center'>
                <Button ripple={false} className='fixed rounded-full right-6 bottom-6 md:static flex gap-2 p-3 md:py-[10px] font-medium z-10 ' > <PlusIcon className={'w-[14px] h-[14px]'} /> <span className='hidden capitalize md:flex'>New Expenses</span></Button>
                <div className='w-10 h-10 bg-gray-300 rounded-full md:w-9 md:h-9'></div>
            </div>
        </header>
    )
}

export default Header