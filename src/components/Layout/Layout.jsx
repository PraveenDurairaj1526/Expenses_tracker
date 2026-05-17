import React from 'react'
import Header from './Header'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col'>
      <div className='px-4 py-4 md:px-6 headerWrapper'>
        <Header />
        <Navigation />
      </div>
      <div className='grow p-4 md:p-6 bg-[#faf7f1]'>
        {children}
      </div>
    </div>
  )
}

export default Layout