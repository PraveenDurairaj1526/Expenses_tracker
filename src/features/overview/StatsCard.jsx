import React from 'react';
const dashboardCards = [
  {
    id: 1,
    title: "Expenses",
    amount: "$3,420.50"
  },

  {
    id: 2,
    title: "Income",
    amount: "$8,900.00"
  },

  {
    id: 3,
    title: "Balance",
    amount: "$5,479.50"
  },

  {
    id: 4,
    title: "Savings",
    amount: "$12,240.00"
  },
];

const StatsCard = () => {
  return (
    <div className='mb-6'>
      <h1 className='  text-2xl leading-8  sm:text-3xl font-semibold md:leading-10 text-primary mb-2'>Welcome back, Alex.</h1>
      <p className='text-xs md:text-sm text-secondary mb-6'>Your financial health is looking strong. You've stayed within 85% of your total budget.</p>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {dashboardCards?.map(({ id, title, amount }) => {
          return (
            <div className='bg-brand p-2 flex-col md:flex-row items-start gap-3 text-white flex md:items-center rounded-xl md:rounded-[30px] justify-between pe-5 '>
              <p className='text-black bg-white font-bold text-sm p-2 xl:p-[10px_18px] rounded-none  md:rounded-[30px] -m-2 md:m-0'>{title}</p>
              <p className='text-lg xl:text-xl font-bold '>{amount}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsCard