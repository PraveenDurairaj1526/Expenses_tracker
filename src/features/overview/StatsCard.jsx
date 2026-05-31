import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalIncomeAmount } from '../income/totalIncomeSelector';
import { fetchAllIncomeData } from '../income/incomeThunks';
import { getTotalExpensesAmount } from '../expenses/totalExpensesSelector';
import { fetchAllExpensesData } from '../expenses/expensesThunks';

const StatsCard = () => {
  const dispatch = useDispatch()
  const income = useSelector(getTotalIncomeAmount)
  const expenses = useSelector(getTotalExpensesAmount)

  const dashboardCards = [
    {
      id: 1,
      title: "Expenses",
      amount: expenses
    },

    {
      id: 2,
      title: "Income",
      amount: income
    },

    {
      id: 3,
      title: "Balance",
      amount:income - expenses
    },

    {
      id: 4,
      title: "Savings",
      amount: "0"
    },
  ];

  useEffect(() => {
    dispatch(fetchAllIncomeData())
    dispatch(fetchAllExpensesData())
  }, [])

  return (
    <div className='mb-6'>
      <h1 className='  text-2xl leading-8  sm:text-3xl font-semibold md:leading-10 text-primary mb-2'>Welcome back, Deepika.</h1>
      <p className='text-xs md:text-sm text-secondary mb-6'>Your financial health is looking strong. You've stayed within 85% of your total budget.</p>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {dashboardCards?.map(({ id, title, amount }) => {
          return (
            <div className='bg-brand p-2 flex-col md:flex-row items-start gap-3 text-white flex md:items-center rounded-xl md:rounded-[30px] justify-between pe-5 '>
              <p className='text-black bg-white font-bold text-sm p-2 xl:p-[10px_18px] rounded-none  md:rounded-[30px] -m-2 md:m-0'>{title}</p>
              <p className='text-lg xl:text-xl font-bold '>₹{amount}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatsCard