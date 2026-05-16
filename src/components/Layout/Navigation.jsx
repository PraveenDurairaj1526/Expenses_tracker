import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const linkData = [
    {
      heading: 'Overview',
      link: '/'
    },
    {
      heading: 'Expenses',
      link: '/manage-expenses'
    },
    {
      heading: 'Category',
      link: '/manage-category'
    }
  ]
  const active = 'before:absolute before:left-1/2 before:-translate-x-1/2 before:-bottom-[8px] before:h-[4px] before:w-1/2 before:bg-primary before:content-[" "] before:rounded-lg text-primary font-bold';

  return (
    <div className='px-4 py-4 pt-2 md:px-6 bg-[#FAF9F9] border-b border-[#c5c6ca78] whitespace-nowrap overflow-x-auto custom-scroll'>
      <div className='flex gap-8'>{linkData?.map(({ heading, link }) => <NavLink to={link}
        className={({ isActive }) =>
          clsx(
            'text-sm text-secondary relative',
            isActive && active
          )
        }
      >{heading}</NavLink>)}</div>
    </div>
  )
}

export default Navigation