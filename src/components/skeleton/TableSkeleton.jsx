import React from 'react'
import { PAGINATION_COUNT } from '../../siteConfig'

const TableSkeleton = ({titleLength}) => {
    return (
        <>
            {
                Array.from({ length: PAGINATION_COUNT },
                    (_, index) => (
                        <tr key={index} className="border-b border-gray-400 last:border-0">
                            {
                                Array.from({ length: titleLength },
                                    (_, index) => (
                                        <td key={index + 1} className="animate-pulse p-2 text-sm">
                                            <div className='h-[32px]  w-[80px] rounded-md bg-gray-300' />
                                        </td>
                                    )
                                )
                            }
                        </tr>
                    )
                )
            }
        </>

    )
}

export default TableSkeleton