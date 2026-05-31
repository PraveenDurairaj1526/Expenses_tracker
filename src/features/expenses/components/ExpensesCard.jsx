import React from 'react'

const ExpensesCard = ({ categoryData }) => {
    return (
        categoryData && 
        <div className='my-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4'>
            {categoryData?.map((item) => (
                <div key={item.id} className='flex items-center justify-between rounded-md bg-white px-4 py-3'>
                    <div className='flex items-center gap-3'>
                        <span className='h-5 w-5 rounded-md' style={{ backgroundColor: item.categoryColor }} />
                        <span className='text-sm font-medium text-primary'> {item.category}</span>
                    </div>
                    <span className='text-sm font-bold text-primary'>₹{item.price}</span>
                </div>
            ))}
        </div>
    )
}

export default ExpensesCard