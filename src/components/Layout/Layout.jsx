import React from 'react'
import Header from './Header'
import Navigation from './Navigation'
import ExpensesForm from '../../features/expenses/components/ExpensesForm'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col'>
        <ExpensesForm />
      <div className='px-4 py-4 md:px-6 headerWrapper'>
        <Header />
        <Navigation />
      </div>
      <div className='grow p-4 md:p-6 bg-[#faf7f1] max-h-[calc(100vh_-_138px)] min-h-[calc(100vh_-_138px)] overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}

export default Layout