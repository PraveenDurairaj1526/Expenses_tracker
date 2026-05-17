import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

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
  const active = 'bg-black text-white';

  return (
      <div className='inline-flex items-center rounded-3xl bg-white p-1 whitespace-nowrap overflow-x-auto custom-scroll min-w-0 max-w-full'>{linkData?.map(({ heading, link }) => <NavLink to={link}
        className={({ isActive }) =>
          clsx(
            'rounded-3xl px-4 py-2 text-xs font-semibold text-primary md:text-sm',
            isActive && active
          )
        }
      >{heading}</NavLink>)}</div>
  )
}

export default Navigation